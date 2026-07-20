---
status: drafted
channels: [instagram, tiktok, linkedin, threads, youtube-shorts]
account: little-parrot
---

# Post 1: Every app is a bakery

**Pillar:** the method, shown.
**Research trace:** the mental model that makes all later vocabulary stick;
analogy-first teaching lowers the entry bar (confidence-by-design); knowing
which part of the app to point at is the beginning of precise prompting;
points at the free first challenge, which teaches exactly this. Draws on
the course's Challenge 1 and the Software Vocabulary Cheat Sheet toolkit
item.

## Format

**Spec key for the designer:** In the slide table, any text introduced as
"Prompt:" (or "prompt Lovable:", "Say:", "Assembled:") or written with
markdown symbols (##, -, 1., backticks) is a prompt snippet: literal text
the learner types into a tool. Render it verbatim in monospace inside a
prompt-input mockup (a chat input field with a cursor and send arrow), so
it reads as typed text rather than decoration; markdown symbols are part of
the typed text, never styled labels. Everything else in "Display copy" is
display copy in the brand style.

**Carousel, 7 slides, 1080 x 1350 (4:5 portrait).** Illustrated-analogy
style: a warm bakery cutaway drawing that highlights a different room per
slide, the technical term and the bakery part paired on each.

**Full-fidelity rule:** every word that appears on a slide is in this table,
verbatim. The implemented carousel may not add copy; `check.py` in
`productkind/carousel-design/` enforces it.

| Slide | Visual | Display copy (verbatim) | Prompt window / mockup content (verbatim) |
| --- | --- | --- | --- |
| 1 (cover) | A cosy bakery cutaway: counter, kitchen, storage room | "What do frontend, backend and database actually mean?" Kicker: "KNOW WHERE TO POINT YOUR AI BUILDER · SWIPE →" | (none) |
| 2 | The counter highlighted | "The counter is your FRONTEND: everything users see and touch. Buttons, forms, colours. It runs on their device." Footnote: "Also called the client." | (none) |
| 3 | The kitchen highlighted | "The kitchen is your BACKEND: the work customers never see. Saving data, sending emails, taking payments." | (none) |
| 4 | The storage room highlighted | "The storage room is your DATABASE: where your app remembers. Profiles, orders, posts, all organised and findable." | (none) |
| 5 | The building itself, a rent sign | "The building is a SERVER: the computer your backend and database run on." Footnote: "You rent rather than buy. That's CLOUD COMPUTING, and Lovable handles it for you." | (none) |
| 6 | A phone line between a bakery and a mill, a key beside it | "The phone line to the mill who supplies the flour is an API: how your app talks to other apps, like Stripe." Footnote: "The API KEY is the access code. Keep it secret: it never goes in a prompt." | (none) |
| 7 (CTA) | Brand card: mascot | "Next time something breaks, you'll understand better what happened." Then: "This is part of the free first challenge of Basics of Software for Vibe Coding." Badge: "LittleParrot.app" · "First challenge free 💛" · "Follow for more vibe coding explained for women building with AI 🏃🏽‍♀️" | (none) |

**Alt text (for the post):** An illustrated analogy carousel mapping app
architecture to a bakery: frontend as the counter, backend as the kitchen,
database as the storage room, servers and cloud computing as the rented
building, and APIs as the phone line between the bakery and the mill that
supplies its flour.

## Captions (exact)

### Instagram

What do frontend, backend and database actually mean? Picture a bakery. 🥐

The counter is your frontend: everything customers see and touch. The kitchen is your backend, where the real work happens out of sight. The storage room is your database, where everything is kept and remembered. The building is a server, and cloud computing means renting one rather than owning it.

The analogy helps most when something goes wrong. "The button looks weird" is a counter problem. "My data disappeared" is a storage room problem. Knowing the rooms helps you understand what happened, and ask your AI builder better questions.

There's more to the tour (APIs are the phone line to the mill who supplies the flour, and the key to that line stays secret), and it's all in the free first challenge of Basics of Software for Vibe Coding, our course for women building their first app with AI, on LittleParrot.app.

Follow us for more vibe coding explained for women building with AI.
.
.
.
#womenintech #womenwhobuild #techforwomen #vibecoding #techbasics

### TikTok

What do frontend, backend and database actually mean? Your app is a bakery: counter, kitchen, storage room. Which of these words confused you first? Follow us for more vibe coding explained for women building with AI. #womenintech #womenwhobuild #techforwomen #vibecoding

### LinkedIn

Many of our learners have told us the same thing: they want to understand how the software they're building is actually put together. So we made a course for it, and its first picture is a bakery.

The counter is the frontend, everything users see and touch. The kitchen is the backend, where the work happens out of sight. The storage room is the database, where your app remembers things.

It earns its keep the first time something breaks. "The button looks weird" is a counter problem. "My data disappeared" is a storage room problem. Knowing the rooms helps you understand what happened, and ask your AI builder better questions.

The full tour (servers, cloud computing, APIs) is in the carousel. And this mental model is part of the free first challenge of Basics of Software for Vibe Coding, on LittleParrot.app.

So if a friend building with Lovable is still guessing at these words, send it their way. It might save them an afternoon.

### Threads (posted from the productkind profile)

**Caption** (~140 characters):

What do frontend, backend and database actually mean? Your app is a bakery: counter, kitchen, storage room. Which room does your bug live in?

**Topic tag** (typed in the composer, exactly one): women in tech

**Founder reply chain** (posted within the first hour):

Kinga (reply to the post): The bakery starts paying off when something breaks. "The button looks weird" is a counter problem; "my data disappeared" is a storage room problem. Working out which room your bug lives in saves a lot of guessing (and credits).

Thomas (reply to Kinga): And the building itself is a server: the computer the kitchen and the storage room run on. Renting one instead of buying it is cloud computing; Lovable handles that bit for you. The whole tour is part of the free first challenge of Basics of Software for Vibe Coding, our course for women building with AI, on littleparrot.app.

### YouTube Shorts

**Title** (39 characters): Frontend & backend, explained for women

**Description**:

Your app is a bakery. The counter is the frontend (what users see), the kitchen is the backend (the work out of sight), the storage room is the database (what your app remembers). Knowing the rooms helps you understand what happened when something breaks, and ask your AI builder better questions. We teach vibe coding to women building their first app without a tech background. Subscribe for a new vibe coding basics short every week. #womenintech #womenwhobuild #Shorts

**Pinned comment**:

The full tour (servers, cloud computing, APIs) is the free first challenge of Basics of Software for Vibe Coding: https://littleparrot.app/4794366d-b807-4804-8fd5-64c3a5a03472/course-overview?utm_source=youtube&utm_medium=social&utm_campaign=software-basics&utm_content=post-1
