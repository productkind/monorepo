import { clip, defineVideo, riveAtFrame } from '../narration/definition'

/**
 * A stock cut of "Needed tomorrow, ready next week", the PM technical fluency campaign's video 6.
 * Script: productkind/marketing/content/campaigns/2026-09-pm-technical-fluency-validation/
 * video-6-needed-tomorrow-ready-next-week/script.md
 *
 * Same narration as `pm-technical-fluency-validation-06`, so the audio cache serves this one the
 * take it already generated. The narration has to stay character-identical for that to hold.
 *
 * Twenty clauses merged into twelve runs of two and a half to five seconds, no run crossing a
 * paragraph break. The b-roll cut of this video uses the same twelve runs.
 *
 * Footage is Pexels, which asks for a credit and a link back rather than requiring one: credit
 * Pexels and the photographers named here in the video description.
 *
 * No identifiable face carries runs 0 to 4, where the viewer is the one caught short — the
 * licence forbids showing people in a bad light and the house rules forbid making the viewer the
 * butt of the joke. From run 5 people appear only from behind, in fog, or as hands.
 *
 * The counting beats are carried by physical things rather than screens, because a dashboard with
 * readable figures on it is burned-in text: an abacus for checking what a number includes, a
 * stack of identical cups for the ones who signed up twice.
 */
export default defineVideo({
  id: 'pm-technical-fluency-validation-06-stock',
  voice: 'chloe',
  model: 'eleven_v3',
  overlays: [
    riveAtFrame({ rive: 'parrot-greet-00.riv', frame: 0 }),
    riveAtFrame({ rive: 'parrot-peek-00.riv', frame: 500 }),
  ],
  sections: [
    {
      // Sand running out on a deadline that is tomorrow, not next week.
      text:
        'You need a product metric for tomorrow’s meeting. Analytics will have it ' + 'next week.',
      visual: clip({
        src: 'clip-00-tomorrow-deadline-hourglass.mp4',
        source: {
          provider: 'pexels',
          id: '7703942',
          search: 'hourglass sand timer close up',
          author: 'Ivan S',
        },
      }),
      endsParagraph: true,
    },
    {
      // One clear path. Not a hard question.
      text: 'And it’s usually not a hard question.',
      visual: clip({
        src: 'clip-01-clear-simple-path.mp4',
        source: {
          provider: 'pexels',
          id: '19003253',
          search: 'one clean straightforward path',
          author: 'Boys in Bristol Photography',
        },
      }),
    },
    {
      // Prints in the sand going out and coming back.
      text: 'How many people finished onboarding last month. How many came back.',
      visual: clip({
        src: 'clip-02-footprints-came-back.mp4',
        source: {
          provider: 'pexels',
          id: '39350867',
          search: 'footsteps in sand returning',
          author: 'Yuliya Duzhaya',
        },
      }),
      endsParagraph: true,
    },
    {
      // Flat grey sky, nothing moving in it. The queue.
      text: 'You join the queue, and have the meeting without it.',
      visual: clip({
        src: 'clip-03-queue-waiting-atmosphere.mp4',
        source: {
          provider: 'pexels',
          id: '35701162',
          search: 'grey overcast sky still',
          author: 'Emrul Kausar Emon',
        },
      }),
      endsParagraph: true,
    },
    {
      // Four strings under a hand. Simple once somebody shows you which four.
      text: 'It’s four lines of SQL. You’ve just never been shown which four.',
      visual: clip({
        src: 'clip-04-four-strings-shown.mp4',
        source: {
          provider: 'pexels',
          id: '7722353',
          search: 'guitar strings close up',
          author: 'Alena Darmel',
        },
      }),
      endsParagraph: true,
    },
    {
      // Walking it yourself.
      text:
        'If you’d rather answer it yourself, that’s what we’re building a ' + 'learning path for.',
      visual: clip({
        src: 'clip-05-learning-path-walking.mp4',
        source: {
          provider: 'pexels',
          id: '39399515',
          search: 'person walking forward trail',
          author: 'Adit Syahfiar',
        },
      }),
      endsParagraph: true,
    },
    {
      // Beads moved across one at a time, which is what checking a number is.
      text: 'By the end you’ll write it yourself, and check what the number includes:',
      visual: clip({
        src: 'clip-06-checking-what-it-includes.mp4',
        source: {
          provider: 'pexels',
          id: '7170318',
          search: 'abacus counting beads close up',
          author: 'Eren Li',
        },
      }),
    },
    {
      // Figures fading out in fog. The ones who never confirmed.
      text: 'test accounts, people who never confirmed their email,',
      visual: clip({
        src: 'clip-07-unconfirmed-hazy-figure.mp4',
        source: {
          provider: 'pexels',
          id: '29405072',
          search: 'silhouette figure fog walking',
          author: 'Lies',
        },
      }),
    },
    {
      // A stack of identical cups. The ones who signed up twice.
      text: 'the ones who signed up twice. So you stop quoting numbers you can’t defend.',
      visual: clip({
        src: 'clip-08-signed-up-twice-duplicates.mp4',
        source: {
          provider: 'pexels',
          id: '7160958',
          search: 'stack of identical cups',
          author: '宇航 钱',
        },
      }),
      endsParagraph: true,
    },
    {
      // Drops running down, pointing below.
      text: 'The waitlist link is in the comments.',
      visual: clip({
        src: 'clip-09-link-below-falling-drops.mp4',
        source: {
          provider: 'pexels',
          id: '28912666',
          search: 'water droplets falling close up',
          author: 'Diana ✨',
        },
      }),
    },
    {
      // Something opening.
      text: 'Sign up and we’ll let you know when the learning path opens.',
      visual: clip({
        src: 'clip-10-learning-path-opens-bloom.mp4',
        source: {
          provider: 'pexels',
          id: '31898074',
          search: 'flower blooming time lapse',
          author: 'Dilara Hazıroğlu',
        },
      }),
      endsParagraph: true,
    },
    {
      // A small figure looking out, left with the question.
      text: '[pause][curious] How long does a simple number take where you work?',
      visual: clip({
        src: 'clip-11-closing-question-reflection.mp4',
        source: {
          provider: 'pexels',
          id: '28858052',
          search: 'looking at horizon contemplative',
          author: 'Teju',
        },
      }),
    },
  ],
})
