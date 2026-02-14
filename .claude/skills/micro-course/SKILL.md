---
name: micro-course
description: Use this checklist when generating micro-course content from an outline. Every course must meet these criteria before being considered complete.
---

## Micro-course structure
- Each micro-course is made up of challenges.
- Each challenge is made up of steps.
- Each step has a type: see all the types in [`./courseSteps.ts`](./courseSteps.ts)

## Important Aspects to Follow
- You don't have to follow the exact structure of the course outline given. It's important that you craft the course in a way that engages learners and help them efficiently acquire new skills.
- It's crucial to include an 'aha!' moment in the first challenge and make its hook powerful, because the learner will decide based on the first challenge if they want to subscribe for the micro-course.
- The learner should encounter a practical and hands-on step in the micro-course as soon as possible. Build their mindset during the course, connecting it to practical experiences, not in a separate challenge focusing only on the mindset.
- Include in the micro-course description the transformation the learner will realise by the end. Include what the learner will be able to do after completing the micro-course.
- When creating quiz steps, vary which answer is the correct one (not always the second one).

---

## Narrative Structure

**Start with a relatable problem, not a lesson.** Use comics or a story to show someone's frustration before any teaching begins. Learners should feel "that's me" before they learn anything.

**Transformation hook in the first video/intro.** Frame the course as identity change: "From X to Y." Not "You'll learn A, B, C" but "You'll become someone who..." Example: "From 'I can't build apps' to 'I just published my first one.'"

**One running example throughout.** Use a single persona building a single project across all challenges. Don't switch examples mid-course. Consistency makes abstract concepts tangible and helps learners follow along.

**Challenge openers set emotional tone.** The first step of each challenge should excite and preview the transformation, not just list what's coming. Acknowledge progress ("You're no longer a beginner") and build anticipation for what they'll be able to do.

**Final reflection is about the journey, not the last task.** Ask "What surprised you? What do you want to build next?" not "Did you complete the steps?" Send learners forward with momentum.

---

## Teaching Approach

**Teach prerequisites thinking.** Before introducing a feature, model the question: "What does this feature need to work properly?" This is a meta-skill learners should internalise. Example: "Before adding voting, we need authentication so the app knows who's voting."

**Specific test cases after features.** After teaching how to build something, include explicit verification steps. Not "test your feature" but specific actions: "1. Try voting without logging in. 2. Log in and vote. 3. Try voting again on the same book." This builds testing habits.

**Cross-reference at the moment of relevance.** Link to other courses when the learner might want to go deeper, not in a list at the end. Example: "Curious about databases? Our Basics of Software course explains this in friendly terms."

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

---

### 3. Built-In Practice

**Requirement:** The challenge includes multiple moments where the learner does something, not just watches or reads.

**Acceptable practice formats:**
- "Pause and try this" practical micro-exercise
- Guided replication of a demonstrated technique
- Reflection question that requires writing a response
- Quiz questions

**Practice must:**
- Appear before the challenge ends
- Take under 3 minutes to complete
- Directly reinforce the single concept being taught
- Multiple quiz questions are included in a challenge

**Fail indicators:**
- Practice requires significant time investment
- Practice tests something not explicitly taught in this challenge

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

**Fail indicators:**
- Challenge references concepts not yet introduced
- Challenge repeats content from earlier challenges without building on it

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
- [ ] Ends with specific action learner can take in 5 minutes
- [ ] Includes practice that takes under 3 minutes
- [ ] Total completion time under 15 minutes (ideally under 10)
- [ ] No unexplained jargon
- [ ] Only assumes knowledge from previous challenges
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

## Output Format for Generated Micro-course

When generating a micro-course, structure it as the examples. Make sure to use diverse step types in each challenge.

### Example Micro-courses

- `../../../little-parrot/content/course/vibe-coding-product-management-00.yaml`
- `../../../little-parrot/content/course/vibe-coding-tech-00.yaml`
- `../../../little-parrot/content/course/lovable-intro-00.yaml`
- `../../../little-parrot/content/course/vibe-coding-debugging-00.yaml`

### Save Micro-course
Save the generated micro-course to this folder: `../../../little-parrot/content/course`