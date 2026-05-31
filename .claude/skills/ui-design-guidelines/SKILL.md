---
name: ui-design-guidelines
description: Apply these guidelines to make generated UI and email templates have taste, be user-friendly, and look good. Use when designing or reviewing email templates, web components, pages, or any visual interface. Triggers include "design a UI", "build a component", "make this look better", "design an email template", or any task that produces or critiques visual layout.
---

# UI Design Guidelines

Guidelines to ensure generated UI has taste, is user-friendly, and looks good.

---

## 1. Visual Hierarchy

**The most important element should be the most obvious.** Establish hierarchy through:

- **Size** — Larger elements draw attention first
- **Weight** — Bold for titles, regular for body text
- **Colour** — High contrast for primary content/actions, muted for secondary
- **Space** — More whitespace around important elements isolates and elevates them

When designing any component, ask: "What should users see first, second, third?" Then make that order visually obvious.

---

## 2. Colour Restraint

**Use 3-5 colours maximum.** More creates visual noise.

Pick:
- 1 primary brand colour
- 1-2 accent colours (for states, highlights, or semantic meaning)
- 2-3 neutrals (white, near-black, greys)

**Colour should carry meaning.** Use colour consistently to represent concepts (e.g., green for success, red for errors, a specific colour for user-generated content vs system content). Users learn these patterns unconsciously.

**Never use colour as the only indicator.** Pair with icons, text, or patterns for accessibility.

---

## 3. Typography

**Use a maximum of 2 font families.** One for headings, one for body. More creates chaos and slows page load.

- **Line height**: 1.4-1.6 for body text (use `leading-relaxed` or `leading-6` in Tailwind)
- **Line length**: Limit to 65-75 characters for readability
- **Hierarchy through weight and size**, not through adding more fonts
- **Never use decorative fonts for body text** or fonts smaller than 14px

---

## 4. Spacing and Alignment

**Consistent spacing creates visual rhythm.** Use a spacing scale (4, 8, 12, 16, 24, 32, 48px) rather than arbitrary values. In Tailwind, prefer the default scale (`p-2`, `p-4`, `gap-6`) over arbitrary values (`p-[13px]`).

**Proximity principle**: Elements that are related should be closer together. Elements that are unrelated should have more space between them.

**Everything should align to something.** If elements feel scattered, the alignment grid is broken. Use consistent padding, align text baselines, and ensure elements share edges where appropriate.

---

## 5. Removal Over Addition

**When something looks off, try removing elements before adding new ones.**

Common things to remove:
- Redundant labels (if hierarchy is clear, you don't need "Title:" above a title)
- Decorative elements that don't serve a purpose
- Borders and dividers when whitespace can do the job
- Excessive icons or badges

Good design is often defined by what you choose not to include.

---

## 6. Affordances and Feedback

**Interactive elements must look interactive.** Buttons should look clickable (background colour, border, shadow). Text links should be underlined or coloured. Inputs should have visible borders or backgrounds.

**Every action needs feedback:**
- Hover states for clickable elements
- Loading states for async operations
- Success/error states after form submissions
- Disabled states for unavailable actions

Users should never wonder "did that work?"

---

## 7. Scannability

**Users scan, they don't read.** Structure content for scanning:

- Put the most important information first (inverted pyramid)
- Use clear headings and subheadings
- Break up walls of text with whitespace, bullets, or numbered lists
- Bold key terms and phrases
- Keep paragraphs short (3-4 sentences max)

Test: Can a user understand the gist by looking at the page for 3 seconds?

---

## 8. Consistency

**Same things should look and behave the same way throughout the interface.**

- Buttons should all use the same style system
- Spacing between similar elements should be identical
- Headings at the same level should use the same typography
- Interactive patterns (hover, focus, click) should be predictable

Inconsistency makes users think. Consistency lets them focus on their task.

---

## 9. The Squint Test

**Squint at your design until it's blurry.** You should still be able to see:
- The visual hierarchy (what's most prominent)
- Distinct regions and groupings
- Where the primary action is

If it looks like uniform grey mush, the hierarchy needs work.

---

## 10. Semantic HTML and Accessibility

**Use the right HTML element for the job:**
- `<button>` for actions, `<a>` for navigation
- `<h1>` through `<h6>` in order (never skip levels)
- `<main>`, `<nav>`, `<header>`, `<footer>` for landmarks
- `<ul>`/`<ol>` for lists

**Accessibility basics:**
- Alt text for images (unless purely decorative)
- Sufficient colour contrast (4.5:1 for normal text, 3:1 for large text)
- Focus states for keyboard navigation
- ARIA labels where semantic HTML isn't enough

---

## Quick Checklist

Before considering a UI complete, verify:

- [ ] Visual hierarchy is clear (squint test passes)
- [ ] Colour palette is 3-5 colours max
- [ ] Typography uses at most 2 font families
- [ ] Spacing is consistent and uses a scale
- [ ] Interactive elements have hover/focus/active states
- [ ] Actions provide feedback (loading, success, error)
- [ ] Content is scannable (headings, short paragraphs, lists)
- [ ] No redundant or decorative-only elements
- [ ] Semantic HTML elements are used correctly
- [ ] Colour contrast is sufficient for accessibility

---

## References

These guidelines are distilled from:
- Gestalt principles of visual perception (proximity, similarity, hierarchy)
- Typography best practices (Butterick's Practical Typography)
- Refactoring UI by Adam Wathan and Steve Schoger
- Nielsen Norman Group usability research
- WCAG accessibility guidelines
