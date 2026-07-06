#!/bin/bash
# Export the post-1 carousel to 7 PNG slides (1080x1350) and one PDF.
# Requires Google Chrome. Run from anywhere: ./export.sh
set -euo pipefail

DIR="$(cd "$(dirname "$0")" && pwd)"
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
OUT="$DIR/export"
mkdir -p "$OUT"

echo "Exporting PNG slides..."
for n in 1 2 3 4 5 6 7; do
  "$CHROME" --headless --disable-gpu \
    --window-size=1080,1350 --hide-scrollbars --force-device-scale-factor=1 \
    --virtual-time-budget=15000 \
    --screenshot="$OUT/slide-0$n.png" \
    "file://$DIR/carousel.html?slide=$n" 2>/dev/null
  echo "  slide-0$n.png"
done

echo "Exporting PDF..."
"$CHROME" --headless --disable-gpu \
  --virtual-time-budget=15000 --no-pdf-header-footer \
  --print-to-pdf="$OUT/write-better-post-1.pdf" \
  "file://$DIR/carousel.html" 2>/dev/null
echo "  write-better-post-1.pdf"

echo "Done. Files in $OUT"
