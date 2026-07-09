# Content strategy system

Claude as content strategist, not content writer. Adapted from Tayla Burrell's
"Claude MBA" process (https://taylaburrell.substack.com/p/claude-got-me-3674-new-followers)
to how we already work: the strategy lives in this repo as files, so Claude Code
reads it automatically whenever we plan or draft content.

The core idea: AI can create content, but it cannot create luck. Luck is the right
person reading the right thing at the right time and acting on it, and that only
happens when the content is unmistakably yours. So AI does the strategist work
(audience research, positioning pressure-tests, planning), and the ideas and
words stay ours. This matches the rule we already hold for courses: the thinking
is ours, AI helps with format and speed.

## The three files

1. **`audience-research.md`** - the audience brief. Who we write for, in their own
   words: goals, blockers, language, spending, content habits, competitors, dream
   state. Built from our own user-insights data (the strongest source we have)
   cross-checked against external research. Refresh roughly every 6 months or
   after a big cohort (a SheBuilds season, a course launch).
2. **`belief-interview.md`** - Kinga's answers to the five belief questions. This
   is the positioning source: what we want to be known for, what we believe that
   others in the space don't, what makes us angry, what we learned the hard way,
   what we never want to be associated with. Claude drafts nothing strategic
   without it. Re-answer when positioning shifts, otherwise leave alone.
3. **`content-strategy.md`** - the strategy brief the content system runs on:
   positioning and point of view, content pillars, platform priorities, cadence,
   formats, and the path from viewer to subscriber. Derived from the two files
   above. Review quarterly.

## How to use it

### Monthly planning (strategy-based)

Ask Claude Code:

> Build next month's content calendar. Read
> `productkind/marketing/strategy/` (all three files) and the channel registry
> (`productkind/marketing/channels/README.md`), pick a monthly throughline that serves one strategy pillar,
> and propose a schedule at our sustainable cadence. Every post idea must trace
> to a pillar and start from something real (a user quote, a number, a thing
> that happened to us). Write it as a campaign folder like
> `campaigns/2026-june-linkedin-calendar/`.

The June 2026 calendar is the model: one throughline, one transferable tip per
post, the authenticity filter applied to every idea.

### Idea testing (inspiration-based)

When an idea arrives on a walk or in a conversation, drop it in raw:

> Here's a content idea: [voice-note transcript or rough sentence]. Test it
> against `content-strategy.md` and `audience-research.md`. Which pillar does it
> serve, if any? What angle makes it strongest for our audience? Where does it
> fit in the current calendar? Push back if it's off-strategy.

The idea still comes from us. Claude checks it against the strategy so we stop
second-guessing, and it earns a calendar slot or gets parked.

### Challenging the strategy

The strategy is only useful if it survives questioning. When something feels
wrong, ask Claude why it recommended it, disagree out loud, and edit the file.
The more marketing and product judgement we bring, the better it directs.

## Refresh prompts

### Audience research refresh

Run when the brief feels stale. First re-synthesise `little-parrot/user-insights/`
(our data beats any external research), then have Claude research externally with
this brief, and cross-check the two:

> You are a market researcher specialising in audience analysis. My niche:
> teaching non-technical women to build apps and businesses with AI (vibe coding,
> mainly Lovable), through short science-based courses. My audience: non-technical
> women with business ideas - PMs, ops people, analysts, founders, freelancers,
> career changers, mostly juggling jobs and family.
>
> Research 8 dimensions. Be specific; no generic personas. (1) Who they are:
> demographics, identity labels they use for themselves. (2) What they want: the
> transformation they seek in 6-12 months. (3) What's stopping them: what they
> complain about in private but don't post publicly. (4) The language they use:
> exact phrases from Reddit, LinkedIn and communities when they think nobody
> important is listening. (5) What they spend money on: price thresholds, what
> they call worth it versus a waste, what disappointed them. (6) How they consume
> content: creators they trust, formats they save versus skip. (7) The competitive
> landscape: who serves them, what nobody covers. (8) What success looks like:
> the emotional dream state, not just goals.
>
> For each dimension lead with the key finding, include direct quotes from real
> people with sources, flag surprises, and mark confidence high/medium/low. End
> with a day-in-the-life profile, the 5 most important insights for our brand and
> paid offer, and language to use and avoid.

Tayla runs the same brief across Claude, ChatGPT, Perplexity and Gemini and has
Claude cross-check the outputs. Our equivalent: fan out several independent
research agents on different dimensions and cross-check them against each other
and against `user-insights/` before anything enters the brief.

### Belief interview

Run in a fresh conversation when positioning shifts:

> You are a personal brand and content strategist. Read `audience-research.md`
> and my brain dump below. Before you generate anything, interview me: ask these
> one at a time and wait for my answer. (1) What do you want to be known for in
> 3 years? (2) What do you believe about your topic that most people in your
> space would disagree with? (3) What makes you genuinely angry about how your
> industry operates? (4) What have you figured out the hard way that your
> audience hasn't yet? (5) What do you never want to be associated with?
> Then use my answers to rebuild `content-strategy.md`: positioning and POV,
> content pillars, platform priorities, cadence, formats, and how someone moves
> from viewer to subscriber.

## What stays human

The drafts still go through the existing gates: the `linkedin-post` and
`personal-tone-of-voice` skills, the linkedin-critic, and Kinga's final edit.
This folder decides *what* to say and *why*; the voice work decides *how*; and
hitting publish stays a human job.
