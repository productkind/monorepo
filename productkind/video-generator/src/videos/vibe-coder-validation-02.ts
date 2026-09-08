import { defineVideo, gif, riveAtFrame } from "../narration/definition";

/**
 * Video 2 of the vibe coder campaign, "You asked for one button".
 * Script: productkind/marketing/content/campaigns/2026-09-vibe-coder-validation/
 * video-1-control-what-ai-changes/script.md
 *
 * The CTA is the LinkedIn / YouTube Shorts variant ("link in the comments"), which is the script
 * as written. TikTok and Instagram Reels need the URL spoken and shown instead, so they want a
 * second definition rather than a re-edit of this one.
 *
 * Cut at clause level. "Release it" and "restore the working version" are two beats rather than
 * one sentence, because the line is a choice between them and each half wants its own picture.
 *
 * Every visual is text-free, and nothing here repeats a gif from video 0 or from the PM technical
 * fluency campaign. Most of the flat-icon beats come from klipy, which carries that register;
 * giphy's stock for "button", "file" and "payment" is mostly meme captions and branded cards.
 *
 * Where a gif is shorter than its slot it is slowed to cover the beat in one pass, rather than
 * held on a frozen last frame: a still picture reads as a stall while the captions and the parrot
 * keep moving. Where a one-shot motion has to resolve before the cut, the rate goes above 1. The
 * rates come from the narrated timeline, so re-run the video-gifs skill's `fit.py` if this script
 * is ever re-narrated.
 */
export default defineVideo({
  id: "vibe-coder-validation-02",
  voice: "chloe",
  model: "eleven_v3",
  overlays: [
    riveAtFrame({ rive: "parrot-greet-00.riv", frame: 0 }),
    riveAtFrame({ rive: "parrot-peek-00.riv", frame: 500 }),
  ],
  sections: [
    {
      // giphy "typing chat message simple": https://giphy.com/gifs/VJ4aJYrJPUUkWiFxfa
      text: "You asked for one button.",
      visual: gif({
        src: "section-00-chat-request.gif",
        place: "above-captions",
      }),
    },
    {
      // giphy "papers flying out of laptop": https://giphy.com/gifs/XbBJTYS9hDeUFpTxwU
      text: "The AI changed fourteen files.",
      visual: gif({
        src: "section-01-files-flying.gif",
        place: "above-captions",
      }),
      endsParagraph: true,
    },
    {
      // klipy "green checkmark success animation":
      // https://static.klipy.com/ii/71b2873e478b9d8d0482ea3ec777ba7f/2d/6e/aXY7VSFP.gif
      text: "The AI says it’s complete.",
      visual: gif({
        src: "section-02-checkmark-done.gif",
        color: "#040204",
        place: "above-captions",
      }),
    },
    {
      // klipy "thumbs up flat icon animation":
      // https://static.klipy.com/ii/c3a19a0b747a76e98651f2b9a3cca5ff/04/8e/rajehVgG.gif
      text: "The page still loads in preview.",
      visual: gif({
        src: "section-03-thumbs-up-icon.gif",
        color: "#fcfefc",
        place: "above-captions",
      }),
    },
    {
      // giphy "question mark flat icon animation": https://giphy.com/gifs/wH4rY2nPnEnp6
      // Sped up so the question mark has finished drawing itself by the cut.
      text: "Do you publish it?",
      visual: gif({
        src: "section-04-question-mark-draw.gif",
        color: "#e6e6e6",
        playbackRate: 1.17,
        place: "above-captions",
      }),
      endsParagraph: true,
    },
    {
      // giphy "woman worried checking phone": https://giphy.com/gifs/cK4iC5be1skvlvceVL
      text: "One of those files could control sign-in, payments",
      visual: gif({
        src: "section-05-bird-checks-phone.gif",
        playbackRate: 0.96,
        place: "above-captions",
      }),
    },
    {
      // giphy "folder documents icon flat": https://giphy.com/gifs/5wWf7HfQJzA8cze6CWc
      text: "or how customer data is saved.",
      visual: gif({
        src: "section-06-folder-icon.gif",
        playbackRate: 0.75,
        place: "above-captions",
      }),
    },
    {
      // klipy "question mark confused flat icon":
      // https://static.klipy.com/ii/d7aec6f6f171607374b2065c836f92f4/99/a2/aDEd6scr.gif
      text: "You can’t judge the change",
      visual: gif({
        src: "section-07-cat-question-mark.gif",
        playbackRate: 1.07,
        place: "above-captions",
      }),
    },
    {
      // giphy "single eye blinking icon flat": https://giphy.com/gifs/xTiTngNZh2OkpyrcQg
      text: "by looking at the new button.",
      visual: gif({
        src: "section-08-eye-blink.gif",
        color: "#ffffff",
        playbackRate: 0.88,
        place: "above-captions",
      }),
      endsParagraph: true,
    },
    {
      // klipy "notepad writing list icon":
      // https://static.klipy.com/ii/d7aec6f6f171607374b2065c836f92f4/4a/00/FlhBtES5.gif
      text: "You need to know what changed,",
      visual: gif({
        src: "section-09-chick-writing-notes.gif",
        place: "above-captions",
      }),
    },
    {
      // giphy "customer journey map icon": https://giphy.com/gifs/ildLrpK7sOV9ky6NOf
      text: "which customer journeys could be affected",
      visual: gif({
        src: "section-10-treasure-map-path.gif",
        color: "#372506",
        playbackRate: 0.99,
        place: "above-captions",
      }),
    },
    {
      // klipy "rocket ready launch checklist":
      // https://static.klipy.com/ii/e293a233a303a98e471f78d04e13a1b0/93/d2/UZ7CTRX5.gif
      text: "and what to test before release.",
      visual: gif({
        src: "section-11-rocket-launch-ready.gif",
        place: "above-captions",
      }),
      endsParagraph: true,
    },
    {
      // giphy "confident woman smiling laptop": https://giphy.com/gifs/fuHp2yhQ91ceA
      text: "If you want that control over your own app,",
      visual: gif({
        src: "section-12-woman-confident-smile.gif",
        place: "above-captions",
      }),
    },
    {
      // klipy "plant growing icon flat":
      // https://static.klipy.com/ii/71b2873e478b9d8d0482ea3ec777ba7f/01/87/5esD6EwY.gif
      text: "that’s what we’re building a learning path for.",
      visual: gif({
        src: "section-13-sunflower-growing.gif",
        playbackRate: 0.83,
        place: "above-captions",
      }),
      endsParagraph: true,
    },
    {
      // klipy "woman reading laptop focused":
      // https://static.klipy.com/ii/d7aec6f6f171607374b2065c836f92f4/b4/44/mdf113ZH.gif
      text: "By the end, you’ll review a proposed change,",
      visual: gif({
        src: "section-14-cat-reviews-laptop.gif",
        place: "above-captions",
      }),
    },
    {
      // klipy "test tube shake icon flat":
      // https://static.klipy.com/ii/d7aec6f6f171607374b2065c836f92f4/82/91/qPTuK4D8.gif
      text: "test the affected behaviour",
      visual: gif({
        src: "section-15-test-tube-walk.gif",
        playbackRate: 0.92,
        place: "above-captions",
      }),
    },
    {
      // klipy "switch toggle on icon flat":
      // https://static.klipy.com/ii/d7aec6f6f171607374b2065c836f92f4/cc/c1/Vgrm4L9D.gif
      text: "and decide whether to release it",
      visual: gif({
        src: "section-16-switch-flip-on.gif",
        color: "#fcfefc",
        playbackRate: 0.91,
        place: "above-captions",
      }),
    },
    {
      // giphy "rewind restore icon flat": https://giphy.com/gifs/k3YfylIfk3glutpC5h
      text: "or restore the working version.",
      visual: gif({
        src: "section-17-rewind-arrows.gif",
        color: "#000000",
        place: "above-captions",
      }),
      endsParagraph: true,
    },
    {
      // klipy "arrow down icon animation flat":
      // https://static.klipy.com/ii/e293a233a303a98e471f78d04e13a1b0/d9/ff/lZ1FFKC7.gif
      text: "The waitlist link is in the comments.",
      visual: gif({
        src: "section-18-arrow-down-loading.gif",
        color: "#fcfefc",
        playbackRate: 0.88,
        place: "above-captions",
      }),
    },
    {
      // klipy "calendar mark date icon flat":
      // https://static.klipy.com/ii/d7aec6f6f171607374b2065c836f92f4/b4/01/4plopjYL.gif
      text: "Sign up and we’ll let you know when the learning path opens.",
      visual: gif({
        src: "section-19-calendar-months-flip.gif",
        color: "#fcfefc",
        place: "above-captions",
      }),
      endsParagraph: true,
    },
    {
      // giphy "question": https://giphy.com/gifs/tU2mV8ALzJEdXAAwRo
      text: "[pause][curious] What’s the biggest change you’ve approved without understanding it?",
      visual: gif({
        src: "section-20-question.gif",
        place: "above-captions",
      }),
    },
  ],
});
