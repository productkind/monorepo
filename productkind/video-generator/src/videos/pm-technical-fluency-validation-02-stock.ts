import { clip, defineVideo, riveAtFrame } from '../narration/definition'

/**
 * A stock-footage cut of "You only know the screens", the PM technical fluency campaign's
 * video 2.
 * Script: productkind/marketing/content/campaigns/2026-09-pm-technical-fluency-validation/
 * video-2-you-only-know-the-screens/script.md
 *
 * Same narration as `pm-technical-fluency-validation-02`, so the audio cache serves this one the
 * take it already generated rather than paying ElevenLabs for the same words twice. The narration
 * has to stay character-identical for that to hold: edit the words here and this becomes a new
 * take at full price.
 *
 * Where that video cuts twenty-one times to a gif per clause, this one holds eleven clips of two
 * to six seconds. The grouping comes from the narrated timeline rather than a timer, so every cut
 * still lands on a clause boundary, and no run crosses a paragraph break.
 *
 * The script is about what is behind the screens, so the footage is the infrastructure nobody
 * shows you: stacked machines, a substation in a field, rails running out of focus, traffic backed
 * up from above.
 *
 * Footage is Pexels, whose licence allows commercial use with no attribution. Its rule that
 * identifiable people may not appear in a bad light is why no face carries any beat here; there
 * are no people in the cut at all. The API guidelines ask for a link back to Pexels, so credit it
 * in the description, and the photographer is recorded on each clip for the same reason.
 *
 * Every clip is a second longer than the beat it covers, because `clip` has no playback rate and
 * no loop: one that ran out would hold a frozen frame while the captions kept moving. Each file is
 * trimmed to its beat plus that second, stripped of audio and re-encoded to H.264 at CRF 23 with
 * BT.709 tags, and no grade is applied — stock arrives as SDR BT.709 already.
 */
export default defineVideo({
  id: 'pm-technical-fluency-validation-02-stock',
  voice: 'chloe',
  model: 'eleven_v3',
  overlays: [
    riveAtFrame({ rive: 'parrot-greet-00.riv', frame: 0 }),
    riveAtFrame({ rive: 'parrot-peek-00.riv', frame: 500 }),
  ],
  sections: [
    {
      // A keyboard and a screen, close. The whole of what the answer covers.
      text: 
        '“So how does your product work?” You can demo every screen, and that’s as far as ' +
        'your answer goes.',
      visual: clip({
        src: 'clip-00-screens-only.mp4',
        source: {
          provider: 'pexels',
          id: '27385370',
          search: 'laptop keyboard typing close up office',
          author: 'Diyorbek Mirzamakhmudov',
        },
      }),
      endsParagraph: true,
    },
    {
      // A wall of stacked beige towers and keyboards. Somebody else’s machines,
      // layered up and unlooked at. A metaphor rather than a literal service, and the best clean
      // option the search returned for one.
      text: 'Behind those screens is a service another team owns, three integrations,',
      visual: clip({
        src: 'clip-01-another-teams-service.mp4',
        source: {
          provider: 'pexels',
          id: '12271136',
          search: 'back of computer tower cables plugged',
          author: 'Sasha Poberailo',
        },
      }),
    },
    {
      // Sky, for the storage you have never seen. Pexels titles this one as having an aeroplane
      // in it; none appears in the trimmed span.
      text: 'cloud storage you’ve never seen, and a database somebody migrated last year.',
      visual: clip({
        src: 'clip-02-cloud-storage-sky.mp4',
        source: {
          provider: 'pexels',
          id: '19593874',
          search: 'clouds sky drifting blue',
          author: 'Teju',
        },
      }),
      endsParagraph: true,
    },
    {
      // Rails running away out of focus. When the test fails somewhere along the line,
      // this is how much of it you can see.
      text: 'So when the load test fails, you can’t tell if it’s your problem.',
      visual: clip({
        src: 'clip-03-whose-fault-tracks.mp4',
        source: {
          provider: 'pexels',
          id: '27627622',
          search: 'railway tracks junction switch',
          author: 'Rahime Gül',
        },
      }),
      endsParagraph: true,
    },
    {
      // A substation. The infrastructure nobody explains, doing its work in a field.
      text: 'You know the frontend and the backend. Nobody explains the infrastructure around them.',
      visual: clip({
        src: 'clip-04-infra-pylons.mp4',
        source: {
          provider: 'pexels',
          id: '34312355',
          search: 'electrical substation transformer pylons',
          author: 'Washi',
        },
      }),
      endsParagraph: true,
    },
    {
      // Fog lifting off a valley, which is what understanding your own product looks like.
      text: 
        'If you want to understand that about your own product, that’s what we’re building a ' +
        'learning path for.',
      visual: clip({
        src: 'clip-05-understanding-clarity.mp4',
        source: {
          provider: 'pexels',
          id: '34855836',
          search: 'fog clearing revealing view',
          author: 'just a hobby',
        },
      }),
      endsParagraph: true,
    },
    {
      // Branches against the sky, splitting and splitting. What it depends on.
      text: 'By the end you’ll be able to map out your product: what it depends on,',
      visual: clip({
        src: 'clip-06-map-dependencies-branches.mp4',
        source: {
          provider: 'pexels',
          id: '30744981',
          search: 'roots tree branching underground',
          author: 'Teju',
        },
      }),
    },
    {
      // Traffic backed up from above: where it slows down, and what happens to everything
      // behind the part that stopped.
      text: 'who owns each part, where it slows down, and what breaks when one fails.',
      visual: clip({
        src: 'clip-07-slows-down-traffic.mp4',
        source: {
          provider: 'pexels',
          id: '27776010',
          search: 'traffic jam aerial highway congestion',
          author: 'FAYSAL KHAN',
        },
      }),
      endsParagraph: true,
    },
    {
      // Embers falling through the dark, so the movement on the CTA beat is downward.
      text: 'The waitlist link is in the comments.',
      visual: clip({
        src: 'clip-08-waitlist-link-below.mp4',
        source: {
          provider: 'pexels',
          id: '34326290',
          search: 'confetti falling slow motion dark',
          author: 'Nicola Narracci',
        },
      }),
    },
    {
      // A track opening through woodland, for the line about the path opening. The
      // weakest link in the cut: pm-technical-fluency-validation-01-stock also turns on a path
      // through trees, and although that one is a paved road seen from car height against this
      // ground-level dirt track, it is the same idea twice in one campaign.
      text: 'Sign up and we’ll let you know when the learning path opens.',
      visual: clip({
        src: 'clip-09-learning-path-opens.mp4',
        source: {
          provider: 'pexels',
          id: '36527164',
          search: 'path through forest opening clearing',
          author: 'Rüveyda Akkaya',
        },
      }),
      endsParagraph: true,
    },
    {
      // A row of lit bulbs with one dark. Which part would you struggle to explain.
      text: '[pause][curious] Which part of your product would you struggle to explain?',
      visual: clip({
        src: 'clip-10-which-part-explain.mp4',
        source: {
          provider: 'pexels',
          id: '32054940',
          search: 'one unlit bulb string lights row',
          author: 'Alberto Escalona',
        },
      }),
    },
  ],
})
