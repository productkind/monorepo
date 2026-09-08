import { defineVideo, gif, riveAtFrame } from "../narration/definition";

/**
 * Video 2 of the vibe coder campaign, "You asked for one button".
 * Script: productkind/marketing/content/campaigns/2026-09-vibe-coder-validation/
 * video-2-control-what-ai-changes/script.md
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
      text: "You asked for one button.",
      visual: gif({
        src: "section-00-chat-request.gif",
        source: {
          provider: "giphy",
          id: "VJ4aJYrJPUUkWiFxfa",
          search: "typing chat message simple",
        },
        place: "above-captions",
      }),
    },
    {
      text: "The AI changed fourteen files.",
      visual: gif({
        src: "section-01-files-flying.gif",
        source: {
          provider: "giphy",
          id: "XbBJTYS9hDeUFpTxwU",
          search: "papers flying out of laptop",
        },
        place: "above-captions",
      }),
      endsParagraph: true,
    },
    {
      text: "The AI says it’s complete.",
      visual: gif({
        src: "section-02-checkmark-done.gif",
        source: {
          provider: "klipy",
          id: "7155441643366977",
          search: "green checkmark success animation",
        },
        color: "#040204",
        place: "above-captions",
      }),
    },
    {
      text: "The page still loads in preview.",
      visual: gif({
        src: "section-03-thumbs-up-icon.gif",
        source: {
          provider: "klipy",
          id: "9320844276022903",
          search: "thumbs up flat icon animation",
        },
        color: "#fcfefc",
        place: "above-captions",
      }),
    },
    {
      // Sped up so the question mark has finished drawing itself by the cut.
      text: "Do you publish it?",
      visual: gif({
        src: "section-04-question-mark-draw.gif",
        source: {
          provider: "giphy",
          id: "wH4rY2nPnEnp6",
          search: "question mark flat icon animation",
        },
        color: "#e6e6e6",
        playbackRate: 1.17,
        place: "above-captions",
      }),
      endsParagraph: true,
    },
    {
      text: "One of those files could control sign-in, payments",
      visual: gif({
        src: "section-05-bird-checks-phone.gif",
        source: {
          provider: "giphy",
          id: "cK4iC5be1skvlvceVL",
          search: "woman worried checking phone",
        },
        playbackRate: 0.96,
        place: "above-captions",
      }),
    },
    {
      text: "or how customer data is saved.",
      visual: gif({
        src: "section-06-folder-icon.gif",
        source: {
          provider: "giphy",
          id: "5wWf7HfQJzA8cze6CWc",
          search: "folder documents icon flat",
        },
        playbackRate: 0.75,
        place: "above-captions",
      }),
    },
    {
      text: "You can’t judge the change",
      visual: gif({
        src: "section-07-cat-question-mark.gif",
        source: {
          provider: "klipy",
          id: "9211345207135828",
          search: "question mark confused flat icon",
        },
        playbackRate: 1.07,
        place: "above-captions",
      }),
    },
    {
      text: "by looking at the new button.",
      visual: gif({
        src: "section-08-eye-blink.gif",
        source: {
          provider: "giphy",
          id: "xTiTngNZh2OkpyrcQg",
          search: "single eye blinking icon flat",
        },
        color: "#ffffff",
        playbackRate: 0.88,
        place: "above-captions",
      }),
      endsParagraph: true,
    },
    {
      text: "You need to know what changed,",
      visual: gif({
        src: "section-09-chick-writing-notes.gif",
        source: { provider: "klipy", id: "7748155916967645", search: "notepad writing list icon" },
        place: "above-captions",
      }),
    },
    {
      text: "which customer journeys could be affected",
      visual: gif({
        src: "section-10-treasure-map-path.gif",
        source: {
          provider: "giphy",
          id: "ildLrpK7sOV9ky6NOf",
          search: "customer journey map icon",
        },
        color: "#372506",
        playbackRate: 0.99,
        place: "above-captions",
      }),
    },
    {
      text: "and what to test before release.",
      visual: gif({
        src: "section-11-rocket-launch-ready.gif",
        source: {
          provider: "klipy",
          id: "4342726310834307",
          search: "rocket ready launch checklist",
        },
        place: "above-captions",
      }),
      endsParagraph: true,
    },
    {
      text: "If you want that control over your own app,",
      visual: gif({
        src: "section-12-woman-confident-smile.gif",
        source: {
          provider: "giphy",
          id: "fuHp2yhQ91ceA",
          search: "confident woman smiling laptop",
        },
        place: "above-captions",
      }),
    },
    {
      text: "that’s what we’re building a learning path for.",
      visual: gif({
        src: "section-13-sunflower-growing.gif",
        source: { provider: "klipy", id: "7313511118230183", search: "plant growing icon flat" },
        playbackRate: 0.83,
        place: "above-captions",
      }),
      endsParagraph: true,
    },
    {
      text: "By the end, you’ll review a proposed change,",
      visual: gif({
        src: "section-14-cat-reviews-laptop.gif",
        source: {
          provider: "klipy",
          id: "6136282418998007",
          search: "woman reading laptop focused",
        },
        place: "above-captions",
      }),
    },
    {
      text: "test the affected behaviour",
      visual: gif({
        src: "section-15-test-tube-walk.gif",
        source: { provider: "klipy", id: "9428226855534263", search: "test tube shake icon flat" },
        playbackRate: 0.92,
        place: "above-captions",
      }),
    },
    {
      text: "and decide whether to release it",
      visual: gif({
        src: "section-16-switch-flip-on.gif",
        source: { provider: "klipy", id: "8548960211620474", search: "switch toggle on icon flat" },
        color: "#fcfefc",
        playbackRate: 0.91,
        place: "above-captions",
      }),
    },
    {
      text: "or restore the working version.",
      visual: gif({
        src: "section-17-rewind-arrows.gif",
        source: { provider: "giphy", id: "k3YfylIfk3glutpC5h", search: "rewind restore icon flat" },
        color: "#000000",
        place: "above-captions",
      }),
      endsParagraph: true,
    },
    {
      text: "The waitlist link is in the comments.",
      visual: gif({
        src: "section-18-arrow-down-loading.gif",
        source: {
          provider: "klipy",
          id: "6462317827069235",
          search: "arrow down icon animation flat",
        },
        color: "#fcfefc",
        playbackRate: 0.88,
        place: "above-captions",
      }),
    },
    {
      text: "Sign up and we’ll let you know when the learning path opens.",
      visual: gif({
        src: "section-19-calendar-months-flip.gif",
        source: {
          provider: "klipy",
          id: "4765325738254330",
          search: "calendar mark date icon flat",
        },
        color: "#fcfefc",
        place: "above-captions",
      }),
      endsParagraph: true,
    },
    {
      text: "[pause][curious] What’s the biggest change you’ve approved without understanding it?",
      visual: gif({
        src: "section-20-question.gif",
        source: { provider: "giphy", id: "tU2mV8ALzJEdXAAwRo", search: "question" },
        place: "above-captions",
      }),
    },
  ],
});
