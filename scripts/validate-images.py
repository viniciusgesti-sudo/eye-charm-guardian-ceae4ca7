#!/usr/bin/env python3
"""
Eyegis — Image Catalog Validator
=================================
Automated gate for new imagery before it enters the catalog.

Checks per file:
  1. Dimensions              — min width/height
  2. Aspect ratio            — must match one of 1:1, 4:5, 4:3, 21:9 (±2% tol)
  3. Weight (file size)      — KB budget per ratio bucket
  4. Sharpness (blur)        — variance of Laplacian ≥ threshold
  5. Contrast                — luminance stddev ≥ threshold

Usage:
  python scripts/validate-images.py                       # scan src/assets
  python scripts/validate-images.py path/to/img.jpg ...   # scan specific files
  python scripts/validate-images.py --json                # machine-readable

Exit code 0 = all pass, 1 = any violation.
Requires: Pillow, numpy  (pip install Pillow numpy)
"""
from __future__ import annotations

import argparse
import json
import sys
from dataclasses import dataclass, asdict
from pathlib import Path
from typing import Iterable

try:
    from PIL import Image, ImageFilter, ImageStat
    import numpy as np
except ImportError as e:
    print(f"[validate-images] Missing dependency: {e.name}. Install with: pip install Pillow numpy", file=sys.stderr)
    sys.exit(2)

# ---------------------------------------------------------------- CONFIG ----

ALLOWED_EXT = {".jpg", ".jpeg", ".png", ".webp", ".avif"}

# Allowed aspect ratios (label → width/height), with ±TOL relative tolerance
RATIOS = {
    "1:1":  1 / 1,
    "4:5":  4 / 5,
    "4:3":  4 / 3,
    "21:9": 21 / 9,
}
RATIO_TOL = 0.02  # 2%

# Minimum pixel dimensions
MIN_WIDTH = 800
MIN_HEIGHT = 800

# Max file size (KB) per ratio bucket — tune as catalog grows
MAX_KB = {
    "1:1":  350,
    "4:5":  400,
    "4:3":  450,
    "21:9": 600,
}
MAX_KB_DEFAULT = 500

# Quality thresholds
MIN_SHARPNESS = 80.0   # variance of Laplacian (grayscale, 0..255)
MIN_CONTRAST  = 25.0   # stddev of luminance

# Default scan roots (relative to repo root)
DEFAULT_ROOTS = ["src/assets"]


# --------------------------------------------------------------- RESULTS ----

@dataclass
class Report:
    path: str
    width: int
    height: int
    kb: float
    ratio_label: str | None
    ratio_actual: float
    sharpness: float
    contrast: float
    errors: list[str]

    @property
    def ok(self) -> bool:
        return not self.errors


# --------------------------------------------------------------- HELPERS ----

def match_ratio(w: int, h: int) -> tuple[str | None, float]:
    actual = w / h
    for label, target in RATIOS.items():
        if abs(actual - target) / target <= RATIO_TOL:
            return label, actual
    return None, actual


def variance_of_laplacian(img: Image.Image) -> float:
    """Focus / blur metric. Higher = sharper. <80 tends to look soft."""
    gray = img.convert("L")
    # Downscale huge images to keep runtime bounded
    if max(gray.size) > 1200:
        gray.thumbnail((1200, 1200))
    edges = gray.filter(ImageFilter.Kernel(
        (3, 3), [0, 1, 0, 1, -4, 1, 0, 1, 0], scale=1
    ))
    arr = np.asarray(edges, dtype=np.float32)
    return float(arr.var())


def luminance_contrast(img: Image.Image) -> float:
    stat = ImageStat.Stat(img.convert("L"))
    return float(stat.stddev[0])


def analyze(path: Path) -> Report:
    errors: list[str] = []
    kb = path.stat().st_size / 1024.0

    try:
        with Image.open(path) as im:
            im.load()
            w, h = im.size
            label, actual = match_ratio(w, h)
            sharpness = variance_of_laplacian(im)
            contrast = luminance_contrast(im)
    except Exception as e:
        return Report(str(path), 0, 0, kb, None, 0.0, 0.0, 0.0,
                      [f"unreadable: {e}"])

    if w < MIN_WIDTH or h < MIN_HEIGHT:
        errors.append(f"dimensions {w}x{h} < min {MIN_WIDTH}x{MIN_HEIGHT}")

    if label is None:
        errors.append(f"ratio {actual:.3f} not in {list(RATIOS)} (±{int(RATIO_TOL*100)}%)")

    budget = MAX_KB.get(label, MAX_KB_DEFAULT)
    if kb > budget:
        errors.append(f"weight {kb:.0f}KB > budget {budget}KB")

    if sharpness < MIN_SHARPNESS:
        errors.append(f"blur: sharpness {sharpness:.0f} < {MIN_SHARPNESS:.0f}")

    if contrast < MIN_CONTRAST:
        errors.append(f"low contrast: stddev {contrast:.0f} < {MIN_CONTRAST:.0f}")

    return Report(str(path), w, h, kb, label, actual, sharpness, contrast, errors)


def iter_images(inputs: list[str]) -> Iterable[Path]:
    for inp in inputs:
        p = Path(inp)
        if p.is_dir():
            for f in sorted(p.rglob("*")):
                if f.suffix.lower() in ALLOWED_EXT and f.is_file():
                    yield f
        elif p.is_file() and p.suffix.lower() in ALLOWED_EXT:
            yield p


# ------------------------------------------------------------------ MAIN ----

def main() -> int:
    ap = argparse.ArgumentParser(description="Eyegis image catalog validator")
    ap.add_argument("paths", nargs="*", help="Files or directories (default: src/assets)")
    ap.add_argument("--json", action="store_true", help="Emit machine-readable JSON")
    ap.add_argument("--quiet", action="store_true", help="Only print failures")
    args = ap.parse_args()

    roots = args.paths or DEFAULT_ROOTS
    reports = [analyze(p) for p in iter_images(roots)]

    if args.json:
        print(json.dumps([asdict(r) | {"ok": r.ok} for r in reports], indent=2))
    else:
        failed = [r for r in reports if not r.ok]
        passed = [r for r in reports if r.ok]

        if not args.quiet:
            print(f"\n\033[1mEyegis · Image Catalog Validator\033[0m")
            print(f"Scanned: {len(reports)}  ·  Passed: {len(passed)}  ·  Failed: {len(failed)}\n")
            hdr = f"{'STATUS':<7}{'RATIO':<7}{'SIZE':<12}{'KB':>7}  {'SHARP':>6}  {'CTR':>5}  PATH"
            print(hdr)
            print("-" * len(hdr))
            for r in reports:
                status = "\033[32mOK\033[0m   " if r.ok else "\033[31mFAIL\033[0m "
                ratio = r.ratio_label or f"{r.ratio_actual:.2f}"
                print(f"{status}{ratio:<7}{r.width}x{r.height:<7}{r.kb:>7.0f}  "
                      f"{r.sharpness:>6.0f}  {r.contrast:>5.0f}  {r.path}")

        if failed:
            print(f"\n\033[31m✖ {len(failed)} image(s) failed validation:\033[0m")
            for r in failed:
                print(f"  · {r.path}")
                for e in r.errors:
                    print(f"      – {e}")
            return 1

        print(f"\n\033[32m✔ All {len(reports)} image(s) pass catalog rules.\033[0m")
    return 0


if __name__ == "__main__":
    sys.exit(main())
