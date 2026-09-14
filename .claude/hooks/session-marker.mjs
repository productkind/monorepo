import { tmpdir } from 'node:os'
import { join } from 'node:path'

export const markerPathFor = (sessionId) => join(tmpdir(), 'claude-audit-comments', sessionId)

export const readHookInput = async () => {
  let raw = ''
  for await (const chunk of process.stdin) raw += chunk
  try {
    return JSON.parse(raw)
  } catch {
    // A hook that cannot read its input must not block the session, so it reports nothing instead.
    return {}
  }
}
