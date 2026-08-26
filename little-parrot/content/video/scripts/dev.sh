#!/bin/sh
# Studio alongside the narration watcher, so editing a script's text rebuilds its audio and
# timeline and Studio picks the change up. Kills the watcher when Studio exits.
set -e
npm run narrate -- --watch &
watcher=$!
trap 'kill "$watcher" 2>/dev/null || true' EXIT INT TERM
npx remotion studio
