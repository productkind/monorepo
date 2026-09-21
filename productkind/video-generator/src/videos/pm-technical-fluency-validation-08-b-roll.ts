import { clip, defineVideo, riveAtFrame } from '../narration/definition'

/**
 * A b-roll cut of ""When can we launch it?"", the PM technical fluency campaign's video 8.
 * Script: productkind/marketing/content/campaigns/2026-09-pm-technical-fluency-validation/
 * video-8-when-can-we-launch-it/script.md
 *
 * Same narration as `pm-technical-fluency-validation-08`, so the audio cache serves this one the take it already generated
 * rather than paying ElevenLabs for the same words twice. The narration has to stay
 * character-identical for that to hold.
 *
 * 20 clauses merged into 13 runs, no run crossing a paragraph break. The stock cut of this
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
  id: 'pm-technical-fluency-validation-08-b-roll',
  voice: 'chloe',
  model: 'eleven_v3',
  overlays: [
    riveAtFrame({ rive: 'parrot-greet-00.riv', frame: 0 }),
    riveAtFrame({ rive: 'parrot-peek-00.riv', frame: 500 }),
  ],
  sections: [
    {
      // PXL_20260910_135102662
      text: 'You built something with AI to test an idea.',
      visual: clip({ src: 'clip-00-desk-and-pastry.mp4' }),
    },
    {
      // IMG_9001
      text: 'Your stakeholder saw it and asked when we can launch it.',
      visual: clip({ src: 'clip-01-laptop-on-yellow.mp4' }),
      endsParagraph: true,
    },
    {
      // PXL_20260910_135109681
      text: 'It works on your laptop, so to them it looks finished.',
      visual: clip({ src: 'clip-02-hands-typing.mp4' }),
      endsParagraph: true,
    },
    {
      // PXL_20260801_165954456
      text: 'And you can’t explain why it isn’t, so you sound like you’re stalling.',
      visual: clip({ src: 'clip-03-haze-no-detail.mp4' }),
      endsParagraph: true,
    },
    {
      // PXL_20260417_060250437
      text: 'Your prototype proves the idea works.',
      visual: clip({ src: 'clip-04-drifting-bell.mp4' }),
    },
    {
      // PXL_20260908_191430121
      text: 'None of what keeps a real product running is there.',
      visual: clip({ src: 'clip-05-dark-horizon.mp4' }),
      endsParagraph: true,
    },
    {
      // PXL_20260416_064746442
      text:
        'If you want to answer that stakeholder with real reasons, we’re building ' +
        'a learning path for it.',
      visual: clip({ src: 'clip-06-trees-over-water.mp4' }),
      endsParagraph: true,
    },
    {
      // IMG_7646
      text: 'By the end you’ll be able to name what your prototype skipped:',
      visual: clip({ src: 'clip-07-green-shallows.mp4' }),
    },
    {
      // IMG_8576
      text: 'whose data it holds, who’s allowed in, what it does under real load,',
      visual: clip({ src: 'clip-08-ferry-crossing.mp4' }),
    },
    {
      // IMG_2690
      text: 'who gets woken at 2am when something goes wrong, and who maintains it.',
      visual: clip({ src: 'clip-09-beach-at-night.mp4' }),
      endsParagraph: true,
    },
    {
      // PXL_20260710_144233333
      text: 'The waitlist link is in the comments.',
      visual: clip({ src: 'clip-10-field-under-cloud.mp4' }),
    },
    {
      // PXL_20260801_174936490
      text: 'Sign up and we’ll let you know when the learning path opens.',
      visual: clip({ src: 'clip-11-low-sun.mp4' }),
      endsParagraph: true,
    },
    {
      // PXL_20260315_033957416
      text: '[pause][curious] Ever been asked to ship a prototype?',
      visual: clip({ src: 'clip-12-path-and-watcher.mp4' }),
    },
  ],
})
