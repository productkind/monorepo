---
name: hdr-glow
description: Make a logo or image glow on HDR/EDR displays (Mac XDR, iPhone) by re-encoding it in Rec.2020 + PQ so bright content sits above SDR white, tagged with Apple's "Rec2020 Gamut with PQ Transfer" profile. Use for glowing brand logos, social-share images, and eye-catching announcement graphics. Triggers include "make this glow", "HDR/EDR version", "glowing logo", or any Rec.2020/PQ glow task.
---

## HDR glow

Turn a normal SDR logo or image into one that **glows on HDR/EDR displays** (Apple XDR/Liquid Retina Macs, recent iPhones, HDR browsers). The pixels are re-encoded so bright areas sit *above* SDR white, and the file carries the `Rec2020 Gamut with PQ Transfer` ICC profile so macOS, Safari and Preview render it as HDR. Everywhere HDR isn't supported it degrades gracefully to a normal image.

Reach for this when:
- You want a brand logo or social-share graphic to light up in a feed or on a Mac.
- You're matching the effect of an existing HDR asset (the reference this was built from was `productkind/video-generator/public/social-012/metaview_technologies_logo.jpeg`).

### How it works

`glow.py` linearizes the sRGB input, converts it to the Rec.2020 gamut, scales brightness, encodes with the SMPTE ST 2084 (PQ) transfer function, and embeds the bundled `assets/rec2020-pq.icc` profile (lifted from that Apple reference file). On an EDR screen the PQ curve maps the bright pixels to luminance above SDR paper white (~203 nits), which is the glow. `glow.sh` wraps it and renders SVG input to PNG first (via Inkscape).

### The two scripts

Run from this skill's base directory.

**1. `scripts/glow.sh` — one command, SVG or raster in.**
```
scripts/glow.sh <input.svg|png|jpg> [options]
  -o FILE     output (default <name>-hdr-glow-<peak>.jpg in the cwd)
  -m MODE     gradient (only colours glow, default) | all (whites glow too)
  -p NITS     glow peak: 1000 (default, recommended) or 2000 (max)
  -b R,G,B    background for transparency, sRGB 0-255 (default 255,255,255 white)
  -w PX       render width for SVG input (default 1200; height keeps aspect)
  --          pass extra flags to glow.py, e.g. --white-nits 180 --c1 0.15
```

**2. `scripts/glow.py` — the encoder (raster in, raster out).** Called by `glow.sh`; run directly if the input is already a PNG/JPG and you want no Inkscape step. Same `--mode/--peak/--bg` flags, plus `--white-nits`, `--c0/--c1` (chroma ramp), `--no-gamut`, `--icc`, `--quality`.

### Modes and the peak

| Want | Use |
|------|-----|
| Only the coloured gradients glow, white/black stay normal | `-m gradient` (default) |
| White backgrounds glow too (whole tile lights up) | `-m all` |
| Gentle, tasteful glow | `-p 1000` (default) |
| Maximum punch, matches the Apple reference | `-p 2000` |
| Large white field that blooms too hard at 2000 | keep it at `-p 1000` |
| Pastel gradient that glows too weakly | raise `-p` (e.g. `-p 1800`) — pastels are lighter, so they glow less at the same peak |

**gradient mode** keys the boost off each pixel's chroma: neutral pixels (white, grey, black) map to SDR paper white (`--white-nits`, default 203) and don't glow; coloured pixels get pushed into HDR, with a smoothstep ramp (`--c0`..`--c1`) so anti-aliased edges have no hard seam.

### Viewing and verifying

The glow only shows on an **EDR/XDR display**, in **Safari, Chrome, Preview or Finder Quick Look**, at a decent screen brightness. It cannot appear on an SDR screen, in a screenshot, or in most image tools — so don't judge it by a thumbnail.

Confirm an output is encoded right without an HDR screen:
```
sips -g profile out.jpg            # -> "Rec2020 Gamut with PQ Transfer"
```
For a live side-by-side (SDR vs HDR) on your own Mac, publish an HTML page that inlines the JPEGs as data URIs and open it in Safari (that's how these were reviewed).

### Where finished logos live

These are brand assets, not course assets, so they sit with the other logos:
- productkind set: `productkind/assets/dist/logo-*-hdr-glow-<peak>.jpg`
- Little Parrot set: `little-parrot/assets/src/logo-*-hdr-glow-<peak>.jpg`

Keep the `-hdr-glow-<peak>` suffix so they never shadow the plain SDR logo, and ship both `-1000` and `-2000` if the choice isn't settled.

### Gotchas

- **Choose the background deliberately.** Transparent input is composited onto `-b` first. A logo with a black wordmark or dark line art needs a light background (default white) or it vanishes; a framed tile can go on black for a floating look. In gradient mode the white surround won't glow anyway, so white is the safe default.
- **JPEG edge overshoot.** Sharp white/dark boundaries ring slightly, pushing a few edge pixels above the target peak. It's cosmetic and edge-only; ignore the max-nits figure being a bit over `-p`.
- **Whites still glowing a touch?** Lower `--white-nits` (e.g. 180). Higher = closer to a bright paper white.
- **SVG fonts.** Inkscape substitutes any font it can't find. The productkind/Little Parrot marks need Montserrat, Space Mono and Monaspace Neon installed; check the render if text looks off.
- **`-m all` blooms on big white areas.** For a logo that's mostly white, prefer `-m gradient`, or keep `-p 1000`.
- The bundled `assets/rec2020-pq.icc` is Apple's PQ profile; it's what makes macOS recognise the file as HDR. Re-extract from any HDR JPEG with `magick ref.jpg out.icc` if you ever need to replace it.

### End-to-end example

```
# Glowing productkind logo, gradients only (default), recommended strength
scripts/glow.sh ../../../productkind/assets/src/logo/logo.svg \
  -o ../../../productkind/assets/dist/logo-productkind-hdr-glow-1000.jpg

# Max-glow social-share banner, rendered wide
scripts/glow.sh ../../../little-parrot/assets/src/logo-social-share.svg \
  -p 2000 -w 1600 \
  -o ../../../little-parrot/assets/src/logo-social-share-hdr-glow-2000.jpg

# Whole tile glows (white background included), from a PNG
scripts/glow.sh some-logo.png -m all -p 1000

sips -g profile ../../../productkind/assets/dist/logo-productkind-hdr-glow-1000.jpg
```

### Prerequisites

- `python3` with `numpy` and `Pillow` (PIL).
- `inkscape` (the macOS app bundle at `/Applications/Inkscape.app` is auto-detected) — only for SVG input.
- `imagemagick` (`magick`) and `sips` — only for verifying/re-extracting the profile.
