#!/bin/bash
# Export a carousel to PNG slides (1080x1350) and one PDF.
# Requires Google Chrome. Output goes to an export/ folder next to the HTML.
# Usage: ./export.sh <post-folder-or-carousel.html> [output-name] [output-dir]
#   ./export.sh my-post-1                       (uses my-post-1/carousel.html)
#   ./export.sh my-post-1/carousel.html my-post
#   ./export.sh base-template.html base-template export/productkind
# Defaults: output-name = the folder name the HTML sits in;
#           output-dir  = export/ next to the HTML.
set -euo pipefail

CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
ARG="${1:?usage: ./export.sh <post-folder-or-carousel.html> [output-name] [output-dir]}"
if [ -d "$ARG" ]; then HTML="$ARG/carousel.html"; else HTML="$ARG"; fi
HTML="$(cd "$(dirname "$HTML")" && pwd)/$(basename "$HTML")"
NAME="${2:-$(basename "$(dirname "$HTML")")}"
OUT="${3:-$(dirname "$HTML")/export}"
mkdir -p "$OUT"
OUT="$(cd "$OUT" && pwd)"

SLIDES=$(grep -c '<section class="slide"' "$HTML")

echo "Exporting $SLIDES PNG slides from $HTML..."
for ((n=1; n<=SLIDES; n++)); do
  "$CHROME" --headless --disable-gpu \
    --window-size=1080,1350 --hide-scrollbars --force-device-scale-factor=1 \
    --virtual-time-budget=15000 \
    --screenshot="$OUT/slide-$(printf '%02d' "$n").png" \
    "file://$HTML?slide=$n" 2>/dev/null
  echo "  slide-$(printf '%02d' "$n").png"
done

# The PDF is assembled from the exported PNGs (not re-printed from the
# HTML), so it is pixel-identical to the slides. Chrome's print rasteriser
# renders some CSS (e.g. gradient-clipped text) differently from the
# screenshot path, which produced broken slides in the PDF.
echo "Assembling PDF from the PNG slides..."
PDFSRC="$OUT/.pdf-src.html"
{
  echo '<!doctype html><meta charset="utf-8"><style>'
  echo '@page { size: 1080px 1350px; margin: 0; } html, body { margin: 0; padding: 0; }'
  echo 'img { display: block; width: 1080px; height: 1350px; } img:not(:last-of-type) { break-after: page; }'
  echo '</style>'
  for ((n=1; n<=SLIDES; n++)); do
    echo "<img src=\"slide-$(printf '%02d' "$n").png\">"
  done
} > "$PDFSRC"
"$CHROME" --headless --disable-gpu \
  --virtual-time-budget=15000 --no-pdf-header-footer \
  --print-to-pdf="$OUT/$NAME.pdf" \
  "file://$PDFSRC" 2>/dev/null
rm -f "$PDFSRC"
echo "  $NAME.pdf"

echo "Done. Files in $OUT"
