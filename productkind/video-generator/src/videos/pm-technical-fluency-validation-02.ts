import { defineVideo, gif, riveAtFrame } from '../narration/definition'

/**
 * Video 2 of the PM technical fluency campaign, "You only know the screens".
 * Script: productkind/marketing/content/campaigns/2026-09-pm-technical-fluency-validation/
 * video-2-you-only-know-the-screens/script.md
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
  id: 'pm-technical-fluency-validation-02',
  voice: 'chloe',
  model: 'eleven_v3',
  overlays: [
    riveAtFrame({ rive: 'parrot-greet-00.riv', frame: 0 }),
    riveAtFrame({ rive: 'parrot-peek-00.riv', frame: 500 }),
  ],
  sections: [
    {
      // Sped up a touch so the bubble finishes typing exactly as the question lands.
      text: '“So how does your product work?”',
      visual: gif({
        src: 'section-00-bubble.gif',
        source: {
          provider: 'giphy',
          id: 'mcdVjcUtgJz9603joH',
          search: 'speech bubble question animation',
        },
        color: '#000000',
        playbackRate: 0.9,
        place: 'above-captions',
      }),
    },
    {
      // Stands in for the Little Parrot app flow the production notes want here.
      text: 'You can demo every screen,',
      visual: gif({
        src: 'section-01-screens.gif',
        source: {
          provider: 'giphy',
          id: '64djN36d7Rr2NodQwQ',
          search: 'scrolling through app screens',
        },
        playbackRate: 0.77,
        place: 'above-captions',
      }),
    },
    {
      text: 'and that’s as far as your answer goes.',
      visual: gif({
        src: 'section-02-shrug.gif',
        source: { provider: 'giphy', id: '6lnQpQebxJucdcRdrB', search: 'woman shrugging' },
        color: '#fbfbfb',
        place: 'above-captions',
      }),
      endsParagraph: true,
    },
    {
      text: 'Behind those screens is a service another team owns,',
      visual: gif({
        src: 'section-03-servers.gif',
        source: { provider: 'giphy', id: '2ZmBuhE34beR6PjM0u', search: 'server rack data centre' },
        playbackRate: 0.87,
        place: 'above-captions',
      }),
    },
    {
      text: 'three integrations,',
      visual: gif({
        src: 'section-04-puzzle.gif',
        source: { provider: 'giphy', id: 'CaskNhYmzqSHUUhq4e', search: 'puzzle pieces connecting' },
        playbackRate: 0.61,
        place: 'above-captions',
      }),
    },
    {
      text: 'cloud storage you’ve never seen,',
      visual: gif({
        src: 'section-05-cloud.gif',
        source: { provider: 'giphy', id: 'W9qCmeTuUoaFG', search: 'cloud icon animation' },
        color: '#6b51e8',
        place: 'above-captions',
      }),
    },
    {
      text: 'and a database somebody migrated last year.',
      visual: gif({
        src: 'section-06-migration.gif',
        source: { provider: 'giphy', id: 'ds9VVID0WdIqzBgLUT', search: 'migration' },
        playbackRate: 0.76,
        place: 'above-captions',
      }),
      endsParagraph: true,
    },
    {
      // Slowed so the screen is still cracking at the cut, not cracking twice.
      text: 'So when the load test fails,',
      visual: gif({
        src: 'section-07-crack.gif',
        source: { provider: 'giphy', id: '26BRuNOYPshwxGuDm', search: 'broken screen crack' },
        color: '#ffffff',
        playbackRate: 0.83,
        place: 'above-captions',
      }),
    },
    {
      text: 'you can’t tell if it’s your problem.',
      visual: gif({
        src: 'section-08-unsure.gif',
        source: { provider: 'giphy', id: '0aSulNqJj5zfOshQXC', search: 'is it me confused' },
        place: 'above-captions',
      }),
      endsParagraph: true,
    },
    {
      text: 'You know the frontend and the backend.',
      visual: gif({
        src: 'section-09-laptop.gif',
        source: {
          provider: 'giphy',
          id: 'qjlquZl0oHZbJBInpf',
          search: 'woman typing laptop office',
        },
        place: 'above-captions',
      }),
    },
    {
      // The canopy above the line, the roots below it, which is the beat.
      text: 'Nobody explains the infrastructure around them.',
      visual: gif({
        src: 'section-10-infrastructure.gif',
        source: { provider: 'giphy', id: 'WsRay6mTizlOVn3nts', search: 'infrastrucutre' },
        playbackRate: 0.61,
        place: 'above-captions',
      }),
      endsParagraph: true,
    },
    {
      // 2.4s against a 3.0s slot, slowed so the study covers the whole line.
      text: 'If you want to understand that about your own product,',
      visual: gif({
        src: 'section-11-studying.gif',
        source: {
          provider: 'giphy',
          id: 'Qt1jk5Q49C3h5CrlBe',
          search: 'woman looking at screen curious',
        },
        color: '#ffffff',
        playbackRate: 0.8,
        place: 'above-captions',
      }),
    },
    {
      text: 'that’s what we’re building a learning path for.',
      visual: gif({
        src: 'section-12-building.gif',
        source: { provider: 'giphy', id: 'F7ASV7LOSpcCn2lQkt', search: 'stacking bricks build' },
        place: 'above-captions',
      }),
      endsParagraph: true,
    },
    {
      // 6.3s of drawing in a 3.1s slot. Sped up so the drawing finishes inside the beat, which is
      // the payoff the production notes protect: the map gets drawn, not half drawn.
      text: 'By the end you’ll be able to map out your product:',
      visual: gif({
        src: 'section-13-drawing.gif',
        source: { provider: 'giphy', id: 'IKNlnE1Z9PH5CuAbic', search: 'woman drawing whiteboard' },
        color: '#000000',
        playbackRate: 2.07,
        place: 'above-captions',
      }),
    },
    {
      text: 'what it depends on,',
      visual: gif({
        src: 'section-14-links.gif',
        source: {
          provider: 'giphy',
          id: 'cG0HFVzbbaA8SenoCj',
          search: 'connected dots lines animation',
        },
        color: '#000000',
        place: 'above-captions',
      }),
    },
    {
      text: 'who owns each part,',
      visual: gif({
        src: 'section-15-paw.gif',
        source: { provider: 'giphy', id: '3UPNs8vXyJESQ', search: 'cat raising paw' },
        color: '#ffffff',
        place: 'above-captions',
      }),
    },
    {
      // Slowed to one rotation across the beat; a spinner that jumps back mid-turn is visible.
      text: 'where it slows down,',
      visual: gif({
        src: 'section-16-spinner.gif',
        source: { provider: 'giphy', id: '3og0ID5AW1SmPuG3u0', search: 'loading spinner slow' },
        playbackRate: 0.89,
        place: 'above-captions',
      }),
    },
    {
      // Slowed so the tower is still going down at the cut, rather than standing back up.
      text: 'and what breaks when one fails.',
      visual: gif({
        src: 'section-17-jenga.gif',
        source: { provider: 'giphy', id: 'xfCw2YVtj7ZpJjd4ZG', search: 'jenga tower collapse' },
        playbackRate: 0.81,
        place: 'above-captions',
      }),
      endsParagraph: true,
    },
    {
      // Replaced a cat-with-speech-bubble gif that turned out to be a still photo: 16 frames of
      // nothing but the bubble outline wobbling by a pixel.
      text: 'The waitlist link is in the comments.',
      visual: gif({
        src: 'section-18-phone.gif',
        source: { provider: 'giphy', id: '3ohhwDlKkjDll35yOQ', search: 'typing message phone' },
        playbackRate: 0.84,
        place: 'above-captions',
      }),
    },
    {
      text: 'Sign up and we’ll let you know when the learning path opens.',
      visual: gif({
        src: 'section-19-envelope.gif',
        source: {
          provider: 'giphy',
          id: '2wWBH0vXsVUmKtRJOe',
          search: 'email envelope notification',
        },
        color: '#ffffff',
        place: 'above-captions',
      }),
      endsParagraph: true,
    },
    {
      // Slowed so she is still thinking about it as the video ends, which is the prompt.
      text: '[pause][curious] Which part of your product would you struggle to explain?',
      visual: gif({
        src: 'section-20-wondering.gif',
        source: { provider: 'giphy', id: '528ZQA9p2ZEmDxs17j', search: 'woman thinking question' },
        playbackRate: 0.84,
        place: 'above-captions',
      }),
    },
  ],
})
