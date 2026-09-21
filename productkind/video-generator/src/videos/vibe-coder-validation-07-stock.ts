import { clip, defineVideo, riveAtFrame } from '../narration/definition'

/**
 * A stock cut of "You launched. Three people visited.", the vibe coder campaign's video 7.
 * Script: productkind/marketing/content/campaigns/2026-09-vibe-coder-validation/
 * video-7-revenue-and-validation/script.md
 *
 * Same narration as `vibe-coder-validation-07`, so the audio cache serves this one the take it
 * already generated. The narration has to stay character-identical for that to hold.
 *
 * Nineteen clauses merged into fifteen runs, no run crossing a paragraph break. The b-roll cut of
 * this video uses the same fifteen runs.
 *
 * Footage is Pexels, which asks for a credit and a link back rather than requiring one: credit
 * Pexels and the photographers named here in the video description.
 *
 * No identifiable face carries runs 0 to 3, where nobody came and nothing is working; faces
 * appear from run 4, where the beat turns to talking to customers.
 *
 * Runs 0 to 2 run grey on purpose — an empty street, rain on glass, then fog lifting off a ridge
 * — so the picture clears at the same rate the script does.
 */
export default defineVideo({
  id: 'vibe-coder-validation-07-stock',
  voice: 'chloe',
  model: 'eleven_v3',
  overlays: [
    riveAtFrame({ rive: 'parrot-greet-00.riv', frame: 0 }),
    riveAtFrame({ rive: 'parrot-peek-00.riv', frame: 500 }),
  ],
  sections: [
    {
      // A street with nobody on it. Three visitors and no sale.
      text: 'You launched your app. Three people visited, and nobody paid.',
      visual: clip({
        src: 'clip-00-launched-empty-street.mp4',
        source: {
          provider: 'pexels',
          id: '19638763',
          search: 'deserted street early morning',
          author: 'Teju',
        },
      }),
      endsParagraph: true,
    },
    {
      // Rain on the glass. You can see there is a problem, not which one.
      text: 'Now you don’t know which problem to solve. Do you need more visitors,',
      visual: clip({
        src: 'clip-01-unclear-view-rain.mp4',
        source: {
          provider: 'pexels',
          id: '37019548',
          search: 'rain window blurred view',
          author: 'Gizem Gökce',
        },
      }),
    },
    {
      // Fog lifting off a ridge, one shape at a time.
      text: 'a clearer offer, an easier sign-up or a different price?',
      visual: clip({
        src: 'clip-02-choices-fog-clearing.mp4',
        source: {
          provider: 'pexels',
          id: '29731892',
          search: 'fog clearing mountain view reveal',
          author: 'Ahmet Mert',
        },
      }),
      endsParagraph: true,
    },
    {
      // Another box onto the stack. More building, which is not the answer to this question.
      text: 'Adding another feature cannot answer that question.',
      visual: clip({
        src: 'clip-03-more-boxes-stacked.mp4',
        source: {
          provider: 'pexels',
          id: '7205560',
          search: 'piling more boxes onto a stack',
          author: 'SHVETS production',
        },
      }),
    },
    {
      // Two people actually talking, seen from behind.
      text: 'Customer conversations and behaviour can.',
      visual: clip({
        src: 'clip-04-customer-conversation.mp4',
        source: {
          provider: 'pexels',
          id: '6602118',
          search: 'friends talking coffee shop from behind',
          author: 'Pavel Danilyuk',
        },
      }),
      endsParagraph: true,
    },
    {
      // One timer, one thing being measured.
      text: 'You need one hypothesis, one result to measure',
      visual: clip({
        src: 'clip-05-one-hypothesis-hourglass.mp4',
        source: {
          provider: 'pexels',
          id: '5413986',
          search: 'hourglass sand timer single close up',
          author: 'Peggy Anke',
        },
      }),
    },
    {
      // One small flame, lit on purpose and kept alight.
      text: 'and the smallest test that could change your next decision.',
      visual: clip({
        src: 'clip-06-smallest-test-flame.mp4',
        source: {
          provider: 'pexels',
          id: '6417265',
          search: 'lighting one candle flame close up',
          author: 'Shashank Sharma',
        },
      }),
      endsParagraph: true,
    },
    {
      // Writing down what actually happened.
      text: 'If you want evidence that your product solves a worthwhile problem,',
      visual: clip({
        src: 'clip-07-evidence-writing-notebook.mp4',
        source: {
          provider: 'pexels',
          id: '7316372',
          search: 'woman journaling desk notebook window',
          author: 'Angela Roma',
        },
      }),
    },
    {
      // A path with the light down it.
      text: 'that’s what we’re building a learning path for.',
      visual: clip({
        src: 'clip-08-learning-path-woods.mp4',
        source: {
          provider: 'pexels',
          id: '29983300',
          search: 'path leading forward sunlight trees',
          author: 'David Pickup',
        },
      }),
      endsParagraph: true,
    },
    {
      // One set of prints in wet sand. A single action worth following.
      text: 'By the end, you’ll track a meaningful customer action,',
      visual: clip({
        src: 'clip-09-track-customer-action-footprints.mp4',
        source: {
          provider: 'pexels',
          id: '36159213',
          search: 'footprints wet sand single',
          author: 'Ankur Khandelwal',
        },
      }),
    },
    {
      // A blank tag swinging, with no number on it yet.
      text: 'run a focused experiment, test a price',
      visual: clip({
        src: 'clip-10-test-a-price-blank-card.mp4',
        source: {
          provider: 'pexels',
          id: '6801668',
          search: 'brown paper gift tag blank swinging',
          author: 'Artem Podrez',
        },
      }),
    },
    {
      // A card tapped and taken. A way to pay that works.
      text: 'and give real customers a working way to pay.',
      visual: clip({
        src: 'clip-11-working-way-to-pay.mp4',
        source: {
          provider: 'pexels',
          id: '5794444',
          search: 'contactless card payment tap terminal',
          author: 'Tima Miroshnichenko',
        },
      }),
      endsParagraph: true,
    },
    {
      // Scrolling to the comments.
      text: 'The waitlist link is in the comments.',
      visual: clip({
        src: 'clip-12-waitlist-link-comments.mp4',
        source: {
          provider: 'pexels',
          id: '7986205',
          search: 'woman scrolling phone social media casual',
          author: 'SHVETS production',
        },
      }),
    },
    {
      // Shutters opening onto the morning.
      text: 'Sign up and we’ll let you know when the learning path opens.',
      visual: clip({
        src: 'clip-13-learning-path-opens-window.mp4',
        source: {
          provider: 'pexels',
          id: '33594196',
          search: 'window shutters opening morning light',
          author: 'Buse Çolak',
        },
      }),
      endsParagraph: true,
    },
    {
      // Left with the question.
      text:
        '[pause][curious] What’s harder for you: finding users or deciding what ' + 'to charge?',
      visual: clip({
        src: 'clip-14-curious-question-harder-for-you.mp4',
        source: {
          provider: 'pexels',
          id: '33213470',
          search: 'woman tilting head curious question natural light',
          author: 'Anh Nguyen',
        },
      }),
    },
  ],
})
