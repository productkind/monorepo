import { clip, defineVideo, riveAtFrame } from '../narration/definition'

/**
 * A stock cut of "Could one customer increase your bill?", the vibe coder campaign's video 6.
 * Script: productkind/marketing/content/campaigns/2026-09-vibe-coder-validation/
 * video-6-predictable-running-costs/script.md
 *
 * Same narration as `vibe-coder-validation-06`, so the audio cache serves this one the take it
 * already generated. The narration has to stay character-identical for that to hold.
 *
 * Twenty clauses merged into twelve runs of under two to five and a half seconds, no run crossing
 * a paragraph break. The b-roll cut of this video uses the same twelve runs.
 *
 * Footage is Pexels, which asks for a credit and a link back rather than requiring one: credit
 * Pexels and the photographers named here in the video description.
 *
 * No identifiable face carries runs 0 to 5, where the viewer is the one who does not know what
 * things cost; people appear from run 6, where the beat turns to working it out.
 *
 * A money script pulls two kinds of reject and both were kept out: the industry's trading-floor
 * imagery, and anything with a readable figure on it — a coin with its denomination engraved, a
 * calculator display, a weight stack marked in kilos are all burned-in text. The rising cost is
 * carried by water filling a glass rather than by a chart.
 */
export default defineVideo({
  id: 'vibe-coder-validation-06-stock',
  voice: 'chloe',
  model: 'eleven_v3',
  overlays: [
    riveAtFrame({ rive: 'parrot-greet-00.riv', frame: 0 }),
    riveAtFrame({ rive: 'parrot-peek-00.riv', frame: 500 }),
  ],
  sections: [
    {
      // Hands at the laptop the bill arrives for.
      text: 'Could one customer increase your bill?',
      visual: clip({
        src: 'clip-00-hands-on-laptop-desk.mp4',
        source: {
          provider: 'pexels',
          id: '6974127',
          search: 'hands typing laptop bright desk morning',
          author: 'SHVETS production',
        },
      }),
      endsParagraph: true,
    },
    {
      // The desk laid out: four separate things, four separate meters.
      text: 'Your AI app builder, database, email service and AI model',
      visual: clip({
        src: 'clip-01-desk-laptop-notebook-flatlay.mp4',
        source: {
          provider: 'pexels',
          id: '7657367',
          search: 'flat lay desk notebook pen plant minimal',
          author: 'Cup of Couple',
        },
      }),
    },
    {
      // Water rising in a glass. Some of it sits still, some of it keeps coming.
      text: 'all charge differently. Some costs stay fixed. Others rise with usage.',
      visual: clip({
        src: 'clip-02-usage-rises-like-water.mp4',
        source: {
          provider: 'pexels',
          id: '8676946',
          search: 'water rising in glass filling',
          author: 'Timur Weber',
        },
      }),
      endsParagraph: true,
    },
    {
      // Something shaped by hand. Cheap to make, hard to put a price on.
      text: 'That makes a cheap prototype hard to price as a live product.',
      visual: clip({
        src: 'clip-03-prototype-clay-shaping.mp4',
        source: {
          provider: 'pexels',
          id: '9733225',
          search: 'small model prototype clay hands',
          author: 'KoolShooters',
        },
      }),
      endsParagraph: true,
    },
    {
      // One item across a scanner. What a single active customer costs.
      text: 'You need to know what one active customer costs,',
      visual: clip({
        src: 'clip-04-one-customer-shopping.mp4',
        source: {
          provider: 'pexels',
          id: '8801825',
          search: 'single grocery item checkout scanner',
          author: 'Mike Jones',
        },
      }),
    },
    {
      // A flock filling the sky. Ten becoming a hundred.
      text: 'what happens when ten become a hundred and which service will charge you ' + 'first.',
      visual: clip({
        src: 'clip-05-ten-become-a-hundred.mp4',
        source: {
          provider: 'pexels',
          id: '13903682',
          search: 'flock of birds multiplying sky',
          author: 'syam krishnan',
        },
      }),
      endsParagraph: true,
    },
    {
      // Working it out on paper, seen from behind.
      text:
        'If you want to understand the cost of running your app, that’s what ' +
        'we’re building a learning path for.',
      visual: clip({
        src: 'clip-06-planning-cost-understanding.mp4',
        source: {
          provider: 'pexels',
          id: '7496258',
          search: 'woman writing notebook desk from behind',
          author: 'Artem Podrez',
        },
      }),
      endsParagraph: true,
    },
    {
      // A hand writing the list, line by line.
      text: 'By the end, you’ll list your fixed and usage costs,',
      visual: clip({
        src: 'clip-07-listing-fixed-usage-costs.mp4',
        source: {
          provider: 'pexels',
          id: '9032874',
          search: 'hand writing checklist notebook close up',
          author: 'Kevin Malik',
        },
      }),
    },
    {
      // Hands working, with no screen in frame to read numbers off.
      text:
        'estimate a cost per active customer, set spending alerts and test ' +
        'whether your price can cover them.',
      visual: clip({
        src: 'clip-08-estimate-and-test-price.mp4',
        source: {
          provider: 'pexels',
          id: '34573350',
          search: 'close up hands typing keyboard no screen',
          author: 'MELQUIZEDEQUE ALMEIDA',
        },
      }),
      endsParagraph: true,
    },
    {
      // A hand pointing at the phone, below.
      text: 'The waitlist link is in the comments.',
      visual: clip({
        src: 'clip-09-waitlist-link-comments.mp4',
        source: {
          provider: 'pexels',
          id: '8551158',
          search: 'hand pointing at phone screen blurred',
          author: 'Liliana Drew',
        },
      }),
    },
    {
      // Signing up.
      text: 'Sign up and we’ll let you know when the learning path opens.',
      visual: clip({
        src: 'clip-10-sign-up-learning-path.mp4',
        source: {
          provider: 'pexels',
          id: '8069605',
          search: 'woman typing email signup laptop smiling',
          author: 'RDNE Stock project',
        },
      }),
      endsParagraph: true,
    },
    {
      // Looking up from the desk, left with the question.
      text: '[pause][curious] Which app cost is hardest for you to predict?',
      visual: clip({
        src: 'clip-11-curious-which-cost-hardest.mp4',
        source: {
          provider: 'pexels',
          id: '31469164',
          search: 'woman thinking looking up curious desk',
          author: 'Viktoria Stasik',
        },
      }),
    },
  ],
})
