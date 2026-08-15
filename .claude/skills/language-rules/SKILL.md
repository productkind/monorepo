---
name: language-rules
description: The language rules that apply to every word productkind and Little Parrot publish, in any format. Banned words and phrases, British English, punctuation and formatting, AI dressing, and the positions our copy always takes. Use when writing or reviewing any caption, course step, course description, toolkit item, email, carousel slide, LinkedIn post, Substack article or Note, community message, or landing page line.
---

# Language rules

These rules hold for every word we publish, in any format and in either voice. They are about words only: not structure, length, layout or pedagogy.

Two voice skills sit on top of this one and set the **register**:

- **personal-tone-of-voice** for Kinga's first-person writing (LinkedIn, Substack, founder comments).
- **productkind-tone** for learner-facing brand writing (courses, toolkit items, emails, captions, carousels, landing pages).

Both are warm, mentor-like and honest, and both share real flops and failures we learned from. This file is the part they share.

## How to add to it

When a correction applies to **both** a Substack article and a course step, it belongs here. When it only holds because of who is speaking, or because the reader is a beginner, it belongs in one of the two voice skills. Add a phrase to the closed list in section 2, or a short rule to section 3. Keep the closed list a list; keep the reasoning in section 3.

---

## 1. Mechanics

- **British English throughout.** organise, behaviour, colour, prioritise, recognise, apologise. British punctuation too.
- **No em dashes (—).** For an aside, use the spaced en dash: "someone – usually a man – with all the right answers". Otherwise a comma, a colon, parentheses, or two sentences.
- **No decorative punctuation.** No decorative dashes, symbol strings or bullet glyphs used for ornament.
- **Emoji make a point warmer or carry an emotion.** That is the test, and it includes functional signposting where it genuinely helps the reader (a 🔖 on a save-ask, a ✅ on a finished step). What is wrong is littering: strings of emoji, one on every line, or emoji standing in for words that should be written. Per-format limits are set by the voice and format skills.
- **Hashtags are a channel decision, never a language one.** Never on LinkedIn or Substack. Where they are used (TikTok, Instagram, YouTube Shorts), the count and placement are set by the captions and carousel skills, and only their wording is judged here: niche and specific, not tag-speak.

## 2. Banned phrases (exact match)

Every phrase below is banned outright, in any format. This section is the closed list, so keep it parseable: comma-separated phrases under each heading, no commentary. Rules needing judgement go in section 3.

`scripts/check-banned.py <file...>` checks any draft against this list, em dashes and American spellings mechanically, parsing the list from this file at run time. Adding a phrase here is the only step needed for the script to catch it. Run it on any draft that exists as a file before shipping.

### Hyperbolic adjectives
game-changing, mind-blowing

### Drama words
hack, chaos, crisis, fluff, hype

### Business jargon
leverage, synergy, move the needle, circle back, land on

### Announcing clarity
in plain English, in plain language, plain wording, in one plain paragraph

### Empty fillers
but here's the catch, to cut through the chaos, cutting through the noise, that moment stuck with me, this stuck with me, it stuck with me, that stayed with me, this stayed with me, it stayed with me, that actually lands, that sticks, which makes a real difference, makes a real difference, made a real difference, I keep coming back to, one idea I keep coming back to, it clicked, something clicked, the book finally clicked, it finally clicked

### Pseudo punchlines
Here's the thing, Bottom line, No fluff, This one's for you, Why this matters, What moved me, This matters because, that matters, it matters most, matters most for, In this piece

## 3. Rules that need judgement

- **"matters" / "matter" as an importance claim**, in any form: "tone matters", "your first prompt matters more than any prompt after it", "faces matter more than artistry". It asserts importance without saying anything. Say what the thing does or changes instead: "your first prompt sets the direction for everything built after it".
- **"quietly" as a signifier**: "it can quietly rewrite", "quietly changed". State the action plainly: "it can rewrite a paragraph you never mentioned".
- **"genuinely" as an empty intensifier.** Test: delete the word. If the sentence keeps its meaning, it was filler ("genuinely useful" becomes "useful"). Fine where it contrasts with fake or performative: "celebrate progress genuinely, not performatively".
- **Figurative "land" / "landed"**: "it landed differently for me", "how you land a message", "it didn't land". Say what happened.
- **Rhetorical formulas**, the explicit negation then reversal: "Not X, but Y", "It's not... it's...", "X isn't... it's...". This counts when the two halves are split by a full stop as well: "The honest barrier isn't the editing. It's the setup." State the point directly: "The hard part is the setup."
- **Two-beat setup-payoff**, a short concession then a clipped reversal: "That sounds small. It isn't.", "Sounds simple. It's not.", "Easy, right? Wrong." State the point directly.
- **"from X to Y" transformation phrasing**: "from scattered idea to shipped product", "go from 'I can't' to 'I just did'". Describe the experience directly.
- **"write up" / "wrote up" / "write it up".** Use "write about", "wrote about" or "wrote down".
- **"wrestling with".** Use "struggling with".
- **Do not use "plain" to describe writing style at all**, including inside example prompts and tone blocks. Say "simple wording".
- **Artificial writerly phrasing**, constructions no one would say aloud. Say the line the way you would say it to a colleague, plain verbs and plain subjects:
  - ownership metaphors for abstract things: "once the names are yours", "make the vocabulary your own", "the skills are now yours" becomes "once you use these names", "once you know them"
  - abstract placeholder noun ("the piece", "the thing", "the part") plus a handed or given metaphor: "the words people are rarely handed" becomes "most people were never taught the words"
  - an elevated verb where a plain one fits: "the words you'll reach for most" becomes "the words you'll use most"
- **Generic encouragement with no specifics**: "Amazing!", "Great job!" on their own. Name what the reader actually did: "you wrote your first prompt".

## 4. AI dressing

The largest category, and the one a keyword scan will not find: wording that sounds meaningful but states nothing concrete. Vague nouns, figurative verbs, withheld subjects, unfinished thoughts, arranged symmetry, throat-clearing openers, empty payoff lines.

The rubric is a corpus of real corrections, in [references/ai-dressing-corrections.md](references/ai-dressing-corrections.md) next to this file (full path: `.claude/skills/language-rules/references/ai-dressing-corrections.md`). Read it when judging or revising a draft, not from memory. It applies to all of our copy, not only personal posts.

The rule to carry from it: **precision, not concision.** Corrections are often longer than the line they replace. Never fix a vague line by deleting the concrete information; when a vague line was carrying the payoff, name the payoff.

## 5. Clarity and concreteness

- **Concrete over abstract.** "scattered across WhatsApp and email", not "fragmented communication channels". A named tool, a real scenario, a real number.
- **Active voice, and the actor at the front.** "You'll learn", not "This will teach you". Give a passive sentence its actor back.
- **Direct address.** "You" and "your". Write to the person, not about them.
- **Contractions, unless the full form is doing work.** "It's", "you'll", "don't", "can't", "there's". Without them the same sentence reads like a notice rather than a person: "It is invisible work, which is what makes it heavy" against "It's invisible work, which is what makes it heavy". Not a find-and-replace: the full form carries more weight where you want the emphasis ("I do not know"), and the legal pages stay formal. A draft that passes `check-banned.py` and still reads stiff is usually short of contractions, since nothing in the checker can see this.
- **Every technical term gets an inline definition on first use**: "MVP (Minimum Viable Product)", "kebab-case (all lowercase, words separated by hyphens)". Teaching the real term is the goal, so never swap it for a dumbed-down paraphrase. The fix for a bare term is always a definition.
- **"local" / "locally":** prefer "on your computer" in titles and anywhere the term arrives cold. Acceptable in body copy only where the piece defines it. `localhost` is fine when explained as "this computer".
- **Explain the why before the how.** Give the reasoning, then the technique.
- **Sentences carry one idea each**, short to medium length. Every sentence carries information: a line that only prepares, transitions or reassures earns its place only if something concrete arrives in it.

## 6. Positions our copy always takes

- **The expertise and thinking are ours; AI helps put it into the right format faster.** Never imply AI does our thinking or writes our courses.
- **Fellow learner, never above the reader.** The point comes from something we worked out or got wrong, and we share real flops and failures we learned from. Kinga's product-management expertise is framed as something she shares, never observed from above, and never superior to other builders.
- **Overconfidence is a fault.** Sweeping certainty, breeziness, calling something easy when it isn't, one tidy answer where the real one has conditions, or flattening a nuanced point to sound assured. Being honest about difficulty is part of the voice, not a weakness in it.
- **No overselling.** Promise only what the thing actually delivers. No sweeping comprehension claims a course does not teach.
- **Building your idea with AI, never becoming a developer.** Lead with the reader's idea or business outcome. "Like a developer" as a borrowed workflow is fine; a developer career or identity as the destination is not. Avoid "no code needed".
- **Tool terminology.** "AI chat assistant" for ChatGPT and Claude.ai (you copy the answer out). "AI agent" for Claude Code and Codex (it acts in your files and shows the changes). Write "AI chat assistant" in full, never "chat assistant". Avoid "chat AI" and "agentic".
- **No invented assumptions or strawmen.** Do not write "people think X" or "you might assume Y" unless we know they do. The same holds for what people *do*: "most people try this once and never again" is a claim about behaviour and needs a source or it goes. Start from what is true.
- **Never invent facts about us.** Our backstory, motivation and experience are only ever what we have actually been told. "We made it for mums" is true. "The examples come from new-mum life, because that is where we built it" invents an experience Kinga has not had. This kind of line reads as warm, authentic detail, which is exactly what makes it dangerous, because a reader takes it as fact about the founders. Watch for clauses beginning "because that is where we...", "after we...", "when I was...", "having been...". Reassigning an unsourced claim to Kinga's first person is not a fix, it is a second fabrication on top of the first.
- **Do not speak for a group's experience from outside it.** "A version that suits an ADHD brain" states what suits every reader with ADHD. Address the reader: "a version that works better if you have ADHD".
- **Name the source when an idea is not ours** (a researcher, a podcast, a book).

## Not faults

Flagging any of these sands the voice out, which is worse than missing a hit:

- **"actually"** and other hedged intensifiers ("quite a bit", "pretty well", "really") used as honest concessions. Only a problem when sprinkled as filler in nearly every line.
- An ordinary **"rather than" / "instead of"** comparison in a single natural sentence: "a result that surprises me counts as information rather than a judgement on me". That is clear comparison, not a rhetorical reversal. Do not flatten it to satisfy the rule above.
- The **spaced en dash (–)** for asides, **warm exclamation marks** ("Happy building!"), and a **single tonal emoji** carrying real warmth or self-deprecation.
- Sentences starting with **So, And, But**; comma splices; parenthetical asides; a trailing "though"; the odd non-native turn of phrase. This is the rhythm, not a defect.
- A **real technical term** used as the right word (static, dynamic, commit, prompt) where it is defined inline.
- **Repetition of a straightforward word**, or a longer sentence, where the alternative loses a specific. Clearness is the target.
- **Admitting a mistake**, naming difficulty, or saying "this is hard" when something is hard.
