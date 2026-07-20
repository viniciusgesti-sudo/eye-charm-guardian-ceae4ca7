#!/usr/bin/env python3
"""Automated WCAG contrast audit for Eyegis brand tokens.

Checks every foreground (logo/icon color) x background combination
used across the site and reports AA / AAA compliance.

Usage:  python3 scripts/audit-contrast.py
"""
from __future__ import annotations

BRAND = {
    # foregrounds used by <Logo /> and lucide icons
    "ink":          "#1D252D",  # text-ink (dark body text / logo on light)
    "paper":        "#F9F9F9",  # text-paper (light logo on dark)
    "teal":         "#004B57",  # primary
    "teal-deep":    "#003842",
    "mint":         "#86D9D1",  # accent
    "copper":       "#B4956B",  # editorial accent
    "copper-deep":  "#8A6E4A",
    "muted-fg":     "#2E3742",  # muted-foreground on paper
    "muted-fg-dk":  "#E6EAEE",  # muted-foreground on ink (dark mode)
}

BACKGROUNDS = {
    "paper":       "#F9F9F9",  # bg-paper / bg-background (light)
    "paper-warm":  "#F3EFE9",
    "champagne":   "#E2D1C3",  # bg-secondary
    "muted":       "#EFE5D9",
    "ink":         "#1D252D",  # bg-ink / dark mode background
    "teal":        "#004B57",  # bg-primary (footer, buttons)
    "teal-deep":   "#003842",
    "mint":        "#86D9D1",  # bg-accent
}

# Where each foreground is intended to appear.
INTENDED = {
    "ink":         ["paper", "paper-warm", "champagne", "muted", "mint"],
    "paper":       ["ink", "teal", "teal-deep"],
    "teal":        ["paper", "paper-warm", "champagne", "muted", "mint"],
    "teal-deep":   ["paper", "paper-warm", "champagne", "mint"],
    "mint":        ["ink", "teal", "teal-deep"],
    "copper":      ["ink", "teal-deep"],
    "copper-deep": ["paper", "paper-warm", "champagne"],
    "muted-fg":    ["paper", "paper-warm"],
    "muted-fg-dk": ["ink", "teal-deep"],
}

def hex_to_rgb(h: str):
    h = h.lstrip("#")
    return tuple(int(h[i:i+2], 16) for i in (0, 2, 4))

def rel_lum(rgb):
    def lin(c):
        s = c / 255
        return s / 12.92 if s <= 0.03928 else ((s + 0.055) / 1.055) ** 2.4
    r, g, b = rgb
    return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b)

def contrast(fg_hex, bg_hex):
    l1, l2 = rel_lum(hex_to_rgb(fg_hex)), rel_lum(hex_to_rgb(bg_hex))
    if l1 < l2: l1, l2 = l2, l1
    return (l1 + 0.05) / (l2 + 0.05)

def grade(ratio, kind="ui"):
    # Logo wordmark counts as normal text; the shield mark and icons
    # (>=24px, stroke 1.5) count as UI/graphical objects (WCAG 1.4.11: 3:1).
    if kind == "text":
        if ratio >= 7.0: return "AAA"
        if ratio >= 4.5: return "AA"
        return "FAIL"
    # ui / graphical / large text
    if ratio >= 4.5: return "AAA+"
    if ratio >= 3.0: return "AA"
    return "FAIL"

def bar(ratio):
    return "█" * min(int(ratio * 2), 30)

def main():
    print("=" * 78)
    print(" EYEGIS · Logo & Icon contrast audit (WCAG 2.1)")
    print(" Threshold: text ≥ 4.5 (AA) / 7 (AAA)  ·  UI+icons ≥ 3.0 (AA)")
    print("=" * 78)

    failures_text = []
    failures_ui = []
    intended_failures = []
    rows = 0

    for fg_name, fg_hex in BRAND.items():
        print(f"\n▸ Foreground: {fg_name:<12} {fg_hex}")
        print(f"  {'background':<14} {'ratio':>7}   {'text':<6} {'icon/UI':<7} {'intended':<9} bar")
        print(f"  {'-'*14} {'-'*7}   {'-'*6} {'-'*7} {'-'*9} {'-'*30}")
        for bg_name, bg_hex in BACKGROUNDS.items():
            if fg_hex == bg_hex:
                continue
            r = contrast(fg_hex, bg_hex)
            g_text = grade(r, "text")
            g_ui   = grade(r, "ui")
            intended = bg_name in INTENDED.get(fg_name, [])
            mark = "✓" if intended else " "
            print(f"  {bg_name:<14} {r:>6.2f}:1  {g_text:<6} {g_ui:<7} {mark:<9} {bar(r)}")
            rows += 1
            if intended:
                if g_text == "FAIL":
                    failures_text.append((fg_name, bg_name, r))
                if g_ui == "FAIL":
                    failures_ui.append((fg_name, bg_name, r))
                    intended_failures.append((fg_name, bg_name, r))

    print("\n" + "=" * 78)
    print(" SUMMARY")
    print("=" * 78)
    print(f"  Combinations tested   : {rows}")
    print(f"  Intended text failures (AA 4.5): {len(failures_text)}")
    print(f"  Intended UI failures (AA 3.0)  : {len(failures_ui)}")

    if intended_failures:
        print("\n  ✗ INTENDED PAIRINGS BELOW 3:1 (must fix):")
        for fg, bg, r in intended_failures:
            print(f"    - {fg} on {bg}: {r:.2f}:1")
    else:
        print("\n  ✓ All intended logo/icon pairings meet WCAG AA (≥3:1 for UI).")

    if failures_text:
        print("\n  ⚠ Intended pairings below 4.5:1 (OK for icons/large logo, NOT for body text):")
        for fg, bg, r in failures_text:
            print(f"    - {fg} on {bg}: {r:.2f}:1")

    print()

if __name__ == "__main__":
    main()
