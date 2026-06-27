---
name: little-parrot-email
description: Apply this skill when creating HTML emails for Little Parrot. Use when creating transactional emails (welcome, payment, cancellation), marketing emails (updates, promotions, raffle announcements), or discount reminder emails. Triggers include requests to "create an email", "write an email", "email template", or any Little Parrot email task.
---

# Little Parrot Email Creation

Apply this skill when creating HTML emails for Little Parrot. Use alongside `/productkind-tone` and `/little-parrot-ai-skill-gap` for full context.

## Evaluation Loop (run this every time)

A drafted email is never returned to the user until an independent critic has gated it. Self-review misses what fresh eyes catch, so the writer and the judge must be different.

1. **Draft** the email following this skill, productkind-tone, and a recent reference email from `little-parrot/assets/emails/`.
2. **Critique.** Spawn the `email-critic` agent (Agent tool) and pass it the full email (the HTML), plus the subject line and preheader text, saying what kind of email it is (welcome, payment, cancellation, update, promotion, raffle, discount reminder, certificate, etc.). Do not show the draft to the user yet.
3. **Read the verdict:**
   - **PASS** → show the user the final email, with a short note on what the critic checked.
   - **NEEDS REVISION** → apply the critic's revision brief, then re-run the critic on the new draft. Repeat, up to **3 rounds**.
4. **After 3 rounds**, if issues remain, show the best draft and name the unresolved items honestly, including anything from the critic's "To verify" list. Never hide them or ship around them.

What the user sees: the **final email plus a short summary** of what the critic flagged and how it was resolved, and any facts they still need to verify — not every round, unless they ask to see the drafts.

## Reference Emails

Always read a recent email from `little-parrot/assets/emails/` before creating a new one, to match the current HTML structure, CSS, and footer content.

## Inbox Presentation (what gets the email opened)

Body design can't save an email no one opens. Three things drive the open, none of them in the body. Set all three deliberately for every send.

### Subject line
- **30 to 50 characters, around 6 to 7 words.** Gmail's mobile app shows only ~30 characters, so put the point in the first ~30 and let the rest be a bonus.
- **Clarity over curiosity.** This audience is busy and wary of being tricked. Say what's inside plainly. No curiosity-gap teasers, no clickbait.
- **Personalise with `{{first_name}}` only where it feels natural** (welcome, certificate, a personal nudge), not bolted onto every promo.
- **Avoid spam triggers:** no ALL CAPS, no `!!!` / `$$$`, no "FREE", "act now", "guaranteed".
- **Emoji: default to none.** Evidence on opens is contradictory, and emoji measurably raise unsubscribe and spam-complaint rates, which hurt deliverability for every future send. At most one purposeful emoji, never an all-emoji line. (The 💛 lives in the sign-off, not the subject.)

### Preheader / preview text
- **Always set it.** If you don't, clients pull the first text they find, usually "View in browser", the unsubscribe line, or an image's alt text. Add a hidden preheader block at the very top of the body.
- **Core message in the first ~40 characters; keep the whole thing under ~90.** Outlook shows as little as ~35.
- **Complement the subject, don't repeat it.** Expand it, add warmth, or say what the reader gets.
- **Stop body text leaking into the preview** by following the preheader with a hidden spacer (e.g. a run of `&nbsp;&zwnj;`).

### Sender name
- **Keep it stable and recognisable.** "Little Parrot" for system / transactional mail, "Kinga at Little Parrot" for warm relationship and marketing sends. Never `noreply@` or `info@`.

### A note on measuring opens
Apple Mail Privacy Protection loads the tracking pixel on delivery whether or not the email is read, so raw open rate is inflated (often by 15 to 35%) and is no longer a trustworthy absolute number. Treat open rate as a rough same-list trend only, and judge whether an email actually worked by **clicks and course progress**. Don't over-engineer subject lines chasing an inflated metric.

## Technical Requirements

### Email Client Compatibility
- **Never use flexbox** (`display: flex`). Email clients (Gmail, Outlook) don't support it. Use `<table>` layouts instead for side-by-side content.
- **Inline styles on table cells**. Don't rely on CSS classes for table-based layouts since some clients strip `<style>` blocks.
- **Self-hosted images only**. Don't reference third-party icon services. Social icons are hosted at `https://littleparrot.app/icon-linkedin.png` and `https://littleparrot.app/icon-instagram.png`.
- **CSS gradients need a solid fallback.** Outlook (Word engine) ignores `linear-gradient`. Wherever a gradient carries meaning (e.g. an accent bar that would otherwise vanish), set a solid `background-color` *first*, then the gradient, so it degrades to a visible colour: `background-color: #fdd825; background: linear-gradient(180deg, #ffb65b, #fdd825, #fbfb00, #8efd23, #00ed70);`

### Accessibility & Dark Mode
These also improve deliverability and comprehension, not just access.
- **Semantic structure.** One `<h1>`, then a logical heading order (don't skip levels or use headings just to size text). Real `<p>` tags for paragraphs, not `<br>` for spacing. `<strong>` / `<em>` for emphasis. Add `role="presentation"` to every layout `<table>` so screen readers read top to bottom.
- **Set `lang="en-GB"` on the `<html>` tag**, and declare the colour scheme in the head: `<meta name="color-scheme" content="light dark">` and `<meta name="supported-color-schemes" content="light dark">`.
- **Alt text on every image.** Descriptive for meaningful images, empty `alt=""` for decorative ones. **Never bake meaningful text into an image** (the logo / wordmark is the only exception): screen readers can't read it, it won't scale on mobile, and it disappears with images off. The email must still make sense with images blocked.
- **Descriptive link text.** The linked words themselves say where they go ("see the GitHub course", not "click here" / "learn more"). Screen readers read links out of context.
- **Never signal meaning by colour alone** (e.g. a red deadline): pair it with a word or bold.
- **Dark mode (critical for the black-on-white sticker look).** Black borders, dark text on transparent PNGs, and drop shadows can vanish or invert oddly when a client flips the email dark.
  - The brand text `#08080a` is already safe, but use `#fffffe` instead of pure `#ffffff` on large backgrounds (the container) so Apple Mail doesn't force-invert it.
  - Give logos / stickers a solid or light-padded background (or a 1 to 2px light stroke) so they stay visible when the background inverts. Don't rely on the drop shadow alone to define the sticker edge.
  - Preview in both light and dark mode before sending.

### Standard Structure
Every email follows this structure:
1. **Header**: Logo (linked to littleparrot.app) with optional subtitle in Space Mono
2. **Content**: Greeting, body, optional highlight box, optional CTA
3. **Sign-off**: Centred text with sign-off from "Kinga, Tamas & Little Parrot" / "Little Parrot by productkind"
4. **Footer**: Social icons (LinkedIn + Instagram), context line ("You're receiving this because..."), littleparrot.app link, unsubscribe link

Set a clear `<title>` that mirrors the subject line (e.g. "Your certificate is ready") — it shows as the browser/preview title.

### URL Conventions
- Add `?ref=<email-name>-email` to all littleparrot.app links for tracking
- Add `&auth=login` to links that require authentication (Nest pages, Toolkit, courses)
- Add `&force_auth=true` for personal pages that must re-authenticate the recipient (e.g. a personal certificate page)
- Use descriptive ref values: `reg-welcome-email`, `sub-cancelled-email`, `ai-summit-raffle-email`. Give a distinct ref to each send of a related pair so they're separable in analytics (e.g. `certificate-email` vs `certificates-email`)

### Brand Styling (design tokens)
The brand is a hard-edged "sticker" look: black outlines, drop shadows, and a rainbow gradient.
- **Fonts**: `Inter` for body; `Space Mono` for section headers (`h2`), the sign-off, and any header subtitle.
- **Colours**: text `#08080a`; muted body text `hsl(245, 3%, 28%)`; container `#ffffff`; page background `#f5f5f5`. Rainbow gradient stops: `#ffb65b, #fdd825, #fbfb00, #8efd23, #00ed70`.
- **Gradient usage**: full saturation for CTA buttons and accent bars; low-opacity tint (append `20` or `10` as a hex-alpha suffix to each stop) for header / highlight-box / sign-off backgrounds. Use `90deg` for horizontal fills, `180deg` for vertical accent bars.
- **Borders & shadow**: 2px solid `#08080a` border with a `4px 4px 2px rgba(8, 8, 9, 0.25)` drop shadow on the container, highlight box, CTA button, feature images, and cards.

### Type Scale (for skimmability)
Keep one reading size, one step up for headers, one step down for fine print. Don't give the greeting its own size.

| Element | Size |
|---|---|
| Greeting + body + highlight box + sign-off | 16px |
| Section headers (`h2`) | 18px |
| Fine-print notes (e.g. "you can find it later…") | 14px |
| Footer | 12px |

Readability rules on top of the scale:
- **Body never below 14px, and 16px on mobile** (bump via media query). Use `rem` so it respects the reader's font settings.
- **Line-height ~1.5** on body, left-aligned (never justified, which creates uneven gaps that hurt readability).
- **Contrast (WCAG AA):** body text at least 4.5:1 against its background; large text (≥18px, or ≥14px bold) and button fills / borders at least 3:1. The muted body grey passes; re-check it whenever text sits on a gradient tint.
- **Text over the rainbow gradient or a tint** must clear contrast against both the lightest and darkest point it covers. Put live text on a solid panel and keep the gradient as a decorative frame; don't run body text straight over it.
- **Footer is fine print:** keep anything essential out of it, and confirm the 12px footer colour still passes 4.5:1.

### Personalisation & Repeating Content
- Merge fields use `{{snake_case}}` (`{{first_name}}`, `{{course_name}}`, `{{certificate_id}}`); the unsubscribe link is `__unsubscribe_url__`.
- For content that repeats per recipient (e.g. one card per completed course), **confirm the email tool's loop syntax before using it** (Liquid `{% for %}` vs Handlebars/Mustache `{{#each}}`). If the syntax is unknown or the audience is small, build one reusable block and duplicate it manually, wrapped in `<!-- start/end -->` comments with numbered fields (`{{course_name_2}}`, `{{certificate_id_2}}`).

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

### Built to be skimmed in nine seconds
People scan emails, they don't read them: average view time is about 9 seconds, most people never read the intro line, and only the top of the email reliably gets seen. Design so the message lands even if that's all they read.
- **Lead with the point, then support it** (inverted pyramid). The first sentence and the primary CTA carry the message; detail goes below.
- **Front-load the first two words** of every header, link, and bullet. Readers see only ~2 words when scanning down a column, so skip generic openers ("Introducing", "Welcome to").
- **One idea per email.** Roughly 50 to 125 words of body copy for a marketing or transactional email; if it needs much more, it's probably two emails.
- **Short, single-idea paragraphs**, with descriptive subheads that form a roadmap when skimmed.
- **Bold only the words that carry meaning** (keep highlighted text under ~30%, or the signal is lost). Bullets for any list of 3+ parallel items.
- **Primary message and CTA in the first screenful.**
- **Keep the HTML under ~102KB** or Gmail clips the email and can hide the unsubscribe link.

### Visual Hierarchy
- **One primary CTA button per email**. Never have competing buttons. If there's a secondary action, use an inline text link.
- **Make the CTA finger-sized and self-describing.** At least 44px tall (build it ~48px with ~14px vertical / ~24px horizontal padding), full-width on mobile, with ~30px of clear space around it. Build it as a bulletproof HTML/CSS button (background + padding on a styled cell or anchor), never a sliced image, so it survives images off. Label it with a 2 to 4 word action that says what happens ("Start the course"), never "Click here", "Submit", or "Learn more".
- **Multiple equal actions → cards, not buttons.** When an email lists several parallel things the reader can act on (e.g. one certificate per completed course), render them as a list of bordered "cards" (one link each), not repeated gradient buttons — repeated buttons compete and break the one-CTA rule. A card = 2px black border + drop shadow + a vertical rainbow gradient accent bar down the left edge (table layout, with the solid `background-color` gradient fallback). Make the whole text block one link.
- **Link the feature image** to the same destination as the primary CTA, so clicking the image works too. Wrap the `<img>` in an anchor with `text-decoration: none`.
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
- Use count words ("several", "a few", "both") when one template serves recipients with different counts. Phrase around the set instead ("a certificate for every course you've finished") so it reads correctly for everyone.
- Describe events or conferences in jargon that alienates non-technical women ("developers and AI practitioners"). Frame around what THEY get out of it.
- Add a subscription pitch in emails to paid subscribers. They already pay.

### Plain language
- **Write for a reading age of about 9** (roughly Grade 6 to 8, Flesch 60 to 70). Plain language never insults a capable reader, and it's functional kindness for an audience that may already feel intimidated. Hemingway is a quick checkpoint.
- **Sentences ~20 words or fewer, one idea each.** Active voice. Cut a first draft by about half.
- **Define a technical term in plain words on first use, in the same sentence** ("an AI agent, a tool that can take actions for you like Claude Code"). Prefer the plain word where one exists. Follow the house terminology: "chat assistant" (ChatGPT, Claude.ai) vs "AI agent" (Claude Code, Codex), and avoid "agentic".
- **Concrete over vague:** "takes about 10 minutes" beats "quick".

### Conversion Emails
- "No pressure" tone. Encouraging, not pushy.
- Show concrete value (what they get) rather than abstract benefits
- For discount reminders: state the deadline, show the value, make it easy to act
- For raffle/giveaway: lead with the prize, make mechanics clear, keep subscription mention as natural context

## Before Sending
- **Confirm product facts the copy depends on.** Button labels must match the live UI exactly (e.g. "Add to LinkedIn Profile"), and any screenshot/GIF must match its `alt` text and the current product.
- **Check actions are logically consistent.** Match the verb to what the button does — "add to your profile" is a silent credential, so a "tag us / we'd love to cheer you on" ask belongs with *sharing a post*, not with adding a credential.
- **Verify merge fields and links.** Every `{{merge_field}}` is populated for each recipient, and per-recipient IDs resolve to the right page.
- **Set and check the subject line and preheader.** Both within length, point front-loaded, preheader complements rather than repeats the subject, and no "view in browser" / unsubscribe text leaking into the preview.
- **Check contrast and dark mode.** Run body text, text on gradients / tints, and buttons through a contrast checker (4.5:1 / 3:1), and preview the email in dark mode and with images off.
- **Confirm the HTML is under ~102KB** so Gmail doesn't clip it.

## Audience Context

The audience is non-technical women with business ideas who want to build. Many are busy (jobs, families). They may feel intimidated by technical content. Emails should make them feel welcomed, capable, and supported.
