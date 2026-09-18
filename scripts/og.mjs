// Builds the share images (the picture a link shows on WhatsApp, X, LinkedIn).
//
//   node scripts/og.mjs
//
// Writes public/social/og-websites.png and public/social/og-gallery.jpg.
// The home page's og-home.png is a made image, not generated here.
//
// The artwork lives in scripts/og/*.svg, where the type is already outlined in
// the site's own Archivo and JetBrains Mono — sharp's text input renders with
// whatever font fontconfig hands it, which on macOS is not ours. Outlines mean
// this step needs no fonts at all. scripts/og/README.md has the text step.
import sharp from "sharp";
import { mkdir } from "node:fs/promises";

const W = 1200;
const H = 630;

// Four frames rather than one photo: the page is a gallery, and no single
// photograph stands for it. The artwork keeps the left side for the text.
const FRAMES = [
  "public/photos/035-motorcycle.webp",
  "public/photos/04-sport.webp",
  "public/photos/102-slovenia-cave.webp",
  "public/photos/106-croatia-plitvice.webp",
];
const GRID_X = 560;
const GAP = 8;

async function gallery() {
  const cellW = Math.round((W - GRID_X - GAP) / 2);
  const cellH = Math.round((H - GAP) / 2);

  const cells = await Promise.all(
    FRAMES.map((file) => sharp(file).resize(cellW, cellH, { fit: "cover" }).toBuffer()),
  );

  return sharp({ create: { width: W, height: H, channels: 4, background: "#0c0b0a" } })
    .composite([
      ...cells.map((input, i) => ({
        input,
        left: GRID_X + (i % 2) * (cellW + GAP),
        top: Math.floor(i / 2) * (cellH + GAP),
      })),
      { input: "scripts/og/gallery.svg", top: 0, left: 0 },
    ])
    .jpeg({ quality: 86, chromaSubsampling: "4:4:4" })
    .toFile("public/social/og-gallery.jpg");
}

await mkdir("public/social", { recursive: true });
await sharp("scripts/og/websites.svg").png({ palette: true }).toFile("public/social/og-websites.png");
await gallery();
console.log("Wrote public/social/og-websites.png and public/social/og-gallery.jpg");
