import { clip, defineVideo, riveAtFrame } from '../narration/definition'

/**
 * A b-roll cut of "Your app goes down on Saturday", the vibe coder campaign's video 5.
 * Script: productkind/marketing/content/campaigns/2026-09-vibe-coder-validation/
 * video-5-keep-the-product-operable/script.md
 *
 * Same narration as `vibe-coder-validation-05`, so the audio cache serves this one the take it
 * already generated rather than paying ElevenLabs for the same words twice. The narration has to
 * stay character-identical for that to hold: edit the words here and this becomes a new take at
 * full price.
 *
 * Nineteen clauses merged into fourteen runs of two to five and a half seconds, no run crossing a
 * paragraph break. The stock cut of this video uses the same fourteen runs, so the two can be
 * compared shot for shot.
 *
 * Footage is Tamas's own, from productkind's library. The library grew before this cut, so every
 * clip here is one nothing else has used — no reuse was needed, unlike the two cuts before it.
 * Note the new files are named `PXL_*` rather than `IMG_*`, which the usage scan that finds
 * already-spent footage has to allow for.
 *
 * Every clip is a second longer than the beat it covers, because `clip` has no playback rate and
 * no loop: one that ran out would hold a frozen frame while the captions and the parrot kept
 * moving. Each file is trimmed to its beat plus that second, cropped to fill 1080x1920, graded
 * `eq=saturation=1.35:contrast=1.15` and transcoded to H.264 with BT.709 tags, since the
 * originals are 10-bit HLG HEVC that Chromium cannot decode and that convert flat.
 */
export default defineVideo({
  id: 'vibe-coder-validation-05-b-roll',
  voice: 'chloe',
  model: 'eleven_v3',
  overlays: [
    riveAtFrame({ rive: 'parrot-greet-00.riv', frame: 0 }),
    riveAtFrame({ rive: 'parrot-peek-00.riv', frame: 500 }),
  ],
  sections: [
    {
      // IMG_2690: A shoreline after dark. Saturday, and nobody is looking at it.
      text: 'The app you built with AI goes down on Saturday.',
      visual: clip({ src: 'clip-00-dark-shore-night.mp4' }),
    },
    {
      // PXL_20260206_025310218: An animal up on its hind legs on a rock, watching. The one who spots it first.
      text: 'Who notices it first?',
      visual: clip({ src: 'clip-01-lookout-alert.mp4' }),
      endsParagraph: true,
    },
    {
      // PXL_20260319_103205161: Water beading on a leaf. Something alive that has to be kept that way.
      text: 'A live app needs ongoing care. A service can fail,',
      visual: clip({ src: 'clip-02-leaf-holding-water.mp4' }),
    },
    {
      // PXL_20260801_165024336: The wake behind a boat. The ground moving under a running thing.
      text: 'a platform can change or your next update can break the live version.',
      visual: clip({ src: 'clip-03-wake-churning.mp4' }),
      endsParagraph: true,
    },
    {
      // PXL_20260710_172211180: A single pontoon out over open water. A recovery plan with one plank in it.
      text: 'If the only recovery plan is asking the AI to fix it,',
      visual: clip({ src: 'clip-04-thin-pontoon.mp4' }),
    },
    {
      // PXL_20260207_110206786: A service tunnel running away into the dark, one green light in it.
      text: 'every outage starts with guessing.',
      visual: clip({ src: 'clip-05-tunnel-no-end.mp4' }),
      endsParagraph: true,
    },
    {
      // PXL_20260710_141715945: Cranes standing over a working quay, kept ready rather than kept busy.
      text:
        'You need alerts, a tested backup and a recovery checklist you can follow ' + 'yourself.',
      visual: clip({ src: 'clip-06-harbour-cranes-ready.mp4' }),
      endsParagraph: true,
    },
    {
      // PXL_20260711_050108866: A horse on a track, still there, still fed.
      text: 'If you want an app you can keep operating after launch,',
      visual: clip({ src: 'clip-07-horse-standing.mp4' }),
    },
    {
      // PXL_20260416_064922297: Old trees leaning out over the water, grown into the place.
      text: 'that’s what we’re building a learning path for.',
      visual: clip({ src: 'clip-08-trees-over-water.mp4' }),
      endsParagraph: true,
    },
    {
      // PXL_20260801_174714602: The sun sitting right on the horizon line. A signal you can actually see.
      text: 'By the end, you’ll set an availability alert,',
      visual: clip({ src: 'clip-09-sun-on-the-horizon.mp4' }),
    },
    {
      // PXL_20260416_064603919: A kept bank running down to the water, mown and edged.
      text:
        'practise restoring a working version and plan your updates, backups and ' + 'cost checks.',
      visual: clip({ src: 'clip-10-tended-bank.mp4' }),
      endsParagraph: true,
    },
    {
      // PXL_20260711_073842441: Geese wandering between cafe chairs, where people gather and talk.
      text: 'The waitlist link is in the comments.',
      visual: clip({ src: 'clip-11-geese-by-the-chairs.mp4' }),
    },
    {
      // PXL_20260801_165935748: A headland at dusk with the water opening out past it.
      text: 'Sign up and we’ll let you know when the learning path opens.',
      visual: clip({ src: 'clip-12-headland-opening.mp4' }),
      endsParagraph: true,
    },
    {
      // PXL_20260801_165008975: An island offshore, going quiet.
      text: '[pause][curious] How would you know your app was down?',
      visual: clip({ src: 'clip-13-island-at-dusk.mp4' }),
    },
  ],
})
