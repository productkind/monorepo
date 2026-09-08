import { defineVideo, gif, riveAtFrame } from '../narration/definition'

/**
 * Video 3 of the vibe coder campaign, "Scared to touch your own app?".
 * Script: productkind/marketing/content/campaigns/2026-09-vibe-coder-validation/
 * video-3-confidence-to-update/script.md
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
  id: 'vibe-coder-validation-03',
  voice: 'chloe',
  model: 'eleven_v3',
  overlays: [
    riveAtFrame({ rive: 'parrot-greet-00.riv', frame: 0 }),
    riveAtFrame({ rive: 'parrot-peek-00.riv', frame: 500 }),
  ],
  sections: [
    {
      // Slowed to cover the shortest beat in the video in one pass.
      text: 'Scared to touch your app',
      visual: gif({
        src: 'section-00-covering-eyes-scared.gif',
        source: {
          provider: 'giphy',
          id: 'Gns1lc03zB3sw8oXvD',
          search: 'covering eyes peeking cute',
        },
        playbackRate: 0.73,
        place: 'above-captions',
      }),
    },
    {
      text: 'that you built with AI?',
      visual: gif({
        src: 'section-01-blocks-assembling.gif',
        source: { provider: 'giphy', id: 'MvovQGsMBY9H2', search: 'flat icon app building blocks' },
        color: '#ffe7e7',
        playbackRate: 1.43,
        place: 'above-captions',
      }),
      endsParagraph: true,
    },
    {
      text: 'You want to change one onboarding screen.',
      visual: gif({
        src: 'section-02-toggle-flip.gif',
        source: {
          provider: 'giphy',
          id: '3ohhwoWSCtJzznXbuo',
          search: 'toggle switch flip flat icon',
        },
        color: '#2aaeaf',
        place: 'above-captions',
      }),
    },
    {
      text: 'The AI starts editing login, the database',
      visual: gif({
        src: 'section-03-tangled-wires.gif',
        source: {
          provider: 'giphy',
          id: '4KgDKknTMmdDjBmdFH',
          search: 'tangled wires spreading chaos',
        },
        playbackRate: 0.87,
        place: 'above-captions',
      }),
    },
    {
      text: 'and files you have never seen before.',
      visual: gif({
        src: 'section-04-paper-airplanes.gif',
        source: {
          provider: 'giphy',
          id: 'TuM35vpX9Z1lPchpOe',
          search: 'documents flying papers chaos',
        },
        color: '#60c3d2',
        playbackRate: 0.97,
        place: 'above-captions',
      }),
      endsParagraph: true,
    },
    {
      text: 'So you cancel the change.',
      visual: gif({
        src: 'section-05-abort-button.gif',
        source: { provider: 'giphy', id: 'G7iGNzr3VBING', search: 'red x cancel mark flat icon' },
        playbackRate: 0.91,
        place: 'above-captions',
      }),
    },
    {
      // klipy "hourglass sand timer": the improvement waiting rather than being made.
      text: 'The improvement stays on your list.',
      visual: gif({
        src: 'section-06-hourglass-waiting.gif',
        source: { provider: 'klipy', search: 'hourglass sand timer' },
        color: '#fbfcfb',
        playbackRate: 0.88,
        place: 'above-captions',
      }),
      endsParagraph: true,
    },
    {
      text: 'Updating a live product',
      visual: gif({
        src: 'section-07-online-button-press.gif',
        source: {
          provider: 'giphy',
          id: 'v4r4rnbLi1n3QmqUM6',
          search: 'website live going online flat icon',
        },
        playbackRate: 0.82,
        place: 'above-captions',
      }),
    },
    {
      text: 'needs a working version you can return to',
      visual: gif({
        src: 'section-08-floppy-backup.gif',
        source: {
          provider: 'giphy',
          id: 'twdF6dEC6rK5ep7b4Y',
          search: 'floppy disk save icon animation',
        },
        color: '#fbf05c',
        place: 'above-captions',
      }),
    },
    {
      text: 'and a way to check what the change might break.',
      visual: gif({
        src: 'section-09-eye-magnifier-check.gif',
        source: {
          provider: 'giphy',
          id: '56AsTD2tXNmZBGR3hL',
          search: 'magnifying glass checking screen flat icon',
        },
        color: '#000000',
        place: 'above-captions',
      }),
      endsParagraph: true,
    },
    {
      text: 'If you want to keep improving your app',
      visual: gif({
        src: 'section-10-woman-nodding-yes.gif',
        source: { provider: 'giphy', id: 'h9BsCz7jZEr9XPRgIi', search: 'woman determined nod yes' },
        place: 'above-captions',
      }),
    },
    {
      text: 'without relying on luck,',
      visual: gif({
        src: 'section-11-four-leaf-clovers.gif',
        source: {
          provider: 'giphy',
          id: 'd6hqGx3d5Qqu9RJjcM',
          search: 'four leaf clover luck icon flat',
        },
        color: '#ffffff',
        playbackRate: 0.91,
        place: 'above-captions',
      }),
    },
    {
      text: 'that’s what we’re building a learning path for.',
      visual: gif({
        src: 'section-12-walk-trail.gif',
        source: { provider: 'giphy', id: 'os35W3MqeIoRVNMhL9', search: 'walk trail' },
        playbackRate: 0.82,
        place: 'above-captions',
      }),
      endsParagraph: true,
    },
    {
      text: 'By the end, you’ll save a working version,',
      visual: gif({
        src: 'section-13-woman-at-desk-working.gif',
        source: {
          provider: 'giphy',
          id: 'hSB0VA9cOkcCO5ssHd',
          search: 'woman typing laptop confident smile',
        },
        playbackRate: 0.8,
        place: 'above-captions',
      }),
    },
    {
      text: 'make a small scoped change,',
      visual: gif({
        src: 'section-14-dart-precision-target.gif',
        source: {
          provider: 'giphy',
          id: 'PJ7L5D5nRAoddXiwLQ',
          search: 'dart hits target center flat icon',
        },
        color: '#ffffff',
        place: 'above-captions',
      }),
    },
    {
      text: 'test the affected journey',
      visual: gif({
        src: 'section-15-camel-walking-journey.gif',
        source: {
          provider: 'giphy',
          id: '3o7TKFCb8DQ6feGcne',
          search: 'walking through maze path flat icon',
        },
        playbackRate: 0.8,
        place: 'above-captions',
      }),
    },
    {
      text: 'and undo it if the test fails.',
      visual: gif({
        src: 'section-16-command-z-undo.gif',
        source: {
          provider: 'giphy',
          id: 'KDz938kEyh1UfJJGAp',
          search: 'eraser undo mistake flat icon',
        },
        color: '#dedede',
        playbackRate: 0.83,
        place: 'above-captions',
      }),
      endsParagraph: true,
    },
    {
      text: 'The waitlist link is in the comments.',
      visual: gif({
        src: 'section-17-cursor-click-link.gif',
        source: {
          provider: 'giphy',
          id: 'S2EqXNJ2ASorP0ZPWD',
          search: 'tap screen finger flat icon',
        },
        color: '#ffffff',
        place: 'above-captions',
      }),
    },
    {
      text: 'Sign up and we’ll let you know when the learning path opens.',
      visual: gif({
        src: 'section-18-mail-notification-badge.gif',
        source: {
          provider: 'giphy',
          id: 'IQzFAfOGMZbKcdtJqf',
          search: 'mailbox letter flag animation',
        },
        color: '#be9384',
        playbackRate: 0.95,
        place: 'above-captions',
      }),
      endsParagraph: true,
    },
    {
      text: '[pause][curious] What change have you been putting off?',
      visual: gif({
        src: 'section-19-cat-curious-thinking.gif',
        source: { provider: 'giphy', id: 'JSxuLOvwqgNBlMp5Nv', search: 'cat tilting head curious' },
        place: 'above-captions',
      }),
    },
  ],
})
