# Instagram carousel research and design decisions

> Researched 2026-07-05, decisions confirmed by Kinga 2026-07-06. Findings
> refreshed 2026-07-20 with an adversarially fact-checked deep-research pass
> (large-sample vendor benchmarks: Socialinsider 15-35M posts, Metricool 24M,
> Buffer 4-45M); several earlier claims were corrected or refuted, see the
> refuted-claims section. Reference this when designing or reviewing carousel
> campaigns. Refresh the findings roughly every 6 months or when Instagram
> announces ranking changes.

## What the 2026 evidence says

### Reach and engagement mechanics

- **Carousels lead every Instagram format on saves and engagement rate**,
  but the margin over Reels is narrow: 37 median saves vs 35 for Reels
  (save rate 0.05% vs 0.04%), engagement ~0.55% vs ~0.52% (holding into
  Q2 2026). The big multiplier is vs **single images**: 2-9x more saves
  (Metricool's 24M-post study says 9x; independent studies put the floor
  at 2-4x) and roughly double the engagement.
- **Saves are the metric carousels win, and the verified driver is the
  "I'll-need-this-later" instinct**: frameworks, checklists, and
  step-by-step processes complete enough to revisit. This sits in
  deliberate tension with our teaser-not-summary rule; the resolution is
  that the prompt/checklist slides are the complete, save-worthy units,
  and the narrative around them is the teaser.
- **The re-serve mechanic (corrected 2026-07-20):** the trigger is
  non-swipers, not high swipe-through. Mosseri, verbatim: "If someone sees
  your carousel post but they don't swipe, we'll often give that carousel
  a second chance and automatically move to that second piece of media."
  It's probabilistic ("often"), and it makes slide 2 a second cover shown
  precisely to the people the cover failed to hook. One carousel still
  earns impressions over days; carousels top views at every account size.
- **Sends (DM shares) are the most heavily weighted ranking signal in
  2026**, above likes, comments, and watch time (confirmed by Adam Mosseri).
  Saves and shares are high-value signals across all surfaces.
- **Reels still reach more strangers:** they beat carousels on reach,
  shares, comments, and non-follower discovery. Carousels convert and
  nurture; Reels discover. (The Reels/TikTok experiment in
  `idea-backlog.md` is the discovery layer; carousels are the value layer.)

### Design benchmarks

- **The cover has 2-3 seconds.** Bold statement or question, a specific
  promised outcome, roughly 12 words or fewer. The cover also serves as the
  grid tile.
- **Slide 2 carries proof or specificity** (the concrete example, the
  before/after), because it's also the slide shown on re-serve.
- **"Flashcard, not blog paragraph":** one job per slide, the key phrase
  bold, support text short, written for skimmers.
- **No verified optimal slide count exists** (corrected 2026-07-20: the
  earlier "8-12 sweet spot" claim was refuted in fact-checking, as was
  LinkedIn's "5-15"). The only verified signal is directional: completion
  rate rewards tighter decks, so never pad to reach a count. We use 7-9
  (cover + one idea per slide + CTA), which fits that signal.
- **CTA twice:** a soft one mid-carousel, a clear one on the final slide.
- **1080 x 1350 (4:5)**, consistent layout rhythm across slides, visual
  consistency across a series so the account is recognisable.

### Platform expectations (added 2026-07-20)

We post the same carousel to several platforms; expectations differ:

- **Instagram is the carousel's home turf**: the resurfacing mechanic, up
  to 20 slides, and the strongest benchmarks all live here. Judge carousel
  performance by Instagram numbers.
- **TikTok**: the same carousel gets ~4.7x fewer views and ~5.8x fewer
  interactions than on Instagram (Metricool, 24M posts). TikTok stays
  video-first. Treat the carousel there as a low-cost cross-post; don't
  optimise for it or judge the format by its TikTok numbers.
- **LinkedIn**: the algorithm scores dwell time combined with completion
  and consumption rate (van der Blom 2026, partially corroborated by
  LinkedIn engineering). "Sharper, not longer": a tight deck people finish
  beats a padded one people abandon. Our 7-9 slide habit fits.
- **Threads**: no carousel evidence survived fact-checking at all. Our own
  post analytics are the only guide there.

### Follower-growth findings (noted, not adopted; see decisions)

- The growth playbook ends carousels with a "follow for more of this" ask
  tied to a narrow topic, and builds one recognisable weekly series plus one
  evergreen saveable format.
- All quantified follow-conversion claims (2-3x DM shares, 3x profile
  visits vs Reels) were refuted in the 2026-07-20 fact-check, so there is
  no evidence pressure on decision 1 below.

## Our decisions (Kinga, 2026-07-06)

1. **Optimise for course starts, not follows.** No follow CTAs. Follows are
   earned by the value of the posts and courses, and course starts are the
   metric that feeds the actual funnel (free challenge → subscription).
2. **The primary goal of every carousel is to give the reader value.** Every
   slide must be worth reading on its own. Engagement mechanics serve the
   value, never the other way round.
3. **CTA pattern: full course name + LittleParrot.app.** The bio holds only
   5 links, so carousels can't rely on "link in bio" across 8+ courses. The
   final slide and the caption name the course by its full title and say
   it's on LittleParrot.app, so anyone can find it regardless of what's in
   the bio. The bio's 5 slots hold evergreen links. Course titles are used
   verbatim (they're product names, exempt from copy-pattern rules).
4. **Shorten slides by splitting, never by stripping.** To hit flashcard
   density, split a dense slide into two; don't compress away the
   explanation or example that makes it valuable. (Same principle as
   course steps: shorten by splitting. The "8-12 sweet spot" this decision
   originally cited was later refuted; the split-don't-strip principle
   stands on its own.)
5. **Covers: ~12 words max**, with the demoted detail moved to slide 2
   rather than deleted.
6. **Keep the monospace prompt slides as long as they need to be.** People
   pause to read and screenshot them; that's value and dwell time at once.
7. **Light send-asks are welcome on the relatable posts** (the comic, the
   stand-up nod-along, the bug-loop opener): "send this to the friend who..."
   fits how Little Parrot acquisition already works. Use naturally, not on
   every post.
8. **Reels stay a separate experiment** (idea backlog), fed by the 1-2 most
   visual posts per campaign.

## Design-pass checklist (apply when producing slides)

- [ ] Cover ≤ ~12 words, works as a grid tile, promises something specific
- [ ] Slide 2 shows the proof/example, able to stand alone on re-serve
- [ ] One job per slide; key phrase bold; split anything that reads as a
      paragraph (typically 7-9 slides; never pad to reach a count)
- [ ] Every slide still valuable if seen in isolation
- [ ] Prompt/code slides in monospace, complete enough to screenshot
- [ ] Prompt snippets rendered as typed text inside a prompt-input mockup
      (chat input field, cursor, send arrow), verbatim including markdown
      symbols (##, -, backticks); the symbols are part of the typed text,
      never decorative labels or styled pills. Display copy stays outside
      the mockup in the brand style, so a reader can always tell "what I
      type" from "what the slide tells me"
- [ ] Soft CTA mid-deck (e.g. "save this for later" on the densest slide)
- [ ] Final slide: full course title + "on LittleParrot.app" + first
      challenge free + save ask
- [ ] Send-ask only where the post is genuinely relatable
- [ ] Banned-list pass on all on-slide text and caption (see
      personal-tone-of-voice / productkind-tone skills)

## Claims refuted in the 2026-07-20 fact-check

Each failed adversarial verification (three independent checks per claim).
They circulate widely in marketing blogs; don't reintroduce them:

- "Optimal carousel length is 8-12 slides; completion collapses after 12"
  and "LinkedIn carousels perform best at 5-15 slides"
- "Instagram carousels get 9-10% engagement vs 6-7% for Reels" (verified
  figures are ~0.5%, an order of magnitude lower)
- "Carousels drive 2-3x DM shares and 3x profile visits vs Reels"
- "Personal LinkedIn profiles get 63% higher carousel engagement than
  company pages"
- "Best LinkedIn covers lead with a single 3D-rendered image"
- The three-part hook formula (audience signal + tension gap + payoff
  promise) as a requirement; short-with-tension is the verified rule,
  the formula is optional

thesecondbrain.io was the source of several of these and has been dropped
from the sources list.

## Sources

Verified large-sample benchmarks (2026-07-20 pass):

- [Socialinsider: Instagram benchmarks](https://www.socialinsider.io/social-media-benchmarks/instagram) and [engagement report](https://www.socialinsider.io/social-media-benchmarks/instagram-engagement-report) (15-35M posts)
- [Metricool: Instagram study 2026](https://metricool.com/press-release-instagram-study-2026/) (24M posts; TikTok comparison)
- [Buffer: do carousels get more engagement](https://buffer.com/resources/do-instagram-carousels-get-more-engagement/) (4-45M posts)
- [Mosseri on carousel resurfacing (via Matt Navarra)](https://threads.com/@mattnavarra/post/DBgmZcEoiZb)
- Richard van der Blom: LinkedIn Algorithm Insights 2026 (dwell time + completion/consumption)
- [Oktopost: LinkedIn carousel best practices](https://www.oktopost.com/blog/linkedin-carousel-pdf-best-practices/) (copy density / legibility heuristics)

Earlier practitioner sources (2026-07-05 pass; craft guidance, not data):

- [TrueFuture Media: Instagram carousel strategy 2026](https://www.truefuturemedia.com/articles/instagram-carousel-strategy-2026)
- [Carouselli: carousel engagement stats and benchmarks 2026](https://carouselli.com/blog/instagram-carousel-engagement)
- [Later: Instagram algorithm ranking signals 2026](https://later.com/blog/how-instagram-algorithm-works/)
- [CreatorFlow: carousel best practices](https://creatorflow.so/blog/instagram-carousel-posts-guide/) and [2026 algorithm changes](https://creatorflow.so/blog/instagram-algorithm-2026/)
- [Social Habit Marketing: designing the perfect carousel 2026](https://www.socialhabitmarketing.com/article-posts/the-ultimate-guide-to-designing-a-perfect-instagram-carousel)
- [Buffer: how the Instagram algorithm works, 2026](https://buffer.com/resources/instagram-algorithms/)
- [ContentDrips: Reels vs carousels 2026](https://contentdrips.com/blog/2026/06/instagram-reels-vs-carousels-2026-guide/)
