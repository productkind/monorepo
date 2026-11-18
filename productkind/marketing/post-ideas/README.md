# Post ideas from our conversations

Kinga forgets to post on busy days, so Claude drives the posting: it brings ready post ideas built from what we've already said, and we only decide what to post. Claude never publishes anything.

Our best material comes from the conversations Kinga and Tamas have anyway, and those happen in Hungarian. Granola doesn't work in Hungarian, so we record them ourselves and transcribe them on Kinga's Mac with whisper.cpp.

## The workflow

1. **Talk and record.** Record the conversation with Voice Memos on your iPhone. Say whose opinion it is out loud ("I think…", "Tamas thinks…"), because the transcript has no speaker labels.
2. **Save the recording to the inbox.** In Voice Memos: tap the recording, then Share, then Save to Files, then iCloud Drive › Conversations. On the Mac, drag it into that folder in Finder.
3. **Transcribe.** Ask Claude to "transcribe our conversations", or run `transcribe-conversations` in the terminal. Each recording becomes a Markdown transcript and the audio moves to `Conversations/transcribed/`.
4. **Get post ideas.** In Claude Code, ask for "post ideas". Claude reads the new transcripts together with the monorepo, its memory and the LinkedIn analytics, and brings two or three ideas. Each idea gives:
   - the topic, and what you've already said about it, quoted with its source
   - why now (a date, something we shipped, news)
   - the format and slot (proven winner, suspected winner or moonshot), who posts it, and a picture you probably already have
5. **Write the post.** Reply in your own words, or say "write it". The `linkedin-post` skill drafts it and the `linkedin-critic` agent gates it. You publish it yourself.

## The weekday reminder

Every weekday (Monday to Friday), the first Claude Code session you start anywhere under `~/Documents/productkind` shows "🦜 Posting day. Say "post ideas" when you have 15 minutes", plus how many recordings are waiting. Claude answers your first message as usual and then offers ideas once. You don't have to post every day; the reminder is there to build the habit.

- It's a personal `SessionStart` hook in `~/.claude/settings.json` that runs `posting-day-reminder.mjs` from this folder. It isn't in the repo's settings, so it doesn't affect Tamas.
- It fires once a day. The date it last fired is in `~/.claude/post-ideas-reminder.json`; delete that file to see the reminder again today.
- To change the days or pause it, edit the script, or remove the hook with `/hooks` in Claude Code.

## Where things live

| What | Where |
| --- | --- |
| Inbox for recordings | iCloud Drive › Conversations |
| Audio after transcription | iCloud Drive › Conversations › transcribed |
| Transcripts | `~/Documents/productkind/conversations/YYYY-MM-DD-<name>.md` |
| Weekday reminder | `posting-day-reminder.mjs` (this folder), run by a SessionStart hook in `~/.claude/settings.json` |
| Transcription script | `transcribe-conversations.sh` (this folder), linked as `~/.local/bin/transcribe-conversations` |
| Whisper models | `~/.whisper/models/` |

## Rules

- **Transcripts never go into this repo.** The monorepo is public. Ideas filed here (or in `../content/idea-backlog.md`) quote only what we'd say publicly, and never identify learners or interviewees.
- **Internal numbers need a yes per post.** Sign-ups, revenue and follower counts in a conversation are background until Kinga says to use them.
- **The angle is ours.** Claude proposes topics grounded in our own words; it doesn't draft several angles to pick from.

## Options

- Another language: `transcribe-conversations --lang en` (or `--lang auto` to detect it).
- Specific files instead of the inbox: `transcribe-conversations path/to/recording.m4a`.
- "Still downloading from iCloud": the recording hasn't synced to the Mac yet. Run the command again a minute later.

## Setting it up on a new Mac

Needs Homebrew and an Apple Silicon Mac.

```sh
brew install whisper-cpp ffmpeg
mkdir -p ~/.whisper/models
curl -L -o ~/.whisper/models/ggml-large-v3-turbo.bin https://huggingface.co/ggerganov/whisper.cpp/resolve/main/ggml-large-v3-turbo.bin
curl -L -o ~/.whisper/models/ggml-silero-v5.1.2.bin https://huggingface.co/ggml-org/whisper-vad/resolve/main/ggml-silero-v5.1.2.bin
ln -s "$PWD/productkind/marketing/post-ideas/transcribe-conversations.sh" ~/.local/bin/transcribe-conversations
```

Run the last line from the monorepo root. The large-v3-turbo model is about 1.6 GB. The small Silero model detects speech, which stops Whisper inventing text during silences.
