import { clip, defineVideo, riveAtFrame } from '../narration/definition'

/**
 * A b-roll cut of "Nobody raised the hard part", the PM technical fluency campaign's video 7.
 * Script: productkind/marketing/content/campaigns/2026-09-pm-technical-fluency-validation/
 * video-7-nobody-raised-the-hard-part/script.md
 *
 * Same narration as `pm-technical-fluency-validation-07`, so the audio cache serves this one the take it already generated
 * rather than paying ElevenLabs for the same words twice. The narration has to stay
 * character-identical for that to hold.
 *
 * 18 clauses merged into 12 runs, no run crossing a paragraph break. The stock cut of this
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
  id: 'pm-technical-fluency-validation-07-b-roll',
  voice: 'chloe',
  model: 'eleven_v3',
  overlays: [
    riveAtFrame({ rive: 'parrot-greet-00.riv', frame: 0 }),
    riveAtFrame({ rive: 'parrot-peek-00.riv', frame: 500 }),
  ],
  sections: [
    {
      // PXL_20260416_064603919
      text:
        'The decision was made in a meeting you were in. Nobody raised the hard ' + 'questions.',
      visual: clip({ src: 'clip-00-crowded-plaza.mp4' }),
      endsParagraph: true,
    },
    {
      // PXL_20260206_025310218
      text: 'The engineers assumed you’d already scoped it. You didn’t know what to ask.',
      visual: clip({ src: 'clip-01-rough-bark.mp4' }),
      endsParagraph: true,
    },
    {
      // PXL_20260207_110206786
      text:
        'Three weeks later, the work turns out to be twice the size, and your ' + 'roadmap moves.',
      visual: clip({ src: 'clip-02-tunnel-runs-on.mp4' }),
      endsParagraph: true,
    },
    {
      // PXL_20260416_064922297
      text: 'Running that discussion was your job, and nobody teaches you the questions.',
      visual: clip({ src: 'clip-03-trees-and-water.mp4' }),
      endsParagraph: true,
    },
    {
      // IMG_8680
      text:
        'If you want to be the one who raises them, we’re building a learning ' + 'path for it.',
      visual: clip({ src: 'clip-04-shore-and-birds.mp4' }),
      endsParagraph: true,
    },
    {
      // IMG_8650
      text: 'By the end, you’ll be able to run that discussion.',
      visual: clip({ src: 'clip-05-park-open.mp4' }),
    },
    {
      // PXL_20260801_165024336
      text: 'What does this change rely on that we don’t control?',
      visual: clip({ src: 'clip-06-reed-edge.mp4' }),
    },
    {
      // IMG_8491
      text: 'What happens when a request fails halfway?',
      visual: clip({ src: 'clip-07-jetty-ends.mp4' }),
    },
    {
      // IMG_8511
      text: 'Does it touch permissions, or data that already exists?',
      visual: clip({ src: 'clip-08-island-offshore.mp4' }),
      endsParagraph: true,
    },
    {
      // PXL_20260710_144300857
      text: 'The waitlist link is in the comments.',
      visual: clip({ src: 'clip-09-crowd-on-grass.mp4' }),
    },
    {
      // PXL_20260801_175424824
      text: 'Sign up, and we’ll let you know when the learning path opens.',
      visual: clip({ src: 'clip-10-sun-going-down.mp4' }),
      endsParagraph: true,
    },
    {
      // PXL_20260315_033559756
      text: '[pause][curious] Who raises the hard part on your team?',
      visual: clip({ src: 'clip-11-lone-watcher.mp4' }),
    },
  ],
})
