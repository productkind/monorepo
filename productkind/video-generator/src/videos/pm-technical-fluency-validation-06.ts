import { defineVideo, gif, riveAtFrame } from '../narration/definition'

/**
 * Video 6 of the PM technical fluency campaign, "Needed tomorrow, ready next week".
 * Script: productkind/marketing/content/campaigns/2026-09-pm-technical-fluency-validation/
 * video-6-needed-tomorrow-ready-next-week/script.md
 *
 * The CTA is the LinkedIn / YouTube Shorts variant ("link in the comments"), which is the script
 * as written. TikTok and Instagram Reels need the URL spoken and shown instead.
 *
 * Sections 7 and 11 stand in for the screen recording the production notes call for: a real query
 * against a Little Parrot test database, typed at readable speed, showing one count.
 *
 * Sections 13 to 15 are the three things a number can wrongly include, and they get a cut each
 * because the production notes make them the point of the second move. They do not share a visual
 * register, which was the intention and could not be met: giphy's stock for a matched set of
 * fake-account, unconfirmed and duplicate icons is almost entirely watermarked icon packs
 * (flat-icons.com) and branded sticker sets, across four rounds of searching. Each reads its own
 * beat instead — test tubes, a ghost fading out, identical robots — so the three are worth
 * revisiting together if a cleaner set turns up.
 *
 * The slots behind these rates are estimates from `0.98 + 0.209 x words`, fitted on the 39
 * narrated sections of videos 0 and 1. Every rate is a ratio to its slot, so all of them move once
 * this script is narrated: re-check with `verify.py --video pm-technical-fluency-validation-06`
 * from the video-gifs skill, and render the composed stills at the same time.
 */
export default defineVideo({
  id: 'pm-technical-fluency-validation-06',
  voice: 'chloe',
  model: 'eleven_v3',
  overlays: [
    riveAtFrame({ rive: 'parrot-greet-00.riv', frame: 0 }),
    riveAtFrame({ rive: 'parrot-peek-00.riv', frame: 500 }),
  ],
  sections: [
    {
      text: 'You need a product metric for tomorrow’s meeting.',
      visual: gif({
        src: 'section-00-hourglass-time.gif',
        source: {
          provider: 'giphy',
          id: 'xFmuT64Jto3mRO4w3G',
          search: 'loading spinner hourglass icon',
        },
        playbackRate: 0.73,
        place: 'above-captions',
      }),
    },
    {
      text: 'Analytics will have it next week.',
      visual: gif({
        src: 'section-01-snail-slow.gif',
        source: {
          provider: 'giphy',
          id: 'Lx1GlkOqRy1JxRFrws',
          search: 'cute snail slow crawling character',
        },
        color: '#ffffff',
        playbackRate: 0.9,
        place: 'above-captions',
      }),
      endsParagraph: true,
    },
    {
      text: 'And it’s usually not a hard question.',
      visual: gif({
        src: 'section-02-lightbulb-idea.gif',
        source: {
          provider: 'giphy',
          id: 'SOb4AcaDitenU4XKdC',
          search: 'lightbulb idea simple icon animation',
        },
        color: '#fe806f',
        playbackRate: 0.98,
        place: 'above-captions',
      }),
    },
    {
      // The crossing happens in the first second, so the cut lands after it rather than on it.
      text: 'How many people finished onboarding last month.',
      visual: gif({
        src: 'section-03-finish-line.gif',
        source: {
          provider: 'giphy',
          id: 'SCs3VFALAvVHlTkgCJ',
          search: 'runner crossing finish line cute icon',
        },
        place: 'above-captions',
      }),
    },
    {
      text: 'How many came back.',
      visual: gif({
        src: 'section-04-welcome-back.gif',
        source: {
          provider: 'giphy',
          id: '3o6Zth4Kv2kNZgvSmI',
          search: 'cute character waving hello again icon',
        },
        place: 'above-captions',
      }),
      endsParagraph: true,
    },
    {
      text: 'You join the queue,',
      visual: gif({
        src: 'section-05-join-queue.gif',
        source: {
          provider: 'giphy',
          id: 'WcOGF3mNL8gAAbIh3F',
          search: 'people standing in line queue icon flat',
        },
        playbackRate: 0.75,
        place: 'above-captions',
      }),
    },
    {
      // Turning out empty pockets: the meeting happens and you arrive with nothing.
      text: 'and have the meeting without it.',
      visual: gif({
        src: 'section-06-empty-handed.gif',
        source: {
          provider: 'giphy',
          id: 'RLo3AazZVeBBfWqmCB',
          search: 'empty pockets nothing to show',
        },
        color: '#ffffff',
        playbackRate: 0.99,
        place: 'above-captions',
      }),
      endsParagraph: true,
    },
    {
      // Left looping on purpose: the seam is 0.05, so the repeat inside this beat is invisible.
      text: 'It’s four lines of SQL.',
      visual: gif({
        src: 'section-07-writing-sql.gif',
        source: {
          provider: 'giphy',
          id: '5NE2L7vdWZ9V39Sjq8',
          search: 'code snippet typing icon flat',
        },
        place: 'above-captions',
      }),
    },
    {
      text: 'You’ve just never been shown which four.',
      visual: gif({
        src: 'section-08-searching-flashlight.gif',
        source: {
          provider: 'giphy',
          id: 'PVrX3JmBB56KdqH1Y7',
          search: 'cute character searching flashlight icon',
        },
        color: '#620c1b',
        place: 'above-captions',
      }),
      endsParagraph: true,
    },
    {
      text: 'If you’d rather answer it yourself,',
      visual: gif({
        src: 'section-09-confident-woman.gif',
        source: {
          provider: 'giphy',
          id: 'evX7WKDd4rYu5sqKLk',
          search: 'cute creature confident pose animation',
        },
        playbackRate: 0.9,
        place: 'above-captions',
      }),
    },
    {
      text: 'that’s what we’re building a learning path for.',
      visual: gif({
        src: 'section-10-building-path.gif',
        source: {
          provider: 'giphy',
          id: '1oDwWUJWeDvyz12yWb',
          search: 'hammer building construction icon flat animation',
        },
        playbackRate: 0.88,
        place: 'above-captions',
      }),
      endsParagraph: true,
    },
    {
      text: 'By the end you’ll write it yourself,',
      visual: gif({
        src: 'section-11-write-it-yourself.gif',
        source: {
          provider: 'giphy',
          id: 'xUPGcevO43ANmVTCNO',
          search: 'woman typing laptop confident illustration',
        },
        place: 'above-captions',
      }),
    },
    {
      text: 'and check what the number includes:',
      visual: gif({
        src: 'section-12-check-inside.gif',
        source: {
          provider: 'giphy',
          id: '8tKfi2prqf32kexOC6',
          search: 'package box open contents icon flat',
        },
        playbackRate: 0.84,
        place: 'above-captions',
      }),
    },
    {
      text: 'test accounts,',
      visual: gif({
        src: 'section-13-test-accounts.gif',
        source: {
          provider: 'giphy',
          id: 'l0HlQCEq4A9H2evVC',
          search: 'spot illustration science beaker simple',
        },
        place: 'above-captions',
      }),
    },
    {
      // The ghost fades out across the beat, which is the line: they signed up and never came back
      // to confirm.
      text: 'people who never confirmed their email,',
      visual: gif({
        src: 'section-14-unconfirmed-ghost.gif',
        source: {
          provider: 'giphy',
          id: 'zDmLzJfRkPkJ3Dw4b9',
          search: 'faded ghost ignored icon flat',
        },
        playbackRate: 0.9,
        place: 'above-captions',
      }),
    },
    {
      text: 'the ones who signed up twice.',
      visual: gif({
        src: 'section-15-signed-up-twice.gif',
        source: {
          provider: 'giphy',
          id: 'nWDo0xi3pv1Adz18Ub',
          search: 'cute robot character icon 3d',
        },
        place: 'above-captions',
      }),
    },
    {
      text: 'So you stop quoting numbers you can’t defend.',
      visual: gif({
        src: 'section-16-defend-shield.gif',
        source: {
          provider: 'giphy',
          id: '2GBfKwJ7bypANDoqRt',
          search: 'cute character holding solid shield icon',
        },
        color: '#ffffff',
        place: 'above-captions',
      }),
      endsParagraph: true,
    },
    {
      text: 'The waitlist link is in the comments.',
      visual: gif({
        src: 'section-17-comments-below.gif',
        source: {
          provider: 'giphy',
          id: '26BkMfCPUHOumk0oM',
          search: 'down arrow bounce gif simple minimal',
        },
        color: '#584604',
        place: 'above-captions',
      }),
    },
    {
      // Flowers opening on the line about the learning path opening.
      text: 'Sign up and we’ll let you know when the learning path opens.',
      visual: gif({
        src: 'section-18-growing-signup.gif',
        source: {
          provider: 'giphy',
          id: 'PuqmtajWzEZqPld7p2',
          search: 'watering can flowers growing icon flat',
        },
        color: '#fafef8',
        playbackRate: 0.81,
        place: 'above-captions',
      }),
      endsParagraph: true,
    },
    {
      text: '[pause][curious] How long does a simple number take where you work?',
      visual: gif({
        src: 'section-19-time-question.gif',
        source: {
          provider: 'giphy',
          id: 'yw8lh1JuxnwB8mawsU',
          search: 'wall clock hands moving simple icon',
        },
        color: '#000000',
        place: 'above-captions',
      }),
    },
  ],
})
