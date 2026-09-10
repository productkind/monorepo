import { defineVideo, gif, riveAtFrame } from '../narration/definition'

/**
 * Video 4 of the PM technical fluency campaign, "Done, and your users still don't have it".
 * Script: productkind/marketing/content/campaigns/2026-09-pm-technical-fluency-validation/
 * video-4-done-and-users-still-dont-have-it/script.md
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
 * narrated sections of videos 0 and 1. Every rate is a ratio to its slot, so all of them move once
 * this script is narrated: re-check with `verify.py --video pm-technical-fluency-validation-04`
 * from the video-gifs skill, and render the composed stills at the same time.
 */
export default defineVideo({
  id: 'pm-technical-fluency-validation-04',
  voice: 'chloe',
  model: 'eleven_v3',
  overlays: [
    riveAtFrame({ rive: 'parrot-greet-00.riv', frame: 0 }),
    riveAtFrame({ rive: 'parrot-peek-00.riv', frame: 500 }),
  ],
  sections: [
    {
      text: 'Engineering says it’s done.',
      visual: gif({
        src: 'section-00-finish-flag.gif',
        source: {
          provider: 'giphy',
          id: 'tiVMYO9i8tRMm6cW7d',
          search: 'checkered flag finish line animation',
        },
        place: 'above-captions',
      }),
    },
    {
      text: 'Your users still don’t have it.',
      visual: gif({
        src: 'section-01-still-nothing.gif',
        source: {
          provider: 'giphy',
          id: 'qZgHBlenHa1zKqy6Zn',
          search: 'cat staring at empty bowl',
        },
        playbackRate: 0.87,
        place: 'above-captions',
      }),
      endsParagraph: true,
    },
    {
      text: 'It’s built, it’s tested,',
      visual: gif({
        src: 'section-02-machine-working.gif',
        source: { provider: 'giphy', id: '3oEdv49tCsOOcl79Ac', search: '3d gears turning machine' },
        playbackRate: 0.86,
        place: 'above-captions',
      }),
    },
    {
      // Standing at a baggage carousel: the thing is finished and somewhere in a system you don't
      // control, and all you can do is wait at the belt.
      text: 'and it’s waiting behind another team’s release.',
      visual: gif({
        src: 'section-03-waiting.gif',
        source: {
          provider: 'giphy',
          id: 'uOrArovddNCm0fjz4O',
          search: 'airplane waiting on runway',
        },
        playbackRate: 0.71,
        place: 'above-captions',
      }),
    },
    {
      // Sped up so the whole year flips inside the beat; at full speed it only reaches July.
      text: 'Nobody told you that team ships once a month.',
      visual: gif({
        src: 'section-04-monthly-calendar.gif',
        source: {
          provider: 'giphy',
          id: 'd1GpZTVp2eV7gQk8',
          search: 'wall calendar animation illustration',
        },
        color: '#ffffff',
        playbackRate: 1.36,
        place: 'above-captions',
      }),
      endsParagraph: true,
    },
    {
      text: 'You’ve been telling your stakeholder it’s coming this week.',
      visual: gif({
        src: 'section-05-telling-stakeholder.gif',
        source: {
          provider: 'giphy',
          id: 'eFwA72kMRPoiwp92ha',
          search: 'typing message on phone close up',
        },
        place: 'above-captions',
      }),
    },
    {
      text: 'For three weeks.',
      visual: gif({
        src: 'section-06-time-dragging.gif',
        source: {
          provider: 'giphy',
          id: '0kZhz1UH8j2keHU3vS',
          search: 'clock hands spinning fast',
        },
        place: 'above-captions',
      }),
      endsParagraph: true,
    },
    {
      text: 'Done meant finished in your part of the system.',
      visual: gif({
        src: 'section-07-your-part.gif',
        source: {
          provider: 'giphy',
          id: 'N9a4q1vSAtWrv3F3qV',
          search: 'puzzle missing piece illustration',
        },
        playbackRate: 0.99,
        place: 'above-captions',
      }),
    },
    {
      text: 'That isn’t the same as live for your users.',
      visual: gif({
        src: 'section-08-switch-on.gif',
        source: {
          provider: 'giphy',
          id: '3o7TKFODjEUB1gjWPS',
          search: 'lightbulb turning on illustration',
        },
        color: '#ffffff',
        place: 'above-captions',
      }),
      endsParagraph: true,
    },
    {
      text: 'If you want to know where your feature actually is,',
      visual: gif({
        src: 'section-09-searching.gif',
        source: {
          provider: 'giphy',
          id: 'ZYnJxx4Wgh6xspkpG0',
          search: 'woman looking through binoculars',
        },
        playbackRate: 0.93,
        place: 'above-captions',
      }),
    },
    {
      text: 'we’re building a learning path for it.',
      visual: gif({
        src: 'section-10-learning-path.gif',
        source: {
          provider: 'giphy',
          id: 'xUPGcM9CazM9H5KrEA',
          search: 'stepping stones path illustration',
        },
        playbackRate: 0.92,
        place: 'above-captions',
      }),
      endsParagraph: true,
    },
    {
      text: 'By the end you’ll be able to follow one change',
      visual: gif({
        src: 'section-11-following-the-route.gif',
        source: {
          provider: 'giphy',
          id: '0X8xkjUvCkKMygYeoj',
          search: 'car driving top view road',
        },
        playbackRate: 0.93,
        place: 'above-captions',
      }),
    },
    {
      // Sped up so the whole chain finishes falling inside the beat.
      text: 'through review, testing, environments',
      visual: gif({
        src: 'section-12-route-of-stages.gif',
        source: { provider: 'giphy', id: 'QzASHIVqZlFQ4eQTV7', search: 'domino chain falling' },
        playbackRate: 0.78,
        place: 'above-captions',
      }),
    },
    {
      text: 'and every team it waits on,',
      visual: gif({
        src: 'section-13-chain-of-teams.gif',
        source: { provider: 'giphy', id: 'VtCrCSeLc1Ref320A9', search: 'chain links close up' },
        place: 'above-captions',
      }),
    },
    {
      text: 'and say exactly what’s holding it up.',
      visual: gif({
        src: 'section-14-marking-the-blocker.gif',
        source: {
          provider: 'giphy',
          id: 'xUOxeX1zdzqAvFbfqw',
          search: 'red marker circling on paper',
        },
        place: 'above-captions',
      }),
      endsParagraph: true,
    },
    {
      text: 'The waitlist link is in the comments.',
      visual: gif({
        src: 'section-15-pointing.gif',
        source: {
          provider: 'giphy',
          id: 'XCl8yrQkRPPyROoeJj',
          search: 'hand pointing down finger illustration',
        },
        color: '#ff5d03',
        place: 'above-captions',
      }),
    },
    {
      // Sped up so the pen stroke lands inside the beat.
      text: 'Sign up and we’ll let you know when the learning path opens.',
      visual: gif({
        src: 'section-16-signing-up.gif',
        source: {
          provider: 'giphy',
          id: 'rjfldjGpjhpxm',
          search: 'signing paper with pen close up',
        },
        playbackRate: 0.91,
        place: 'above-captions',
      }),
      endsParagraph: true,
    },
    {
      text: '[pause][curious] How often do you release new improvements for your users?',
      visual: gif({
        src: 'section-17-asking-you.gif',
        source: {
          provider: 'giphy',
          id: 'BbHAzBkwS0UydUwOEl',
          search: 'cute animal tilting head curious',
        },
        place: 'above-captions',
      }),
    },
  ],
})
