import { clip, defineVideo, riveAtFrame } from '../narration/definition'

/**
 * A stock-footage cut of "You asked for one button", the vibe coder campaign's video 2.
 * Script: productkind/marketing/content/campaigns/2026-09-vibe-coder-validation/
 * video-2-control-what-ai-changes/script.md
 *
 * Same narration as `vibe-coder-validation-02`, so the audio cache serves this one the take it
 * already generated rather than paying ElevenLabs for the same words twice. The narration has to
 * stay character-identical for that to hold: edit the words here and this becomes a new take at
 * full price.
 *
 * Where that video cuts twenty-one times to a gif per clause, this one holds twelve clips of two
 * to six seconds. The grouping comes from the narrated timeline rather than a timer, so every cut
 * still lands on a clause boundary, and no run crosses a paragraph break.
 *
 * The script is about the gap between the one thing you can see and the many you cannot, so the
 * cut opens on an iceberg and spends its first half on things that are shut: a lock, a row of
 * lockers, a delta splitting out of sight. The second half is about being able to put something
 * back. Server racks and cabling are deliberately absent — the sibling cut
 * `pm-technical-fluency-validation-02-stock` spends that register on the same idea.
 *
 * Footage is Pexels, whose licence allows commercial use with no attribution. Its rule that
 * identifiable people may not appear in a bad light is why every beat about being caught out is
 * carried by objects or by hands alone; the only person is the distant silhouette on the closing
 * question. The API guidelines ask for a link back to Pexels, so credit it in the description, and
 * the photographer is recorded on each clip for the same reason.
 *
 * Every clip is a second longer than the beat it covers, because `clip` has no playback rate and
 * no loop: one that ran out would hold a frozen frame while the captions kept moving. Each file is
 * trimmed to its beat plus that second, stripped of audio and re-encoded to H.264 at CRF 23 with
 * BT.709 tags, and no grade is applied — stock arrives as SDR BT.709 already.
 */
export default defineVideo({
  id: 'vibe-coder-validation-02-stock',
  voice: 'chloe',
  model: 'eleven_v3',
  overlays: [
    riveAtFrame({ rive: 'parrot-greet-00.riv', frame: 0 }),
    riveAtFrame({ rive: 'parrot-peek-00.riv', frame: 500 }),
  ],
  sections: [
    {
      // An iceberg, with the part you can see sitting on the part you cannot. One button, fourteen
      // files.
      text: 'You asked for one button. The AI changed fourteen files.',
      visual: clip({
        src: 'clip-00-hidden-mass-iceberg.mp4',
        source: {
          provider: 'pexels',
          id: '30977530',
          search: 'iceberg tip water',
          author: 'Kristen Haennel',
        },
      }),
      endsParagraph: true,
    },
    {
      // A light changing. Do you publish it.
      text: 'The AI says it’s complete. The page still loads in preview. Do you publish it?',
      visual: clip({
        src: 'clip-01-decision-red-light.mp4',
        source: {
          provider: 'pexels',
          id: '30330260',
          search: 'traffic light changing to amber close up',
          author: 'Nika Navi',
        },
      }),
      endsParagraph: true,
    },
    {
      // A key turning. Sign-in is one of the files it touched.
      text: 'One of those files could control sign-in, payments',
      visual: clip({
        src: 'clip-02-sign-in-lock.mp4',
        source: {
          provider: 'pexels',
          id: '7646797',
          search: 'key turning in lock macro',
          author: 'Alena Darmel',
        },
      }),
    },
    {
      // A row of shut lockers, one being opened. Customer data behind one of many
      // doors you did not open. The wristbands make it read gym rather than office, which is a
      // half-step off the tone of the rest of the cut.
      text: 'or how customer data is saved. You can’t judge the change by looking at the new button.',
      visual: clip({
        src: 'clip-03-closed-lockers-data.mp4',
        source: {
          provider: 'pexels',
          id: '8053942',
          search: 'safe combination lock dial closed',
          author: 'SHVETS production',
        },
      }),
      endsParagraph: true,
    },
    {
      // A delta splitting from above: which journeys the change runs into.
      text: 'You need to know what changed, which customer journeys could be affected',
      visual: clip({
        src: 'clip-04-journeys-river-fork.mp4',
        source: {
          provider: 'pexels',
          id: '38886008',
          search: 'river delta branching channels aerial',
          author: 'Emrul Kausar Emon',
        },
      }),
    },
    {
      // Something small held up and examined closely, for what to test before
      // release.
      text: 'and what to test before release.',
      visual: clip({
        src: 'clip-05-test-before-release.mp4',
        source: {
          provider: 'pexels',
          id: '6263178',
          search: 'jeweler loupe inspecting gemstone',
          author: 'Tima Miroshnichenko',
        },
      }),
      endsParagraph: true,
    },
    {
      // A hand on a wheel, which is what control over your own app looks like.
      text: 'If you want that control over your own app, that’s what we’re building a learning path for.',
      visual: clip({
        src: 'clip-06-taking-control-wheel.mp4',
        source: {
          provider: 'pexels',
          id: '5520046',
          search: 'hand firmly gripping steering wheel control',
          author: 'Pavel Danilyuk',
        },
      }),
      endsParagraph: true,
    },
    {
      // Negatives on a lightbox, held up before anything is printed. Reviewing a change
      // rather than shipping it.
      text: 'By the end, you’ll review a proposed change,',
      visual: clip({
        src: 'clip-07-review-proposed-change.mp4',
        source: {
          provider: 'pexels',
          id: '8086298',
          search: 'film negative lightbox reviewing hands',
          author: 'Annushka Ahuja',
        },
      }),
    },
    {
      // A swing hanging still: it goes out and it comes back, which is the release-or-restore
      // choice. Replaces a first pick of hands under a running tap, which read as washing your
      // hands of something — the opposite of the line.
      text: 'test the affected behaviour and decide whether to release it or restore the working version.',
      visual: clip({
        src: 'clip-08-release-or-restore-swing.mp4',
        source: {
          provider: 'pexels',
          id: '38413573',
          search: 'pendulum swinging back and forth',
          author: 'Alef Morais',
        },
      }),
      endsParagraph: true,
    },
    {
      // Snow coming down, so the movement on the CTA beat is downward without repeating the
      // rain, waterfall and sparks the other cuts have used.
      text: 'The waitlist link is in the comments.',
      visual: clip({
        src: 'clip-09-link-in-comments-snowfall.mp4',
        source: {
          provider: 'pexels',
          id: '20258009',
          search: 'snow falling gently forest slow motion',
          author: 'Sonila Emini',
        },
      }),
    },
    {
      // A door opening on light, for the line about the learning path opening.
      text: 'Sign up and we’ll let you know when the learning path opens.',
      visual: clip({
        src: 'clip-10-learning-path-opens-door.mp4',
        source: {
          provider: 'pexels',
          id: '39341864',
          search: 'double doors opening light flooding room',
          author: 'Luk Sauvage',
        },
      }),
      endsParagraph: true,
    },
    {
      // A silhouette watching something pass overhead. The only person in the cut, unidentifiable,
      // and on a beat that asks the viewer a question rather than catching them out.
      text: '[pause][curious] What’s the biggest change you’ve approved without understanding it?',
      visual: clip({
        src: 'clip-11-closing-question-overlook.mp4',
        source: {
          provider: 'pexels',
          id: '29056611',
          search: 'silhouette person standing looking horizon',
          author: 'Rahime Gül',
        },
      }),
    },
  ],
})
