import { clip, defineVideo, riveAtFrame } from '../narration/definition'

/**
 * A stock-footage cut of "Your app works. Customers get stuck.", the vibe coder campaign's
 * video 1.
 * Script: productkind/marketing/content/campaigns/2026-09-vibe-coder-validation/
 * video-1-real-product-not-prototype/script.md
 *
 * Same narration as `vibe-coder-validation-01`, so the audio cache serves this one the take it
 * already generated rather than paying ElevenLabs for the same words twice. The narration has to
 * stay character-identical for that to hold: edit the words here and this becomes a new take at
 * full price.
 *
 * Where that video cuts nineteen times to a gif per clause, this one holds twelve clips of two
 * and a half to five and a half seconds. The grouping comes from the narrated timeline rather
 * than a timer, so every cut still lands on a clause boundary, and no run crosses a paragraph
 * break.
 *
 * The script is about a journey with gaps in it, so the footage is thresholds and sequences: a
 * production line, a wreck offshore, a walkway the length of a terminal, arch after arch,
 * footprints over a dune, a road that stops being visible.
 *
 * Footage is Pexels, whose licence allows commercial use with no attribution. Its rule that
 * identifiable people may not appear in a bad light is why no face carries a beat about being
 * stuck; the only people are a pair of hands paying and a pair ticking boxes. The API guidelines
 * ask for a link back to Pexels, so credit it in the description.
 *
 * Every clip is a second longer than the beat it covers, because `clip` has no playback rate and
 * no loop: one that ran out would hold a frozen frame while the captions kept moving. Each file is
 * trimmed to its beat plus that second, stripped of audio and re-encoded to H.264 at CRF 23 with
 * BT.709 tags, and no grade is applied — stock arrives as SDR BT.709 already.
 */
export default defineVideo({
  id: 'vibe-coder-validation-01-stock',
  voice: 'chloe',
  model: 'eleven_v3',
  overlays: [
    riveAtFrame({ rive: 'parrot-greet-00.riv', frame: 0 }),
    riveAtFrame({ rive: 'parrot-peek-00.riv', frame: 500 }),
  ],
  sections: [
    {
      // A production line running smoothly and impersonally. The machine works; that was never the
      // question.
      text: 'The app you built with AI works. But customers get stuck.',
      visual: clip({
        src: 'clip-00-conveyor-line.mp4',
        source: {
          provider: 'pexels',
          id: '38362060',
          search: 'conveyor belt factory line',
          author: 'Dmitriy Steinke',
        },
      }),
      endsParagraph: true,
    },
    {
      // Light through a dusty window onto nothing happening. The loosest fit in the cut: absence is
      // hard to film, and four rounds of literal empty boxes and dark phone screens all turned out
      // to show something arriving instead.
      text: 'The preview looked perfect. Then the confirmation email never arrived.',
      visual: clip({
        src: 'clip-01-nothing-arrived.mp4',
        source: {
          provider: 'pexels',
          id: '33447617',
          search: 'dust floating in sunbeam',
          author: 'From Salih',
        },
      }),
    },
    {
      // A card held to a terminal. The payment goes through, which is exactly as far as it goes.
      text: 'Another customer reached checkout, paid, and couldn’t tell what would happen next.',
      visual: clip({
        src: 'clip-02-card-terminal.mp4',
        source: {
          provider: 'pexels',
          id: '7669659',
          search: 'contactless payment terminal',
          author: 'Ivan S',
        },
      }),
      endsParagraph: true,
    },
    {
      // A wreck breaking the surface offshore: something built that did not make it all the way.
      text: 'You built the core feature. The full customer journey still has gaps.',
      visual: clip({
        src: 'clip-03-shipwreck-gaps.mp4',
        source: {
          provider: 'pexels',
          id: '39008583',
          search: 'broken wooden walkway gap',
          author: 'Margo Evardson',
        },
      }),
      endsParagraph: true,
    },
    {
      // A moving walkway running the length of a terminal, for the line about working all the way
      // through.
      text: 'A real product has to work all the way through:',
      visual: clip({
        src: 'clip-04-travelator.mp4',
        source: {
          provider: 'pexels',
          id: '34739689',
          search: 'long tunnel corridor light',
          author: 'Emrul Kausar Emon',
        },
      }),
    },
    {
      // Arch after arch receding to a bright opening, which is the shape of the list the narration is
      // reading out.
      text: 'account, core workflow, payment, email and the result you promised.',
      visual: clip({
        src: 'clip-05-colonnade-arches.mp4',
        source: {
          provider: 'pexels',
          id: '35072875',
          search: 'row of arches colonnade',
          author: 'Samar Layek',
        },
      }),
      endsParagraph: true,
    },
    {
      // A boardwalk leading forward. The turn in the script, and a path someone built rather than
      // one that was already there.
      text: 
        'If you want to prepare your app for real customers, that’s what we’re building a ' +
        'learning path for.',
      visual: clip({
        src: 'clip-06-boardwalk-path.mp4',
        source: {
          provider: 'pexels',
          id: '38877998',
          search: 'boardwalk over dunes',
          author: 'Marlon Castor',
        },
      }),
      endsParagraph: true,
    },
    {
      // Footprints crossing a dune: every step, one at a time. The warmest frame in the cut, on the
      // beat where the video stops describing the problem.
      text: 'By the end, you’ll map the main journey, test every step and common failure,',
      visual: clip({
        src: 'clip-07-footprints-dunes.mp4',
        source: {
          provider: 'pexels',
          id: '34535413',
          search: 'footprints in sand',
          author: 'Ahmed',
        },
      }),
    },
    {
      // Boxes being ticked by hand. The handwriting is scribble rather than words, so nothing legible
      // competes with the captions.
      text: 'and create a launch checklist for the parts that still need work.',
      visual: clip({
        src: 'clip-08-checklist-ticks.mp4',
        source: {
          provider: 'pexels',
          id: '36633851',
          search: 'clipboard checklist ticking',
          author: 'Jakub Zerdzicki',
        },
      }),
      endsParagraph: true,
    },
    {
      // A curtain of falling water, so the movement on the CTA beat is downward.
      text: 'The waitlist link is in the comments.',
      visual: clip({
        src: 'clip-09-water-falling.mp4',
        source: {
          provider: 'pexels',
          id: '34512262',
          search: 'waterfall close up water falling',
          author: 'Earth Photart',
        },
      }),
    },
    {
      // An archway with steps leading through it, for the line about the learning path opening.
      text: 'Sign up and we’ll let you know when the learning path opens.',
      visual: clip({
        src: 'clip-10-archway-opens.mp4',
        source: {
          provider: 'pexels',
          id: '39316439',
          search: 'gate opening garden path',
          author: 'Yaşar Başkurt',
        },
      }),
      endsParagraph: true,
    },
    {
      // A road disappearing into fog. The closing question asks where the journey stops, and this is
      // a road that stops being visible.
      text: '[pause][curious] Where does your customer journey stop today?',
      visual: clip({
        src: 'clip-11-road-into-fog.mp4',
        source: {
          provider: 'pexels',
          id: '29533736',
          search: 'misty path fading distance',
          author: 'Mesut Yalçın',
        },
      }),
    },
  ],
})
