---
name: little-parrot-email
description: Apply this skill when creating HTML emails for Little Parrot. Use when creating transactional emails (welcome, payment, cancellation), marketing emails (updates, promotions, raffle announcements), or discount reminder emails. Triggers include requests to "create an email", "write an email", "email template", or any Little Parrot email task.
---

# Little Parrot Email Creation

Apply this skill when creating HTML emails for Little Parrot. Use alongside `/productkind-tone` and `/little-parrot-ai-skill-gap` for full context.

## Reference Emails

Always read a recent email from `little-parrot/assets/emails/` before creating a new one, to match the current HTML structure, CSS, and footer content.

## Technical Requirements

### Email Client Compatibility
- **Never use flexbox** (`display: flex`). Email clients (Gmail, Outlook) don't support it. Use `<table>` layouts instead for side-by-side content.
- **Inline styles on table cells**. Don't rely on CSS classes for table-based layouts since some clients strip `<style>` blocks.
- **Self-hosted images only**. Don't reference third-party icon services. Social icons are hosted at `https://littleparrot.app/icon-linkedin.png` and `https://littleparrot.app/icon-instagram.png`.

### Standard Structure
Every email follows this structure:
1. **Header**: Logo (linked to littleparrot.app) with optional subtitle in Space Mono
2. **Content**: Greeting, body, optional highlight box, optional CTA
3. **Sign-off**: Centred text with sign-off from "Kinga, Tamas & Little Parrot" / "Little Parrot by productkind"
4. **Footer**: Social icons (LinkedIn + Instagram), context line ("You're receiving this because..."), littleparrot.app link, unsubscribe link

### URL Conventions
- Add `?ref=<email-name>-email` to all littleparrot.app links for tracking
- Add `&auth=login` to links that require authentication (Nest pages, Toolkit, courses)
- Use descriptive ref values: `reg-welcome-email`, `sub-cancelled-email`, `ai-summit-raffle-email`

### Footer Social Icons
Always include LinkedIn and Instagram icons in the footer:
```html
<p style="margin-bottom: 12px;">
  <a href="https://www.linkedin.com/company/productkind/" style="text-decoration: none; margin: 0 8px;">
    <img src="https://littleparrot.app/icon-linkedin.png" width="24" height="24" alt="LinkedIn" style="vertical-align: middle; border: 0;" />
  </a>
  <a href="https://www.instagram.com/by_productkind/" style="text-decoration: none; margin: 0 8px;">
    <img src="https://littleparrot.app/icon-instagram.png" width="24" height="24" alt="Instagram" style="vertical-align: middle; border: 0;" />
  </a>
</p>
```

## Design Rules

### Visual Hierarchy
- **One primary CTA button per email**. Never have competing buttons. If there's a secondary action, use an inline text link.
- **One highlight box maximum**. Don't stack two gradient-background boxes. If there are two important things, put the most important one in the highlight box and the other in plain text.
- **Deadlines as inline bold text**, not styled like buttons or code blocks. Styled deadlines look like clickable elements and confuse readers.

### Scannable Value Lists
- When listing what the user gets, use lists with clear value propositions
- Separate items to increase perceived value (e.g. "All courses" and "Toolkits" as separate lines, not "All courses and toolkits")
- Bold label for skimming, plain description for detail
- Keep descriptions to one sentence

### Key Links to Include
When relevant, always link to:
- **Toolkit**: `https://littleparrot.app/nest/toolkit/`
- **Discord community**: use the current invite link (check recent emails)
- **Pro-questions channel**: `https://discord.com/channels/1475746744309518480/1478631753882013777`
- **Pricing/subscribe**: `https://littleparrot.app/pricing/`

## Tone and Copy

### Voice
- Warm and direct, like a message from a friend who runs a small company
- British English throughout (organise, colour, behaviour)
- Sign off as "Kinga, Tamas & Little Parrot" with a 💛

### Do
- Lead with user value, not about Little Parrot
- Frame the community as "direct access to us" with credentials: Kinga (Lead Product Manager) and Tamas (Principal Software Engineer)
- Mention the mission ("close the gender gap in AI") when introducing Little Parrot to new or lapsed users
- Confirm courses are "practical and designed to fit into a busy day"
- Use "What you might not know yet" or "Here's what's included" framing for discovery
- Keep the door open in cancellation/end emails without guilt-tripping

### Don't
- Be patronising ("That took courage", "Amazing!", "Great job!")
- Use language that triggers doubt about a purchase ("big commitment", "big investment")
- Make claims that aren't true ("each course picks up where the last one left off")
- Start with deflating framing ("Even if you don't win")
- Duplicate the same information across paragraphs
- Use "just" before instructions ("just click", "just reply")
- Describe events or conferences in jargon that alienates non-technical women ("developers and AI practitioners"). Frame around what THEY get out of it.
- Add a subscription pitch in emails to paid subscribers. They already pay.

### Conversion Emails
- "No pressure" tone. Encouraging, not pushy.
- Show concrete value (what they get) rather than abstract benefits
- For discount reminders: state the deadline, show the value, make it easy to act
- For raffle/giveaway: lead with the prize, make mechanics clear, keep subscription mention as natural context

## Audience Context

The audience is non-technical women with business ideas who want to build. Many are busy (jobs, families). They may feel intimidated by technical content. Emails should make them feel welcomed, capable, and supported.
