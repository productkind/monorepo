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

| Type | When to create it | Example |
|------|-------------------|---------|
| **Template** | When the course teaches a structure or formula the learner will reuse | First Prompt Template, Project Knowledge Starter Template |
| **Checklist** | When the course covers a multi-step process the learner will repeat | Pre-Publish Checklist, Production-Ready Launch Checklist |
| **Prompt Library** | When the course teaches prompting patterns with copy-paste prompts | Prompts for Common Features, Legal Pages Prompt Library |
| **Setup Guide** | When the course walks through configuring a tool step by step | Meta Tags and Favicon Setup Guide |
| **Reference / Cheat Sheet** | When the course introduces vocabulary or concepts the learner will look up later | Software Vocabulary Cheat Sheet, Visual Component Guide |
| **Question Bank / Script** | When the course teaches how to gather information from users | First User Feedback Script, User Feedback Question Bank |
| **Interactive / Hands-on** | When the learner benefits from trying, exploring, or interacting with something directly inside the toolkit item | Visual Component Guide (interactive shadcn components the learner can click and explore) |

### How to identify toolkit items from a course

Read through the full course and look for:

1. **Templates or formulas** the learner fills in (problem statements, prompt structures, knowledge panels). These become templates.
2. **Multi-step processes** the learner will repeat for every app they build (publishing steps, legal page setup, SEO setup). These become checklists.
3. **Prompts shown in the course** that the learner will want to copy later. Group related ones into a prompt library.
4. **Vocabulary or concepts** introduced across multiple challenges. Collect them into a cheat sheet.
5. **Advice on talking to users or gathering feedback.** Structure this into scripts or question banks.
6. **Step-by-step tool configurations** (setting up analytics, connecting a domain). These become setup guides.

### Assigning toolkit items to challenges

Each toolkit item belongs to a specific challenge. Choose the challenge where the learner finishes learning the content the toolkit item covers.

- If the toolkit item draws from a single challenge, assign it to that challenge.
- If it draws from multiple challenges, assign it to the last one that contributes content.
- If it spans the entire course (like a vocabulary cheat sheet), assign it to the final challenge.

### Writing principles

**Follow the productkind tone.** Warm, encouraging, mentor-like. British English. No em dashes. No AI buzzwords.

**Descriptions and "When to use it" should not repeat each other.** The description says what the thing is. "When to use it" says when the learner would reach for it. If they overlap, merge them or rewrite so each adds new information.

**Code examples must be realistic.** If showing a Select dropdown, use real options like book genres or categories, not "Apple, Banana, Cherry." If showing a dialog, show a real form the learner would build, not "This is a test dialog."

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
- [ ] All examples are realistic (no placeholder content)
- [ ] Descriptions and "When to use it" lines don't repeat the same information
- [ ] Code examples match their descriptions
- [ ] No duplication with other toolkit items or course content
- [ ] External tool instructions are accurate and current
- [ ] It's assigned to the right challenge
- [ ] The file name follows the `toolkit-[kebab-case-name].md` convention
- [ ] The course YAML references it at the appropriate step
