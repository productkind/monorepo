import { defineVideo, gif, riveAtFrame } from '../narration/definition'

/**
 * Video 0 of the PM technical fluency campaign, "Nodding along in stand-up".
 * Script: productkind/marketing/content/campaigns/2026-09-pm-technical-fluency-validation/
 * video-0-nodding-along-in-stand-up/script.md
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
  id: 'pm-technical-fluency-validation-00',
  voice: 'chloe',
  model: 'eleven_v3',
  overlays: [
    riveAtFrame({ rive: 'parrot-greet-00.riv', frame: 0 }),
    riveAtFrame({ rive: 'parrot-peek-00.riv', frame: 500 }),
  ],
  sections: [
    {
      // giphy "nodding yes cat": https://giphy.com/gifs/sdyQm2V3Mc2x2A4Sr3
      text: "You’ve nodded along in a stand-up,",
      visual: gif({ src: 'section-00-nodding.gif', place: 'above-captions' }),
    },
    {
      // giphy "avoid eye contact nervous": https://giphy.com/gifs/ycd33pEC8uLc9F3Cdz
      text: "hoping nobody asks you a follow-up question.",
      visual: gif({ src: 'section-01-nervous.gif', place: 'above-captions' }),
      endsParagraph: true,
    },
    {
      // giphy "office meeting listening": https://giphy.com/gifs/ipgQEioEetBm0scBr3
      // Stands in for what the production notes want here: a typed meeting note reading
      // "migration blocked by platform team".
      text: "Someone says the migration is blocked by the platform team.",
      visual: gif({
        src: 'section-02-meeting.gif',
        playbackRate: 0.61,
        place: 'above-captions',
      }),
    },
    {
      // giphy "i dont know shrug": https://giphy.com/gifs/sZEl1yTi26mJzrI4VN
      text: "You don’t know what that means for your release.",
      visual: gif({ src: 'section-03-shrug.gif', place: 'above-captions' }),
      endsParagraph: true,
    },
    {
      // giphy "zip lips quiet": https://giphy.com/gifs/48hZD1upEM0w3tP0gW
      // 1.84s of lips being sealed, slowed to cover the 1.9s beat in one pass.
      text: "So you don’t ask.",
      visual: gif({ src: 'section-04-quiet.gif', playbackRate: 0.97, place: 'above-captions' }),
    },
    {
      // giphy "time passing clock": https://giphy.com/gifs/xTiTnEeKtzw4zJyFsQ
      // The shortest gif in the video, 0.90s against a 1.2s slot. At 0.75 speed the clocks
      // tumble once across the whole beat instead of restarting a third of the way in.
      text: "Three weeks later,",
      visual: gif({ src: 'section-05-clocks.gif', playbackRate: 0.75, place: 'above-captions' }),
    },
    {
      // giphy "domino falling": https://giphy.com/gifs/lvMhtbcATyeEBc1gzd
      // Slowed so the field is still toppling at the cut, rather than springing back up.
      text: "that blocker is why your release date moves.",
      visual: gif({ src: 'section-06-dominoes.gif', playbackRate: 0.99, place: 'above-captions' }),
      endsParagraph: true,
    },
    {
      // giphy "confused reading book": https://giphy.com/gifs/2lzFTmg15tNbxHFWEg
      text: "Nobody taught you those words.",
      visual: gif({ src: 'section-07-book.gif', playbackRate: 0.97, place: 'above-captions' }),
    },
    {
      // giphy "typing search phone": https://giphy.com/gifs/XZMApO2tucBKWjtgvr
      text: "Looking up a definition afterwards",
      visual: gif({ src: 'section-08-search.gif', place: 'above-captions' }),
    },
    {
      // giphy "blank stare confused": https://giphy.com/gifs/ZV0d7QC1bCC2RgXJtg
      // 1.96s against 2.3s, stretched so the blank stare holds for the whole line.
      text: "doesn’t tell you what it means for your release.",
      visual: gif({ src: 'section-09-blank.gif', playbackRate: 0.85, place: 'above-captions' }),
      endsParagraph: true,
    },
    {
      // giphy "hand up pick me": https://giphy.com/gifs/w5xEwipLyIBMdINSvn
      text: "If you’d rather be the one who asks these questions,",
      visual: gif({ src: 'section-10-hand-up.gif', place: 'above-captions' }),
    },
    {
      // giphy "building blocks stacking": https://giphy.com/gifs/jvUjz1RF0pZue1JgVG
      // Same family of 3D creatures as social-016's opener, which is the house look.
      text: "we’re building a learning path for exactly this.",
      visual: gif({ src: 'section-11-building.gif', place: 'above-captions' }),
      endsParagraph: true,
    },
    {
      // giphy "parrot talking": https://giphy.com/gifs/v02uv7Pshwxsa7viq2
      // A parrot saying it back, on the Little Parrot account, over the line about saying a
      // change back in your own words.
      text: "By the end you’ll say a change back in your own words,",
      visual: gif({ src: 'section-12-parrot.gif', playbackRate: 0.93, place: 'above-captions' }),
    },
    {
      // giphy "asking question": https://giphy.com/gifs/Ie8ncfWOhpNeH9morB
      text: "ask what it does to your product,",
      visual: gif({ src: 'section-13-question.gif', playbackRate: 0.72, place: 'above-captions' }),
    },
    {
      // giphy "aha moment idea": https://giphy.com/gifs/3aYnAs1OHimXSuZAUm
      text: "and understand the answer while you’re in the meeting.",
      visual: gif({ src: 'section-14-lightbulb.gif', color: '#298c8c', place: 'above-captions' }),
      endsParagraph: true,
    },
    {
      // giphy "tap here below": https://giphy.com/gifs/wPskSPeu2grXPyBmq1
      // Stands in for the waitlist page the production notes want on screen here.
      text: "The waitlist link is in the comments.",
      visual: gif({ src: 'section-15-pointing.gif', color: '#edec00', place: 'above-captions' }),
    },
    {
      // giphy "notification bell ringing": https://giphy.com/gifs/bV43y3KbW5qozIXzMd
      text: "Sign up and we’ll let you know when the learning path opens.",
      visual: gif({
        src: 'section-16-notification.gif',
        color: '#ffffff',
        playbackRate: 0.61,
        place: 'above-captions',
      }),
      endsParagraph: true,
    },
    {
      // giphy "question marks floating": https://giphy.com/gifs/ducsQFMyHcdiTeIcuD
      // Slowed so the question mark is still being drawn as the video ends.
      text: "[pause][curious] What technical word did you look up last?",
      visual: gif({
        src: 'section-17-question-mark.gif',
        color: '#1de3a5',
        playbackRate: 0.92,
        place: 'above-captions',
      }),
    },
  ],
})
