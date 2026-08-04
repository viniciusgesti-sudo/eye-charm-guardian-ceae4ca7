(function () {
  "use strict";

  const root = document.getElementById("eyegis-studio-root");
  const config = window.EyegisStudioConfig;
  if (!root || !config) return;

  const languages = ["PT", "EN", "FR"];
  const languageNames = { PT: "Português", EN: "English", FR: "Français" };
  const published = clone(config.document?.published || {});
  let state = clone(config.document?.draft || published);
  let hasDraft = Boolean(config.document?.has_draft);
  let activeLanguage = "PT";
  let activeSection = config.manifest?.[0]?.id || "manifesto";
  let viewport = "desktop";
  let dirty = false;
  let busy = false;
  let iframeReady = false;
  let lastMessage = hasDraft ? "Rascunho recuperado" : "Conteúdo publicado";
  let lastMessageTone = hasDraft ? "draft" : "published";
  let previewUpdateTimer;
  let previewHealthTimer;

  const shell = element("div", "eyegis-studio-shell");
  const topbar = element("div", "eyegis-studio-topbar");
  const workspace = element("div", "eyegis-studio-workspace");
  const editor = element("section", "eyegis-studio-editor");
  const preview = element("section", "eyegis-studio-preview");
  const iframeStage = element("div", "eyegis-studio-iframe-stage is-desktop");
  const iframe = document.createElement("iframe");
  iframe.className = "eyegis-studio-iframe";
  iframe.title = "Prévia da página inicial Eyegis";
  iframe.setAttribute("sandbox", "allow-scripts allow-same-origin allow-forms allow-popups");
  iframe.setAttribute("referrerpolicy", "strict-origin-when-cross-origin");
  iframeStage.appendChild(iframe);
  workspace.append(editor, preview);
  shell.append(topbar, workspace);
  root.replaceChildren(shell);

  renderTopbar();
  renderEditor();
  renderPreview();
  loadPreview();

  window.addEventListener("message", handlePreviewMessage);
  window.addEventListener("beforeunload", (event) => {
    if (!dirty) return;
    event.preventDefault();
    event.returnValue = "";
  });
  document.addEventListener("keydown", (event) => {
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "s") {
      event.preventDefault();
      saveDraft();
    }
  });

  function renderTopbar() {
    topbar.replaceChildren();

    const page = element("div", "eyegis-studio-page-select");
    page.append(
      element("span", "eyegis-studio-control-label", "Página"),
      element("strong", "", "Página inicial"),
      element("span", "eyegis-studio-pilot-badge", "Piloto funcional"),
    );

    const languageTabs = element("div", "eyegis-studio-languages");
    languageTabs.setAttribute("role", "tablist");
    languages.forEach((language) => {
      const tab = button(languageNames[language], activeLanguage === language ? "is-active" : "");
      tab.setAttribute("role", "tab");
      tab.setAttribute("aria-selected", String(activeLanguage === language));
      tab.addEventListener("click", () => {
        if (activeLanguage === language) return;
        activeLanguage = language;
        iframeReady = false;
        renderTopbar();
        renderEditor();
        loadPreview();
      });
      languageTabs.appendChild(tab);
    });

    const status = element("div", `eyegis-studio-status is-${statusTone()}`);
    status.append(
      element("span", "eyegis-studio-status-dot"),
      element("span", "eyegis-studio-status-text", statusText()),
    );

    const actions = element("div", "eyegis-studio-actions");
    const discard = button("Descartar rascunho", "button-link-delete");
    discard.disabled = busy || (!dirty && !hasDraft);
    discard.addEventListener("click", discardDraft);
    const save = button(busy ? "Salvando…" : "Salvar rascunho", "button-secondary");
    save.disabled = busy || !dirty;
    save.addEventListener("click", saveDraft);
    const publish = button(busy ? "Publicando…" : "Publicar no site", "button-primary");
    publish.disabled = busy || (!dirty && !hasDraft);
    publish.addEventListener("click", publishDocument);
    actions.append(discard, save, publish);

    topbar.append(page, languageTabs, status, actions);
  }

  function renderEditor(focusPath) {
    editor.replaceChildren();

    const header = element("div", "eyegis-studio-editor-header");
    header.append(
      element("span", "eyegis-studio-control-label", "Conteúdo da Home"),
      element("h2", "", languageNames[activeLanguage]),
      element("p", "", "Escolha uma seção e altere somente textos ou imagens."),
    );

    const sectionNav = element("nav", "eyegis-studio-section-nav");
    sectionNav.setAttribute("aria-label", "Seções da página inicial");
    (config.manifest || []).forEach((section) => {
      const item = button(section.label, activeSection === section.id ? "is-active" : "");
      item.addEventListener("click", () => {
        activeSection = section.id;
        renderEditor();
      });
      sectionNav.appendChild(item);
    });

    const selected = (config.manifest || []).find((section) => section.id === activeSection);
    const form = element("div", "eyegis-studio-form");
    if (selected) {
      const intro = element("div", "eyegis-studio-section-intro");
      intro.append(element("h3", "", selected.label), element("p", "", selected.description || ""));
      form.appendChild(intro);
      selected.fields.forEach((field) => form.appendChild(renderField(field)));
    }

    editor.append(header, sectionNav, form);

    if (focusPath) {
      window.setTimeout(() => {
        const input = editor.querySelector(`[data-field-path="${cssEscape(focusPath)}"]`);
        input?.focus();
        input?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 0);
    }
  }

  function renderField(field) {
    const row = element("div", `eyegis-studio-field is-${field.type}`);
    const label = element("label", "eyegis-studio-label", field.label);
    const inputId = `eyegis-studio-${activeLanguage}-${field.path.replaceAll(".", "-")}`;
    label.htmlFor = inputId;
    row.appendChild(label);

    if (field.recommended) {
      row.appendChild(element("span", "eyegis-studio-help", field.recommended));
    }

    if (field.type === "image") {
      row.appendChild(renderImageField(field, inputId));
      return row;
    }

    const current = String(getAtPath(state[activeLanguage], field.path) ?? "");
    const input =
      field.type === "textarea"
        ? document.createElement("textarea")
        : document.createElement("input");
    if (input instanceof HTMLInputElement) input.type = "text";
    input.id = inputId;
    input.dataset.fieldPath = field.path;
    input.value = current;
    if (field.limit) input.maxLength = Number(field.limit);

    const counter = field.limit
      ? element("span", "eyegis-studio-counter", `${current.length}/${field.limit}`)
      : null;

    input.addEventListener("focus", () => focusPreview(field));
    input.addEventListener("input", () => {
      setAtPath(state[activeLanguage], field.path, input.value);
      if (counter) counter.textContent = `${input.value.length}/${field.limit}`;
      markDirty();
      schedulePreviewUpdate();
    });
    row.appendChild(input);
    if (counter) row.appendChild(counter);
    return row;
  }

  function renderImageField(field, inputId) {
    const current = String(getAtPath(state[activeLanguage], field.path) ?? "");
    const wrapper = element("div", "eyegis-studio-image-field");
    const visual = element("div", "eyegis-studio-image-visual");
    const image = document.createElement("img");
    image.alt = "Prévia da imagem selecionada";
    const placeholder = element(
      "div",
      "eyegis-studio-image-placeholder",
      field.path.endsWith("mobileImage") ? "Usa a imagem de computador" : "Imagem original do site",
    );
    if (current) {
      image.src = current;
      placeholder.hidden = true;
    } else {
      image.hidden = true;
    }
    visual.append(image, placeholder);

    const actions = element("div", "eyegis-studio-image-actions");
    const choose = button(current ? "Trocar imagem" : "Escolher imagem", "button-secondary");
    choose.id = inputId;
    choose.dataset.fieldPath = field.path;
    choose.addEventListener("focus", () => focusPreview(field));
    choose.addEventListener("click", () => openMediaLibrary(field));
    actions.appendChild(choose);

    if (current) {
      const clear = button(
        field.path.endsWith("mobileImage") ? "Usar imagem do computador" : "Restaurar original",
        "button-link-delete",
      );
      clear.addEventListener("click", () => {
        setAtPath(state[activeLanguage], field.path, "");
        markDirty();
        renderEditor(field.path);
        schedulePreviewUpdate();
      });
      actions.appendChild(clear);
    }

    wrapper.append(visual, actions);
    return wrapper;
  }

  function renderPreview() {
    preview.replaceChildren();

    const toolbar = element("div", "eyegis-studio-preview-toolbar");
    const heading = element("div", "eyegis-studio-preview-heading");
    heading.append(
      element("span", "eyegis-studio-control-label", "Preview real"),
      element("strong", "", "Clique em um texto ou imagem para localizar o campo"),
    );

    const viewports = element("div", "eyegis-studio-viewports");
    [
      ["desktop", "Desktop"],
      ["tablet", "Tablet"],
      ["mobile", "Celular"],
    ].forEach(([key, label]) => {
      const control = button(label, viewport === key ? "is-active" : "");
      control.setAttribute("aria-pressed", String(viewport === key));
      control.addEventListener("click", () => {
        viewport = key;
        iframeStage.className = `eyegis-studio-iframe-stage is-${key}`;
        renderPreview();
      });
      viewports.appendChild(control);
    });

    const external = document.createElement("a");
    external.className = "button button-secondary";
    external.href = previewUrl(false);
    external.target = "_blank";
    external.rel = "noopener noreferrer";
    external.textContent = "Abrir site ↗";
    toolbar.append(heading, viewports, external);

    const notice = element("div", "eyegis-studio-preview-notice");
    notice.innerHTML = "<strong>Prévia privada:</strong> nada entra no ar até você publicar.";
    iframeStage.className = `eyegis-studio-iframe-stage is-${viewport}`;
    preview.append(toolbar, notice, iframeStage);
  }

  function loadPreview() {
    window.clearTimeout(previewHealthTimer);
    iframeReady = false;
    iframe.src = previewUrl(true);
    previewHealthTimer = window.setTimeout(() => {
      if (iframeReady) return;
      showToast(
        "O preview ainda não respondeu. Publique primeiro a atualização do React no Netlify e recarregue esta tela.",
        "warning",
      );
    }, 12000);
  }

  function previewUrl(isEmbedded) {
    const route = config.localeRoutes?.[activeLanguage] || "/br/";
    const url = new URL(route, config.frontendUrl);
    if (isEmbedded) {
      url.searchParams.set("eyegis_preview", "1");
      url.searchParams.set("eyegis_lang", activeLanguage);
    }
    return url.toString();
  }

  function handlePreviewMessage(event) {
    const expectedOrigin = new URL(config.frontendUrl).origin;
    if (event.origin !== expectedOrigin || event.source !== iframe.contentWindow) return;
    if (!event.data || event.data.source !== "eyegis-studio") return;

    if (event.data.type === "eyegis:preview:ready") {
      iframeReady = true;
      window.clearTimeout(previewHealthTimer);
      sendPreviewUpdate();
      return;
    }

    if (event.data.type === "eyegis:preview:select") {
      const prefix = `${config.documentKey}.${activeLanguage}.`;
      const fullField = String(event.data.field || "");
      if (!fullField.startsWith(prefix)) return;
      const path = fullField.slice(prefix.length);
      const section = (config.manifest || []).find((item) =>
        item.fields.some((field) => field.path === path || field.preview_path === path),
      );
      if (!section) return;
      activeSection = section.id;
      renderEditor(path);
    }
  }

  function schedulePreviewUpdate() {
    window.clearTimeout(previewUpdateTimer);
    previewUpdateTimer = window.setTimeout(sendPreviewUpdate, 70);
  }

  function sendPreviewUpdate() {
    if (!iframeReady || !iframe.contentWindow) return;
    iframe.contentWindow.postMessage(
      {
        source: "eyegis-studio",
        type: "eyegis:preview:update",
        documentKey: config.documentKey,
        content: state,
      },
      new URL(config.frontendUrl).origin,
    );
  }

  function focusPreview(field) {
    if (!iframeReady || !iframe.contentWindow) return;
    if (field.viewport && viewport !== field.viewport) {
      viewport = field.viewport;
      iframeStage.className = `eyegis-studio-iframe-stage is-${viewport}`;
      renderPreview();
    }
    const previewPath = field.preview_path || field.path;
    iframe.contentWindow.postMessage(
      {
        source: "eyegis-studio",
        type: "eyegis:preview:focus",
        field: `${config.documentKey}.${activeLanguage}.${previewPath}`,
      },
      new URL(config.frontendUrl).origin,
    );
  }

  function openMediaLibrary(field) {
    if (!window.wp?.media) {
      showToast("A Biblioteca de Mídia não carregou. Recarregue a página.", "error");
      return;
    }
    const frame = window.wp.media({
      title: field.label,
      button: { text: "Usar esta imagem" },
      library: { type: "image" },
      multiple: false,
    });
    frame.on("select", () => {
      const attachment = frame.state().get("selection").first().toJSON();
      setAtPath(state[activeLanguage], field.path, attachment.url || "");
      const side = field.path.split(".")[0];
      const altPath = `${side}.imageAlt`;
      if (!getAtPath(state[activeLanguage], altPath) && attachment.alt) {
        setAtPath(state[activeLanguage], altPath, attachment.alt);
      }
      markDirty();
      renderEditor(field.path);
      schedulePreviewUpdate();
      if (attachment.width && attachment.height) {
        showToast(`Imagem selecionada: ${attachment.width} × ${attachment.height} px.`, "success");
      }
    });
    frame.open();
  }

  async function saveDraft() {
    if (busy || !dirty) return;
    busy = true;
    renderTopbar();
    try {
      const result = await apiRequest(`${config.restUrl}/draft`, "POST", { content: state });
      state = clone(result.content || state);
      dirty = false;
      hasDraft = true;
      lastMessage = `Rascunho salvo${result.saved_at ? ` às ${formatTime(result.saved_at)}` : ""}`;
      lastMessageTone = "draft";
      showToast("Rascunho salvo. O site público não foi alterado.", "success");
    } catch (error) {
      lastMessage = "Falha ao salvar";
      lastMessageTone = "error";
      showToast(error.message || "Não foi possível salvar o rascunho.", "error");
    } finally {
      busy = false;
      renderTopbar();
    }
  }

  async function publishDocument() {
    if (busy || (!dirty && !hasDraft)) return;
    const confirmed = window.confirm(
      "Publicar estas alterações no site Eyegis? O conteúdo ficará visível para os visitantes.",
    );
    if (!confirmed) return;

    busy = true;
    renderTopbar();
    try {
      const result = await apiRequest(`${config.restUrl}/publish`, "POST", { content: state });
      state = clone(result.content || state);
      replaceObject(published, state);
      dirty = false;
      hasDraft = false;
      lastMessage = `Publicado às ${formatTime(result.published_at || new Date().toISOString())}`;
      lastMessageTone = "published";
      showToast("Publicado. O site público pode levar até 60 segundos para atualizar.", "success");
    } catch (error) {
      lastMessage = "Falha ao publicar";
      lastMessageTone = "error";
      showToast(error.message || "Não foi possível publicar.", "error");
    } finally {
      busy = false;
      renderTopbar();
    }
  }

  async function discardDraft() {
    if (busy || (!dirty && !hasDraft)) return;
    const confirmed = window.confirm(
      "Descartar todas as alterações não publicadas e voltar ao conteúdo que está no site?",
    );
    if (!confirmed) return;

    busy = true;
    renderTopbar();
    try {
      const result = await apiRequest(`${config.restUrl}/draft`, "DELETE");
      state = clone(result.published || published);
      replaceObject(published, state);
      dirty = false;
      hasDraft = false;
      lastMessage = "Rascunho descartado";
      lastMessageTone = "published";
      renderEditor();
      sendPreviewUpdate();
      showToast("Alterações descartadas. O conteúdo publicado foi restaurado.", "success");
    } catch (error) {
      lastMessage = "Falha ao descartar";
      lastMessageTone = "error";
      showToast(error.message || "Não foi possível descartar o rascunho.", "error");
    } finally {
      busy = false;
      renderTopbar();
    }
  }

  async function apiRequest(url, method, body) {
    const response = await fetch(url, {
      method,
      credentials: "same-origin",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-WP-Nonce": config.restNonce,
      },
      body: body ? JSON.stringify(body) : undefined,
    });
    const result = await response.json().catch(() => ({}));
    if (!response.ok) {
      throw new Error(result.message || `Erro ${response.status}`);
    }
    return result;
  }

  function markDirty() {
    dirty = true;
    lastMessage = "Alterações não salvas";
    lastMessageTone = "dirty";
    renderTopbar();
  }

  function statusText() {
    if (busy) return "Processando…";
    return lastMessage;
  }

  function statusTone() {
    if (busy) return "busy";
    return lastMessageTone;
  }

  function showToast(message, tone) {
    document.querySelector(".eyegis-studio-toast")?.remove();
    const toast = element("div", `eyegis-studio-toast is-${tone}`, message);
    toast.setAttribute("role", tone === "error" ? "alert" : "status");
    document.body.appendChild(toast);
    window.setTimeout(() => toast.remove(), 5200);
  }

  function getAtPath(source, path) {
    return String(path)
      .split(".")
      .reduce((cursor, key) => cursor?.[key], source);
  }

  function setAtPath(source, path, value) {
    const keys = String(path).split(".");
    let cursor = source;
    keys.slice(0, -1).forEach((key) => {
      if (!cursor[key] || typeof cursor[key] !== "object") cursor[key] = {};
      cursor = cursor[key];
    });
    cursor[keys[keys.length - 1]] = value;
  }

  function replaceObject(target, source) {
    Object.keys(target).forEach((key) => delete target[key]);
    Object.assign(target, clone(source));
  }

  function formatTime(value) {
    try {
      return new Intl.DateTimeFormat("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
      }).format(new Date(value));
    } catch {
      return "agora";
    }
  }

  function clone(value) {
    return JSON.parse(JSON.stringify(value || {}));
  }

  function cssEscape(value) {
    return window.CSS?.escape ? window.CSS.escape(value) : String(value).replace(/["\\]/g, "\\$&");
  }

  function element(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  function button(text, className) {
    const control = element("button", `button ${className || ""}`, text);
    control.type = "button";
    return control;
  }
})();
