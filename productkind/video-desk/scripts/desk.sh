#!/bin/sh
# The API and the front end together, the way video-generator's dev.sh runs narrate beside Studio.
set -e
python3 api/serve.py &
api=$!
trap 'kill "$api" 2>/dev/null || true' EXIT INT TERM
npx vite
