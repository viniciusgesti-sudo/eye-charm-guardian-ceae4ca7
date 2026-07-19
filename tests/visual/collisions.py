"""
Regressão visual focada: garante que Header, HUD do Hero e Sticky Buy Bar
não colidem entre si e não perdem contraste em breakpoints críticos.

Uso:
  python tests/visual/collisions.py
  BASE_URL=http://localhost:8080 python tests/visual/collisions.py

Saída:
  - JSON: /mnt/documents/collision-report.json
  - Screenshots das falhas: /mnt/documents/collision-shots/
  - Exit code != 0 quando alguma asserção falha (uso em CI/local).
"""
from __future__ import annotations
import asyncio, json, os, sys
from pathlib import Path
from playwright.async_api import async_playwright, Page

BASE_URL = os.environ.get("BASE_URL", "http://localhost:8080")
OUT_DIR = Path("/mnt/documents/collision-shots")
REPORT = Path("/mnt/documents/collision-report.json")
OUT_DIR.mkdir(parents=True, exist_ok=True)

# Rotas críticas: hero escuro (home) + hero claro (about/lenses) + PDP.
ROUTES = [
    "/pt", "/en", "/pt/about", "/en/women", "/pt/technology",
    "/pt/faq", "/lenses", "/product/meridian",
]
VIEWPORTS = [
    {"name": "mobile-sm", "w": 360, "h": 780},
    {"name": "mobile",    "w": 390, "h": 844},
    {"name": "tablet",    "w": 768, "h": 1024},
    {"name": "laptop",    "w": 1280, "h": 800},
    {"name": "desktop",   "w": 1536, "h": 900},
]

def overlap(a, b) -> bool:
    if not a or not b: return False
    return not (a["x"] + a["width"] <= b["x"]
                or b["x"] + b["width"] <= a["x"]
                or a["y"] + a["height"] <= b["y"]
                or b["y"] + b["height"] <= a["y"])

async def rect(page: Page, selector: str):
    try:
        loc = page.locator(selector).first
        if await loc.count() == 0: return None
        box = await loc.bounding_box()
        return box
    except Exception:
        return None

async def all_rects(page: Page, selector: str):
    boxes = []
    loc = page.locator(selector)
    n = await loc.count()
    for i in range(n):
        b = await loc.nth(i).bounding_box()
        if b: boxes.append(b)
    return boxes

async def header_contrast(page: Page) -> dict:
    """Compara luminância do texto do CTA vs pixel de fundo atrás dele.
    Retorna ratio WCAG aproximado."""
    return await page.evaluate("""() => {
      function L(rgb){
        const [r,g,b] = rgb.map(v => {
          v = v/255; return v <= 0.03928 ? v/12.92 : Math.pow((v+0.055)/1.055, 2.4);
        });
        return 0.2126*r + 0.7152*g + 0.0722*b;
      }
      function parse(c){
        const m = c.match(/rgba?\\(([^)]+)\\)/); if(!m) return [0,0,0];
        return m[1].split(',').slice(0,3).map(v=>parseFloat(v));
      }
      const el = document.querySelector('[data-testid="header-cta"]');
      if(!el) return {ok:false, reason:'no-cta'};
      const r = el.getBoundingClientRect();
      const cs = getComputedStyle(el);
      const fg = parse(cs.color);
      // Fundo efetivo: sobe pela árvore até achar bg não-transparente.
      let node = el, bg = null;
      while(node && node !== document.documentElement){
        const s = getComputedStyle(node).backgroundColor;
        const p = parse(s);
        const alpha = (s.match(/rgba?\\(([^)]+)\\)/)||[,'0,0,0,0'])[1].split(',')[3];
        if(p.some(v=>v>0) && (alpha === undefined || parseFloat(alpha) > 0.5)){ bg = p; break; }
        node = node.parentElement;
      }
      if(!bg) bg = [255,255,255];
      const l1 = L(fg), l2 = L(bg);
      const ratio = (Math.max(l1,l2)+0.05)/(Math.min(l1,l2)+0.05);
      return {ok:true, ratio: Math.round(ratio*100)/100, fg, bg,
              rect:{x:r.x,y:r.y,w:r.width,h:r.height}};
    }""")

async def run():
    failures = []
    summary = []
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        for vp in VIEWPORTS:
            ctx = await browser.new_context(viewport={"width": vp["w"], "height": vp["h"]})
            page = await ctx.new_page()
            for route in ROUTES:
                url = BASE_URL.rstrip("/") + route
                try:
                    await page.goto(url, wait_until="domcontentloaded", timeout=20000)
                    await page.wait_for_selector('[data-testid="site-header"]', state="attached", timeout=8000)
                except Exception as e:
                    failures.append({"route": route, "viewport": vp["name"],
                                     "issue": "goto-failed", "detail": str(e)})
                    continue
                await page.wait_for_timeout(400)

                header = await rect(page, '[data-testid="site-header"]')
                cta    = await rect(page, '[data-testid="header-cta"]')
                huds   = await all_rects(page, '[data-testid="hero-hud"]')
                sticky = await rect(page, '[data-testid="sticky-buy-bar"]')

                row = {"route": route, "viewport": vp["name"],
                       "header": header, "huds": huds, "sticky": sticky}

                # 1) Header presente e ocupa a largura total.
                if not header or header["width"] < vp["w"] * 0.95:
                    failures.append({**row, "issue": "header-missing-or-narrow"})

                # 2) CTA dentro do header (não estoura para fora).
                if header and cta:
                    if cta["x"] + cta["width"] > vp["w"] + 1 or cta["x"] < -1:
                        failures.append({**row, "issue": "cta-overflows-viewport",
                                         "cta": cta})
                    if cta["y"] + cta["height"] > header["y"] + header["height"] + 1:
                        failures.append({**row, "issue": "cta-outside-header", "cta": cta})

                # 3) HUD do Hero não pode ficar coberto pelo header.
                for i, h in enumerate(huds):
                    if header and overlap(header, h):
                        failures.append({**row, "issue": "hud-overlaps-header",
                                         "hud": h, "index": i})

                # 4) Sticky bar não pode invadir o header (topo do viewport).
                if header and sticky and overlap(header, sticky):
                    failures.append({**row, "issue": "sticky-overlaps-header"})

                # 5) Contraste do CTA >= 4.5 (WCAG AA texto normal).
                contrast = await header_contrast(page)
                row["contrast"] = contrast
                if contrast.get("ok") and contrast["ratio"] < 4.5:
                    failures.append({**row, "issue": "cta-low-contrast",
                                     "ratio": contrast["ratio"]})

                summary.append(row)

                # snapshot só quando há falha para este route/vp
                if any(f["route"] == route and f["viewport"] == vp["name"] for f in failures):
                    slug = f"{vp['name']}__{route.strip('/').replace('/', '_') or 'home'}.png"
                    try:
                        await page.screenshot(path=str(OUT_DIR / slug),
                                              clip={"x":0,"y":0,"width":vp["w"],
                                                    "height":min(vp["h"], 900)})
                    except Exception: pass
            await ctx.close()
        await browser.close()

    REPORT.write_text(json.dumps({"failures": failures, "checks": summary}, indent=2))
    print(f"checks={len(summary)}  failures={len(failures)}  report={REPORT}")
    for f in failures[:20]:
        print(f"  ✗ {f['viewport']:9s} {f['route']:24s} {f['issue']}")
    sys.exit(1 if failures else 0)

if __name__ == "__main__":
    asyncio.run(run())
