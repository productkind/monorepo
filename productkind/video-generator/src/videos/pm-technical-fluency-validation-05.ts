import { defineVideo, gif, riveAtFrame } from '../narration/definition'

/**
 * Video 5 of the PM technical fluency campaign, "Needed tomorrow, ready next week".
 * Script: productkind/marketing/content/campaigns/2026-09-pm-technical-fluency-validation/
 * video-5-needed-tomorrow-ready-next-week/script.md
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
 * this script is narrated: re-check with `verify.py --video pm-technical-fluency-validation-05`
 * from the video-gifs skill, and render the composed stills at the same time.
 */
export default defineVideo({
  id: 'pm-technical-fluency-validation-05',
  voice: 'chloe',
  model: 'eleven_v3',
  overlays: [
    riveAtFrame({ rive: 'parrot-greet-00.riv', frame: 0 }),
    riveAtFrame({ rive: 'parrot-peek-00.riv', frame: 500 }),
  ],
  sections: [
    {
      // giphy "loading spinner hourglass icon": https://giphy.com/gifs/xFmuT64Jto3mRO4w3G
      text: 'You need a product metric for tomorrow’s meeting.',
      visual: gif({
        src: 'section-00-hourglass-time.gif',
        playbackRate: 0.73,
        place: 'above-captions',
      }),
    },
    {
      // giphy "cute snail slow crawling character": https://giphy.com/gifs/Lx1GlkOqRy1JxRFrws
      text: 'Analytics will have it next week.',
      visual: gif({ src: 'section-01-snail-slow.gif', playbackRate: 0.9, place: 'above-captions' }),
      endsParagraph: true,
    },
    {
      // giphy "lightbulb idea simple icon animation": https://giphy.com/gifs/SOb4AcaDitenU4XKdC
      text: 'And it’s usually not a hard question.',
      visual: gif({
        src: 'section-02-lightbulb-idea.gif',
        playbackRate: 0.98,
        place: 'above-captions',
      }),
    },
    {
      // giphy "runner crossing finish line cute icon": https://giphy.com/gifs/SCs3VFALAvVHlTkgCJ
      // The crossing happens in the first second, so the cut lands after it rather than on it.
      text: 'How many people finished onboarding last month.',
      visual: gif({ src: 'section-03-finish-line.gif', place: 'above-captions' }),
    },
    {
      // giphy "cute character waving hello again icon": https://giphy.com/gifs/3o6Zth4Kv2kNZgvSmI
      text: 'How many came back.',
      visual: gif({ src: 'section-04-welcome-back.gif', place: 'above-captions' }),
      endsParagraph: true,
    },
    {
      // giphy "people standing in line queue icon flat": https://giphy.com/gifs/WcOGF3mNL8gAAbIh3F
      text: 'You join the queue,',
      visual: gif({ src: 'section-05-join-queue.gif', playbackRate: 0.75, place: 'above-captions' }),
    },
    {
      // giphy "empty pockets nothing to show": https://giphy.com/gifs/RLo3AazZVeBBfWqmCB
      // Turning out empty pockets: the meeting happens and you arrive with nothing.
      text: 'and have the meeting without it.',
      visual: gif({
        src: 'section-06-empty-handed.gif',
        playbackRate: 0.99,
        place: 'above-captions',
      }),
      endsParagraph: true,
    },
    {
      // giphy "code snippet typing icon flat": https://giphy.com/gifs/5NE2L7vdWZ9V39Sjq8
      // Left looping on purpose: the seam is 0.05, so the repeat inside this beat is invisible.
      text: 'It’s four lines of SQL.',
      visual: gif({ src: 'section-07-writing-sql.gif', place: 'above-captions' }),
    },
    {
      // giphy "cute character searching flashlight icon": https://giphy.com/gifs/PVrX3JmBB56KdqH1Y7
      text: 'You’ve just never been shown which four.',
      visual: gif({ src: 'section-08-searching-flashlight.gif', place: 'above-captions' }),
      endsParagraph: true,
    },
    {
      // giphy "cute creature confident pose animation": https://giphy.com/gifs/evX7WKDd4rYu5sqKLk
      text: 'If you’d rather answer it yourself,',
      visual: gif({
        src: 'section-09-confident-woman.gif',
        playbackRate: 0.9,
        place: 'above-captions',
      }),
    },
    {
      // giphy "hammer building construction icon flat animation":
      // https://giphy.com/gifs/1oDwWUJWeDvyz12yWb
      text: 'that’s what we’re building a learning path for.',
      visual: gif({
        src: 'section-10-building-path.gif',
        playbackRate: 0.88,
        place: 'above-captions',
      }),
      endsParagraph: true,
    },
    {
      // giphy "woman typing laptop confident illustration": https://giphy.com/gifs/xUPGcevO43ANmVTCNO
      text: 'By the end you’ll write it yourself,',
      visual: gif({ src: 'section-11-write-it-yourself.gif', place: 'above-captions' }),
    },
    {
      // giphy "package box open contents icon flat": https://giphy.com/gifs/8tKfi2prqf32kexOC6
      text: 'and check what the number includes:',
      visual: gif({
        src: 'section-12-check-inside.gif',
        playbackRate: 0.84,
        place: 'above-captions',
      }),
    },
    {
      // giphy "spot illustration science beaker simple": https://giphy.com/gifs/l0HlQCEq4A9H2evVC
      text: 'test accounts,',
      visual: gif({ src: 'section-13-test-accounts.gif', place: 'above-captions' }),
    },
    {
      // giphy "faded ghost ignored icon flat": https://giphy.com/gifs/zDmLzJfRkPkJ3Dw4b9
      // The ghost fades out across the beat, which is the line: they signed up and never came back
      // to confirm.
      text: 'people who never confirmed their email,',
      visual: gif({
        src: 'section-14-unconfirmed-ghost.gif',
        playbackRate: 0.9,
        place: 'above-captions',
      }),
    },
    {
      // giphy "cute robot character icon 3d": https://giphy.com/gifs/nWDo0xi3pv1Adz18Ub
      text: 'the ones who signed up twice.',
      visual: gif({ src: 'section-15-signed-up-twice.gif', place: 'above-captions' }),
    },
    {
      // giphy "cute character holding solid shield icon": https://giphy.com/gifs/2GBfKwJ7bypANDoqRt
      text: 'So you stop quoting numbers you can’t defend.',
      visual: gif({ src: 'section-16-defend-shield.gif', place: 'above-captions' }),
      endsParagraph: true,
    },
    {
      // giphy "down arrow bounce gif simple minimal": https://giphy.com/gifs/26BkMfCPUHOumk0oM
      text: 'The waitlist link is in the comments.',
      visual: gif({ src: 'section-17-comments-below.gif', place: 'above-captions' }),
    },
    {
      // giphy "watering can flowers growing icon flat": https://giphy.com/gifs/PuqmtajWzEZqPld7p2
      // Flowers opening on the line about the learning path opening.
      text: 'Sign up and we’ll let you know when the learning path opens.',
      visual: gif({
        src: 'section-18-growing-signup.gif',
        playbackRate: 0.81,
        place: 'above-captions',
      }),
      endsParagraph: true,
    },
    {
      // giphy "wall clock hands moving simple icon": https://giphy.com/gifs/yw8lh1JuxnwB8mawsU
      text: '[pause][curious] How long does a simple number take where you work?',
      visual: gif({ src: 'section-19-time-question.gif', place: 'above-captions' }),
    },
  ],
})
