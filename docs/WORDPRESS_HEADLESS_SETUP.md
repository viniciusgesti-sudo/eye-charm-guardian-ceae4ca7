# React + WordPress headless — implantação Eyegis

## Arquitetura

- `eyegis-eyewear.com`: front-end React publicado no Netlify.
- `cms.eyegis-eyewear.com`: WordPress instalado na Hostinger.
- WordPress: edição de textos, imagens, links e listas.
- GitHub: código e fallback versionado.

O WordPress não renderiza o layout público. Ele funciona somente como painel editorial e API.

## 1. Preparar o WordPress na Hostinger

1. No hPanel, crie o subdomínio `cms.eyegis-eyewear.com`.
2. Instale um WordPress novo nesse subdomínio.
3. Ative HTTPS/SSL.
4. Em **Configurações → Links permanentes**, selecione **Nome do post** e salve.
5. Mantenha o site principal apontado para o Netlify. Não instale Elementor.

## 2. Instalar o plugin editorial

1. Use o arquivo pronto `eyegis-headless-content.zip` ou compacte a pasta `wordpress-plugin/eyegis-headless-content`.
2. No WordPress, abra **Plugins → Adicionar plugin → Enviar plugin**.
3. Envie o ZIP, instale e ative.
4. Abra **Editor do site → Studio**. Os documentos iniciais serão criados automaticamente.
5. Abra **Editor do site → Integração React**.
6. Clique em **Testar API**. A resposta deve conter `version`, `generated_at` e `documents`.

## 3. Conexão com o React e o Netlify

O endpoint de produção já está configurado no servidor React:

```text
https://cms.eyegis-eyewear.com/wp-json/eyegis/v1/content
```

Não é necessário criar uma variável no Netlify para a publicação normal. Para
usar outro WordPress em preview ou staging, crie `WORDPRESS_API_URL` em **Site
configuration → Environment variables** e execute um novo deploy.

O front-end consulta o WordPress no servidor, usa cache curto e mantém o conteúdo local quando a API não responde.

O painel inicial contém 42 documentos editoriais organizados por página/seção e uma biblioteca com 62 imagens substituíveis. O endpoint público deve entregar as 42 chaves; documentos em rascunho não são enviados ao React.

## 4. Teste editorial

1. No WordPress, abra **Conteúdo Eyegis → Página — Inicial**.
2. Altere temporariamente o título do hero em Português.
3. Clique em **Atualizar**.
4. Aguarde até 60 segundos e recarregue a home em uma aba anônima.
5. Restaure o texto original e confirme a segunda atualização.

## 4.1 Studio com preview

O Studio 2.0 mantém rascunho e publicação separados:

1. Abra **Editor do site → Studio**.
2. Escolha PT, EN ou FR.
3. Selecione uma seção e altere um texto ou imagem.
4. Confira a mudança no preview real ao lado.
5. Use **Salvar rascunho** para manter a alteração privada.
6. Use **Publicar no site** somente depois da revisão.
7. Use **Descartar rascunho** para voltar ao conteúdo publicado.

O preview depende do bridge React e do cabeçalho `frame-ancestors` definido em
`netlify.toml`. A origem liberada é exclusivamente
`https://cms.eyegis-eyewear.com`.

## 5. Imagens

O documento **Biblioteca — Imagens do site** lista as imagens editoriais usadas pelos componentes React.

- `URL`: substituição desktop.
- `Imagem mobile`: substituição opcional para telas pequenas.
- `Texto alternativo`: descrição acessível e SEO.
- Campo vazio: preserva a imagem otimizada do repositório.

## 6. Conteúdo e segurança

- O endpoint é público porque entrega apenas o mesmo conteúdo já visível no site.
- A edição continua protegida pelo login e pelas permissões do WordPress.
- Use senha forte, autenticação em dois fatores e limite contas com perfil Administrador.
- Não instale plugins de CORS; a leitura acontece no servidor do React.

## 7. Atualizar o plugin durante o desenvolvimento

Execute:

```bash
npm run cms:seed
```

Depois gere um novo ZIP da pasta do plugin e atualize no WordPress. O processo cria documentos novos sem sobrescrever documentos já editados.
