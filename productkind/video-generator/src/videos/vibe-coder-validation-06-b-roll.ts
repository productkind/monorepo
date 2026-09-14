import { clip, defineVideo, riveAtFrame } from '../narration/definition'

/**
 * A b-roll cut of "Could one customer increase your bill?", the vibe coder campaign's video 6.
 * Script: productkind/marketing/content/campaigns/2026-09-vibe-coder-validation/
 * video-6-predictable-running-costs/script.md
 *
 * Same narration as `vibe-coder-validation-06`, so the audio cache serves this one the take it already
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
  id: 'vibe-coder-validation-06-b-roll',
  voice: 'chloe',
  model: 'eleven_v3',
  overlays: [
    riveAtFrame({ rive: 'parrot-greet-00.riv', frame: 0 }),
    riveAtFrame({ rive: 'parrot-peek-00.riv', frame: 500 }),
  ],
  sections: [
    {
      // IMG_8465: One pastry on a plate. A single customer, and what they cost you.
      text: 'Could one customer increase your bill?',
      visual: clip({ src: 'clip-00-one-small-purchase.mp4' }),
      endsParagraph: true,
    },
    {
      // PXL_20260417_060449800: A cluster of jellyfish drifting at different speeds. Four services, four meters.
      text: 'Your AI app builder, database, email service and AI model',
      visual: clip({ src: 'clip-01-drifting-cluster.mp4' }),
    },
    {
      // PXL_20260520_124553405: Water running over mossy rock, some of it pooling, some of it rising.
      text: 'all charge differently. Some costs stay fixed. Others rise with usage.',
      visual: clip({ src: 'clip-02-water-over-mossy-rock.mp4' }),
      endsParagraph: true,
    },
    {
      // PXL_20260319_103144881: Lotus pads on flat water. Cheap to float, hard to price.
      text: 'That makes a cheap prototype hard to price as a live product.',
      visual: clip({ src: 'clip-03-lotus-pads.mp4' }),
      endsParagraph: true,
    },
    {
      // PXL_20260417_060301259: One animal working at one piece of fruit. What a single active customer costs.
      text: 'You need to know what one active customer costs,',
      visual: clip({ src: 'clip-04-one-feeding.mp4' }),
    },
    {
      // PXL_20260801_165954456: Water running away to distant hills. Ten becoming a hundred.
      text: 'what happens when ten become a hundred and which service will charge you ' + 'first.',
      visual: clip({ src: 'clip-05-wide-hazy-water.mp4' }),
      endsParagraph: true,
    },
    {
      // PXL_20260416_064746442: Old trees along a bank, grown into what they cost to keep.
      text:
        'If you want to understand the cost of running your app, that’s what ' +
        'we’re building a learning path for.',
      visual: clip({ src: 'clip-06-trees-over-the-bank.mp4' }),
      endsParagraph: true,
    },
    {
      // PXL_20260710_141657280: Cranes standing over a quay, each one a line on the bill.
      text: 'By the end, you’ll list your fixed and usage costs,',
      visual: clip({ src: 'clip-07-cranes-itemised.mp4' }),
    },
    {
      // PXL_20260711_051056271: A field with water in it, the whole thing in view at once.
      text:
        'estimate a cost per active customer, set spending alerts and test ' +
        'whether your price can cover them.',
      visual: clip({ src: 'clip-08-field-and-pond.mp4' }),
      endsParagraph: true,
    },
    {
      // IMG_8722: Green mounds, somewhere to stop.
      text: 'The waitlist link is in the comments.',
      visual: clip({ src: 'clip-09-green-mounds.mp4' }),
    },
    {
      // PXL_20260801_175234217: The sun low over open water.
      text: 'Sign up and we’ll let you know when the learning path opens.',
      visual: clip({ src: 'clip-10-sun-on-the-water.mp4' }),
      endsParagraph: true,
    },
    {
      // PXL_20260910_135109681: A single jellyfish drifting in dark water. The cost you cannot predict.
      text: '[pause][curious] Which app cost is hardest for you to predict?',
      visual: clip({ src: 'clip-11-drifting-in-the-dark.mp4' }),
    },
  ],
})
