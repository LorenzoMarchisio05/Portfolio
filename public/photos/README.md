Photographs for the SIX FRAMES section.

The .webp files here are generated — originals live in ../../photos-src/
(gitignored, 122MB of JPEG). To regenerate after changing an original:

  for f in photos-src/*.jpg; do
    n=$(basename "$f" .jpg)
    w=$(sips -g pixelWidth "$f" | awk '/pixelWidth/{print $2}')
    h=$(sips -g pixelHeight "$f" | awk '/pixelHeight/{print $2}')
    if [ "$w" -ge "$h" ]; then rw=2000; rh=0; else rw=0; rh=2000; fi
    cwebp -q 78 -m 6 -sharp_yuv -metadata icc -resize "$rw" "$rh" "$f" -o "public/photos/$n.webp"
  done

-metadata icc keeps the Display P3 profile on the wide-gamut shots and drops
EXIF, so camera serial numbers and GPS coordinates do not ship.

Each slot has one ratio at every width; CSS crops to it with object-fit: cover,
centred. Add object-position on a frame if a centred crop cuts something.

  01-motorcycle   3:2
  02-alpine       2:3
  03-sport        3:2
  04-sport        2:3
  05-alpine       3:1 panorama — the deepest crop, keeps the middle band
  06-motorcycle   3:2

A file that is absent keeps the striped placeholder. A file that is present
needs `alt` filled in, in src/components/sections/Photography.astro.
