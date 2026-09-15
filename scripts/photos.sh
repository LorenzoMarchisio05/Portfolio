#!/bin/sh
# Rebuilds public/photos/ from the clean originals in photos-src/ (gitignored).
# Every photo gets the © mark burned into its corner (mark.swift), is encoded to
# WebP keeping its colour profile but dropping EXIF — camera serial numbers and
# GPS coordinates do not ship — and is tagged with copyright XMP.
#
# Feed it clean originals only, never public/photos itself: the mark would be
# stamped twice. Needs swift (Xcode command line tools) and `brew install webp`.
set -eu
cd "$(dirname "$0")/.."

[ -d photos-src ] || { echo "photos-src/ is missing: put the original photos there" >&2; exit 1; }

tmp=$(mktemp -d)
trap 'rm -rf "$tmp"' EXIT

# -L: entries may be symlinks to the originals, named for the site.
find -L photos-src -maxdepth 1 -type f \( -iname '*.jpg' -o -iname '*.jpeg' -o -iname '*.png' -o -iname '*.webp' \) -print0 |
  xargs -0 swift scripts/mark.swift "$tmp"

cat >"$tmp/copyright.xmp" <<EOF
<x:xmpmeta xmlns:x="adobe:ns:meta/">
 <rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">
  <rdf:Description rdf:about=""
    xmlns:dc="http://purl.org/dc/elements/1.1/"
    xmlns:xmpRights="http://ns.adobe.com/xap/1.0/rights/">
   <dc:creator><rdf:Seq><rdf:li>Lorenzo Marchisio</rdf:li></rdf:Seq></dc:creator>
   <dc:rights><rdf:Alt><rdf:li xml:lang="x-default">© $(date +%Y) Lorenzo Marchisio. All rights reserved.</rdf:li></rdf:Alt></dc:rights>
   <xmpRights:Marked>True</xmpRights:Marked>
   <xmpRights:WebStatement>https://lorenzomarchisio.me</xmpRights:WebStatement>
  </rdf:Description>
 </rdf:RDF>
</x:xmpmeta>
EOF

# The gallery grid loads thumbs/ (800px, the largest a cell gets on a retina
# screen); the full 2000px file only loads when a photo is opened.
mkdir -p "$tmp/thumbs" public/photos/thumbs
# A renamed or removed original must not leave its old output in the gallery.
rm -f public/photos/*.webp public/photos/thumbs/*.webp

for png in "$tmp"/*.png; do
  n=$(basename "$png" .png)
  cwebp -quiet -q 78 -m 6 -sharp_yuv -metadata icc "$png" -o "$tmp/$n.webp"
  webpmux -set xmp "$tmp/copyright.xmp" "$tmp/$n.webp" -o "public/photos/$n.webp" >/dev/null
  sips -Z 800 "$png" --out "$tmp/thumbs/$n.png" >/dev/null
  cwebp -quiet -q 74 -m 6 -sharp_yuv -metadata icc "$tmp/thumbs/$n.png" -o "$tmp/thumbs/$n.webp"
  webpmux -set xmp "$tmp/copyright.xmp" "$tmp/thumbs/$n.webp" -o "public/photos/thumbs/$n.webp" >/dev/null
  echo "public/photos/$n.webp"
done
