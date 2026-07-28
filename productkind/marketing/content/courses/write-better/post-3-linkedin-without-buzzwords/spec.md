---
status: drafted
channels: [instagram]
account: little-parrot
---

# Post 3: LinkedIn posts that sound like you

**Pillar:** the method, shown (and our own register, modelled).
**Research trace:** LinkedIn is the audience's primary career channel, and
the fear of sounding braggy or staged is the documented visibility blocker;
the anti-guru stance is our grounded-register positioning made teachable;
the three-part prompt is the course's synthesis and arrives here. Draws on
the course's Challenge 3 (its parody output, its two tone options, and its
three-part prompt are the source for the slide mockups).

**The one takeaway:** your chat assistant writes LinkedIn like a guru
because you never told it whose voice to use; naming the voice and handing
over the real facts fixes it, and pasting one of your own past posts is the
shortcut.

## Format

**Spec key for the designer:** In the slide table, any text introduced as
"Prompt:" (or "Part 1:", "Part 2:", "Part 3:") or written with markdown
symbols (##, -, 1., backticks) is a prompt snippet: literal text the learner
types into a tool. Render it verbatim in monospace inside a prompt-input
mockup (a chat input field with a cursor and send arrow), so it reads as
typed text rather than decoration; markdown symbols are part of the typed
text, never styled labels. Message outputs render as LinkedIn post cards
(avatar, reactions, a comment). Everything else in "Display copy" is display
copy in the brand style.

**Carousel, 7 slides, 1080 x 1350 (4:5 portrait).** Parody-then-rebuild
style, with a repeating rhythm on slides 2 to 4: prompt window on top, the
resulting post card below it, one part added to the prompt each time. The
guru post is rendered in full cringe on slide 2 (rocket, 10x, hashtag pile),
then the calm rebuild, tone and context blocks in monospace.

**Full-fidelity rule:** every word that appears on a slide is in this table,
verbatim. The implemented carousel may not add copy; `check.py` in
`productkind/carousel-design/` enforces it.

| Slide | Visual | Display copy (verbatim) | Prompt window / mockup content (verbatim) |
| --- | --- | --- | --- |
| 1 (cover) | Headline; at the bottom of the slide a LinkedIn post being drafted, the guru opener already typed, a rocket emoji sitting in it, cursor at the end; Little Parrot mascot is peaking in from the right | "Posting about your own work, without sounding like a LinkedIn guru." Kicker: "A PROMPTING TECHNIQUE FOR EXACTLY THIS. SWIPE →" | Draft post (greyed; parody; banned-list exempt): `🚀 Exciting news! I've just completed an incredible journey` (cursor at the end) |
| 2 | Grey prompt window, then the full parody post card below it: rocket, bullet list of takeaways, a stack of hashtags | "Ask a chat assistant for 'a LinkedIn post' and you get its best guru impression. Would you post that? Neither would we." Footnote: "It imitates the loudest posts it has read, because you never told it whose voice to use." | Label: "YOUR PROMPT" · Prompt: `Write a short LinkedIn post announcing that I've just finished a practical micro-course on AI prompting.` · LinkedIn post (parody; banned-list exempt): "🚀 Exciting news! I've just completed an incredible journey learning prompting techniques! 💡 Key takeaways that completely transformed my approach: mastering the art of strategic prompting, unlocking AI's full potential, driving 10x productivity gains. The future is here, and I'm thrilled to be part of this transformation! #AITransformation #PromptEngineering #Innovation #FutureOfWork" |
| 3 | Prompt window: part one dimmed, the tone block in black with the cursor; below it a calm, simply worded post card with one polite reaction | "So, name your voice. Part two of the prompt says how it should sound." Footnote: "Now it sounds like a person, and still says almost nothing about what you did." | Label: "YOUR PROMPT" · Part 1 (dimmed): `Write a short LinkedIn post announcing that I've just finished a practical micro-course on AI prompting.` · Part 2 (contains buzzwords as instructions; banned-list exempt): `Tone and style:` `- Friendly, approachable, understated, sincere` `- Simple wording, no exaggeration` `- 5 to 6 sentences, no emoji pileups` `- Avoid LinkedIn buzzwords like "game-changer" or "10x productivity"` · LinkedIn post: "I recently completed a short micro-course on AI prompting, and I found it really useful. I learned a lot about getting better results from AI tools, and I'm looking forward to putting it into practice. Highly recommend it if you're curious!" |
| 4 | Prompt window: parts one and two dimmed, the context block in black; below it the specific post card, reactions arriving and a comment from a colleague | "So hand over the facts: what you did, one detail only you know, why it was worth your time." | Label: "YOUR PROMPT" · Parts 1 and 2 (dimmed): `Tone and style: friendly, understated, sincere. Simple wording, 5 to 6 sentences.` · Part 3: `Context and background:` `- A 10-minute micro-course on prompting for work messages: Slack, product updates, LinkedIn posts` `- Main thing I learned: prompting is specific techniques you can practise, not magic` `- Since then I add a tone block to every draft, which saved me three rewrites this week` · LinkedIn post: "I spent 10 minutes on a prompting micro-course this week, and it has already saved me three rewrites of the same Slack message. The change was two lines about tone, added before the request. Turns out prompting is a set of techniques you can practise, rather than a knack you either have or you don't." · Comment from a colleague: "Okay, send me the link please 🙌" |
| 5 | Three stacked recipe cards, gradient palette, numbered | "Three parts, in this order:" Cards: "1 · THE REQUEST · What you want written." / "2 · TONE AND STYLE · How it should sound, and how long." / "3 · CONTEXT AND BACKGROUND · The facts it can't guess." Footnote: "The same three parts work on a Slack message, a product update, a release email." | (none) |
| 6 | A post of your own being pasted into the prompt window as a sample | "The shortcut to 'sounds like me': paste one of your own past posts in as a style sample." Footnote: "A chat assistant mirrors patterns, so give it yours. Go and find the post you were happiest with, that's your sample." | Label: "YOUR PROMPT" · Part 4: `Here is a post I wrote myself. Match this voice:` `[paste your post]` |
| 7 (CTA) | Brand card: badge, mascot at laptop | "Being visible in your industry shouldn't need a voice that isn't yours. Rebuild your own post in Challenge 3 of Write Better with AI: Prompting Foundations for Product Managers." Badge: "LittleParrot.app" · "First challenge free 💛" · "Save the tone block for your next post 🔖" | (none) |

**Alt text (for the post):** A carousel about de-buzzwording AI-drafted
LinkedIn posts: a bare prompt produces a rocket-and-hashtags guru post,
adding a tone block produces a calm but empty post, adding real context
produces a specific post people comment on, plus the three-part prompt
structure and the shortcut of pasting one of your own past posts as a style
sample.

## Caption

Written after the exports are signed off, with the **captions** skill, into
`captions.md` in this piece's folder. The earlier hand-drafted caption was
based on the previous 7-slide draft; it is superseded by that step.