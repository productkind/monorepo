#!/bin/bash
# Transcribe recorded conversations (Hungarian by default) with whisper.cpp, on this Mac only.
#
# Usage:
#   transcribe-conversations              # every recording waiting in the iCloud Drive inbox
#   transcribe-conversations FILE...      # specific files
#   transcribe-conversations --lang en    # another language ('auto' to detect)
#
# Inbox:       iCloud Drive/Conversations (save from Voice Memos on iPhone: Share > Save to Files)
# Transcripts: ~/Documents/productkind/conversations/YYYY-MM-DD-<name>.md
# Audio is moved to iCloud Drive/Conversations/transcribed/ once its transcript exists.
# The workflow and setup are in README.md next to this script.

set -euo pipefail

INBOX="$HOME/Library/Mobile Documents/com~apple~CloudDocs/Conversations"
ARCHIVE="$INBOX/transcribed"
OUT="$HOME/Documents/productkind/conversations"
MODEL="$HOME/.whisper/models/ggml-large-v3-turbo.bin"
VAD_MODEL="$HOME/.whisper/models/ggml-silero-v5.1.2.bin"
LANG_CODE="hu"
THREADS="$(sysctl -n hw.perflevel0.physicalcpu 2>/dev/null || echo 4)"

files=()
while [[ $# -gt 0 ]]; do
  case "$1" in
    --lang) LANG_CODE="$2"; shift 2 ;;
    -h|--help) sed -n 2,12p "$0"; exit 0 ;;
    *) files+=("$1"); shift ;;
  esac
done

mkdir -p "$INBOX" "$ARCHIVE" "$OUT"

from_inbox=false
if [[ ${#files[@]} -eq 0 ]]; then
  from_inbox=true
  # Recordings iCloud hasn't downloaded yet show up as .<name>.icloud placeholders.
  pending=0
  for p in "$INBOX"/.*.icloud; do
    [[ -e "$p" ]] || continue
    brctl download "$p" >/dev/null 2>&1 || true
    pending=$((pending + 1))
  done
  [[ $pending -gt 0 ]] && echo "$pending recording(s) still downloading from iCloud; run again in a minute."
  shopt -s nullglob nocaseglob
  files=("$INBOX"/*.{m4a,mp3,wav,aiff,aif,aac,caf,mp4,mov,ogg,opus,flac,webm,qta})
  shopt -u nullglob nocaseglob
fi

if [[ ${#files[@]} -eq 0 ]]; then
  echo "Nothing to transcribe in $INBOX"
  exit 0
fi

tmp="$(mktemp -d)"
trap 'rm -rf "$tmp"' EXIT

for f in "${files[@]}"; do
  name="$(basename "$f")"
  stem="${name%.*}"

  # Prefer the recording date stored in the file; fall back to the file's modified date.
  created="$(ffprobe -v quiet -show_entries format_tags=creation_time -of default=nw=1:nk=1 "$f" | cut -c1-10)"
  [[ "$created" =~ ^[0-9]{4}-[0-9]{2}-[0-9]{2}$ ]] || created="$(/usr/bin/stat -f %Sm -t %Y-%m-%d "$f")"
  duration="$(ffprobe -v quiet -show_entries format=duration -of default=nw=1:nk=1 "$f" | cut -d. -f1)"
  slug="$(printf '%s' "$stem" | perl -CSD -MUnicode::Normalize -ne 'print lc(NFD($_) =~ s/\p{Mn}//gr)' | tr -cs 'a-z0-9' '-' | sed 's/^-//;s/-$//')"
  target="$OUT/$created-${slug:-recording}.md"
  n=2
  while [[ -e "$target" ]]; do target="$OUT/$created-${slug:-recording}-$n.md"; n=$((n + 1)); done

  echo "Transcribing $name ($((duration / 60)) min, language: $LANG_CODE)..."
  ffmpeg -nostdin -loglevel error -y -i "$f" -ar 16000 -ac 1 -c:a pcm_s16le "$tmp/audio.wav"
  whisper-cli -m "$MODEL" -l "$LANG_CODE" -t "$THREADS" \
    --vad -vm "$VAD_MODEL" -np -otxt -of "$tmp/out" -f "$tmp/audio.wav" >/dev/null 2>&1

  {
    echo "# $stem"
    echo
    echo "- Recorded: $created"
    echo "- Length: $((duration / 60)) min $((duration % 60)) s"
    echo "- Language: $LANG_CODE"
    echo "- Source file: $name"
    echo "- Transcribed: $(date +%Y-%m-%d) with whisper.cpp large-v3-turbo (no speaker labels)"
    echo
    echo "---"
    echo
    sed 's/^ *//' "$tmp/out.txt"
  } > "$target"

  if $from_inbox; then mv "$f" "$ARCHIVE/"; fi
  echo "  -> $target"
done
