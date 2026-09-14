import { clip, defineVideo, riveAtFrame } from '../narration/definition'

/**
 * A b-roll cut of "Needed tomorrow, ready next week", the PM technical fluency campaign's video 6.
 * Script: productkind/marketing/content/campaigns/2026-09-pm-technical-fluency-validation/
 * video-6-needed-tomorrow-ready-next-week/script.md
 *
 * Same narration as `pm-technical-fluency-validation-06`, so the audio cache serves this one the take it already
 * generated rather than paying ElevenLabs for the same words twice. The narration has to stay
 * character-identical for that to hold: edit the words here and this becomes a new take at full
 * price.
 *
 * Twenty clauses merged into twelve runs of under two to five and a half seconds, no run crossing
 * a paragraph break. The stock cut of this video uses the same twelve runs.
 *
 * Footage is Tamas's own, from productkind's library, and every clip here is one nothing else has
 * used. Two notes for whoever sources the next one. The library now mixes `IMG_*` and `PXL_*`
 * names, so the scan that works out which footage is already spent has to match on the stem
 * rather than on `IMG_`. And a handful of the older files are only 478x850, which would be
 * upscaled more than twice into the frame and look soft, so the pool is filtered on the real
 * stream dimensions rather than on being portrait.
 *
 * Every clip is a second longer than the beat it covers, because `clip` has no playback rate and
 * no loop: one that ran out would hold a frozen frame while the captions and the parrot kept
 * moving. Each file is trimmed to its beat plus that second, cropped to fill 1080x1920, graded
 * `eq=saturation=1.35:contrast=1.15` and transcoded to H.264 with BT.709 tags, since the
 * originals are 10-bit HLG HEVC that Chromium cannot decode and that convert flat.
 */
export default defineVideo({
  id: 'pm-technical-fluency-validation-06-b-roll',
  voice: 'chloe',
  model: 'eleven_v3',
  overlays: [
    riveAtFrame({ rive: 'parrot-greet-00.riv', frame: 0 }),
    riveAtFrame({ rive: 'parrot-peek-00.riv', frame: 500 }),
  ],
  sections: [
    {
      // IMG_8515: A working shore under flat cloud. The morning the number is due.
      text:
        'You need a product metric for tomorrow’s meeting. Analytics will have it ' + 'next week.',
      visual: clip({ src: 'clip-00-grey-morning-shore.mp4' }),
      endsParagraph: true,
    },
    {
      // IMG_5821: A single bird walking a gravel path. Not a hard question.
      text: 'And it’s usually not a hard question.',
      visual: clip({ src: 'clip-01-one-goose-walking.mp4' }),
    },
    {
      // PXL_20260131_022623309: Two of them, side by side. How many finished, how many came back.
      text: 'How many people finished onboarding last month. How many came back.',
      visual: clip({ src: 'clip-02-two-geese-counted.mp4' }),
      endsParagraph: true,
    },
    {
      // PXL_20260711_073819593: Birds shuffling along past a row of chairs, waiting their turn.
      text: 'You join the queue, and have the meeting without it.',
      visual: clip({ src: 'clip-03-queue-by-the-chairs.mp4' }),
      endsParagraph: true,
    },
    {
      // PXL_20260206_032542038: Four turtles on one rock. Countable, once somebody shows you where to look.
      text: 'It’s four lines of SQL. You’ve just never been shown which four.',
      visual: clip({ src: 'clip-04-turtles-on-the-rock.mp4' }),
      endsParagraph: true,
    },
    {
      // IMG_2492: Open ground and old trees, room to work it out yourself.
      text:
        'If you’d rather answer it yourself, that’s what we’re building a ' + 'learning path for.',
      visual: clip({ src: 'clip-05-open-parkland.mp4' }),
      endsParagraph: true,
    },
    {
      // PXL_20260910_135053851: Hands on a keyboard, writing it rather than asking for it.
      text: 'By the end you’ll write it yourself, and check what the number includes:',
      visual: clip({ src: 'clip-06-hands-at-the-laptop.mp4' }),
    },
    {
      // PXL_20260206_033010721: Something sitting in the undergrowth that you would miss unless you looked.
      text: 'test accounts, people who never confirmed their email,',
      visual: clip({ src: 'clip-07-toad-in-the-leaf-litter.mp4' }),
    },
    {
      // IMG_7578: Two of the same animal in one frame. The ones who signed up twice.
      text: 'the ones who signed up twice. So you stop quoting numbers you can’t defend.',
      visual: clip({ src: 'clip-08-two-of-the-same.mp4' }),
      endsParagraph: true,
    },
    {
      // IMG_4048: People gathered on the grass, which is where the comments are.
      text: 'The waitlist link is in the comments.',
      visual: clip({ src: 'clip-09-crowd-on-the-grass.mp4' }),
    },
    {
      // PXL_20260416_064527538: Sunlit trees over open water.
      text: 'Sign up and we’ll let you know when the learning path opens.',
      visual: clip({ src: 'clip-10-bright-water-trees.mp4' }),
      endsParagraph: true,
    },
    {
      // PXL_20260416_064556150: A willow over still water, holding the question.
      text: '[pause][curious] How long does a simple number take where you work?',
      visual: clip({ src: 'clip-11-willow-still-water.mp4' }),
    },
  ],
})
