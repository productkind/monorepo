# AI Your Life Admin for New Moms
- Create a course that helps new moms get back time by outsourcing life admin to AI, and becoming more efficient with AI.

## Pain point
- They have fractured attention, foggy brain, a lot more life admin to take care of, less time
  - You don't want to put a lot of work into doing a bunch of setup
  - You just want to get started and get your problem solved
  - The anti-system system: don't need a ton of structure to get value out
  - How do I make sure that nothing escapes the leaky sieve of my brain that I need to do?

## Needs
- Things don't fall through the cracks
- I don't need to constantly think about these - frees up mindspace
- Use dictation for everything
- Make progress on things that are otherwise are just weighing on me: break down large tasks and fit the pieces into my schedule
- Make life admin feel like less of a burden
- Finding the lowest friction ways to use AI assistants

## Three iPhone Shortcut Workflows for New Moms

Requirements for all three: iPhone 15 Pro or newer, iOS 26+, Apple Intelligence on, ChatGPT extension enabled (Settings → Apple Intelligence & Siri → ChatGPT → Set Up).

---

### 1. Smart Brain Dump

**What it does:** You talk for 60 seconds about everything on your mind. AI categorises each item and routes it to the right app: events → Calendar, to-dos → Reminders, everything else → Notes.

**Trigger:** "Hey Siri, Brain Dump" or Action Button.

**Preparation:** Create a note called "Brain Dump" in the Notes app.

#### Steps

**1. Dictate Text**
- Stop Listening: After Short Pause

**2. Date** → Current Date

**3. Format Date**
- Format: Custom → `yyyy-MM-dd HH:mm`

**4. Text**
Write the following, inserting the Shortcut variables from the picker where marked:

```
You are a personal assistant. I did a voice brain dump.

Current date/time: [Formatted Date]

What I said: [Dictated Text]

Sort every item into exactly one category. Return ONLY this structure, nothing else:

===CALENDAR===
TITLE | YYYY-MM-DD | HH:MM | DURATION_MINUTES
(One event per line. Calculate relative dates like "next Thursday" from the current date. Default time 09:00, default duration 30.)

===REMINDERS===
TASK | YYYY-MM-DD
(One task per line. Default due date is today. "This week" = coming Friday.)

===NOTES===
(Everything else: ideas, things to discuss with partner, things to remember. One per line, plain text.)

If a category has no items, write NONE on a single line.
```

**5. Use Model**
- Model: Extension Model (ChatGPT)
- Prompt: select the Text variable from step 4
- Follow Up: Off
- Output: Text

**6. Split Text** on Use Model output
- Separator: `===CALENDAR===`

**7. Get Item from List** → Last Item

**8. Split Text**
- Separator: `===REMINDERS===`

**9. Get Item from List** → First Item
→ This is your calendar block. Save it to a variable: **Set Variable** → name it `CalendarBlock`

**10. Get Item from List** → Last Item (from step 8)

**11. Split Text**
- Separator: `===NOTES===`

**12. Get Item from List** → First Item
→ **Set Variable** → name it `RemindersBlock`

**13. Get Item from List** → Last Item (from step 11)
→ **Set Variable** → name it `NotesBlock`

#### Route calendar events

**14. If** `CalendarBlock` does not contain `NONE`

**15. Split Text** on `CalendarBlock`
- Separator: New Line

**16. Repeat with Each**

Inside the loop:

**17. Split Text** on Repeat Item
- Separator: ` | ` (space pipe space)

**18. Get Item from List** → Item 1 → **Set Variable** → `EventTitle`

**19. Get Item from List** → Item 2 → **Set Variable** → `EventDate`

**20. Get Item from List** → Item 3 → **Set Variable** → `EventTime`

**21. Text** → combine: `[EventDate] [EventTime]`

**22. Date** → set to the Text from step 21
- This forces Shortcuts to parse it as a date

**23. Add New Event**
- Title: `EventTitle`
- Start Date: the Date from step 22
- Calendar: your default (or "Family")

**24. End Repeat**

**25. End If**

#### Route reminders

**26. If** `RemindersBlock` does not contain `NONE`

**27. Split Text** on `RemindersBlock`
- Separator: New Line

**28. Repeat with Each**

**29. Split Text** on Repeat Item
- Separator: ` | `

**30. Get Item from List** → Item 1 → **Set Variable** → `TaskTitle`

**31. Get Item from List** → Item 2 → **Set Variable** → `TaskDate`

**32. Date** → set to `TaskDate`

**33. Add New Reminder**
- Title: `TaskTitle`
- List: default (or create one called "Brain Dump")
- Due Date: the Date from step 32
- Remind Me: At Time of Due Date, 9:00 AM

**34. End Repeat**

**35. End If**

#### Route notes

**36. If** `NotesBlock` does not contain `NONE`

**37. Text** → combine:
```
---
[Formatted Date from step 3]
[NotesBlock]
```

**38. Append to Note**
- Note: "Brain Dump"
- Body: the Text from step 37

**39. End If**

#### Confirm

**40. Speak Text** → "Brain dump sorted."

#### Set up trigger

- **Siri:** Rename shortcut to "Brain Dump". Say "Hey Siri, Brain Dump."
- **Action Button:** Settings → Action Button → Shortcut → select "Brain Dump."
- Turn off "Ask Before Running" for fully hands-free use.

---

### 2. Morning Briefing

**What it does:** Every morning at a time you choose, your phone reads you a summary of today's calendar, pending reminders, the weather, and one encouraging note. All spoken aloud so you can listen while feeding the baby or getting dressed.

**Trigger:** Runs automatically at a scheduled time (e.g., 7:00 a.m.) or manually via "Hey Siri, Morning Briefing."

#### Steps

**1. Get Current Weather**
- Location: Current Location

**2. Find Calendar Events**
- Start Date: Start of Today
- End Date: End of Today
- Sort by: Start Date

**3. Find Reminders**
- Filter: Is Not Completed
- Due Date: Is Today
- Sort by: Due Date

**4. Text**
Combine everything into a single text block for the AI to summarise. Insert variables from the picker:

```
Create a short, warm, spoken morning briefing for a new mum. Keep it under 60 seconds when read aloud. Use a friendly, encouraging tone.

Here is today's information:

WEATHER:
[Weather Condition], [Temperature]°, feels like [Feels Like]°

CALENDAR EVENTS TODAY:
[Calendar Events]

REMINDERS DUE TODAY:
[Reminders]

Structure the briefing as:
1. A short, kind greeting (acknowledge that mornings with a baby are hard)
2. Weather summary in one sentence (include what to dress baby in if going out)
3. Calendar overview: what's happening and when
4. Top 3 reminders to focus on
5. End with one encouraging sentence

Do not use emoji. Do not use bullet points. Write it as natural spoken language.
```

**5. Use Model**
- Model: Extension Model (ChatGPT)
- Prompt: the Text from step 4
- Follow Up: Off
- Output: Text

**6. Speak Text**
- Text: Use Model output
- Rate: slightly slower than default (adjust to taste)
- Wait Until Finished: On

**Optional step 7: Show as notification**

If you also want to read the briefing later:

**7. Show Notification**
- Title: "Morning Briefing"
- Body: Use Model output

Or to save it:

**7. Append to Note**
- Note: create a note called "Morning Briefings"
- Body: Combine today's date + Use Model output

#### Set up automatic trigger

Go to **Shortcuts → Automation → + → Time of Day**.

- Time: 7:00 AM (or whenever you usually wake up)
- Repeat: Daily
- Shortcut: select "Morning Briefing"
- Run Immediately: On (turn off "Ask Before Running")

The briefing will play automatically every morning. If you're not ready for it to be automatic, leave it as a manual Siri trigger: "Hey Siri, Morning Briefing."

#### Make it smarter over time

After a week of use, you can extend this shortcut:

- Add a **Get Upcoming Events** for tomorrow to preview the next day
- Add a check for **upcoming birthdays** from Contacts
- Pull in a motivational quote by adding a second Use Model call with the prompt "Give me one short encouraging sentence for a tired new mum. No clichés."
- Add travel time to first appointment using **Get Travel Time**

Each of these is one additional action. Add them one at a time when you're ready.

---

### 3. Baby Log

**What it does:** You say what just happened (feed, nap, nappy, mood, milestone) and AI parses it into a structured log entry, timestamped and saved to a running note. Over time, this becomes a detailed, searchable record you can share with your paediatrician.

**Trigger:** "Hey Siri, Baby Log" or Action Button.

**Preparation:** Create a note called "Baby Log" in the Notes app.

#### Steps

**1. Dictate Text**
- Stop Listening: After Short Pause

Say things like: "Fed 120ml formula at 2pm. Nappy change at 2:30, normal. She was a bit fussy after the feed. Slept from 3 to 4:15."

**2. Date** → Current Date

**3. Format Date**
- Format: Custom → `yyyy-MM-dd HH:mm`

**4. Text**
Write the following prompt, inserting variables from the picker:

```
You are a baby care log parser for a new mum.

Current date and time: [Formatted Date]

Here is a voice log entry: [Dictated Text]

Parse this into a structured, scannable log entry. For each activity, extract:
- Time (use the current date/time as reference if no specific time mentioned)
- Type: one of Feed / Sleep / Nappy / Mood / Milestone / Medicine / Other
- Details: amounts, durations, observations

Format as:

## [Date in "Day, DD Mon YYYY" format]

**[Time]** 🍼/😴/🧷/😊/⭐/💊 [Type]: [Details]

(Use the emoji that matches the type. One line per activity. Keep it brief.)

If the entry mentions a concern or something unusual, add a line at the bottom:
⚠️ Note: [the concern, flagged for paediatrician review]
```

**5. Use Model**
- Model: Extension Model (ChatGPT)
- Prompt: the Text from step 4
- Follow Up: Off
- Output: Text

**6. Append to Note**
- Note: "Baby Log"
- Body: Use Model output

**7. Speak Text** → "Baby log updated."

#### Set up trigger

Same options as the Brain Dump:
- **Siri:** "Hey Siri, Baby Log"
- **Action Button:** If you want this as your primary shortcut. Or use a different trigger (see tip below).

**Tip: Use Back Tap for a second shortcut.** If your Action Button is already assigned to the Brain Dump, go to Settings → Accessibility → Touch → Back Tap → Double Tap → select "Baby Log." Now double-tapping the back of your phone starts logging. Hands-free with a different gesture.

#### What the log looks like over time

After a few entries, your "Baby Log" note builds up:

```markdown
> ## Tuesday, 08 Apr 2026
>
> **14:00** 🍼 Feed: 120ml formula
> **14:30** 🧷 Nappy: Normal
> **14:45** 😊 Mood: Fussy after feed, settled with rocking
> **15:00** 😴 Sleep: Napped 15:00–16:15 (1h 15min)
> **17:30** 🍼 Feed: 150ml formula
> **18:00** 🧷 Nappy: Normal
> **19:00** 😴 Sleep: Down for the night at 19:00
>
> ## Wednesday, 09 Apr 2026
>
> **02:30** 🍼 Feed: 90ml formula (night feed)
> **02:45** 🧷 Nappy: Normal
> **07:15** 🍼 Feed: 130ml formula
> **07:30** 😊 Mood: Happy, lots of smiling
> **08:00** ⭐ Milestone: Rolled from tummy to back for the first time!
>
> ⚠️ Note: Rash on left cheek, appeared yesterday, not improving. Flagged for paediatrician.
```

#### Share with your paediatrician

Before an appointment, open the "Baby Log" note, tap Share → Create PDF. You now have a clean, timestamped document of everything that's happened since the last visit. No more trying to remember from memory.

#### Advanced: analyse patterns

Once you have 2+ weeks of data, try this in ChatGPT or Claude:

Copy the entire Baby Log note, paste it in, and ask:

> "Analyse this baby log like a data analyst. Look for:
> 1. Average feed amounts and frequency, any trends
> 2. Sleep patterns: total daytime naps, longest stretch at night, wake windows
> 3. Correlations between daytime feeding and nighttime sleep
> 4. Any patterns around fussiness
> 5. Anything a paediatrician might find noteworthy
>
> Present findings in plain language, not medical jargon."

This turns weeks of scattered observations into actionable patterns you can discuss with your doctor.

---

### Quick Reference

| Shortcut | Actions | Setup Time | Trigger Phrase |
|---|---|---|---|
| Smart Brain Dump | ~40 | 10 min | "Hey Siri, Brain Dump" |
| Morning Briefing | ~7 + automation | 5 min | Automatic daily / "Hey Siri, Morning Briefing" |
| Baby Log | 7 | 5 min | "Hey Siri, Baby Log" |

All three use free tools only. No API keys. No subscriptions.


## References
- How I AI ep: https://www.youtube.com/watch?v=LJ1YZ3Uek3g
- Figma file Hilary demo’ed: [https://www.writerbuilder.com/howiai](https://www.youtube.com/redirect?event=video_description&redir_token=QUFFLUhqbm5CdkJBVjlZaXd2QlJuR19fQzljRnJvb1NXZ3xBQ3Jtc0tsUmlCMG9YVWlaem9xQ2dnZlpobGtMYkhwdDBWZzh1MjNfZ2o2MkV4Z3NNTU9BN1BqOWhkdGJVeHhKVFE5NkpaVzBQdDEzZFdoaU9ZOWlLSHFDdFBhNjlDQmZyR3RUN2FWUkFSeEZFSW1YTXlaS00wQQ&q=https%3A%2F%2Fwww.writerbuilder.com%2Fhowiai&v=LJ1YZ3Uek3g)
- Figma with screenshots: https://www.figma.com/design/h0IohJOcQFYMPEvgYBnIJV/how-i-ai?node-id=0-1&p=f
