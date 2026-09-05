import { defineVideo, gif, riveAtFrame, still } from '../narration/definition'

/**
 * social-016, with every visual placed by `placeMedia` instead of by hand.
 *
 * Not one section carries an offset. The geometry comes from each gif's own pixel size, fitted to
 * the region between the bottom of the top platform bar and the top of the captions.
 */
export default defineVideo({
  id: 'social-018',
  // The same 106 MB of gifs as social-016; no reason to duplicate them.
  assets: 'social-016',
  voice: 'chloe',
  model: 'eleven_v3',
  overlays: [
    riveAtFrame({ rive: 'parrot-greet-00.riv', frame: 0 }),
    riveAtFrame({ rive: 'parrot-peek-00.riv', frame: 500 }),
  ],
  sections: [
    {
      text: "It doesn’t have to be overwhelming to create an interactive lead magnet with AI",
      visual: gif({ src: 'section-00-overwhelmed.gif', place: 'above-captions' }),
    },
    {
      text: "and win bigger consulting clients as a freelancer.",
      visual: gif({ src: 'section-01-win.gif', place: 'above-captions' }),
      endsParagraph: true,
    },
    {
      text: "If you start researching how to build a website using AI,",
      visual: gif({ src: 'section-02-research.gif', place: 'above-captions' }),
    },
    {
      text: "you’ll come across a gazillion tools.",
      visual: gif({ src: 'section-03-lots.gif', place: 'above-captions' }),
    },
    {
      text: "In this video, we’ll show you how to choose between them,",
      visual: gif({ src: 'section-04-choose.gif', place: 'above-captions' }),
    },
    {
      text: "and at the end, we’ll show you how to write your first prompt.",
      visual: gif({ src: 'section-05-computer.gif', place: 'above-captions' }),
      endsParagraph: true,
    },
    {
      text: "The three most popular AI coding tools are Claude Code, Cursor, and Lovable.",
      visual: gif({ src: 'section-06-three.gif', place: 'above-captions' }),
    },
    {
      text: "Many of the other tools follow similar approaches.",
      visual: gif({ src: 'section-07-clone.gif', place: 'above-captions' }),
      endsParagraph: true,
    },
    {
      text: "These tools sit on a spectrum,",
      visual: gif({ src: 'section-08-spectrum.gif', place: 'above-captions' }),
    },
    {
      text: "with customisability at one end",
      visual: gif({ src: 'section-09-buttons.gif', place: 'above-captions' }),
    },
    {
      text: "and ease of use at the other.",
      visual: gif({ src: 'section-10-easy.gif', place: 'above-captions' }),
    },
    {
      text: "Claude Code and Cursor can handle almost any technology with the right setup,",
      visual: gif({ src: 'section-11-technology.gif', place: 'above-captions' }),
    },
    {
      text: "but they don’t provide all the infrastructure you need to share the lead magnet as a website with others.",
      visual: gif({ src: 'section-12-industry.gif', place: 'above-captions' }),
    },
    {
      text: "Lovable not",
      visual: gif({ src: 'section-13-lovable.gif', color: '#ffffff', place: 'above-captions' }),
    },
    {
      text: "only writes the code,",
      visual: gif({ src: 'section-14-code.gif', place: 'above-captions' }),
    },
    {
      text: "but also shows you what your lead magnet looks like,",
      visual: gif({ src: 'section-15-leadmagnet.gif', place: 'above-captions' }),
    },
    {
      text: "helps you deliver it to your customers,",
      visual: gif({ src: 'section-16-computer-cool.gif', place: 'above-captions' }),
    },
    {
      text: "and takes care of the technical details.",
      visual: gif({ src: 'section-17-server.gif', place: 'above-captions' }),
    },
    {
      text: "It’s a great choice for early-stage products",
      visual: gif({ src: 'section-18-kitten.gif', place: 'above-captions' }),
    },
    {
      text: "and, you guessed it, for lead magnets.",
      visual: gif({ src: 'section-19-magnet.gif', place: 'above-captions' }),
      endsParagraph: true,
    },
    {
      text: "To get started, describe how your lead magnet should work",
      visual: gif({ src: 'section-20-type.gif', place: 'above-captions' }),
    },
    {
      text: "using this prompt template, and Lovable can build the first version in minutes.",
      visual: still({ src: 'section-21-prompt.png', place: 'above-captions' }),
    },
    {
      text: "Check the result, give it feedback, and then add new functionality step by step.",
      visual: gif({ src: 'section-22-repeat.gif', place: 'above-captions' }),
      endsParagraph: true,
    },
    {
      text: "Of course, this is just the beginning.",
      visual: gif({ src: 'section-23-start.gif', place: 'above-captions' }),
    },
    {
      text: "Follow along to level up your consulting game with AI!",
      visual: gif({ src: 'section-24-evolve.gif', place: 'above-captions' }),
    },
  ],
})
