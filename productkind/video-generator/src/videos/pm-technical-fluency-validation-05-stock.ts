import { clip, defineVideo, riveAtFrame } from '../narration/definition'

/**
 * A stock cut of "All you can send is their screenshot", the PM technical fluency campaign's
 * video 5.
 * Script: productkind/marketing/content/campaigns/2026-09-pm-technical-fluency-validation/
 * video-5-all-you-can-send-is-their-screenshot/script.md
 *
 * Same narration as `pm-technical-fluency-validation-05`, so the audio cache serves this one the
 * take it already generated. The narration has to stay character-identical for that to hold.
 *
 * Nineteen clauses merged into twelve runs of two to five seconds, no run crossing a paragraph
 * break. Footage is Pexels, which asks for a credit and a link back rather than requiring one:
 * credit Pexels and the photographers named here in the video description.
 *
 * Runs 0 to 4 are the beats where the viewer is caught out, so no identifiable face carries them
 * — the licence forbids showing people in a bad light and the house rules forbid making the
 * viewer the butt of the joke. People appear from run 4 onwards, where the beat is about
 * understanding something.
 *
 * Provenance note: eleven of these clips were downloaded in an earlier session that never wrote a
 * definition, and the searches that found them were not recorded. Their ids and authors were
 * recovered by matching each shipped clip against the cached source downloads, so those are
 * accurate; the `search` values below are the assets' own Pexels slugs standing in for the
 * original terms. Run 2 was sourced fresh and its search is the real one.
 */
export default defineVideo({
  id: 'pm-technical-fluency-validation-05-stock',
  voice: 'chloe',
  model: 'eleven_v3',
  overlays: [
    riveAtFrame({ rive: 'parrot-greet-00.riv', frame: 0 }),
    riveAtFrame({ rive: 'parrot-peek-00.riv', frame: 500 }),
  ],
  sections: [
    {
      // A phone held up. All that leaves the customer is a picture of the screen.
      text: 'A customer reports a bug. All you can send engineering is their screenshot.',
      visual: clip({
        src: 'clip-00-screen-report.mp4',
        source: {
          provider: 'pexels',
          id: '6279146',
          search: 'a person holding his phone',
          author: 'Artem Podrez',
        },
      }),
      endsParagraph: true,
    },
    {
      // The reply being typed back, question after question.
      text: 'It comes back as questions. Who was it?',
      visual: clip({
        src: 'clip-01-reply-typed-back.mp4',
        source: {
          provider: 'pexels',
          id: '28222728',
          search: 'a person is using a pen to write on a laptop',
          author: 'thiago japyassu',
        },
      }),
    },
    {
      // Rain across the glass. You are looking straight at it and cannot make it out.
      text: 'What did they do? What did the error say?',
      visual: clip({
        src: 'clip-02-rain-on-glass.mp4',
        source: {
          provider: 'pexels',
          id: '12742709',
          search: 'rain running down a window',
          author: 'Binil  Babu',
        },
      }),
      endsParagraph: true,
    },
    {
      // An empty chair in a bright room. Two days of nobody picking it up.
      text: 'So you ask the customer, wait two days, and nobody has started looking.',
      visual: clip({
        src: 'clip-03-empty-chair-waiting.mp4',
        source: {
          provider: 'pexels',
          id: '34835398',
          search: 'bright minimalist interior with chair and book',
          author: 'Belén Montero',
        },
      }),
      endsParagraph: true,
    },
    {
      // One person showing another where to look.
      text: 'You could answer all of it yourself, if somebody showed you where to look.',
      visual: clip({
        src: 'clip-04-shown-where-to-look.mp4',
        source: {
          provider: 'pexels',
          id: '8513110',
          search: 'female colleagues working together in an office',
          author: 'Artem Podrez',
        },
      }),
      endsParagraph: true,
    },
    {
      // Reading it properly, first, rather than forwarding it on.
      text: 'If you want to be the one who investigates it first,',
      visual: clip({
        src: 'clip-05-investigating-first.mp4',
        source: {
          provider: 'pexels',
          id: '8141642',
          search: 'businesswoman reading the documents',
          author: 'Alena Darmel',
        },
      }),
    },
    {
      // Something being built back up a layer at a time, which is what reproducing a bug is.
      text: 'we’re building a learning path for it.',
      visual: clip({
        src: 'clip-06-building-layer-by-layer.mp4',
        source: {
          provider: 'pexels',
          id: '35598609',
          search: '3d printer creating a complex design',
          author: 'GregoriaN G',
        },
      }),
      endsParagraph: true,
    },
    {
      // Hands on a keyboard, running it again on your own account.
      text: 'By the end you’ll reproduce the bug on your own account,',
      visual: clip({
        src: 'clip-07-reproduce-typing.mp4',
        source: {
          provider: 'pexels',
          id: '8128422',
          search: 'person playing computer games while using computer keyboard',
          author: 'Alena Darmel',
        },
      }),
    },
    {
      // An interchange from above: every request that went somewhere, and the one that did not.
      text: 'read the status code, and find the failed request in the network tab ' + 'yourself.',
      visual: clip({
        src: 'clip-08-network-interchange.mp4',
        source: {
          provider: 'pexels',
          id: '37368398',
          search: 'aerial view of busy highway interchange',
          author: 'David Pickup',
        },
      }),
      endsParagraph: true,
    },
    {
      // Reaching for the link.
      text: 'The waitlist link is in the comments.',
      visual: clip({
        src: 'clip-09-tap-the-link.mp4',
        source: {
          provider: 'pexels',
          id: '31830902',
          search: 'person using laptop on wooden desk',
          author: 'Helin Gezer',
        },
      }),
    },
    {
      // Something opening.
      text: 'Sign up and we’ll let you know when the learning path opens.',
      visual: clip({
        src: 'clip-10-box-opens-reveal.mp4',
        source: {
          provider: 'pexels',
          id: '7119462',
          search: 'person opening small box with egg inside',
          author: 'Ivan S',
        },
      }),
      endsParagraph: true,
    },
    {
      // Glass reflecting the city back. A question left hanging.
      text: '[pause][curious] How long does a bug wait before fixing where you work?',
      visual: clip({
        src: 'clip-11-city-reflection.mp4',
        source: {
          provider: 'pexels',
          id: '36302386',
          search: 'modern urban reflections in glass architecture',
          author: 'Earth Photart',
        },
      }),
    },
  ],
})
