import { clip, defineVideo, riveAtFrame } from '../narration/definition'

/**
 * A stock-footage cut of "Would you take a payment today?", the vibe coder campaign's video 4.
 * Script: productkind/marketing/content/campaigns/2026-09-vibe-coder-validation/
 * video-4-customer-data-and-money/script.md
 *
 * Same narration as `vibe-coder-validation-04`, so the audio cache serves this one the take it
 * already generated rather than paying ElevenLabs for the same words twice. The narration has to
 * stay character-identical for that to hold: edit the words here and this becomes a new take at
 * full price.
 *
 * Thirteen clips of two to seven seconds. The nineteen clauses of the gif cut are merged into runs
 * long enough to hold a shot, taken from the narrated timeline rather than a timer, so every cut
 * lands on a clause boundary and no run crosses a paragraph break.
 *
 * The gif cut answers a security script with everyday objects instead of the industry's hacker
 * imagery, and this cut keeps that: money counted by hand, a flame carried, two fluids that will
 * not mix, a drink poured to the line. The four questions of the second paragraph are still four
 * separate pictures, because the point of the passage is how many separate things there are.
 *
 * Footage is Pexels, whose licence allows commercial use with no attribution. The API guidelines
 * ask for a link back to Pexels, so credit it in the description, and the photographer is recorded
 * on each clip for the same reason.
 *
 * Every clip is a second longer than the beat it covers, because `clip` has no playback rate and
 * no loop: one that ran out would hold a frozen frame while the captions kept moving. Each file is
 * trimmed to its beat plus that second, stripped of audio and re-encoded to H.264 at CRF 23 with
 * BT.709 tags, and no grade is applied — stock arrives as SDR BT.709 already.
 */
export default defineVideo({
  id: 'vibe-coder-validation-04-stock',
  voice: 'chloe',
  model: 'eleven_v3',
  overlays: [
    riveAtFrame({ rive: 'parrot-greet-00.riv', frame: 0 }),
    riveAtFrame({ rive: 'parrot-peek-00.riv', frame: 500 }),
  ],
  sections: [
    {
      // Notes fed through a counting machine by hand. Taking a payment, as a physical act.
      text: 'Would you take a payment today?',
      visual: clip({
        src: 'clip-00-cash-counted.mp4',
        source: {
          provider: 'pexels',
          id: '6266430',
          search: 'a person putting money on the money counter',
          author: 'Tima Miroshnichenko',
        },
      }),
      endsParagraph: true,
    },
    {
      // A lit candle held in one hand. What a customer hands over is easy to carry and easy to
      // put out.
      text: 'What is that customer trusting you with?',
      visual: clip({
        src: 'clip-01-flame-passed-hand-to-hand.mp4',
        source: {
          provider: 'pexels',
          id: '4816945',
          search: 'hand holding a red candle',
          author: 'Anna Shvets',
        },
      }),
    },
    {
      // Red and blue oil in water, touching everywhere and mixing nowhere. Two customers' data in
      // one system, and the boundary that is supposed to hold between them.
      text: 'Can one customer see another person’s data? Are private keys visible in the browser?',
      visual: clip({
        src: 'clip-02-private-data-boundary.mp4',
        source: {
          provider: 'pexels',
          id: '36217506',
          search: 'abstract red and blue oil bubbles background',
          author: 'cami',
        },
      }),
    },
    {
      // Milk poured into a cup and stopped at the line. The right amount, delivered.
      text: 'Does checkout charge the right amount and send the right confirmation?',
      visual: clip({
        src: 'clip-03-right-amount-poured.mp4',
        source: {
          provider: 'pexels',
          id: '30981708',
          search: 'coffee machine dispensing into cup',
          author: 'Burak Eroglu 🇹🇷',
        },
      }),
      endsParagraph: true,
    },
    {
      // A typewriter and a book on a table outdoors, for the paperwork nobody thinks of as part
      // of the build.
      text: 'Then there are backups, cookie consent, terms and a privacy policy.',
      visual: clip({
        src: 'clip-04-policy-drafted.mp4',
        source: {
          provider: 'pexels',
          id: '27440763',
          search: 'a typewriter and a book on a table in front of a tree',
          author: 'Furkan Elveren',
        },
      }),
      endsParagraph: true,
    },
    {
      // A technician working on a rooftop installation. The person you call when the checks stop
      // being something you can do from a laptop.
      text: 'You need practical checks and clear signs that tell you when the app needs a security or legal professional.',
      visual: clip({
        src: 'clip-05-specialist-called-in.mp4',
        source: {
          provider: 'pexels',
          id: '35552709',
          search: 'industrial technician working on rooftop project',
          author: 'Mumtaz Niazi',
        },
      }),
      endsParagraph: true,
    },
    {
      // Hands taping a box shut. Handling someone else's things carefully enough to send them on.
      text: 'If you want to handle customer data and money responsibly,',
      visual: clip({
        src: 'clip-06-responsibly-sealed.mp4',
        source: {
          provider: 'pexels',
          id: '7205557',
          search: 'a person packing a box',
          author: 'SHVETS production',
        },
      }),
    },
    {
      // A garden path in autumn, walked rather than watched. The learning path, as a route with
      // steps on it.
      text: 'that’s what we’re building a learning path for.',
      visual: clip({
        src: 'clip-07-learning-path-steps.mp4',
        source: {
          provider: 'pexels',
          id: '34598609',
          search: 'colorful garden pathway walkthrough in autumn',
          author: 'Nurgül Kelebek',
        },
      }),
      endsParagraph: true,
    },
    {
      // A hand moving faders on a mixing desk. Four separate controls, each set deliberately.
      text: 'By the end, you’ll test access, permissions, payments and backups,',
      visual: clip({
        src: 'clip-08-testing-controls-checked.mp4',
        source: {
          provider: 'pexels',
          id: '26348336',
          search: 'a man is working on a mixing board',
          author: 'Ammad Rasool',
        },
      }),
    },
    {
      // A handshake across a desk, for the risk you write down and hand to someone qualified.
      text: 'and record the risks that still need specialist help.',
      visual: clip({
        src: 'clip-09-specialist-brought-in.mp4',
        source: {
          provider: 'pexels',
          id: '6931503',
          search: 'shaking hands at work',
          author: 'Mikhail Nilov',
        },
      }),
      endsParagraph: true,
    },
    {
      // A phone held up close. Where the link is, and where it gets opened.
      text: 'The waitlist link is in the comments.',
      visual: clip({
        src: 'clip-10-link-shared-phone.mp4',
        source: {
          provider: 'pexels',
          id: '7615864',
          search: 'close up shot of a person taking a picture using her mobile phone',
          author: 'Los Muertos Crew',
        },
      }),
    },
    {
      // A hand writing on paper. Signing up, rather than another door swinging open — the
      // campaign has spent that picture.
      text: 'Sign up and we’ll let you know when the learning path opens.',
      visual: clip({
        src: 'clip-11-learning-path-signed.mp4',
        source: {
          provider: 'pexels',
          id: '20413409',
          search: 'envelope opening letter hands',
          author: 'Orhan Pergel',
        },
      }),
      endsParagraph: true,
    },
    {
      // Someone looking straight down the lens as the question is asked.
      text: '[pause][curious] Which safety check are you least sure about?',
      visual: clip({
        src: 'clip-12-least-sure-thinking.mp4',
        source: {
          provider: 'pexels',
          id: '8246863',
          search: 'close up video of a man looking at camera',
          author: 'Henri Mathieu-Saint-Laurent',
        },
      }),
    },
  ],
})
