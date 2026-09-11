import { clip, defineVideo, riveAtFrame } from '../narration/definition'

/**
 * A stock-footage cut of "Done, and your users still don't have it", the PM technical fluency
 * campaign's video 4.
 * Script: productkind/marketing/content/campaigns/2026-09-pm-technical-fluency-validation/
 * video-4-done-and-users-still-dont-have-it/script.md
 *
 * Same narration as `pm-technical-fluency-validation-04`, so the audio cache serves this one the
 * take it already generated rather than paying ElevenLabs for the same words twice. The narration
 * has to stay character-identical for that to hold: edit the words here and this becomes a new
 * take at full price.
 *
 * Twelve clips of two to six seconds, grouped exactly as the b-roll cut of the same video is, so
 * both cuts change picture on the same words. The grouping comes from the narrated timeline rather
 * than a timer, so every cut lands on a clause boundary and no run crosses a paragraph break.
 *
 * The script is about something finished that has not arrived, so the cut is full of things loaded
 * and stopped: an empty overpass, a dam, ships at anchor, an empty stand. Water carries four of
 * the twelve beats, which is more than ideal but not accidental at runs 1 and 10 — the same
 * element held back, then let through.
 *
 * Footage is Pexels, whose licence allows commercial use with no attribution. Its rule that
 * identifiable people may not appear in a bad light is not tested here: nobody appears in the cut
 * at all. The API guidelines ask for a link back to Pexels, so credit it in the description, and
 * the photographer is recorded on each clip for the same reason.
 *
 * Every clip is a second longer than the beat it covers, because `clip` has no playback rate and
 * no loop: one that ran out would hold a frozen frame while the captions kept moving. Each file is
 * trimmed to its beat plus that second, stripped of audio and re-encoded to H.264 at CRF 23 with
 * BT.709 tags, and no grade is applied — stock arrives as SDR BT.709 already.
 */
export default defineVideo({
  id: 'pm-technical-fluency-validation-04-stock',
  voice: 'chloe',
  model: 'eleven_v3',
  overlays: [
    riveAtFrame({ rive: 'parrot-greet-00.riv', frame: 0 }),
    riveAtFrame({ rive: 'parrot-peek-00.riv', frame: 500 }),
  ],
  sections: [
    {
      // A finished overpass with nothing on it. Built, and carrying no one.
      text: 'Engineering says it’s done. Your users still don’t have it.',
      visual: clip({
        src: 'clip-00-finished-road-empty.mp4',
        source: {
          provider: 'pexels',
          id: '36642136',
          search: 'completed highway overpass empty',
          author: 'Emrul Kausar Emon',
        },
      }),
      endsParagraph: true,
    },
    {
      // A dam holding the water back. Tested, ready, and waiting on somebody else to
      // open something.
      text: 'It’s built, it’s tested, and it’s waiting behind another team’s release.',
      visual: clip({
        src: 'clip-01-held-back-reservoir.mp4',
        source: {
          provider: 'pexels',
          id: '30278784',
          search: 'dam holding back water reservoir',
          author: 'David Pickup',
        },
      }),
    },
    {
      // The moon. A team that ships once a month runs on a cycle you do not control.
      text: 'Nobody told you that team ships once a month.',
      visual: clip({
        src: 'clip-02-monthly-moon-cycle.mp4',
        source: {
          provider: 'pexels',
          id: '28986033',
          search: 'full moon phases night sky',
          author: 'Wei86 Travel',
        },
      }),
      endsParagraph: true,
    },
    {
      // A needle in a groove, going round. Saying the same thing three weeks
      // running.
      text: 'You’ve been telling your stakeholder it’s coming this week. For three weeks.',
      visual: clip({
        src: 'clip-03-repeated-promise-record.mp4',
        source: {
          provider: 'pexels',
          id: '16277046',
          search: 'vinyl record needle spinning groove',
          author: 'Matthias Groeneveld',
        },
      }),
      endsParagraph: true,
    },
    {
      // A drainage line cutting straight across a field. Where your part of the system
      // stops.
      text: 'Done meant finished in your part of the system.',
      visual: clip({
        src: 'clip-04-boundary-of-your-part.mp4',
        source: {
          provider: 'pexels',
          id: '36107782',
          search: 'border line fence dividing field',
          author: 'Karography',
        },
      }),
    },
    {
      // An empty stand. Finished is not the same as live, and this is what the difference looks
      // like.
      text: 'That isn’t the same as live for your users.',
      visual: clip({
        src: 'clip-05-built-not-live-stadium.mp4',
        source: {
          provider: 'pexels',
          id: '33507586',
          search: 'empty stadium seats no crowd',
          author: 'WAAHHAAM',
        },
      }),
      endsParagraph: true,
    },
    {
      // Looking up a spiral of balconies. The turn in the script. Warmer and more
      // saturated than the rest of the cut, deliberately, because it is the one hopeful frame in
      // the first two thirds.
      text: 'If you want to know where your feature actually is, we’re building a learning path for it.',
      visual: clip({
        src: 'clip-06-learning-path-spiral.mp4',
        source: {
          provider: 'pexels',
          id: '36443293',
          search: 'spiral staircase ascending from below',
          author: 'Yaşar Başkurt',
        },
      }),
      endsParagraph: true,
    },
    {
      // Bottles moving through a line of stages, which is the shape of review, testing
      // and environments. Close in register to the production line in
      // vibe-coder-validation-01-stock, though the footage and the framing differ.
      text: 'By the end you’ll be able to follow one change through review, testing, environments',
      visual: clip({
        src: 'clip-07-trace-through-stages.mp4',
        source: {
          provider: 'pexels',
          id: '31715274',
          search: 'conveyor belt bottles moving stages',
          author: 'Jonathan David',
        },
      }),
    },
    {
      // Ships at anchor off the coast, loaded and stopped. Every team it waits on.
      text: 'and every team it waits on, and say exactly what’s holding it up.',
      visual: clip({
        src: 'clip-08-holding-it-up-anchored-ship.mp4',
        source: {
          provider: 'pexels',
          id: '32104240',
          search: 'cargo ships anchored offshore waiting',
          author: 'Beck Luo',
        },
      }),
      endsParagraph: true,
    },
    {
      // Seed pouring down, so the CTA beat moves downward. Rain, waterfalls, sparks,
      // snow, a descending gondola and falling sand were all spent on the earlier cuts.
      text: 'The waitlist link is in the comments.',
      visual: clip({
        src: 'clip-09-link-below-seeds-pouring.mp4',
        source: {
          provider: 'pexels',
          id: '7118056',
          search: 'seeds pouring falling slow motion',
          author: 'Michael Burrows',
        },
      }),
    },
    {
      // A lock with the water rushing through, which is a way being opened rather than a door.
      // Deliberately rhymes with run 1: the same water, held back there and let through here.
      // Replaces a drawbridge whose raised span read as a closed road, the opposite of the line.
      text: 'Sign up and we’ll let you know when the learning path opens.',
      visual: clip({
        src: 'clip-10-lock-lets-through.mp4',
        source: {
          provider: 'pexels',
          id: '31075684',
          search: 'canal lock gates filling boat',
          author: 'David Pickup',
        },
      }),
      endsParagraph: true,
    },
    {
      // A mill wheel turning at its own steady rate, for a closing question about how often
      // you release.
      text: '[pause][curious] How often do you release new improvements for your users?',
      visual: clip({
        src: 'clip-11-release-cadence-waterwheel.mp4',
        source: {
          provider: 'pexels',
          id: '32993312',
          search: 'water wheel turning mill slow motion',
          author: 'Vitaliy Bratkov',
        },
      }),
    },
  ],
})
