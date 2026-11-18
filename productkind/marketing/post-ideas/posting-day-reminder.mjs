#!/usr/bin/env node
// SessionStart hook: on weekdays, the first Claude Code session of the day under
// ~/Documents/productkind shows a posting-day reminder and tells Claude to offer post ideas.
// Wired up in ~/.claude/settings.json (personal), not in the repo settings. See README.md.
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'

const home = os.homedir()
const workspace = path.join(home, 'Documents', 'productkind')
const stateFile = path.join(home, '.claude', 'post-ideas-reminder.json')
const inbox = path.join(home, 'Library', 'Mobile Documents', 'com~apple~CloudDocs', 'Conversations')
const transcripts = path.join(workspace, 'conversations')
const readme = path.join(
  workspace,
  'monorepo',
  'productkind',
  'marketing',
  'post-ideas',
  'README.md',
)
const audio = /\.(m4a|mp3|wav|aiff?|aac|caf|mp4|mov|ogg|opus|flac|webm|qta)(\.icloud)?$/i

const readStdin = () => {
  try {
    return JSON.parse(fs.readFileSync(0, 'utf8') || '{}')
  } catch {
    return {}
  }
}

const listDir = (dir) => {
  try {
    return fs.readdirSync(dir)
  } catch {
    return []
  }
}

const input = readStdin()
const cwd = input.cwd || process.cwd()
const now = new Date()
const today = now.toLocaleDateString('sv-SE')
const weekday = now.getDay() >= 1 && now.getDay() <= 5

let state = {}
try {
  state = JSON.parse(fs.readFileSync(stateFile, 'utf8'))
} catch {}

if (!weekday || !cwd.startsWith(workspace) || state.lastReminded === today) process.exit(0)

const waiting = listDir(inbox).filter((f) => audio.test(f)).length
const weekAgo = now.getTime() - 7 * 24 * 60 * 60 * 1000
const recent = listDir(transcripts).filter(
  (f) => f.endsWith('.md') && fs.statSync(path.join(transcripts, f)).mtimeMs > weekAgo,
).length

const extras = []
if (waiting) extras.push(`${waiting} recording${waiting > 1 ? 's' : ''} waiting to transcribe`)
if (recent) extras.push(`${recent} transcript${recent > 1 ? 's' : ''} from this week`)
const extra = extras.length ? ` (${extras.join(', ')})` : ''

const output = {
  systemMessage: `🦜 Posting day. Say "post ideas" when you have 15 minutes${extra}.`,
  hookSpecificOutput: {
    hookEventName: 'SessionStart',
    additionalContext: [
      `It is a weekday, and Kinga wants a daily nudge to post on LinkedIn while she builds the habit (she may skip days).`,
      `She has just been shown a posting-day reminder${extra}.`,
      `Answer her first message as usual, then end that reply with one short line offering post ideas, unless she has already asked for them or the conversation is clearly not the moment. Don't generate ideas before she says yes.`,
      `When she asks for post ideas, follow ${readme}: transcribe anything waiting with \`transcribe-conversations\`, read the recent transcripts in ${transcripts}, and bring 2 to 3 ideas grounded in her own words. Never copy transcript text into the monorepo.`,
    ].join(' '),
  },
}

process.stdout.write(JSON.stringify(output))
fs.mkdirSync(path.dirname(stateFile), { recursive: true })
fs.writeFileSync(stateFile, JSON.stringify({ lastReminded: today }))
