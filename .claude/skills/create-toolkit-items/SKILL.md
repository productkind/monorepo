---
name: create-toolkit-items
description: Generate practical, reusable toolkit items from course content. Use when creating templates, checklists, prompt libraries, setup guides, or question banks that help learners put into practice what they learned in a course.
---

## Creating Toolkit Items from Course Content

Toolkit items are practical resources that live alongside a course. They help learners apply what they learned by giving them something they can reference, copy, or follow step by step while they're building.

### What makes a good toolkit item

A good toolkit item is something the learner opens *while they're working*, not something they read once and forget. It should:

- **Be immediately usable.** The learner should be able to copy, paste, or tick off items without needing to re-read the course first.
- **Solve a real moment.** Each item should map to a specific situation: "I'm about to publish", "I need to add a feature", "I'm talking to a user for the first time."
- **Use realistic examples.** Never use placeholder content like "lorem ipsum", "Feature 1", or "Select a fruit." Use examples the learner would actually encounter in a product (book genres, city names, real confirmation messages).
- **Be self-contained, and assume no course context.** A learner may open it straight from the Toolkit menu without having taken the course. Include enough context that it works on its own: name the tool, the input, and the output so the opening makes sense cold. (See "Open with the payoff" under Writing principles.)
- **Be concise.** Respect the learner's time. Lead with the actionable content, not lengthy explanations.

### Types of toolkit items

The database tags each toolkit item with a **type**, set in the frontmatter (see File structure below). There are five, told apart by how the learner uses them:

| Type | How the learner uses it | When to create it | Example |
|------|-------------------------|-------------------|---------|
| **Template** | Fill in with their own details | The course teaches a structure or formula the learner reuses | First Prompt Template, Problem Statement Template |
| **Guide** | Follow the steps to set something up | The course walks through configuring a tool step by step | Builder's Workspace Setup, Connect Your App to GitHub |
| **Prompt library** | Paste into their AI app builder | The course teaches prompting patterns with copy-paste prompts | Asking Copilot for Changes, Prompts for Common Features |
| **Checklist** | Work through before or during a task | The course covers a multi-step process the learner repeats | The Credit-Free Edit Loop, Pre-Publish Checklist |
| **Cheat sheet** | Look up when they need it | The course introduces commands, vocabulary, or decisions the learner looks up later | Run Your App on Your Computer, Software Vocabulary Cheat Sheet |

**Name the item for what it helps the learner do, not its type.** The type is a separate field, so the name doesn't need to repeat it: "Builder's Workspace Setup" beats "Local Setup Guide", and "Run Your App on Your Computer" beats "Run-It-Locally Cheat Sheet".

**Capitalise every toolkit title in title case.** Every significant word starts with a capital letter; keep short joining words (a, an, the, and, or, of, to, in, on, for, with, into) lowercase unless they are the first word. So "Troubleshooting Your Shortcuts" and "Brain Dump into a Single List", not "Troubleshooting your shortcuts" or "Brain Dump into a single list". This matches the rest of the toolkit library (for example "Turn Your MVP into a Build Prompt" and "What to Check in an AI Draft Before You Send It"). The title in the `## heading` and the name recorded elsewhere (course links, `toolkit-links.md`) must match exactly.

(An **interactive** item, built with live components, is a format choice rather than a type, use `.mdx` and see Interactive toolkit items below. It still carries one of the five types above.)

### How to identify toolkit items from a course

Read through the full course and look for:

1. **Templates or formulas** the learner fills in (problem statements, prompt structures, knowledge panels). These become templates.
2. **Multi-step processes** the learner will repeat for every app they build (publishing steps, legal page setup, SEO setup). These become checklists.
3. **Prompts shown in the course** that the learner will want to copy later. Group related ones into a prompt library.
4. **Vocabulary or concepts** introduced across multiple challenges. Collect them into a cheat sheet.
5. **Advice on talking to users or gathering feedback.** Structure this into scripts or question banks.
6. **Step-by-step tool configurations** (setting up analytics, connecting a domain). These become guides.

### Assigning toolkit items to challenges

Each toolkit item belongs to a specific challenge. Choose the challenge where the learner finishes learning the content the toolkit item covers.

- If the toolkit item draws from a single challenge, assign it to that challenge.
- If it draws from multiple challenges, assign it to the last one that contributes content.
- If it spans the entire course (like a vocabulary cheat sheet), assign it to the final challenge.

### Writing principles

**Follow the productkind tone.** Warm, encouraging, mentor-like. Apply the **language-rules** skill in full, and invoke it if it is not already loaded. It is the single source for banned words and phrases, British English, em dashes and punctuation, AI dressing, and how we frame AI.

**Open with the payoff, and make it work cold.** The first sentence says what the learner *gets*, not what the item is or which challenge it belongs to: "The Brain Dump is an iPhone Shortcut that turns your mental load into organised lists" beats "Every step to build the Brain Dump, in order." Then, in the same opening, name the tool, the input (you talk), and the output (sorted checklist notes), so someone who found the item cold in the Toolkit menu understands it before any how-to.

**Name prerequisites up front.** If the item needs a particular device, OS version, plan tier, or tool installed, say so in one short line right after the opening, so nobody follows a guide their setup can't run.

**Write for a first-timer: name exact actions and where settings live.** Assume the learner may be meeting the tool for the first time. Never use vague internal groupings ("the category block", "the second block"); name the actual actions or buttons ("Get Dictionary Value, Combine Text, Append Checklist Item") and how to reach a setting ("open the Dictate Text action, tap the blue arrow"). When a fix involves ordering or nesting, say which exact action goes where.

**Give the exact text, not a description of it.** When a step means adding or changing wording (a prompt line, a field value, a setting), show the literal text in a copy-paste code block rather than describing it. "Add this line: `keep the details that make each item make sense on its own`" beats "make sure your prompt says to keep the details."

**Use full sentences, and full names on first mention.** The first time an app, action, or feature appears, name it in full: "Open the **Notes** app", not "Open **Notes**"; "add the **Dictate Text** action", not "add **Dictate Text**". Once the learner has met the term, the shorthand is fine ("back in Notes", "the Dictate Text block"). This keeps a first-timer oriented without labouring every later reference.

**Descriptions and "When to use it" should not repeat each other.** The description says what the thing is. "When to use it" says when the learner would reach for it. If they overlap, merge them or rewrite so each adds new information.

**Code examples must be realistic.** If showing a Select dropdown, use real options like book genres or categories, not "Apple, Banana, Cherry." If showing a dialog, show a real form the learner would build, not "This is a test dialog."

**Explain every entry, never just list it.** A toolkit is opened after the course, as a reference, so a bare list teaches nothing. Put an informative one-line explanation beside every command (what it does), every prompt (when to reach for it), and every step (why it's useful). A cheat sheet of terminal commands with no notes, or a prompt library that just dumps prompts, is useless to a learner who can't yet read them on sight. (See "Run Your App on Your Computer", which explains `mkdir`, `cd`, `git clone`, and `npm`; and "Asking Copilot for Changes", which gives each prompt a "when to use" lead-in.)

**Model specificity in example prompts.** In a prompt library, write each prompt the way a strong prompt should be written, because specific, technical prompts get far better results when vibe coding, and the examples teach by imitation. Go beyond *what* + *where* + *example* to name the **look** (size, colour, spacing, and which existing style to match), the **behaviour** (what it does and when), and the **edge cases** (empty list, single item, long text). Use real design and product vocabulary: empty state, primary action, secondary text, hover state, subtitle, component. A vague example teaches a vague habit.

**Use screenshots only where they aid understanding, and only real ones.** For step-by-step guides, a screenshot at the decisive moment helps; for command or prompt references, the words usually carry it. When you do use an image, use the `.mdx` format and embed it by its real served path, reuse the course's existing screenshots at the same `/courses/<course-id>/...` paths where they fit. Never invent a placeholder image URL that would render broken; if no asset exists, keep the step text-only or note the exact shot to capture.

**Interactive examples must match their descriptions.** If the description says "switching between grid view and list view" but the code shows bold/italic/underline toggles, one of them needs to change. Always check for this mismatch.

**Fact-check any claims about external tools or processes.** If you describe how Google Search Console, Stripe, or any third-party service works, verify the steps are accurate. Don't guess at UI locations or workflows. Toolkit items are reference material learners follow step by step, so incorrect instructions are worse here than anywhere else. Use WebSearch or WebFetch to verify before writing.

**Categorise lists based on the learner's situation, not the content's nature.** When a toolkit item contains a list of options (e.g., directories, tools, resources), organise by the learner's stage or context ("For early-stage and bootstrapped products") rather than by what the content is ("AI directories", "Launch platforms"). The learner's situation should drive the structure, with the most relevant category first.

**Combine related toolkit items that serve the same moment.** If two toolkit items would be opened at the same time (e.g., a break-even calculator and a cashflow tracker both serve "I'm looking at my business numbers"), combine them into one item with multiple sections or tabs. Fewer, more complete toolkit items are better than many fragmented ones.

### Avoiding duplication

Before writing a toolkit item, check:

1. **Does another toolkit item in the same course already cover this?** If so, expand that one instead of creating a new one.
2. **Does a toolkit item in another course cover similar ground?** If so, make sure they're complementary, not overlapping. The more basic version should exist in the earlier course. The advanced version should reference the basic one rather than repeating it.
3. **Does the course itself already contain a checklist or summary that would become the toolkit item?** If so, the toolkit item should add value beyond what's in the course (more detail, links to tools, copy-paste prompts). If the course step serves the learner well already, reference the toolkit item from the course step rather than replacing it.

When two toolkit items serve different stages of the learner's journey (e.g., a beginner feedback script vs. an advanced question bank), the more advanced one should reference the simpler one and explain when to use which.

### Linking toolkit items in the course

After creating toolkit items, add references to them at the appropriate points in the course YAML:

- **Challenge-end subDescription** is the most common place. The learner just finished learning the content and the toolkit reference tells them where to find the practical resource.
- **Mid-challenge text steps** work when the toolkit item is directly relevant to what the learner is about to do (e.g., linking to a checklist right before they click Publish).
- **Course-end subDescription** works for toolkit items that span the full course (e.g., a vocabulary cheat sheet).

The linking rules themselves live in the course-design rubric (`.claude/skills/outline-to-micro-course/references/course-design-rubric.md`, Teaching Approach): every toolkit mention is a clickable link, woven into the sentence naturally, and never a fabricated URL. Apply them from there.

### File naming convention

Save each toolkit item as a separate file in the course folder:

```
toolkit-[kebab-case-name].md
```

For interactive toolkit items that include live components, use `.mdx` instead of `.md`:

```
toolkit-[kebab-case-name].mdx
```

Examples:
- `toolkit-first-prompt-template.md`
- `toolkit-pre-publish-checklist.md`
- `toolkit-software-vocabulary-cheat-sheet.md`
- `toolkit-visual-component-guide.mdx` (interactive)

### Interactive toolkit items

Some toolkit items are more useful when the learner can interact with them directly, rather than just reading about them. These use the `.mdx` format, which allows embedding live components inside the markdown.

**When to make a toolkit item interactive:**
- When seeing or trying the thing is more valuable than reading a description of it (e.g., seeing what a Button or Dialog looks like by clicking on it)
- When the learner needs to practise a skill in a safe environment before applying it to their own product
- When a static reference would be incomplete without the interactive element
- When a troubleshooting or lookup item would otherwise be a wall of text, an `Accordion` lets the learner scan the entries and expand only the one they need (see "Troubleshooting and lookup items" below)

**How interactive items work:**
- Use `.mdx` file extension instead of `.md`
- The available components depend on what's registered in the app's MDX component registry
- The interactive elements should directly support the learning goals of the toolkit item (e.g., a visual component guide with live examples of each component)

### Troubleshooting and lookup items

Troubleshooting sheets, "when do I use X" references, and other lookup items are read differently from guides: the learner arrives with a symptom and needs to find the matching fix fast. Two rules keep them usable:

**Lead every entry with the observable symptom, never the cause.** The heading (or accordion trigger) describes what the learner *sees or experiences*, so they can recognise their situation at a glance. "A category comes out empty even though you spoke items for it" beats "Get Dictionary Value is reading the wrong thing", which names an internal cause the learner has no way to connect to. Put the cause and the fix in the body: plain-language why first, then the concrete steps.

**Group entries by the area the learner recognises, not by an internal phase.** File each entry under the feature or moment it belongs to (the shortcut, sharing, triggers), and make sure it sits where the symptom actually occurs. Splitting by build-time vs run-time tends to miscategorise, because most "building" symptoms only surface when the learner runs the thing.

**Prefer an `Accordion` when the entries would stack into a wall of text.** Make the item `.mdx`, group the entries under section headings, and give each an `AccordionItem` (symptom as the `AccordionTrigger`, fix as the `AccordionContent`). Authoring notes that avoid broken MDX: leave a blank line above and below the markdown inside `AccordionContent`, keep that content unindented (four-space indents become code blocks), and confirm the file compiles before finishing (the platform compiles MDX with `@mdx-js/mdx` plus `remark-gfm`).

### File structure

Each toolkit item starts with the challenge it belongs to, and a heading:

```markdown
---
challenge: "[Challenge Number] - [Challenge Title]"
type: "[Template | Guide | Prompt library | Checklist | Cheat sheet]"
---
## [Toolkit Item Name]

[Brief description of what this toolkit item is and when to use it. 1-2 sentences.]

### [First section]
...
```

For items that reference another toolkit item in a different course, use the full URL:

```markdown
If you're [doing X] for the first time, start with the [Simpler Toolkit Item](URL). Come back here when you're ready to go deeper.
```

### Checklist before finalising a toolkit item

- [ ] The learner can use it without re-reading the course
- [ ] The opening sentence says what the learner gets, and the intro makes sense to someone who opens it cold from the Toolkit menu
- [ ] Any prerequisites (device, OS, plan, tools) are named up front
- [ ] Steps name the exact actions and where each setting lives (no vague groupings), and give literal copy-paste text wherever wording changes
- [ ] Every command, prompt, and step has a plain note on what it does or when to use it (no bare lists)
- [ ] For troubleshooting/lookup items: each entry's heading is the observable symptom, entries are grouped by area, and any interactive `.mdx` compiles cleanly
- [ ] Example prompts model good prompting: specific, with real design/product vocabulary and the look, behaviour, and edge cases
- [ ] All examples are realistic (no placeholder content)
- [ ] Descriptions and "When to use it" lines don't repeat the same information
- [ ] Code examples match their descriptions
- [ ] No duplication with other toolkit items or course content
- [ ] External tool instructions are accurate and current
- [ ] The name says what it helps the learner do, not its type, and the `type` field is set in the frontmatter
- [ ] The title is in title case (every significant word capitalised), matching any references to it in the course and `toolkit-links.md`
- [ ] Any images use real served asset paths (no broken placeholders)
- [ ] It's assigned to the right challenge
- [ ] The file name follows the `toolkit-[kebab-case-name].md` convention
- [ ] The course YAML references it at the appropriate step

## Evaluation loop (run this every time, before showing the user)

A drafted toolkit item is never returned to the user until an independent critic has gated its language. Self-review misses what fresh eyes catch, so the writer and the judge must be different.

1. **Draft** the toolkit item(s) following this skill, productkind-tone, and language-rules, and run the finalising checklist above.
2. **Critique.** Spawn the `tone-of-voice-critic` agent (Agent tool) and pass it the drafted item's path (or the text) and one line on what it is (e.g. "a toolkit item: an iPhone Shortcut setup guide"). Several short items can go in one critic call; say which is which. It judges words only: banned language, British English, and AI dressing. Do not show the draft to the user yet.
3. **Read the verdict:**
   - **PASS** → show the user the final item, with a short note on what the critic checked.
   - **NEEDS REVISION** → apply the critic's revision brief, then re-run the critic on the new draft. Repeat, up to **3 rounds**.
4. **After 3 rounds**, if issues remain, show the best draft and name the unresolved items honestly. Never hide them or ship around them.

The critic judges language only; this skill owns structure, format, and the checklist above.
