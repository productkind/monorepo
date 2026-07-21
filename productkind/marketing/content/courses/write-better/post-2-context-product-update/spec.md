---
status: drafted
channels: [instagram]
account: little-parrot
---

# Post 2: The release update people read

**Pillar:** the method, shown.
**Research trace:** a weekly PM/founder task made concrete; the
vague-vs-specific contrast is the proven format; "without context, AI
guesses" is the teaching line that transfers to every AI tool the audience
uses, including app builders. Draws on the course's Challenge 2, reframed
from the course's internal #releases update to a public product
announcement, which is what our founder and micro-business audience
actually has to write.

## Format

**Spec key for the designer:** In the slide table, any text introduced as
"Prompt:" (or "Part 1:", "Part 2:") or written with markdown symbols (##,
-, 1., backticks) is a prompt snippet: literal text the learner types into
a tool. Render it verbatim in monospace inside a prompt-input mockup (a chat
input field with a cursor and send arrow), so it reads as typed text rather
than decoration; markdown symbols are part of the typed text, never styled
labels. Message outputs render as public announcement post cards (avatar,
reactions, a reply). Everything else in "Display copy" is display copy in
the brand style.

**Carousel, 7 slides, 1080 x 1350 (4:5 portrait).** Announcement-mockup
style: a public product announcement post, the bare prompt's generic version
greyed and skimmed past, the context-rich announcement with reactions and a
customer reply appearing under it.

**Full-fidelity rule:** every word that appears on a slide is in this table,
verbatim. The implemented carousel may not add copy; `check.py` in
`productkind/carousel-design/` enforces it.

| Slide | Visual | Display copy (verbatim) | Prompt window / mockup content (verbatim) |
| --- | --- | --- | --- |
| 1 (cover) | Headline; behind it a public announcement post being drafted, the opening line already typed and greyed, cursor at the end | "You shipped the feature. Now the announcement nobody reads past 'We're excited to announce...'." Kicker: "A PROMPTING TECHNIQUE FOR EXACTLY THIS. SWIPE →" | Draft post (greyed): `We're excited to announce...` (cursor at the end) |
| 2 | Grey prompt window, then a greyed-out generic announcement card being scrolled past | "Ask an AI chat assistant with just the feature name, and you get the announcement every company has posted. Correct, and instantly skipped." | Label: "YOUR PROMPT" · Prompt: `Write a short announcement for our customers about the new "saved dashboard view" feature.` · Announcement post (parody; banned-list exempt): "We're excited to announce the launch of our new Saved Dashboard View feature!" |
| 3 | Prompt window: the bare line dimmed, the context lines in black with the cursor | "The fix is context. Tell it what the feature does, why it exists, the proof, when it's live, and who it's for." | Label: "YOUR PROMPT" · Part 1 (dimmed): `Write a short announcement to our customers about our new "Saved Dashboard Views" feature.` · Part 2: `- What it does: save your favourite filters, reopen them in one click.` `- Why: our top customer request; beta testers report real time saved.` `- When: live for everyone today.` `- Audience: our users, small teams and founders.` |
| 4 | The new announcement card with 🧡 and 🎉 reactions appearing, a customer reply arriving | "Same request, real facts. Now the announcement leads with the value, sounds like a person, and it resonates with your customers." | Your post: "📊 Saved Dashboard Views is here. Save your favourite filters and reopen them in one click, no more rebuilding your view every session. Our most-requested feature, already saving beta testers real time. 🧡" · Reply from a customer: "Finally! Been waiting for this 🙌" |
| 5 | A checklist card, gradient palette | "The context checklist for any feature announcement:" Checklist: "What it is, in one line" / "Who it's for" / "The problem it solves" / "Proof it works" / "When it's available" / "How to try it" | (none) |
| 6 | A feed: one post with no reactions, one with a row of them | "Quick gut-check: the last thing you launched, did people reply, or just scroll past?" Footnote: "Without context, a chat assistant guesses, and guesses read as filler. Hand it the background instead." | (none) |
| 7 (CTA) | Brand card: badge, mascot at laptop | "Launch emails, changelogs, landing pages: it works anywhere context does the heavy lifting. Practise it in the Write Better with AI: Prompting Foundations for Product Managers course." Badge: "LittleParrot.app" · "First challenge free 🧡" · "Save the checklist, and send it to whoever writes your next announcement 🔖" | (none) |

**Alt text (for the post):** A before/after carousel about writing a product
announcement with a chat assistant: a bare prompt produces a generic "We're
excited to announce" post nobody reads, adding context (what the feature
does, why, the proof, the date, who it's for) produces a concrete
announcement people reply to, plus a reusable context checklist.

## Caption (exact)

You shipped it 🎉 and now you have to tell your customers, and everything you type starts with "We're excited to announce...". 📣

The difference between the announcement people skim and the one they reply to is usually the context you hand the chat assistant, rather than the writing itself. The feature name alone gets you that generic launch post, because the model guessed everything it didn't know. Give it the customer request behind the feature, the beta feedback, the release date, and who it's for, and the announcement comes back concrete.

The checklist on slide 5 is the reusable part; it fits any feature, any product.

Practising this kind of context prompting is Challenge 2 of Write Better with AI: Prompting Foundations for Product Managers, on LittleParrot.app. The first challenge is free.

Save the checklist for your next launch. 🔖

.
.
.
#promptingtips #aiatwork #productmanagement #womenintech #productupdates #productmanager #aiskills #learnwithai #techforwomen #worksmarter #careertips
