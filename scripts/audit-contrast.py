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

def reason(fg_name, bg_name, ratio, intended, g_text, g_ui):
    """Explain why a pairing passes or fails, in plain language."""
    notes = []
    if not intended:
        notes.append("Not an intended pairing — informational only.")
    if ratio < 3.0:
        notes.append(
            f"Contrast {ratio:.2f}:1 is below WCAG 1.4.11 (3:1) for UI/graphical objects — "
            "icons and the shield mark would be visually indistinct."
        )
    elif ratio < 4.5:
        notes.append(
            f"Contrast {ratio:.2f}:1 meets AA for icons/large text (≥3:1) but is below "
            "WCAG 1.4.3 (4.5:1) — do not use for body copy or the small wordmark."
        )
    elif ratio < 7.0:
        notes.append(
            f"Contrast {ratio:.2f}:1 meets AA for normal text (≥4.5:1); below AAA (7:1)."
        )
    else:
        notes.append(f"Contrast {ratio:.2f}:1 meets AAA for text and UI — safest tier.")
    if intended and g_ui == "FAIL":
        notes.append("ACTION: replace foreground or darken/lighten the background token.")
    return " ".join(notes)


def write_html_report(results, summary, out_path):
    import html, datetime
    def cell_bg(ratio):
        if ratio >= 7: return "#d1fadf"
        if ratio >= 4.5: return "#e6f4ea"
        if ratio >= 3: return "#fff4d6"
        return "#fde2e1"
    rows_html = []
    for r in results:
        row_bg = cell_bg(r["ratio"])
        intended_mark = "✓" if r["intended"] else "·"
        rows_html.append(f"""
          <tr style="background:{row_bg}">
            <td><code>{html.escape(r['fg_name'])}</code><br><span class="hex">{r['fg_hex']}</span></td>
            <td><code>{html.escape(r['bg_name'])}</code><br><span class="hex">{r['bg_hex']}</span></td>
            <td class="swatch"><span style="background:{r['fg_hex']};color:{r['bg_hex']}">Aa</span>
                <span style="background:{r['bg_hex']};color:{r['fg_hex']}">Aa</span></td>
            <td class="num">{r['ratio']:.2f}:1</td>
            <td>{r['g_text']}</td>
            <td>{r['g_ui']}</td>
            <td style="text-align:center">{intended_mark}</td>
            <td class="reason">{html.escape(r['reason'])}</td>
          </tr>""")
    intended_fails = [r for r in results if r["intended"] and r["g_ui"] == "FAIL"]
    fails_html = ""
    if intended_fails:
        items = "".join(
            f"<li><b>{html.escape(r['fg_name'])}</b> on <b>{html.escape(r['bg_name'])}</b> "
            f"— {r['ratio']:.2f}:1 · {html.escape(r['reason'])}</li>"
            for r in intended_fails
        )
        fails_html = f'<div class="alert fail"><h3>Intended pairings below AA 3:1 ({len(intended_fails)})</h3><ul>{items}</ul></div>'
    else:
        fails_html = '<div class="alert ok"><h3>✓ All intended logo/icon pairings meet WCAG AA (≥3:1).</h3></div>'

    html_doc = f"""<!doctype html>
<html lang="en"><head><meta charset="utf-8">
<title>Eyegis · Contrast Audit</title>
<style>
  :root{{color-scheme:light}}
  *{{box-sizing:border-box}}
  body{{font:14px/1.5 -apple-system,BlinkMacSystemFont,'Inter',sans-serif;color:#1D252D;background:#F9F9F9;margin:0;padding:32px}}
  header{{max-width:1200px;margin:0 auto 24px}}
  h1{{font-family:'Georgia',serif;font-size:28px;margin:0 0 4px;color:#004B57}}
  .meta{{color:#6b7280;font-size:12px;font-family:ui-monospace,monospace}}
  main{{max-width:1200px;margin:0 auto}}
  .cards{{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:12px;margin:16px 0 24px}}
  .card{{background:#fff;border:1px solid #e5e7eb;border-radius:10px;padding:14px}}
  .card b{{font-size:22px;display:block;color:#004B57}}
  .card span{{font-size:11px;text-transform:uppercase;letter-spacing:.08em;color:#6b7280}}
  .alert{{border-radius:12px;padding:16px 20px;margin:20px 0}}
  .alert.ok{{background:#d1fadf;border:1px solid #86efac;color:#064e3b}}
  .alert.fail{{background:#fde2e1;border:1px solid #fca5a5;color:#7f1d1d}}
  .alert h3{{margin:0 0 8px;font-size:15px}}
  .alert ul{{margin:0;padding-left:20px}}
  table{{width:100%;border-collapse:collapse;background:#fff;border-radius:10px;overflow:hidden;box-shadow:0 1px 2px rgba(0,0,0,.04)}}
  th,td{{padding:10px 12px;text-align:left;border-bottom:1px solid #eef2f6;vertical-align:top;font-size:13px}}
  th{{background:#004B57;color:#F9F9F9;font-size:11px;text-transform:uppercase;letter-spacing:.08em;position:sticky;top:0}}
  code{{font-family:ui-monospace,monospace;font-size:12px}}
  .hex{{font-family:ui-monospace,monospace;font-size:10px;color:#6b7280}}
  .num{{font-variant-numeric:tabular-nums;font-weight:600}}
  .swatch span{{display:inline-block;padding:6px 10px;border-radius:6px;font-weight:700;margin-right:4px;border:1px solid rgba(0,0,0,.08)}}
  .reason{{max-width:420px;color:#334155;font-size:12px}}
  footer{{max-width:1200px;margin:24px auto 0;font-size:11px;color:#6b7280;text-align:center}}
</style></head>
<body>
<header>
  <h1>Eyegis · Contrast &amp; Legibility Audit</h1>
  <div class="meta">Generated {datetime.datetime.utcnow().isoformat(timespec='seconds')}Z · WCAG 2.1 · Text ≥ 4.5 (AA) / 7 (AAA) · UI+icons ≥ 3.0 (AA)</div>
</header>
<main>
  <div class="cards">
    <div class="card"><b>{summary['rows']}</b><span>Combinations tested</span></div>
    <div class="card"><b>{summary['intended']}</b><span>Intended pairings</span></div>
    <div class="card"><b>{summary['fail_text']}</b><span>Text-level failures (&lt;4.5:1)</span></div>
    <div class="card"><b>{summary['fail_ui']}</b><span>UI-level failures (&lt;3:1)</span></div>
  </div>
  {fails_html}
  <table>
    <thead><tr>
      <th>Foreground</th><th>Background</th><th>Preview</th>
      <th>Ratio</th><th>Text</th><th>Icon/UI</th><th>Intended</th><th>Reason / Notes</th>
    </tr></thead>
    <tbody>{''.join(rows_html)}</tbody>
  </table>
</main>
<footer>Eyegis brand tokens — automated audit · reproducible via <code>python scripts/audit-contrast.py</code></footer>
</body></html>"""
    import os
    os.makedirs(os.path.dirname(out_path), exist_ok=True)
    with open(out_path, "w", encoding="utf-8") as f:
        f.write(html_doc)


def main():
    print("=" * 78)
    print(" EYEGIS · Logo & Icon contrast audit (WCAG 2.1)")
    print(" Threshold: text ≥ 4.5 (AA) / 7 (AAA)  ·  UI+icons ≥ 3.0 (AA)")
    print("=" * 78)

    results = []
    failures_text = []
    failures_ui = []
    intended_failures = []
    rows = 0
    intended_count = 0

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
                intended_count += 1
                if g_text == "FAIL":
                    failures_text.append((fg_name, bg_name, r))
                if g_ui == "FAIL":
                    failures_ui.append((fg_name, bg_name, r))
                    intended_failures.append((fg_name, bg_name, r))
            results.append({
                "fg_name": fg_name, "fg_hex": fg_hex,
                "bg_name": bg_name, "bg_hex": bg_hex,
                "ratio": r, "g_text": g_text, "g_ui": g_ui,
                "intended": intended,
                "reason": reason(fg_name, bg_name, r, intended, g_text, g_ui),
            })

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

    out_path = "/mnt/documents/eyegis-contrast-audit.html"
    write_html_report(
        results,
        {"rows": rows, "intended": intended_count,
         "fail_text": len(failures_text), "fail_ui": len(failures_ui)},
        out_path,
    )
    print(f"\n  → HTML report written to {out_path}")


if __name__ == "__main__":
    main()

