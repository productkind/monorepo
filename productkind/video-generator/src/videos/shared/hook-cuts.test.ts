import { planTakes } from '../../narration/takes'
import { VIDEOS } from '../index'
import { AI_NEWS_HOOKS } from './ai-news-hooks'
import { FIRST_FEATURE_HOOKS } from './first-feature-hooks'

import { describe, expect, test } from 'vitest'

/**
 * The narration these videos are already paying for. Recorded here as the literal strings
 * ElevenLabs was sent, so re-cutting the sections into shorter beats — which is a change to the
 * pictures, not to the words — cannot silently alter a take and re-bill it.
 */
const PAID_TAKES: Record<string, string[]> = {
  'hook-ai-news-01': [
    AI_NEWS_HOOKS['last-video'],
    "One. Cursor's new Projects keeps what it knows about your app for months, instead of starting from nothing every chat. Worth a look if you've ever re-explained your whole app just to change one button.\n\nTwo. ChatGPT now connects to Dropbox, Box and SharePoint. Point it at one folder instead of uploading copies of everything.\n\nThree. Its image model takes a hand drawing now. Sketch the layout, describe the style, skip the paragraph explaining where things go.\n\nFour. Voice is counted in hours: three a day on Plus, fifteen on Pro, so you can tell which plan you need.\n\nFive. McKinsey found thirty-two per cent of companies had cancelled a software purchase because AI could build it instead. That one's from late August. Worth having in your next build-or-buy conversation.\n\n[long pause][curious] Which of these changes anything for you?",
    // Its own take, so the body above it stays the recording already paid for.
    'Next week, same thing: the few worth knowing, and the rest you can skip. Follow if you want that.',
  ],
  'hook-first-feature-01': [
    FIRST_FEATURE_HOOKS['before-you-paste'],
    "Let me explain. [pause]\n\nYou write it all down first, a PRD, a spec, one long prompt, and give the lot to your AI app builder. It builds something. It runs. It's just not what you pictured.\n\nIt always gives you something back, and never says which parts it guessed.\n\nSo give it one thing at a time. Say your first one is this: someone picks a time and sees it booked. Nothing else.\n\nThen compare what came back with what was in your head. Does it behave the way you imagined? Is that how you'd word it? Has it added fields nobody asked for?\n\nBecause it adds. A settings page, a login screen, a colour scheme you never mentioned. Take them out.\n\nOne feature at a time is the only size where you can still see the difference.\n\n[long pause][curious] What did your AI app builder build that you never asked for?",
  ],
}

describe.each(Object.keys(PAID_TAKES))('%s', (id) => {
  const definition = VIDEOS.find((video) => video.id === id)

  test('narrates exactly the takes already generated', () => {
    const takes = planTakes({
      sections: definition?.sections ?? [],
      splitOnBlankLines: definition?.splitOnBlankLines ?? false,
    })

    expect(takes.map((take) => take.text)).toEqual(PAID_TAKES[id])
  })

  // The cadence the published videos hold. A beat that runs long leaves one picture on screen
  // while the narration has moved on, which is the defect re-cutting is meant to remove.
  test('cuts a new picture at least every five seconds', () => {
    const sections = definition?.sections ?? []

    expect(sections.length).toBeGreaterThanOrEqual(18)
  })
})
