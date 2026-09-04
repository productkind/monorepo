import { defineVideo, gif, riveAtFrame } from '../narration/definition'

/**
 * Video 4 of the PM technical fluency campaign, "Done, and your users still don't have it".
 * Script: productkind/marketing/content/campaigns/2026-09-pm-technical-fluency-validation/
 * video-4-where-is-the-change/script.md
 *
 * The CTA is the LinkedIn / YouTube Shorts variant ("link in the comments"), which is the script
 * as written. TikTok and Instagram Reels need the URL spoken and shown instead.
 *
 * Sections 0 and 11 to 14 stand in for the screen recording the production notes call for: one
 * real change in the Little Parrot repository followed as far as the live site.
 *
 * Section 12 deliberately does not itemise review, testing and environments. The production notes
 * say the dependency is the story, not the stages, so the beat shows a route with stages falling
 * one after another and names none of them.
 *
 * The slots behind these rates are estimates from `0.98 + 0.209 x words`, fitted on the 39
 * narrated sections of videos 1 and 2. Every rate is a ratio to its slot, so all of them move once
 * this script is narrated: re-check with `verify.py --video pm-technical-fluency-validation-03`
 * from the video-gifs skill, and render the composed stills at the same time.
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
      // giphy "checkered flag finish line animation": https://giphy.com/gifs/tiVMYO9i8tRMm6cW7d
      text: "Engineering says it’s done.",
      visual: gif({ src: 'section-00-finish-flag.gif', place: 'above-captions' }),
    },
    {
      // giphy "cat staring at empty bowl": https://giphy.com/gifs/qZgHBlenHa1zKqy6Zn
      text: "Your users still don’t have it.",
      visual: gif({
        src: 'section-01-still-nothing.gif',
        playbackRate: 0.87,
        place: 'above-captions',
      }),
      endsParagraph: true,
    },
    {
      // giphy "3d gears turning machine": https://giphy.com/gifs/3oEdv49tCsOOcl79Ac
      text: "It’s built, it’s tested,",
      visual: gif({
        src: 'section-02-machine-working.gif',
        playbackRate: 0.86,
        place: 'above-captions',
      }),
    },
    {
      // giphy "airplane waiting on runway": https://giphy.com/gifs/uOrArovddNCm0fjz4O
      // Standing at a baggage carousel: the thing is finished and somewhere in a system you don't
      // control, and all you can do is wait at the belt.
      text: "and it’s waiting behind another team’s release.",
      visual: gif({ src: 'section-03-waiting.gif', playbackRate: 0.89, place: 'above-captions' }),
    },
    {
      // giphy "wall calendar animation illustration": https://giphy.com/gifs/d1GpZTVp2eV7gQk8
      // Sped up so the whole year flips inside the beat; at full speed it only reaches July.
      text: "Nobody told you that team ships once a month.",
      visual: gif({
        src: 'section-04-monthly-calendar.gif',
        playbackRate: 1.36,
        place: 'above-captions',
      }),
      endsParagraph: true,
    },
    {
      // giphy "typing message on phone close up": https://giphy.com/gifs/eFwA72kMRPoiwp92ha
      text: "You’ve been telling your stakeholder it’s coming this week.",
      visual: gif({ src: 'section-05-telling-stakeholder.gif', place: 'above-captions' }),
    },
    {
      // giphy "clock hands spinning fast": https://giphy.com/gifs/0kZhz1UH8j2keHU3vS
      text: "For three weeks.",
      visual: gif({ src: 'section-06-time-dragging.gif', place: 'above-captions' }),
      endsParagraph: true,
    },
    {
      // giphy "puzzle missing piece illustration": https://giphy.com/gifs/N9a4q1vSAtWrv3F3qV
      text: "Done meant finished in your part of the system.",
      visual: gif({ src: 'section-07-your-part.gif', playbackRate: 0.99, place: 'above-captions' }),
    },
    {
      // giphy "lightbulb turning on illustration": https://giphy.com/gifs/3o7TKFODjEUB1gjWPS
      text: "That isn’t the same as live for your users.",
      visual: gif({ src: 'section-08-switch-on.gif', place: 'above-captions' }),
      endsParagraph: true,
    },
    {
      // giphy "woman looking through binoculars": https://giphy.com/gifs/ZYnJxx4Wgh6xspkpG0
      text: "If you want to know where your feature actually is,",
      visual: gif({ src: 'section-09-searching.gif', playbackRate: 0.93, place: 'above-captions' }),
    },
    {
      // giphy "stepping stones path illustration": https://giphy.com/gifs/xUPGcM9CazM9H5KrEA
      text: "we’re building a learning path for it.",
      visual: gif({
        src: 'section-10-learning-path.gif',
        playbackRate: 0.92,
        place: 'above-captions',
      }),
      endsParagraph: true,
    },
    {
      // giphy "car driving top view road": https://giphy.com/gifs/0X8xkjUvCkKMygYeoj
      text: "By the end you’ll be able to follow one change",
      visual: gif({
        src: 'section-11-following-the-route.gif',
        playbackRate: 0.93,
        place: 'above-captions',
      }),
    },
    {
      // giphy "domino chain falling": https://giphy.com/gifs/QzASHIVqZlFQ4eQTV7
      // Sped up so the whole chain finishes falling inside the beat.
      text: "through review, testing, environments",
      visual: gif({
        src: 'section-12-route-of-stages.gif',
        playbackRate: 0.78,
        place: 'above-captions',
      }),
    },
    {
      // giphy "chain links close up": https://giphy.com/gifs/VtCrCSeLc1Ref320A9
      text: "and every team it waits on,",
      visual: gif({ src: 'section-13-chain-of-teams.gif', place: 'above-captions' }),
    },
    {
      // giphy "red marker circling on paper": https://giphy.com/gifs/xUOxeX1zdzqAvFbfqw
      text: "and say exactly what’s holding it up.",
      visual: gif({ src: 'section-14-marking-the-blocker.gif', place: 'above-captions' }),
      endsParagraph: true,
    },
    {
      // giphy "hand pointing down finger illustration": https://giphy.com/gifs/XCl8yrQkRPPyROoeJj
      text: "The waitlist link is in the comments.",
      visual: gif({ src: 'section-15-pointing.gif', place: 'above-captions' }),
    },
    {
      // giphy "signing paper with pen close up": https://giphy.com/gifs/rjfldjGpjhpxm
      // Sped up so the pen stroke lands inside the beat.
      text: "Sign up and we’ll let you know when the learning path opens.",
      visual: gif({
        src: 'section-16-signing-up.gif',
        playbackRate: 1.22,
        place: 'above-captions',
      }),
      endsParagraph: true,
    },
    {
      // giphy "cute animal tilting head curious": https://giphy.com/gifs/BbHAzBkwS0UydUwOEl
      text: "How often do you release new improvements for your users?",
      visual: gif({ src: 'section-17-asking-you.gif', place: 'above-captions' }),
    },
  ],
})
