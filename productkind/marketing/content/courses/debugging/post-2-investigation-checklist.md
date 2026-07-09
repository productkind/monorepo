---
status: drafted
channels: [instagram]
account: little-parrot
---

# Post 2: Where developers look for clues

**Pillar:** the messy middle.
**Research trace:** "diagnosis before fixing" is the missing skill the
audience asks for verbatim ("Help me identify where the exact problem is so
that I can prompt accordingly"); investigating first is what stops the
credit-burning guess cycle; teaches the real tools (DevTools, Console,
Network tab) with plain descriptions. Repackages the Debugging Investigation
Checklist toolkit item.

## Format

**Spec key for the designer:** In the slide table, any text introduced as
"Prompt:" (or "prompt Lovable:", "Say:", "Assembled:") or written with
markdown symbols (##, -, 1., backticks) is a prompt snippet: literal text
the learner types into a tool. Render it verbatim in monospace inside a
prompt-input mockup (a chat input field with a cursor and send arrow), so
it reads as typed text rather than decoration; markdown symbols are part of
the typed text, never styled labels. Everything else in "Text on slide" is
display copy in the brand style.

**Carousel, 7 slides, 1080 x 1350 (4:5 portrait).** Detective-flow style: a
numbered trail across the slides, cropped DevTools mockups, one place to
look per slide.

| Slide | Visual | Text on slide |
| --- | --- | --- |
| 1 (cover) | A magnifying glass over an app window | "Something broke. Before you ask for a fix, find one clue. Where developers look, in order. 👇" |
| 2 | DevTools opening beside an app | "1️⃣ Reproduce it with DevTools already open (F12 on Windows, Cmd+Option+I on Mac). Some errors only appear the moment they happen; open DevTools after, and you've missed them." |
| 3 | Console tab with a red error | "2️⃣ Check the Console tab for red errors. Copy the whole message, including the lines underneath with file names and line numbers. Those point straight to the problem." |
| 4 | Network tab with one red row | "3️⃣ Check the Network tab, then reproduce the bug again. Look for red entries or codes that aren't 200 or 201, and note them: 'POST votes returned 401'." |
| 5 | Lovable Cloud logs and a database table | "4️⃣ Check backstage: in Lovable's Cloud tab, open Logs → Function logs for errors, then check the Database. Did the row you expected appear? Does it look right?" |
| 6 | A prompt card in monospace | "5️⃣ No clues anywhere? Ask Lovable to add temporary logging: 'Add logging to the [feature] process to show what data is sent, what response is received, and any errors. Then I'll reproduce the bug.'" |
| 7 (CTA) | Brand card, a single clue card being handed over | "Stop at the first clue you find and share it with Lovable. One specific clue beats ten guesses. Full course: Fix Bugs with Confidence: Debugging Your Lovable App, on LittleParrot.app. First challenge free 🟪 Save this 🔖" |

**Alt text (for the post):** An investigation-checklist carousel for Lovable
bugs: reproduce with DevTools open, check the Console for errors, check the
Network tab for failed requests, check Cloud logs and the database, and ask
Lovable to add logging if there are no clues.

## Caption (exact)

"It's broken, please fix it" sends the AI off guessing, and every guess costs a credit. The habit that stops the cycle: investigate for two minutes before you prompt. 🔍

Developers have an order they look in, and it works exactly the same in a Lovable app: reproduce the bug with DevTools open, check the Console for red errors, check the Network tab for failed requests, then look backstage in the Cloud logs and the database. Stop at the first clue and hand it over.

The difference: "The vote button doesn't work" invites a guess, while "POST votes returned 403" tells Lovable where the problem lives, and the fix usually works first time.

The full checklist, including the add-logging prompt for bugs with no visible clues, comes with our course Fix Bugs with Confidence: Debugging Your Lovable App. You'll find it on LittleParrot.app, and the first challenge is free.

Save this for the next time something breaks. 🔖

.
.
.
#vibecoding #buildwithai #womenwhobuild #lovable #debugging #womenintech #buildinpublic #aitools #learnwithai #techforwomen #vibecodingtips #devtools
