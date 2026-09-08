import { defineVideo, gif, riveAtFrame } from '../narration/definition'

/**
 * Video 8 of the PM technical fluency campaign, "When can we launch it?".
 * Script: productkind/marketing/content/campaigns/2026-09-pm-technical-fluency-validation/
 * video-8-when-can-we-launch-it/script.md
 *
 * The CTA is the LinkedIn / YouTube Shorts variant ("link in the comments"), which is the script
 * as written. TikTok and Instagram Reels need the URL spoken and shown instead.
 *
 * Sections 0 and 11 stand in for the screen recording the production notes call for: one small
 * prototype built with an AI agent, with the production list written beside it.
 *
 * Sections 12 to 16 are the five things a prototype skips, and the production notes make that list
 * what the course promises, so each gets its own cut: a floppy disk for whose data it holds, a key
 * for who's allowed in, a server and a monitor trading data for what it does under real load, an
 * alarm being smacked for who gets woken at 2am, and a watering can for who maintains it. Data and
 * access are deliberately different symbols, because a padlock at 12 followed by a key at 13 would
 * have been the same idea twice for two different questions.
 *
 * The five share "one object, plain background" but not a palette: three are dark line art, two are
 * flat colour on light. A uniform five could not be assembled from clean stock, and the attempt is
 * what produced video 5's mismatched trio, so the register is held loosely here and named honestly.
 *
 * Section 15 carries a small hand-lettered "beep". The rule it bends exists to stop a viewer
 * reading a stray word that has nothing to do with the line, and on "who gets woken at 2am" the
 * word is the line, but it is a judgement worth revisiting.
 *
 * The slots behind these rates are estimates from `0.98 + 0.209 x words`, fitted on the 39
 * narrated sections of videos 0 and 1. Every rate is a ratio to its slot, so all of them move once
 * this script is narrated: re-check with `verify.py --video pm-technical-fluency-validation-08`
 * from the video-gifs skill, and render the composed stills at the same time.
 */
export default defineVideo({
  id: 'pm-technical-fluency-validation-08',
  voice: 'chloe',
  model: 'eleven_v3',
  overlays: [
    riveAtFrame({ rive: 'parrot-greet-00.riv', frame: 0 }),
    riveAtFrame({ rive: 'parrot-peek-00.riv', frame: 500 }),
  ],
  sections: [
    {
      text: 'You built something with AI to test an idea.',
      visual: gif({
        src: 'section-00-spark-idea.gif',
        source: { provider: 'giphy', id: 'xUNda1t8JRgpyoC6re', search: 'spark idea building' },
        place: 'above-captions',
      }),
    },
    {
      text: 'Your stakeholder saw it',
      visual: gif({
        src: 'section-01-eyes-notice.gif',
        source: { provider: 'giphy', id: 'BoFcsOXoErjrVcsfq2', search: 'head turning look' },
        playbackRate: 0.96,
        place: 'above-captions',
      }),
    },
    {
      // Left looping: the seam is 0.06, so the rocket simply keeps climbing through the beat.
      text: 'and asked when we can launch it.',
      visual: gif({
        src: 'section-02-rocket-launch.gif',
        source: {
          provider: 'giphy',
          id: 'dJezVlwfVulTykjRQj',
          search: 'cute cartoon rocket ship flying animation',
        },
        place: 'above-captions',
      }),
      endsParagraph: true,
    },
    {
      text: 'It works on your laptop,',
      visual: gif({
        src: 'section-03-laptop-glow.gif',
        source: {
          provider: 'giphy',
          id: 'l41YwXexrlTJa25Ms',
          search: 'laptop screen turning on illustration',
        },
        place: 'above-captions',
      }),
    },
    {
      // A wrapped gift box character. Its source id was lost when the sourcing run died before
      // reporting, so this one cannot be traced back to giphy the way the others can.
      text: 'so to them it looks finished.',
      visual: gif({
        src: 'section-04-gift-wrapped.gif',
        color: '#f4868c',
        place: 'above-captions',
      }),
      endsParagraph: true,
    },
    {
      // An empty cardboard box opening. Source id lost with the same run.
      text: 'And you can’t explain why it isn’t,',
      visual: gif({
        src: 'section-05-empty-box.gif',
        color: '#fcfefc',
        playbackRate: 0.91,
        place: 'above-captions',
      }),
    },
    {
      // A car stuck in mud with its wheels spinning. Source id lost with the same run.
      text: 'so you sound like you’re stalling.',
      visual: gif({ src: 'section-06-spinning-wheels.gif', place: 'above-captions' }),
      endsParagraph: true,
    },
    {
      // A thumbs-up in a circle, the background cycling through colours. Source id lost.
      text: 'Your prototype proves the idea works.',
      visual: gif({ src: 'section-07-thumbs-up.gif', playbackRate: 0.9, place: 'above-captions' }),
    },
    {
      // An empty fridge opening. Source id lost with the same run.
      text: 'None of what keeps a real product running is there.',
      visual: gif({
        src: 'section-08-empty-fridge.gif',
        color: '#34bafc',
        playbackRate: 0.83,
        place: 'above-captions',
      }),
      endsParagraph: true,
    },
    {
      text: 'If you want to answer that stakeholder with real reasons,',
      visual: gif({
        src: 'section-09-eager-answer.gif',
        source: {
          provider: 'giphy',
          id: 'l2QE4oA03MKLp9y2k',
          search: 'raised hand icon animation flat',
        },
        color: '#ff675a',
        place: 'above-captions',
      }),
    },
    {
      // A path rather than stacking blocks: video 0, video 5 and video 6 all build with blocks on
      // this beat, and a fourth would make the set look like one video.
      text: 'we’re building a learning path for it.',
      visual: gif({
        src: 'section-10-trail-path.gif',
        source: {
          provider: 'giphy',
          id: 'CtnjRbQTOahYtNqwdu',
          search: 'hiking trail path illustration',
        },
        place: 'above-captions',
      }),
      endsParagraph: true,
    },
    {
      // A list being written, which opens the five items that follow.
      text: 'By the end you’ll be able to name what your prototype skipped:',
      visual: gif({
        src: 'section-11-checklist-icon.gif',
        source: {
          provider: 'giphy',
          id: 'UKubhTGTqVKrs321IQ',
          search: 'clipboard writing checklist',
        },
        color: '#000000',
        place: 'above-captions',
      }),
    },
    {
      text: 'whose data it holds,',
      visual: gif({
        src: 'section-12-data-held.gif',
        source: {
          provider: 'giphy',
          id: 'fsmgUY2uzBgHw7S11V',
          search: 'database data storage icon animation',
        },
        color: '#000000',
        playbackRate: 0.9,
        place: 'above-captions',
      }),
    },
    {
      text: 'who’s allowed in,',
      visual: gif({
        src: 'section-13-access-key.gif',
        source: {
          provider: 'giphy',
          id: 'j5hdNsxZb7spU22I68',
          search: 'access key icon animation flat design',
        },
        color: '#000000',
        playbackRate: 0.99,
        place: 'above-captions',
      }),
    },
    {
      text: 'what it does under real load,',
      visual: gif({
        src: 'section-14-server-load.gif',
        source: {
          provider: 'giphy',
          id: 'VX7yEoXAFf8as',
          search: 'server load meter flat icon animation',
        },
        color: '#1b1b1b',
        place: 'above-captions',
      }),
    },
    {
      text: 'who gets woken at 2am when something goes wrong,',
      visual: gif({
        src: 'section-15-alarm-2am.gif',
        source: {
          provider: 'giphy',
          id: '3kNjNGN7Rd8DDNAnNC',
          search: 'alarm clock ringing icon animation',
        },
        playbackRate: 0.82,
        place: 'above-captions',
      }),
    },
    {
      text: 'and who maintains it.',
      visual: gif({
        src: 'section-16-maintain-plant.gif',
        source: {
          provider: 'giphy',
          id: 'xUPJUkUHMMj1OirNqE',
          search: 'watering plant care icon animation',
        },
        place: 'above-captions',
      }),
      endsParagraph: true,
    },
    {
      // Downward motion rather than a fourth arrow: videos 4, 5 and 6 all point down with one.
      text: 'The waitlist link is in the comments.',
      visual: gif({
        src: 'section-17-leaves-falling.gif',
        source: {
          provider: 'giphy',
          id: '9J8K8WEWLXZk7s0OMB',
          search: 'leaf falling illustration',
        },
        color: '#fffcf1',
        place: 'above-captions',
      }),
    },
    {
      // A bud opening on the line about the learning path opening.
      text: 'Sign up and we’ll let you know when the learning path opens.',
      visual: gif({
        src: 'section-18-flower-opens.gif',
        source: {
          provider: 'giphy',
          id: 'cKn42Gk4eznf1q45HM',
          search: 'plant sprout growing timelapse',
        },
        color: '#000000',
        playbackRate: 0.62,
        place: 'above-captions',
      }),
      endsParagraph: true,
    },
    {
      // Left looping: seam 0.00, the cleanest loop in the video.
      text: '[pause][curious] Ever been asked to ship a prototype?',
      visual: gif({
        src: 'section-19-curious-eyebrow.gif',
        source: { provider: 'giphy', id: 'H9647AMy9XwjH1zgZY', search: 'raised eyebrow curious' },
        place: 'above-captions',
      }),
    },
  ],
})
