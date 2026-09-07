import { defineVideo, gif, riveAtFrame } from '../narration/definition'

/**
 * Video 6 of the vibe coder campaign, "You launched. Three people visited.".
 * Script: productkind/marketing/content/campaigns/2026-09-vibe-coder-validation/
 * video-6-revenue-and-validation/script.md
 *
 * The CTA is the LinkedIn / YouTube Shorts variant ("link in the comments"), which is the script
 * as written. TikTok and Instagram Reels need the URL spoken and shown instead, so they want a
 * second definition rather than a re-edit of this one.
 *
 * Cut at clause level. The four candidate problems are three beats rather than four, because a
 * three-word section leaves too short a slot to put a picture in.
 *
 * A validation script pulls the industry's growth-chart imagery, so nothing here uses it: no
 * rockets, no hockey sticks, no funding confetti. The evidence beats are ordinary objects and
 * ordinary rooms instead.
 *
 * Where a gif is shorter than its slot it is slowed to cover the beat in one pass, rather than
 * held on a frozen last frame: a still picture reads as a stall while the captions and the parrot
 * keep moving. Where a one-shot motion has to resolve before the cut, the rate goes above 1. The
 * rates come from the narrated timeline, so re-run the video-gifs skill's `fit.py` if this script
 * is ever re-narrated.
 */
export default defineVideo({
  id: 'vibe-coder-validation-06',
  voice: 'chloe',
  model: 'eleven_v3',
  overlays: [
    riveAtFrame({ rive: 'parrot-greet-00.riv', frame: 0 }),
    riveAtFrame({ rive: 'parrot-peek-00.riv', frame: 500 }),
  ],
  sections: [
    {
      // giphy "hand tapping phone screen app opens": https://giphy.com/gifs/xFAfEuJ55Ra047MiD2
      text: 'You launched your app.',
      visual: gif({
        src: 'section-00-phone-app-launch.gif',
        color: '#961d6c',
        playbackRate: 0.9,
        place: 'above-captions',
      }),
    },
    {
      // giphy "empty theater no audience seats": https://giphy.com/gifs/dBldtz4Nmj1y0wq0mM
      text: 'Three people visited, and nobody paid.',
      visual: gif({
        src: 'section-01-empty-stadium.gif',
        playbackRate: 0.94,
        place: 'above-captions',
      }),
      endsParagraph: true,
    },
    {
      // giphy "woman thinking many options illustration": https://giphy.com/gifs/1oTwYQ2CCGbHBPxEM7
      text: 'Now you don’t know which problem to solve.',
      visual: gif({
        src: 'section-02-woman-thinking-line-art.gif',
        color: '#ffffff',
        place: 'above-captions',
      }),
    },
    {
      // giphy "dog wagging tail excited greeting": https://giphy.com/gifs/oOkuKZEmTjDE2G3QIm
      text: 'Do you need more visitors,',
      visual: gif({
        src: 'section-03-dog-wagging-tail.gif',
        playbackRate: 0.84,
        place: 'above-captions',
      }),
    },
    {
      // giphy "woman smiling filling form on phone": https://giphy.com/gifs/vSSXg1HEJ63ltVAooW
      text: 'a clearer offer, an easier sign-up',
      visual: gif({ src: 'section-04-woman-phone-smiling.gif', place: 'above-captions' }),
    },
    {
      // klipy "seesaw playground tipping side to side": two children tipping up and down.
      text: 'or a different price?',
      visual: gif({
        src: 'section-05-seesaw-tipping-price.gif',
        playbackRate: 0.86,
        place: 'above-captions',
      }),
      endsParagraph: true,
    },
    {
      // giphy "satisfying building blocks": https://giphy.com/gifs/SwkrSIeGFIy5c8F5F4
      // Sped up so the piece lands on the tower before the cut.
      text: 'Adding another feature cannot answer that question.',
      visual: gif({
        src: 'section-06-stacking-toy.gif',
        playbackRate: 1.22,
        place: 'above-captions',
      }),
    },
    {
      // giphy "small business owner talking to customer counter":
      // https://giphy.com/gifs/xUA7aOQcyRziC5LlDy
      text: 'Customer conversations and behaviour can.',
      visual: gif({ src: 'section-07-storefront-conversation.gif', place: 'above-captions' }),
      endsParagraph: true,
    },
    {
      // klipy "lightbulb idea simple flat icon": a cube character having an idea.
      text: 'You need one hypothesis,',
      visual: gif({
        src: 'section-08-cube-idea-character.gif',
        color: '#fafee4',
        place: 'above-captions',
      }),
    },
    {
      // giphy "ruler measuring tape flat icon": https://giphy.com/gifs/3og0IQttlo3NfcsIiQ
      text: 'one result to measure',
      visual: gif({
        src: 'section-09-tape-measure.gif',
        color: '#cecbe6',
        place: 'above-captions',
      }),
    },
    {
      // giphy "small pebble dropped ripple water": https://giphy.com/gifs/iF6yVlJTBwrYGlV75E
      // Six hand-drawn stages of a bowl being filled, one small change at a time.
      text: 'and the smallest test that could change your next decision.',
      visual: gif({
        src: 'section-10-fishbowl-fill-test.gif',
        playbackRate: 0.91,
        place: 'above-captions',
      }),
      endsParagraph: true,
    },
    {
      // giphy "woman looking through microscope lab": https://giphy.com/gifs/hfZVER8RRZhN9erxHX
      text: 'If you want evidence that your product solves a worthwhile problem,',
      visual: gif({
        src: 'section-11-microscope-evidence.gif',
        color: '#ffffff',
        playbackRate: 0.89,
        place: 'above-captions',
      }),
    },
    {
      // klipy "open book pages turning learning": a woman reading at a desk lamp.
      text: 'that’s what we’re building a learning path for.',
      visual: gif({ src: 'section-12-woman-studying-desk.gif', place: 'above-captions' }),
      endsParagraph: true,
    },
    {
      // giphy "torch beam searching in dark": https://giphy.com/gifs/TgOsFCLMYGDiJ9WHer
      // A torch beam picking one thing out of the dark, for the one action worth tracking.
      text: 'By the end, you’ll track a meaningful customer action,',
      visual: gif({ src: 'section-13-torch-finds-action.gif', place: 'above-captions' }),
    },
    {
      // giphy "woman scientist mixing colorful liquid lab happy":
      // https://giphy.com/gifs/xUOwGeSAgmRgG1VncQ
      text: 'run a focused experiment, test a price',
      visual: gif({
        src: 'section-14-woman-scientist-celebrating.gif',
        playbackRate: 0.78,
        place: 'above-captions',
      }),
    },
    {
      // klipy "cash register cha-ching successful sale": a receipt printing, a hand taking it.
      // Sped up so the receipt has finished printing by the cut.
      text: 'and give real customers a working way to pay.',
      visual: gif({
        src: 'section-15-cash-register-receipt.gif',
        playbackRate: 1.21,
        place: 'above-captions',
      }),
      endsParagraph: true,
    },
    {
      // klipy "hand scrolling down phone screen casually": a woman scrolling her phone.
      text: 'The waitlist link is in the comments.',
      visual: gif({ src: 'section-16-woman-scrolling-phone-cta.gif', place: 'above-captions' }),
    },
    {
      // klipy "kite flying released into sky animation": a kite let out into an open sky.
      text: 'Sign up and we’ll let you know when the learning path opens.',
      visual: gif({ src: 'section-17-kite-flying-sky.gif', place: 'above-captions' }),
      endsParagraph: true,
    },
    {
      // klipy "curious cat": a cat tilting its head, then leaning into the lens.
      text: '[pause][curious] What’s harder for you: finding users or deciding what to charge?',
      visual: gif({
        src: 'section-18-curious-cat-question.gif',
        playbackRate: 0.92,
        place: 'above-captions',
      }),
    },
  ],
})
