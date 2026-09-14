#!/usr/bin/env node
import { markerPathFor, readHookInput } from './session-marker.mjs'

import { spawnSync } from 'node:child_process'
import { existsSync, rmSync } from 'node:fs'

// The findings are deliberately dropped rather than reported: reading them here is what the
// comment-auditor subagent is for, and quoting them would put every added comment, with its code,
// into the context of whatever the session was actually doing.
const DELEGATION_PROMPT = `Comments were added to code this session and have not been reviewed.

Delegate the review to the comment-auditor subagent, which runs the audit itself and reports only
what it changed. Do not run the audit or read the comments yourself.`

const { session_id: sessionId, stop_hook_active: stopHookActive } = await readHookInput()

// Without this the hook would re-fire on the stop it caused itself, and the session would never end.
if (stopHookActive === true || sessionId === undefined) process.exit(0)

const marker = markerPathFor(sessionId)
if (!existsSync(marker)) process.exit(0)

// Cleared before the audit runs, so a stop that follows without further edits stays silent.
rmSync(marker)

const projectDir = process.env.CLAUDE_PROJECT_DIR ?? process.cwd()
const { status } = spawnSync('npx', ['dungarees', 'audit-comments'], {
  cwd: projectDir,
  encoding: 'utf-8',
})

if (status === 0) process.exit(0)

process.stderr.write(`${DELEGATION_PROMPT}\n`)
process.exit(2)
