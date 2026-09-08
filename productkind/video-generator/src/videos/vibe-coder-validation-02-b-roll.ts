import { clip, defineVideo, riveAtFrame } from "../narration/definition";

/**
 * A b-roll cut of "You asked for one button", the vibe coder campaign's video 2.
 * Script: productkind/marketing/content/campaigns/2026-09-vibe-coder-validation/
 * video-2-control-what-ai-changes/script.md
 *
 * Same narration as `vibe-coder-validation-02`, so the audio cache serves this one the take it
 * already generated rather than paying ElevenLabs for the same words twice. The narration has to
 * stay character-identical for that to hold: edit the words here and this becomes a new take at
 * full price.
 *
 * Where that video cuts to a gif per clause, this one runs footage behind the captions and
 * changes picture every three to four seconds. The grouping comes from the narrated timeline
 * rather than a timer, so each cut still lands on a clause boundary: the 21 clauses are merged
 * into 14 runs, each as close to 3.5 seconds as the clause lengths allow.
 *
 * Footage is Tamas's own, from productkind's library, and no clip here appears in another b-roll
 * cut. Every clip is longer than the beat it covers, because `clip` has no playback rate and no
 * loop: a clip that ran out would hold a frozen frame while the captions and the parrot kept
 * moving, which reads as a broken render. Each file is trimmed to its beat plus a little
 * headroom, graded `eq=saturation=1.35:contrast=1.15`, and transcoded to H.264 with BT.709 tags,
 * since the originals are 10-bit HLG HEVC that Chromium cannot decode and that convert flat.
 */
export default defineVideo({
  id: "vibe-coder-validation-02-b-roll",
  voice: "chloe",
  model: "eleven_v3",
  overlays: [
    riveAtFrame({ rive: "parrot-greet-00.riv", frame: 0 }),
    riveAtFrame({ rive: "parrot-peek-00.riv", frame: 500 }),
  ],
  sections: [
    {
      // IMG_8900
      text: "You asked for one button. The AI changed fourteen files.",
      visual: clip({ src: "clip-00-laptop-many-rows.mp4" }),
      endsParagraph: true,
    },
    {
      // IMG_8491
      text: "The AI says it’s complete.",
      visual: clip({ src: "clip-01-table-served.mp4" }),
    },
    {
      // IMG_8589: reeds and still water at dusk, held for the question.
      text: "The page still loads in preview. Do you publish it?",
      visual: clip({ src: "clip-02-dusk-water-still.mp4" }),
      endsParagraph: true,
    },
    {
      // IMG_8706
      text: "One of those files could control sign-in, payments",
      visual: clip({ src: "clip-03-stone-wall.mp4" }),
    },
    {
      // IMG_8662
      text: "or how customer data is saved. You can’t judge the change",
      visual: clip({ src: "clip-04-shelf-storage.mp4" }),
    },
    {
      // IMG_6967
      text: "by looking at the new button. You need to know what changed,",
      visual: clip({ src: "clip-05-tangled-branches.mp4" }),
    },
    {
      // IMG_8510
      text: "which customer journeys could be affected and what to test before release.",
      visual: clip({ src: "clip-06-rocky-shore.mp4" }),
      endsParagraph: true,
    },
    {
      // IMG_7649
      text: "If you want that control over your own app,",
      visual: clip({ src: "clip-07-willow-park.mp4" }),
    },
    {
      // IMG_8761
      text: "that’s what we’re building a learning path for.",
      visual: clip({ src: "clip-08-pines-path.mp4" }),
      endsParagraph: true,
    },
    {
      // IMG_8650
      text: "By the end, you’ll review a proposed change,",
      visual: clip({ src: "clip-09-reeds-lake.mp4" }),
    },
    {
      // IMG_8680
      text: "test the affected behaviour and decide whether to release it",
      visual: clip({ src: "clip-10-ducks-water.mp4" }),
    },
    {
      // IMG_8762
      text: "or restore the working version. The waitlist link is in the comments.",
      visual: clip({ src: "clip-11-white-blossom.mp4" }),
    },
    {
      // IMG_8764
      text: "Sign up and we’ll let you know when the learning path opens.",
      visual: clip({ src: "clip-12-field-river.mp4" }),
      endsParagraph: true,
    },
    {
      // IMG_8849
      text:
        "[pause][curious] What’s the biggest change you’ve approved without " +
        "understanding it?",
      visual: clip({ src: "clip-13-deer-grass.mp4" }),
    },
  ],
});
