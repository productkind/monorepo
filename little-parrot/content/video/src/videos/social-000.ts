import { defineVideo, gif, riveAtFrame } from '../narration/definition'

export default defineVideo({
  id: 'social-000',
  voice: 'chloe',
  model: 'eleven_v3',
  overlays: [
    riveAtFrame({ rive: 'parrot-greet-00.riv', frame: 0 }),
    riveAtFrame({ rive: 'parrot-follow-00.riv', frame: 1637 }),
    riveAtFrame({ rive: 'parrot-peek-00.riv', frame: 700 }),
  ],
  sections: [
    {
      text: "You are not falling behind on AI.",
      visual: gif({ src: 'section-00-running-fail.gif', offset: -100 }),
    },
    {
      text: "The panic is being sold to you.",
      visual: gif({ src: 'section-01-panic.gif' }),
    },
    {
      text: "Since ChatGPT entered our everyday lives, we’ve been bombarded with the message that we’ll be left behind",
      visual: gif({ src: 'section-02-chatgpt.gif', offset: -150 }),
    },
    {
      text: "if we don’t constantly keep up with",
      visual: gif({ src: 'section-03-follow.gif', offset: -100 }),
    },
    {
      text: "every new AI tool, model, and workflow.",
      visual: gif({ src: 'section-04-puppies.gif' }),
      endsParagraph: true,
    },
    {
      text: "As with any message, it is worth asking what motivation sits behind it.",
      visual: gif({ src: 'section-05-what.gif', offset: -150 }),
      endsParagraph: true,
    },
    {
      text: "Much of this urgency comes from private, venture-backed AI companies that need enough users",
      visual: gif({ src: 'section-06-greed.gif', offset: -150 }),
    },
    {
      text: "to meet the immense growth expectations of their investors.",
      visual: gif({ src: 'section-07-ads.gif', offset: -150 }),
    },
    {
      text: "If you are afraid you will lose your job, or become a",
      visual: gif({ src: 'section-08-fired.gif', offset: -150 }),
    },
    {
      text: "Discman in a Spotify world,",
      visual: gif({ src: 'section-09-diskman.gif', offset: -100 }),
    },
    {
      text: "you are more likely to start paying for their services sooner.",
      visual: gif({ src: 'section-10-pay.gif', offset: -150 }),
      endsParagraph: true,
    },
    {
      text: "In reality, AI can improve how you work.",
      visual: gif({ src: 'section-11-work.gif', offset: -250 }),
    },
    {
      text: "It can even make work more fun and exciting.",
      visual: gif({ src: 'section-12-excited.gif' }),
    },
    {
      text: "But that does not mean you need to rush.",
      visual: gif({ src: 'section-13-no-rush.gif', offset: -250 }),
      endsParagraph: true,
    },
    {
      text: "It is completely fine to take your time and get started",
      visual: gif({ src: 'section-14-walk-slow.gif', offset: -200 }),
    },
    {
      text: "with these technologies at your own pace. If you'd",
      visual: gif({ src: 'section-15-computer.gif', offset: -100 }),
    },
    {
      text: "like to learn more about AI calmly, follow along.",
      visual: gif({ src: 'section-16-come.gif', offset: -260 }),
    },
  ],
})
