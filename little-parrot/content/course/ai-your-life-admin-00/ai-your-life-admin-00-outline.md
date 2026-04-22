# Course Outline: AI Your Life Admin for New Mums

**Full title:** AI Your Life Admin for New Mums: Three iPhone Shortcut Workflows That Give You Your Brain Back

## Overview

This micro-course helps new mums reclaim time and mental bandwidth by outsourcing life admin to AI, using iPhone Shortcuts that work hands-free, one-handed, during a feed, or while rocking a baby to sleep.

The transformation: from "my brain is a leaky sieve and I can't keep track of anything" to "my phone catches what I used to have to remember, and my paediatrician gets a proper log without me trying to remember from memory."

By the end, the learner will have three working shortcuts running on their phone:
- A **Baby Log** that turns voice notes into a timestamped, paediatrician-ready record
- A **Brain Dump** that empties their head in 60 seconds and routes items to Calendar, Reminders, and Notes automatically
- A **Morning Briefing** that reads the day aloud while they feed the baby

All built with free tools. No API keys. No subscriptions.

The narrative is deliberately anti-system: no complex setup, no notion of "doing it right," no productivity ideology. Just the lowest-friction path from "thing in my head" to "thing handled."

---

## Intro: The Leaky Sieve

Set the scene before any teaching begins. A short story about Maya, 4 months postpartum, returning to work in 3 months, standing in the kitchen at 7am trying to remember what the health visitor said about the rash, what time the pram gets delivered, and whether the nursery tour is Tuesday or Wednesday. Her baby is crying. She has both hands full. Her phone is on the counter.

- Name the pain: fractured attention, foggy brain, more life admin than ever, less time, mental load that keeps accumulating because there's nowhere to put it
- Name the transformation: from "holding it all in my head" to "my phone holds it for me, hands-free"
- Name the approach: the **anti-system system**. No tags, no folders, no daily review. Voice in, sorted out.
- What you need: iPhone 15 Pro or newer, iOS 26+, Apple Intelligence enabled, ChatGPT extension connected (details in the Prerequisites Toolkit link)
- Who this is for: any new parent with a smartphone and not enough time. No tech background required.

---

## Structure

### Challenge 1: Your First AI Shortcut — The Baby Log
Build a working voice-to-log shortcut in under 10 minutes. Experience the core pattern the whole course is built on: dictate → AI parses → saves to a note.

- The core pattern of every shortcut in this course: **Dictate Text → Use Model (ChatGPT) → Append to Note**
- Why voice-first matters when your hands are full
- Walk through the 7 actions: Dictate Text, Date, Format Date, Text (the prompt), Use Model, Append to Note, Speak Text
- The prompt anatomy: role, current date/time, input, output format, emoji legend, concern flag
- Example: Maya dictates "Fed 120ml at 2, nappy at 2:30, fussy after feed, napped 3 to 4:15." The shortcut writes it into her Baby Log note as a clean, timestamped entry.
- Set up the trigger: "Hey Siri, Baby Log" (Action Button and Back Tap covered in Challenge 4)
- Immediate reuse: the log builds up from the very first entry. Every use adds value, no backlog of setup
- Exercise: Build the shortcut. Run it once during today's next feed. Check the Baby Log note to see what it captured.

### Challenge 2: The 60-Second Brain Dump — Empty Your Head, Route to the Right App
Extend the pattern to handle the chaos. Everything spinning in your head, sorted by AI and filed where it belongs.

- Why a brain dump: things don't fall through the cracks when they're no longer living only in your head
- The new skill: structured AI output with separators (`===CALENDAR===`, `===REMINDERS===`, `===NOTES===`)
- The new skill: parsing that output inside Shortcuts with Split Text, Get Item from List, and Set Variable
- The new skill: routing with If/End If and Repeat with Each loops to create Calendar events and Reminders
- Example: Maya says "Pram delivery Thursday at 10. Nursery tour next Tuesday. Remind me to call the health visitor about the rash. Talk to Tom about splitting the nights." The shortcut puts the pram and nursery tour in Calendar, the health visitor call in Reminders, and "split the nights with Tom" in her Brain Dump note.
- The prompt pattern that makes AI output reliable: explicit format, NONE sentinel for empty categories, defaults for missing times
- Set up the trigger: "Hey Siri, Brain Dump" or assign to Action Button
- Exercise: Build the shortcut. Do a 60-second dump about everything on your mind right now. Check Calendar, Reminders, and Notes.

### Challenge 3: The Morning Briefing — Your Day, Read Aloud
Introduce automation. Set it once, and every morning your phone reads you the day while you feed the baby.

- The new skill: pulling data into a shortcut (Get Current Weather, Find Calendar Events, Find Reminders)
- The new skill: asking AI to write spoken output (friendly tone, under 60 seconds, no emoji, no bullet points, natural speech)
- The new skill: automation via **Shortcuts → Automation → Time of Day** — runs itself daily with no tap required
- Why this works with the baby in your arms: audio-only, hands-free, and it reads the Calendar and Reminders that Brain Dump has been populating
- Example: Maya has Brain Dump running for a week. Tuesday at 7am her phone says: "Morning Maya. It's 11 degrees and drizzly, so a waterproof cover for the pram if you head out. You've got the nursery tour at 10, and the health visitor call is on your list for today. You're doing great."
- Optional add-on: save the briefing as a notification or append to a "Morning Briefings" note
- Start manual, go automatic when ready: keep "Ask Before Running" on for the first week, then turn it off
- Exercise: Build the shortcut. Trigger it manually with "Hey Siri, Morning Briefing." Once it feels useful, set up the Time of Day automation.

### Challenge 4: Make Them Stick — Triggers, Tweaks, and Insights
Turn three working shortcuts into daily habits. Pick the right trigger for each moment, customise as you go, and unlock the advanced win: pattern analysis from your Baby Log.

- **Trigger strategy:** Hey Siri (hands full, baby on you), Action Button (fastest, one shortcut only), Back Tap (second shortcut via Settings → Accessibility → Touch → Back Tap)
- Recommended assignment: Action Button → Brain Dump (used most often), Back Tap double-tap → Baby Log, Siri for Morning Briefing (or let it run automatically)
- Turn off "Ask Before Running" once a shortcut is reliable — the friction of confirming kills the habit
- **Tweaks to make them yours:** change the AI tone, add a greeting that uses your name, add travel time to your first appointment, pull an upcoming birthday from Contacts
- Add one tweak at a time. Run the shortcut between tweaks. If it breaks, undo the last change.
- **From log to insight:** after 2+ weeks of Baby Log entries, paste the whole note into ChatGPT or Claude and ask for feed/sleep patterns, wake windows, and anything a paediatrician might want to see
- **Share with your paediatrician:** open the Baby Log note, Share → Create PDF. Hand over a clean, timestamped document instead of trying to remember from memory.
- The mindset, landing after the practice: you don't need a system. You need a shortcut that runs when you're exhausted. Done beats perfect.
- Exercise: Pick a trigger for each shortcut. Add one tweak to one shortcut. If you've been logging for 2+ weeks, run the pattern analysis prompt.

---

## Narrative Arc

The course moves from simple to compound:

1. **One pattern:** dictate → AI → note (Baby Log)
2. **Same pattern, more power:** structured output, parsing, routing to multiple apps (Brain Dump)
3. **Same pattern, no tap required:** automation and audio output (Morning Briefing)
4. **Living with them:** triggers, tweaks, and turning data into insight

Each challenge teaches one new building block on top of a pattern the learner already knows. By Challenge 4, the shortcuts have been running long enough to produce data worth analysing and a log worth sharing with a doctor.

---

## Teaching Approach

- **Voice-first throughout:** every shortcut starts with dictation. The learner never has to type while holding a baby.
- **One pattern, three variations:** the core `Dictate → Use Model → Write Somewhere` pattern is the same in all three shortcuts. Each challenge adds one new skill.
- **Build, then trigger, then live with it:** each challenge ends with a real-world test run, not just a "save and close."
- **Anti-system mindset, taught through doing:** the shortcuts themselves prove the point. No tags, no folders, no daily review. Just voice in, sorted out.
- **Mindset lands in Challenge 4, not Challenge 1:** the learner has already felt the relief before being told "you don't need a system."
- **Running persona:** Maya, 4 months postpartum, returning to work in 3 months, foggy and tired. Every example follows her.

---

## Skills Covered

- iPhone Shortcuts fundamentals (Dictate Text, Date, Format Date, Text, Use Model, Append to Note, Speak Text)
- Prompt design for structured AI output (role, format, defaults, NONE sentinel, emoji legend)
- Parsing AI output in Shortcuts (Split Text, Get Item from List, Set Variable)
- Conditional routing and loops (If/End If, Repeat with Each)
- Creating Calendar events and Reminders from a shortcut
- Pulling data into a shortcut (Get Current Weather, Find Calendar Events, Find Reminders)
- Automation via Time of Day trigger
- Trigger choices: Siri, Action Button, Back Tap
- Using ChatGPT or Claude to analyse a log for patterns
- Sharing a Notes-based log as a PDF

---

## Suggested Toolkit Items

These are the setup-heavy and reusable reference pieces that belong out of the challenges and in the toolkit:

1. **Prerequisites and Setup Guide** — iPhone 15 Pro+/iOS 26+ check, Apple Intelligence activation, ChatGPT extension connection (Settings → Apple Intelligence & Siri → ChatGPT → Set Up)
2. **Baby Log Shortcut — Step-by-Step Build Guide** — the 7-action walkthrough with screenshots
3. **Brain Dump Shortcut — Step-by-Step Build Guide** — the full 40-action walkthrough with screenshots, including the parsing/routing loops
4. **Morning Briefing Shortcut — Step-by-Step Build Guide** — the build + Time of Day automation setup
5. **Prompt Library for New-Mum Shortcuts** — the Baby Log prompt, Brain Dump prompt, Morning Briefing prompt, and the Baby Log pattern-analysis prompt, ready to paste
6. **Trigger Decision Cheat Sheet** — which shortcut gets Siri vs Action Button vs Back Tap, and why

---

## Timing

Total estimated time: ~45 minutes of active build time across the four challenges. Designed to be done in short bursts (during a nap, during a feed), not in one sitting.

- Challenge 1 (Baby Log): ~10 minutes to build, then reuse starts immediately
- Challenge 2 (Brain Dump): ~15 minutes to build (the longest)
- Challenge 3 (Morning Briefing): ~10 minutes to build + automation setup
- Challenge 4 (Make them stick): ~10 minutes to assign triggers and make one tweak

---

## Cross-Check Against the Messy Draft

Every bullet in the messy draft is accounted for. Flagging anything dropped or relocated:

**Pain point section** — all four bullets covered in the Intro: fractured attention, foggy brain, anti-system system, leaky sieve metaphor. ✅

**Needs section** — all six bullets covered:
- Things don't fall through the cracks → Challenge 2 (Brain Dump) ✅
- Don't need to constantly think about these → Challenge 2 and 3 ✅
- Use dictation for everything → every challenge ✅
- Break down large tasks, fit pieces into schedule → Challenge 2 (Brain Dump routing to Calendar and Reminders) ✅
- Make life admin feel less of a burden → whole course promise ✅
- Lowest-friction ways to use AI assistants → Challenge 4 (mindset) + every challenge's voice-first design ✅

**Prerequisites** (iPhone 15 Pro+, iOS 26+, Apple Intelligence, ChatGPT extension) — relocated to **Intro + Toolkit Item 1** rather than a challenge, because it's configuration, not a decision-teaching moment.

**Smart Brain Dump workflow (40 steps)** — Challenge 2, with the step-by-step build moved to **Toolkit Item 3**. The challenge teaches the new skills (structured output, parsing, routing) and the decisions; the toolkit holds the click-by-click.

**Morning Briefing workflow (~7 steps + automation)** — Challenge 3, step-by-step moved to **Toolkit Item 4**.

**Baby Log workflow (7 steps)** — Challenge 1, step-by-step moved to **Toolkit Item 2**. Kept first because it's the simplest introduction to the pattern and the emotional hook (paediatrician-ready log) is strong.

**"Make it smarter over time" (Morning Briefing extensions: upcoming events, birthdays, motivational quote, travel time)** — Challenge 4 (Tweaks). Not dropped, moved to where the learner already has a working version to extend.

**"Tip: Use Back Tap for a second shortcut"** — Challenge 4 (Triggers). ✅

**"What the log looks like over time" sample Baby Log** — lives inside Challenge 1 as the "what this builds up to" reveal.

**"Share with your paediatrician" (Create PDF)** — Challenge 4. Needs 2+ weeks of data first, so it sits at the end, not in Challenge 1 where there's nothing to share yet.

**"Advanced: analyse patterns" (pattern analysis prompt)** — Challenge 4. Intentionally placed last because it requires a populated log. Prompt itself belongs in **Toolkit Item 5**.

**Quick Reference table** — lives naturally at the end of Challenge 4 as a recap, and in **Toolkit Item 6** as a standalone.

**"All three use free tools only. No API keys. No subscriptions."** — Intro. ✅

**References section (How I AI episode, Figma files)** — not included in the learner-facing course. These are source research, not learner-facing content. Kept in the messy draft for internal reference only.
