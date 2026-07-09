---
status: drafted
channels: [instagram]
account: little-parrot
---

# Post 3: Which part of your app misbehaves

**Pillar:** the messy middle.
**Research trace:** locating the problem by layer is the beginner's version
of diagnosis-before-fixing, the skill the audience asks for verbatim; it
builds directly on the bakery mental model (post 1), showing the vocabulary
paying rent; symptom-to-prompt guides are saveable decision content.
Repackages the "Where Is the Problem?" Troubleshooting Guide toolkit item.

## Format

**Spec key for the designer:** In the slide table, any text introduced as
"Prompt:" (or "prompt Lovable:", "Say:", "Assembled:") or written with
markdown symbols (##, -, 1., backticks) is a prompt snippet: literal text
the learner types into a tool. Render it verbatim in monospace inside a
prompt-input mockup (a chat input field with a cursor and send arrow), so
it reads as typed text rather than decoration; markdown symbols are part of
the typed text, never styled labels. Everything else in "Text on slide" is
display copy in the brand style.

**Carousel, 7 slides, 1080 x 1350 (4:5 portrait).** Symptom-map style: each
slide pairs a symptom (drawn as a small app mockup with the fault visible)
with the layer it points to and the prompt to send, using the bakery room
icons from post 1 as location markers.

| Slide | Visual | Text on slide |
| --- | --- | --- |
| 1 (cover) | An app window with a question mark over counter/kitchen/storage icons | "Your app misbehaves. WHERE the problem lives decides what you ask. The symptom map. 👇" |
| 2 | Overlapping cards on a phone mockup, counter icon | "Something LOOKS wrong (colours, overlap, spacing, broken mobile layout)? That's the frontend's styling. Say: 'The cards overlap on mobile. Fix the styling so each card stacks with consistent spacing.'" |
| 3 | A button being tapped, nothing happening, counter+kitchen icons | "Clicking does NOTHING? That's frontend behaviour or the backend. Say: 'When I click [button] on [page], nothing happens. I expected [outcome]. Check the frontend logic and the backend function for this interaction.'" |
| 4 | An empty list where items should be, kitchen+storage icons | "Data isn't SHOWING (empty list, content vanished)? Backend or database. Say: 'I added items earlier but the list is empty. Check if the data is saved correctly and if the query is fetching it.'" |
| 5 | A form submitting, then a refresh losing everything, storage icon | "Data isn't SAVING (fine until you refresh)? Database, or Lovable Cloud isn't connected yet. Say: 'After refreshing, the items I added are gone. Check the database connection and the save function.'" |
| 6 | An unsent envelope and a card machine, a key icon | "An EXTERNAL service fails (emails not sending, payments not processing)? That's the API or its key. Say: 'The email feature isn't working. Check if the API key is configured correctly and the backend function calls the service properly.'" |
| 7 (CTA) | Brand card, the map complete | "Match the symptom to its layer, then prompt: every fix conversation gets shorter. Full guide: Basics of Software for Vibe Coding, on LittleParrot.app. First challenge free 🟪 Save this for the next hiccup 🔖" |

**Alt text (for the post):** A troubleshooting-map carousel matching app
symptoms to layers: visual issues point to frontend styling, dead clicks to
frontend logic or backend, missing data to backend or database, unsaved
data to the database connection, and failing emails or payments to the API
key, each with a ready prompt.

## Caption (exact)

"It's broken" covers a lot of ground. An app has layers, and each kind of misbehaviour points at one of them, which means you can tell your AI builder where to look before it starts guessing. 🗺️

The map in the carousel covers the five most common symptoms. Wrong colours and overlapping text live in the frontend's styling. A button that does nothing is frontend behaviour or the backend. Data that won't show or won't survive a refresh points at the database. And a payment or email feature that fails usually comes down to an API key.

Each slide includes the sentence to send. You're doing what developers do instinctively: narrowing the search space before asking for the fix, and it works whether or not you ever read the code.

The full guide comes with our Basics of Software for Vibe Coding course; you'll find it on LittleParrot.app, first challenge free.

Save this for the next hiccup. 🔖

.
.
.
#vibecoding #buildwithai #womenwhobuild #techliteracy #debugging #womenintech #techforwomen #learnwithai #techbasics #appbuilding #codingforbeginners
