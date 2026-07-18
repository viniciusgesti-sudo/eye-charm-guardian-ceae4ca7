"""
Visual regression harness for the Eyegis site.

Modes:
  python tests/visual/run.py baseline   # capture reference set
  python tests/visual/run.py compare    # diff current vs baseline + issue report

For every route × viewport, the page is scrolled top-to-bottom to trigger
scroll reveal animations, allowed to settle, then each section is captured
along with an axe-core color-contrast scan and overflow detection.
"""
from __future__ import annotations
import asyncio, json, sys, hashlib, shutil, base64
from pathlib import Path
from PIL import Image, ImageChops, ImageDraw
from playwright.async_api import async_playwright

ROOT = Path(__file__).resolve().parent
CFG = json.loads((ROOT / "config.json").read_text())
AXE_JS = None  # loaded lazily

# ---------------------------------------------------------------------------
# helpers
# ---------------------------------------------------------------------------

async def load_axe(page):
    """Inject axe-core; cache CDN copy on disk to keep runs offline-friendly."""
    global AXE_JS
    if AXE_JS is None:
        cache = ROOT / ".axe.min.js"
        if not cache.exists():
            import urllib.request
            urllib.request.urlretrieve(
                "https://cdn.jsdelivr.net/npm/axe-core@4.10.0/axe.min.js", cache
            )
        AXE_JS = cache.read_text()
    await page.add_script_tag(content=AXE_JS)

async def settle_reveals(page, viewport_h: int):
    """Scroll top→bottom in small steps so every IntersectionObserver fires,
    then wait for animations/transitions/network to settle."""
    total = await page.evaluate("document.documentElement.scrollHeight")
    step = max(300, viewport_h // 3)
    for y in range(0, total + step, step):
        await page.evaluate(f"window.scrollTo(0, {y})")
        await page.wait_for_timeout(120)
    await page.evaluate("window.scrollTo(0, 0)")
    await page.wait_for_timeout(200)
    # wait for CSS animations to finish
    await page.evaluate("""async () => {
      const anims = document.getAnimations?.() ?? [];
      await Promise.all(anims.map(a => a.finished.catch(() => {})));
    }""")
    try:
        await page.wait_for_load_state("networkidle", timeout=3000)
    except Exception:
        pass

async def detect_overflow(page):
    return await page.evaluate("""() => {
      const doc = document.documentElement;
      const vw = window.innerWidth;
      const findings = [];
      if (doc.scrollWidth > vw + 1) {
        findings.push({ type: 'document', scrollWidth: doc.scrollWidth, viewport: vw });
      }
      document.querySelectorAll('body *').forEach(el => {
        const r = el.getBoundingClientRect();
        if (r.width < 4 || r.height < 4) return;
        if (r.right > vw + 1 || r.left < -1) {
          const cs = getComputedStyle(el);
          if (cs.position === 'fixed' || cs.overflow === 'hidden') return;
          const tag = el.tagName.toLowerCase();
          const cls = (el.className && typeof el.className === 'string') ? '.' + el.className.split(/\\s+/).slice(0,2).join('.') : '';
          findings.push({
            type: 'element', tag, cls,
            left: Math.round(r.left), right: Math.round(r.right), width: Math.round(r.width),
            text: (el.innerText || '').slice(0, 60)
          });
        }
      });
      // cap noise
      return findings.slice(0, 40);
    }""")

async def contrast_violations(page, section_selector):
    result = await page.evaluate("""async (sel) => {
      if (!window.axe) return { violations: [] };
      const r = await window.axe.run(sel, {
        runOnly: ['color-contrast'],
        resultTypes: ['violations'],
      });
      return {
        violations: r.violations.map(v => ({
          id: v.id, impact: v.impact,
          nodes: v.nodes.slice(0, 6).map(n => ({
            html: n.html.slice(0, 220),
            target: n.target,
            summary: n.failureSummary?.slice(0, 200),
          }))
        }))
      };
    }""", section_selector)
    return result.get("violations", [])

async def enumerate_sections(page):
    selectors = ",".join(CFG["sectionSelectors"])
    return await page.evaluate("""(sel) => {
      const out = [];
      document.querySelectorAll(sel).forEach((el, i) => {
        const r = el.getBoundingClientRect();
        if (r.height < 40) return;
        const name = el.getAttribute('data-vr-section')
          || el.id
          || (el.tagName.toLowerCase() + '-' + i);
        out.push({ name, id: el.id || '', dataAttr: el.getAttribute('data-vr-section') || '' });
      });
      return out;
    }""", selectors)

def route_slug(route: str) -> str:
    return route.strip("/").replace("/", "_") or "home"

# ---------------------------------------------------------------------------
# capture
# ---------------------------------------------------------------------------

async def capture(mode: str):
    base_url = CFG["baseUrl"]
    baseline = Path(CFG["baselineDir"])
    out_root = Path(CFG["outputDir"]) if mode == "compare" else baseline
    if mode == "baseline":
        shutil.rmtree(baseline, ignore_errors=True)
    baseline.mkdir(parents=True, exist_ok=True)
    if mode == "compare":
        shutil.rmtree(out_root, ignore_errors=True)
        out_root.mkdir(parents=True, exist_ok=True)

    manifest = {"mode": mode, "routes": []}

    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        for route in CFG["routes"]:
            for vp in CFG["viewports"]:
                ctx = await browser.new_context(viewport={"width": vp["width"], "height": vp["height"]})
                page = await ctx.new_page()
                url = base_url.rstrip("/") + route
                try:
                    await page.goto(url, wait_until="domcontentloaded", timeout=30000)
                except Exception as e:
                    print(f"! goto failed {url}: {e}")
                    await ctx.close(); continue

                await settle_reveals(page, vp["height"])
                await load_axe(page)

                overflow = await detect_overflow(page)
                sections = await enumerate_sections(page)
                shots = []

                for sec in sections:
                    if sec["id"]:
                        sel = f"#{sec['id']}"
                    elif sec["dataAttr"]:
                        sel = f'[data-vr-section="{sec["dataAttr"]}"]'
                    else:
                        continue
                    slug = f"{route_slug(route)}__{vp['name']}__{sec['name']}"
                    shot_path = out_root / f"{slug}.png"
                    try:
                        loc = page.locator(sel).first
                        await loc.scroll_into_view_if_needed(timeout=2000)
                        await page.wait_for_timeout(150)
                        await loc.screenshot(path=str(shot_path))
                        violations = await contrast_violations(page, sel)
                    except Exception as e:
                        print(f"! shot failed {slug}: {e}")
                        continue
                    shots.append({
                        "slug": slug, "section": sec["name"], "selector": sel,
                        "contrast": violations,
                    })

                manifest["routes"].append({
                    "route": route, "viewport": vp["name"],
                    "overflow": overflow, "shots": shots,
                })
                await ctx.close()
        await browser.close()

    (out_root / "manifest.json").write_text(json.dumps(manifest, indent=2))
    print(f"✓ {mode}: {sum(len(r['shots']) for r in manifest['routes'])} shots → {out_root}")
    return manifest, out_root

# ---------------------------------------------------------------------------
# diff
# ---------------------------------------------------------------------------

def diff_pair(base_path: Path, cur_path: Path, diff_path: Path) -> float:
    if not base_path.exists() or not cur_path.exists():
        return 1.0
    a = Image.open(base_path).convert("RGB")
    b = Image.open(cur_path).convert("RGB")
    if a.size != b.size:
        # normalize to smaller box for a fair diff
        w, h = min(a.size[0], b.size[0]), min(a.size[1], b.size[1])
        a, b = a.crop((0, 0, w, h)), b.crop((0, 0, w, h))
    d = ImageChops.difference(a, b)
    bbox = d.getbbox()
    if not bbox:
        Image.new("RGB", a.size, (255, 255, 255)).save(diff_path)
        return 0.0
    # highlight
    mask = d.convert("L").point(lambda v: 255 if v > 10 else 0)
    over = a.copy()
    red = Image.new("RGB", a.size, (255, 0, 80))
    over.paste(red, mask=mask)
    over.save(diff_path)
    # ratio of changed pixels
    hist = mask.histogram()
    changed = sum(hist[10:])
    return changed / (a.size[0] * a.size[1])

def render_report(cur_manifest, cur_dir: Path):
    baseline = Path(CFG["baselineDir"])
    threshold = CFG["pixelThreshold"]
    rows = []
    total_diffs = total_contrast = total_overflow = 0
    for route in cur_manifest["routes"]:
        for shot in route["shots"]:
            base = baseline / f"{shot['slug']}.png"
            cur = cur_dir / f"{shot['slug']}.png"
            diff = cur_dir / f"{shot['slug']}__diff.png"
            ratio = diff_pair(base, cur, diff)
            regressed = ratio > threshold
            if regressed: total_diffs += 1
            total_contrast += len(shot["contrast"])
            rows.append({
                "route": route["route"], "viewport": route["viewport"],
                "section": shot["section"], "slug": shot["slug"],
                "ratio": ratio, "regressed": regressed,
                "contrast": shot["contrast"],
                "hasBaseline": base.exists(),
            })
        total_overflow += len(route["overflow"])

    def img_tag(p: Path):
        if not p.exists(): return "<em>—</em>"
        b64 = base64.b64encode(p.read_bytes()).decode()
        return f'<img src="data:image/png;base64,{b64}" loading="lazy" />'

    html = ["""<!doctype html><meta charset=utf-8>
<title>Eyegis — Visual Regression</title>
<style>
  body{font:14px/1.5 -apple-system,Segoe UI,sans-serif;margin:24px;background:#0f172a;color:#e2e8f0}
  h1{font-weight:600} h2{margin-top:32px;border-bottom:1px solid #334155;padding-bottom:6px}
  .summary{display:flex;gap:24px;margin:12px 0 24px}
  .stat{background:#1e293b;padding:12px 18px;border-radius:8px}
  .stat b{font-size:22px;display:block}
  .row{display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;margin:12px 0;background:#1e293b;padding:12px;border-radius:8px}
  .row img{width:100%;border:1px solid #334155;border-radius:4px}
  .cap{font-size:11px;color:#94a3b8;text-align:center;margin-top:4px}
  .meta{grid-column:1/-1;display:flex;justify-content:space-between;font-size:12px;color:#cbd5e1}
  .regressed{outline:2px solid #ef4444}
  .ok{opacity:0.55}
  .contrast{grid-column:1/-1;background:#3f1d1d;padding:8px;border-radius:4px;font-size:12px;color:#fecaca}
  code{background:#0f172a;padding:1px 4px;border-radius:3px;color:#f1f5f9}
</style>
"""]
    html.append(f"<h1>Eyegis · Visual Regression</h1>")
    html.append('<div class="summary">')
    html.append(f'<div class="stat"><b>{total_diffs}</b>visual regressions (&gt;{int(threshold*100)}%)</div>')
    html.append(f'<div class="stat"><b>{total_contrast}</b>contrast violations</div>')
    html.append(f'<div class="stat"><b>{total_overflow}</b>overflow findings</div>')
    html.append(f'<div class="stat"><b>{len(rows)}</b>sections scanned</div>')
    html.append('</div>')

    # overflow section
    if total_overflow:
        html.append("<h2>Overflow</h2>")
        for route in cur_manifest["routes"]:
            if not route["overflow"]: continue
            html.append(f"<h3>{route['route']} · {route['viewport']}</h3><ul>")
            for f in route["overflow"]:
                if f["type"] == "document":
                    html.append(f"<li>document scrollWidth {f['scrollWidth']}px &gt; viewport {f['viewport']}px</li>")
                else:
                    html.append(f"<li><code>&lt;{f['tag']}{f['cls']}&gt;</code> extends to x={f['right']}px (w={f['width']}) — <em>{f['text']}</em></li>")
            html.append("</ul>")

    html.append("<h2>Sections</h2>")
    for r in sorted(rows, key=lambda x: (not x["regressed"], -len(x["contrast"]))):
        cls = "row " + ("regressed" if r["regressed"] else "ok" if r["hasBaseline"] else "")
        html.append(f'<div class="{cls}">')
        html.append(f'<div class="meta"><span><b>{r["route"]}</b> · {r["viewport"]} · <code>{r["section"]}</code></span>'
                    f'<span>Δ {r["ratio"]*100:.2f}% {"— regression" if r["regressed"] else ""}</span></div>')
        base = baseline / f"{r['slug']}.png"
        cur = cur_dir / f"{r['slug']}.png"
        diff = cur_dir / f"{r['slug']}__diff.png"
        html.append(f'<div>{img_tag(base)}<div class="cap">baseline</div></div>')
        html.append(f'<div>{img_tag(cur)}<div class="cap">current</div></div>')
        html.append(f'<div>{img_tag(diff)}<div class="cap">diff</div></div>')
        if r["contrast"]:
            html.append('<div class="contrast"><b>Contrast:</b><ul>')
            for v in r["contrast"]:
                for n in v["nodes"]:
                    html.append(f'<li>{n["summary"] or v["id"]}<br><code>{n["target"]}</code></li>')
            html.append("</ul></div>")
        html.append("</div>")
    (cur_dir / "index.html").write_text("".join(html))
    print(f"✓ report → {cur_dir/'index.html'}  (regressions={total_diffs}, contrast={total_contrast}, overflow={total_overflow})")
    return total_diffs + total_contrast

# ---------------------------------------------------------------------------
# entry
# ---------------------------------------------------------------------------

async def main():
    mode = sys.argv[1] if len(sys.argv) > 1 else "compare"
    if mode not in ("baseline", "compare"):
        print("usage: run.py [baseline|compare]"); sys.exit(2)
    manifest, out_dir = await capture(mode)
    if mode == "compare":
        fails = render_report(manifest, out_dir)
        sys.exit(1 if fails else 0)

if __name__ == "__main__":
    asyncio.run(main())
