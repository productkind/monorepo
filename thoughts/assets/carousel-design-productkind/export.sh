#!/bin/bash
# Export a productkind article carousel to PNG slides (1080x1350) and one PDF.
# Requires Google Chrome.
# Usage: ./export.sh [carousel.html] [output-name]
#   defaults: carousel-template.html, productkind-carousel
set -euo pipefail

DIR="$(cd "$(dirname "$0")" && pwd)"
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
HTML="${1:-$DIR/carousel-template.html}"
NAME="${2:-productkind-carousel}"
OUT="$DIR/export"
mkdir -p "$OUT"

SLIDES=$(grep -c '<section class="slide"' "$HTML")

echo "Exporting $SLIDES PNG slides from $(basename "$HTML")..."
for ((n=1; n<=SLIDES; n++)); do
  "$CHROME" --headless --disable-gpu \
    --window-size=1080,1350 --hide-scrollbars --force-device-scale-factor=1 \
    --virtual-time-budget=15000 \
    --screenshot="$OUT/slide-$(printf '%02d' "$n").png" \
    "file://$HTML?slide=$n" 2>/dev/null
  echo "  slide-$(printf '%02d' "$n").png"
done

echo "Exporting PDF..."
"$CHROME" --headless --disable-gpu \
  --virtual-time-budget=15000 --no-pdf-header-footer \
  --print-to-pdf="$OUT/$NAME.pdf" \
  "file://$HTML" 2>/dev/null
echo "  $NAME.pdf"

echo "Done. Files in $OUT"
