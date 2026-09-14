import { clip, defineVideo, riveAtFrame } from '../narration/definition'

/**
 * A stock cut of "Your app goes down on Saturday", the vibe coder campaign's video 5.
 * Script: productkind/marketing/content/campaigns/2026-09-vibe-coder-validation/
 * video-5-keep-the-product-operable/script.md
 *
 * Same narration as `vibe-coder-validation-05`, so the audio cache serves this one the take it
 * already generated rather than paying ElevenLabs for the same words twice. The narration has to
 * stay character-identical for that to hold: edit the words here and this becomes a new take at
 * full price.
 *
 * Nineteen clauses merged into fourteen runs of two to five and a half seconds, no run crossing a
 * paragraph break. The stock cut of this video uses the same fourteen runs, so the two can be
 * compared shot for shot.
 *
 * Footage is Pexels, which asks for a credit and a link back rather than requiring one: credit
 * Pexels and the photographers named here in the video description.
 *
 * Provenance note: these clips were downloaded in an earlier session that never wrote a
 * definition, and the searches that found them were not recorded. Their ids and authors were
 * recovered by matching each shipped clip against the cached source downloads, so those are
 * accurate; the `search` values below are the assets' own Pexels slugs standing in for the
 * original terms.
 */
export default defineVideo({
  id: 'vibe-coder-validation-05-stock',
  voice: 'chloe',
  model: 'eleven_v3',
  overlays: [
    riveAtFrame({ rive: 'parrot-greet-00.riv', frame: 0 }),
    riveAtFrame({ rive: 'parrot-peek-00.riv', frame: 500 }),
  ],
  sections: [
    {
      // An empty room with the lights off. Saturday, and the place is shut.
      text: 'The app you built with AI goes down on Saturday.',
      visual: clip({
        src: 'clip-00-app-goes-down-weekend.mp4',
        source: {
          provider: 'pexels',
          id: '28514875',
          search: 'a dining room with green walls and wooden floors',
          author: 'Amar  Preciado',
        },
      }),
    },
    {
      // A quiet street of parked cars. Nobody out yet to see it.
      text: 'Who notices it first?',
      visual: clip({
        src: 'clip-01-who-notices-first.mp4',
        source: {
          provider: 'pexels',
          id: '28545385',
          search: 'a street with cars parked on both sides',
          author: 'SN.CHE',
        },
      }),
      endsParagraph: true,
    },
    {
      // Gears turning in mesh. A live thing that only keeps running if it is kept.
      text: 'A live app needs ongoing care. A service can fail,',
      visual: clip({
        src: 'clip-02-ongoing-maintenance-gears.mp4',
        source: {
          provider: 'pexels',
          id: '35069361',
          search: 'industrial gear mechanism in motion',
          author: 'Diego Castro Calderon',
        },
      }),
    },
    {
      // A crane over a half-built tower. The platform under you, still changing.
      text: 'a platform can change or your next update can break the live version.',
      visual: clip({
        src: 'clip-03-platform-changes-update-breaks.mp4',
        source: {
          provider: 'pexels',
          id: '34802604',
          search: 'modern high rise building with crane construction',
          author: 'khezez  | خزاز',
        },
      }),
      endsParagraph: true,
    },
    {
      // Hands typing at a laptop, asking.
      text: 'If the only recovery plan is asking the AI to fix it,',
      visual: clip({
        src: 'clip-04-asking-ai-to-fix-it.mp4',
        source: {
          provider: 'pexels',
          id: '6633341',
          search: 'a close up video of a person typing on a laptop',
          author: 'Cup of  Couple',
        },
      }),
    },
    {
      // A torch swung around in the dark, which is what guessing looks like.
      text: 'every outage starts with guessing.',
      visual: clip({
        src: 'clip-05-guessing-in-the-dark.mp4',
        source: {
          provider: 'pexels',
          id: '19333396',
          search: 'a person holding a flashlight in the dark',
          author: 'Sueda Dilli',
        },
      }),
      endsParagraph: true,
    },
    {
      // A ferry worker handling the mooring rope, the drill everyone has done before.
      text:
        'You need alerts, a tested backup and a recovery checklist you can follow ' + 'yourself.',
      visual: clip({
        src: 'clip-06-tested-backup-life-ring.mp4',
        source: {
          provider: 'pexels',
          id: '35575706',
          search: 'public ferry worker handling mooring ropes',
          author: 'Cemrecan Yurtman',
        },
      }),
      endsParagraph: true,
    },
    {
      // Sewing, stitch after stitch. Keeping a thing serviceable.
      text: 'If you want an app you can keep operating after launch,',
      visual: clip({
        src: 'clip-07-keeps-running-stitching.mp4',
        source: {
          provider: 'pexels',
          id: '8257517',
          search: 'a woman sewing',
          author: 'ArtHouse Studio',
        },
      }),
    },
    {
      // Cutting timber to length, building the thing rather than talking about it.
      text: 'that’s what we’re building a learning path for.',
      visual: clip({
        src: 'clip-08-building-the-learning-path.mp4',
        source: {
          provider: 'pexels',
          id: '5758778',
          search: 'person cutting wood',
          author: 'Anna Shvets',
        },
      }),
      endsParagraph: true,
    },
    {
      // A street lamp coming on in the rain. The alert you actually notice.
      text: 'By the end, you’ll set an availability alert,',
      visual: clip({
        src: 'clip-09-alert-light-comes-on.mp4',
        source: {
          provider: 'pexels',
          id: '13961748',
          search: 'street lamp during rain',
          author: 'Julio Lopez',
        },
      }),
    },
    {
      // A wheel going back on in a workshop. Practising the restore before you need it.
      text:
        'practise restoring a working version and plan your updates, backups and ' + 'cost checks.',
      visual: clip({
        src: 'clip-10-restoring-spare-wheel.mp4',
        source: {
          provider: 'pexels',
          id: '37451898',
          search: 'car maintenance tire installation in workshop',
          author: 'Redyar Rzgar',
        },
      }),
      endsParagraph: true,
    },
    {
      // A hand reaching up into the open sky.
      text: 'The waitlist link is in the comments.',
      visual: clip({
        src: 'clip-11-waitlist-hand-raised.mp4',
        source: {
          provider: 'pexels',
          id: '16889076',
          search: 'a person s hand reaching up to the sky',
          author: 'Rüveyda',
        },
      }),
    },
    {
      // Pages turning under a hand, something opening.
      text: 'Sign up and we’ll let you know when the learning path opens.',
      visual: clip({
        src: 'clip-12-learning-path-opens.mp4',
        source: {
          provider: 'pexels',
          id: '9080218',
          search: 'a hand flipping pages of a book',
          author: 'Oliver García',
        },
      }),
      endsParagraph: true,
    },
    {
      // A still, empty room, waiting on the question.
      text: '[pause][curious] How would you know your app was down?',
      visual: clip({
        src: 'clip-13-how-would-you-know.mp4',
        source: {
          provider: 'pexels',
          id: '36516355',
          search: 'modern minimalist living room design',
          author: 'Real  Estate 4k',
        },
      }),
    },
  ],
})
