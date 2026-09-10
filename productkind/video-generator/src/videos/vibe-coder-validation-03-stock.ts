import { clip, defineVideo, riveAtFrame } from '../narration/definition'

/**
 * A stock-footage cut of "Scared to touch your own app?", the vibe coder campaign's video 3.
 * Script: productkind/marketing/content/campaigns/2026-09-vibe-coder-validation/
 * video-3-safe-changes-and-rollback/script.md
 *
 * Same narration as `vibe-coder-validation-03`, so the audio cache serves this one the take it
 * already generated rather than paying ElevenLabs for the same words twice. The narration has to
 * stay character-identical for that to hold: edit the words here and this becomes a new take at
 * full price.
 *
 * Thirteen clips of two to six seconds, grouped exactly as the b-roll cut of the same video is, so
 * both cuts change picture on the same words. The grouping comes from the narrated timeline rather
 * than a timer, so every cut lands on a clause boundary and no run crosses a paragraph break.
 *
 * The script is about being afraid to disturb something that works, so it opens on balanced stones
 * and ink going everywhere at once, and turns on craft that can be repeated: a wheel, a watch
 * movement, a pencil line that can be rubbed out.
 *
 * Footage is Pexels, whose licence allows commercial use with no attribution. No identifiable
 * person appears anywhere in this cut. The API guidelines ask for a link back to Pexels, so credit
 * it in the description, and the photographer is recorded on each clip for the same reason.
 *
 * Two things worth knowing when re-sourcing. Pexels' poster frame regularly serves different
 * footage from the file behind it — on this cut a "dominoes toppling" poster delivered a family
 * scene, and "rubber band" queries returned pasta, fallen flowers and fireworks — so judge on the
 * contact sheet of the download. And its tagging conflates some terms outright: "iris" and
 * "aperture" both return eye macros rather than anything mechanical.
 *
 * Every clip is a second longer than the beat it covers, because `clip` has no playback rate and
 * no loop: one that ran out would hold a frozen frame while the captions kept moving. Each file is
 * trimmed to its beat plus that second, stripped of audio and re-encoded to H.264 at CRF 23 with
 * BT.709 tags, and no grade is applied — stock arrives as SDR BT.709 already.
 */
export default defineVideo({
  id: 'vibe-coder-validation-03-stock',
  voice: 'chloe',
  model: 'eleven_v3',
  overlays: [
    riveAtFrame({ rive: 'parrot-greet-00.riv', frame: 0 }),
    riveAtFrame({ rive: 'parrot-peek-00.riv', frame: 500 }),
  ],
  sections: [
    {
      // A stack of balanced stones. Something that stands up and that you would rather not
      // touch.
      text: 'Scared to touch your app that you built with AI?',
      visual: clip({
        src: 'clip-00-balanced-stone-stack.mp4',
        source: {
          provider: 'pexels',
          id: '39152712',
          search: 'stacked stones balancing close up',
          author: 'Anna Lupa',
        },
      }),
      endsParagraph: true,
    },
    {
      // A hand at the keys. The one small change you meant to make; the hand plays on across
      // several rather than touching one, which makes this a moderate fit.
      text: 'You want to change one onboarding screen.',
      visual: clip({
        src: 'clip-01-one-key-pressed.mp4',
        source: {
          provider: 'pexels',
          id: '35758361',
          search: 'finger pressing one piano key close up',
          author: 'Reyhan',
        },
      }),
    },
    {
      // Ink let into water, going everywhere at once. Login, the database, files you
      // have never seen.
      text: 'The AI starts editing login, the database and files you have never seen before.',
      visual: clip({
        src: 'clip-02-ink-spreading-uncontrolled.mp4',
        source: {
          provider: 'pexels',
          id: '9668946',
          search: 'ink diffusing water black background',
          author: 'cottonbro studio',
        },
      }),
      endsParagraph: true,
    },
    {
      // A candle just put out. You cancelled the change and the improvement stayed on
      // the list.
      text: 'So you cancel the change. The improvement stays on your list.',
      visual: clip({
        src: 'clip-03-extinguished-candle-smoke.mp4',
        source: {
          provider: 'pexels',
          id: '7303638',
          search: 'candle being extinguished smoke rising',
          author: 'Cup of Couple',
        },
      }),
      endsParagraph: true,
    },
    {
      // Storks on a built-up nest against blue sky. The weakest pick in the cut: the brief
      // wanted something literally spare or duplicated, and about ten rounds of spare keys, spare
      // tyres, photocopiers and key-cutting either repeated a spent register or came back with
      // signage. A nest reads as a base to return to, which is the idea if not the object.
      text: 'Updating a live product needs a working version you can return to',
      visual: clip({
        src: 'clip-04-stork-nest-home-base.mp4',
        source: {
          provider: 'pexels',
          id: '32730864',
          search: 'bird returning to nest close up',
          author: 'Doctor Unface',
        },
      }),
    },
    {
      // Hands at a brake. A way to check what a change might break.
      text: 'and a way to check what the change might break.',
      visual: clip({
        src: 'clip-05-checking-what-might-break.mp4',
        source: {
          provider: 'pexels',
          id: '5465069',
          search: 'hands checking bicycle brake lever',
          author: 'cottonbro studio',
        },
      }),
      endsParagraph: true,
    },
    {
      // Clay held true on a turning wheel: repeatable craft rather than luck. Replaces a
      // first pick of cyclists on a high wire, which read as precariousness — close to the
      // opposite of the line — and sat directly beside another bicycle beat.
      text: 'If you want to keep improving your app without relying on luck,',
      visual: clip({
        src: 'clip-06-craft-not-luck.mp4',
        source: {
          provider: 'pexels',
          id: '14066613',
          search: 'potters wheel shaping clay hands',
          author: 'Elina Nova',
        },
      }),
    },
    {
      // A seedling coming up, for the learning path being built.
      text: 'that’s what we’re building a learning path for.',
      visual: clip({
        src: 'clip-07-building-learning-path-growth.mp4',
        source: {
          provider: 'pexels',
          id: '6963395',
          search: 'seedling sprouting soil time lapse',
          author: 'Cup of Couple',
        },
      }),
      endsParagraph: true,
    },
    {
      // A watch movement under tools. Saving a working version and making one small, scoped change.
      text: 'By the end, you’ll save a working version, make a small scoped change,',
      visual: clip({
        src: 'clip-08-small-scoped-precise-change.mp4',
        source: {
          provider: 'pexels',
          id: '6424084',
          search: 'hands assembling watch mechanism close up',
          author: 'Anna Tarazevich',
        },
      }),
    },
    {
      // A pencil line about to be rubbed out. Carries the undo half of the beat more
      // clearly than the test half.
      text: 'test the affected journey and undo it if the test fails.',
      visual: clip({
        src: 'clip-09-test-then-undo.mp4',
        source: {
          provider: 'pexels',
          id: '8157127',
          search: 'hand erasing pencil line eraser',
          author: 'Pavel Danilyuk',
        },
      }),
      endsParagraph: true,
    },
    {
      // Sand running down, so the CTA beat moves downward without repeating the rain, waterfall,
      // sparks, snow or descending gondola the other cuts have used.
      text: 'The waitlist link is in the comments.',
      visual: clip({
        src: 'clip-10-sand-falling-downward.mp4',
        source: {
          provider: 'pexels',
          id: '7704037',
          search: 'sand falling hourglass close up',
          author: 'Ivan S',
        },
      }),
    },
    {
      // A bud actually opening, for the line about the learning path opening.
      text: 'Sign up and we’ll let you know when the learning path opens.',
      visual: clip({
        src: 'clip-11-learning-path-opens-bloom.mp4',
        source: {
          provider: 'pexels',
          id: '31147385',
          search: 'flower bud opening bloom macro',
          author: 'K',
        },
      }),
      endsParagraph: true,
    },
    {
      // A bicycle left against a wall. The change you have been putting off.
      text: '[pause][curious] What change have you been putting off?',
      visual: clip({
        src: 'clip-12-postponed-task-waiting.mp4',
        source: {
          provider: 'pexels',
          id: '5911717',
          search: 'bicycle leaning against wall unused',
          author: 'cottonbro studio',
        },
      }),
    },
  ],
})
