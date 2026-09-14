import { audioCacheKey } from '../narration/definition'
import { planTakes } from '../narration/takes'
import { HOUSE_VOICE_SETTINGS } from '../narration/voices'
import hookAiNews01 from './hook-ai-news-01'
import hookAiNews02 from './hook-ai-news-02'
import hookAiNews03 from './hook-ai-news-03'
import hookAiNews04 from './hook-ai-news-04'

import { describe, expect, test } from 'vitest'

const VARIANTS = [hookAiNews01, hookAiNews02, hookAiNews03, hookAiNews04]

const takesOf = (definition: (typeof VARIANTS)[number]) =>
  planTakes({
    sections: definition.sections,
    splitOnBlankLines: definition.splitOnBlankLines,
  }).map((take) => ({
    text: take.text,
    key: audioCacheKey({
      text: take.text,
      voice: definition.voice,
      model: definition.model,
      settings: HOUSE_VOICE_SETTINGS,
    }),
  }))

describe('what a hook experiment costs', () => {
  test('the four variants share one recording of the body', () => {
    const bodies = VARIANTS.map((variant) => takesOf(variant)[1]?.key)

    expect(new Set(bodies).size).toBe(1)
  })

  test('each hook is its own take, so only the openings differ', () => {
    const hooks = VARIANTS.map((variant) => takesOf(variant)[0]?.key)

    expect(new Set(hooks).size).toBe(4)
  })

  test('six recordings in total, not four whole scripts', () => {
    const keys = new Set(VARIANTS.flatMap((variant) => takesOf(variant).map((take) => take.key)))

    // Four hooks, the body once, and the sign-off once.
    expect(keys.size).toBe(6)
  })

  test('the characters paid for are the shared takes once plus the four hooks', () => {
    const takes = VARIANTS.flatMap(takesOf)
    const unique = new Map(takes.map((take) => [take.key, take.text.length]))
    const paid = [...unique.values()].reduce((total, length) => total + length, 0)
    const withoutSharing = takes
      .map((take) => take.text.length)
      .reduce((total, length) => total + length, 0)

    console.log(`  paid once: ${String(paid)} characters, instead of ${String(withoutSharing)}`)
    expect(paid).toBeLessThan(withoutSharing / 2)
  })
})
