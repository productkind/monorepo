import { defineVideo, gif, riveAtFrame } from '../narration/definition'

/**
 * Video 1 of the PM technical fluency campaign, "You only know the screens".
 * Script: productkind/marketing/content/campaigns/2026-09-pm-technical-fluency-validation/
 * video-1-you-only-know-the-screens/script.md
 *
 * The CTA is the LinkedIn / YouTube Shorts variant ("link in the comments"), which is the script
 * as written. TikTok and Instagram Reels need the URL spoken and shown instead.
 *
 * Cut at clause level, because the script's production notes want the map drawn as the narration
 * names each part: sections 3 to 6 are the four things behind the screens, and 14 to 17 are the
 * four parts of the map, one cut each.
 *
 * Every visual is a giphy gif chosen text-free, and every person shown is a woman, which is what
 * the campaign brief asks of the channel. Sections 1, 13 and 14 to 17 stand in for the screen
 * recordings the production notes call for: one flow in the Little Parrot app, then the map being
 * drawn live.
 *
 * Every gif shorter than its slot is slowed to cover the beat in one pass, rather than held on a
 * frozen last frame: a still picture reads as a stall while the captions and the parrot keep
 * moving. The rates come from the narrated timeline, so re-check them with the video-gifs skill's
 * `verify.py` if the script is ever re-narrated.
 */
export default defineVideo({
  id: 'pm-technical-fluency-validation-01',
  voice: 'chloe',
  model: 'eleven_v3',
  overlays: [
    riveAtFrame({ rive: 'parrot-greet-00.riv', frame: 0 }),
    riveAtFrame({ rive: 'parrot-peek-00.riv', frame: 500 }),
  ],
  sections: [
    {
      // giphy "speech bubble question animation": https://giphy.com/gifs/mcdVjcUtgJz9603joH
      // Sped up a touch so the bubble finishes typing exactly as the question lands.
      text: "“So how does your product work?”",
      visual: gif({ src: 'section-00-bubble.gif', playbackRate: 1.1, place: 'above-captions' }),
    },
    {
      // giphy "scrolling through app screens": https://giphy.com/gifs/64djN36d7Rr2NodQwQ
      // Stands in for the Little Parrot app flow the production notes want here.
      text: "You can demo every screen,",
      visual: gif({ src: 'section-01-screens.gif', playbackRate: 0.77, place: 'above-captions' }),
    },
    {
      // giphy "woman shrugging": https://giphy.com/gifs/6lnQpQebxJucdcRdrB
      text: "and that’s as far as your answer goes.",
      visual: gif({ src: 'section-02-shrug.gif', place: 'above-captions' }),
      endsParagraph: true,
    },
    {
      // giphy "server rack data centre": https://giphy.com/gifs/2ZmBuhE34beR6PjM0u
      text: "Behind those screens is a service another team owns,",
      visual: gif({ src: 'section-03-servers.gif', playbackRate: 0.87, place: 'above-captions' }),
    },
    {
      // giphy "puzzle pieces connecting": https://giphy.com/gifs/CaskNhYmzqSHUUhq4e
      text: "three integrations,",
      visual: gif({ src: 'section-04-puzzle.gif', place: 'above-captions' }),
    },
    {
      // giphy "cloud icon animation": https://giphy.com/gifs/W9qCmeTuUoaFG
      text: "cloud storage you’ve never seen,",
      visual: gif({ src: 'section-05-cloud.gif', place: 'above-captions' }),
    },
    {
      // giphy "carrying boxes animation": https://giphy.com/gifs/Wkk9hGpx70nVQ3mT6j
      text: "and a database somebody migrated last year.",
      visual: gif({ src: 'section-06-migration.gif', playbackRate: 0.76, place: 'above-captions' }),
      endsParagraph: true,
    },
    {
      // giphy "broken screen crack": https://giphy.com/gifs/26BRuNOYPshwxGuDm
      // Slowed so the screen is still cracking at the cut, not cracking twice.
      text: "So when the load test fails,",
      visual: gif({ src: 'section-07-crack.gif', playbackRate: 0.83, place: 'above-captions' }),
    },
    {
      // giphy "is it me confused": https://giphy.com/gifs/0aSulNqJj5zfOshQXC
      text: "you can’t tell if it’s your problem.",
      visual: gif({ src: 'section-08-unsure.gif', place: 'above-captions' }),
      endsParagraph: true,
    },
    {
      // giphy "woman typing laptop office": https://giphy.com/gifs/qjlquZl0oHZbJBInpf
      text: "You know the frontend and the backend.",
      visual: gif({ src: 'section-09-laptop.gif', place: 'above-captions' }),
    },
    {
      // giphy "underground roots tree": https://giphy.com/gifs/A9FVjwWVIZ3TNob82s
      // The canopy above the line, the roots below it, which is the beat.
      text: "Nobody explains the infrastructure around them.",
      visual: gif({ src: 'section-10-roots.gif', playbackRate: 0.61, place: 'above-captions' }),
      endsParagraph: true,
    },
    {
      // giphy "woman looking at screen curious": https://giphy.com/gifs/Qt1jk5Q49C3h5CrlBe
      // 2.4s against a 3.0s slot, slowed so the study covers the whole line.
      text: "If you want to understand that about your own product,",
      visual: gif({ src: 'section-11-studying.gif', playbackRate: 0.8, place: 'above-captions' }),
    },
    {
      // giphy "stacking bricks build": https://giphy.com/gifs/F7ASV7LOSpcCn2lQkt
      text: "that’s what we’re building a learning path for.",
      visual: gif({ src: 'section-12-building.gif', place: 'above-captions' }),
      endsParagraph: true,
    },
    {
      // giphy "woman drawing whiteboard": https://giphy.com/gifs/IKNlnE1Z9PH5CuAbic
      // 6.3s of drawing in a 3.1s slot. Sped up so the drawing finishes inside the beat, which is
      // the payoff the production notes protect: the map gets drawn, not half drawn.
      text: "By the end you’ll be able to map out your product:",
      visual: gif({ src: 'section-13-drawing.gif', playbackRate: 2.07, place: 'above-captions' }),
    },
    {
      // giphy "connected dots lines animation": https://giphy.com/gifs/cG0HFVzbbaA8SenoCj
      text: "what it depends on,",
      visual: gif({ src: 'section-14-links.gif', place: 'above-captions' }),
    },
    {
      // giphy "cat raising paw": https://giphy.com/gifs/3UPNs8vXyJESQ
      text: "who owns each part,",
      visual: gif({ src: 'section-15-paw.gif', place: 'above-captions' }),
    },
    {
      // giphy "loading spinner slow": https://giphy.com/gifs/3og0ID5AW1SmPuG3u0
      // Slowed to one rotation across the beat; a spinner that jumps back mid-turn is visible.
      text: "where it slows down,",
      visual: gif({ src: 'section-16-spinner.gif', playbackRate: 0.89, place: 'above-captions' }),
    },
    {
      // giphy "jenga tower collapse": https://giphy.com/gifs/xfCw2YVtj7ZpJjd4ZG
      // Slowed so the tower is still going down at the cut, rather than standing back up.
      text: "and what breaks when one fails.",
      visual: gif({ src: 'section-17-jenga.gif', playbackRate: 0.81, place: 'above-captions' }),
      endsParagraph: true,
    },
    {
      // giphy "typing message phone": https://giphy.com/gifs/3ohhwDlKkjDll35yOQ
      // Replaced a cat-with-speech-bubble gif that turned out to be a still photo: 16 frames of
      // nothing but the bubble outline wobbling by a pixel.
      text: "The waitlist link is in the comments.",
      visual: gif({ src: 'section-18-phone.gif', playbackRate: 0.84, place: 'above-captions' }),
    },
    {
      // giphy "email envelope notification": https://giphy.com/gifs/2wWBH0vXsVUmKtRJOe
      text: "Sign up and we’ll let you know when the learning path opens.",
      visual: gif({ src: 'section-19-envelope.gif', place: 'above-captions' }),
      endsParagraph: true,
    },
    {
      // giphy "woman thinking question": https://giphy.com/gifs/528ZQA9p2ZEmDxs17j
      // Slowed so she is still thinking about it as the video ends, which is the prompt.
      text: "[pause][curious] Which part of your product would you struggle to explain?",
      visual: gif({ src: 'section-20-wondering.gif', playbackRate: 0.84, place: 'above-captions' }),
    },
  ],
})
