# Course Outline: AI Your Life Admin

**Full title:** AI Your Life Admin: Two Voice Shortcuts for New Mums

## Overview

This is a short, hands-on micro-course for new mums who have less time, more to remember, and no patience for fiddly setup. In three short challenges, the learner builds two voice-triggered iPhone Shortcuts that hand the sorting to AI:

1. **The 60-Second Brain Dump** — talk for a minute about everything on your mind, and AI sorts each thing into the right place: events into your Calendar, to-dos into Reminders, and the rest into Notes.
2. **The Baby Log** — say what just happened (a feed, a nap, a nappy, a milestone) and AI turns it into a tidy, timestamped entry in one running note you can scroll back through or show your baby's doctor.

Everything runs on tools already on the iPhone: the Shortcuts app and the free ChatGPT app. No subscription, no new accounts beyond a free ChatGPT login, and no typing. The learner talks; the phone sorts.

The narrative follows Dalmie, a new-mum dalmatian whose brain is full and whose hands are even fuller. The course opens on her pain (things slipping through the cracks, mental load that never switches off) and gives her a way to offload it by voice.

The course is deliberately small. The learner walks away having actually built both shortcuts and used them once, not having read about a system they still have to set up later.

---

## Structure

### 1. The 60-Second Brain Dump
**Build a shortcut that sorts a minute of talking into your calendar, reminders and notes.**

This is the hook: by the end of the first challenge the learner has a working shortcut they can trigger by voice.

- The mental-load problem: the leaky-sieve brain, things remembered at 3am and forgotten by 9
- The idea: one voice note, AI does the sorting, each item lands where it belongs
- Minimal setup, folded in here so there's no separate "setup challenge":
  - Turn on ChatGPT in Settings → Apple Intelligence & Siri (no app to install, no account needed; a free ChatGPT account is optional, only for saving history)
  - Open Shortcuts (already on the iPhone)
  - (Older iPhones without Apple Intelligence: install the free ChatGPT app for the fallback path)
- Build the shortcut step by step:
  - Dictate text (the brain dump)
  - Ask ChatGPT to sort it, using a supplied **sorting prompt** (the reusable tool, copy-paste, then tweak)
  - Route the result: events to Calendar, to-dos to Reminders, everything else to Notes
- The sorting prompt is the takeaway tool: it tells the AI how to categorise and how to format its answer so the shortcut can act on it
- Trigger it: run it by name with Siri ("Hey Siri, Brain Dump")
- Worked example: Dalmie's morning brain dump ("dentist Thursday, we're out of nappies, book the 6-week check, text Mum back") and where each piece ends up
- Exercise: run your own brain dump once and watch it sort

### 2. The Baby Log
**Reuse the same pattern to keep a running, timestamped record of your baby's day.**

Faster than Challenge 1 because the learner already knows the building blocks. This challenge teaches the *pattern* (dictate → ask AI → save), not a one-off.

- Why a log helps: foggy-brain days, spotting patterns, and having something concrete to show the doctor or health visitor without having to use your hands when you're feeding or measuring your baby
- Build the second shortcut:
  - Dictate what just happened
  - Ask ChatGPT to turn it into one tidy line using a supplied **logging prompt**
  - Append it, with the time, to one running note in Notes
- The logging prompt is the takeaway tool: it turns messy speech ("she woke up grumpy, weighed 4.5 kg, ate 60 ml") into a clean, consistent entry
- Trigger it by voice the same way
- Worked example: a day of Dalmie's log entries building up into something readable
- Exercise: log two or three things across an afternoon and scroll back over them

### 3. Make It Effortless
**Set the shortcuts up so you can fire them one-handed, or even handless, in any language, without thinking.**

A short closing challenge that removes the last bits of friction and sends the learner off.

- Faster triggers so you don't have to open anything:
  - Add to the Home Screen and Lock Screen
  - Back Tap (tap the back of the phone)
  - The Action Button, for iPhones that have one (a calm factual aside about which models do)
- Dictate in your own language: the brain dump and the log work whatever language you talk in, because the AI reads what you said. Worked note: a German-speaking mum dictating in German.
- A light word on the bigger jobs: the brain dump captures the big, looming tasks too; breaking one of them down into next steps is a job for the ChatGPT app itself, in a normal chat. (Kept brief so the course stays small; pointer, not a lesson.)
- Recap of what the learner can now do
- Keep going: pointer to the relevant next course

---

## Narrative Arc

1. **The pain:** a full brain and full hands; things slip through the cracks
2. **The offload:** talk for a minute, let AI sort it (Brain Dump)
3. **The pattern reused:** the same move, applied to the baby's day (Baby Log)
4. **Effortless:** one-handed triggers, any language, and where to go next

Each challenge ends with the learner having actually run the thing, not just understood it.

---

## Skills Covered

- Building a simple iPhone Shortcut from scratch
- Connecting a shortcut to the free ChatGPT app
- Writing/adapting a prompt that returns output a shortcut can act on (sorting, formatting)
- Routing AI output into Calendar, Reminders and Notes
- Triggering shortcuts hands-free by voice, Home/Lock Screen, Back Tap, Action Button
- Dictating in any language

---

## Timing

Total estimated time: ~30 minutes (short by design; the learner builds and runs both shortcuts as they go)

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
