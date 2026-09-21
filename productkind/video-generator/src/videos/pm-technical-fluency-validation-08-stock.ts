import { clip, defineVideo, riveAtFrame } from '../narration/definition'

/**
 * A stock cut of "When can we launch it?", the PM technical fluency campaign's video 8.
 * Script: productkind/marketing/content/campaigns/2026-09-pm-technical-fluency-validation/
 * video-8-when-can-we-launch-it/script.md
 *
 * Same narration as `pm-technical-fluency-validation-08`, so the audio cache serves this one the
 * take it already generated. The narration has to stay character-identical for that to hold.
 *
 * Twenty clauses merged into thirteen runs, no run crossing a paragraph break. The b-roll cut of
 * this video uses the same thirteen runs.
 *
 * Footage is Pexels, which asks for a credit and a link back rather than requiring one: credit
 * Pexels and the photographers named here in the video description.
 *
 * The script's own image is "looks finished but is not", so the middle of the cut is carried by
 * buildings rather than screens: formwork still up against a facade, a staged empty room, bare
 * rebar standing in a slab. Only one run uses a laptop, and its screen is not visible.
 *
 * No identifiable face appears anywhere. Runs 6 and 12 show a person from behind; runs 3 and 8
 * have distant figures at height.
 *
 * Worth knowing if this cut is ever re-sourced: six of the first picks were exact Pexels ids
 * already used elsewhere in the project, because the generic searches keep landing on the same
 * well-lit clips. The fingerprint check against every clip in `public/` is load-bearing here, not
 * a formality.
 */
export default defineVideo({
  id: 'pm-technical-fluency-validation-08-stock',
  voice: 'chloe',
  model: 'eleven_v3',
  overlays: [
    riveAtFrame({ rive: 'parrot-greet-00.riv', frame: 0 }),
    riveAtFrame({ rive: 'parrot-peek-00.riv', frame: 500 }),
  ],
  sections: [
    {
      // A line of dominoes set up to prove one thing.
      text: 'You built something with AI to test an idea.',
      visual: clip({
        src: 'clip-00-built-prototype.mp4',
        source: {
          provider: 'pexels',
          id: '5981593',
          search: 'domino chain reaction toppling',
          author: 'Thirdman',
        },
      }),
    },
    {
      // A clock going round. When can we launch it.
      text: 'Your stakeholder saw it and asked when we can launch it.',
      visual: clip({
        src: 'clip-01-asked-when-launch.mp4',
        source: {
          provider: 'pexels',
          id: '35788383',
          search: 'clock hands closeup ticking',
          author: 'tarsem jassar',
        },
      }),
      endsParagraph: true,
    },
    {
      // A hand resting on the trackpad. On this machine it works.
      text: 'It works on your laptop, so to them it looks finished.',
      visual: clip({
        src: 'clip-02-laptop-looks-finished.mp4',
        source: {
          provider: 'pexels',
          id: '34771082',
          search: 'hand resting on laptop trackpad daylight',
          author: 'Anh Nguyen',
        },
      }),
      endsParagraph: true,
    },
    {
      // Formwork still up against the face of the building.
      text: 'And you can’t explain why it isn’t, so you sound like you’re stalling.',
      visual: clip({
        src: 'clip-03-cant-explain-stalling.mp4',
        source: {
          provider: 'pexels',
          id: '36601739',
          search: 'scaffolding on building facade construction',
          author: 'Harrun Muhammad',
        },
      }),
      endsParagraph: true,
    },
    {
      // A staged room. Everything on show, nobody living in it.
      text: 'Your prototype proves the idea works.',
      visual: clip({
        src: 'clip-04-idea-works-showhome.mp4',
        source: {
          provider: 'pexels',
          id: '34835397',
          search: 'staged empty living room modern minimal',
          author: 'Belén Montero',
        },
      }),
    },
    {
      // Bare rebar standing in a slab. None of the rest of it there yet.
      text: 'None of what keeps a real product running is there.',
      visual: clip({
        src: 'clip-05-nothing-keeping-it-running.mp4',
        source: {
          provider: 'pexels',
          id: '34199758',
          search: 'rebar columns empty construction daylight',
          author: 'SÀI GÒN CÔNG TY CP SẢN XUẤT - THƯƠNG MẠI',
        },
      }),
      endsParagraph: true,
    },
    {
      // Walking it, seen from behind.
      text:
        'If you want to answer that stakeholder with real reasons, we’re building ' +
        'a learning path for it.',
      visual: clip({
        src: 'clip-06-learning-path.mp4',
        source: {
          provider: 'pexels',
          id: '27133353',
          search: 'person walking forest path from behind',
          author: 'Orhan Pergel',
        },
      }),
      endsParagraph: true,
    },
    {
      // Going down the list and naming each one.
      text: 'By the end you’ll be able to name what your prototype skipped:',
      visual: clip({
        src: 'clip-07-name-what-was-skipped.mp4',
        source: {
          provider: 'pexels',
          id: '7969414',
          search: 'hand ticking checkbox list pen',
          author: 'George Pak',
        },
      }),
    },
    {
      // Cable under tension. What it does with real weight on it.
      text: 'whose data it holds, who’s allowed in, what it does under real load,',
      visual: clip({
        src: 'clip-08-under-real-load.mp4',
        source: {
          provider: 'pexels',
          id: '39432610',
          search: 'steel cable tension test closeup',
          author: 'celal keser',
        },
      }),
    },
    {
      // A lamp coming on in the dark. Somebody is up.
      text: 'who gets woken at 2am when something goes wrong, and who maintains it.',
      visual: clip({
        src: 'clip-09-woken-at-2am.mp4',
        source: {
          provider: 'pexels',
          id: '34857173',
          search: 'street lamp turning on dusk',
          author: 'Henrique Feiten',
        },
      }),
      endsParagraph: true,
    },
    {
      // Leaves coming down, below.
      text: 'The waitlist link is in the comments.',
      visual: clip({
        src: 'clip-10-link-in-comments.mp4',
        source: {
          provider: 'pexels',
          id: '19201288',
          search: 'leaves falling park autumn',
          author: 'Masood Aslami',
        },
      }),
    },
    {
      // A bud opening.
      text: 'Sign up and we’ll let you know when the learning path opens.',
      visual: clip({
        src: 'clip-11-signup-when-opens.mp4',
        source: {
          provider: 'pexels',
          id: '6535261',
          search: 'flower bud opening timelapse macro',
          author: 'ROMAN ODINTSOV',
        },
      }),
      endsParagraph: true,
    },
    {
      // Someone at the window, left with the question.
      text: '[pause][curious] Ever been asked to ship a prototype?',
      visual: clip({
        src: 'clip-12-ever-shipped-prototype.mp4',
        source: {
          provider: 'pexels',
          id: '7545933',
          search: 'silhouette person window thinking office',
          author: 'SHVETS production',
        },
      }),
    },
  ],
})
