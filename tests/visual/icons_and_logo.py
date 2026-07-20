"""
Focused visual regression: Eyegis brand mark & flat icons.

Two-tier strategy — each catches a different failure class:

  1. LOGO — pixel snapshots of <Logo /> in Chromium, WebKit, Firefox on
     three background surfaces (light header, dark footer, PDP compact
     header). Detects `mask-image` rendering breakage, adaptive-tone
     drift, and wordmark font swaps.

  2. ICONS — headless DOM audit that walks every lucide SVG on the key
     routes and asserts stroke-width === 1.5 (with a tiny allowlist for
     technical hairlines in HonestScience / OurTechnology). Detects any
     regression in flat-icon weight without needing pixel baselines.

Modes:
  python tests/visual/icons_and_logo.py baseline   # capture logo baselines
  python tests/visual/icons_and_logo.py compare    # diff + icon audit (CI)
  python tests/visual/icons_and_logo.py icons      # icon audit only
"""
from __future__ import annotations
import asyncio, sys, json
from pathlib import Path
from PIL import Image, ImageChops
from playwright.async_api import async_playwright

BASE_URL   = "http://localhost:8080"
ROOT       = Path(__file__).resolve().parent
BASELINE   = ROOT / "__baseline__" / "icons_logo"
CURRENT    = Path("/tmp/browser/icons_logo/current")
REPORT     = Path("/mnt/documents/visual-report/icons_logo")
PIXEL_TOL  = 0.02  # 2% mean-diff — accommodates minor font antialiasing

# --- Logo snapshot targets --------------------------------------------------
# Header <Logo /> is the same node on every page; we scope to the first
# link inside <header> which is the wordmark+shield.
LOGO_TARGETS = [
    ("logo-header-home",    "/br",                    "header a >> nth=0"),
    ("logo-footer-teal",    "/br",                    "footer a >> nth=0"),
    ("logo-header-pdp",     "/br/product/meridian",   "header a >> nth=0"),
]
BROWSERS = ["chromium", "webkit", "firefox"]

# --- Icon audit -------------------------------------------------------------
ICON_ROUTES = ["/br", "/br/men", "/br/women", "/br/kids",
               "/br/technology", "/br/faq", "/br/lenses"]
EXPECTED_STROKE = 1.5
# Sections that intentionally use thinner strokes for technical diagrams.
STROKE_ALLOWLIST_SELECTORS = [
    "[data-section='honest-science']",
    "[data-section='our-technology']",
    "svg[data-technical='true']",
]

# ---------------------------------------------------------------------------

async def capture_logos(mode: str) -> list[dict]:
    out_dir = BASELINE if mode == "baseline" else CURRENT
    out_dir.mkdir(parents=True, exist_ok=True)
    results = []
    async with async_playwright() as pw:
        for engine in BROWSERS:
            browser = await getattr(pw, engine).launch(headless=True)
            ctx = await browser.new_context(
                viewport={"width": 1280, "height": 1800},
                device_scale_factor=2,   # retina — surfaces subpixel drift
            )
            page = await ctx.new_page()
            for name, path, sel in LOGO_TARGETS:
                key = f"{engine}__{name}"
                try:
                    await page.goto(BASE_URL + path, wait_until="networkidle", timeout=25_000)
                    await page.evaluate("document.fonts.ready")
                    await page.wait_for_timeout(500)
                    if "footer" in sel:
                        await page.evaluate("window.scrollTo(0, document.body.scrollHeight)")
                        await page.wait_for_timeout(400)
                    loc = page.locator(sel).first
                    await loc.wait_for(state="visible", timeout=6_000)
                    shot = out_dir / f"{key}.png"
                    await loc.screenshot(path=str(shot), animations="disabled")
                    results.append({"key": key, "ok": True})
                except Exception as e:
                    results.append({"key": key, "ok": False, "error": str(e)})
            await browser.close()
    return results


async def audit_icon_strokes() -> list[dict]:
    """Walk every lucide SVG and flag any stroke-width != 1.5."""
    findings = []
    js = r"""
    (allowlist) => {
      const isAllowed = (el) => allowlist.some(sel => el.closest(sel));
      const results = [];
      document.querySelectorAll('svg').forEach((svg) => {
        // lucide icons carry class 'lucide' and have stroke-width attribute
        if (!svg.classList.contains('lucide')) return;
        if (isAllowed(svg)) return;
        const attr = svg.getAttribute('stroke-width');
        const computed = window.getComputedStyle(svg).strokeWidth;
        const width = parseFloat(attr ?? computed);
        results.push({
          name: [...svg.classList].find(c => c.startsWith('lucide-')) || 'lucide',
          strokeWidth: width,
          rect: svg.getBoundingClientRect(),
        });
      });
      return results;
    }
    """
    async with async_playwright() as pw:
        browser = await pw.chromium.launch(headless=True)
        ctx = await browser.new_context(viewport={"width": 1280, "height": 1800})
        page = await ctx.new_page()
        for route in ICON_ROUTES:
            try:
                await page.goto(BASE_URL + route, wait_until="networkidle", timeout=25_000)
                # Scroll to trigger lazy sections
                await page.evaluate("""
                  async () => {
                    for (let y = 0; y < document.body.scrollHeight; y += 900) {
                      window.scrollTo(0, y);
                      await new Promise(r => setTimeout(r, 60));
                    }
                    window.scrollTo(0, 0);
                  }
                """)
                await page.wait_for_timeout(400)
                icons = await page.evaluate(js, STROKE_ALLOWLIST_SELECTORS)
                total = len(icons)
                bad = [i for i in icons
                       if abs(i["strokeWidth"] - EXPECTED_STROKE) > 0.01]
                findings.append({
                    "route": route, "total": total, "bad": len(bad),
                    "offenders": [{"name": b["name"], "width": b["strokeWidth"]}
                                  for b in bad[:20]],
                })
            except Exception as e:
                findings.append({"route": route, "error": str(e)})
        await browser.close()
    return findings


def diff_pair(a: Path, b: Path) -> float | None:
    if not a.exists() or not b.exists(): return None
    ia = Image.open(a).convert("RGB")
    ib = Image.open(b).convert("RGB")
    if ia.size != ib.size: return 1.0
    diff = ImageChops.difference(ia, ib)
    px = list(diff.getdata())
    return sum(sum(p) for p in px) / (len(px) * 3 * 255)


def report_logos():
    REPORT.mkdir(parents=True, exist_ok=True)
    rows, regressions = [], []
    for baseline_img in sorted(BASELINE.glob("*.png")):
        cur = CURRENT / baseline_img.name
        d = diff_pair(baseline_img, cur)
        status = "MISSING" if d is None else ("FAIL" if d > PIXEL_TOL else "PASS")
        rows.append({"file": baseline_img.name, "diff": d, "status": status})
        if status != "PASS":
            regressions.append(rows[-1])
            if cur.exists():
                (REPORT / cur.name).write_bytes(cur.read_bytes())
                (REPORT / f"baseline__{baseline_img.name}").write_bytes(baseline_img.read_bytes())
    (REPORT / "logo-report.json").write_text(json.dumps(rows, indent=2))
    print(f"\n{'LOGO SNAPSHOTS':<52} {'diff':>8} status")
    print("-" * 72)
    for r in rows:
        d = f"{r['diff']:.4f}" if r["diff"] is not None else "  n/a"
        print(f"  {r['file']:<50} {d:>8} {r['status']}")
    print(f"  → {len(regressions)} regression(s) · threshold={PIXEL_TOL}")
    return len(regressions)


def report_icons(findings):
    (REPORT / "icon-report.json").write_text(json.dumps(findings, indent=2))
    print(f"\n{'ICON STROKE AUDIT (expected 1.5)':<52} {'total':>6} {'bad':>4}")
    print("-" * 72)
    fail = 0
    for f in findings:
        if "error" in f:
            print(f"  {f['route']:<50} ERROR: {f['error']}")
            fail += 1; continue
        marker = "✓" if f["bad"] == 0 else "✗"
        print(f"  {marker} {f['route']:<48} {f['total']:>6} {f['bad']:>4}")
        for o in f["offenders"]:
            print(f"      · {o['name']}  stroke-width={o['width']}")
        fail += f["bad"]
    print(f"  → {fail} icon(s) off spec")
    return fail


def main():
    mode = sys.argv[1] if len(sys.argv) > 1 else "compare"
    REPORT.mkdir(parents=True, exist_ok=True)

    if mode == "baseline":
        errs = asyncio.run(capture_logos("baseline"))
        bad = [e for e in errs if not e["ok"]]
        if bad:
            print("Capture errors:", bad); sys.exit(1)
        print(f"✓ Logo baseline saved ({len(errs)} shots) → {BASELINE}")
        return

    if mode == "icons":
        findings = asyncio.run(audit_icon_strokes())
        sys.exit(1 if report_icons(findings) else 0)

    # compare (default)
    errs = asyncio.run(capture_logos("compare"))
    bad = [e for e in errs if not e["ok"]]
    for b in bad: print(f"  ✗ capture {b['key']}: {b['error']}")
    logo_fail = report_logos() + len(bad)
    icons     = asyncio.run(audit_icon_strokes())
    icon_fail = report_icons(icons)
    print("\n" + "=" * 72)
    print(f" SUMMARY  ·  logo regressions: {logo_fail}  ·  icon issues: {icon_fail}")
    print("=" * 72)
    sys.exit(1 if (logo_fail or icon_fail) else 0)


if __name__ == "__main__":
    main()
