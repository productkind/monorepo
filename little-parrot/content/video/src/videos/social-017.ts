import { clip, defineVideo, riveAtFrame } from "../narration/definition";

export default defineVideo({
  id: "social-017",
  voice: "chloe",
  model: "eleven_v3",
  // Frame-pinned to match the published video exactly. The third overlay the old component had,
  // parrot-follow at frame 3000, sat past the end of a 1010-frame video and never rendered, so it
  // is not carried over.
  overlays: [
    riveAtFrame({ rive: "parrot-greet-00.riv", frame: 0 }),
    riveAtFrame({ rive: "parrot-peek-00.riv", frame: 500 }),
  ],
  sections: [
    {
      text: "If you're the one remembering what needs buying, booking, doing, and when the baby last ate, build this.",
      visual: clip({ src: "dump-full-flow.mp4", trimBefore: 100 }),
      endsParagraph: true,
    },
    {
      text: "Just say everything that's on your mind. It doesn't need to be organised.",
      visual: clip({ src: "dump-screen-full-flow.mp4", trimBefore: 450 }),
      endsParagraph: true,
    },
    {
      text: "Your phone sorts it into neat checklists…",
      visual: clip({ src: "dump-full-flow.mp4", trimBefore: 650 }),
      endsParagraph: true,
    },
    {
      text: "And the same idea works for all those tiny things you need to keep track of with a baby.",
      visual: clip({ src: "babylog-full-flow.mp4", trimBefore: 150 }),
      endsParagraph: true,
    },
    {
      text: "Feeds, naps, nappies,",
      visual: clip({ src: "babylog-screen-full-flow.mp4", trimBefore: 400 }),
    },
    {
      text: "just say it, and your phone logs it.",
      visual: clip({ src: "babylog-full-flow.mp4", trimBefore: 700 }),
      endsParagraph: true,
    },
    {
      text: "In our Hand Off the Mental Load course,",
      visual: clip({ src: "course.mp4", trimBefore: 100 }),
    },
    {
      text: "you build both shortcuts yourself in about 20 minutes.",
      visual: clip({ src: "shortcut.mp4", trimBefore: 100 }),
      endsParagraph: true,
    },
    {
      text: "The whole course is free until the 30th of August, link in comments to build your shortcuts.",
      visual: clip({ src: "free.mp4", trimBefore: 0 }),
    },
  ],
});
