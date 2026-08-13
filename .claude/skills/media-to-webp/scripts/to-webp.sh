#!/bin/bash
# to-webp.sh — convert media to a resized webp (animated or static).
#
# Usage: to-webp.sh <input> [-o out.webp] [-w width] [-f fps] [-q quality] [-s speed]
#   -w  target width in px (height auto, aspect kept; never upscales). Default 480.
#   -f  frames per second for animated output. Default 10.
#   -q  webp quality 0-100. Default 60 for animated, 80 for static.
#   -s  playback speed-up factor for animated output, e.g. 2 halves a clip's runtime. Keep it gentle enough for the learner to follow.
#       Default 1 (real time). Use it to condense long real-time screen recordings.
#   -o  output path. Default: <input basename>.webp in the current directory.
#
# Sources by extension:
#   mov mp4 m4v webm avi gif   -> animated webp (ffmpeg + libwebp)
#   webp (animated)            -> re-encoded smaller animated webp (magick coalesce -> ffmpeg)
#   png jpg jpeg tif tiff bmp  -> static webp (magick)
#   heic heif                  -> static webp (magick, or heif-convert fallback)
set -euo pipefail
WIDTH=480; FPS=10; Q=""; OUT=""; IN=""; SPEED=1
while [ $# -gt 0 ]; do
  case "$1" in
    -o|--out) OUT="$2"; shift 2;;
    -w|--width) WIDTH="$2"; shift 2;;
    -f|--fps) FPS="$2"; shift 2;;
    -q|--quality) Q="$2"; shift 2;;
    -s|--speed) SPEED="$2"; shift 2;;
    -h|--help) grep '^# ' "$0" | sed 's/^# //'; exit 0;;
    *) IN="$1"; shift;;
  esac
done

# Build the animated-video filter chain (optional speed-up, then fps + resize).
vfilter() {
  local vf="fps=${FPS},scale=${WIDTH}:-1:flags=lanczos"
  [ "$SPEED" != "1" ] && vf="setpts=PTS/${SPEED},${vf}"
  printf '%s' "$vf"
}
[ -n "$IN" ] && [ -f "$IN" ] || { echo "error: input file required"; exit 1; }
command -v ffmpeg >/dev/null || { echo "error: ffmpeg not found"; exit 1; }
command -v magick >/dev/null || { echo "error: ImageMagick (magick) not found"; exit 1; }

ext="$(printf '%s' "${IN##*.}" | tr '[:upper:]' '[:lower:]')"
base="$(basename "${IN%.*}")"
[ -n "$OUT" ] || OUT="${base}.webp"
tmp="$(mktemp -d)"; trap 'rm -rf "$tmp"' EXIT

case "$ext" in
  mov|mp4|m4v|webm|avi|gif)
    q="${Q:-60}"
    ffmpeg -y -loglevel error -i "$IN" -an \
      -vf "$(vfilter)" \
      -c:v libwebp -loop 0 -lossless 0 -quality "$q" -compression_level 6 "$OUT"
    ;;
  webp)
    nf=$(magick identify "$IN" | wc -l | tr -d ' ')
    if [ "$nf" -gt 1 ]; then
      q="${Q:-60}"
      od=$(magick identify -format "%T " "$IN" | awk '{print $1}')
      if [ -n "$od" ] && [ "$od" -gt 0 ]; then srcfps=$(awk "BEGIN{printf \"%.4f\",100/$od}"); else srcfps=12; fi
      magick "$IN" -coalesce "$tmp/f-%05d.png"
      ffmpeg -y -loglevel error -framerate "$srcfps" -i "$tmp/f-%05d.png" \
        -vf "$(vfilter)" \
        -c:v libwebp -loop 0 -lossless 0 -quality "$q" -compression_level 6 "$OUT"
    else
      q="${Q:-80}"
      magick "$IN" -resize "${WIDTH}x>" -quality "$q" -define webp:method=6 "$OUT"
    fi
    ;;
  heic|heif)
    q="${Q:-80}"
    if ! magick "$IN" -resize "${WIDTH}x>" -quality "$q" -define webp:method=6 "$OUT" 2>/dev/null; then
      command -v heif-convert >/dev/null || { echo "error: cannot read heic (install libheif / heif-convert)"; exit 1; }
      heif-convert "$IN" "$tmp/x.png" >/dev/null 2>&1
      magick "$tmp/x.png" -resize "${WIDTH}x>" -quality "$q" -define webp:method=6 "$OUT"
    fi
    ;;
  png|jpg|jpeg|tif|tiff|bmp)
    q="${Q:-80}"
    magick "$IN" -resize "${WIDTH}x>" -quality "$q" -define webp:method=6 "$OUT"
    ;;
  *) echo "error: unsupported extension .$ext"; exit 1;;
esac
sz=$(wc -c < "$OUT"); mb=$(awk "BEGIN{printf \"%.2f\", $sz/1048576}")
dims=$(magick identify -format '%wx%h' "$OUT[0]" 2>/dev/null)
frames=$(magick identify "$OUT" 2>/dev/null | wc -l | tr -d ' ')
echo "wrote $OUT (${mb} MB, ${dims}, ${frames} frame(s))"
