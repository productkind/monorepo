import { defineVideo, gif, riveAtFrame } from '../narration/definition'

/**
 * Video 3 of the vibe coder campaign, "Would you take a payment today?".
 * Script: productkind/marketing/content/campaigns/2026-09-vibe-coder-validation/
 * video-3-customer-data-and-money/script.md
 *
 * The CTA is the LinkedIn / YouTube Shorts variant ("link in the comments"), which is the script
 * as written. TikTok and Instagram Reels need the URL spoken and shown instead, so they want a
 * second definition rather than a re-edit of this one.
 *
 * Cut at clause level. The second paragraph is four questions and each one gets its own beat,
 * because the whole point of the passage is how many separate things there are to check.
 *
 * A security script pulls the industry's hacker imagery, so nothing here uses it: no balaclavas,
 * no glowing padlocks over binary. The picture for each risk is an everyday object instead. The
 * cookie in section 6 is the pun it looks like, and it is the one beat in the campaign where the
 * literal object is funnier than the abstraction.
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
      // giphy "piggy bank coin cute": https://giphy.com/gifs/d82h5KmOMrFIxI2y04
      text: 'Would you take a payment today?',
      visual: gif({ src: 'section-00-coin-piggy-bank.gif', place: 'above-captions' }),
      endsParagraph: true,
    },
    {
      // giphy "treasure chest opening cartoon": https://giphy.com/gifs/GpXdx2ziOQFcYOkzHX
      text: 'What is that customer trusting you with?',
      visual: gif({ src: 'section-01-treasure-chest-trust.gif', place: 'above-captions' }),
    },
    {
      // giphy "binoculars spying cute character": https://giphy.com/gifs/1dJWn50teA42ogaI1t
      text: 'Can one customer see another person’s data?',
      visual: gif({
        src: 'section-02-binoculars-peeking.gif',
        playbackRate: 0.96,
        place: 'above-captions',
      }),
    },
    {
      // giphy "web browser window flat icon": https://giphy.com/gifs/oIkKc14UI2eTXwfn4x
      text: 'Are private keys visible in the browser?',
      visual: gif({
        src: 'section-03-window-icon-draw.gif',
        color: '#fcfcff',
        playbackRate: 0.81,
        place: 'above-captions',
      }),
    },
    {
      // giphy "balance scale icon animation": https://giphy.com/gifs/xT8qBit7YomT80d0M8
      text: 'Does checkout charge the right amount',
      visual: gif({
        src: 'section-04-balance-scale.gif',
        playbackRate: 0.97,
        place: 'above-captions',
      }),
    },
    {
      // klipy "printer printing receipt icon": a receipt being fed out of a printer.
      text: 'and send the right confirmation?',
      visual: gif({
        src: 'section-05-printer-confirmation.gif',
        color: '#949294',
        playbackRate: 1.05,
        place: 'above-captions',
      }),
      endsParagraph: true,
    },
    {
      // klipy "chocolate chip cookie icon animation": the literal cookie, for cookie consent.
      text: 'Then there are backups, cookie consent,',
      visual: gif({ src: 'section-06-cookie-consent.gif', place: 'above-captions' }),
    },
    {
      // giphy "document scroll icon animation": https://giphy.com/gifs/l41YrvqtJFqHOoV8I
      // Sped up so the document has finished drawing itself by the cut.
      text: 'terms and a privacy policy.',
      visual: gif({
        src: 'section-07-terms-document.gif',
        color: '#ffffff',
        playbackRate: 1.2,
        place: 'above-captions',
      }),
      endsParagraph: true,
    },
    {
      // klipy "trying on shoes fitting icon": hands tying a lace, for a hands-on check.
      text: 'You need practical checks',
      visual: gif({
        src: 'section-08-tying-shoes-practical.gif',
        playbackRate: 1.29,
        place: 'above-captions',
      }),
    },
    {
      // klipy "traffic light icon animation": red, amber, green, for a signal you can read.
      text: 'and clear signs that tell you',
      visual: gif({
        src: 'section-09-traffic-light-signal.gif',
        color: '#fbfcfb',
        playbackRate: 1.18,
        place: 'above-captions',
      }),
    },
    {
      // giphy "hiring expert handshake flat icon": https://giphy.com/gifs/umxRbhpV3joNMeS4Xx
      text: 'when the app needs a security or legal professional.',
      visual: gif({ src: 'section-10-cats-handshake-expert.gif', place: 'above-captions' }),
      endsParagraph: true,
    },
    {
      // giphy "woman typing laptop calm focused": https://giphy.com/gifs/3t0Ec1oCWsuHRV9fpL
      text: 'If you want to handle customer data and money responsibly,',
      visual: gif({ src: 'section-11-hippo-working-laptop.gif', place: 'above-captions' }),
    },
    {
      // klipy "winding road path illustration flat": a road curving away through the hills.
      text: 'that’s what we’re building a learning path for.',
      visual: gif({
        src: 'section-12-winding-road-path.gif',
        playbackRate: 1.25,
        place: 'above-captions',
      }),
      endsParagraph: true,
    },
    {
      // klipy "door opening icon": a cat pushing a door open, for getting in.
      text: 'By the end, you’ll test access,',
      visual: gif({ src: 'section-13-cat-opens-door.gif', place: 'above-captions' }),
    },
    {
      // klipy "juggling balls illustration": three things kept in the air at once.
      text: 'permissions, payments and backups,',
      visual: gif({ src: 'section-14-woman-juggling-oranges.gif', place: 'above-captions' }),
    },
    {
      // klipy "signing contract pen icon animation": a pen writing, for recording what is left.
      text: 'and record the risks that still need specialist help.',
      visual: gif({
        src: 'section-15-pen-writing-record.gif',
        playbackRate: 0.93,
        place: 'above-captions',
      }),
      endsParagraph: true,
    },
    {
      // klipy "ticket stub icon animation": a ticket, for a place held on the list.
      text: 'The waitlist link is in the comments.',
      visual: gif({
        src: 'section-16-ticket-icon.gif',
        color: '#414141',
        playbackRate: 0.86,
        place: 'above-captions',
      }),
    },
    {
      // giphy "door opening light shining through": https://giphy.com/gifs/04sTsB9oKq2DAc2T39
      text: 'Sign up and we’ll let you know when the learning path opens.',
      visual: gif({
        src: 'section-17-door-opens-light.gif',
        color: '#000000',
        place: 'above-captions',
      }),
      endsParagraph: true,
    },
    {
      // giphy "woman tilting head wondering": https://giphy.com/gifs/ATe6Re9HBxmxUSK14k
      text: '[pause][curious] Which safety check are you least sure about?',
      visual: gif({ src: 'section-18-woman-curious-closing.gif', place: 'above-captions' }),
    },
  ],
})
