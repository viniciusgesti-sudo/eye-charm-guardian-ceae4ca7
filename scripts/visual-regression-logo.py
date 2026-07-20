"""Visual-regression + WCAG contrast check for the Eyegis logo.

Loads the internal harness at /dev-a11y-logo, iterates every brand surface
(paper, champagne, mint, copper, copper-deep, teal, teal-deep, ink, black)
at three breakpoints (mobile 375, tablet 768, desktop 1440), screenshots
each swatch, samples the rendered logo pixels (mark + wordmark), and
computes the WCAG contrast ratio against the actual background color.

Writes:
  /mnt/documents/eyegis-logo-visual-regression.html   ← human report
  /mnt/documents/eyegis-logo-visual-regression.json   ← machine data
  /tmp/browser/logo-vr/<breakpoint>/<swatch>.png      ← per-swatch shots
"""

import asyncio
import json
import os
from pathlib import Path

from PIL import Image
from playwright.async_api import async_playwright

BASE = "http://localhost:8080/dev-a11y-logo"
OUT_DIR = Path("/tmp/browser/logo-vr")
REPORT_HTML = Path("/mnt/documents/eyegis-logo-visual-regression.html")
REPORT_JSON = Path("/mnt/documents/eyegis-logo-visual-regression.json")

BREAKPOINTS = [
    ("mobile",  375, 900),
    ("tablet",  768, 1000),
    ("desktop", 1440, 1200),
]

# WCAG thresholds
AA_TEXT = 4.5           # wordmark (small text)
AA_GRAPHIC = 3.0        # mark (non-text UI/graphics)


def rel_lum(rgb):
    def lin(c):
        s = c / 255
        return s / 12.92 if s <= 0.03928 else ((s + 0.055) / 1.055) ** 2.4
    r, g, b = rgb
    return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b)


def contrast(fg, bg):
    l1, l2 = rel_lum(fg), rel_lum(bg)
    hi, lo = max(l1, l2), min(l1, l2)
    return (hi + 0.05) / (lo + 0.05)


def dominant_fg_vs_bg(img: Image.Image, bg_hex: str):
    """Return (fg_rgb, ratio, sample_count).

    Approach: consider every pixel; classify as background if within
    tolerance of the declared surface hex, otherwise foreground. The
    dominant foreground is the mean of the pixels furthest from the bg.
    """
    px = img.convert("RGB").load()
    w, h = img.size
    bg_r = int(bg_hex[1:3], 16)
    bg_g = int(bg_hex[3:5], 16)
    bg_b = int(bg_hex[5:7], 16)
    tol = 28  # per-channel tolerance for anti-aliasing / gradients
    fg_pixels = []
    for y in range(0, h, 2):
        for x in range(0, w, 2):
            r, g, b = px[x, y]
            if abs(r - bg_r) <= tol and abs(g - bg_g) <= tol and abs(b - bg_b) <= tol:
                continue
            fg_pixels.append((r, g, b))
    if not fg_pixels:
        return (bg_r, bg_g, bg_b), 1.0, 0
    # Take the darkest 5% and lightest 5%, whichever is further from bg.
    sorted_by_lum = sorted(fg_pixels, key=lambda c: rel_lum(c))
    k = max(1, len(sorted_by_lum) // 20)
    dark = sorted_by_lum[:k]
    light = sorted_by_lum[-k:]
    dark_mean = tuple(sum(c[i] for c in dark) // len(dark) for i in range(3))
    light_mean = tuple(sum(c[i] for c in light) // len(light) for i in range(3))
    cand = max([dark_mean, light_mean], key=lambda fg: contrast(fg, (bg_r, bg_g, bg_b)))
    return cand, contrast(cand, (bg_r, bg_g, bg_b)), len(fg_pixels)


async def collect():
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    results = []
    async with async_playwright() as pw:
        browser = await pw.chromium.launch(headless=True)
        try:
            for bp_name, w, h in BREAKPOINTS:
                ctx = await browser.new_context(viewport={"width": w, "height": h})
                page = await ctx.new_page()
                await page.goto(BASE, wait_until="networkidle")
                await page.wait_for_selector("[data-swatch]")
                # Allow tone-detection + mask asset to settle.
                await page.wait_for_timeout(400)

                swatches = await page.evaluate("""
                    () => Array.from(document.querySelectorAll('[data-swatch]')).map(el => ({
                        id: el.getAttribute('data-swatch'),
                        bgHex: el.getAttribute('data-bg-hex'),
                    }))
                """)

                bp_dir = OUT_DIR / bp_name
                bp_dir.mkdir(exist_ok=True)

                for sw in swatches:
                    el = page.locator(f"[data-swatch='{sw['id']}']")
                    await el.scroll_into_view_if_needed()
                    # Screenshot the full swatch and each logo slot separately.
                    swatch_path = bp_dir / f"{sw['id']}.png"
                    await el.screenshot(path=str(swatch_path))

                    for slot in ("mark+word", "mark-only"):
                        slot_el = el.locator(f"[data-logo-slot='{slot}']")
                        slot_png = bp_dir / f"{sw['id']}__{slot.replace('+','-')}.png"
                        await slot_el.screenshot(path=str(slot_png))
                        img = Image.open(slot_png)
                        fg, ratio, n = dominant_fg_vs_bg(img, sw["bgHex"])
                        threshold = AA_GRAPHIC if slot == "mark-only" else AA_TEXT
                        results.append({
                            "breakpoint": bp_name,
                            "viewport": f"{w}x{h}",
                            "swatch": sw["id"],
                            "bgHex": sw["bgHex"],
                            "slot": slot,
                            "fgRgb": list(fg),
                            "ratio": round(ratio, 2),
                            "threshold": threshold,
                            "pass": ratio >= threshold,
                            "sampledPixels": n,
                            "screenshot": str(slot_png),
                            "swatchScreenshot": str(swatch_path),
                        })
                await ctx.close()
        finally:
            await browser.close()
    return results


def html_report(results):
    rows = []
    fails = [r for r in results if not r["pass"]]
    for r in results:
        fg_hex = "#%02X%02X%02X" % tuple(r["fgRgb"])
        status = "PASS" if r["pass"] else "FAIL"
        status_color = "#0a7d3a" if r["pass"] else "#b91c1c"
        rel = os.path.relpath(r["screenshot"], REPORT_HTML.parent) if REPORT_HTML.parent in Path(r["screenshot"]).parents else r["screenshot"]
        rows.append(f"""
        <tr>
          <td>{r['breakpoint']}<br><small>{r['viewport']}</small></td>
          <td><span class="chip" style="background:{r['bgHex']}"></span> {r['swatch']}<br><small>{r['bgHex']}</small></td>
          <td>{r['slot']}</td>
          <td><span class="chip" style="background:{fg_hex}"></span> {fg_hex}</td>
          <td><b>{r['ratio']}</b> : 1<br><small>need ≥ {r['threshold']}</small></td>
          <td style="color:{status_color};font-weight:600">{status}</td>
          <td><img src="file://{r['screenshot']}" style="max-height:56px;background:{r['bgHex']};padding:4px;border-radius:6px"></td>
        </tr>
        """)
    summary = f"{len(results) - len(fails)} / {len(results)} pass"
    html = f"""<!doctype html><html><head><meta charset="utf-8">
<title>Eyegis Logo — Visual Regression</title>
<style>
  body {{ font: 14px/1.5 -apple-system, system-ui, sans-serif; margin: 24px; color:#1D252D; }}
  h1 {{ margin: 0 0 4px; }}
  .sub {{ color:#666; margin-bottom: 20px; }}
  table {{ border-collapse: collapse; width: 100%; }}
  th, td {{ border-bottom: 1px solid #eee; padding: 10px 8px; text-align:left; vertical-align: middle; }}
  th {{ background:#fafafa; font-weight:600; font-size:12px; text-transform:uppercase; letter-spacing:.06em; color:#555; }}
  .chip {{ display:inline-block; width:14px; height:14px; border-radius:3px; border:1px solid rgba(0,0,0,.15); vertical-align:-2px; margin-right:6px; }}
  .banner {{ padding: 12px 16px; border-radius: 8px; margin-bottom: 16px; font-weight:600; }}
  .ok {{ background:#e8f6ed; color:#0a7d3a; }}
  .bad {{ background:#fdecec; color:#b91c1c; }}
</style></head><body>
<h1>Eyegis Logo — Visual Regression</h1>
<div class="sub">WCAG AA · text ≥ 4.5:1 (mark+wordmark) · graphics ≥ 3:1 (mark-only)</div>
<div class="banner {'ok' if not fails else 'bad'}">{summary}{' — all combinations pass.' if not fails else f' — {len(fails)} failing combination(s).'}</div>
<table>
  <thead><tr><th>Breakpoint</th><th>Surface</th><th>Slot</th><th>Sampled FG</th><th>Contrast</th><th>Status</th><th>Sample</th></tr></thead>
  <tbody>{''.join(rows)}</tbody>
</table>
</body></html>"""
    REPORT_HTML.write_text(html)


async def main():
    results = await collect()
    REPORT_JSON.write_text(json.dumps(results, indent=2))
    html_report(results)
    fails = [r for r in results if not r["pass"]]
    print(f"total={len(results)} fails={len(fails)}")
    for r in fails:
        print(f"  FAIL {r['breakpoint']:7} {r['swatch']:12} {r['slot']:10} ratio={r['ratio']} need>={r['threshold']}")
    print(f"report → {REPORT_HTML}")
    if fails:
        raise SystemExit(1)


if __name__ == "__main__":
    asyncio.run(main())
