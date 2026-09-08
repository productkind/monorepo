import { defineVideo, gif, riveAtFrame } from '../narration/definition'

/**
 * Video 5 of the vibe coder campaign, "Your app goes down on Saturday".
 * Script: productkind/marketing/content/campaigns/2026-09-vibe-coder-validation/
 * video-5-keep-the-product-operable/script.md
 *
 * The CTA is the LinkedIn / YouTube Shorts variant ("link in the comments"), which is the script
 * as written. TikTok and Instagram Reels need the URL spoken and shown instead, so they want a
 * second definition rather than a re-edit of this one.
 *
 * Cut at clause level. The three ways a live app breaks each get their own beat, because the
 * point of the line is that they are separate things that can go wrong.
 *
 * An outage script pulls the industry's control-room imagery, so nothing here uses it: no walls
 * of monitors, no blinking racks, no red terminals. Each failure is an everyday object instead.
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
      // An eye closing, then a screen collapsing to a dot. Slowed to cover the beat in one pass.
      text: 'The app you built with AI goes down on Saturday.',
      visual: gif({
        src: 'section-00-screen-switches-off.gif',
        source: {
          provider: 'giphy',
          id: 'PjbOOXeMPysZneRwAk',
          search: 'screen goes black tv switching off',
        },
        playbackRate: 0.84,
        place: 'above-captions',
      }),
    },
    {
      text: 'Who notices it first?',
      visual: gif({
        src: 'section-01-girl-notices.gif',
        source: {
          provider: 'giphy',
          id: 'dI5xjhEhWY6XUg9yem',
          search: 'cat noticing something offscreen',
        },
        playbackRate: 1.21,
        place: 'above-captions',
      }),
      endsParagraph: true,
    },
    {
      text: 'A live app needs ongoing care.',
      visual: gif({
        src: 'section-02-watering-can-plant.gif',
        source: {
          provider: 'giphy',
          id: 'lefvGPhWaaRXc5a1sP',
          search: 'tending small plant animation',
        },
        color: '#efe6e6',
        place: 'above-captions',
      }),
    },
    {
      text: 'A service can fail,',
      visual: gif({
        src: 'section-03-battery-drains.gif',
        source: {
          provider: 'giphy',
          id: 'gPrngvbI77yBCXk53A',
          search: 'battery drains to empty icon',
        },
        color: '#fefefe',
        playbackRate: 1.05,
        place: 'above-captions',
      }),
    },
    {
      text: 'a platform can change',
      visual: gif({
        src: 'section-04-flower-morph.gif',
        source: {
          provider: 'giphy',
          id: 'FOXObRAsPTQVLZ8Kgj',
          search: 'interface redesign morph icon',
        },
        color: '#0b0710',
        place: 'above-captions',
      }),
    },
    {
      // Sped up so the tower has finished falling by the cut.
      text: 'or your next update can break the live version.',
      visual: gif({
        src: 'section-05-tower-topples.gif',
        source: {
          provider: 'giphy',
          id: '5G6eWbZP25gfeufGzS',
          search: 'block tower collapses cartoon',
        },
        playbackRate: 1.21,
        place: 'above-captions',
      }),
      endsParagraph: true,
    },
    {
      text: 'If the only recovery plan',
      visual: gif({
        src: 'section-06-compass-spins.gif',
        source: {
          provider: 'giphy',
          id: '1X4Fug16uK7Vzzfxsj',
          search: 'compass spinning lost icon',
        },
        playbackRate: 0.79,
        place: 'above-captions',
      }),
    },
    {
      text: 'is asking the AI to fix it,',
      visual: gif({
        src: 'section-07-robot-waves.gif',
        source: {
          provider: 'giphy',
          id: 'dqxEEMhIXaR1DrcEZA',
          search: 'cute robot helper waving cartoon',
        },
        color: '#1e3586',
        place: 'above-captions',
      }),
    },
    {
      // klipy "dice roll flat icon": a die still tumbling, for a fix you are gambling on.
      text: 'every outage starts with guessing.',
      visual: gif({
        src: 'section-08-dice-tumbles.gif',
        source: { provider: 'klipy', search: 'dice roll flat icon' },
        color: '#040204',
        playbackRate: 1.22,
        place: 'above-captions',
      }),
      endsParagraph: true,
    },
    {
      text: 'You need alerts, a tested backup',
      visual: gif({
        src: 'section-09-alert-bell-icon.gif',
        source: {
          provider: 'giphy',
          id: 'C1vogr3ZrH3nmfaADy',
          search: 'simple line icon bell notification',
        },
        color: '#ffffff',
        playbackRate: 0.89,
        place: 'above-captions',
      }),
    },
    {
      // Hands working through a recipe, for steps you follow yourself rather than improvise.
      text: 'and a recovery checklist you can follow yourself.',
      visual: gif({
        src: 'section-10-recipe-steps-follow.gif',
        source: {
          provider: 'giphy',
          id: '3YUcEh0ZZU8aKTpAsI',
          search: 'following recipe cooking steps',
        },
        place: 'above-captions',
      }),
      endsParagraph: true,
    },
    {
      text: 'If you want an app you can keep operating after launch,',
      visual: gif({
        src: 'section-11-figure-lights-up.gif',
        source: {
          provider: 'giphy',
          id: 'mXhDozGshI21AXUwA9',
          search: 'windmill turning steadily illustration',
        },
        color: '#371941',
        place: 'above-captions',
      }),
    },
    {
      // One tree through the seasons, for something that is grown rather than switched on.
      text: 'that’s what we’re building a learning path for.',
      visual: gif({
        src: 'section-12-tree-through-seasons.gif',
        source: {
          provider: 'giphy',
          id: '39wBNYC96wVjjBThrp',
          search: 'growing tree time lapse illustration',
        },
        place: 'above-captions',
      }),
      endsParagraph: true,
    },
    {
      // klipy "staircase steps going up icon flat": a settings gear turning.
      text: 'By the end, you’ll set an availability alert,',
      visual: gif({
        src: 'section-13-settings-gear-spins.gif',
        source: { provider: 'klipy', search: 'staircase steps going up icon flat' },
        place: 'above-captions',
      }),
    },
    {
      // klipy "woman practicing calmly on laptop illustration": a gymnast rehearsing a routine,
      // for practising the restore rather than improvising it.
      text: 'practise restoring a working version',
      visual: gif({
        src: 'section-14-woman-practices-routine.gif',
        source: { provider: 'klipy', search: 'woman practicing calmly on laptop illustration' },
        playbackRate: 1.27,
        place: 'above-captions',
      }),
    },
    {
      // klipy "woman planning calendar schedule illustration": a calendar cycling the months.
      text: 'and plan your updates, backups and cost checks.',
      visual: gif({
        src: 'section-15-calendar-flips-months.gif',
        source: { provider: 'klipy', search: 'woman planning calendar schedule illustration' },
        color: '#fcfefc',
        playbackRate: 1.4,
        place: 'above-captions',
      }),
      endsParagraph: true,
    },
    {
      text: 'The waitlist link is in the comments.',
      visual: gif({
        src: 'section-16-paperclip-link.gif',
        source: {
          provider: 'giphy',
          id: 'P5q2LWDkljCQsoAeau',
          search: 'paper clip attach icon animation',
        },
        color: '#000000',
        place: 'above-captions',
      }),
    },
    {
      // klipy "curtains open reveal animation icon": curtains parting onto a bright window.
      text: 'Sign up and we’ll let you know when the learning path opens.',
      visual: gif({
        src: 'section-17-curtains-open-light.gif',
        source: { provider: 'klipy', search: 'curtains open reveal animation icon' },
        playbackRate: 0.93,
        place: 'above-captions',
      }),
      endsParagraph: true,
    },
    {
      // klipy "woman curious thinking illustration": a woman looking up, hand on chin.
      text: '[pause][curious] How would you know your app was down?',
      visual: gif({
        src: 'section-18-woman-curious-thinking.gif',
        source: { provider: 'klipy', search: 'woman curious thinking illustration' },
        playbackRate: 0.95,
        place: 'above-captions',
      }),
    },
  ],
})
