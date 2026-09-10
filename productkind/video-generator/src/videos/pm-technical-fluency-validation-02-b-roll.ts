import { clip, defineVideo, riveAtFrame } from '../narration/definition'

/**
 * A b-roll cut of "You only know the screens", the PM technical fluency campaign's video 2.
 * Script: productkind/marketing/content/campaigns/2026-09-pm-technical-fluency-validation/
 * video-2-you-only-know-the-screens/script.md
 *
 * Same narration as `pm-technical-fluency-validation-02`, so the audio cache serves this one the take it
 * already generated rather than paying ElevenLabs for the same words twice. The narration has to
 * stay character-identical for that to hold: edit the words here and this becomes a new take at
 * full price.
 *
 * Where that video cuts to a gif per clause, this one runs footage behind the captions and
 * changes picture every three to four seconds. The grouping comes from the narrated timeline
 * rather than a timer, so each cut still lands on a clause boundary: the 21 clauses are merged
 * into 15 runs, each as close to 3.5 seconds as the clause lengths allow.
 *
 * Footage is Tamas's own, from productkind's library, and no clip here appears in another b-roll
 * cut. Every clip is longer than the beat it covers, because `clip` has no playback rate and no
 * loop: a clip that ran out would hold a frozen frame while the captions and the parrot kept
 * moving, which reads as a broken render. Each file is trimmed to its beat plus a little
 * headroom, graded `eq=saturation=1.35:contrast=1.15`, and transcoded to H.264 with BT.709 tags,
 * since the originals are 10-bit HLG HEVC that Chromium cannot decode and that convert flat.
 */
export default defineVideo({
  id: 'pm-technical-fluency-validation-02-b-roll',
  voice: 'chloe',
  model: 'eleven_v3',
  overlays: [
    riveAtFrame({ rive: 'parrot-greet-00.riv', frame: 0 }),
    riveAtFrame({ rive: 'parrot-peek-00.riv', frame: 500 }),
  ],
  sections: [
    {
      // IMG_8638 2
      text: '“So how does your product work?”',
      visual: clip({ src: 'clip-00-laptop-asked.mp4' }),
    },
    {
      // IMG_8496
      text: 'You can demo every screen, and that’s as far as your answer goes.',
      visual: clip({ src: 'clip-01-screens-editor.mp4' }),
      endsParagraph: true,
    },
    {
      // IMG_8497
      text: 'Behind those screens is a service another team owns,',
      visual: clip({ src: 'clip-02-old-works.mp4' }),
    },
    {
      // IMG_8802
      text: 'three integrations, cloud storage you’ve never seen,',
      visual: clip({ src: 'clip-03-institution.mp4' }),
    },
    {
      // IMG_8754
      text: 'and a database somebody migrated last year.',
      visual: clip({ src: 'clip-04-fort-wall.mp4' }),
      endsParagraph: true,
    },
    {
      // IMG_8636
      text: 'So when the load test fails, you can’t tell if it’s your problem.',
      visual: clip({ src: 'clip-05-rough-water.mp4' }),
      endsParagraph: true,
    },
    {
      // IMG_8501
      text: 'You know the frontend and the backend.',
      visual: clip({ src: 'clip-06-bike-rack.mp4' }),
    },
    {
      // IMG_8699
      text: 'Nobody explains the infrastructure around them.',
      visual: clip({ src: 'clip-07-harbour-crane.mp4' }),
      endsParagraph: true,
    },
    {
      // IMG_8485
      text: 'If you want to understand that about your own product,',
      visual: clip({ src: 'clip-08-park-path.mp4' }),
    },
    {
      // IMG_8721
      text: 'that’s what we’re building a learning path for.',
      visual: clip({ src: 'clip-09-green-hill.mp4' }),
      endsParagraph: true,
    },
    {
      // IMG_8704
      text: 'By the end you’ll be able to map out your product:',
      visual: clip({ src: 'clip-10-island-buildings.mp4' }),
    },
    {
      // IMG_8718
      text: 'what it depends on, who owns each part, where it slows down,',
      visual: clip({ src: 'clip-11-bay-rocks.mp4' }),
    },
    {
      // IMG_8791
      text: 'and what breaks when one fails. The waitlist link is in the comments.',
      visual: clip({ src: 'clip-12-rooftops.mp4' }),
    },
    {
      // IMG_8631
      text: 'Sign up and we’ll let you know when the learning path opens.',
      visual: clip({ src: 'clip-13-open-sea.mp4' }),
      endsParagraph: true,
    },
    {
      // IMG_8514
      text: '[pause][curious] Which part of your product would you struggle to explain?',
      visual: clip({ src: 'clip-14-clear-shallows.mp4' }),
    },
  ],
})
