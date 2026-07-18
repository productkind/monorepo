# Social platform playbook (researched July 2026)

Actionable answers to five questions across Instagram, TikTok, YouTube Shorts, Threads,
and LinkedIn: hashtags, follow CTAs, caption length, algorithm signals, and personal vs
brand accounts. Built from a verified deep-research pass (109 search/verification agents,
claims adversarially checked against primary sources). Confidence labels are honest:
"official" means the platform said it; "data" means a large-n study; "consensus" means
credible practitioners agree but nobody measured it.

Platform rules changed fast during 2025-2026 (Instagram hashtag cap Dec 2025, Google
caption indexing July 2025, Instagram repost crackdown April 2026, LinkedIn LLM ranking
rollout March 2026). Re-verify before relying on this beyond early 2027.

---

## 1. Hashtags: how many, what distribution

The one-line answer: hashtags no longer drive reach anywhere. They are categorisation
metadata. Keywords in the caption and on-screen text are the real discoverability lever.

| Platform | How many | Distribution | Status |
|---|---|---|---|
| Instagram | 3-5, hard-capped at 5 since Dec 2025 | All niche/specific, zero generic (#instagood is wasted) | Official: Mosseri has said repeatedly they do not drive reach |
| TikTok | 3-5, description capped at 5 since Aug 2025 | 1 broad community tag + 2-3 niche | Official: still a categorisation input, weighted well below watch behaviour |
| YouTube Shorts | 2-3 in the description | Niche + optionally #Shorts | Consensus; stuffing makes YouTube ignore all of them |
| Threads | 1 topic tag (hard limit) | One specific multi-word topic, typed in the composer | Official: single-tag limit is deliberate anti-spam design |
| LinkedIn | 0-3, or none | Topically precise only; 6+ measurably hurts | Data: AuthoredUp found no reach impact over 8 months; LinkedIn removed hashtag following in 2024 |

What replaced hashtags:

- **Instagram**: captions are keyword-searchable in-app, and since 10 July 2025 public
  posts from professional accounts are indexed by Google and Bing. The first ~125
  characters of the caption double as the Google search snippet. Write captions the way
  someone would search ("how to build an app without coding"), not in tag-speak.
- **TikTok**: search indexes captions, voiceovers, and on-screen text. Say the search
  phrase out loud in the video and put it in the caption.
- **LinkedIn**: ranking is semantic now (see section 4). Clear writing that names the
  audience and problem does the work hashtags used to pretend to do.

Cautionary data point (correlational, not causal): Metricool's 2026 study of 24M
Instagram posts found posts with hashtags got 32% fewer views on average.

## 2. "Follow for more" CTAs

Two rules govern everything:

1. **Never bait engagement on Meta platforms or LinkedIn.** Instagram's Recommendation
   Guidelines (which Threads inherits) demote "clickbait, engagement bait, or contest
   promotion" from all recommendation surfaces. The policy names votes, shares, comments,
   tags, and likes. "Comment YES if you agree" and "tag a friend who..." are policy
   violations; a follow ask is not explicitly named, but keep it payoff-anchored to be
   safe. LinkedIn stated in May 2022 it will not promote posts that expressly ask for
   likes or reactions.
2. **TikTok and YouTube openly allow follow/subscribe asks.** TikTok's Creator Academy
   actively encourages them; YouTube only bans reciprocal schemes (sub4sub).

The pattern that works everywhere: tie the follow to a concrete, specific content promise,
placed after the value has been delivered, never as the hook.

| Platform | Phrasings that work | Placement |
|---|---|---|
| Instagram Reels | "Follow for daily [topic] tips" / "New [topic] breakdown every Tuesday, follow along" / soft alternative: "Save this for when you build yours" | Verbal + on-screen text in the last 2-3 seconds; echo as the caption's last line |
| TikTok | "Follow me for more [niche] tips" / "Follow so you don't miss part 2, it's up tomorrow" | Verbal + gesture at the end for clips under 15s; around the 10s mark for longer storytelling; hard links in a pinned comment |
| YouTube Shorts | "Subscribe for a new [topic] short every week" / "Subscribe, part 2 drops tomorrow" | Verbal in the final seconds; links in pinned comment |
| Threads | "I write about [topic] here most days, follow along if that's your thing" / better still: end on a genuine question (replies are the ranking currency) | Final line, or as the first reply to your own post |
| LinkedIn | "I share [topic] lessons like this every week, follow if that's useful for your work" | Last line after a substantive post, or in your own first comment. Never "like for part 2" or reaction polls |

The "part 2 tomorrow" anticipation CTA is the strongest follow driver by practitioner
consensus, and it fits course-shaped content naturally. Circulating stats on CTA lift
(pinned comments +40%, specific CTAs +60-80%) are single-vendor claims with no
methodology; the directions are sensible, the numbers are not citable.

## 3. Caption length

Hard truncation points are facts; "optimal length" figures are correlational.

| Platform | Limit | Visible before the fold | Recommended |
|---|---|---|---|
| Instagram feed/carousel | 2,200 chars | ~125 chars ("... more") | Short (under ~150 chars) for engagement plays; long keyword-rich (150-300 words) for educational carousels you want found in search |
| Instagram Reels | 2,200 chars | ~55-60 chars in the Reels tab | Hook + keyword in the first 60 characters |
| TikTok | 4,000 chars | ~80-100 chars | 150-300 chars for most posts; longer only when doing deliberate search work. A question in the caption correlates with ~26% more comments (Metricool, n=2.3M) |
| YouTube Shorts | Title 100, description 5,000 | Title is the hook | Title 20-40 chars, keyword first (trending-Shorts data); description 150-500 focused chars |
| Threads | 500 chars | No fold; first line decides the scroll-stop | Under ~200 chars, conversational (opinion-tier; no length study exists) |
| LinkedIn | 3,000 chars | ~140 (mobile) to ~210 (desktop) chars | 800-2,500 chars of substance. AuthoredUp (372K posts, late 2025 to early 2026): 1,301-2,500 chars earned +27% engagement vs short posts. LinkedIn is the one platform where longer wins |

Universal rule: the first line is the only text most people ever see, and on Instagram it
is now also the Google snippet. Spend disproportionate effort there.

## 4. What each algorithm actually rewards

**Instagram** (official, Mosseri + ranking explainer)
- Reels: likelihood you reshare/send it, watch it all the way through, like it, or visit
  the audio page. Sends per reach is the metric Mosseri names first. Private signals
  (DM shares, saves) have overtaken public ones.
- Feed: predicted per-viewer actions (time spent, comment, like, share, profile tap).
- Explore: aggregate engagement velocity (how many people save/share and how fast)
  matters far more than in Feed. Save-worthy educational carousels are built for this.
- Not follower-gated: most Reels a user sees are from accounts they do not follow, and
  Instagram states creators of all sizes now have the same reach opportunity.
- Original content only: since April 2026, accounts that mainly repost lose all
  recommendation eligibility, and each duplicate loses its slot to the original.
  TikTok-watermarked videos are still demoted (policy since 2021, actively enforced).

**TikTok** (official transparency centre + consensus tiers)
- Watch time on the specific video and completion rate dominate; TikTok says time spent
  watching "is generally weighted more heavily than other factors".
- Rough tiers below that: replays and shares strongest; comments, follows-from-video,
  saves strong; likes and hashtag engagement moderate. Tiers are industry inference;
  exact weights are proprietary.
- Not follower-gated; each video is scored on its own predictions.

**YouTube Shorts** (official interviews, Todd Beaupre 2025)
- The system "pulls" content per viewer rather than pushing videos to a mass audience.
  Signal weights are context-dependent and learned per surface; there is no fixed formula
  to optimise against. Per-viewer satisfaction with each video is what earns more pulls.
  (A circulating claim that satisfaction surveys outrank watch time was refuted; do not
  repeat it.)

**Threads** (blog-tier, consistent but unofficial)
- Engagement velocity (early engagement beats the same total spread out) and reply depth
  (real back-and-forth conversation) are reported as the strongest signals, above likes
  and reposts. Posts that start conversations beat posts that broadcast.
- Inherits Instagram's engagement-bait demotion; Mosseri ran a bait crackdown from
  Oct 2024. The old link penalty reportedly reversed in 2025 (single source, low
  confidence).

**LinkedIn** (mixed official + large-n data)
- Dwell time is a confirmed ranking input (LinkedIn engineering blog, including a "Long
  Dwell" classifier). Comments matter far more than likes (multiplier disputed, 2x-15x
  depending on source). Saves are reported as the highest-value action (~5x a like;
  AuthoredUp, vendor data).
- Early conversation is the amplification mechanism: several distinct commenters in the
  first hour is the trigger multiple datasets agree on (~5x reach per van der Blom's
  1.8M-post 2025 report). Reply to every comment within the first hour.
- Relevance beats recency, officially: LinkedIn execs describe resurfacing valuable posts
  for weeks or months. Evergreen how-to content keeps earning.
- March 2026: LinkedIn announced an LLM-powered ranking rollout (widely understood to be
  its 360Brew research model, though LinkedIn has not confirmed the name). Practical
  effect: semantic understanding rewards clear, substantive, on-topic writing and
  demotes bait-style hooks and engagement-pod patterns.
- Consistency matters: 2-4 posts per week, max 1 per day; gaps hurt the next post
  (direction confirmed, circulating percentages are not).

## 5. Personal accounts vs productkind/Little Parrot accounts

**Account type is not an algorithmic ranking factor on Instagram, TikTok, YouTube, or
Threads.** The measured personal-account advantage is a content-style effect (faces,
stories, opinions outperform logo content) plus the fact that people follow and engage
with people. LinkedIn is the exception: distribution structurally favours personal
profiles.

Per platform:

- **LinkedIn: the clearest yes.** Company pages now reach roughly 1.6% of followers
  organically (van der Blom 2025; down from ~7% in 2021) and page reach fell 60-66%
  during 2024-2025. Page content is ~2% of feed inventory vs ~28% for personal creators.
  Post from Kinga's profile as the primary channel (Thomas's too where natural); treat
  the company page as a shopfront that reposts. The widely quoted "561% more reach"
  stat is 2014 employee-advocacy folklore; do not cite it, but the direction is right.
  Low-effort combo: page posts get a substantive comment from a founder within the first
  hour (founder comments beat reshares for page reach).
- **Instagram: run both with Collab posts.** One upload, invited via "Tag people >
  Invite collaborator", appears natively on both profiles with pooled likes/comments.
  Works for Reels, carousels, and single images; up to 5 collaborators reported (verify
  the current number in-app). This sidesteps the April 2026 duplicate-content rules,
  which have no exemption for accounts you own: an identical re-upload on the second
  account gets suppressed as a duplicate. Never re-upload; always Collab or materially
  re-edit (new hook, new voiceover).
- **TikTok: one account only.** TikTok explicitly treats identical videos across your
  own accounts as spam, with escalating penalties. Also: Business accounts are locked
  out of trending sounds (Commercial Music Library only), so keep the posting account a
  personal/creator account even if it carries the brand name.
- **Threads: brand quotes founder, founder quotes brand.** No collab mechanic; the
  quote post (with added commentary) fits the conversation-driven algorithm far better
  than a bare repost.
- **YouTube: a Collaborations feature (up to 5 channels on one video/Short, shared
  audiences and counts) has been rolling out since late 2025.** Worth using if both a
  personal and a brand channel ever exist; until then, one channel is plenty.

**Content split** (practitioner consensus, Buffer framework):

- Brand accounts: courses and product, polished carousels, mission, learner wins.
- Founder account: opinions and takes, lessons learned, behind-the-scenes of building
  productkind, personal story. A rough 70% work-related / 30% personal mix is commonly
  recommended (single-source, medium confidence).
- For a 2-person team, Buffer's advice is pointed: the founder should not be everywhere.
  Pick the one platform that suits her and go deep; link everything else back.

**Low-effort operating model:**

1. Produce each asset once. On Instagram publish as a Collab (both accounts served, no
   duplicate risk). On TikTok publish once from the primary account.
2. Founder amplification costs minutes: a substantive comment on each brand post within
   the first hour (LinkedIn especially), a quote post on Threads.
3. Reply to comments everywhere. It is the cheapest measurable engagement lift on every
   platform (Buffer 2026, 52M posts) and doubles as the early-conversation trigger
   LinkedIn and Threads reward.
4. ~15 minutes a day commenting on 5-10 posts in the niche from the founder account
   builds presence without producing anything.
5. Consistency beats volume: weeks with zero posts underperform the account's own
   baseline. A sustainable 2-4 posts per week beats bursts.

---

## What this means for us, concretely

1. **Rebuild caption templates**: first 125 characters = hook + the phrase a learner
   would search; 3-5 niche hashtags max (e.g. course-topic + audience + format, never
   generic); on carousels, longer keyword-rich captions are now an SEO asset because
   Google indexes them.
2. **Optimise Reels/TikToks for finish-and-send**: short enough to watch to the end,
   useful enough to DM to a friend. "Sends per reach" is the Instagram metric to watch
   in insights. This aligns perfectly with share-ask acquisition: a Reel someone sends
   a friend is the same motion as sharing a free course link.
3. **CTA standard**: payoff-anchored follow ask as the final beat ("Follow for
   [specific promise]", "Part 2 tomorrow"), verbal + on-screen in video, last line in
   captions. No comment-bait, no tag-bait, anywhere.
4. **LinkedIn shifts to Kinga-first**: 2-4 substantive posts per week from her profile,
   800-2,500 characters, hook in the first 140; reply to every comment in hour one;
   productkind page reposts and gets a founder comment. Saves-worthy checklists and
   how-tos keep earning for weeks.
5. **Instagram dual-account**: set up Collab posts between Kinga's account and the
   Little Parrot/productkind account for course promos; never duplicate-upload.
6. **TikTok**: single creator-type account, trending sounds available, captions written
   as search phrases.
7. **Export hygiene**: clean 1080x1920 exports, no TikTok/CapCut watermarks on Reels.
