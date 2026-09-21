import { clip, defineVideo, riveAtFrame } from '../narration/definition'

/**
 * A stock cut of "Can you run your own app?", the vibe coder campaign's video 8.
 * Script: productkind/marketing/content/campaigns/2026-09-vibe-coder-validation/
 * video-8-independent-without-becoming-an-engineer/script.md
 *
 * Same narration as `vibe-coder-validation-08`, so the audio cache serves this one the take it
 * already generated. The narration has to stay character-identical for that to hold.
 *
 * Twenty-one clauses merged into thirteen runs, no run crossing a paragraph break. The b-roll cut
 * of this video uses the same thirteen runs.
 *
 * Footage is Pexels, which asks for a credit and a link back rather than requiring one: credit
 * Pexels and the photographers named here in the video description.
 *
 * Runs 4 and 9 are both about restoring a working version and deliberately carry different
 * pictures — chess pieces set back to their starting squares, then old photographs laid out and
 * sorted — because the campaign has already spent the rewind icon, the undo shortcut and the
 * reset button on that idea.
 *
 * No identifiable face carries runs 0 to 4. Runs 5 to 9 are hands or figures from behind; the one
 * clear face is run 12, reflected in glass on the closing question rather than on a beat where
 * the viewer is caught out.
 *
 * This was the last of sixteen stock cuts and the library is well mined: six first picks were ids
 * already used elsewhere in the project and had to be re-sourced, two of them twice.
 */
export default defineVideo({
  id: 'vibe-coder-validation-08-stock',
  voice: 'chloe',
  model: 'eleven_v3',
  overlays: [
    riveAtFrame({ rive: 'parrot-greet-00.riv', frame: 0 }),
    riveAtFrame({ rive: 'parrot-peek-00.riv', frame: 500 }),
  ],
  sections: [
    {
      // A laptop lid closing on the thing you built.
      text: 'Can you run your own app?',
      visual: clip({
        src: 'clip-00-desk-open-app4.mp4',
        source: {
          provider: 'pexels',
          id: '12894347',
          search: 'closing laptop lid hands desk',
          author: 'Mizuno K',
        },
      }),
      endsParagraph: true,
    },
    {
      // A glass door that will not give. A customer who cannot sign in.
      text: 'You built it with AI. Then a customer can’t sign in,',
      visual: clip({
        src: 'clip-01-locked-out-keys.mp4',
        source: {
          provider: 'pexels',
          id: '7986204',
          search: 'glass door locked handle pull',
          author: 'SHVETS production',
        },
      }),
    },
    {
      // Something coming off the shelf while you were looking elsewhere.
      text: 'a payment fails, or a change breaks another screen.',
      visual: clip({
        src: 'clip-02-shelf-book-falling.mp4',
        source: {
          provider: 'pexels',
          id: '18995678',
          search: 'books shelf toppling falling',
          author: 'hello aesthe',
        },
      }),
      endsParagraph: true,
    },
    {
      // A fork in the track. The AI has answered; the choice is still yours.
      text: 'The AI gives you an answer. You decide whether to publish the fix,',
      visual: clip({
        src: 'clip-03-decide-crossroads.mp4',
        source: {
          provider: 'pexels',
          id: '37322355',
          search: 'crossroads dirt path two directions',
          author: 'Dani Mota',
        },
      }),
    },
    {
      // Pieces set back to their starting squares.
      text: 'restore the working version or collect more evidence.',
      visual: clip({
        src: 'clip-04-restore-chess.mp4',
        source: {
          provider: 'pexels',
          id: '7102535',
          search: 'chess piece placed back position hand',
          author: 'RDNE Stock project',
        },
      }),
      endsParagraph: true,
    },
    {
      // A watch in pieces, every part accounted for.
      text: 'Owning your app means knowing its main parts,',
      visual: clip({
        src: 'clip-05-watch-parts-known.mp4',
        source: {
          provider: 'pexels',
          id: '6424088',
          search: 'disassembled watch parts table hands',
          author: 'Anna Tarazevich',
        },
      }),
    },
    {
      // Walking the whole way through, seen from behind.
      text: 'keeping a working version and checking the main customer journey.',
      visual: clip({
        src: 'clip-06-customer-journey-corridor2.mp4',
        source: {
          provider: 'pexels',
          id: '37572084',
          search: 'woman walking hallway home from behind',
          author: 'Zenia Diamond',
        },
      }),
      endsParagraph: true,
    },
    {
      // A trail that keeps going, from above.
      text:
        'If you want a repeatable way to run your app yourself, that’s what we’re ' +
        'building a learning path for.',
      visual: clip({
        src: 'clip-07-learning-path-trail.mp4',
        source: {
          provider: 'pexels',
          id: '32523248',
          search: 'winding forest trail path aerial',
          author: 'Kenan Turguç',
        },
      }),
      endsParagraph: true,
    },
    {
      // Measuring it properly before cutting.
      text: 'By the end, you’ll map your app, review changes, test the customer journey,',
      visual: clip({
        src: 'clip-08-map-review-test2.mp4',
        source: {
          provider: 'pexels',
          id: '6789604',
          search: 'hand measuring tape measure wood',
          author: 'Tima Miroshnichenko',
        },
      }),
    },
    {
      // Laying out what you actually gathered, and choosing from it.
      text:
        'restore a working version and choose your next step using evidence you ' + 'collected.',
      visual: clip({
        src: 'clip-09-evidence-photos.mp4',
        source: {
          provider: 'pexels',
          id: '5561640',
          search: 'hand sorting photographs printed table',
          author: 'Tima Miroshnichenko',
        },
      }),
      endsParagraph: true,
    },
    {
      // A name going onto a list.
      text: 'The waitlist link is in the comments.',
      visual: clip({
        src: 'clip-10-waitlist-signup.mp4',
        source: {
          provider: 'pexels',
          id: '7560165',
          search: 'hand writing name signup list',
          author: 'SHVETS production',
        },
      }),
    },
    {
      // A gate swinging open.
      text: 'Sign up and we’ll let you know when the learning path opens.',
      visual: clip({
        src: 'clip-11-path-opens.mp4',
        source: {
          provider: 'pexels',
          id: '38986613',
          search: 'wooden gate opening slowly light',
          author: 'Merili M',
        },
      }),
      endsParagraph: true,
    },
    {
      // A reflection in the glass, left with the question.
      text: '[pause][curious] Which part of running your app feels hardest?',
      visual: clip({
        src: 'clip-12-curious-reflection.mp4',
        source: {
          provider: 'pexels',
          id: '29545258',
          search: 'person looking out window thinking from behind',
          author: 'Alexander Mass',
        },
      }),
    },
  ],
})
