# Lays out the share images and writes them next to this file as SVG, with the
# type outlined in the site's own Archivo and JetBrains Mono. sharp renders text
# with whatever font fontconfig hands it, which on macOS is never ours, so the
# glyphs become paths here instead. Run this after changing any wording, then
# `node scripts/og.mjs` to rasterise:
#
#   pip install 'fonttools[woff]' && python scripts/og/text.py
import os
import sys
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont
from fontTools.pens.svgPathPen import SVGPathPen

REPO = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
W, H, PAD = 1200, 630, 64
INK, BONE, SIGNAL, CAPTION = "#0c0b0a", "#f2efe9", "#ff2f1d", "#b4ada3"


def load(path, location=None):
    font = TTFont(path)
    if location:
        font = instantiateVariableFont(font, location, updateFontNames=False)
    return font


# The headings use weight 700 at 82% width; the mono runs are regular.
headline = load(f"{REPO}/fonts-src/archivo-latin.woff2", {"wght": 700, "wdth": 82})
mono = load(f"{REPO}/fonts-src/jetbrains-mono-latin.woff2", {"wght": 400})


def run_paths(font, text, size, x, y, colour, tracking=0.0):
    """One run of text as SVG paths, left to right from (x, y) on the baseline."""
    upem = font["head"].unitsPerEm
    scale = size / upem
    glyphs = font.getGlyphSet()
    cmap = font.getBestCmap()
    hmtx = font["hmtx"]
    out = []
    for char in text:
        name = cmap.get(ord(char))
        if name is None:
            raise SystemExit(f"{char!r} is missing from the font")
        pen = SVGPathPen(glyphs)
        glyphs[name].draw(pen)
        d = pen.getCommands()
        if d:
            # The glyph is drawn y-up from the baseline, so flip it into SVG space.
            out.append(
                f'<path d="{d}" fill="{colour}" '
                f'transform="translate({x:.2f} {y:.2f}) scale({scale:.5f} {-scale:.5f})"/>'
            )
        x += hmtx[name][0] * scale + tracking
    return "".join(out), x


def line(font, runs, size, x, y, tracking=0.0):
    """`runs` is a list of (text, colour)."""
    svg = []
    for text, colour in runs:
        paths, x = run_paths(font, text, size, x, y, colour, tracking)
        svg.append(paths)
    return "".join(svg)


def wordmark(y=62):
    return line(mono, [("LM", BONE), (".", SIGNAL)], 19, PAD, y, 19 * 0.18)


def eyebrow(label, y=168):
    return line(mono, [(label, SIGNAL)], 16, PAD, y, 16 * 0.18)


def dotted(parts, size, y, colour):
    """`A · B · C`, with the separators in red."""
    runs = []
    for i, part in enumerate(parts):
        if i:
            runs.append((" · ", SIGNAL))
        runs.append((part, colour))
    return line(mono, runs, size, PAD, y, size * 0.12)


def document(body):
    return (
        f'<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}" '
        f'viewBox="0 0 {W} {H}">{body}</svg>'
    )


RULES = (
    f'<rect x="{PAD}" y="106" width="{W - PAD * 2}" height="1" fill="{BONE}" opacity=".1"/>'
    f'<rect x="{PAD}" y="{H - 130}" width="{W - PAD * 2}" height="1" fill="{BONE}" opacity=".1"/>'
    f'<rect x="{PAD}" y="{H - 132}" width="120" height="3" fill="{SIGNAL}"/>'
)

# ---- the websites page ----
websites = document(
    f'<rect width="{W}" height="{H}" fill="{INK}"/>'
    + RULES
    + wordmark()
    + eyebrow("120° · WEBSITE STUDIO")
    + line(headline, [("Websites that make", BONE)], 86, PAD, 286)
    + line(headline, [("your business easy to find", BONE)], 86, PAD, 370)
    + line(headline, [("and easy to choose.", BONE)], 86, PAD, 454)
    + dotted(
        ["FIXED PRICE FROM €990", "LIVE IN 7 WORKING DAYS", "ANY LANGUAGE"],
        15,
        H - 72,
        CAPTION,
    )
)

# ---- the photo gallery: text and veil over the photographs node composites ----
GRID_X = 560
gallery = document(
    f'<defs><linearGradient id="fade" x1="0" x2="1">'
    f'<stop offset="0" stop-color="{INK}" stop-opacity=".97"/>'
    f'<stop offset="1" stop-color="{INK}" stop-opacity="0"/>'
    f"</linearGradient></defs>"
    f'<rect x="{GRID_X}" y="0" width="{W - GRID_X}" height="{H}" fill="{INK}" opacity=".22"/>'
    f'<rect x="{GRID_X - 110}" y="0" width="220" height="{H}" fill="url(#fade)"/>'
    f'<rect x="{PAD}" y="106" width="{GRID_X - PAD - 130}" height="1" fill="{BONE}" opacity=".1"/>'
    f'<rect x="{PAD}" y="{H - 132}" width="120" height="3" fill="{SIGNAL}"/>'
    + wordmark()
    + eyebrow("240° · PHOTOGRAPHER")
    + line(headline, [("EVERY", BONE)], 132, PAD, 318)
    + line(headline, [("FRAME", BONE)], 132, PAD, 444)
)

out = sys.argv[1] if len(sys.argv) > 1 else os.path.dirname(os.path.abspath(__file__))
open(f"{out}/websites.svg", "w").write(websites)
open(f"{out}/gallery.svg", "w").write(gallery)
print(f"Wrote {out}/websites.svg and {out}/gallery.svg")
