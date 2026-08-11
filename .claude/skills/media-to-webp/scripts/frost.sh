#!/bin/bash
# frost.sh — cover regions of a webp with a frosted-glass (blur + white tint) panel.
#
# Usage: frost.sh <src.webp> <out.webp> "fstart:fend:x:y:w:h" [more jobs...]
#   Each job frosts a rectangle (x,y,w,h, in source pixels) over frames fstart..fend
#   (inclusive, 0-indexed). For a static webp use a single job with 0:0:x:y:w:h.
#   Resolution and per-frame timing are preserved (uniform delay assumed).
#
# Find frame ranges and coordinates first with inspect.sh (--strip and --frame).
# Tuning (edit below): BLUR (higher = softer), TINT (higher = milkier/more opaque).
set -euo pipefail
BLUR="0x14"; TINT=35; Q=68
SRC="${1:-}"; OUT="${2:-}"; shift 2 || { echo "usage: frost.sh <src.webp> <out.webp> \"fstart:fend:x:y:w:h\" ..."; exit 1; }
[ -f "$SRC" ] || { echo "error: source webp not found: $SRC"; exit 1; }
[ $# -ge 1 ] || { echo "error: at least one frost job required (fstart:fend:x:y:w:h)"; exit 1; }
command -v ffmpeg >/dev/null || { echo "error: ffmpeg not found"; exit 1; }
command -v magick >/dev/null || { echo "error: ImageMagick (magick) not found"; exit 1; }

tmp="$(mktemp -d)"; trap 'rm -rf "$tmp"' EXIT
magick "$SRC" -coalesce "$tmp/f-%05d.png"
for job in "$@"; do
  IFS=':' read -r fs fe x y w h <<< "$job"
  for i in $(seq "$fs" "$fe"); do
    fr="$tmp/$(printf 'f-%05d.png' "$i")"
    [ -f "$fr" ] || continue
    magick "$fr" \( +clone -crop "${w}x${h}+${x}+${y}" +repage -blur "$BLUR" -fill white -colorize "$TINT" \) \
      -geometry "+${x}+${y}" -composite "$fr"
  done
done
nf=$(find "$tmp" -name 'f-*.png' | wc -l | tr -d ' ')
if [ "$nf" -gt 1 ]; then
  od=$(magick identify -format "%T " "$SRC" | awk '{print $1}')
  if [ -n "$od" ] && [ "$od" -gt 0 ]; then fps=$(awk "BEGIN{printf \"%.4f\",100/$od}"); else fps=12; fi
  ffmpeg -y -loglevel error -framerate "$fps" -i "$tmp/f-%05d.png" \
    -c:v libwebp -loop 0 -lossless 0 -quality "$Q" -compression_level 6 "$OUT"
else
  magick "$tmp/f-00000.png" -quality 90 -define webp:method=6 "$OUT"
fi
sz=$(wc -c < "$OUT"); mb=$(awk "BEGIN{printf \"%.2f\", $sz/1048576}")
echo "wrote $OUT (${mb} MB, $nf frame(s))"
