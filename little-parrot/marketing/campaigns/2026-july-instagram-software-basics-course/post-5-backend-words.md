# Post 5: APIs, keys, and the two auth words

**Pillar:** the method, shown.
**Research trace:** integrations (payments, email, APIs) sit in the demand
data as the wanted next step; API key hygiene is the security habit with a
canonical fear story behind it; authentication vs authorisation is exactly
the "confident conversations with developers" vocabulary our learner asked
for. Draws on the course's Challenge 4 and the backend section of the
Software Vocabulary Cheat Sheet.

## Format

**Spec key for the designer:** In the slide table, any text introduced as
"Prompt:" (or "prompt Lovable:", "Say:", "Assembled:") or written with
markdown symbols (##, -, 1., backticks) is a prompt snippet: literal text
the learner types into a tool. Render it verbatim in monospace inside a
prompt-input mockup (a chat input field with a cursor and send arrow), so
it reads as typed text rather than decoration; markdown symbols are part of
the typed text, never styled labels. Everything else in "Text on slide" is
display copy in the brand style.

**Carousel, 7 slides, 1080 x 1350 (4:5 portrait).** Backstage-tour style:
behind-the-curtain illustrations, each term staged as a scene, the two auth
words shown as two different doors.

| Slide | Visual | Text on slide |
| --- | --- | --- |
| 1 (cover) | A stage curtain slightly open onto machinery | "Four backend words that make your prompts precise, explained in everyday terms. 👇" |
| 2 | Two apps on a phone line, an order passing between | "API: how apps talk to each other over the internet. When your app charges a card, it's calling Stripe's API; when it sends an email, it's calling a service like Resend. You connect to experts rather than rebuilding their work." |
| 3 | A key being posted into a safe, a crossed-out chat bubble | "API KEY: the secret token that proves it's YOUR app calling. It goes in the secrets panel your builder provides, and it never, ever goes in a prompt. A leaked key means strangers can spend on your account." |
| 4 | Two doors: one asks a name, one checks a list | "The two auth words. AUTHENTICATION asks 'who are you?': signing up, logging in. AUTHORISATION asks 'what are you allowed to do?': permissions. They sound alike; your app needs both, for different jobs." |
| 5 | A row of small workers, each with one tool | "BACKEND FUNCTION: a small worker with exactly one job. Validate this email. Save that vote. Send the reminder. When a feature misbehaves backstage, one of these workers is usually the place to look." |
| 6 | A prompt card in monospace | "The words at work: 'Add Google authentication. Only authenticated members can vote, and only the club owner is authorised to close the vote.' Precise words, and the app comes back matching them." |
| 7 (CTA) | Brand card | "Backstage stops being a mystery once it has names. Full cheat sheet: Basics of Software for Vibe Coding, on LittleParrot.app. First challenge free 🟪 Save this 🔖" |

**Alt text (for the post):** A backend-vocabulary carousel: APIs as how
apps talk to each other, API keys as secrets that never go in prompts,
authentication versus authorisation as who-you-are versus
what-you-may-do, and backend functions as small single-job workers.

## Caption (exact)

The backend is where the words get most intimidating and where knowing them pays best, because this is the part of your app you can't see or click. 🔑

Four terms cover most conversations. An API is how your app talks to other services (Stripe for payments, Resend for email). An API key is the secret that proves the call is yours, and it belongs in the secrets panel, never in a prompt. Authentication asks who someone is; authorisation asks what they're allowed to do, and a well-built app answers both.

The example on slide 6 shows what fluency buys: one sentence that tells your builder exactly who may vote and who may close the voting. Being that precise gets you the app you meant, rather than a week of corrections.

The full cheat sheet comes with our Basics of Software for Vibe Coding course, on LittleParrot.app, and the first challenge is free.

Save this for your next feature. 🔖

.
.
.
#vibecoding #buildwithai #womenwhobuild #techliteracy #shebuilds #api #womenintech #techforwomen #learnwithai #appbuilding #digitalskills
