#!/bin/bash
# inspect.sh — inspect a webp and dump frames, to find sensitive content and read coordinates.
#
# Usage:
#   inspect.sh <file.webp>                 # print frames/dims/delay + a 6-frame overview strip
#   inspect.sh <file.webp> --strip a,b,c   # montage the listed 0-indexed frames side by side
#   inspect.sh <file.webp> --frame N       # write frame N with a 100px red grid for reading x,y,w,h
#
# Output PNGs go to ./_inspect/. Read them to locate the sensitive region, then pass
# frame ranges + rectangles to frost.sh as fstart:fend:x:y:w:h jobs.
set -euo pipefail
command -v magick >/dev/null || { echo "error: ImageMagick (magick) not found"; exit 1; }
IN="${1:-}"; [ -f "$IN" ] || { echo "usage: inspect.sh <file.webp> [--strip a,b,c | --frame N]"; exit 1; }
mode="${2:-}"; arg="${3:-}"
STRIP_H=560  # thumbnail height: tall enough to read UI text, small enough that a 6-frame strip stays one readable image
OUTDIR="_inspect"; mkdir -p "$OUTDIR"
base="$(basename "${IN%.*}")"
nf=$(magick identify "$IN" | wc -l | tr -d ' ')
dim=$(magick identify -format '%wx%h' "$IN[0]")
delays=$(magick identify -format "%T " "$IN" | tr ' ' '\n' | sort -u | tr '\n' ' ')
echo "$IN : $nf frames, ${dim}px, per-frame delay(cs)= $delays"

if [ "$mode" = "--frame" ]; then
  i="$arg"
  case "$i" in (''|*[!0-9]*) echo "error: --frame needs a frame number 0..$((nf-1)), got '${i:-nothing}'"; exit 1;; esac
  [ "$i" -lt "$nf" ] || { echo "error: frame $i out of range (file has $nf frames, 0-indexed)"; exit 1; }
  W="${dim%x*}"; H="${dim#*x}"; draw=""
  y=100; while [ "$y" -lt "$H" ]; do draw="$draw line 0,$y $W,$y"; y=$((y+100)); done
  x=100; while [ "$x" -lt "$W" ]; do draw="$draw line $x,0 $x,$H"; x=$((x+100)); done
  magick "$IN[$i]" -stroke red -strokewidth 1 -draw "$draw" "$OUTDIR/${base}-grid-${i}.png"
  echo "wrote $OUTDIR/${base}-grid-${i}.png  (grid lines every 100px; read off x,y,w,h)"
elif [ "$mode" = "--strip" ]; then
  IFS=',' read -ra idx <<< "$arg"; args=(); for i in "${idx[@]}"; do args+=("$IN[$i]"); done
  magick "${args[@]}" -resize "x$STRIP_H" -bordercolor white -border 4 -background white +append "$OUTDIR/${base}-strip.png"
  echo "wrote $OUTDIR/${base}-strip.png  (frames $arg)"
else
  args=(); for k in 0 1 2 3 4 5; do i=$(( k*(nf-1)/5 )); args+=("$IN[$i]"); done
  magick "${args[@]}" -resize "x$STRIP_H" -bordercolor white -border 4 -background white +append "$OUTDIR/${base}-strip.png"
  echo "wrote $OUTDIR/${base}-strip.png  (6 evenly-spaced frames; use --strip to zoom a range)"
fi
