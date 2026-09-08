import { clip, defineVideo, riveAtFrame } from '../narration/definition'

/**
 * A second cut of "Your app works. Customers get stuck.", the vibe coder campaign's video 0.
 * Script: productkind/marketing/content/campaigns/2026-09-vibe-coder-validation/
 * video-1-real-product-not-prototype/script.md
 *
 * Same narration as `vibe-coder-validation-01`, so the audio cache serves this one the take it
 * already generated rather than paying ElevenLabs for the same words twice. The narration has to
 * stay character-identical for that to hold: edit the words here and this becomes a new take at
 * full price.
 *
 * Where `pm-technical-fluency-validation-01-b-roll` holds five long clips on the paragraph
 * breaks, this one cuts every three to four seconds — fourteen clips over the same 49.8 seconds,
 * which keeps an ambient backdrop moving without the picture ever explaining the line. The
 * grouping comes from the narrated timeline rather than a timer, so each cut still lands on a
 * clause boundary: the nineteen clauses are merged into fourteen runs, each as close to 3.5
 * seconds as the clause lengths allow.
 *
 * Footage is Tamas's own, from productkind's library. Every clip is longer than the beat it
 * covers, because `clip` has no playback rate and no loop: a clip that ran out would hold a
 * frozen frame while the captions and the parrot kept moving, which reads as a broken render.
 * Each file is trimmed to its beat plus a little headroom, graded
 * `eq=saturation=1.35:contrast=1.15`, and transcoded to H.264 with BT.709 tags, since the
 * originals are 10-bit HLG HEVC that Chromium cannot decode and that convert flat.
 *
 * Nothing here repeats a clip from the PM fluency b-roll cut, so the two can run in the same
 * feed without sharing a shot.
 */
export default defineVideo({
  id: 'vibe-coder-validation-01-b-roll',
  voice: 'chloe',
  model: 'eleven_v3',
  overlays: [
    riveAtFrame({ rive: 'parrot-greet-00.riv', frame: 0 }),
    riveAtFrame({ rive: 'parrot-peek-00.riv', frame: 500 }),
  ],
  sections: [
    {
      // A laptop with an app open on it: the thing that works.
      text: 'The app you built with AI works. But customers get stuck.',
      visual: clip({ src: 'clip-00-laptop-app.mp4' }),
      endsParagraph: true,
    },
    {
      // A handsome facade in full sun. Everything presentable, from the front.
      text: 'The preview looked perfect. Then the confirmation email never arrived.',
      visual: clip({ src: 'clip-01-town-hall.mp4' }),
    },
    {
      // An order arriving on a tray: paid for, handed over.
      text: 'Another customer reached checkout, paid,',
      visual: clip({ src: 'clip-02-coffee-served.mp4' }),
    },
    {
      // A gateway you cannot see through until you are in it.
      text: 'and couldn’t tell what would happen next. You built the core feature.',
      visual: clip({ src: 'clip-03-stone-gateway.mp4' }),
    },
    {
      // A gate across the way, with the ground open behind it.
      text: 'The full customer journey still has gaps.',
      visual: clip({ src: 'clip-04-iron-gate.mp4' }),
      endsParagraph: true,
    },
    {
      // A path over the headland that carries on out of frame.
      text: 'A real product has to work all the way through:',
      visual: clip({ src: 'clip-05-headland-path.mp4' }),
    },
    {
      // A cobbled lane: the same route, one stone at a time.
      text: 'account, core workflow, payment,',
      visual: clip({ src: 'clip-06-cobbled-lane.mp4' }),
    },
    {
      // A boat crossing the bay, on its way in.
      text: 'email and the result you promised.',
      visual: clip({ src: 'clip-07-sailboat.mp4' }),
      endsParagraph: true,
    },
    {
      // A planted path in flower. The turn in the script.
      text:
        'If you want to prepare your app for real customers, that’s what we’re building a ' +
        'learning path for.',
      visual: clip({ src: 'clip-08-lavender-path.mp4' }),
      endsParagraph: true,
    },
    {
      // An avenue of trees, the whole length of it visible at once.
      text: 'By the end, you’ll map the main journey, test every step and common failure,',
      visual: clip({ src: 'clip-09-tree-avenue.mp4' }),
    },
    {
      // A laptop with a document open on it: the list of what is left.
      text: 'and create a launch checklist for the parts that still need work.',
      visual: clip({ src: 'clip-10-laptop-list.mp4' }),
      endsParagraph: true,
    },
    {
      // A square with people in it, which is where a comment thread happens.
      text: 'The waitlist link is in the comments.',
      visual: clip({ src: 'clip-11-town-square.mp4' }),
    },
    {
      // The bay opening out past the last of the rocks.
      text: 'Sign up and we’ll let you know when the learning path opens.',
      visual: clip({ src: 'clip-12-bay-opens.mp4' }),
      endsParagraph: true,
    },
    {
      // A harbour: where a crossing ends, for the question that closes on an ending.
      text: '[pause][curious] Where does your customer journey stop today?',
      visual: clip({ src: 'clip-13-harbour.mp4' }),
    },
  ],
})
