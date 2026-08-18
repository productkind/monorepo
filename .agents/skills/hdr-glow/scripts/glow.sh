#!/usr/bin/env bash
# Make a logo/image glow on HDR/EDR displays. Accepts SVG (rendered via Inkscape
# first) or a raster (PNG/JPG). Wraps glow.py, which does the Rec.2020 + PQ encode.
#
#   glow.sh <input.svg|png|jpg> [options]
#     -o FILE     output path (default <name>-hdr-glow-<peak>.jpg in cwd)
#     -m MODE     gradient (only colours glow, default) | all (whites glow too)
#     -p NITS     glow peak, e.g. 1000 (default) or 2000 (max)
#     -b R,G,B    background for transparency, sRGB 0-255 (default 255,255,255 white)
#     -w PX       render width for SVG input (default 1200; height keeps aspect)
#     --          pass any further flags straight to glow.py (e.g. --white-nits 180)
set -euo pipefail
DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

MODE=gradient; PEAK=1000; BG=255,255,255; WIDTH=1200; OUT=""; EXTRA=()
IN=""
while [[ $# -gt 0 ]]; do
  case "$1" in
    -o) OUT="$2"; shift 2;;
    -m) MODE="$2"; shift 2;;
    -p) PEAK="$2"; shift 2;;
    -b) BG="$2"; shift 2;;
    -w) WIDTH="$2"; shift 2;;
    --) shift; EXTRA+=("$@"); break;;
    -*) EXTRA+=("$1"); shift;;
    *)  IN="$1"; shift;;
  esac
done
[[ -n "$IN" ]] || { echo "usage: glow.sh <input.svg|png|jpg> [options]" >&2; exit 1; }
[[ -f "$IN" ]] || { echo "no such file: $IN" >&2; exit 1; }

base="$(basename "${IN%.*}")"
[[ -n "$OUT" ]] || OUT="${base}-hdr-glow-${PEAK}.jpg"

ext="$(echo "${IN##*.}" | tr '[:upper:]' '[:lower:]')"
RASTER="$IN"; TMPD=""
if [[ "$ext" == "svg" ]]; then
  # locate Inkscape (app bundle or PATH)
  INK=""
  for cand in "/Applications/Inkscape.app/Contents/MacOS/inkscape" "$(command -v inkscape || true)"; do
    [[ -n "$cand" && -x "$cand" ]] && { INK="$cand"; break; }
  done
  [[ -n "$INK" ]] || { echo "Inkscape not found (needed to render SVG)" >&2; exit 1; }
  TMPD="$(mktemp -d)"; RASTER="$TMPD/render.png"
  "$INK" "$IN" --export-type=png --export-filename="$RASTER" \
         --export-area-page -w "$WIDTH" >/dev/null 2>&1
fi

python3 "$DIR/glow.py" "$RASTER" "$OUT" --mode "$MODE" --peak "$PEAK" --bg "$BG" \
  ${EXTRA[@]+"${EXTRA[@]}"}
[[ -n "$TMPD" ]] && rm -rf "$TMPD"
