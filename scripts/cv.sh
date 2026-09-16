#!/bin/sh
# Renders cv/cv.html with headless Chrome into
#   public/cv.pdf                    full CV, served by the site
#   cv/Lorenzo-Marchisio-CV.pdf      one page, for applications
#   cv/Lorenzo-Marchisio-CV.docx     one page, for portals that want Word
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
render "$tmp/short.pdf" "$src?short" --print-to-pdf="$tmp/short.pdf"
render "$tmp/short.html" "$src?short&docx" --dump-dom

for f in full.pdf short.pdf short.html; do
  [ -s "$tmp/$f" ] || { echo "Chrome did not write $f" >&2; exit 1; }
done

textutil -convert docx -format html "$tmp/short.html" -output "$tmp/short.docx"
# textutil writes a few non-standard attributes, no space above headings
# (cv.html marks them) and no page setup: fix those for Word, set A4 with
# 13 mm top and bottom, 15 mm side margins.
python3 - "$tmp/short.docx" <<'EOF'
import re, sys, zipfile
path = sys.argv[1]
with zipfile.ZipFile(path) as z:
    parts = {name: z.read(name) for name in z.namelist()}
doc = parts["word/document.xml"].decode()
for old, new in [
    ("w:sz-cs", "w:szCs"),
    ('<w:ind w:left="720" w:first-line="-720"/>', '<w:tabs><w:tab w:val="left" w:pos="360"/></w:tabs><w:ind w:left="360" w:hanging="360"/>'),
    ('<w:t xml:space="preserve"></w:t><w:tab/><w:t xml:space="preserve">•</w:t>', '<w:t xml:space="preserve">•</w:t>'),
    ('<w:spacing w:after="70"/>', '<w:spacing w:before="160" w:after="70"/>'),
    ("<w:sectPr></w:sectPr>", '<w:sectPr><w:pgSz w:w="11906" w:h="16838"/>'
     '<w:pgMar w:top="720" w:right="850" w:bottom="720" w:left="850" w:header="0" w:footer="0" w:gutter="0"/></w:sectPr>'),
]:
    assert old in doc, old
    doc = doc.replace(old, new)
# The schema wants paragraph spacing before indentation; textutil writes it after.
doc = re.sub(r"(<w:ind [^>]*/>)(<w:spacing [^>]*/>)", r"\2\1", doc)
parts["word/document.xml"] = doc.encode()
with zipfile.ZipFile(path, "w", zipfile.ZIP_DEFLATED) as z:
    for name, data in parts.items():
        z.writestr(name, data)
EOF
mv "$tmp/full.pdf" public/cv.pdf
mv "$tmp/short.pdf" cv/Lorenzo-Marchisio-CV.pdf
mv "$tmp/short.docx" cv/Lorenzo-Marchisio-CV.docx
echo "Saved public/cv.pdf, cv/Lorenzo-Marchisio-CV.pdf, cv/Lorenzo-Marchisio-CV.docx"
