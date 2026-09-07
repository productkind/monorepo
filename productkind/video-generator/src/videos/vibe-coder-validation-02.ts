import { defineVideo, gif, riveAtFrame } from '../narration/definition'

/**
 * Video 2 of the vibe coder campaign, "Scared to touch your own app?".
 * Script: productkind/marketing/content/campaigns/2026-09-vibe-coder-validation/
 * video-2-confidence-to-update/script.md
 *
 * The CTA is the LinkedIn / YouTube Shorts variant ("link in the comments"), which is the script
 * as written. TikTok and Instagram Reels need the URL spoken and shown instead, so they want a
 * second definition rather than a re-edit of this one.
 *
 * Cut at clause level. "Login, the database" stays one beat rather than two, because a two-word
 * section leaves too short a slot to put a picture in.
 *
 * Every visual is text-free apart from the labels that are part of the object itself — the abort
 * button in section 5, the backup disk in section 8 and the undo shortcut in section 16 — and
 * nothing here repeats a gif from videos 0 and 1 or from the PM technical fluency campaign.
 *
 * Where a gif is shorter than its slot it is slowed to cover the beat in one pass, rather than
 * held on a frozen last frame: a still picture reads as a stall while the captions and the parrot
 * keep moving. Where a one-shot motion has to resolve before the cut, the rate goes above 1. The
 * rates come from the narrated timeline, so re-run the video-gifs skill's `fit.py` if this script
 * is ever re-narrated.
 */
export default defineVideo({
  id: 'vibe-coder-validation-02',
  voice: 'chloe',
  model: 'eleven_v3',
  overlays: [
    riveAtFrame({ rive: 'parrot-greet-00.riv', frame: 0 }),
    riveAtFrame({ rive: 'parrot-peek-00.riv', frame: 500 }),
  ],
  sections: [
    {
      // giphy "covering eyes peeking cute": https://giphy.com/gifs/Gns1lc03zB3sw8oXvD
      // Slowed to cover the shortest beat in the video in one pass.
      text: 'Scared to touch your app',
      visual: gif({
        src: 'section-00-covering-eyes-scared.gif',
        playbackRate: 0.73,
        place: 'above-captions',
      }),
    },
    {
      // giphy "flat icon app building blocks": https://giphy.com/gifs/MvovQGsMBY9H2
      text: 'that you built with AI?',
      visual: gif({
        src: 'section-01-blocks-assembling.gif',
        color: '#ffe7e7',
        playbackRate: 1.43,
        place: 'above-captions',
      }),
      endsParagraph: true,
    },
    {
      // giphy "toggle switch flip flat icon": https://giphy.com/gifs/3ohhwoWSCtJzznXbuo
      text: 'You want to change one onboarding screen.',
      visual: gif({
        src: 'section-02-toggle-flip.gif',
        color: '#2aaeaf',
        place: 'above-captions',
      }),
    },
    {
      // giphy "tangled wires spreading chaos": https://giphy.com/gifs/4KgDKknTMmdDjBmdFH
      text: 'The AI starts editing login, the database',
      visual: gif({
        src: 'section-03-tangled-wires.gif',
        playbackRate: 0.87,
        place: 'above-captions',
      }),
    },
    {
      // giphy "documents flying papers chaos": https://giphy.com/gifs/TuM35vpX9Z1lPchpOe
      text: 'and files you have never seen before.',
      visual: gif({
        src: 'section-04-paper-airplanes.gif',
        color: '#60c3d2',
        playbackRate: 0.97,
        place: 'above-captions',
      }),
      endsParagraph: true,
    },
    {
      // giphy "red x cancel mark flat icon": https://giphy.com/gifs/G7iGNzr3VBING
      text: 'So you cancel the change.',
      visual: gif({
        src: 'section-05-abort-button.gif',
        playbackRate: 0.91,
        place: 'above-captions',
      }),
    },
    {
      // klipy "hourglass sand timer": the improvement waiting rather than being made.
      text: 'The improvement stays on your list.',
      visual: gif({
        src: 'section-06-hourglass-waiting.gif',
        color: '#fbfcfb',
        playbackRate: 0.88,
        place: 'above-captions',
      }),
      endsParagraph: true,
    },
    {
      // giphy "website live going online flat icon": https://giphy.com/gifs/v4r4rnbLi1n3QmqUM6
      text: 'Updating a live product',
      visual: gif({
        src: 'section-07-online-button-press.gif',
        playbackRate: 0.82,
        place: 'above-captions',
      }),
    },
    {
      // giphy "floppy disk save icon animation": https://giphy.com/gifs/twdF6dEC6rK5ep7b4Y
      text: 'needs a working version you can return to',
      visual: gif({
        src: 'section-08-floppy-backup.gif',
        color: '#fbf05c',
        place: 'above-captions',
      }),
    },
    {
      // giphy "magnifying glass checking screen flat icon":
      // https://giphy.com/gifs/56AsTD2tXNmZBGR3hL
      text: 'and a way to check what the change might break.',
      visual: gif({
        src: 'section-09-eye-magnifier-check.gif',
        color: '#000000',
        place: 'above-captions',
      }),
      endsParagraph: true,
    },
    {
      // giphy "woman determined nod yes": https://giphy.com/gifs/h9BsCz7jZEr9XPRgIi
      text: 'If you want to keep improving your app',
      visual: gif({ src: 'section-10-woman-nodding-yes.gif', place: 'above-captions' }),
    },
    {
      // giphy "four leaf clover luck icon flat": https://giphy.com/gifs/d6hqGx3d5Qqu9RJjcM
      text: 'without relying on luck,',
      visual: gif({
        src: 'section-11-four-leaf-clovers.gif',
        color: '#ffffff',
        playbackRate: 0.91,
        place: 'above-captions',
      }),
    },
    {
      // giphy "ladder climbing steps flat icon": https://giphy.com/gifs/A2Sgm68KhLRngFIwWQ
      text: 'that’s what we’re building a learning path for.',
      visual: gif({
        src: 'section-12-ladder-climb-path.gif',
        color: '#fefcfd',
        place: 'above-captions',
      }),
      endsParagraph: true,
    },
    {
      // giphy "woman typing laptop confident smile": https://giphy.com/gifs/hSB0VA9cOkcCO5ssHd
      text: 'By the end, you’ll save a working version,',
      visual: gif({
        src: 'section-13-woman-at-desk-working.gif',
        playbackRate: 0.8,
        place: 'above-captions',
      }),
    },
    {
      // giphy "dart hits target center flat icon": https://giphy.com/gifs/PJ7L5D5nRAoddXiwLQ
      text: 'make a small scoped change,',
      visual: gif({
        src: 'section-14-dart-precision-target.gif',
        color: '#ffffff',
        place: 'above-captions',
      }),
    },
    {
      // giphy "walking through maze path flat icon": https://giphy.com/gifs/3o7TKFCb8DQ6feGcne
      text: 'test the affected journey',
      visual: gif({
        src: 'section-15-camel-walking-journey.gif',
        playbackRate: 0.8,
        place: 'above-captions',
      }),
    },
    {
      // giphy "eraser undo mistake flat icon": https://giphy.com/gifs/KDz938kEyh1UfJJGAp
      text: 'and undo it if the test fails.',
      visual: gif({
        src: 'section-16-command-z-undo.gif',
        color: '#dedede',
        playbackRate: 0.83,
        place: 'above-captions',
      }),
      endsParagraph: true,
    },
    {
      // giphy "tap screen finger flat icon": https://giphy.com/gifs/S2EqXNJ2ASorP0ZPWD
      text: 'The waitlist link is in the comments.',
      visual: gif({
        src: 'section-17-cursor-click-link.gif',
        color: '#ffffff',
        place: 'above-captions',
      }),
    },
    {
      // giphy "mailbox letter flag animation": https://giphy.com/gifs/IQzFAfOGMZbKcdtJqf
      text: 'Sign up and we’ll let you know when the learning path opens.',
      visual: gif({
        src: 'section-18-mail-notification-badge.gif',
        color: '#be9384',
        playbackRate: 0.95,
        place: 'above-captions',
      }),
      endsParagraph: true,
    },
    {
      // giphy "cat tilting head curious": https://giphy.com/gifs/JSxuLOvwqgNBlMp5Nv
      text: '[pause][curious] What change have you been putting off?',
      visual: gif({ src: 'section-19-cat-curious-thinking.gif', place: 'above-captions' }),
    },
  ],
})
