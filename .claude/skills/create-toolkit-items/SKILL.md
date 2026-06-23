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
- **Be self-contained.** The learner shouldn't need to read the full course to use the toolkit item. Include enough context that it works on its own.
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

**Follow the productkind tone.** Warm, encouraging, mentor-like. British English. No em dashes. No AI buzzwords.

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

**Every toolkit mention must be a clickable link.** Don't write "check the toolkit for the setup guide" without linking to the specific item. The learner shouldn't have to go find it.

**Weave toolkit references into the text naturally.** Don't use a "**Toolkit:**" label. Instead, write it as part of the sentence: "The [Domain and Email Setup Guide](URL) in the Toolkit walks you through every click." This reads better and doesn't break the flow of the content.

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

**How interactive items work:**
- Use `.mdx` file extension instead of `.md`
- The available components depend on what's registered in the app's MDX component registry
- The interactive elements should directly support the learning goals of the toolkit item (e.g., a visual component guide with live examples of each component)

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
- [ ] Every command, prompt, and step has a plain note on what it does or when to use it (no bare lists)
- [ ] Example prompts model good prompting: specific, with real design/product vocabulary and the look, behaviour, and edge cases
- [ ] All examples are realistic (no placeholder content)
- [ ] Descriptions and "When to use it" lines don't repeat the same information
- [ ] Code examples match their descriptions
- [ ] No duplication with other toolkit items or course content
- [ ] External tool instructions are accurate and current
- [ ] The name says what it helps the learner do, not its type, and the `type` field is set in the frontmatter
- [ ] Any images use real served asset paths (no broken placeholders)
- [ ] It's assigned to the right challenge
- [ ] The file name follows the `toolkit-[kebab-case-name].md` convention
- [ ] The course YAML references it at the appropriate step
