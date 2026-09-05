import { defineVideo, gif, riveAtFrame } from '../narration/definition'

/**
 * Video 2 of the PM technical fluency campaign, "You said yes to a simple feature".
 * Script: productkind/marketing/content/campaigns/2026-09-pm-technical-fluency-validation/
 * video-2-said-yes-to-a-simple-feature/script.md
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
 * `verify.py --video pm-technical-fluency-validation-02` from the video-gifs skill.
 */
export default defineVideo({
  id: 'pm-technical-fluency-validation-02',
  voice: 'chloe',
  model: 'eleven_v3',
  overlays: [
    riveAtFrame({ rive: 'parrot-greet-00.riv', frame: 0 }),
    riveAtFrame({ rive: 'parrot-peek-00.riv', frame: 500 }),
  ],
  sections: [
    {
      // giphy "finger snap easy": https://giphy.com/gifs/TEX6BFu46QQh3A23hN
      text: "A stakeholder asked for something simple.",
      visual: gif({ src: 'section-00-asking.gif', place: 'above-captions' }),
    },
    {
      // giphy "puzzle pieces fitting together": https://giphy.com/gifs/3ohhwgzypC7LCONoeA
      // Sped up so the pieces finish coming together inside the beat.
      text: "Just sync it with the CRM.",
      visual: gif({
        src: 'section-01-assemble.gif',
        color: '#fde9f1',
        playbackRate: 1.42,
        place: 'above-captions',
      }),
      endsParagraph: true,
    },
    {
      // giphy "woman nodding yes": https://giphy.com/gifs/tj50OVdyNiewAuffJt
      text: "You said yes.",
      visual: gif({ src: 'section-02-nod.gif', playbackRate: 0.87, place: 'above-captions' }),
    },
    {
      // giphy "clock hands spinning fast": https://giphy.com/gifs/JmmpEbrUOMxXyJMNVX
      text: "Two weeks in,",
      visual: gif({ src: 'section-03-clock.gif', place: 'above-captions' }),
    },
    {
      // giphy "red x mark animation": https://giphy.com/gifs/8cSU3YBfJxrXMz1Biu
      text: "engineering tells you the integration doesn’t have that field,",
      visual: gif({ src: 'section-04-cross.gif', color: '#ffd300', place: 'above-captions' }),
    },
    {
      // giphy "locked door key": https://giphy.com/gifs/iFyswxrc6wuMczLESA
      // A keyhole: the system is there, somebody else holds the key to it.
      text: "and it’s the vendor’s system.",
      visual: gif({ src: 'section-05-keyhole.gif', playbackRate: 0.99, place: 'above-captions' }),
      endsParagraph: true,
    },
    {
      // giphy "date stamp": https://giphy.com/gifs/rbHQSU9TTXe4JEBYUY
      text: "You already promised the date.",
      visual: gif({
        src: 'section-06-stamp.gif',
        color: '#a9c1ff',
        playbackRate: 0.99,
        place: 'above-captions',
      }),
    },
    {
      // giphy "erasing pencil rubber": https://giphy.com/gifs/2xEBaucWB9naO2JqLD
      // Drawn, then rubbed out, which is what renegotiating an agreed thing looks like.
      text: "Now you’re renegotiating something you’d already said yes to.",
      visual: gif({ src: 'section-07-erase.gif', playbackRate: 0.97, place: 'above-captions' }),
      endsParagraph: true,
    },
    {
      // giphy "dark room torch": https://giphy.com/gifs/oFQxlyTLWPCQYV9gbT
      text: "You couldn’t have known.",
      visual: gif({
        src: 'section-08-dark.gif',
        color: '#000000',
        playbackRate: 0.96,
        place: 'above-captions',
      }),
    },
    {
      // giphy "woman reading documents laptop": https://giphy.com/gifs/VoEUCtpER6t0RW8Odn
      text: "Nobody showed you how to check",
      visual: gif({ src: 'section-09-searching.gif', place: 'above-captions' }),
    },
    {
      // giphy "connected systems diagram": https://giphy.com/gifs/l4FGw4d101Sa0pGTe
      // Two circles overlapping: the part of the other system yours can actually reach.
      text: "what the connecting system can do.",
      visual: gif({ src: 'section-10-overlap.gif', place: 'above-captions' }),
      endsParagraph: true,
    },
    {
      // giphy "power pose woman": https://giphy.com/gifs/J341jtyRPKQCfXFImt
      text: "If you want to be more confident",
      visual: gif({ src: 'section-11-confident.gif', place: 'above-captions' }),
    },
    {
      // giphy "untangling knot": https://giphy.com/gifs/cfelXlrEdY5q2iPxZE
      text: "about the complexity of a new feature before you commit,",
      visual: gif({ src: 'section-12-knot.gif', playbackRate: 0.99, place: 'above-captions' }),
    },
    {
      // giphy "ladder climbing": https://giphy.com/gifs/29HWHVyD4wB3MRmtIg
      text: "we’re building a learning path for it.",
      visual: gif({ src: 'section-13-ladder.gif', place: 'above-captions' }),
      endsParagraph: true,
    },
    {
      // giphy "file folder opening": https://giphy.com/gifs/l0MYEpMgixXtNRgrK
      // Sped up so the folder is open by the cut, since opening it is the whole line.
      text: "By the end you’ll be able to open the documentation",
      visual: gif({ src: 'section-14-folder.gif', playbackRate: 1.14, place: 'above-captions' }),
    },
    {
      // giphy "credit card payment icon": https://giphy.com/gifs/ycANs3udEsdsdgDIDZ
      // The cards say "already pay for", which is the part of the line that does the work.
      text: "for the integrations you already pay for,",
      visual: gif({ src: 'section-15-cards.gif', place: 'above-captions' }),
    },
    {
      // giphy "magnifying glass over list": https://giphy.com/gifs/42wQXwITfQbDGKqUP7
      text: "see which fields they actually expose,",
      visual: gif({ src: 'section-16-magnifier.gif', place: 'above-captions' }),
    },
    {
      // giphy "approved check mark": https://giphy.com/gifs/nMasa5KUxralWiLD5s
      text: "and know whether the request is possible before you answer.",
      visual: gif({ src: 'section-17-approve.gif', playbackRate: 0.79, place: 'above-captions' }),
      endsParagraph: true,
    },
    {
      // giphy "message notification pop": https://giphy.com/gifs/CQWCsApevAijqqzygN
      text: "The waitlist link is in the comments.",
      visual: gif({ src: 'section-18-phone.gif', color: '#ffffff', place: 'above-captions' }),
    },
    {
      // giphy "opening curtains reveal": https://giphy.com/gifs/1JjkufuS3IcS74XTDn
      // A door opening on the line about the learning path opening. Sped up so it is open by the
      // cut rather than still swinging.
      text: "Sign up and we’ll let you know when the learning path opens.",
      visual: gif({ src: 'section-19-door.gif', playbackRate: 0.79, place: 'above-captions' }),
      endsParagraph: true,
    },
    {
      // giphy "pondering chin hand": https://giphy.com/gifs/y9U1fyL4Cs5Ntzefm3
      text: "[pause][curious] What ‘simple’ request turned out hardest?",
      visual: gif({ src: 'section-20-thinking.gif', playbackRate: 0.66, place: 'above-captions' }),
    },
  ],
})
