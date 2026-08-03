var e,t=5e3;function n(t){e={error:t,at:Date.now()}}typeof globalThis.addEventListener==`function`&&(globalThis.addEventListener(`error`,e=>n(e.error??e)),globalThis.addEventListener(`unhandledrejection`,e=>n(e.reason)));function r(){if(!e)return;if(Date.now()-e.at>t){e=void 0;return}let{error:n}=e;return e=void 0,n}function i(){return`<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>This page didn't load</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style>
      body { font: 15px/1.5 system-ui, -apple-system, sans-serif; background: #fafafa; color: #111; display: grid; place-items: center; min-height: 100vh; margin: 0; padding: 1.5rem; }
      .card { max-width: 28rem; width: 100%; text-align: center; padding: 2rem; }
      h1 { font-size: 1.25rem; margin: 0 0 0.5rem; }
      p { color: #4b5563; margin: 0 0 1.5rem; }
      .actions { display: flex; gap: 0.5rem; justify-content: center; flex-wrap: wrap; }
      a, button { padding: 0.5rem 1rem; border-radius: 0.375rem; font: inherit; cursor: pointer; text-decoration: none; border: 1px solid transparent; }
      .primary { background: #111; color: #fff; }
      .secondary { background: #fff; color: #111; border-color: #d1d5db; }
    </style>
  </head>
  <body>
    <div class="card">
      <h1>This page didn't load</h1>
      <p>Something went wrong on our end. You can try refreshing or head back home.</p>
      <div class="actions">
        <button class="primary" onclick="location.reload()">Try again</button>
        <a class="secondary" href="/">Go home</a>
      </div>
    </div>
  </body>
</html>`}var a;async function o(){return a||=import(`./tanstack-DQRLoC-P.mjs`).then(e=>e.r).then(e=>e.default??e),a}var s=[{re:/Failed to resolve import/i,kind:`IMPORT_RESOLVE`},{re:/Cannot find module/i,kind:`IMPORT_RESOLVE`},{re:/does not provide an export named/i,kind:`IMPORT_EXPORT_SHAPE`},{re:/is not exported (?:by|from)/i,kind:`IMPORT_EXPORT_SHAPE`},{re:/The requested module .* does not provide/i,kind:`IMPORT_EXPORT_SHAPE`},{re:/Unexpected (?:token|identifier|end of)/i,kind:`SYNTAX_ERROR`},{re:/SyntaxError/i,kind:`SYNTAX_ERROR`},{re:/Element type is invalid/i,kind:`IMPORT_EXPORT_SHAPE`},{re:/is not defined/i,kind:`REFERENCE_ERROR`}];function c(e){let t=e instanceof Error&&(e.stack||e.message)||(typeof e==`string`?e:``);if(t){for(let{re:e,kind:n}of s)if(e.test(t))return n}}function l(e){let t=c(e.error)??`SSR_FAILURE`,n=e.error instanceof Error?e.error:Error(typeof e.error==`string`?e.error:JSON.stringify(e.error));if(console.error(`[PREVIEW-ERROR] kind=${t} status=${e.status} ${e.method} ${e.url} :: ${n.message}`),console.error(n),e.bodySnippet){let t=e.bodySnippet.length>2e3?`${e.bodySnippet.slice(0,2e3)}…[truncated ${e.bodySnippet.length-2e3} chars]`:e.bodySnippet;console.error(`[PREVIEW-ERROR] body-snippet:
${t}`)}}async function u(e,t){if(t.status<500)return t;let n=t.headers.get(`content-type`)??``,a=await t.clone().text(),o=n.includes(`application/json`)&&d(a),s=r();return l({url:e.url,method:e.method,status:t.status,error:s??Error(o?`h3 swallowed SSR error: ${a}`:a),bodySnippet:a}),o?new Response(i(),{status:500,headers:{"content-type":`text/html; charset=utf-8`}}):t}function d(e){try{let t=JSON.parse(e);return t.unhandled===!0&&t.message===`HTTPError`}catch{return!1}}var f={async fetch(e,t,n){try{return await u(e,await(await o()).fetch(e,t,n))}catch(t){return l({url:e.url,method:e.method,status:500,error:t}),new Response(i(),{status:500,headers:{"content-type":`text/html; charset=utf-8`}})}}};export{f as default,i as t};