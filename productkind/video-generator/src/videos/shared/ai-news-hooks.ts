import type { Section } from '../../narration/definition'
import { gif } from '../../narration/definition'

/**
 * One week of AI news, its sign-off, and the four openings being tested against it.
 *
 * The five stories are numbered in the narration — "One.", "Two." — because the hooks promise a
 * count and a listener has no bullets to see. Spoken markers, not a list: the number is part of
 * the sentence ElevenLabs is sent.
 * Script: productkind/marketing/content/campaigns/2026-09-try-tiktok-hooks/video-test-ai-news/
 *
 * The body lives here so the variants cannot drift: narration is cached by the take's own words,
 * so the body earns its recording once only while every character of it stays identical. Change a
 * comma here and all four variants pay for the body again.
 *
 * Each variant ends its hook's take, which is what keeps the body a take of its own — and one
 * continuous read, rather than the paragraph-by-paragraph delivery `splitOnBlankLines` would give.
 *
 * Visuals are borrowed placeholders. The experiment is about which opening holds an audience, so
 * every variant shows the same pictures; source real ones once a hook wins.
 */

/** Kept identical across the variants: the same pictures, so only the words differ. */
const placeholder = ({
  src,
  playbackRate = 1,
}: {
  src: string
  /** Slowed to cover its beat where the borrowed gif is shorter, so it never restarts mid-line. */
  playbackRate?: number
}): Section['visual'] => gif({ src, playbackRate, place: 'above-captions' })

export const AI_NEWS_HOOKS = {
  'last-video':
    "[announcer] This is the last video you'll need to watch about AI news this week. Selected for people building apps. The rest is slop.",
  'not-behind':
    "[announcer] You're not behind. Five AI stories from this week are for people building apps. The rest of it was noise.",
  'five-things':
    '[announcer] If you build apps with AI, five things happened this week. You can ignore the rest.',
  'the-report':
    "[announcer] The Vibe Coding Report, by Little Parrot. Five AI news stories that change how you're building. Ignore the rest.",
} as const

export type HookName = keyof typeof AI_NEWS_HOOKS

/**
 * The hooks that have been cut into beats of their own. A hook is one long sentence spoken over
 * several seconds, and the published videos change picture every two to three; leaving it on one
 * gif holds a still image over the part of the video the experiment is actually measuring.
 *
 * Uncut candidates fall back to a single beat, which is enough to hear them but not to publish.
 */
const HOOK_CUTS: Partial<Record<HookName, Section[]>> = {
  'last-video': [
    {
      text: "[announcer] This is the last video you'll need to watch about AI news this week.",
      visual: gif({
        src: 'section-00-crier.gif',
        source: { provider: 'giphy', id: 'aJ69kjANDRc4yNppwT', search: 'town crier bell' },
        playbackRate: 0.91,
        place: 'above-captions',
      }),
    },
    {
      text: 'Selected for people building apps.',
      visual: gif({
        src: 'section-01-claw.gif',
        source: { provider: 'giphy', id: 'xUA7aNm63JtDLx3rtS', search: 'claw machine grab' },
        color: '#ffffff',
        place: 'above-captions',
      }),
    },
    {
      text: 'The rest is slop.',
      visual: gif({
        src: 'section-02-slop.gif',
        source: { provider: 'giphy', id: 'isLMtXp57OxHi', search: 'pig eating trough' },
        place: 'above-captions',
      }),
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
    { text: AI_NEWS_HOOKS[hook], visual: placeholder({ src: 'section-00-overwhelmed.gif' }) },
  ]
  return cut.map((section, index) =>
    index === cut.length - 1 ? { ...section, endsParagraph: true, endsTake: true } : section,
  )
}

export const AI_NEWS_BODY: Section[] = [
  {
    text: 'One.',
    visual: gif({
      src: 'section-30-one.gif',
      source: { provider: 'giphy', id: 'h0un395jyYgbhHFyXB', search: 'number one animation' },
      color: '#333333',
      playbackRate: 0.83,
      place: 'above-captions',
    }),
  },
  {
    text: "Cursor's new Projects keeps what it knows about your app for months,",
    visual: placeholder({ src: 'section-02-research.gif', playbackRate: 0.84 }),
  },
  {
    text: 'instead of starting from nothing every chat.',
    visual: gif({
      src: 'section-04-nothing.gif',
      source: { provider: 'giphy', id: 'RLo3AazZVeBBfWqmCB', search: 'empty notebook page' },
      color: '#ffffff',
      playbackRate: 0.92,
      place: 'above-captions',
    }),
  },
  {
    text: "Worth a look if you've ever re-explained your whole app",
    visual: placeholder({ src: 'section-20-type.gif' }),
  },
  {
    text: 'just to change one button.',
    visual: placeholder({ src: 'section-09-buttons.gif' }),
    endsParagraph: true,
  },
  {
    // The number gets its own beat: read together with the story it made the longest section in
    // the video, and no borrowed gif was long enough to cover it without restarting.
    text: 'Two.',
    visual: gif({
      src: 'section-31-two.gif',
      source: { provider: 'giphy', id: '1r8Sh7qL6jl5hKd82X', search: 'two fingers peace' },
      color: '#ffffff',
      playbackRate: 0.98,
      place: 'above-captions',
    }),
  },
  {
    text: 'ChatGPT now connects to Dropbox, Box and SharePoint.',
    visual: placeholder({ src: 'section-05-computer.gif', playbackRate: 0.68 }),
  },
  {
    text: 'Point it at one folder',
    visual: placeholder({ src: 'section-07-clone.gif' }),
  },
  {
    text: 'instead of uploading copies of everything.',
    visual: placeholder({ src: 'section-03-lots.gif' }),
    endsParagraph: true,
  },
  {
    text: 'Three.',
    visual: gif({
      src: 'section-32-three.gif',
      source: { provider: 'giphy', id: 'h8x9fDoftH52M6XUMq', search: 'cute tricycle' },
      color: '#000000',
      place: 'above-captions',
    }),
  },
  {
    text: 'Its image model takes a hand drawing now.',
    visual: placeholder({ src: 'section-14-code.gif' }),
  },
  {
    text: 'Sketch the layout, describe the style,',
    visual: placeholder({ src: 'section-04-choose.gif' }),
  },
  {
    text: 'skip the paragraph explaining where things go.',
    visual: placeholder({ src: 'section-10-easy.gif', playbackRate: 0.77 }),
    endsParagraph: true,
  },
  {
    text: 'Four.',
    visual: gif({
      src: 'section-33-four.gif',
      source: { provider: 'giphy', id: 'CFNQ9glLPUsXX5zLoq', search: 'four leaf clover' },
      place: 'above-captions',
    }),
  },
  {
    text: 'Voice is counted in hours:',
    visual: placeholder({ src: 'section-16-computer-cool.gif', playbackRate: 0.64 }),
  },
  {
    text: 'three a day on Plus, fifteen on Pro,',
    visual: gif({
      src: 'section-14-hours.gif',
      source: { provider: 'giphy', id: '3rsfhZdbtOSUDzxowW', search: 'clock ticking cartoon' },
      place: 'above-captions',
    }),
  },
  {
    text: 'so you can tell which plan you need.',
    visual: placeholder({ src: 'section-08-spectrum.gif' }),
    endsParagraph: true,
  },
  {
    text: 'Five.',
    visual: gif({
      src: 'section-34-five.gif',
      source: { provider: 'giphy', id: 'DplYmpiYVnndGbXCp6', search: 'high five hand' },
      color: '#febe36',
      place: 'above-captions',
    }),
  },
  {
    text: 'McKinsey found thirty-two per cent of companies',
    visual: placeholder({ src: 'section-12-industry.gif' }),
  },
  {
    text: 'had cancelled a software purchase',
    visual: placeholder({ src: 'section-11-technology.gif' }),
  },
  {
    text: 'because AI could build it instead.',
    visual: gif({
      src: 'section-18-build.gif',
      source: { provider: 'giphy', id: 'kEpyAbMFnuIgxJOjeB', search: 'building blocks stacking' },
      playbackRate: 0.86,
      place: 'above-captions',
    }),
  },
  {
    text: "That one's from late August.",
    visual: placeholder({ src: 'section-19-magnet.gif' }),
  },
  {
    text: 'Worth having in your next build-or-buy conversation.',
    visual: placeholder({ src: 'section-17-server.gif' }),
    endsParagraph: true,
  },
  {
    text: '[long pause][curious] Which of these changes anything for you?',
    visual: placeholder({ src: 'section-24-evolve.gif' }),
    endsParagraph: true,
    // The sign-off is a take of its own so the five stories above it keep the recording they
    // already have. Editing the CTA between weeks then costs a hundred characters, not the video.
    endsTake: true,
  },
  {
    text: 'Next week, same thing:',
    visual: placeholder({ src: 'section-22-repeat.gif' }),
  },
  {
    text: 'the few worth knowing, and the rest you can skip.',
    visual: placeholder({ src: 'section-03-lots.gif' }),
  },
  {
    text: 'Follow if you want that.',
    visual: placeholder({ src: 'section-18-kitten.gif' }),
  },
]
