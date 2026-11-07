#!/bin/sh
# Renders cv/cv.html with headless Chrome into public/cv.pdf, served by the site.
set -eu
cd "$(dirname "$0")/.."

chrome="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
src="file://$PWD/cv/cv.html"
tmp=$(mktemp -d)
trap 'rm -rf "$tmp"' EXIT

# render <output> <url> [chrome flags]: headless Chrome sometimes lingers
# after writing its output, so wait for the output instead of the process,
# then end it. A fresh profile per run keeps a killed run from stalling the next.
render() {
  out=$1 url=$2
  shift 2
  profile=$(mktemp -d "$tmp/profile.XXXX")
  "$chrome" --headless=new --disable-gpu --user-data-dir="$profile" \
    --allow-file-access-from-files --no-pdf-header-footer "$@" "$url" \
    >"$out.stdout" 2>/dev/null &
  for _ in $(seq 60); do
    grep -qs -e '%%EOF' -e '</html>' "$out" "$out.stdout" && break
    sleep 0.5
  done
  pkill -f "user-data-dir=$profile" 2>/dev/null || true
  wait 2>/dev/null || true
  [ -s "$out" ] || mv "$out.stdout" "$out"
}

render "$tmp/full.pdf" "$src" --print-to-pdf="$tmp/full.pdf"
[ -s "$tmp/full.pdf" ] || { echo "Chrome did not write the PDF" >&2; exit 1; }
mv "$tmp/full.pdf" public/cv.pdf
echo "Saved public/cv.pdf"
