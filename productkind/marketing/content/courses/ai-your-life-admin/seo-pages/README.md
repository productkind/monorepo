---
status: drafted
channels: [seo]
account: little-parrot
---

# SEO cluster: the mental load

Four pages built from `../niche-research.md` (round 3). Drafted 15 August 2026,
not yet implemented in the app.

## Why these four

Google Trends put `mental load` well ahead of everything else tested: mean 16.4
in GB over five years and rising 4.6x, then rising another 2.2x inside the last
twelve months alone. The rising related query in GB over those twelve months is
**`mental load list`**, with `mental load checklist` beside it in the top list.
That is the seam, and the course already produces exactly that output.

One hub, three spokes, all linking to the hub:

| Page | Slug | Primary query | Secondary |
|---|---|---|---|
| **1. Hub** | `mental-load-list` | mental load list | mental load checklist, mental load of motherhood |
| 2. Spoke | `what-is-the-mental-load` | what is mental load | mental load meaning, women mental load |
| 3. Spoke | `explain-mental-load-to-your-partner` | how to explain mental load to husband | mental load in relationships |
| 4. Spoke | `brain-dump-template` | brain dump template | adhd brain dump template, adhd brain dump template free |
| 5. Spoke | `mental-load-women` | mental load women | mental load of motherhood, mental load working mothers |
| 6. Spoke | `invisible-labor` | invisible labor | invisible labour, invisible work |

Pages 5 and 6 were added on 15 August 2026 from Kinga's Semrush research. The
first four were deliberately left untouched.

## Semrush data, August 2026

| Query | Volume/mo | KD | Notes |
|---|---:|---:|---|
| invisible labor | 1,300 | 29 | Its own page. **US spelling is the query**, so it stays in the slug, title and headings; prose is British English |
| mental load women | 880 | 27 | Low competition and **no page owns it**. Own page rather than a section elsewhere |
| adhd brain dump template | 720 | 24 | |
| adhd brain dump | 590 | 12 | |
| brain dump worksheet | 590 | 14 | |
| cognitive labor | — | **50** | **Do not target.** Mention only, as the academic term |

**The ADHD variants together outweigh the head term** (`brain dump template`),
which is why the ADHD section on page 4 earns its own H2 rather than sitting as
a subsection.

## What the SERPs want

- **`brain dump template`** is a printable/template SERP: Pinterest, Notion,
  Asana, printable blogs. To rank, the page has to hand over a copyable artefact
  above the fold, not discuss brain dumps. Keep the fenced blocks near the top.
  **Copy-to-clipboard already works**: `src/components/ui/Markdown.tsx` renders
  every `pre` with a `CopyButton`, so fenced blocks get a copy control with no
  new work.
- **`how to explain mental load to husband`** is a forum and personal-essay
  SERP, Reddit at #1 and Mumsnet at #10. A structured, sourced page beats it
  without much difficulty, which is why page 3 leads on headings and citations.
- **`mental load women`** has no page owning it, so page 5 aims to be the
  complete answer rather than competing on authority.

## Keeping the mental-load pages apart

Three pages now sit near each other, so each holds a distinct intent to avoid
competing with itself:

- `what-is-the-mental-load` answers **what it is**. Definition, origins, why it
  is heavy.
- `mental-load-women` answers **why it lands on women**. Daminger's split
  between deciding and anticipating is the spine of it.
- `invisible-labor` answers **what the wider category is**, and disentangles
  invisible labour, mental load, cognitive labour and emotional labour.

If any two start ranking for each other's query, merge rather than reword.

Page 3 targets a query rising 73,450% over five years in GB. Page 4 targets
queries that are rising fast off a very small base (mean 0.2 when sized against
`mental load`), so it is deliberately the cheapest of the four to produce.

## Honesty constraints these drafts hold to

- **The list works for anyone. The shortcut needs an iPhone 15 Pro or newer.**
  Every page says so before the course link, never after it.
- **Describe the course by what you build, not by who the examples are about.**
  Three of the four challenges are universal (the Brain Dump, reaching a partner
  on any phone, hands-free triggers), and the fourth teaches a timestamped-log
  pattern that works for any running record. Do not frame the course as narrowly
  postpartum: it undersells what a reader actually gets.
- **The only true thing to say about the examples is "we made it for mums".**
  Not that we built it from our own experience of new motherhood. Kinga is not a
  new mum, and an invented origin story is a fabrication however warm it sounds.
  One line, near the end, as context.
- **No page claims the shortcut fixes an unequal relationship.** It makes the
  work visible. What happens next is not something software decides.
- **Every reference is linked inline** at the point it is mentioned, not
  collected in a Sources block at the bottom. Emma's *You Should've Asked*,
  Daminger's *The Cognitive Dimension of Household Labor*, Rodsky's *Fair Play*.
- **The course arrives as the answer to the problem the page just described**,
  in prose, not as a CTA block under its own heading.
- **Sell the outcome, never a chronological walkthrough of the challenges.**
  Describe what life looks like once the Brain Dump exists, as a scene: the
  thought that arrives in a queue or at two in the morning, said out loud, gone
  from your head and onto a list someone else can see. Then one sentence saying
  the course also covers sharing, the timestamped log and the triggers. The
  course page holds the detail; these pages carry the story. Each page picks the
  outcome its reader came for: the partner page ends the messenger role, the
  brain dump page removes the scheduled session.
- **The Brain Dump has no cadence.** You use it whenever something is on your
  mind. Never invent a frequency ("twice a day", "every morning"), and never
  frame it as a routine to keep up, since being free of the routine is the point.
- **Never write "no coding".** Nobody arriving at these pages assumed there
  would be coding, so raising it plants the worry. Show how easy it is instead:
  you tap a few blocks together in the Shortcuts app that is already on the phone.

## Where the course is mentioned, and why

Three placements per page, each doing a different job. More than three starts to
read as an advert, which costs dwell time and trust; one at the bottom only
reaches the minority of readers who get there.

1. **Early forward reference, just after the intro.** A single line pointing
   down the page, phrased as navigation for the reader rather than a pitch, and
   qualifying as it goes ("if keeping it current is the problem, not writing
   it"). Someone who reads two paragraphs and leaves still learns the tool
   exists. No course link here: the job is to signal, not to sell.
2. **Mid-article, at the point the page names the limitation.** Intent peaks
   where the reader recognises their own problem, so this is the
   highest-converting spot. One inline link inside a sentence that is doing
   real work anyway.
3. **The full offer at the end**, for readers who finish. Highest intent, so
   this is where the requirements and constraints go.

**Serve the query before anything else.** The list, the definition and the
template all arrive before any mention of the course. Gating the thing someone
searched for behind a pitch raises the bounce rate, and bounce is a ranking
signal, so the greedy version is also the version that ranks worse.

## Voice notes from the tone-of-voice-critic pass

All four pages were reviewed on 15 August 2026 and all four came back NEEDS
REVISION. Every finding below repeated across at least three of the four, so
they are drafting habits rather than one-off slips. Worth checking for on any
new page in this cluster.

- **Use contractions.** The first drafts had almost none, which made warm
  articles read like formal notices. The course itself is full of them ("If
  you're a mum, you already know the feeling").
- **The negation-then-reversal formula is the loudest tell**, and it is banned:
  "Not the doing, the keeping track", "The doing is shareable. The remembering,
  usually, is not.", "It is not laziness. It is that...". Eleven instances
  across four pages. State the point directly.
- **"yours to reword" was in every page verbatim**, an ownership metaphor for an
  abstract thing. Use "you can reword the categories and prompts to fit your own
  household".
- **Vague nouns carrying the payoff:** "a thing two people can look at", "the
  part people tend to mention", "and a couple of other things besides". Name the
  concrete thing, and expect the fix to be longer than the line it replaces.
- **Claims about what people do need a source or they go.** "Most people do one,
  feel considerably better, and never do a second" and "Most people hear 'help
  more' as 'do more tasks'" were both invented. Do not fix these by attributing
  them to Kinga instead, see [[feedback_never_invent_origin_stories]].

Two critic suggestions were **rejected on purpose**:

- Softening "tapping a few blocks together" to "putting a few actions together".
  Kinga asked for that exact phrasing to show how easy the build is.
- Rewriting the unsourced "most people" claim as Kinga's own first-person
  experience. That trades one fabrication for a worse one.

One correction was substantive rather than stylistic: on the partner page,
"They keep the job and hand over the easy part" read as though the partner keeps
the job, which inverted the point and was the only line in the cluster that
sounded anti-partner. It now reads "You keep the job and hand over only the
doing."

The `brain-dump-template` page was retitled from "A Brain Dump Template That
Sorts Itself" because the paper template on that page does not sort itself, only
the shortcut does. The primary query is still in the new title.

## Implementation notes

See `../niche-research.md` round 3 and the architecture recommendation. The
short version:

- Render with `<Markdown variant="document">`, **not** `MdxRenderer`.
  `MdxRenderer` compiles inside a `useEffect`, so a prerendered article using it
  would serve crawlers an empty skeleton.
- **Add `rehype-slug`** to the `Markdown` component's plugin list. It is not
  installed yet, and the app currently passes `remarkGfm` only, so headings get
  no `id` and the early forward-reference links in all four pages would do
  nothing. It is a one-line change (`rehypePlugins={[rehypeSlug]}`) and also
  earns the jump links Google sometimes shows under a result.
- Add each slug to `staticRoutes` and to `writeSitemap` in `scripts/prerender.mjs`.
- Use the existing `<SEO>` component with `type="article"` and a JSON-LD
  `Article` schema.
- One `?ref=` per page on every course link, so PostHog can separate them.
