import { clip, defineVideo, riveAtFrame } from '../narration/definition'

/**
 * A b-roll cut of "Scared to touch your own app?", the vibe coder campaign's video 3.
 * Script: productkind/marketing/content/campaigns/2026-09-vibe-coder-validation/
 * video-3-safe-changes-and-rollback/script.md
 *
 * Same narration as `vibe-coder-validation-03`, so the audio cache serves this one the take it
 * already generated rather than paying ElevenLabs for the same words twice. The narration has to
 * stay character-identical for that to hold: edit the words here and this becomes a new take at
 * full price.
 *
 * Where that video cuts twenty times to a gif per clause, this one holds thirteen clips of two to
 * six seconds. The grouping comes from the narrated timeline rather than a timer, so every cut
 * still lands on a clause boundary, and no run crosses a paragraph break.
 *
 * Footage is Tamas's own, from productkind's library, and no clip here appears in another b-roll
 * cut. Worth knowing before re-sourcing: this is the fourth b-roll cut drawn from that library and
 * the pool is thinning. Fifty-five clips were portrait, unused and long enough, the strongest went
 * to `pm-technical-fluency-validation-03-b-roll`, and what remained leans on flat grey water —
 * runs 0, 9 and 12 are all open water, and runs 5 and 6 carry their beats only loosely. Those
 * three are the ones to replace first if the library grows.
 *
 * Every clip is a second longer than the beat it covers, because `clip` has no playback rate and
 * no loop: one that ran out would hold a frozen frame while the captions and the parrot kept
 * moving. Each file is trimmed to its beat plus that second, cropped to fill 1080x1920, graded
 * `eq=saturation=1.35:contrast=1.15` and transcoded to H.264 with BT.709 tags, since the originals
 * are 10-bit HLG HEVC that Chromium cannot decode and that convert flat.
 */
export default defineVideo({
  id: 'vibe-coder-validation-03-b-roll',
  voice: 'chloe',
  model: 'eleven_v3',
  overlays: [
    riveAtFrame({ rive: 'parrot-greet-00.riv', frame: 0 }),
    riveAtFrame({ rive: 'parrot-peek-00.riv', frame: 500 }),
  ],
  sections: [
    {
      // IMG_8622: A small boat a long way out on flat grey water. Something that works and that you would
      // rather not rock.
      text: 'Scared to touch your app that you built with AI?',
      visual: clip({ src: 'clip-00-boat-precarious.mp4' }),
      endsParagraph: true,
    },
    {
      // IMG_8522: One plate and one cup on a table, then the camera drifts off them. The one small change you
      // meant to make.
      text: 'You want to change one onboarding screen.',
      visual: clip({ src: 'clip-01-one-small-change.mp4' }),
    },
    {
      // IMG_8664: Panning a long ornate facade, window after window. Everything the AI opened that you never
      // asked it to.
      text: 'The AI starts editing login, the database and files you have never seen before.',
      visual: clip({ src: 'clip-02-many-windows.mp4' }),
      endsParagraph: true,
    },
    {
      // IMG_8644: Long grass and wildflowers gone over. The improvement that stays on the list.
      text: 'So you cancel the change. The improvement stays on your list.',
      visual: clip({ src: 'clip-03-stays-on-list.mp4' }),
      endsParagraph: true,
    },
    {
      // IMG_8471: A house behind its fence and hedge. The working version you can go back to.
      text: 'Updating a live product needs a working version you can return to',
      visual: clip({ src: 'clip-04-version-to-return.mp4' }),
    },
    {
      // IMG_8832: A rocky shore with people out on it. A loose fit: the beat is about checking what a change
      // might break, and this only carries the idea of looking.
      text: 'and a way to check what the change might break.',
      visual: clip({ src: 'clip-05-shore-check.mp4' }),
      endsParagraph: true,
    },
    {
      // IMG_8627: Open water to a wooded far shore. Also loose — it reads as distance rather than as not
      // relying on luck.
      text: 'If you want to keep improving your app without relying on luck,',
      visual: clip({ src: 'clip-06-far-shore.mp4' }),
    },
    {
      // IMG_8484: Up into the branches of a tree-lined avenue. The learning path, and the one beat allowed to
      // be literal about it.
      text: 'that’s what we’re building a learning path for.',
      visual: clip({ src: 'clip-07-avenue-path.mp4' }),
      endsParagraph: true,
    },
    {
      // IMG_8477: The town hall square, panning across benches and old stone. Something kept as it was, which
      // is what saving a working version means.
      text: 'By the end, you’ll save a working version, make a small scoped change,',
      visual: clip({ src: 'clip-08-preserved-square.mp4' }),
    },
    {
      // IMG_8576: A ferry crossing flat water. It goes over and it comes back, which is the undo.
      text: 'test the affected journey and undo it if the test fails.',
      visual: clip({ src: 'clip-09-ferry-returns.mp4' }),
      endsParagraph: true,
    },
    {
      // IMG_7646: A willow hanging down over water, so the movement on the CTA beat is downward.
      text: 'The waitlist link is in the comments.',
      visual: clip({ src: 'clip-10-willow-down.mp4' }),
    },
    {
      // IMG_8573: The sun over a shoreline, for the line about the learning path opening. The only sunlit clip
      // in the cut.
      text: 'Sign up and we’ll let you know when the learning path opens.',
      visual: clip({ src: 'clip-11-sun-opens.mp4' }),
      endsParagraph: true,
    },
    {
      // IMG_8743: Empty water to the horizon. Room to think about the closing question.
      text: '[pause][curious] What change have you been putting off?',
      visual: clip({ src: 'clip-12-open-water.mp4' }),
    },
  ],
})
