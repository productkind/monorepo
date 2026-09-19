#!/bin/sh
# Renders the locally made clips of a video into its own assets folder under public/.
#
# The composition id is the filename, so this loop needs no table of its own: whatever Studio
# lists under the video's clips folder is what the definition will load.
#
#   sh scripts/render-clips.sh pm-technical-fluency-validation-09 section-00-product-managers ...
set -e

video="$1"
shift

if [ -z "$video" ] || [ $# -eq 0 ]; then
  echo "usage: sh scripts/render-clips.sh <video-id> <clip-id>..." >&2
  exit 64
fi

mkdir -p "public/$video"

for clip in "$@"; do
  echo "rendering $clip"
  npx remotion render src/index.ts "$clip" "public/$video/$clip.mp4" --log=error
done
