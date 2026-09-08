import { clip, defineVideo, riveAtFrame } from '../narration/definition'

/**
 * A second cut of "Nodding along in a stand-up", the PM technical fluency campaign's video 0.
 * Script: productkind/marketing/content/campaigns/2026-09-pm-technical-fluency-validation/
 * video-1-nodding-along-in-stand-up/script.md
 *
 * Same narration as `pm-technical-fluency-validation-01`, so the audio cache serves this one the
 * take it already generated rather than paying ElevenLabs for the same words twice. The narration
 * has to stay character-identical for that to hold: edit the words here and this becomes a new
 * take at full price.
 *
 * Where that video cuts eighteen times to a gif per clause, this one holds five ambient clips
 * that run full-bleed behind the captions. The cuts fall on the script's paragraph breaks, so the
 * picture changes where the narration changes subject rather than on a timer, and the sections
 * are the paragraphs rather than the clauses.
 *
 * Footage is Tamas's own, from productkind's library. Every clip is longer than the beat it
 * covers, because `clip` has no playback rate and no loop: a clip that ran out would hold a
 * frozen frame while the captions and the parrot kept moving, which reads as a broken render.
 * Each file is already trimmed to its beat plus a little headroom and transcoded to H.264, since
 * the originals are 10-bit HEVC that Chromium cannot decode.
 */
export default defineVideo({
  id: 'pm-technical-fluency-validation-01-b-roll',
  voice: 'chloe',
  model: 'eleven_v3',
  overlays: [
    riveAtFrame({ rive: 'parrot-greet-00.riv', frame: 0 }),
    riveAtFrame({ rive: 'parrot-peek-00.riv', frame: 500 }),
  ],
  sections: [
    {
      // IMG_8560: a city square, a band playing, people crossing. The public room the script
      // opens in, and busy enough that one more voice in it would not be missed.
      text:
        'You’ve nodded along in a stand-up, hoping nobody asks you a follow-up question. ' +
        'Someone says the migration is blocked by the platform team. ' +
        'You don’t know what that means for your release.',
      visual: clip({ src: 'section-00-square-band.mp4' }),
      endsParagraph: true,
    },
    {
      // IMG_8535: a working harbour, cranes idle, flat grey water. Three weeks of nothing moving.
      text: 'So you don’t ask. Three weeks later, that blocker is why your release date moves.',
      visual: clip({ src: 'section-01-harbour-still.mp4' }),
      endsParagraph: true,
    },
    {
      // IMG_8504: a bookshop, people reading. Where you go to look a word up afterwards.
      text:
        'Nobody taught you those words. Looking up a definition afterwards ' +
        'doesn’t tell you what it means for your release.',
      visual: clip({ src: 'section-02-bookshop.mp4' }),
      endsParagraph: true,
    },
    {
      // IMG_8581: a path through trees with the sun coming down it. The turn in the script, and
      // the one beat where the picture is allowed to be literal about a learning path.
      text:
        'If you’d rather be the one who asks these questions, we’re building a learning path ' +
        'for exactly this. By the end you’ll say a change back in your own words, ask what it ' +
        'does to your product, and understand the answer while you’re in the meeting.',
      visual: clip({ src: 'section-03-forest-path.mp4' }),
      endsParagraph: true,
    },
    {
      // IMG_8619: a jetty out into open water. Somewhere to step off from, for the ask.
      text:
        'The waitlist link is in the comments. Sign up and we’ll let you know when the learning ' +
        'path opens. [pause][curious] What technical word did you look up last?',
      visual: clip({ src: 'section-04-jetty-open-water.mp4' }),
    },
  ],
})
