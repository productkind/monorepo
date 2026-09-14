import type { Section } from '../../narration/definition'
import { gif } from '../../narration/definition'

/**
 * One feature at a time instead of a PRD, and the openings being tested against it.
 * Script: productkind/marketing/content/campaigns/2026-09-try-tiktok-hooks/video-test-first-feature/
 *
 * The body lives here so the variants cannot drift: narration is cached by the take's own words, so
 * the body earns its recording once only while every character of it stays identical.
 *
 * Visuals are borrowed placeholders, the same in every variant. The test is which opening holds an
 * audience, so nothing else may differ; source real ones once a hook wins.
 */

const placeholder = ({
  src,
  playbackRate = 1,
}: {
  src: string
  /** Slowed to cover its beat where the borrowed gif is shorter, so it never restarts mid-line. */
  playbackRate?: number
}): Section['visual'] => gif({ src, playbackRate, place: 'above-captions' })

/** All ten candidates from the script. Only the ones with a definition of their own are cut. */
export const FIRST_FEATURE_HOOKS = {
  'before-you-paste': 'Before you paste that PRD into your AI app builder, watch this.',
  'the-opposite': 'Everyone tells you to write a PRD. I think you should do the opposite.',
  'never-read-it':
    "The one thing I'd tell you if I wasn't afraid of hurting your feelings: your AI app builder never read that PRD the way you wrote it.",
  'stop-handing-over': 'Stop handing over the whole PRD if you want back what you pictured.',
  'not-your-something':
    "Because what you'll eventually realise is [pause] that it built something. Just not your something.",
  'keeping-yourself-stuck': "You're keeping yourself stuck by describing the whole app in one go.",
  'small-enough-to-check':
    "You don't need a PRD. What you need is one feature small enough to check.",
  'friendly-reminder':
    "A friendly reminder that you don't have to write a PRD to build your idea with AI.",
  'the-internet-convinced-us':
    'The internet convinced us that vibe coding means describing the whole app at once.',
  'how-i-stopped':
    'How I stopped handing my AI app builder a PRD, and how you can get back what you actually pictured.',
} as const

export type HookName = keyof typeof FIRST_FEATURE_HOOKS

/**
 * The hooks that have been cut into beats of their own. A hook is one long sentence spoken over
 * several seconds, and the published videos change picture every two to three; leaving it on one
 * gif holds a still image over the part of the video the experiment is actually measuring.
 *
 * Uncut candidates fall back to a single beat, which is enough to hear them but not to publish.
 */
const HOOK_CUTS: Partial<Record<HookName, Section[]>> = {
  'before-you-paste': [
    {
      text: 'Before you paste that PRD into your AI app builder,',
      visual: gif({
        src: 'section-00-printer.gif',
        source: { provider: 'giphy', id: 'AAy75SzHOkV8rI7IYR', search: 'printer printing paper' },
        playbackRate: 0.91,
        place: 'above-captions',
      }),
    },
    {
      text: 'watch this.',
      visual: placeholder({ src: 'section-18-kitten.gif' }),
    },
  ],
}

/**
 * The hook's beats, the last of which closes the take. Closing it here rather than in each cut
 * means a new hook cannot forget to, and forgetting would merge it into the shared body and
 * re-bill every variant's narration.
 */
export const hookSections = ({ hook }: { hook: HookName }): Section[] => {
  const cut = HOOK_CUTS[hook] ?? [
    { text: FIRST_FEATURE_HOOKS[hook], visual: placeholder({ src: 'section-00-overwhelmed.gif' }) },
  ]
  return cut.map((section, index) =>
    index === cut.length - 1 ? { ...section, endsParagraph: true, endsTake: true } : section,
  )
}

export const FIRST_FEATURE_BODY: Section[] = [
  {
    text: 'Let me explain. [pause]',
    visual: placeholder({ src: 'section-02-research.gif' }),
    endsParagraph: true,
  },
  {
    text: 'You write it all down first, a PRD, a spec, one long prompt,',
    visual: placeholder({ src: 'section-20-type.gif' }),
  },
  {
    text: 'and give the lot to your AI app builder.',
    visual: placeholder({ src: 'section-05-computer.gif' }),
  },
  {
    text: 'It builds something. It runs.',
    visual: gif({
      src: 'section-05-runs.gif',
      source: { provider: 'giphy', id: 'ORgRkbdT6BsjAtfDcv', search: 'gears turning machine' },
      place: 'above-captions',
    }),
  },
  {
    text: "It's just not what you pictured.",
    visual: placeholder({ src: 'section-00-overwhelmed.gif', playbackRate: 0.76 }),
    endsParagraph: true,
  },
  {
    text: 'It always gives you something back,',
    visual: placeholder({ src: 'section-07-clone.gif' }),
  },
  {
    text: 'and never says which parts it guessed.',
    visual: placeholder({ src: 'section-08-spectrum.gif' }),
    endsParagraph: true,
  },
  {
    text: 'So give it one thing at a time.',
    visual: placeholder({ src: 'section-07-clone.gif' }),
  },
  {
    text: 'Say your first one is this:',
    visual: placeholder({ src: 'section-04-choose.gif' }),
  },
  {
    text: 'someone picks a time and sees it booked.',
    visual: placeholder({ src: 'section-09-buttons.gif' }),
  },
  {
    text: 'Nothing else.',
    visual: placeholder({ src: 'section-10-easy.gif' }),
    endsParagraph: true,
  },
  {
    text: 'Then compare what came back with what was in your head.',
    visual: placeholder({ src: 'section-02-research.gif' }),
  },
  {
    text: 'Does it behave the way you imagined?',
    visual: placeholder({ src: 'section-16-computer-cool.gif' }),
  },
  {
    text: "Is that how you'd word it?",
    visual: placeholder({ src: 'section-14-code.gif' }),
  },
  {
    text: 'Has it added fields nobody asked for?',
    visual: placeholder({ src: 'section-12-industry.gif' }),
    endsParagraph: true,
  },
  {
    text: 'Because it adds.',
    visual: placeholder({ src: 'section-03-lots.gif' }),
  },
  {
    text: 'A settings page, a login screen,',
    visual: placeholder({ src: 'section-11-technology.gif' }),
  },
  {
    text: 'a colour scheme you never mentioned.',
    visual: placeholder({ src: 'section-19-magnet.gif' }),
  },
  {
    text: 'Take them out.',
    visual: placeholder({ src: 'section-17-server.gif' }),
    endsParagraph: true,
  },
  {
    text: 'One feature at a time',
    visual: placeholder({ src: 'section-15-leadmagnet.gif' }),
  },
  {
    text: 'is the only size where you can still see the difference.',
    visual: gif({
      src: 'section-22-size.gif',
      source: { provider: 'giphy', id: 'Z97ycKFDe11i7URRam', search: 'measuring with ruler' },
      playbackRate: 0.96,
      place: 'above-captions',
    }),
    endsParagraph: true,
  },
  {
    text: '[long pause][curious] What did your AI app builder build that you never asked for?',
    visual: placeholder({ src: 'section-24-evolve.gif' }),
  },
]
