import { clip, defineVideo, riveAtFrame } from '../narration/definition'

/**
 * A b-roll cut of "All you can send is their screenshot", the PM technical fluency campaign's video 5.
 * Script: productkind/marketing/content/campaigns/2026-09-pm-technical-fluency-validation/
 * video-5-all-you-can-send-is-their-screenshot/script.md
 *
 * Same narration as `pm-technical-fluency-validation-05`, so the audio cache serves this one the take it already
 * generated rather than paying ElevenLabs for the same words twice. The narration has to stay
 * character-identical for that to hold: edit the words here and this becomes a new take at full
 * price.
 *
 * 19 clauses merged into 11 runs of one and a half to five seconds, no run crossing a
 * paragraph break. Footage is Tamas's own, from productkind's library.
 *
 * The library no longer covers a cut on its own: 5 b-roll cuts in, only sixteen unused portrait
 * clips were left and they suited neither script. So this cut reuses footage from the *other*
 * campaign's cuts, which was the call made when that ran out. Nothing here repeats inside this
 * campaign, so the two cuts a viewer is likely to see together share no shot; a clip may recur
 * across campaigns.
 *
 * Every clip is a second longer than the beat it covers, because `clip` has no playback rate and
 * no loop: one that ran out would hold a frozen frame while the captions and the parrot kept
 * moving. Each file is trimmed to its beat plus that second, cropped to fill 1080x1920, graded
 * `eq=saturation=1.35:contrast=1.15` and transcoded to H.264 with BT.709 tags, since the
 * originals are 10-bit HLG HEVC that Chromium cannot decode and that convert flat.
 */
export default defineVideo({
  id: 'pm-technical-fluency-validation-05-b-roll',
  voice: 'chloe',
  model: 'eleven_v3',
  overlays: [
    riveAtFrame({ rive: 'parrot-greet-00.riv', frame: 0 }),
    riveAtFrame({ rive: 'parrot-peek-00.riv', frame: 500 }),
  ],
  sections: [
    {
      // IMG_8447: A laptop with the app open. All you can send on is a picture of it.
      text: 'A customer reports a bug. All you can send engineering is their screenshot.',
      visual: clip({ src: 'clip-00-screen-you-can-only-photograph.mp4' }),
      endsParagraph: true,
    },
    {
      // IMG_8589: Reeds and still water at dusk. The questions come back and nothing moves.
      text: 'It comes back as questions. Who was it?',
      visual: clip({ src: 'clip-01-dusk-reeds.mp4' }),
    },
    {
      // IMG_8706: A mossy stone wall, nothing to read off it.
      text: 'What did they do? What did the error say?',
      visual: clip({ src: 'clip-02-blank-wall.mp4' }),
      endsParagraph: true,
    },
    {
      // IMG_8510: Flat grey sea to the horizon. Two days of it.
      text: 'So you ask the customer, wait two days, and nobody has started looking.',
      visual: clip({ src: 'clip-03-flat-sea-waiting.mp4' }),
      endsParagraph: true,
    },
    {
      // IMG_8484: An avenue of trees, the whole length visible at once.
      text: 'You could answer all of it yourself, if somebody showed you where to look.',
      visual: clip({ src: 'clip-04-avenue-clear-view.mp4' }),
      endsParagraph: true,
    },
    {
      // IMG_8764: A path through the park, somewhere to start.
      text:
        'If you want to be the one who investigates it first, we’re building a ' +
        'learning path for it.',
      visual: clip({ src: 'clip-05-park-path.mp4' }),
      endsParagraph: true,
    },
    {
      // IMG_8531: A laptop open on a train window seat. Doing it on your own machine.
      text: 'By the end you’ll reproduce the bug on your own account,',
      visual: clip({ src: 'clip-06-laptop-own-account.mp4' }),
    },
    {
      // IMG_8832: Looking through an iron gate, one bar at a time.
      text: 'read the status code, and find the failed request in the network tab ' + 'yourself.',
      visual: clip({ src: 'clip-07-iron-grid.mp4' }),
      endsParagraph: true,
    },
    {
      // IMG_8664: A square with people in it, which is where a comment thread happens.
      text: 'The waitlist link is in the comments.',
      visual: clip({ src: 'clip-08-town-square.mp4' }),
    },
    {
      // IMG_8477: A civic building in full sun, doors on the square.
      text: 'Sign up and we’ll let you know when the learning path opens.',
      visual: clip({ src: 'clip-09-town-hall-sun.mp4' }),
      endsParagraph: true,
    },
    {
      // IMG_8622: A small boat a long way out on flat water, going nowhere in particular.
      text: '[pause][curious] How long does a bug wait before fixing where you work?',
      visual: clip({ src: 'clip-10-boat-adrift.mp4' }),
    },
  ],
})
