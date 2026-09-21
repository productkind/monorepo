import { clip, defineVideo, riveAtFrame } from '../narration/definition'

/**
 * A b-roll cut of "Can you run your own app?", the vibe coder campaign's video 8.
 * Script: productkind/marketing/content/campaigns/2026-09-vibe-coder-validation/
 * video-8-independent-without-becoming-an-engineer/script.md
 *
 * Same narration as `vibe-coder-validation-08`, so the audio cache serves this one the take it already generated
 * rather than paying ElevenLabs for the same words twice. The narration has to stay
 * character-identical for that to hold.
 *
 * 21 clauses merged into 13 runs, no run crossing a paragraph break. The stock cut of this
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
  id: 'vibe-coder-validation-08-b-roll',
  voice: 'chloe',
  model: 'eleven_v3',
  overlays: [
    riveAtFrame({ rive: 'parrot-greet-00.riv', frame: 0 }),
    riveAtFrame({ rive: 'parrot-peek-00.riv', frame: 500 }),
  ],
  sections: [
    {
      // PXL_20260114_023444908
      text: 'Can you run your own app?',
      visual: clip({ src: 'clip-00-palms.mp4' }),
      endsParagraph: true,
    },
    {
      // IMG_8638 2
      text: 'You built it with AI. Then a customer can’t sign in,',
      visual: clip({ src: 'clip-01-laptop-at-the-desk.mp4' }),
    },
    {
      // IMG_8727
      text: 'a payment fails, or a change breaks another screen.',
      visual: clip({ src: 'clip-02-flat-shore.mp4' }),
      endsParagraph: true,
    },
    {
      // IMG_8626
      text: 'The AI gives you an answer. You decide whether to publish the fix,',
      visual: clip({ src: 'clip-03-mossy-wall.mp4' }),
    },
    {
      // IMG_8802
      text: 'restore the working version or collect more evidence.',
      visual: clip({ src: 'clip-04-brick-and-ivy.mp4' }),
      endsParagraph: true,
    },
    {
      // IMG_8514
      text: 'Owning your app means knowing its main parts,',
      visual: clip({ src: 'clip-05-open-water.mp4' }),
    },
    {
      // IMG_8634
      text: 'keeping a working version and checking the main customer journey.',
      visual: clip({ src: 'clip-06-tower-path.mp4' }),
      endsParagraph: true,
    },
    {
      // IMG_7578
      text:
        'If you want a repeatable way to run your app yourself, that’s what we’re ' +
        'building a learning path for.',
      visual: clip({ src: 'clip-07-yellow-figures.mp4' }),
      endsParagraph: true,
    },
    {
      // IMG_8688
      text: 'By the end, you’ll map your app, review changes, test the customer journey,',
      visual: clip({ src: 'clip-08-arch-and-lawn.mp4' }),
    },
    {
      // IMG_8612
      text:
        'restore a working version and choose your next step using evidence you ' + 'collected.',
      visual: clip({ src: 'clip-09-cafe-table.mp4' }),
      endsParagraph: true,
    },
    {
      // PXL_20260206_033010721
      text: 'The waitlist link is in the comments.',
      visual: clip({ src: 'clip-10-laptop-close.mp4' }),
    },
    {
      // IMG_8721
      text: 'Sign up and we’ll let you know when the learning path opens.',
      visual: clip({ src: 'clip-11-green-mounds.mp4' }),
      endsParagraph: true,
    },
    {
      // PXL_20260416_084418841
      text: '[pause][curious] Which part of running your app feels hardest?',
      visual: clip({ src: 'clip-12-watching-from-the-rocks.mp4' }),
    },
  ],
})
