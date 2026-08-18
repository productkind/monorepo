#!/usr/bin/env python3
"""Encode an SDR image as a Rec.2020 + PQ (HDR) JPEG that glows on EDR displays.

The pixels are re-encoded so bright content sits *above* SDR white, and the file is
tagged with the "Rec2020 Gamut with PQ Transfer" ICC profile, so macOS / Safari /
Preview render it as HDR. Two modes:

  gradient  only coloured pixels glow; neutrals (white/grey/black) stay SDR   [default]
  all       everything scales up, so white and gradients all glow

Reads a raster (PNG/JPG). Use glow.sh for SVG input (it renders first via Inkscape).
"""
import argparse, os, numpy as np
from PIL import Image

HERE = os.path.dirname(os.path.abspath(__file__))
DEFAULT_ICC = os.path.join(HERE, "..", "assets", "rec2020-pq.icc")

def srgb_to_linear(c):
    return np.where(c <= 0.04045, c / 12.92, ((c + 0.055) / 1.055) ** 2.4)

# Rec.709/sRGB -> Rec.2020 primaries (linear light)
M_709_2020 = np.array([
    [0.627403896, 0.329283038, 0.043313066],
    [0.069097289, 0.919540395, 0.011362316],
    [0.016391439, 0.088013308, 0.895595252],
])

def pq_oetf(Y):  # SMPTE ST 2084; Y normalized so 1.0 == 10000 nits
    m1, m2 = 0.1593017578125, 78.84375
    c1, c2, c3 = 0.8359375, 18.8515625, 18.6875
    Y = np.clip(Y, 0.0, 1.0)
    return ((c1 + c2 * Y ** m1) / (1 + c3 * Y ** m1)) ** m2

def main():
    ap = argparse.ArgumentParser(description=__doc__,
                                 formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("src")
    ap.add_argument("out")
    ap.add_argument("--icc", default=DEFAULT_ICC, help="ICC profile to embed")
    ap.add_argument("--mode", choices=["gradient", "all"], default="gradient",
                    help="gradient: only colours glow (default); all: whites glow too")
    ap.add_argument("--peak", type=float, default=1000.0,
                    help="nits for a fully saturated colour / for white in 'all' mode")
    ap.add_argument("--bg", default="255,255,255",
                    help="composite colour for transparency, sRGB 0-255 (default white)")
    ap.add_argument("--white-nits", type=float, default=203.0,
                    help="nits for neutral pixels in gradient mode (SDR paper white)")
    ap.add_argument("--c0", type=float, default=0.03, help="chroma where glow starts")
    ap.add_argument("--c1", type=float, default=0.12, help="chroma where glow is full")
    ap.add_argument("--no-gamut", action="store_true", help="skip 709->2020 (more saturated)")
    ap.add_argument("--quality", type=int, default=95)
    args = ap.parse_args()

    im = Image.open(args.src).convert("RGBA")
    arr = np.asarray(im).astype(np.float64) / 255.0
    rgb, alpha = arr[..., :3], arr[..., 3:4]
    bg = np.array([int(x) for x in args.bg.split(",")], dtype=np.float64) / 255.0
    rgb = rgb * alpha + bg[None, None, :] * (1 - alpha)      # composite over bg

    lin = srgb_to_linear(rgb)                                # linear, 709 primaries
    if not args.no_gamut:
        lin = np.clip(lin @ M_709_2020.T, 0.0, 1.0)

    if args.mode == "gradient":
        chroma = rgb.max(-1) - rgb.min(-1)                   # sRGB chroma per pixel
        t = np.clip((chroma - args.c0) / (args.c1 - args.c0), 0.0, 1.0)
        t = t * t * (3 - 2 * t)                              # smoothstep (clean AA edges)
        gain = (args.white_nits + (args.peak - args.white_nits) * t) / 10000.0
        Y = lin * gain[..., None]
    else:
        Y = lin * (args.peak / 10000.0)

    out8 = np.clip(pq_oetf(Y) * 255.0 + 0.5, 0, 255).astype(np.uint8)
    with open(args.icc, "rb") as f:
        icc = f.read()
    Image.fromarray(out8, "RGB").save(
        args.out, quality=args.quality, subsampling=0, icc_profile=icc)
    print(f"wrote {args.out}  mode={args.mode}  peak={args.peak:g}nits  "
          f"gamut={'709' if args.no_gamut else '2020'}")

if __name__ == "__main__":
    main()
