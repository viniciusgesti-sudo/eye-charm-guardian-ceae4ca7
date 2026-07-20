"""
Focused visual regression: brand mark & flat icons.

Detects:
  - Stroke width regressions in lucide flat icons (must stay 1.5).
  - `mask-image` rendering breakage on <Logo /> (Chrome+WebKit+Firefox).
  - Adaptive tone drift (auto ink vs paper against real backgrounds).

Modes:
  python tests/visual/icons_and_logo.py baseline
  python tests/visual/icons_and_logo.py compare
"""
from __future__ import annotations
import asyncio, sys, json
from pathlib import Path
from PIL import Image, ImageChops
from playwright.async_api import async_playwright

ROOT       = Path(__file__).resolve().parent
BASE_URL   = "http://localhost:8080"
BASELINE   = ROOT / "__baseline__" / "icons_logo"
CURRENT    = Path("/tmp/browser/icons_logo/current")
REPORT     = Path("/mnt/documents/visual-report/icons_logo")
PIXEL_TOL  = 0.015  # 1.5% mean-diff threshold

# Targets: (name, url, css selector). Screenshots are element-scoped so they
# stay tiny and stable across unrelated layout changes.
TARGETS = [
    # Logo — mask-image renders through <Logo /> in the header on 3 surfaces.
    ("logo-header-light",  "/br",             "header a[href^='/br'] >> nth=0"),
    ("logo-footer-teal",   "/br",             "footer a[href^='/br'] >> nth=0"),
    ("logo-pdp-compact",   "/br/product/meridian", "header a[href^='/br'] >> nth=0"),
    # Flat icons — one per section that owns stroke-1.5 lucide icons.
    ("icons-eyegisguard",  "/br",             "[data-vr='eyegisguard-icons']"),
    ("icons-universe",     "/br",             "[data-vr='universe-icons']"),
    ("icons-techcore",     "/br/technology",  "[data-vr='techcore-icons']"),
    ("icons-faq-chevrons", "/br/faq",         "[data-vr='faq-icons']"),
]

BROWSERS = ["chromium", "webkit", "firefox"]


async def capture(mode: str) -> list[dict]:
    out_dir = BASELINE if mode == "baseline" else CURRENT
    out_dir.mkdir(parents=True, exist_ok=True)
    results = []

    async with async_playwright() as pw:
        for engine in BROWSERS:
            browser = await getattr(pw, engine).launch(headless=True)
            ctx = await browser.new_context(viewport={"width": 1280, "height": 1800},
                                            device_scale_factor=2)  # retina — catches subpixel stroke drift
            page = await ctx.new_page()

            for name, path, sel in TARGETS:
                key = f"{engine}__{name}"
                url = BASE_URL + path
                try:
                    await page.goto(url, wait_until="networkidle", timeout=20_000)
                    # Let fonts + mask-image settle
                    await page.evaluate("document.fonts.ready")
                    await page.wait_for_timeout(400)
                    loc = page.locator(sel).first
                    await loc.wait_for(state="visible", timeout=5_000)
                    shot = out_dir / f"{key}.png"
                    await loc.screenshot(path=str(shot), animations="disabled")
                    results.append({"key": key, "ok": True, "path": str(shot)})
                except Exception as e:
                    results.append({"key": key, "ok": False, "error": str(e)})
            await browser.close()
    return results


def diff_pair(baseline: Path, current: Path) -> float | None:
    """Return mean pixel-difference ratio in [0,1] or None if size mismatch."""
    if not baseline.exists() or not current.exists():
        return None
    a = Image.open(baseline).convert("RGB")
    b = Image.open(current).convert("RGB")
    if a.size != b.size:
        return 1.0  # treat size drift as full regression
    diff = ImageChops.difference(a, b)
    stat = diff.getbbox()
    if not stat:
        return 0.0
    px = list(diff.getdata())
    total = sum(sum(p) for p in px)
    return total / (len(px) * 3 * 255)


def run_compare():
    REPORT.mkdir(parents=True, exist_ok=True)
    report = []
    regressions = []
    for baseline_img in sorted(BASELINE.glob("*.png")):
        current_img = CURRENT / baseline_img.name
        d = diff_pair(baseline_img, current_img)
        status = "MISSING" if d is None else ("FAIL" if d > PIXEL_TOL else "PASS")
        row = {"file": baseline_img.name, "diff": d, "status": status}
        report.append(row)
        if status != "PASS":
            regressions.append(row)
            # Copy artifacts for triage
            if current_img.exists():
                (REPORT / current_img.name).write_bytes(current_img.read_bytes())
                (REPORT / f"baseline__{baseline_img.name}").write_bytes(baseline_img.read_bytes())

    (REPORT / "report.json").write_text(json.dumps(report, indent=2))

    print(f"\n{'file':<50} {'diff':>8} status")
    print("-" * 72)
    for r in report:
        d = f"{r['diff']:.4f}" if r["diff"] is not None else "  n/a"
        print(f"{r['file']:<50} {d:>8} {r['status']}")
    print("-" * 72)
    print(f"{len(regressions)} regression(s) · threshold={PIXEL_TOL}")
    if regressions:
        print(f"Artifacts: {REPORT}")
        sys.exit(1)


def main():
    mode = sys.argv[1] if len(sys.argv) > 1 else "compare"
    if mode not in ("baseline", "compare"):
        print("usage: icons_and_logo.py [baseline|compare]"); sys.exit(2)
    results = asyncio.run(capture(mode))
    fails = [r for r in results if not r["ok"]]
    if fails:
        print("Capture errors:")
        for r in fails:
            print(f"  ✗ {r['key']}: {r['error']}")
        sys.exit(1)
    if mode == "baseline":
        print(f"✓ Baseline saved to {BASELINE} ({len(results)} shots)")
    else:
        run_compare()


if __name__ == "__main__":
    main()
