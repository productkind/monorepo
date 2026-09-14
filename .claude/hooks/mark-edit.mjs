#!/usr/bin/env node
import { markerPathFor, readHookInput } from './session-marker.mjs'

import { isJudgedFile } from '@dungarees/bin-audit-comments-domain/judged-files.ts'

import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname } from 'node:path'

const { session_id: sessionId, tool_input: toolInput } = await readHookInput()
const file = toolInput?.file_path ?? ''

if (sessionId !== undefined && isJudgedFile(file)) {
  const marker = markerPathFor(sessionId)
  mkdirSync(dirname(marker), { recursive: true })
  writeFileSync(marker, '')
}
