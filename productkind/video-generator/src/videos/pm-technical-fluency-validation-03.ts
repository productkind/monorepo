import { defineVideo, gif, riveAtFrame } from '../narration/definition'

/**
 * Video 3 of the PM technical fluency campaign, "You said yes to a simple feature".
 * Script: productkind/marketing/content/campaigns/2026-09-pm-technical-fluency-validation/
 * video-3-said-yes-to-a-simple-feature/script.md
 *
 * The CTA is the LinkedIn / YouTube Shorts variant ("link in the comments"), which is the script
 * as written. TikTok and Instagram Reels need the URL spoken and shown instead.
 *
 * Cut at clause level to hold the script's three-second cadence, which is also why "Nobody showed
 * you how to check" and "what the connecting system can do" are two beats rather than one.
 *
 * Sections 14 and 16 stand in for the screen recording the production notes call for: real
 * documentation for a service Little Parrot uses, with one field found and one missing.
 *
 * Objects and characters carry most of this one. Giphy's stock for the people beats here is almost
 * entirely captioned memes or sponsor content, so the register that survives the text-free rule is
 * a keyhole, a knot, a stamp, a clock. Where a person does appear they are a woman, which is what
 * the campaign brief asks of the channel.
 *
 * The slots behind these rates are estimates from `0.98 + 0.209 x words`, fitted on the 39
 * narrated sections of videos 0 and 1. Once this script is narrated, re-check every fit with
 * `verify.py --video pm-technical-fluency-validation-03` from the video-gifs skill.
 */
export default defineVideo({
  id: 'pm-technical-fluency-validation-03',
  voice: 'chloe',
  model: 'eleven_v3',
  overlays: [
    riveAtFrame({ rive: 'parrot-greet-00.riv', frame: 0 }),
    riveAtFrame({ rive: 'parrot-peek-00.riv', frame: 500 }),
  ],
  sections: [
    {
      text: "A stakeholder asked for something simple.",
      visual: gif({
        src: 'section-00-asking.gif',
        source: { provider: 'giphy', id: 'TEX6BFu46QQh3A23hN', search: 'finger snap easy' },
        place: 'above-captions',
      }),
    },
    {
      // Sped up so the pieces finish coming together inside the beat.
      text: "Just sync it with the CRM.",
      visual: gif({
        src: 'section-01-assemble.gif',
        source: {
          provider: 'giphy',
          id: '3ohhwgzypC7LCONoeA',
          search: 'puzzle pieces fitting together',
        },
        color: '#fde9f1',
        playbackRate: 1.42,
        place: 'above-captions',
      }),
      endsParagraph: true,
    },
    {
      text: "You said yes.",
      visual: gif({
        src: 'section-02-nod.gif',
        source: { provider: 'giphy', id: 'tj50OVdyNiewAuffJt', search: 'woman nodding yes' },
        playbackRate: 0.87,
        place: 'above-captions',
      }),
    },
    {
      text: "Two weeks in,",
      visual: gif({
        src: 'section-03-clock.gif',
        source: {
          provider: 'giphy',
          id: 'JmmpEbrUOMxXyJMNVX',
          search: 'clock hands spinning fast',
        },
        place: 'above-captions',
      }),
    },
    {
      text: "engineering tells you the integration doesn’t have that field,",
      visual: gif({
        src: 'section-04-cross.gif',
        source: { provider: 'giphy', id: '8cSU3YBfJxrXMz1Biu', search: 'red x mark animation' },
        color: '#ffd300',
        place: 'above-captions',
      }),
    },
    {
      // A keyhole: the system is there, somebody else holds the key to it.
      text: "and it’s the vendor’s system.",
      visual: gif({
        src: 'section-05-keyhole.gif',
        source: { provider: 'giphy', id: 'iFyswxrc6wuMczLESA', search: 'locked door key' },
        playbackRate: 0.99,
        place: 'above-captions',
      }),
      endsParagraph: true,
    },
    {
      text: "You already promised the date.",
      visual: gif({
        src: 'section-06-date.gif',
        source: { provider: 'giphy', id: 'KfZOXJbJXTimRyf6N3', search: 'date' },
        playbackRate: 0.66,
        place: 'above-captions',
      }),
    },
    {
      // Drawn, then rubbed out, which is what renegotiating an agreed thing looks like.
      text: "Now you’re renegotiating something you’d already said yes to.",
      visual: gif({
        src: 'section-07-erase.gif',
        source: { provider: 'giphy', id: '2xEBaucWB9naO2JqLD', search: 'erasing pencil rubber' },
        playbackRate: 0.97,
        place: 'above-captions',
      }),
      endsParagraph: true,
    },
    {
      text: "You couldn’t have known.",
      visual: gif({
        src: 'section-08-dont-know.gif',
        source: { provider: 'giphy', id: '2lKKCodWzvFjmqrmxz', search: 'don\'t know' },
        playbackRate: 0.78,
        place: 'above-captions',
      }),
    },
    {
      text: "Nobody showed you how to check",
      visual: gif({
        src: 'section-09-searching.gif',
        source: {
          provider: 'giphy',
          id: 'VoEUCtpER6t0RW8Odn',
          search: 'woman reading documents laptop',
        },
        place: 'above-captions',
      }),
    },
    {
      // Two circles overlapping: the part of the other system yours can actually reach.
      text: "what the connecting system can do.",
      visual: gif({
        src: 'section-10-overlap.gif',
        source: { provider: 'giphy', id: 'l4FGw4d101Sa0pGTe', search: 'connected systems diagram' },
        place: 'above-captions',
      }),
      endsParagraph: true,
    },
    {
      text: "If you want to be more confident",
      visual: gif({
        src: 'section-11-confident.gif',
        source: { provider: 'giphy', id: 'J341jtyRPKQCfXFImt', search: 'power pose woman' },
        place: 'above-captions',
      }),
    },
    {
      text: "about the complexity of a new feature before you commit,",
      visual: gif({
        src: 'section-12-knot.gif',
        source: { provider: 'giphy', id: 'cfelXlrEdY5q2iPxZE', search: 'untangling knot' },
        playbackRate: 0.99,
        place: 'above-captions',
      }),
    },
    {
      text: "we’re building a learning path for it.",
      visual: gif({
        src: 'section-13-ladder.gif',
        source: { provider: 'giphy', id: '29HWHVyD4wB3MRmtIg', search: 'ladder climbing' },
        place: 'above-captions',
      }),
      endsParagraph: true,
    },
    {
      // Sped up so the folder is open by the cut, since opening it is the whole line.
      text: "By the end you’ll be able to open the documentation",
      visual: gif({
        src: 'section-14-open-book.gif',
        source: { provider: 'giphy', id: 'ikMppMKl5htEnKnwQv', search: 'open book' },
        color: '#aeccee',
        place: 'above-captions',
      }),
    },
    {
      // The cards say "already pay for", which is the part of the line that does the work.
      text: "for the integrations you already pay for,",
      visual: gif({
        src: 'section-15-cards.gif',
        source: { provider: 'giphy', id: 'ycANs3udEsdsdgDIDZ', search: 'credit card payment icon' },
        place: 'above-captions',
      }),
    },
    {
      text: "see which fields they actually expose,",
      visual: gif({
        src: 'section-16-magnifier.gif',
        source: {
          provider: 'giphy',
          id: '42wQXwITfQbDGKqUP7',
          search: 'magnifying glass over list',
        },
        place: 'above-captions',
      }),
    },
    {
      text: "and know whether the request is possible before you answer.",
      visual: gif({
        src: 'section-17-approve.gif',
        source: { provider: 'giphy', id: 'nMasa5KUxralWiLD5s', search: 'approved check mark' },
        playbackRate: 0.79,
        place: 'above-captions',
      }),
      endsParagraph: true,
    },
    {
      text: "The waitlist link is in the comments.",
      visual: gif({
        src: 'section-18-phone.gif',
        source: { provider: 'giphy', id: 'CQWCsApevAijqqzygN', search: 'message notification pop' },
        color: '#ffffff',
        place: 'above-captions',
      }),
    },
    {
      // A door opening on the line about the learning path opening. Sped up so it is open by the
      // cut rather than still swinging.
      text: "Sign up and we’ll let you know when the learning path opens.",
      visual: gif({
        src: 'section-19-door.gif',
        source: { provider: 'giphy', id: '1JjkufuS3IcS74XTDn', search: 'opening curtains reveal' },
        playbackRate: 0.79,
        place: 'above-captions',
      }),
      endsParagraph: true,
    },
    {
      text: "[pause][curious] What ‘simple’ request turned out hardest?",
      visual: gif({
        src: 'section-20-thinking.gif',
        source: { provider: 'giphy', id: 'y9U1fyL4Cs5Ntzefm3', search: 'pondering chin hand' },
        playbackRate: 0.66,
        place: 'above-captions',
      }),
    },
  ],
})
