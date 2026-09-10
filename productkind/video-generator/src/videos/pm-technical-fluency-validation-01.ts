import { defineVideo, gif, riveAtFrame } from '../narration/definition'

/**
 * Video 1 of the PM technical fluency campaign, "Nodding along in stand-up".
 * Script: productkind/marketing/content/campaigns/2026-09-pm-technical-fluency-validation/
 * video-1-nodding-along-in-stand-up/script.md
 *
 * The CTA is the LinkedIn / YouTube Shorts variant ("link in the comments"), which is the script
 * as written. TikTok and Instagram Reels need the URL spoken and shown instead, so they want a
 * second definition rather than a re-edit of this one.
 *
 * Every visual is a giphy gif, chosen text-free: no burned-in captions, no channel watermarks,
 * and squarish, which is what the published videos look like. Each section names the search that
 * found it. Two beats the production notes want as screenshots rather than gifs are marked below;
 * the gifs there stand in until the screenshots exist.
 *
 * Where a gif is shorter than its slot and plays a one-shot motion, `loopBehavior` holds the last
 * frame instead of restarting mid-beat. Where the gap is wider, `playbackRate` stretches the gif
 * to fill the slot in a single pass. Everything else is either longer than its slot or loops
 * cyclically, so it needs neither.
 */
export default defineVideo({
  id: 'pm-technical-fluency-validation-01',
  voice: 'chloe',
  model: 'eleven_v3',
  overlays: [
    riveAtFrame({ rive: 'parrot-greet-00.riv', frame: 0 }),
    riveAtFrame({ rive: 'parrot-peek-00.riv', frame: 500 }),
  ],
  sections: [
    {
      text: 'You’ve nodded along in a stand-up,',
      visual: gif({
        src: 'section-00-nodding.gif',
        source: { provider: 'giphy', id: 'sdyQm2V3Mc2x2A4Sr3', search: 'nodding yes cat' },
        place: 'above-captions',
      }),
    },
    {
      text: 'hoping nobody asks you a follow-up question.',
      visual: gif({
        src: 'section-01-nervous.gif',
        source: {
          provider: 'giphy',
          id: 'ycd33pEC8uLc9F3Cdz',
          search: 'avoid eye contact nervous',
        },
        place: 'above-captions',
      }),
      endsParagraph: true,
    },
    {
      // Stands in for what the production notes want here: a typed meeting note reading
      // "migration blocked by platform team".
      text: 'Someone says the migration is blocked by the platform team.',
      visual: gif({
        src: 'section-02-meeting.gif',
        source: { provider: 'giphy', id: 'ipgQEioEetBm0scBr3', search: 'office meeting listening' },
        playbackRate: 0.61,
        place: 'above-captions',
      }),
    },
    {
      text: 'You don’t know what that means for your release.',
      visual: gif({
        src: 'section-03-shrug.gif',
        source: { provider: 'giphy', id: 'sZEl1yTi26mJzrI4VN', search: 'i dont know shrug' },
        place: 'above-captions',
      }),
      endsParagraph: true,
    },
    {
      // 1.84s of lips being sealed, slowed to cover the 1.9s beat in one pass.
      text: 'So you don’t ask.',
      visual: gif({
        src: 'section-04-quiet.gif',
        source: { provider: 'giphy', id: '48hZD1upEM0w3tP0gW', search: 'zip lips quiet' },
        playbackRate: 0.97,
        place: 'above-captions',
      }),
    },
    {
      // The shortest gif in the video, 0.90s against a 1.2s slot. At 0.75 speed the clocks
      // tumble once across the whole beat instead of restarting a third of the way in.
      text: 'Three weeks later,',
      visual: gif({
        src: 'section-05-clocks.gif',
        source: { provider: 'giphy', id: 'xTiTnEeKtzw4zJyFsQ', search: 'time passing clock' },
        playbackRate: 0.75,
        place: 'above-captions',
      }),
    },
    {
      // Slowed so the field is still toppling at the cut, rather than springing back up.
      text: 'that blocker is why your release date moves.',
      visual: gif({
        src: 'section-06-dominoes.gif',
        source: { provider: 'giphy', id: 'lvMhtbcATyeEBc1gzd', search: 'domino falling' },
        playbackRate: 0.99,
        place: 'above-captions',
      }),
      endsParagraph: true,
    },
    {
      text: 'Nobody taught you those words.',
      visual: gif({
        src: 'section-07-book.gif',
        source: { provider: 'giphy', id: '2lzFTmg15tNbxHFWEg', search: 'confused reading book' },
        playbackRate: 0.97,
        place: 'above-captions',
      }),
    },
    {
      text: 'Looking up a definition afterwards',
      visual: gif({
        src: 'section-08-search.gif',
        source: { provider: 'giphy', id: 'XZMApO2tucBKWjtgvr', search: 'typing search phone' },
        place: 'above-captions',
      }),
    },
    {
      // 1.96s against 2.3s, stretched so the blank stare holds for the whole line.
      text: 'doesn’t tell you what it means for your release.',
      visual: gif({
        src: 'section-09-blank.gif',
        source: { provider: 'giphy', id: 'ZV0d7QC1bCC2RgXJtg', search: 'blank stare confused' },
        playbackRate: 0.85,
        place: 'above-captions',
      }),
      endsParagraph: true,
    },
    {
      text: 'If you’d rather be the one who asks these questions,',
      visual: gif({
        src: 'section-10-hand-up.gif',
        source: { provider: 'giphy', id: 'w5xEwipLyIBMdINSvn', search: 'hand up pick me' },
        place: 'above-captions',
      }),
    },
    {
      // Same family of 3D creatures as social-016's opener, which is the house look.
      text: 'we’re building a learning path for exactly this.',
      visual: gif({
        src: 'section-11-building.gif',
        source: { provider: 'giphy', id: 'jvUjz1RF0pZue1JgVG', search: 'building blocks stacking' },
        place: 'above-captions',
      }),
      endsParagraph: true,
    },
    {
      // A parrot saying it back, on the Little Parrot account, over the line about saying a
      // change back in your own words.
      text: 'By the end you’ll say a change back in your own words,',
      visual: gif({
        src: 'section-12-parrot.gif',
        source: { provider: 'giphy', id: 'v02uv7Pshwxsa7viq2', search: 'parrot talking' },
        playbackRate: 0.93,
        place: 'above-captions',
      }),
    },
    {
      text: 'ask what it does to your product,',
      visual: gif({
        src: 'section-13-question.gif',
        source: { provider: 'giphy', id: 'Ie8ncfWOhpNeH9morB', search: 'asking question' },
        playbackRate: 0.72,
        place: 'above-captions',
      }),
    },
    {
      text: 'and understand the answer while you’re in the meeting.',
      visual: gif({
        src: 'section-14-lightbulb.gif',
        source: { provider: 'giphy', id: '3aYnAs1OHimXSuZAUm', search: 'aha moment idea' },
        color: '#298c8c',
        place: 'above-captions',
      }),
      endsParagraph: true,
    },
    {
      // Stands in for the waitlist page the production notes want on screen here.
      text: 'The waitlist link is in the comments.',
      visual: gif({
        src: 'section-15-pointing.gif',
        source: { provider: 'giphy', id: 'wPskSPeu2grXPyBmq1', search: 'tap here below' },
        color: '#edec00',
        place: 'above-captions',
      }),
    },
    {
      text: 'Sign up and we’ll let you know when the learning path opens.',
      visual: gif({
        src: 'section-16-notification.gif',
        source: {
          provider: 'giphy',
          id: 'bV43y3KbW5qozIXzMd',
          search: 'notification bell ringing',
        },
        color: '#ffffff',
        playbackRate: 0.61,
        place: 'above-captions',
      }),
      endsParagraph: true,
    },
    {
      // Slowed so the question mark is still being drawn as the video ends.
      text: '[pause][curious] What technical word did you look up last?',
      visual: gif({
        src: 'section-17-question-mark.gif',
        source: { provider: 'giphy', id: 'ducsQFMyHcdiTeIcuD', search: 'question marks floating' },
        color: '#1de3a5',
        playbackRate: 0.92,
        place: 'above-captions',
      }),
    },
  ],
})
