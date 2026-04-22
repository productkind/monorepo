---
name: outline-to-micro-course
description: Use this checklist when generating micro-course content from an outline. Every course must meet these criteria before being considered complete.
---

## Micro-course structure
- Each micro-course is made up of challenges.
- Each challenge is made up of steps.
- Each step has a type: see all the types in [`./courseSteps.ts`](./courseSteps.ts)
- The `note` field on the course is optional. Only include it if the course has something genuinely important to flag (e.g., timing expectations that differ from normal, prerequisites). Don't add a note by default.

## Important Aspects to Follow
- You don't have to follow the exact structure of the course outline given. It's important that you craft the micro-course in a way that engages learners and help them efficiently acquire new skills.
- The first challenge must hook the learner with a specific, reusable tool they can apply immediately: a formula, a template, a checklist, or a practical technique. The learner decides based on the first challenge whether to subscribe, so they need to walk away with concrete value, not just motivation or mindset. Avoid hooks that rely on unrealistic scenarios (e.g., "strangers start asking for your product"). Most learners have to work hard for attention, so the hook should equip them to do that work.
- The learner should encounter a practical and hands-on step in the micro-course as soon as possible. Build their mindset during the micro-course, connecting it to practical experiences, not in a separate challenge focusing only on the mindset. Mindset points (like "you don't need investors") work best as supporting content after the learner has already engaged with a practical exercise.
- Include in the micro-course description the transformation the learner will realise by the end. Include what the learner will be able to do after completing the micro-course.
- When creating quiz steps, vary which answer is the correct one (not always the second one).
- **Reusable artifact per challenge:** Every challenge should give the learner something they can reuse outside the course: a formula, a template, a checklist, a prompt template, or a script. If a challenge only explains a concept without a reusable artifact, it's incomplete.
- **Realistic examples:** Assume the learner has zero traction, zero audience, and no business experience. Every example must be achievable by someone starting from nothing. Don't show outcomes that require luck or organic demand (e.g., "40 sign-ups in two weeks" or "strangers start asking for your product"). Show outcomes that result from specific actions the learner took.
- **Correct URLs:** Check `../../../little-parrot/content/course/course-links.md` for course URLs and `../../../little-parrot/content/course/toolkit-links.md` for toolkit URLs before generating any cross-references. Never invent placeholder URLs.
- **Address the learner's biggest fear first.** Before teaching anything, identify the misconception or fear that's stopping the learner from starting and address it head-on. ("You don't need to know how to code", "You don't need a company or investors", "You don't need to be creative.") Clear the blocker, then teach. This should be the first text step after the comics.
- **Don't open with overwhelming text blocks.** The learner's first reading experience after the comics sets their expectations for the whole course. If the first text step is long, split it into two shorter steps. Short, focused steps feel approachable. A wall of text feels like homework.
- **Show where reusable tools will come back.** When a challenge teaches a formula, template, or technique that the learner will reuse in later challenges, add a step listing where it will show up. This motivates the learner to take it seriously and connects the dots across the course. Don't leave the learner wondering "why does this matter?"
- **Verify tool-specific advice against official documentation.** When a course teaches how to use a specific tool (e.g., PostHog, Stripe, Google Workspace), check the tool's actual documentation before writing setup instructions, configuration steps, or terminology. Use the tool's own names for settings, buttons, and concepts. Don't generate setup instructions from general knowledge.
- **Fact-check before stating best practices.** If you're about to write something as a principle, best practice, or rule (in text steps, quiz explanations, or subDescriptions), and you're not confident it's grounded in real domain knowledge, look it up using WebSearch or WebFetch before including it. Don't state uncertain opinions as facts. Don't silently skip it either. Verify first, then write.

---

## Narrative Structure

**Start with a relatable problem, not a lesson.** Use comics or a story to show someone's frustration before any teaching begins. Learners should feel "that's me" before they learn anything. The comics should set up the **full course arc** (the spark, the overwhelm, the guide offering a path), not only introduce the first challenge's topic.

**Introduce the course after the comics.** Add a brief step after the comics that tells the learner what they'll walk away with. List the concrete outcomes, not the topics. Jumping straight from comics into teaching feels too abrupt. The learner needs a moment to understand what they're signing up for before the first lesson starts.

**Transformation hook in the first video/intro.** Frame the course as identity change: "From X to Y." Not "You'll learn A, B, C" but "You'll become someone who..." Example: "From 'I can't build apps' to 'I just published my first one.'"

**One running example throughout.** Use Dalmie (a dalmatian dog character) building the Book Club Organiser app as the running persona and project across all challenges, consistent with other Little Parrot courses. Don't switch examples mid-course. Consistency makes abstract concepts tangible and helps learners follow along. **Keep Dalmie's backstory consistent:** Dalmie built the app for her friend Sarah, who is the book club organiser. Sarah is the domain expert. When Dalmie needs domain knowledge (e.g., what book club organisers struggle with), she asks Sarah rather than knowing it herself.

**Challenge openers set emotional tone.** The first step of each challenge should excite and preview the transformation, not just list what's coming. Acknowledge progress ("You're no longer a beginner") and build anticipation for what they'll be able to do.

**Challenge-end steps have distinct roles.** The `nextModule` field should excite and build anticipation for what's coming next. The `subDescription` should reflect on the value the learner got from this specific challenge, not recap the whole course so far. Don't repeat the same information in both fields.

**The final exercise should be one focused, forward-looking action.** End the course with a single question that converts learning into momentum, like "What's the one thing you'll do this week?" Don't end with a multi-part summary or a heavy exercise. The learner should leave with intent to act, not a to-do list.

---

## Teaching Approach

**Teach prerequisites thinking.** Before introducing a feature, model the question: "What does this feature need to work properly?" This is a meta-skill learners should internalise. Example: "Before adding voting, we need authentication so the app knows who's voting."

**Specific test cases after features.** After teaching how to build something, include explicit verification steps. Not "test your feature" but specific actions: "1. Try voting without logging in. 2. Log in and vote. 3. Try voting again on the same book." This builds testing habits.

**Cross-reference at the moment of relevance.** Link to other courses when the learner might want to go deeper, not in a list at the end. Example: "Curious about databases? Our Basics of Software course explains this in friendly terms."

**Define unfamiliar terms inline.** If a concept is mentioned before its dedicated challenge (e.g., "directory submissions" in Challenge 1 that are taught in Challenge 5), add a brief inline explanation so the learner isn't confused. Don't assume they'll know what it means because it's covered later.

**Specify who in exercises that involve other people.** If an exercise asks the learner to talk to people, test something on others, or collect feedback, specify who those people should be (e.g., "people who match your target audience", not "five people"). Without this, learners default to friends and family who may not give useful reactions.

**Quiz explanations should teach, not just confirm.** Use the explanation text after a quiz answer as a teaching moment. Introduce a principle, reframe the concept, or add nuance that wasn't in the text steps. "Correct, B is the right answer" wastes a learning opportunity. "Features don't equal value. A list of features tells people what the product has, but not what they can achieve with it" teaches something new.

**Examples should model the thinking process, not just the output.** When showing Dalmie's example, focus on *how* she arrived at her decision, not just what she decided. The learner benefits more from seeing a replicable thought process ("she asked Sarah what she struggles with most") than from seeing the finished result ("she made a PDF"). Show the question that led to the answer.

**Exercises should focus on one thing.** Don't bundle multiple tasks into a single exercise. "Plan your email capture + design your lead magnet + check it against three criteria" is three exercises pretending to be one. One clear question or task per exercise. If you need the learner to do multiple things, use separate steps.

**SystemPrompts for free-text exercises must avoid em dashes.** Consistent with the productkind tone guidelines.

**Copy-paste prompts must be in markdown code blocks.** When the course includes a prompt the learner can copy and paste into an AI app builder or other tool, wrap it in a markdown code block so it's clearly distinguished from the surrounding text and easy to copy.

**Every toolkit mention must be a clickable link.** Don't write "check the toolkit for the setup guide" without linking to the specific item. The learner shouldn't have to go find it.

**Weave toolkit references into the text naturally.** Make sure that it reads well and doesn't break the flow of the content.

**Categories must be on the same level.** When a step presents options or models for the learner to choose between, check that they're the same type of thing. If they're not, split them into separate decisions. For example, "subscription vs one-time payment" is one decision (how you charge), "free trial vs freemium" is a different decision (how people try). Don't mix them into one list.

**Split steps with more than 3 items.** When a step introduces more than 3 concepts, techniques, or options, split it into two consecutive steps. Long lists lose the learner's attention.

**Dense information should be scannable.** Avoid tables (they break on mobile) and long paragraphs with multiple concepts. Use stacked formats: bold name, one-line description, key details on separate lines. Design for vertical reading on a phone screen.

**Don't assume which option the learner will choose.** When teaching decision frameworks with multiple paths (e.g., pricing models, trial types), keep the guidance flexible so it applies regardless of which path the learner takes. Don't write follow-up steps that only make sense for one option.

**Anchor models and categories with real products.** When introducing models, categories, or abstract concepts, include a well-known product as an example so the learner can picture it. Only include examples you've verified are accurate. If you can't find a verified example, leave it out rather than guessing.

**Heavy calculations and multi-step procedures belong in toolkit items, not exercises.** If an exercise requires a calculator, a spreadsheet, or multiple steps of arithmetic, make it a toolkit item (e.g., a Google Sheet template) instead. The course should teach the concept and show an example. The learner applies it at their own pace using the toolkit.

---

## Tone and Expectations

**Name the difficulty explicitly.** Use step titles like "Things will break (and that's okay)." Don't hide struggle; normalise it. Learners trust content that acknowledges reality.

**Reframe universal principles for the specific context.** Generic wisdom needs contextual translation. Example: The 80/20 rule became "the 80/20 of vibe coding" with specific meaning: generating is fast, perfecting takes time.

**Model what you teach.** If the course teaches "build incrementally," the course itself should build incrementally. The running example should start simple and grow, mirroring the learner's journey. Don't dump all features in the first prompt example.


## Checklist for Micro-course Content
Micro-course content should follow these principles to ensure it's engaging, effective, and aligned with our educational philosophy. Use this checklist as a guide when creating or reviewing micro-course content.

### 1. Single-Concept Focus

**Requirement:** Each challenge teaches exactly one action-oriented concept, skill, or problem.

**Check:** Can the challenge's outcome be stated in one sentence using this format?
> "After this challenge, you will be able to [specific action]."

**Fail indicators:**
- The outcome sentence contains "and" connecting two different skills
- You need more than one sentence to explain what the learner will be able to do

---

### 2. Immediate Applicability

**Requirement:** The learner can apply what they learned within 5 minutes of finishing.

**Check:** Does the challenge end with a clear, concrete action the learner can take right now?

**The action must be:**
- Specific (not "try using prompts" but "write a prompt asking for a signup form with email validation")
- Achievable without additional research or setup
- Completable in under 15 minutes

**Fail indicators:**
- The challenge ends with conceptual understanding only
- The suggested action is vague ("experiment with this technique")
- The exercise offers a choice between tactics where one depends on the other (e.g., "choose a wait list or lead magnet" when a lead magnet requires email capture). If tactics have prerequisites, make the sequence explicit rather than presenting them as alternatives.

---

### 3. Built-In Practice

**Requirement:** The challenge includes multiple moments where the learner does something, not just watches or reads. Interactive steps should be distributed throughout the challenge, not clumped at the end.

**Effort gradient within a challenge:** Structure interactions so effort increases gradually:
- **Low effort (after 1-2 text steps):** Scenario-based quiz where the learner makes a judgement call on a given example. Not recall ("What is X?") but evaluation ("Is this a good X? Why?").
- **Medium effort (mid-challenge):** Evaluate someone else's work using the criteria just taught. "Your friend made a 30-page PDF about the history of meal planning. Is this a good lead magnet for her meal planning app?" The learner applies criteria to a given situation, not their own.
- **High effort (end of challenge):** Apply what they've learned to their own product. By this point, they've practised the judgement on easier examples, so applying it to their own situation feels like a natural next step rather than a cold start.

**The pattern to avoid:** Read, read, read, read, quiz, quiz, exercise. This makes the learner passive for too long and then overwhelmed at the end.

**The pattern to follow:** Text, text, quiz (judge a scenario), text, text, quiz (evaluate someone's work), exercise (apply to your own). The learner never reads more than 2-3 text steps before doing something.

**Important:** Don't ask the learner to apply concepts to their own product after every text step. That requires high mental effort and becomes exhausting. Save "apply to yours" for the end of the challenge. Mid-challenge interactions should ask the learner to evaluate given examples, not generate their own.

**Quiz answers must not be stated in the preceding step.** If the answer to a quiz question appears word-for-word in the text step before it, the quiz is testing short-term memory, not understanding. Rewrite it as a scenario where the learner has to apply the concept to a new situation.

**Acceptable practice formats:**
- Scenario-based quiz (judgement, not recall)
- Evaluate a given example against criteria just taught
- Reflection question that requires writing a response
- Free-text exercise applying concepts to the learner's own product

**Practice must:**
- Be distributed throughout the challenge, not grouped at the end
- Take under 3 minutes to complete
- Directly reinforce the concept taught in the preceding text steps

**Quiz answer formatting:**
- Keep all options similar in length. If the correct answer is noticeably longer than the others, the learner picks it without thinking.
- Prefer scenario-based questions ("Your data shows 70% drop-off. What should you do next?") over recognition questions ("What can X help you spot?"). Scenarios force the learner to think through a real decision.

**Fail indicators:**
- All interactive steps are grouped at the end of the challenge
- Quiz questions test recall of definitions instead of judgement or application
- The correct quiz answer is visually obvious because it's the longest option
- The learner reads more than 3 text steps in a row without doing something
- Every interactive step asks the learner to apply to their own product (too much high-effort)

---

### 4. Completion Time

**Requirement:** One challenge (content + practice) is completable in one sitting.

**Target duration:** 5-10 minutes  
**Maximum duration:** 15 minutes  

**Estimation guide:**
- Video content: actual runtime
- Text content: ~200 words per minute reading speed

**Fail indicators:**
- Content exceeds 10 minutes of video or 1,500 words of text
- Practice requires more than 10 minutes

---

### 5. Jargon-Free Language

**Requirement:** A learner with no technical background can understand every sentence.

**Rules:**
- Every technical term is either explained on first use OR avoided entirely
- Explanations use plain language inline, e.g., "**kebab-case** (all lowercase, words separated by hyphens)". Don't assume any term is too basic to explain for this audience.
- Explanations use analogies to familiar, everyday concepts
- Acronyms are spelled out and explained on first use

**Check:** Read each sentence and ask: "Would my non-technical friend understand this without stopping to Google anything?"

**Fail indicators:**
- Technical terms appear without explanation
- Explanations assume prior technical knowledge
- Sentences require re-reading to understand

---

### 6. Clear Progression

**Requirement:** This challenge fits logically in the course sequence.

**Check:**
- Does this challenge assume only knowledge taught in previous challenges?
- Does this challenge prepare the learner for what comes next?
- Is there a clear reason this challenge comes at this point in the sequence?
- If the course has a "go live" moment (e.g., driving traffic, launching publicly), are all setup challenges (analytics, email capture, feedback mechanisms) placed before it? Data lost before tracking is set up can't be recovered. Explain the *why* behind the ordering in the content so the learner builds this mindset.

**Fail indicators:**
- Challenge references concepts not yet introduced
- Challenge repeats content from earlier challenges without building on it
- A setup step (analytics, email capture) comes after the moment it's needed

---

### 7. Welcoming Tone

**Requirement:** The content makes learners feel empowered and capable, not intimidated.

**Tone markers to include:**
- Acknowledgment that this might feel new or unfamiliar
- Normalisation of mistakes ("Don't worry about getting it perfect on the first try")
- Encouragement that is specific, not generic ("You just wrote your first prompt! That's the hardest part done.")
- Mentor-like, kind tone that makes learning enjoyable, ocassionally making jokes to lighten the mood

**Tone markers to avoid:**
- "Simply" or "just" before instructions (implies it should be easy)
- "Obviously" or "of course" (implies the learner should already know)
- Excessive exclamation marks or forced enthusiasm

**Fail indicators:**
- Instructions assume confidence the learner may not have
- Mistakes are not normalised
- Encouragement feels performative rather than genuine
- Making fun of the learner

---

## Summary Checklist

Before finalising any **challenge**, confirm:

- [ ] Single outcome, one sentence, no "and"
- [ ] Ends with specific, realistic action learner can take in 5 minutes (no hidden prerequisites)
- [ ] Includes practice that takes under 3 minutes
- [ ] Total completion time under 15 minutes (ideally under 10)
- [ ] No unexplained jargon
- [ ] Only assumes knowledge from previous challenges
- [ ] Setup challenges (analytics, email capture) come before the moment they're needed
- [ ] Tone is welcoming and normalises struggle

Before finalising **the full course**, confirm:

- [ ] Starts with a relatable problem (comics/story) before teaching
- [ ] First video/intro frames transformation as identity change ("From X to Y")
- [ ] One consistent running example throughout all challenges
- [ ] Challenge openers excite and preview transformation
- [ ] Final reflection asks about the full journey and what's next
- [ ] Features include specific test cases for verification
- [ ] Cross-references to other courses appear at relevant moments
- [ ] Difficulty is named explicitly, not hidden
- [ ] The course models the behaviour it teaches (e.g., builds incrementally)

---

## Verify Techniques Before Generating

Before writing the full course content, list every technique, formula, framework, and method that will be taught across all challenges. Present this list to the user and ask for confirmation before proceeding. For each item, state:

- **What it is** (e.g., "Value proposition formula: '[Product] helps [who] do [what] without [pain point]'")
- **Where it's used** (e.g., "Challenge 1, reused in Challenge 5 for directory submissions")
- **Source or basis** (e.g., "Simplified version of Steve Blank's positioning statement" or "Custom formula, not based on a specific framework")

This step catches misaligned or unreliable techniques before they're baked into hundreds of lines of content. If you're unsure whether a technique is the right one for the audience, flag it explicitly rather than defaulting to general knowledge.

---

## Self-Review Before Presenting

After generating the full course, do a self-review pass before presenting it. Check each rule in this skill file against the output:

- [ ] Are quizzes distributed throughout each challenge, not clumped at the end?
- [ ] Does every quiz test judgement or application, not recall of the preceding step?
- [ ] Are all quiz answer options similar in length (correct answer not visually obvious)?
- [ ] Is every text step short enough to read without scrolling? If it has 3+ concepts, is it split?
- [ ] Does the first step after comics introduce the course outcomes, not jump into teaching?
- [ ] Does the learner's biggest fear get addressed before the first teaching step?
- [ ] Are all URLs verified against course-links.md and toolkit-links.md?
- [ ] Are toolkit references linked and woven in naturally?
- [ ] Does every exercise focus on one thing, not bundle multiple tasks?
- [ ] Do Dalmie's examples demonstrate the thought process?
- [ ] Does each challenge-end have a distinct nextModule (exciting) and subDescription (reflects on this challenge)?
- [ ] Is the final exercise one focused, forward-looking action?

This pass catches the most common issues that survive initial generation.

## Output Format for Generated Micro-course

When generating a micro-course, structure it as the examples. Make sure to use diverse step types in each challenge.

### Example Micro-courses

- `../../../little-parrot/content/course/vibe-coding-product-management-00/vibe-coding-product-management-00.yaml`
- `../../../little-parrot/content/course/vibe-coding-tech-00/vibe-coding-tech-00.yaml`
- `../../../little-parrot/content/course/lovable-intro-00/lovable-intro-00.yaml`
- `../../../little-parrot/content/course/vibe-coding-debugging-00/vibe-coding-debugging-00.yaml`
- `../../../little-parrot/content/course/vibe-coding-start-your-business-00/vibe-coding-start-your-business-00.yaml`

### Save Micro-course
Save the generated micro-course to this folder: `../../../little-parrot/content/course`