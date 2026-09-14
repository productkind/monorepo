import { clip, defineVideo, riveAtFrame } from '../narration/definition'

/**
 * A b-roll cut of "Would you take a payment today?", the vibe coder campaign's video 4.
 * Script: productkind/marketing/content/campaigns/2026-09-vibe-coder-validation/
 * video-4-customer-data-and-money/script.md
 *
 * Same narration as `vibe-coder-validation-04`, so the audio cache serves this one the take it already
 * generated rather than paying ElevenLabs for the same words twice. The narration has to stay
 * character-identical for that to hold: edit the words here and this becomes a new take at full
 * price.
 *
 * 19 clauses merged into 14 runs of one and a half to five seconds, no run crossing a
 * paragraph break. Footage is Tamas's own, from productkind's library.
 *
 * The library no longer covers a cut on its own: 4 b-roll cuts in, only sixteen unused portrait
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
  id: 'vibe-coder-validation-04-b-roll',
  voice: 'chloe',
  model: 'eleven_v3',
  overlays: [
    riveAtFrame({ rive: 'parrot-greet-00.riv', frame: 0 }),
    riveAtFrame({ rive: 'parrot-peek-00.riv', frame: 500 }),
  ],
  sections: [
    {
      // IMG_9104: A glass and a small card left on a plate. The moment money changes hands.
      text: 'Would you take a payment today?',
      visual: clip({ src: 'clip-00-bill-on-the-table.mp4' }),
      endsParagraph: true,
    },
    {
      // IMG_8497: A solid old building with ivy across it. Something a customer hands their details to.
      text: 'What is that customer trusting you with?',
      visual: clip({ src: 'clip-01-brick-and-ivy.mp4' }),
    },
    {
      // IMG_8507: Rows and rows of spines, everything on show. Records anyone walking past can read.
      text:
        'Can one customer see another person’s data? Are private keys visible in ' + 'the browser?',
      visual: clip({ src: 'clip-02-shelves-of-records.mp4' }),
    },
    {
      // IMG_9001: A laptop open on a cafe table, mid-transaction.
      text: 'Does checkout charge the right amount and send the right confirmation?',
      visual: clip({ src: 'clip-03-laptop-cafe-order.mp4' }),
      endsParagraph: true,
    },
    {
      // IMG_8868: Driftwood and stones heaped on the shore. Everything else that piles up behind a launch.
      text: 'Then there are backups, cookie consent, terms and a privacy policy.',
      visual: clip({ src: 'clip-04-driftwood-piled.mp4' }),
      endsParagraph: true,
    },
    {
      // IMG_8704: A working waterfront, read at a glance.
      text: 'You need practical checks and clear signs that tell you',
      visual: clip({ src: 'clip-05-harbour-town.mp4' }),
    },
    {
      // IMG_8754: A fortress tower. The authority you call when it stops being your call.
      text: 'when the app needs a security or legal professional.',
      visual: clip({ src: 'clip-06-fort-tower.mp4' }),
      endsParagraph: true,
    },
    {
      // IMG_8614: A table laid with care, plants around it. Handling something properly.
      text: 'If you want to handle customer data and money responsibly,',
      visual: clip({ src: 'clip-07-tended-table.mp4' }),
    },
    {
      // IMG_8581: A path through pines with the sun down it.
      text: 'that’s what we’re building a learning path for.',
      visual: clip({ src: 'clip-08-sunlit-path.mp4' }),
      endsParagraph: true,
    },
    {
      // IMG_8791: A lane between high walls, one way through. Access, one gate at a time.
      text: 'By the end, you’ll test access, permissions, payments and backups,',
      visual: clip({ src: 'clip-09-walled-lane.mp4' }),
    },
    {
      // IMG_8496: A laptop screen in a dim room, a record being kept.
      text: 'and record the risks that still need specialist help.',
      visual: clip({ src: 'clip-10-screen-dark.mp4' }),
      endsParagraph: true,
    },
    {
      // IMG_8714: Green bank running down to open water.
      text: 'The waitlist link is in the comments.',
      visual: clip({ src: 'clip-11-green-water-edge.mp4' }),
    },
    {
      // IMG_7647: A willow leaning over still water, opening out.
      text: 'Sign up and we’ll let you know when the learning path opens.',
      visual: clip({ src: 'clip-12-willow-water.mp4' }),
      endsParagraph: true,
    },
    {
      // IMG_8511: Clear water over pebbles. You can see all the way to the bottom, or you cannot.
      text: '[pause][curious] Which safety check are you least sure about?',
      visual: clip({ src: 'clip-13-clear-shallows.mp4' }),
    },
  ],
})
