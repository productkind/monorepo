import { clip, defineVideo, riveAtFrame } from '../narration/definition'

/**
 * A stock-footage cut of "Nodding along in a stand-up", the PM technical fluency campaign's
 * video 1.
 * Script: productkind/marketing/content/campaigns/2026-09-pm-technical-fluency-validation/
 * video-1-nodding-along-in-stand-up/script.md
 *
 * Same narration as `pm-technical-fluency-validation-01`, so the audio cache serves this one the
 * take it already generated rather than paying ElevenLabs for the same words twice. The narration
 * has to stay character-identical for that to hold: edit the words here and this becomes a new
 * take at full price.
 *
 * Where that video cuts eighteen times to a gif per clause, this one holds eleven clips of three
 * to six seconds. The grouping comes from the narrated timeline rather than a timer, so every cut
 * still lands on a clause boundary: the eighteen clauses are merged into runs, each as close to
 * four seconds as the clause lengths allow, and no run crosses a paragraph break.
 *
 * Footage is Pexels, whose licence allows commercial use with no attribution. Two of its rules
 * shape the choices: identifiable people may not appear in a bad light, which is why the beats
 * about being caught out are carried by rooms, weather and objects rather than faces, and the one
 * person in the cut appears on a beat about understanding something, from behind. The API
 * guidelines also ask for a link back to Pexels, so credit it in the description.
 *
 * Every clip is a second longer than the beat it covers, because `clip` has no playback rate and
 * no loop: one that ran out would hold a frozen frame while the captions kept moving. Each file is
 * trimmed to its beat plus that second, stripped of audio and re-encoded to H.264 at CRF 23 with
 * BT.709 tags. No grade is applied — the house `eq=saturation=1.35:contrast=1.15` exists to rescue
 * 10-bit HLG footage that converts flat, and stock arrives as SDR BT.709 already.
 */
export default defineVideo({
  id: 'pm-technical-fluency-validation-01-stock',
  voice: 'chloe',
  model: 'eleven_v3',
  overlays: [
    riveAtFrame({ rive: 'parrot-greet-00.riv', frame: 0 }),
    riveAtFrame({ rive: 'parrot-peek-00.riv', frame: 500 }),
  ],
  sections: [
    {
      // An empty room with rows of chairs and a blank whiteboard. The room the script opens in,
      // with nobody in it to ask the follow-up question.
      text: 'You’ve nodded along in a stand-up, hoping nobody asks you a follow-up question.',
      visual: clip({
        src: 'clip-00-meeting.mp4',
        source: {
          provider: 'pexels',
          id: '7413809',
          search: 'meeting',
          author: 'RDNE Stock project',
        },
      }),
      endsParagraph: true,
    },
    {
      // Cranes and containers across grey water: somebody else's system, far too big to move, and
      // nothing to do with you.
      text: 
        'Someone says the migration is blocked by the platform team. You don’t know what that ' +
        'means for your release.',
      visual: clip({
        src: 'clip-01-other-teams-system.mp4',
        source: {
          provider: 'pexels',
          id: '37098576',
          search: 'shipping containers port',
          author: 'Jomin Thach',
        },
      }),
      endsParagraph: true,
    },
    {
      // Towers in fog, barely moving. Three weeks in which nothing happens and nothing is visible.
      text: 'So you don’t ask. Three weeks later, that blocker is why your release date moves.',
      visual: clip({
        src: 'clip-02-fog-city.mp4',
        source: {
          provider: 'pexels',
          id: '35146147',
          search: 'fog over buildings',
          author: 'Allen Boguslavsky',
        },
      }),
      endsParagraph: true,
    },
    {
      // Pages fanning open against the sky. The words are all there and none of them help.
      text: 'Nobody taught you those words. Looking up a definition afterwards',
      visual: clip({
        src: 'clip-03-pages-fanning.mp4',
        source: {
          provider: 'pexels',
          id: '36862846',
          search: 'turning pages book close up',
          author: 'Canan İldeniz',
        },
      }),
    },
    {
      // A shadow moving across bare concrete. The dead end the paragraph arrives at.
      text: 'doesn’t tell you what it means for your release.',
      visual: clip({
        src: 'clip-04-wall-shadow.mp4',
        source: {
          provider: 'pexels',
          id: '8559328',
          search: 'concrete wall shadow',
          author: 'Nataliya Vaitkevich',
        },
      }),
      endsParagraph: true,
    },
    {
      // A road running away through trees with the light coming down it. The turn in the script, and
      // the one beat allowed to be literal about a learning path.
      text: 
        'If you’d rather be the one who asks these questions, we’re building a learning path ' +
        'for exactly this.',
      visual: clip({
        src: 'clip-05-tree-lined-road.mp4',
        source: {
          provider: 'pexels',
          id: '15072786',
          search: 'forest path sunlight',
          author: 'Aditya Kumar',
        },
      }),
      endsParagraph: true,
    },
    {
      // Sky reflected back off water, which is what saying a change back in your own words is.
      text: 'By the end you’ll say a change back in your own words,',
      visual: clip({
        src: 'clip-06-sky-reflected.mp4',
        source: {
          provider: 'pexels',
          id: '36413324',
          search: 'ripples spreading water surface',
          author: 'Andre Moura',
        },
      }),
    },
    {
      // Someone drawing a curtain to let the light in. The only person in the video, on the beat
      // about understanding the answer, seen from behind.
      text: 'ask what it does to your product, and understand the answer while you’re in the meeting.',
      visual: clip({
        src: 'clip-07-curtain-opened.mp4',
        source: {
          provider: 'pexels',
          id: '37848048',
          search: 'morning light through curtains room',
          author: 'Ardina Setiorini',
        },
      }),
      endsParagraph: true,
    },
    {
      // Rain running down glass, so the movement on the CTA beat is downward.
      text: 'The waitlist link is in the comments.',
      visual: clip({
        src: 'clip-08-rain-window.mp4',
        source: {
          provider: 'pexels',
          id: '37582500',
          search: 'raindrops running down window',
          author: 'Melike',
        },
      }),
    },
    {
      // A sunrise, for the line about the learning path opening.
      text: 'Sign up and we’ll let you know when the learning path opens.',
      visual: clip({
        src: 'clip-09-sunrise-sea.mp4',
        source: {
          provider: 'pexels',
          id: '37588602',
          search: 'sunrise over horizon calm',
          author: 'Ravi Kant',
        },
      }),
      endsParagraph: true,
    },
    {
      // A hand writing in a notebook: the word you looked up, being written down.
      text: '[pause][curious] What technical word did you look up last?',
      visual: clip({
        src: 'clip-10-notebook-writing.mp4',
        source: {
          provider: 'pexels',
          id: '36641400',
          search: 'open notebook pen desk',
          author: 'Santiago Peña Bossano',
        },
      }),
    },
  ],
})
