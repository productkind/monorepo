# Course Outline: AI Your Life Admin

**Full title:** AI Your Life Admin: Two Voice Shortcuts for New Mums

## Overview

This is a short, hands-on micro-course for new mums who have less time, more to remember, and no patience for fiddly setup. In four short challenges, the learner builds two voice-triggered iPhone Shortcuts that hand the sorting to AI, then shares the load with a partner:

1. **The 60-Second Brain Dump** — talk for a minute about everything on your mind, and Apple's on-device AI sorts it into category checklists (Logistics, Food & Household, Misc), each its own note in a shared "Mental Load" folder.
2. **The Baby Log** — say what just happened (a feed, a nap, a nappy, a milestone) and AI turns it into a tidy, timestamped entry in one running note you can scroll back through or show your baby's doctor.

Everything runs on tools already on the iPhone: the Shortcuts app and **Apple Intelligence's Private Cloud Compute** model (free, no account, private). ChatGPT appears only as an optional alternative in the Baby Log. No subscription, no typing. The learner talks; the phone sorts.

The narrative follows Dalmie, a new-mum dalmatian whose brain is full and whose hands are even fuller. The course opens on her pain (things slipping through the cracks, mental load that never switches off), gives her a way to offload it by voice, and, crucially, a way to make that invisible load visible and shareable with her partner.

The course is deliberately small. The learner walks away having actually built both shortcuts, shared the first one, and used them, not having read about a system they still have to set up later.

---

## Structure

> **Scope update (2026-07-27):** This course was substantially reworked during on-device testing, and the sections from here down to "Cross-check" reflect the shipped design. In summary: the Brain Dump now uses Apple's **Private Cloud Compute** model (not the ChatGPT app) with a **Dictionary** output to sort speech into **fixed category checklist notes** (Logistics, Food & Household, Misc) inside a shared **Mental Load folder**, via per-category *Get Dictionary Value → Combine Text → Find Notes → Append Checklist Item*, wrapped in an *If (Dictated Text has any value)* guard so an empty tap does nothing (otherwise the forced Dictionary output makes the model invent a phantom list). Calendar and Reminders routing were both dropped (date parsing too brittle; undated reminders added little). A new **Challenge 2, "Share the Load,"** was added, and the course's real point is now making the invisible mental load **visible and shareable with a partner**. The **Cross-check** and **Verification Handoff** sections further below are the original pre-generation record, left as history; they describe the old ChatGPT-app / Calendar-Reminders design and no longer match the course.

### 1. The 60-Second Brain Dump
**Build a shortcut that sorts a minute of talking into shared category checklists.**

The hook: by the end, the learner has a working shortcut and a set of category notes filling with tickable checklist items.

- The mental-load problem: the leaky-sieve brain, things remembered at 3am and forgotten by 9
- The idea: one voice note, AI sorts it into categories, each category is its own checklist note
- Minimal setup: turn on **Apple Intelligence** (Settings → Apple Intelligence & Siri); no app to install, no account. Make a **Mental Load folder** with one note per category
- Build the shortcut step by step:
  - Dictate Text (Stop Listening = On Tap)
  - Use Model → **Private Cloud Compute**, Output = **Dictionary**, with a supplied **sorting prompt** (the reusable tool, copy-paste, categories editable)
  - Per category: Get Dictionary Value → Combine Text (New Lines) → Find Notes → **Append Checklist Item**
  - An **If (Dictated Text has any value)** guard so an accidental empty tap does nothing
  - Name it "Brain Dump"
- The sorting prompt and the four-action routing pattern are the takeaway tools; categories are the learner's to rename or extend
- Worked example: Dalmie's brain dump and where each piece lands as a checklist
- Exercise: run your own brain dump once and watch it sort

### 2. Share the Load
**Make the invisible mental load visible, and hand it off to your partner.**

The heart of the course: a list only you can see can't be handed off. This challenge puts the lists where a partner can see and pick them up, framed as offloading, never a shared inbox the mum has to feed.

- The reason: the mental load is invisible and lands on one person; making it a shared, visible list is what lets a partner take real things off her plate
- Share the **Mental Load folder** via **Share Folder → Collaborate** (Apple to Apple); both see live updates and can tick items off
- For an Android partner: send the lists via **WhatsApp**, using a hand-built **Text** action (bold headings with asterisks + line breaks, assembled by the shortcut, not the model) then a **Send Message** action
- Worked example: Dalmie dumps on the sofa; her partner picks up the shopping without being chased
- Exercise: share the folder and check a brain dump reaches the partner

### 3. The Baby Log
**Reuse the same pattern to keep a running, timestamped record of your baby's day.**

Faster than the earlier challenges because the learner already knows the building blocks. This challenge teaches the *pattern* (dictate → ask AI → save), not a one-off.

- Why a log helps: foggy-brain days, spotting patterns, and having something concrete to show the doctor or health visitor without having to use your hands when you're feeding or measuring your baby
- Build the second shortcut:
  - Dictate what just happened
  - Use Model with a supplied **logging prompt** to turn it into one tidy line. Model is the learner's choice: **Private Cloud Compute** like before, or **ChatGPT** if they want to connect an account and keep a history (explained as an option, not required)
  - Current Date → Format Date, then Find Notes + **Append to Note** into one running "Baby Log" note
- The logging prompt is the takeaway tool: it turns messy speech ("she woke up grumpy, weighed 4.5 kg, ate 60 ml") into a clean, consistent entry
- Trigger it by voice the same way
- Worked example: a day of Dalmie's log entries building up into something readable
- Exercise: log two or three things across an afternoon and scroll back over them

### 4. Make It Effortless
**Set the shortcuts up so you can fire them one-handed, or even handless, in any language, without thinking.**

A short closing challenge that removes the last bits of friction and sends the learner off.

- Faster triggers so you don't have to open anything:
  - Add to the Home Screen and Lock Screen
  - Back Tap (tap the back of the phone)
  - The Action Button, for iPhones that have one (a calm factual aside about which models do)
- Dictate in your own language: the brain dump and the log work whatever language you talk in, because the AI reads what you said. Worked note: a German-speaking mum dictating in German.
- A light word on the bigger jobs: the brain dump captures the big, looming tasks too; breaking one of them down into next steps is a job for a chat assistant, in a normal chat. (Kept brief so the course stays small; pointer, not a lesson.)
- Recap of what the learner can now do
- Keep going: pointer to the relevant next course

---

## Narrative Arc

1. **The pain:** a full brain and full hands; things slip through the cracks
2. **The offload:** talk for a minute, let AI sort it into checklists (Brain Dump)
3. **Shared:** make the invisible load visible and hand it to a partner (Share the Load)
4. **The pattern reused:** the same move, applied to the baby's day (Baby Log)
5. **Effortless:** one-handed triggers, any language, and where to go next

Each challenge ends with the learner having actually run the thing, not just understood it.

---

## Skills Covered

- Building a simple iPhone Shortcut from scratch
- Using Apple Intelligence's Private Cloud Compute model in a shortcut, with structured (Dictionary) output
- Writing/adapting a prompt that returns output a shortcut can act on (sorting into categories, formatting)
- Routing AI output into per-category Apple Notes checklists, and appending a timestamped line to a running note
- Sharing a Notes folder with a partner, and sending a formatted list via WhatsApp
- Triggering shortcuts hands-free by voice, Home/Lock Screen, Back Tap, Action Button
- Dictating in any language

---

## Timing

Total estimated time: ~25 minutes across four short challenges (Brain Dump ~6, Share the Load ~5, Baby Log ~7, Make It Effortless ~5), plus the opening comics and video. Short by design; the learner builds and uses the shortcuts as they go.

---

## Cross-check against the messy draft

- **"Three iPhone Shortcut Workflows" heading** — the draft listed only two (Smart Brain Dump, Baby Log; #2 was missing). The brief confirms two workflows, so the course teaches those two.
- **Smart Brain Dump** — Challenge 1. Kept in full, including routing to Calendar / Reminders / Notes and the Siri/Action Button trigger.
- **Baby Log** — Challenge 2. Kept in full, including the timestamped running note and sharing with the doctor.
- **"Use dictation for everything"** — built into both shortcuts; reinforced in Challenge 3 (any language).
- **"Break down large tasks and fit pieces into your schedule"** — *partially in scope.* The brain dump captures these tasks; actually breaking one down is handled in a normal ChatGPT chat, mentioned briefly in Challenge 3 as a pointer. Kept light on purpose so the course stays short. Flag for the user: drop it entirely if it muddies the concision.
- **"No subscription needed"** — premise to verify (free ChatGPT app + its Shortcuts action). See Verification handoff.
- **"Notes with different notes, e.g. shopping list"** — simplified. Challenge 1 routes non-event, non-to-do items to Notes; splitting across several named notes (shopping vs other) is left as an optional tweak, not core, to keep the build simple.
- **References (How I AI episode, Figma files)** — source material for the idea, not course content.

---

## Verification Handoff

### Challenge 1: The 60-Second Brain Dump
- **Tools taught:**
  - ChatGPT iOS app: install, sign in with a free account, and use it as a Shortcuts action.
  - Shortcuts app: build a shortcut using Dictate Text → an "Ask ChatGPT"/ChatGPT action → Add New Event (Calendar), Add Reminder (Reminders), and a Notes action.
  - Siri: run a named shortcut by voice.
- **Claims to verify:**
  - The ChatGPT iOS app exposes a Shortcuts action (current exact name, e.g. "Ask ChatGPT" / "ChatGPT"), and it works on a **free** ChatGPT account (the draft's "no subscription needed").
  - Free-account rate limits / model limits that a mum running this a few times a day would actually hit.
  - The exact current Shortcuts action names and the simplest reliable way to take ChatGPT's text answer and route parts of it to Calendar, Reminders and Notes (e.g. asking ChatGPT to return a format the shortcut can split, vs separate asks). Name the most reliable beginner-friendly approach.
  - Whether multiple events/to-dos from one dump can be added in a loop, or whether the realistic v1 is "one of each / a list into one note".
  - Exact action names: "Dictate Text", "Add New Event", "Add Reminder" (or "Add New Reminder"), and the Notes action (e.g. "Append to Note" / "Create Note").
- **Premise risk:** The whole course rests on a free ChatGPT account being usable from inside Shortcuts and on the routing being reliable enough for a non-technical first-timer. If the free app has no Shortcuts action, or it needs Plus, the angle ("already on your phone, no subscription") breaks and needs reframing. Confirm before generation.

### Challenge 2: The Baby Log
- **Tools taught:**
  - Shortcuts: Dictate Text → ChatGPT action → append a timestamped line to one running note in Notes.
  - Notes: maintaining one running note that entries append to.
- **Claims to verify:**
  - The exact Shortcuts action for appending to an existing specific note (name, and whether it appends or replaces), and how the learner pins the shortcut to one note.
  - How to get the current date/time into the entry (Shortcuts "Current Date" action and formatting, vs asking ChatGPT to timestamp).
  - Whether sharing/exporting that note for a doctor is straightforward (so the "show your doctor" claim holds).
- **Premise risk:** Same free-ChatGPT-action dependency as Challenge 1. No new premise.

### Challenge 3: Make It Effortless
- **Tools taught:**
  - Shortcuts triggers: Add to Home Screen, Add to Lock Screen, Back Tap (Settings → Accessibility → Touch), and the Action Button.
  - Dictation in non-English languages via Dictate Text / the keyboard dictation language.
- **Claims to verify:**
  - Which iPhone models have the Action Button (current: which iPhone 15/16 tiers) — needed for the "calm factual aside".
  - Where Back Tap lives in Settings on current iOS and that it can run a shortcut.
  - That Dictate Text (or device dictation) supports the relevant non-English languages (e.g. Polish) and that ChatGPT handles non-English input fine.
  - Current iOS version name/number for any "go to Settings" wording.
- **Premise risk:** None beyond the shared ChatGPT dependency.
