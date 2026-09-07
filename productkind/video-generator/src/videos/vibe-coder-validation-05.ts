import { defineVideo, gif, riveAtFrame } from '../narration/definition'

/**
 * Video 5 of the vibe coder campaign, "Could one customer increase your bill?".
 * Script: productkind/marketing/content/campaigns/2026-09-vibe-coder-validation/
 * video-5-predictable-running-costs/script.md
 *
 * The CTA is the LinkedIn / YouTube Shorts variant ("link in the comments"), which is the script
 * as written. TikTok and Instagram Reels need the URL spoken and shown instead, so they want a
 * second definition rather than a re-edit of this one.
 *
 * Cut at clause level. The list of services is two beats rather than four, because a single
 * service name leaves too short a slot to put a picture in, and "some costs stay fixed" and
 * "others rise with usage" are separate beats because the line is a contrast between them —
 * a drop falling at a steady rate against a stack that keeps growing.
 *
 * A money script pulls the industry's trading-floor imagery, so nothing here uses it: no tickers,
 * no candlestick charts, no fanned banknotes. Each cost is an everyday object instead.
 *
 * Where a gif is shorter than its slot it is slowed to cover the beat in one pass, rather than
 * held on a frozen last frame: a still picture reads as a stall while the captions and the parrot
 * keep moving. Where a one-shot motion has to resolve before the cut, the rate goes above 1. The
 * rates come from the narrated timeline, so re-run the video-gifs skill's `fit.py` if this script
 * is ever re-narrated.
 */
export default defineVideo({
  id: 'vibe-coder-validation-05',
  voice: 'chloe',
  model: 'eleven_v3',
  overlays: [
    riveAtFrame({ rive: 'parrot-greet-00.riv', frame: 0 }),
    riveAtFrame({ rive: 'parrot-peek-00.riv', frame: 500 }),
  ],
  sections: [
    {
      // klipy "woman worried phone bill": a woman on the phone, working out what it will cost.
      text: 'Could one customer increase your bill?',
      visual: gif({ src: 'section-00-worried-phone-call.gif', place: 'above-captions' }),
      endsParagraph: true,
    },
    {
      // klipy "app development tools flat icon": a skyline growing out of a phone.
      text: 'Your AI app builder, database,',
      visual: gif({
        src: 'section-01-app-city-buildup.gif',
        color: '#fcfefc',
        place: 'above-captions',
      }),
    },
    {
      // giphy "paper airplane sending message animation": https://giphy.com/gifs/dvViwfnYOy76fnrMqm
      text: 'email service and AI model',
      visual: gif({
        src: 'section-02-paper-airplane-email.gif',
        color: '#ee9ce1',
        playbackRate: 0.83,
        place: 'above-captions',
      }),
    },
    {
      // giphy "assorted shapes flat lay variety": https://giphy.com/gifs/kKJOl2NsnibMMNjUkH
      text: 'all charge differently.',
      visual: gif({ src: 'section-03-shape-morph-different.gif', place: 'above-captions' }),
    },
    {
      // giphy "anchor dropping into water": https://giphy.com/gifs/VQ5vmfZWGnXqCH5vul
      // One drop at a steady rate, against section 5's stack that keeps growing.
      text: 'Some costs stay fixed.',
      visual: gif({
        src: 'section-04-drop-steady-ripple.gif',
        color: '#3b43cb',
        place: 'above-captions',
      }),
    },
    {
      // giphy "stack growing taller blocks": https://giphy.com/gifs/MTsnRpROcrxWS6wwta
      // The build completes at about 1.6s, inside the beat, so it needs no rate.
      text: 'Others rise with usage.',
      visual: gif({
        src: 'section-05-bricks-stacking-rising.gif',
        color: '#f2f2f2',
        place: 'above-captions',
      }),
      endsParagraph: true,
    },
    {
      // giphy "quick doodle sketch hand drawing simple": https://giphy.com/gifs/GAmXgbPLJAjQOsyw8u
      text: 'That makes a cheap prototype',
      visual: gif({
        src: 'section-06-sketching-draft-character.gif',
        color: '#ffe7cd',
        place: 'above-captions',
      }),
    },
    {
      // giphy "confused math calculation cute character": https://giphy.com/gifs/ojiP8Hymf5Vkcdw1A9
      text: 'hard to price as a live product.',
      visual: gif({
        src: 'section-07-confused-math-character.gif',
        color: '#000000',
        playbackRate: 0.91,
        place: 'above-captions',
      }),
      endsParagraph: true,
    },
    {
      // giphy "calculator screen number result animation":
      // https://giphy.com/gifs/QytRJAvwnaU7rvvjxC
      text: 'You need to know what one active customer costs,',
      visual: gif({
        src: 'section-08-calculator-hand-tapping.gif',
        playbackRate: 0.95,
        place: 'above-captions',
      }),
    },
    {
      // klipy "dots forming crowd grid animation": one cell multiplying into a cluster.
      text: 'what happens when ten become a hundred',
      visual: gif({ src: 'section-09-hexagons-multiplying.gif', place: 'above-captions' }),
    },
    {
      // giphy "checkered flag race finish line illustration": https://giphy.com/gifs/l4KhZ1DhTTUbsak8M
      text: 'and which service will charge you first.',
      visual: gif({ src: 'section-10-checkered-flag-first.gif', place: 'above-captions' }),
      endsParagraph: true,
    },
    {
      // giphy "woman working laptop cafe focused": https://giphy.com/gifs/n204doxIAfJWbgCFkv
      text: 'If you want to understand the cost of running your app,',
      visual: gif({
        src: 'section-11-cute-character-laptop-desk.gif',
        playbackRate: 0.78,
        place: 'above-captions',
      }),
    },
    {
      // giphy "caterpillar butterfly transformation": https://giphy.com/gifs/fDC4ZpkHggPyji32m8
      text: 'that’s what we’re building a learning path for.',
      visual: gif({ src: 'section-12-caterpillar-becomes-butterfly.gif', place: 'above-captions' }),
      endsParagraph: true,
    },
    {
      // giphy "tally marks counting paper animation": https://giphy.com/gifs/f7kDY17LNy7NokAjy0
      // Sped up so the tally is finished being counted by the cut.
      text: 'By the end, you’ll list your fixed and usage costs,',
      visual: gif({
        src: 'section-13-tally-marks-counting.gif',
        playbackRate: 1.32,
        place: 'above-captions',
      }),
    },
    {
      // giphy "pie chart filling animation flat": https://giphy.com/gifs/fng8OzU2DvO2NCGeLY
      text: 'estimate a cost per active customer,',
      visual: gif({
        src: 'section-14-pie-chart-breakdown.gif',
        color: '#ffffff',
        playbackRate: 0.78,
        place: 'above-captions',
      }),
    },
    {
      // giphy "warning alert triangle icon flat animation": https://giphy.com/gifs/P54O7IqCTQuTABVUcC
      // The shortest beat in the video, so the alert is slowed to cover it in one pass.
      text: 'set spending alerts',
      visual: gif({
        src: 'section-15-warning-triangle-alert.gif',
        color: '#000000',
        playbackRate: 0.73,
        place: 'above-captions',
      }),
    },
    {
      // giphy "woman celebrating success laptop confident": https://giphy.com/gifs/c6YbhJZ9PZ54dbjR1C
      text: 'and test whether your price can cover them.',
      visual: gif({
        src: 'section-16-woman-confident-celebrating.gif',
        playbackRate: 0.83,
        place: 'above-captions',
      }),
      endsParagraph: true,
    },
    {
      // giphy "hand pointing downwards illustration": https://giphy.com/gifs/ZQpFjNPJ3cEitXpphT
      text: 'The waitlist link is in the comments.',
      visual: gif({ src: 'section-17-woman-points-down.gif', place: 'above-captions' }),
    },
    {
      // giphy "sunrise time lapse horizon": https://giphy.com/gifs/l0IyhFAkW40x1Abx6
      // Dawn breaking over the rooftops, slowed to cover the beat in one pass.
      text: 'Sign up and we’ll let you know when the learning path opens.',
      visual: gif({
        src: 'section-18-sunrise-day-breaks.gif',
        playbackRate: 0.84,
        place: 'above-captions',
      }),
      endsParagraph: true,
    },
    {
      // klipy "curious cute character tilting head animation": an owl blinking on a branch.
      text: '[pause][curious] Which app cost is hardest for you to predict?',
      visual: gif({
        src: 'section-19-curious-owl-blinking.gif',
        color: '#fcfefc',
        playbackRate: 0.9,
        place: 'above-captions',
      }),
    },
  ],
})
