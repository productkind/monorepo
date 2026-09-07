#!/bin/sh
# The API and the front end together, the way video-generator's dev.sh runs narrate beside Studio.
# The provider keys live in the repo's .env, which node reads for the api process.
set -e
node --env-file-if-exists=../../.env http/server.ts &
api=$!
trap 'kill "$api" 2>/dev/null || true' EXIT INT TERM
npx vite
