#!/bin/sh
# Trims the Google Fonts latin files in fonts-src/ to what the site sets and
# writes them to public/fonts/. Worth it on a slow phone, where these two files
# are most of what stands between first paint and the page in its own type.
#
# Every Western European letter is kept, so new copy with accents still renders
# in the site's type; the rest of the latin subset (spacing modifiers, most of
# General Punctuation) goes. Archivo also loses the part of its axes nothing
# asks for: the site sets widths 62–90% and weights 100–700, and the wide
# (125%) and black (900) masters were most of the file.
#
# Keep UNICODES in step with the latin faces' unicode-range in global.css, and
# the Archivo axis ranges with its font-weight and font-stretch there.
# /fonts/ is cached as immutable (public/_headers), so a changed output needs a
# new name: bump V, then rename the files in global.css and Layout.astro's
# preloads.
# Needs: pip install fonttools brotli
set -eu
cd "$(dirname "$0")/.."

V=2
UNICODES="U+0020-007E,U+00A0-00FF,U+0131,U+0152-0153,U+02C6,U+02DA,U+02DC,U+2013-2014,U+2018-201A,U+201C-201E,U+2020-2022,U+2026,U+2030,U+2039-203A,U+20AC,U+2122,U+2191,U+2193,U+2212"

tmp=$(mktemp -d)
trap 'rm -rf "$tmp"' EXIT

fonttools varLib.instancer -q fonts-src/archivo-latin.woff2 wdth=62:100 wght=100:700 -o "$tmp/archivo.ttf"

subset() {
  pyftsubset "$1" --unicodes="$UNICODES" --layout-features='*' --flavor=woff2 --output-file="$2"
}
subset "$tmp/archivo.ttf" "public/fonts/archivo-latin.v$V.woff2"
subset fonts-src/jetbrains-mono-latin.woff2 "public/fonts/jetbrains-mono-latin.v$V.woff2"

wc -c fonts-src/*.woff2 public/fonts/*latin.v$V.woff2
