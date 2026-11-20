---
name: tally-form
description: Build a Little Parrot branded Tally form with the Tally connector, covering brand styling, question copy, custom thank-you pages per answer path, email prefill from EmailOctopus, notifications and the publish-and-test handover. Use when creating or editing any Tally form (sign-ups, research questions, feedback, event registration). Triggers include "make a Tally form", "sign-up form", "feedback form", or any Tally task.
---

# Tally forms for Little Parrot

Follow the Tally connector's own rules (read its reference docs before each area). This skill adds what makes a form ours.

## Before building

- **Workspace:** Little Parrot forms live in workspace `3ygzO4`. Check `list_forms` first so you edit an existing form rather than duplicate it.
- **One job per form.** Know what the reader does next and what we do with each answer before writing a question.
- **Research and feedback forms** follow the memory rules on learner research: one outcome question anchored in past struggles, plus an optional "what's got in the way", open to everyone, no form title competing with the question.

## Copy

- All copy follows `/language-rules`. Run `python3 .claude/skills/language-rules/scripts/check-banned.py <file>` on every text block, thank-you page included, before creating it.
- Warm, friendly and straightforward, written to "you", never to one named person (forms often go to mixed audiences).
- Make every question optional unless we can't act without it (email usually stays required).
- Help text says why we ask or what happens next, in one sentence.
- Show follow-up questions with SHOW logic instead of asking everyone.

## Branding

Apply in one `update_styling` call. Colours apply live at once, no publish needed.

| Setting               | Value                                          |
| --------------------- | ---------------------------------------------- |
| theme                 | `CUSTOM`                                       |
| backgroundColor       | `#ffffff`                                      |
| textColor             | `#08080a`                                      |
| accentColor           | `#ffb65b`                                      |
| buttonBackgroundColor | `#ffb65b`                                      |
| buttonTextColor       | `#08080a` (white on the orange fails contrast) |
| fontFamily            | `Inter`                                        |

- **Logo:** Kinga uploads it in the Tally editor. The API doesn't report it, so never pass `logoUrl` (it would overwrite the upload) and ask her to check it in the preview.
- Don't put text links on the form: the orange accent is too faint for link text on white.

## Thank-you pages

Never leave Tally's default "Thanks for completing this form".

- One thank-you page per answer path (for example "I'll be there" vs "that time doesn't work"), routed with `JUMP TO PAGE` from the gating question. The gating question must be required.
- Shape: a `HEADING_2` starting with 🦜, then one TEXT block with the concrete next step (what we send, when) and a warm line, then the sign-off "Kinga and Tamas from Little Parrot".
- Keep it short. No reminders of what the form already said.

## Email prefill and notifications

- For forms linked from EmailOctopus emails, add a hidden field named `email`, set it as the email question's default answer, and link with `https://tally.so/r/<id>?email={{EmailAddress}}`.
- Switch on self email notifications (`update_settings`) so Kinga hears about each submission.
- Tally has no native Google Calendar integration; invites go out by hand.

## Handover

- Content edits (questions, text, thank-you pages, logic) stay unpublished until published. Don't publish yourself; tell Kinga to press **Publish** and give her the edit link `https://tally.so/forms/<id>/edit`.
- Ask her to submit once per answer path to check each thank-you page.
- The "Made with Tally" badge stays unless we're on Tally Pro.
