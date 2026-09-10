import { clip, defineVideo, riveAtFrame } from '../narration/definition'

/**
 * A stock-footage cut of "You said yes to a simple feature", the PM technical fluency campaign's
 * video 3.
 * Script: productkind/marketing/content/campaigns/2026-09-pm-technical-fluency-validation/
 * video-3-said-yes-to-a-simple-feature/script.md
 *
 * Same narration as `pm-technical-fluency-validation-03`, so the audio cache serves this one the
 * take it already generated rather than paying ElevenLabs for the same words twice. The narration
 * has to stay character-identical for that to hold: edit the words here and this becomes a new
 * take at full price.
 *
 * Thirteen clips of two to six seconds, grouped exactly as the b-roll cut of the same video is, so
 * both cuts change picture on the same words. The grouping comes from the narrated timeline rather
 * than a timer, so every cut lands on a clause boundary and no run crosses a paragraph break.
 *
 * The script is about being locked out of somebody else's system and then getting a look inside,
 * so the first half is things that are shut — a padlocked gate, a sealed wax stamp, a gap in a
 * mesh, valves closed — and the second half is things being opened and read.
 *
 * Footage is Pexels, whose licence allows commercial use with no attribution. Its rule that
 * identifiable people may not appear in a bad light is why every beat where the PM is caught out
 * is carried by objects and machinery; the only person is at a window on the closing question. The
 * API guidelines ask for a link back to Pexels, so credit it in the description, and the
 * photographer is recorded on each clip for the same reason.
 *
 * One thing to know when re-sourcing: Pexels' poster frame sometimes serves different footage from
 * the file behind it. Three such mismatches were caught on this cut alone — posters of a
 * lighthouse and of roller shutters that delivered a dancer, a camera lens and a derelict house —
 * all of them invisible until the downloaded file was sampled. Judge on the contact sheet.
 *
 * Every clip is a second longer than the beat it covers, because `clip` has no playback rate and
 * no loop: one that ran out would hold a frozen frame while the captions kept moving. Each file is
 * trimmed to its beat plus that second, stripped of audio and re-encoded to H.264 at CRF 23 with
 * BT.709 tags, and no grade is applied — stock arrives as SDR BT.709 already.
 */
export default defineVideo({
  id: 'pm-technical-fluency-validation-03-stock',
  voice: 'chloe',
  model: 'eleven_v3',
  overlays: [
    riveAtFrame({ rive: 'parrot-greet-00.riv', frame: 0 }),
    riveAtFrame({ rive: 'parrot-peek-00.riv', frame: 500 }),
  ],
  sections: [
    {
      // A padlocked gate. What "just sync it with the CRM" turns out to mean.
      text: 'A stakeholder asked for something simple. Just sync it with the CRM.',
      visual: clip({
        src: 'clip-00-locked-simple-ask.mp4',
        source: {
          provider: 'pexels',
          id: '33117481',
          search: 'padlocked gate close up',
          author: 'Anh Nguyen',
        },
      }),
      endsParagraph: true,
    },
    {
      // A wax seal pressed home. You said yes, and it set.
      text: 'You said yes. Two weeks in,',
      visual: clip({
        src: 'clip-01-sealed-yes.mp4',
        source: {
          provider: 'pexels',
          id: '6424073',
          search: 'wax seal stamping close up',
          author: 'Anna Tarazevich',
        },
      }),
    },
    {
      // Light coming through a gap in a metal mesh: the field the integration has
      // not got.
      text: 'engineering tells you the integration doesn’t have that field, and it’s the vendor’s system.',
      visual: clip({
        src: 'clip-02-gap-in-the-mesh.mp4',
        source: {
          provider: 'pexels',
          id: '20641135',
          search: 'jigsaw puzzle piece missing gap',
          author: 'Süleyman Karakurt',
        },
      }),
      endsParagraph: true,
    },
    {
      // A rope under load. Renegotiating something both ends already agreed.
      text: 'You already promised the date. Now you’re renegotiating something you’d already said yes to.',
      visual: clip({
        src: 'clip-03-taut-rope-promise.mp4',
        source: {
          provider: 'pexels',
          id: '31875332',
          search: 'hands pulling rope tug of war',
          author: 'Ebahir',
        },
      }),
      endsParagraph: true,
    },
    {
      // Valves and pipework, all shut. What the connecting system can do, and no way
      // from here to find out.
      text: 'You couldn’t have known. Nobody showed you how to check what the connecting system can do.',
      visual: clip({
        src: 'clip-04-sealed-industrial-hatch.mp4',
        source: {
          provider: 'pexels',
          id: '38265344',
          search: 'pipes valves industrial close up',
          author: 'Dmitriy Steinke',
        },
      }),
      endsParagraph: true,
    },
    {
      // A lighthouse circled from the air. Wanting to see what is coming before committing
      // to it. Replaces a first pick whose poster showed a lighthouse and whose file showed a
      // dancer.
      text: 'If you want to be more confident about the complexity of a new feature before you commit,',
      visual: clip({
        src: 'clip-05-looking-toward-clarity.mp4',
        source: {
          provider: 'pexels',
          id: '32208280',
          search: 'lighthouse beam sweeping night',
          author: 'Kenan Turguç',
        },
      }),
    },
    {
      // Scaffolding going up, because the learning path is being built rather than found.
      text: 'we’re building a learning path for it.',
      visual: clip({
        src: 'clip-06-building-the-path.mp4',
        source: {
          provider: 'pexels',
          id: '36770299',
          search: 'scaffolding construction close up',
          author: 'Harrun Muhammad',
        },
      }),
      endsParagraph: true,
    },
    {
      // A drawing unrolled. Opening the documentation.
      text: 'By the end you’ll be able to open the documentation',
      visual: clip({
        src: 'clip-07-opening-the-record.mp4',
        source: {
          provider: 'pexels',
          id: '39134699',
          search: 'unrolling blueprint paper close up',
          author: 'Edwin Lopez',
        },
      }),
    },
    {
      // A library aisle under a vaulted ceiling: the records exist and are indexed, which is
      // the point of the beat. The grandest frame in a cut otherwise made of industrial objects,
      // so it stands slightly apart from its neighbours.
      text: 'for the integrations you already pay for, see which fields they actually expose,',
      visual: clip({
        src: 'clip-08-documentation-shelves.mp4',
        source: {
          provider: 'pexels',
          id: '29592158',
          search: 'library card catalog wooden drawers',
          author: 'Julio Lopez',
        },
      }),
    },
    {
      // A balance settling. Knowing whether the request is possible before answering.
      text: 'and know whether the request is possible before you answer.',
      visual: clip({
        src: 'clip-09-balance-of-possible.mp4',
        source: {
          provider: 'pexels',
          id: '35996675',
          search: 'balance scale weighing close up',
          author: 'Alex Dos Santos',
        },
      }),
      endsParagraph: true,
    },
    {
      // A gondola going down the mountain, so the movement on the CTA beat is downward without
      // repeating the rain, waterfall, sparks or snow the other cuts have used.
      text: 'The waitlist link is in the comments.',
      visual: clip({
        src: 'clip-10-link-descending-below.mp4',
        source: {
          provider: 'pexels',
          id: '38925951',
          search: 'cable car gondola descending green mountain',
          author: 'thanawat pechleelawan',
        },
      }),
    },
    {
      // Roses in the sun. They sway rather than unfurl, so this beat is carried by warmth arriving
      // rather than by anything literally opening — every literal register (doors, archways,
      // paths, shutters, sunrise, curtains) is spent across the five earlier cuts.
      text: 'Sign up and we’ll let you know when the learning path opens.',
      visual: clip({
        src: 'clip-11-the-path-opens.mp4',
        source: {
          provider: 'pexels',
          id: '38453939',
          search: 'flower blooming time lapse opening',
          author: 'Anna Lupa',
        },
      }),
      endsParagraph: true,
    },
    {
      // Someone at a window, in profile and thinking. The only person in the cut, and on the beat
      // that asks the viewer a question rather than one that catches them out.
      text: '[pause][curious] What ‘simple’ request turned out hardest?',
      visual: clip({
        src: 'clip-12-closing-question-reflection.mp4',
        source: {
          provider: 'pexels',
          id: '5199733',
          search: 'person looking out window from behind thinking',
          author: 'Tima Miroshnichenko',
        },
      }),
    },
  ],
})
