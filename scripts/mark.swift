// Burns "© LORENZO MARCHISIO" into the bottom-right corner of each photo and
// writes it to <out-dir> as PNG: capped at 2000px on the long side, upright
// (EXIF orientation applied), in its own colour profile. Run by photos.sh.
//
//   swift scripts/mark.swift <out-dir> <photo>...
import AppKit

let mark = "© LORENZO MARCHISIO"
let outDir = URL(fileURLWithPath: CommandLine.arguments[1])

for path in CommandLine.arguments.dropFirst(2) {
  let url = URL(fileURLWithPath: path)
  guard
    let source = CGImageSourceCreateWithURL(url as CFURL, nil),
    // The thumbnail call applies EXIF orientation and scales in one go, and
    // never upscales past the original.
    let photo = CGImageSourceCreateThumbnailAtIndex(
      source, 0,
      [
        kCGImageSourceCreateThumbnailFromImageAlways: true,
        kCGImageSourceCreateThumbnailWithTransform: true,
        kCGImageSourceThumbnailMaxPixelSize: 2000,
      ] as CFDictionary)
  else {
    FileHandle.standardError.write(Data("skipped \(path): not an image\n".utf8))
    continue
  }

  let w = photo.width
  let h = photo.height
  let space =
    photo.colorSpace.flatMap { $0.model == .rgb ? $0 : nil }
    ?? CGColorSpace(name: CGColorSpace.sRGB)!
  let ctx = CGContext(
    data: nil, width: w, height: h, bitsPerComponent: 8, bytesPerRow: 0,
    space: space, bitmapInfo: CGImageAlphaInfo.noneSkipLast.rawValue)!
  ctx.draw(photo, in: CGRect(x: 0, y: 0, width: w, height: h))

  // Sized off the long side, so the mark reads the same on every photo.
  let size = CGFloat(max(w, h)) * 0.014
  let line = CTLineCreateWithAttributedString(
    NSAttributedString(
      string: mark,
      attributes: [
        .font: NSFont.monospacedSystemFont(ofSize: size, weight: .medium),
        .kern: size * 0.14,
        NSAttributedString.Key(kCTForegroundColorAttributeName as String):
          CGColor(gray: 1, alpha: 0.6),
      ]))
  let width = CTLineGetTypographicBounds(line, nil, nil, nil)

  // A soft dark halo keeps white text legible on snow and sky.
  ctx.setShadow(offset: .zero, blur: size * 0.5, color: CGColor(gray: 0, alpha: 0.5))
  ctx.textPosition = CGPoint(x: CGFloat(w) - size * 1.6 - width, y: size * 1.6)
  CTLineDraw(line, ctx)

  let out = outDir.appendingPathComponent(
    url.deletingPathExtension().lastPathComponent + ".png")
  guard
    let dest = CGImageDestinationCreateWithURL(out as CFURL, "public.png" as CFString, 1, nil)
  else { fatalError("cannot write \(out.path)") }
  CGImageDestinationAddImage(dest, ctx.makeImage()!, nil)
  guard CGImageDestinationFinalize(dest) else { fatalError("cannot write \(out.path)") }
}
