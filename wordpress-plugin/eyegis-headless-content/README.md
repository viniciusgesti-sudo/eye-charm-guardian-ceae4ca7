# Eyegis Headless Content

Plugin editorial do site React da Eyegis. Ele cria documentos editáveis no WordPress, integra a Biblioteca de Mídia e publica o conteúdo em uma API REST somente de leitura.

## Instalação

1. Use o ZIP de distribuição ou compacte a pasta `eyegis-headless-content`.
2. No WordPress, abra **Plugins → Adicionar plugin → Enviar plugin**.
3. Envie o ZIP e ative.
4. Abra **Editor do site → Studio** para editar a Home com preview real.
5. Use **Editor do site → Conteúdos e páginas** para escolher outras áreas ou gerenciar imagens.
6. Abra **Editor do site → Integração React**, confirme o endereço do front-end e copie a URL da API.
7. O endereço padrão do Studio é `https://eyegis-eyewear.com`. Durante a homologação, informe nessa tela a URL do Deploy Preview; o botão **Usar produção** restaura o padrão sem alterar o domínio público.
8. O projeto React de produção já possui esse endpoint configurado. Use
   `WORDPRESS_API_URL` no Netlify somente para substituir a instalação padrão
   em preview ou staging.

O front-end possui fallback local. Uma indisponibilidade temporária do WordPress não derruba o site.

Na instalação atual, o plugin cria 42 documentos editoriais e registra 62 imagens substituíveis sem liberar o layout do React para edição acidental. Os 42 documentos precisam estar publicados para aparecerem na API.

## Eyegis Studio 2.0

A prova funcional da Home oferece:

- editor à esquerda e preview real do React à direita;
- Português, Inglês e Francês;
- destaque e rolagem automática até o campo selecionado;
- alterações de texto aparecendo no preview sem publicar;
- imagens desktop e celular pela Biblioteca de Mídia;
- visualização desktop, tablet e celular;
- rascunho privado separado do conteúdo publicado;
- publicação autenticada pela REST API do WordPress;
- descarte seguro do rascunho.

O front-end precisa ser publicado com o bridge de preview e o cabeçalho
`Content-Security-Policy: frame-ancestors` antes de o iframe funcionar em
produção. Instalar o plugin antes dessa publicação não altera o site, mas o
Studio mostrará um aviso de que o preview ainda não respondeu.

Na tela **Integração React**, administradores podem apontar temporariamente o
Studio para um Deploy Preview. Essa configuração afeta somente o iframe e os
atalhos internos do plugin; ela não troca o domínio público nem executa um
deploy.

## Editor simplificado e biblioteca completa

A biblioteca editorial continua organizando a edição para usuários não técnicos:

- tela inicial com páginas e áreas do site;
- abas visuais para Português, Inglês e Francês;
- nomes amigáveis em vez de chaves internas;
- adicionar, remover e reordenar itens;
- botão de salvamento sempre visível;
- campos técnicos ocultos por padrão;
- galeria pesquisável para as 62 imagens;
- imagem separada para computador e celular;
- seleção pela Biblioteca de Mídia, prévia e texto alternativo;
- restauração da imagem original com um clique.

Para trocar uma imagem, abra **Editor do site → Visão geral → Imagens do site**, procure pelo nome, clique em **Escolher imagem** e depois em **Salvar alterações**.

O Elementor pode continuar instalado para páginas renderizadas pelo WordPress, mas não controla o layout do front-end React. O editor deste plugin é a camada editorial do site publicado no Netlify.

Na tela **Integração React**, o botão **Criar ou reparar documentos** publica documentos que ficaram em rascunho e restaura somente dados iniciais ausentes, sem sobrescrever conteúdo válido já editado. A atualização de esquema também acrescenta campos novos ausentes, como imagens mobile, sem substituir valores existentes.

## Atualização do conteúdo inicial

Na raiz do projeto React, execute:

```bash
npm run cms:seed
```

O comando atualiza `seed-content.json`. A ativação do plugin cria documentos ausentes sem sobrescrever edições existentes.
