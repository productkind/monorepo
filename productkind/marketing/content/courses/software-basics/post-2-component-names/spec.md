---
status: drafted
channels: [instagram, tiktok, youtube, linkedin productkind]
account: little-parrot
---

# Post 2: That pop-up has a name

**Pillar:** the method, shown.
**Research trace:** "design that doesn't look like every other Lovable app"
sits in the demand data, and component vocabulary is the first step to
directing design; named components get the design she pictured instead of a
guessing loop (credit ROI); prompt libraries are top saveable content.
Repackages the Component Prompt Library and the components section of the
Software Vocabulary Cheat Sheet.

## Format

**Spec key for the designer:** In the slide table, any text introduced as
"Prompt:" (or "prompt Lovable:", "Say:", "Assembled:") or written with
markdown symbols (##, -, 1., backticks) is a prompt snippet: literal text
the learner types into a tool. Render it verbatim in monospace inside a
prompt-input mockup (a chat input field with a cursor and send arrow), so
it reads as typed text rather than decoration; markdown symbols are part of
the typed text, never styled labels. Everything else in the "Display copy"
column is display copy in the brand style.

**Carousel, 7 slides, 1080 x 1350 (4:5 portrait).** Specimen style: each
slide draws the component large and labelled, with a ready prompt in
monospace beneath.

**Full-fidelity rule:** every word that appears on a slide is in this table,
verbatim. The implemented carousel may not add copy; `check.py` in
`productkind/carousel-design/` enforces it.

| Slide | Visual | Display copy (verbatim) | Prompt window / mockup content (verbatim) |
| --- | --- | --- | --- |
| 1 (cover) | Six components in a 2x3 grid with name tags, placed between the title and the kicker (button, card, modal, input field, textarea, dropdown) | "Each part of your app has a name. Learn them, and vibe coding gets you the design you pictured" Kicker: "6 COMPONENTS, EACH WITH A READY PROMPT · SWIPE →" | (none) |
| 2 | Three buttons drawn: filled, outline, plain text | "BUTTONS come in ranks. Primary: the colourful main action. Secondary: outlined, less prominent. Tertiary: just a link." | Add a primary Save button below the form, with a secondary Cancel next to it. |
| 3 | A card with image, title, text, button | "CARD: a box that groups related content (image, title, description, button)" | Show each recipe as a card with a title, image, and a View button. Add a subtle shadow. |
| 4 | A modal dimming the page behind it | "MODAL: the pop-up that appears over everything else" | When the user clicks Delete, show a confirmation modal with Cancel (secondary) and Delete (primary, red). |
| 5 | Input, textarea and dropdown stacked vertically, each with its description beside it | "INPUT FIELD: one line of typing. TEXTAREA: several lines. DROPDOWN: a click reveals the options" | Add a dropdown to select the category: Work, Personal, or Ideas. |
| 6 | A nav bar collapsing into a hamburger icon | "NAVIGATION BAR: the links that move people around your website" | Add a top nav bar with Home, About, and Contact. Highlight the active page. Collapse into a hamburger menu on mobile. |
| 7 (CTA) | Brand card, all components assembled into a page | "Referring to each component by name gets you what you pictured" Then: "The full prompt library is in Basics of Software for Vibe Coding." Badge: "LittleParrot.app" · "First challenge free 💛" · "Save this for your next vibe coding session 🔖" | (none) |

**Alt text (for the post):** A component-vocabulary carousel: primary,
secondary, and tertiary buttons, cards, modals, input fields, textareas,
dropdowns, and navigation bars, each with a ready-to-use Lovable prompt.

## Captions

Channel captions live in `captions.md` in this folder (written with the
captions skill): TikTok, Instagram, LinkedIn, and YouTube Shorts, plus the
founder comments and pinned-comment links.
