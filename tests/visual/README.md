# Visual Regression — Eyegis

Screenshot-based regression suite that catches **contrast** and **overflow** issues on any style change, capturing sections in their **post-reveal** state (after scroll animations settle).

## What it does

For each combination of route × viewport × section:

1. Launches Chromium at the target route.
2. Scrolls the page top→bottom to trigger every `IntersectionObserver` / scroll reveal.
3. Waits for animations to settle (`animation-play-state`, `transitionend`, network idle).
4. Screenshots each section by id/data-testid.
5. Runs `axe-core` on the section (color-contrast rule) and records violations.
6. Detects horizontal overflow (`scrollWidth > clientWidth`) and elements bleeding past the viewport.
7. Diffs against the baseline (pixel + perceptual threshold) and writes an HTML report.

## Usage

```bash
# Capture baseline (run once, or after intentional visual changes)
python tests/visual/run.py baseline

# Compare current build against baseline (run on every style PR)
python tests/visual/run.py compare
```

Reports land in `/mnt/documents/visual-report/index.html` with side-by-side baseline/current/diff plus contrast + overflow findings.

## Config

Edit `tests/visual/config.json`:

```json
{
  "baseUrl": "http://localhost:8080",
  "routes": ["/", "/about", "/technology", "/lenses", "/faq"],
  "viewports": [
    { "name": "desktop", "width": 1280, "height": 1800 },
    { "name": "mobile",  "width": 390,  "height": 1600 }
  ],
  "sectionSelectors": ["section[id]", "[data-vr-section]"],
  "pixelThreshold": 0.02
}
```

Tag any critical block you want tracked explicitly with `data-vr-section="name"`.
