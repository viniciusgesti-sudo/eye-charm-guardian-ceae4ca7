(function () {
  "use strict";

  const root = document.getElementById("eyegis-content-editor");
  const hidden = document.getElementById("eyegis-document-json");
  if (!root || !hidden) return;

  const documentKey = root.dataset.documentKey || "";
  const languageKeys = ["PT", "EN", "FR"];
  const technicalKeys = new Set([
    "id",
    "idx",
    "index",
    "key",
    "match",
    "handle",
    "iconKey",
    "tileIndex",
    "script",
  ]);
  let state;
  let activeLanguage = "PT";
  let showTechnical = false;
  let dirty = false;

  try {
    state = JSON.parse(hidden.value || "{}");
  } catch {
    state = {};
  }

  render();

  document.addEventListener("keydown", (event) => {
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "s") {
      event.preventDefault();
      saveDocument();
    }
  });

  function render() {
    const shell = el("div", "eyegis-editor-shell");
    shell.appendChild(renderToolbar());
    shell.appendChild(documentKey === "media" ? renderMediaEditor() : renderObject(state, []));
    root.replaceChildren(shell);
    sync(false);
  }

  function renderToolbar() {
    const toolbar = el("div", "eyegis-editor-toolbar");
    const status = el(
      "span",
      `eyegis-save-status${dirty ? " is-dirty" : ""}`,
      dirty ? "Alterações ainda não salvas" : "Conteúdo pronto para editar",
    );

    const actions = el("div", "eyegis-toolbar-actions");
    const technical = button(
      showTechnical ? "Ocultar campos técnicos" : "Mostrar campos técnicos",
      "button-link",
    );
    technical.addEventListener("click", () => {
      showTechnical = !showTechnical;
      render();
    });
    const save = button("Salvar alterações", "button-primary eyegis-save-button");
    save.addEventListener("click", saveDocument);
    actions.append(technical, save);
    toolbar.append(status, actions);
    return toolbar;
  }

  function renderObject(value, path) {
    const wrapper = el("div", "eyegis-fields");
    const entries = Object.entries(value || {});
    const languageEntries = entries.filter(([key]) => languageKeys.includes(key));
    const regularEntries = entries.filter(([key]) => !languageKeys.includes(key));

    regularEntries.forEach(([key, item]) => {
      wrapper.appendChild(renderValue(item, key, [...path, key]));
    });

    if (languageEntries.length) {
      wrapper.appendChild(renderLanguageTabs(Object.fromEntries(languageEntries), path));
    }

    return wrapper;
  }

  function renderLanguageTabs(value, path) {
    const available = languageKeys.filter((language) =>
      Object.prototype.hasOwnProperty.call(value, language),
    );
    if (!available.includes(activeLanguage))
      activeLanguage = available.includes("PT") ? "PT" : available[0];

    const section = el("section", "eyegis-language-section");
    section.appendChild(el("h3", "eyegis-language-heading", "Escolha o idioma"));
    section.appendChild(
      el(
        "p",
        "eyegis-language-help",
        "Cada idioma é salvo de forma independente. Revise as três abas antes de publicar.",
      ),
    );

    const tabs = el("div", "eyegis-language-tabs");
    available.forEach((language) => {
      const tab = button(languageName(language), activeLanguage === language ? "is-active" : "");
      tab.setAttribute("aria-pressed", activeLanguage === language ? "true" : "false");
      tab.addEventListener("click", () => {
        activeLanguage = language;
        render();
      });
      tabs.appendChild(tab);
    });

    const panel = el("div", "eyegis-language-panel");
    panel.appendChild(renderObject(value[activeLanguage], [...path, activeLanguage]));
    section.append(tabs, panel);
    return section;
  }

  function renderValue(value, key, path) {
    if (Array.isArray(value)) return renderArray(value, key, path);
    if (value && typeof value === "object") return renderGroup(value, key, path);
    return renderField(value, key, path);
  }

  function renderGroup(value, key, path) {
    const details = el("details", "eyegis-group");
    details.open = path.length <= 2;
    const summary = el("summary", "eyegis-group-title", labelFor(key));
    details.append(summary, renderObject(value, path));
    return details;
  }

  function renderArray(value, key, path) {
    const group = el("section", "eyegis-array");
    const heading = el("div", "eyegis-array-heading");
    heading.append(
      el("div", "", labelFor(key)),
      el("span", "eyegis-count-badge", `${value.length} ${value.length === 1 ? "item" : "itens"}`),
    );
    group.appendChild(heading);

    const list = el("div", "eyegis-array-items");
    value.forEach((item, index) => {
      const card = el("div", "eyegis-array-item");
      const header = el("div", "eyegis-array-item-header");
      header.appendChild(el("strong", "", itemTitle(item, index)));

      const actions = el("div", "eyegis-array-item-actions");
      const up = iconButton("↑", "Mover para cima", index === 0);
      up.addEventListener("click", () => moveArrayItem(value, index, index - 1));
      const down = iconButton("↓", "Mover para baixo", index === value.length - 1);
      down.addEventListener("click", () => moveArrayItem(value, index, index + 1));
      const remove = button("Remover", "button-link-delete");
      remove.addEventListener("click", () => {
        if (!window.confirm("Remover este item?")) return;
        value.splice(index, 1);
        markDirty();
        render();
      });
      actions.append(up, down, remove);
      header.appendChild(actions);
      let content;
      if (Array.isArray(item)) {
        content = renderArray(item, "subitens", [...path, index]);
      } else if (item && typeof item === "object") {
        content = renderObject(item, [...path, index]);
      } else {
        content = renderField(item, "value", [...path, index]);
      }
      card.append(header, content);
      list.appendChild(card);
    });

    const add = button("+ Adicionar item", "button-secondary");
    add.addEventListener("click", () => {
      const template = value.length ? value[value.length - 1] : "";
      value.push(blankFrom(template));
      markDirty();
      render();
    });
    group.append(list, add);
    return group;
  }

  function renderField(value, key, path) {
    const technical = technicalKeys.has(key);
    const row = el("div", `eyegis-field${technical ? " eyegis-field--technical" : ""}`);
    if (technical && !showTechnical) row.hidden = true;

    const label = el("label", "eyegis-label", labelFor(key));
    const inputId = `eyegis-${path.join("-")}`;
    label.htmlFor = inputId;
    row.appendChild(label);

    const help = helpFor(key);
    if (help) row.appendChild(el("span", "eyegis-field-help", help));

    if (typeof value === "boolean") {
      const switchLabel = el("label", "eyegis-switch");
      const input = document.createElement("input");
      input.type = "checkbox";
      input.id = inputId;
      input.checked = value;
      input.addEventListener("change", () => setAtPath(path, input.checked));
      switchLabel.append(
        input,
        el("span", "eyegis-switch-slider"),
        el("span", "", "Exibir no site"),
      );
      row.appendChild(switchLabel);
      return row;
    }

    if (isImageField(key)) {
      row.appendChild(renderImageField(String(value ?? ""), inputId, path, key));
      return row;
    }

    const isLong =
      /(?:text|body|description|desc|mission|intro|lead|subtitle|note|answer|footer|manifesto|paragraph|disclaimer|quote)/i.test(
        key,
      ) || String(value ?? "").length > 90;
    const input = isLong ? document.createElement("textarea") : document.createElement("input");
    input.id = inputId;
    if (input instanceof HTMLInputElement) {
      input.type =
        typeof value === "number"
          ? "number"
          : /(?:url|link|href|target)$/i.test(key)
            ? "url"
            : "text";
      if (technical) input.readOnly = true;
    }
    input.value = String(value ?? "");
    input.addEventListener("input", () => {
      setAtPath(path, typeof value === "number" ? Number(input.value) : input.value);
    });
    row.appendChild(input);
    return row;
  }

  function renderImageField(value, inputId, path, key) {
    const wrapper = el("div", "eyegis-image-field");
    const previewWrap = el("div", "eyegis-image-preview-wrap");
    const preview = document.createElement("img");
    preview.className = "eyegis-image-preview";
    preview.alt = "Prévia da imagem selecionada";
    const placeholder = el("div", "eyegis-image-placeholder", "Nenhuma substituição selecionada");
    previewWrap.append(preview, placeholder);

    const controls = el("div", "eyegis-image-controls");
    const choose = button(
      key === "mobileUrl" ? "Trocar imagem para celular" : "Trocar imagem",
      "button-secondary",
    );
    choose.addEventListener("click", () => chooseMedia(path));
    const clear = button("Usar imagem original", "button-link-delete");
    clear.addEventListener("click", () => {
      setAtPath(path, "");
      render();
    });
    controls.append(choose, clear);

    const input = document.createElement("input");
    input.type = "url";
    input.id = inputId;
    input.value = value;
    input.placeholder = "Ou cole a URL da imagem";
    input.hidden = !showTechnical;
    input.addEventListener("input", () => {
      setAtPath(path, input.value);
      updateImagePreview(preview, placeholder, input.value);
    });
    updateImagePreview(preview, placeholder, value);
    wrapper.append(previewWrap, controls, input);
    return wrapper;
  }

  function renderMediaEditor() {
    const section = el("section", "eyegis-media-editor");
    const intro = el("div", "eyegis-media-intro");
    intro.append(
      el("h2", "", "Galeria de imagens do site"),
      el(
        "p",
        "",
        "Procure a imagem pelo nome, escolha uma nova versão na Biblioteca de Mídia e salve. Se nenhum arquivo for selecionado, o site conserva a imagem original.",
      ),
    );

    const searchWrap = el("div", "eyegis-media-search");
    const searchLabel = el("label", "screen-reader-text", "Pesquisar imagens");
    const search = document.createElement("input");
    search.type = "search";
    search.placeholder = "Pesquisar: hero, produto, coleção, tecnologia...";
    searchLabel.htmlFor = "eyegis-media-search";
    search.id = "eyegis-media-search";
    const resultCount = el("span", "eyegis-media-result-count");
    searchWrap.append(searchLabel, search, resultCount);

    const grid = el("div", "eyegis-media-grid");
    const entries = Object.entries(state || {});
    entries.forEach(([key, item]) => grid.appendChild(renderMediaCard(key, item)));

    const filter = () => {
      const query = normalizeText(search.value);
      let visible = 0;
      grid.querySelectorAll(".eyegis-media-card").forEach((card) => {
        const matches = !query || normalizeText(card.dataset.search || "").includes(query);
        card.hidden = !matches;
        if (matches) visible += 1;
      });
      resultCount.textContent = `${visible} ${visible === 1 ? "imagem" : "imagens"}`;
    };
    search.addEventListener("input", filter);
    window.setTimeout(filter, 0);

    section.append(intro, searchWrap, grid);
    return section;
  }

  function renderMediaCard(key, item) {
    const asset = item && typeof item === "object" ? item : {};
    const card = el("article", "eyegis-media-card");
    const title = mediaTitleFor(key, asset.label);
    card.dataset.search = `${title} ${key} ${mediaAreaFor(key)}`;

    const heading = el("div", "eyegis-media-card-heading");
    const headingText = el("div", "");
    headingText.append(el("h3", "", title), el("span", "eyegis-media-area", mediaAreaFor(key)));
    const changed = asset.url || asset.mobileUrl;
    heading.append(
      headingText,
      el(
        "span",
        `eyegis-media-state${changed ? " is-custom" : ""}`,
        changed ? "Personalizada" : "Original",
      ),
    );

    const desktop = renderMediaPicker(
      "Imagem para computador",
      asset.url || "",
      [key, "url"],
      false,
    );
    const mobile = renderMediaPicker(
      "Imagem para celular (opcional)",
      asset.mobileUrl || "",
      [key, "mobileUrl"],
      true,
    );

    const altRow = el("div", "eyegis-media-alt");
    const altLabel = el("label", "eyegis-label", "Descrição da imagem (acessibilidade)");
    const altInput = document.createElement("input");
    altInput.type = "text";
    altInput.value = asset.alt || "";
    altInput.placeholder = "Ex.: Pessoa usando óculos Eyegis em um escritório";
    altInput.addEventListener("input", () => setAtPath([key, "alt"], altInput.value));
    altRow.append(altLabel, altInput);

    if (showTechnical) {
      const technical = el("div", "eyegis-media-technical");
      technical.append(
        el("strong", "", "Identificador técnico: "),
        document.createTextNode(asset.match || key),
      );
      card.append(heading, desktop, mobile, altRow, technical);
    } else {
      card.append(heading, desktop, mobile, altRow);
    }
    return card;
  }

  function renderMediaPicker(labelText, value, path, optional) {
    const picker = el("div", "eyegis-media-picker");
    picker.appendChild(el("span", "eyegis-label", labelText));

    const visual = el("div", "eyegis-media-picker-visual");
    const preview = document.createElement("img");
    preview.alt = "Prévia";
    const placeholder = el(
      "div",
      "eyegis-image-placeholder",
      optional ? "Usará a mesma imagem do computador" : "Imagem original do site",
    );
    visual.append(preview, placeholder);
    updateImagePreview(preview, placeholder, value);

    const actions = el("div", "eyegis-media-picker-actions");
    const choose = button(value ? "Substituir" : "Escolher imagem", "button-secondary");
    choose.addEventListener("click", () => chooseMedia(path));
    actions.appendChild(choose);
    if (value) {
      const clear = button(
        optional ? "Usar a imagem do computador" : "Restaurar original",
        "button-link-delete",
      );
      clear.addEventListener("click", () => {
        setAtPath(path, "");
        render();
      });
      actions.appendChild(clear);
    }

    if (showTechnical) {
      const url = document.createElement("input");
      url.type = "url";
      url.value = value;
      url.placeholder = "URL da imagem";
      url.addEventListener("input", () => setAtPath(path, url.value));
      actions.appendChild(url);
    }
    picker.append(visual, actions);
    return picker;
  }

  function chooseMedia(path) {
    const frame = window.wp.media({
      title: "Escolher imagem",
      button: { text: "Usar esta imagem" },
      library: { type: "image" },
      multiple: false,
    });
    frame.on("select", () => {
      const attachment = frame.state().get("selection").first().toJSON();
      setAtPath(path, attachment.url || "");
      const parent = getAtPath(path.slice(0, -1));
      if (parent && typeof parent === "object" && "alt" in parent && !parent.alt) {
        parent.alt = attachment.alt || attachment.caption || "";
      }
      render();
    });
    frame.open();
  }

  function updateImagePreview(preview, placeholder, value) {
    preview.src = value || "";
    preview.hidden = !value;
    placeholder.hidden = Boolean(value);
  }

  function moveArrayItem(array, from, to) {
    if (to < 0 || to >= array.length) return;
    const [item] = array.splice(from, 1);
    array.splice(to, 0, item);
    markDirty();
    render();
  }

  function setAtPath(path, value) {
    let cursor = state;
    for (let i = 0; i < path.length - 1; i += 1) cursor = cursor[path[i]];
    cursor[path[path.length - 1]] = value;
    markDirty();
    sync(false);
  }

  function getAtPath(path) {
    return path.reduce((cursor, key) => cursor?.[key], state);
  }

  function markDirty() {
    dirty = true;
    const status = root.querySelector(".eyegis-save-status");
    if (status) {
      status.classList.add("is-dirty");
      status.textContent = "Alterações ainda não salvas";
    }
  }

  function sync(mark = false) {
    hidden.value = JSON.stringify(state);
    if (mark) markDirty();
  }

  function saveDocument() {
    sync(false);
    const publish = document.getElementById("publish");
    if (publish) {
      publish.click();
      return;
    }
    const form = document.getElementById("post");
    if (form) form.submit();
  }

  function blankFrom(template) {
    if (Array.isArray(template)) return [];
    if (template && typeof template === "object") {
      return Object.fromEntries(
        Object.entries(template).map(([key, value]) => [key, blankFrom(value)]),
      );
    }
    if (typeof template === "boolean") return true;
    if (typeof template === "number") return 0;
    return "";
  }

  function itemTitle(item, index) {
    if (item && typeof item === "object") {
      const candidate =
        item.title || item.name || item.label || item.q || item.heading || item.city;
      if (candidate && typeof candidate === "string") return candidate;
    }
    return `Item ${index + 1}`;
  }

  function isImageField(key) {
    if (/alt/i.test(key)) return false;
    if (documentKey === "media" && /^(?:url|mobileUrl)$/i.test(key)) return true;
    return /^(?:image|imageUrl|heroImage|main_image|mobileImage)$/i.test(key);
  }

  function helpFor(key) {
    const help = {
      alt: "Descreva brevemente o que aparece na imagem.",
      imageAlt: "Descreva brevemente o que aparece na imagem.",
      href: "Informe o endereço completo ou uma rota do site, como /pt/contato.",
      target: "Endereço para onde o botão ou link levará o visitante.",
      metaTitle: "Título exibido no Google e na aba do navegador.",
      metaDesc: "Resumo usado por mecanismos de busca.",
    };
    return help[key] || "";
  }

  function labelFor(key) {
    const labels = {
      PT: "Português",
      EN: "Inglês",
      FR: "Francês",
      hero: "Destaque principal",
      heroTitle: "Título principal",
      heroEyebrow: "Texto acima do título",
      heroManifesto: "Texto de apresentação",
      eyebrow: "Texto acima do título",
      title: "Título",
      titleAccent: "Parte destacada do título",
      title1: "Primeira parte do título",
      title2: "Segunda parte do título",
      headline: "Chamada principal",
      subtitle: "Subtítulo",
      sub: "Subtítulo",
      lead: "Texto de apoio",
      body: "Texto",
      text: "Texto",
      description: "Descrição",
      desc: "Descrição",
      image: "Imagem",
      mobileImage: "Imagem para celular",
      url: "Imagem para computador",
      mobileUrl: "Imagem para celular",
      imageAlt: "Descrição da imagem",
      alt: "Descrição da imagem",
      cta: "Botão",
      ctaLabel: "Texto do botão",
      label: "Nome exibido",
      href: "Link de destino",
      target: "Link de destino",
      topbar: "Aviso no topo do site",
      contact_email: "E-mail de contato",
      footer_text: "Frase do rodapé",
      amazon_url: "Link da loja na Amazon",
      instagram_url: "Link do Instagram",
      tiktok_url: "Link do TikTok",
      facebook_url: "Link do Facebook",
      youtube_url: "Link do YouTube",
      items: "Itens",
      sections: "Seções",
      steps: "Etapas",
      questions: "Perguntas",
      answers: "Respostas",
      links: "Links",
      bullets: "Tópicos",
      features: "Benefícios",
      categories: "Categorias",
      countries: "Países",
      reviews: "Avaliações",
      price: "Preço",
      buyLabel: "Texto do botão de compra",
      buyLink: "Link de compra",
      buy_link: "Link de compra",
      metaTitle: "Título para buscadores",
      metaDesc: "Descrição para buscadores",
      q: "Pergunta",
      a: "Resposta",
      h: "Título",
      p: "Texto",
      d: "Descrição",
      k: "Nome",
      v: "Valor",
      value: "Conteúdo",
    };
    if (labels[key]) return labels[key];

    const prefixes = {
      nav: "Menu",
      hero: "Destaque principal",
      footer: "Rodapé",
      home: "Página inicial",
      cta: "Botão",
    };
    const wordLabels = {
      men: "Masculino",
      women: "Feminino",
      kids: "Infantil",
      about: "Sobre",
      bag: "Sacola",
      lenses: "Lentes",
      technology: "Tecnologia",
      social: "Redes sociais",
      shopAmazon: "Comprar na Amazon",
      honestScience: "Honest Science",
      opticalScience: "Ciência óptica",
      line1: "Linha 1",
      line2: "Linha 2",
      headline1: "Título 1",
      headline2: "Título 2",
      subcopy: "Texto de apoio",
      scroll: "Indicação de rolagem",
    };

    const dotted = String(key).split(".");
    if (dotted.length > 1) {
      const [first, ...rest] = dotted;
      return [
        prefixes[first] || humanize(first),
        ...rest.map((part) => wordLabels[part] || humanize(part)),
      ].join(" — ");
    }
    return humanize(key);
  }

  function humanize(value) {
    return String(value)
      .replaceAll("_", " ")
      .replaceAll("-", " ")
      .replace(/([a-z])([A-Z])/g, "$1 $2")
      .replace(/^./, (letter) => letter.toUpperCase());
  }

  function languageName(language) {
    return { PT: "Português", EN: "Inglês", FR: "Francês" }[language] || language;
  }

  function mediaAreaFor(key) {
    if (/^(?:atelier|marais|meridian|solene)/.test(key)) return "Produtos";
    if (/^(?:hero|universe|lifestyle|collection)/.test(key)) return "Página inicial e coleções";
    if (/^(?:guard|science|lens)/.test(key)) return "Tecnologia e lentes";
    if (/^(?:life|persona|models)/.test(key)) return "Lifestyle e personas";
    if (/^shipping/.test(key)) return "Envio e entrega";
    if (/^contact/.test(key)) return "Contato";
    if (/^kids/.test(key)) return "Coleção infantil";
    return "Site Eyegis";
  }

  function mediaTitleFor(key, fallback) {
    const exact = {
      hero: "Banner principal da página inicial",
      "collection-family": "Coleções — Foto em família",
      "collection-hero-kids": "Coleção infantil — Banner principal",
      "collection-men": "Coleção masculina",
      "collection-women": "Coleção feminina",
      "contact-concierge": "Contato — Atendimento personalizado",
      "shipping-unboxing": "Envio — Abertura da embalagem",
      "universe-eyewear": "Universo Eyegis — Óculos",
      "universe-lens-macro": "Universo Eyegis — Detalhe da lente",
      "universe-portrait": "Universo Eyegis — Retrato",
      "universe-science": "Universo Eyegis — Ciência",
    };
    if (exact[key]) return exact[key];

    const words = {
      atelier: "Atelier",
      marais: "Marais",
      meridian: "Meridian",
      solene: "Solene",
      front: "Foto frontal",
      package: "Embalagem",
      pouch: "Estojo",
      profile: "Foto de perfil",
      macro: "Foto de detalhe",
      pair: "Par de óculos",
      hero: "Banner principal",
      paris: "Paris",
      saopaulo: "São Paulo",
      glasses: "Óculos",
      eyegis: "Eyegis",
      zenith: "Zenith",
      kids: "Infantil",
      lens: "Lente",
      life: "Lifestyle",
      lifestyle: "Lifestyle",
      business: "Executivo",
      man: "Masculino",
      creative: "Criativo",
      gaming: "Gaming",
      gamer: "Gamer",
      student: "Estudante",
      travel: "Viagem",
      architecture: "Arquitetura",
      guard: "EyegisGuard",
      comparison: "Comparação",
      float: "Lente em destaque",
      persona: "Persona",
      executive: "Executivo",
      models: "Modelos",
      focus: "Foco",
      science: "Ciência",
      devices: "Dispositivos",
      exploded: "Vista detalhada",
    };
    const translated = String(key)
      .split("-")
      .map((part) => words[part] || humanize(part))
      .join(" — ");
    return translated || fallback || labelFor(key);
  }

  function normalizeText(value) {
    return String(value)
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  }

  function el(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  function button(text, className) {
    const node = el("button", `button ${className || ""}`, text);
    node.type = "button";
    return node;
  }

  function iconButton(text, label, disabled) {
    const node = button(text, "button-small eyegis-icon-button");
    node.setAttribute("aria-label", label);
    node.title = label;
    node.disabled = disabled;
    return node;
  }
})();
