# Post 1: The status nudge that sounds right

**Pillar:** the method, shown.
**Research trace:** the work wedge: a task she has this week, solved with a
teachable technique; the awkward-message fear is a confidence moment
(wanting to check progress without sounding controlling); before/after
prompting is the proven contrast format; points at the free first
challenge, which practises this exact scenario in a sandbox. Draws on the
course's Challenge 1.

## Format

**Spec key for the designer:** In the slide table, any text introduced as
"Prompt:" (or "prompt Lovable:", "Say:", "Assembled:") or written with
markdown symbols (##, -, 1., backticks) is a prompt snippet: literal text
the learner types into a tool. Render it verbatim in monospace inside a
prompt-input mockup (a chat input field with a cursor and send arrow), so
it reads as typed text rather than decoration; markdown symbols are part of
the typed text, never styled labels. Everything else in "Text on slide" is
display copy in the brand style.

**Carousel, 7 slides, 1080 x 1350 (4:5 portrait).** Chat-mockup style:
Slack-like message cards, the bare-prompt output buzzword-y, the tuned
output short and warm, the tone block in monospace.

**Full-fidelity rule:** every word that appears on a slide is in this table,
verbatim. The implemented carousel may not add copy; `check.py` in
`productkind/carousel-design/` enforces it.

| Slide | Visual | Display copy (verbatim) | Prompt window / mockup content (verbatim) |
| --- | --- | --- | --- |
| 1 (cover) | Headline; an unsent Slack draft peeking from the bottom edge, cursor at the end of the unfinished sentence | "The fix is urgent, and you need to ask the devs without sounding controlling." Kicker: "A PROMPTING TECHNIQUE FOR EXACTLY THIS. SWIPE →" | Label: "UNSENT DRAFT, TAKE 4 😬" · Draft: `Hey, sorry to chase, but I was wondering if maybe` (cursor at the end) |
| 2 | Grey prompt window, then a very AI-y, buzzword-y Slack message card | "The chat assistant returns a very AI-y, buzzword-y message with a deadline request. Would you send that? Neither would we." | Label: "YOUR PROMPT" · Prompt: `Write a Slack message asking the devs if the checkout issue is fixed.` · Slack message (parody; banned-list exempt): "Hi team! Hope you're crushing it! 🚀 Just circling back to align on the checkout page fix. Do we have visibility on the timeline? Keen to leverage any updates so we can close the loop by EOD. Thanks a bunch! 🙌" |
| 3 | Prompt window: part one dimmed, tone block in black with cursor | "Add a second part to the prompt: how it should sound, and how long it should be." Footnote: "Part one says what you need. Part two specifies how it sounds." | Label: "YOUR PROMPT" · Part 1 (dimmed): `Write a Slack message to the development team asking about the status of the checkout page slow loading issue.` · Part 2: `Tone: friendly, warm, collaborative, confident.` `Style: 1 to 2 sentences, conversational Slack style, direct ask for current status or ETA, end with a brief thanks.` |
| 4 | The short, warm message with a 👍 reaction, and a dev reply arriving | "Now the output is two sentences you'd happily send: a friendly check-in, a clear ask, a thank you. Same request, different instructions, entirely different message." | Your message: "Hey team! 👋 Checking in on the checkout page fix: is there a status or rough ETA? Thanks so much!" · Reply from dev team: "Deploying the fix this afternoon! 🎉" |
| 5 | Four dial cards in a 2x2 grid, gradient palette | "The four levers, for any message where tone could go wrong:" Cards: "TONE · State it explicitly: formal or casual, peer or mentor." / "AUDIENCE · Name who it's for; depth and jargon follow." / "SAMPLE · Show a sample of your writing to mirror." / "LENGTH · Specify it: "2 sentences", "3 paragraphs", "≤200 words"." Footnote: "They work in every chat assistant: ChatGPT, Claude.ai, Gemini." | (none) |
| 6 | A tick card and a cross card | "What tone and style can do, and what they can't:" Tick card: "Make the output sound like you. Keep your messages consistent." Cross card: "Reduce factual errors. A message can sound exactly like you and still be wrong." Footnote: "Checking the facts is a separate skill (and a separate post)." | (none) |
| 7 (CTA) | Brand card: badge, mascot at laptop | "Status nudges, reminders, feedback asks: they all yield to this technique. Practise it in the free first challenge of Write Better with AI: Prompting Foundations for Product Managers." Badge: "LITTLEPARROT.APP" · "First challenge free 💛" · "Send this to your colleagues who send you clearly AI-generated messages 📮" | (none) |

**Alt text (for the post):** A before/after carousel about prompting a chat
assistant for a Slack message: a bare prompt produces a buzzword-heavy
corporate message, adding tone and style instructions produces two warm
sentences, plus four levers for controlling tone.

## Caption (exact)

There's a specific dread in asking your developers about a bug fix: you need the status, and you really don't want to sound like you're hovering. So you draft, delete, and draft again. 💬

A chat assistant can carry that load, with one addition to your prompt. The bare request gets you a four-paragraph corporate memo nobody would send. Adding a tone and style block ("friendly, collaborative, 1 to 2 sentences, conversational, end with thanks") gets you a message that sounds like a colleague rather than a compliance notice.

The same four levers work on every awkward work message: state the tone, name the audience, show a writing sample, set the length.

You can practise this exact scenario, with a sandbox and feedback, in the free first challenge of Write Better with AI: Prompting Foundations for Product Managers, on LittleParrot.app.

Save this for the next message you keep redrafting. 🔖

.
.
.
#promptingtips #aiatwork #productmanagement #womenintech #chatgpt #productmanager #aiskills #learnwithai #techforwomen #worksmarter #careertips
