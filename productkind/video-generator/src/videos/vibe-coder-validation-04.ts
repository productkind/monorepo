import { defineVideo, gif, riveAtFrame } from '../narration/definition'

/**
 * Video 4 of the vibe coder campaign, "Your app goes down on Saturday".
 * Script: productkind/marketing/content/campaigns/2026-09-vibe-coder-validation/
 * video-4-keep-the-product-operable/script.md
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
  id: 'vibe-coder-validation-04',
  voice: 'chloe',
  model: 'eleven_v3',
  overlays: [
    riveAtFrame({ rive: 'parrot-greet-00.riv', frame: 0 }),
    riveAtFrame({ rive: 'parrot-peek-00.riv', frame: 500 }),
  ],
  sections: [
    {
      // giphy "screen goes black tv switching off": https://giphy.com/gifs/PjbOOXeMPysZneRwAk
      // An eye closing, then a screen collapsing to a dot. Slowed to cover the beat in one pass.
      text: 'The app you built with AI goes down on Saturday.',
      visual: gif({
        src: 'section-00-screen-switches-off.gif',
        playbackRate: 0.84,
        place: 'above-captions',
      }),
    },
    {
      // giphy "cat noticing something offscreen": https://giphy.com/gifs/dI5xjhEhWY6XUg9yem
      text: 'Who notices it first?',
      visual: gif({
        src: 'section-01-girl-notices.gif',
        playbackRate: 1.21,
        place: 'above-captions',
      }),
      endsParagraph: true,
    },
    {
      // giphy "tending small plant animation": https://giphy.com/gifs/lefvGPhWaaRXc5a1sP
      text: 'A live app needs ongoing care.',
      visual: gif({
        src: 'section-02-watering-can-plant.gif',
        color: '#efe6e6',
        place: 'above-captions',
      }),
    },
    {
      // giphy "battery drains to empty icon": https://giphy.com/gifs/gPrngvbI77yBCXk53A
      text: 'A service can fail,',
      visual: gif({
        src: 'section-03-battery-drains.gif',
        color: '#fefefe',
        playbackRate: 1.05,
        place: 'above-captions',
      }),
    },
    {
      // giphy "interface redesign morph icon": https://giphy.com/gifs/FOXObRAsPTQVLZ8Kgj
      text: 'a platform can change',
      visual: gif({
        src: 'section-04-flower-morph.gif',
        color: '#0b0710',
        place: 'above-captions',
      }),
    },
    {
      // giphy "block tower collapses cartoon": https://giphy.com/gifs/5G6eWbZP25gfeufGzS
      // Sped up so the tower has finished falling by the cut.
      text: 'or your next update can break the live version.',
      visual: gif({
        src: 'section-05-tower-topples.gif',
        playbackRate: 1.21,
        place: 'above-captions',
      }),
      endsParagraph: true,
    },
    {
      // giphy "compass spinning lost icon": https://giphy.com/gifs/1X4Fug16uK7Vzzfxsj
      text: 'If the only recovery plan',
      visual: gif({
        src: 'section-06-compass-spins.gif',
        playbackRate: 0.79,
        place: 'above-captions',
      }),
    },
    {
      // giphy "cute robot helper waving cartoon": https://giphy.com/gifs/dqxEEMhIXaR1DrcEZA
      text: 'is asking the AI to fix it,',
      visual: gif({
        src: 'section-07-robot-waves.gif',
        color: '#1e3586',
        place: 'above-captions',
      }),
    },
    {
      // klipy "dice roll flat icon": a die still tumbling, for a fix you are gambling on.
      text: 'every outage starts with guessing.',
      visual: gif({
        src: 'section-08-dice-tumbles.gif',
        color: '#040204',
        playbackRate: 1.22,
        place: 'above-captions',
      }),
      endsParagraph: true,
    },
    {
      // giphy "simple line icon bell notification": https://giphy.com/gifs/C1vogr3ZrH3nmfaADy
      text: 'You need alerts, a tested backup',
      visual: gif({
        src: 'section-09-alert-bell-icon.gif',
        color: '#ffffff',
        playbackRate: 0.89,
        place: 'above-captions',
      }),
    },
    {
      // giphy "following recipe cooking steps": https://giphy.com/gifs/3YUcEh0ZZU8aKTpAsI
      // Hands working through a recipe, for steps you follow yourself rather than improvise.
      text: 'and a recovery checklist you can follow yourself.',
      visual: gif({ src: 'section-10-recipe-steps-follow.gif', place: 'above-captions' }),
      endsParagraph: true,
    },
    {
      // giphy "windmill turning steadily illustration": https://giphy.com/gifs/mXhDozGshI21AXUwA9
      text: 'If you want an app you can keep operating after launch,',
      visual: gif({
        src: 'section-11-figure-lights-up.gif',
        color: '#371941',
        place: 'above-captions',
      }),
    },
    {
      // giphy "growing tree time lapse illustration": https://giphy.com/gifs/39wBNYC96wVjjBThrp
      // One tree through the seasons, for something that is grown rather than switched on.
      text: 'that’s what we’re building a learning path for.',
      visual: gif({ src: 'section-12-tree-through-seasons.gif', place: 'above-captions' }),
      endsParagraph: true,
    },
    {
      // klipy "staircase steps going up icon flat": a settings gear turning.
      text: 'By the end, you’ll set an availability alert,',
      visual: gif({ src: 'section-13-settings-gear-spins.gif', place: 'above-captions' }),
    },
    {
      // klipy "woman practicing calmly on laptop illustration": a gymnast rehearsing a routine,
      // for practising the restore rather than improvising it.
      text: 'practise restoring a working version',
      visual: gif({
        src: 'section-14-woman-practices-routine.gif',
        playbackRate: 1.27,
        place: 'above-captions',
      }),
    },
    {
      // klipy "woman planning calendar schedule illustration": a calendar cycling the months.
      text: 'and plan your updates, backups and cost checks.',
      visual: gif({
        src: 'section-15-calendar-flips-months.gif',
        color: '#fcfefc',
        playbackRate: 1.4,
        place: 'above-captions',
      }),
      endsParagraph: true,
    },
    {
      // giphy "paper clip attach icon animation": https://giphy.com/gifs/P5q2LWDkljCQsoAeau
      text: 'The waitlist link is in the comments.',
      visual: gif({
        src: 'section-16-paperclip-link.gif',
        color: '#000000',
        place: 'above-captions',
      }),
    },
    {
      // klipy "curtains open reveal animation icon": curtains parting onto a bright window.
      text: 'Sign up and we’ll let you know when the learning path opens.',
      visual: gif({
        src: 'section-17-curtains-open-light.gif',
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
        playbackRate: 0.95,
        place: 'above-captions',
      }),
    },
  ],
})
