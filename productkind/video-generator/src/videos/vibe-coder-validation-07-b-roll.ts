import { clip, defineVideo, riveAtFrame } from '../narration/definition'

/**
 * A b-roll cut of "You launched. Three people visited.", the vibe coder campaign's video 7.
 * Script: productkind/marketing/content/campaigns/2026-09-vibe-coder-validation/
 * video-7-revenue-and-validation/script.md
 *
 * Same narration as `vibe-coder-validation-07`, so the audio cache serves this one the take it already generated
 * rather than paying ElevenLabs for the same words twice. The narration has to stay
 * character-identical for that to hold.
 *
 * 19 clauses merged into 15 runs, no run crossing a paragraph break. The stock cut of this
 * video uses the same runs.
 *
 * Footage is Tamas's own, from productkind's library. This is the last pair of b-roll cuts in the
 * campaign and the library cannot cover them unshared, so footage is reused across campaigns
 * under the rule agreed when it first ran short: nothing repeats inside a campaign, so the two
 * cuts a viewer is likely to see together share no shot, but a clip may recur across campaigns.
 * The pool is filtered on real stream dimensions, since a few older files are 478x850 and would
 * be upscaled more than twice into the frame.
 *
 * Every clip is a second longer than the beat it covers, because `clip` has no playback rate and
 * no loop: one that ran out would hold a frozen frame while the captions and the parrot kept
 * moving. Each file is trimmed to its beat plus that second, cropped to fill 1080x1920, graded
 * `eq=saturation=1.35:contrast=1.15` and transcoded to H.264 with BT.709 tags, since the
 * originals are 10-bit HLG HEVC that Chromium cannot decode and that convert flat.
 */
export default defineVideo({
  id: 'vibe-coder-validation-07-b-roll',
  voice: 'chloe',
  model: 'eleven_v3',
  overlays: [
    riveAtFrame({ rive: 'parrot-greet-00.riv', frame: 0 }),
    riveAtFrame({ rive: 'parrot-peek-00.riv', frame: 500 }),
  ],
  sections: [
    {
      // IMG_8560
      text: 'You launched your app. Three people visited, and nobody paid.',
      visual: clip({ src: 'clip-00-empty-glass-hall.mp4' }),
      endsParagraph: true,
    },
    {
      // IMG_8509
      text: 'Now you don’t know which problem to solve. Do you need more visitors,',
      visual: clip({ src: 'clip-01-wide-water.mp4' }),
    },
    {
      // IMG_8504
      text: 'a clearer offer, an easier sign-up or a different price?',
      visual: clip({ src: 'clip-02-shelves-of-choices.mp4' }),
      endsParagraph: true,
    },
    {
      // IMG_2492
      text: 'Adding another feature cannot answer that question.',
      visual: clip({ src: 'clip-03-dense-green.mp4' }),
    },
    {
      // PXL_20260711_073819593
      text: 'Customer conversations and behaviour can.',
      visual: clip({ src: 'clip-04-people-walking.mp4' }),
      endsParagraph: true,
    },
    {
      // IMG_8535
      text: 'You need one hypothesis, one result to measure',
      visual: clip({ src: 'clip-05-grey-water.mp4' }),
    },
    {
      // PXL_20260206_032542038
      text: 'and the smallest test that could change your next decision.',
      visual: clip({ src: 'clip-06-turtles-basking.mp4' }),
      endsParagraph: true,
    },
    {
      // IMG_8636
      text: 'If you want evidence that your product solves a worthwhile problem,',
      visual: clip({ src: 'clip-07-hazy-sea.mp4' }),
    },
    {
      // IMG_8619
      text: 'that’s what we’re building a learning path for.',
      visual: clip({ src: 'clip-08-geese-pair.mp4' }),
      endsParagraph: true,
    },
    {
      // IMG_8718
      text: 'By the end, you’ll track a meaningful customer action,',
      visual: clip({ src: 'clip-09-stony-shore.mp4' }),
    },
    {
      // PXL_20260416_064527538
      text: 'run a focused experiment, test a price',
      visual: clip({ src: 'clip-10-tall-trees.mp4' }),
    },
    {
      // IMG_8486
      text: 'and give real customers a working way to pay.',
      visual: clip({ src: 'clip-11-park-in-leaf.mp4' }),
      endsParagraph: true,
    },
    {
      // IMG_8501
      text: 'The waitlist link is in the comments.',
      visual: clip({ src: 'clip-12-building-and-path.mp4' }),
    },
    {
      // PXL_20260801_175218189
      text: 'Sign up and we’ll let you know when the learning path opens.',
      visual: clip({ src: 'clip-13-red-sun.mp4' }),
      endsParagraph: true,
    },
    {
      // PXL_20260416_064509612
      text:
        '[pause][curious] What’s harder for you: finding users or deciding what ' + 'to charge?',
      visual: clip({ src: 'clip-14-trees-by-water.mp4' }),
    },
  ],
})
