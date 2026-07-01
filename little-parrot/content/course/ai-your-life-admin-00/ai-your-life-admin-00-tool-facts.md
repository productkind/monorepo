# Tool facts: ai-your-life-admin-00
_Checked 2026-06-28. Verify again if generating more than ~2 weeks later._

Audience: new mums, non-technical, following steps literally on their own iPhone. Tools taught: the **Shortcuts** app, the free **ChatGPT** iOS app, plus Calendar, Reminders, Notes, Siri, Back Tap, the Action Button and Dictation.

---

## Premise check

**SCOPE DECISION (2026-06-30): the course targets Apple Intelligence iPhones ONLY.** The older-iPhone ChatGPT-app (*Ask ChatGPT*) fallback has been dropped entirely to lower the learner's mental load, since Apple Intelligence is already a stated prerequisite. Path B below is retained for reference but is no longer taught. The course requires an iPhone 15 Pro / 15 Pro Max, any iPhone 16, the iPhone 17 line, or iPhone Air.

**Verdict: GO, with one framing decision the writer must make up front.**

The course's load-bearing premise is: _"It all runs on a free ChatGPT account and tools already on your iPhone, no subscription needed."_ That premise **holds**. A free ChatGPT account (or even no account) can drive ChatGPT from inside Shortcuts, and the answer can be passed into Calendar, Reminders and Notes. Apple and OpenAI both document this. Confirmed today:

- You do **not** need ChatGPT Plus. "You don't need a ChatGPT account, but if you have one, free or paid, you can connect to your account." A paid account only raises how often you get the more capable model. (Apple Support, OpenAI Help, checked 2026-06-28.)
- The AI answer **can be fed into the next action** (e.g. Add New Reminder) as a variable, it is not stuck in a popup. (Apple Support "Use Apple Intelligence in Shortcuts", checked 2026-06-28.)

**The decision: which "ask ChatGPT" path does the course teach?** There are two, and they differ by iPhone model. This affects the whole build, so decide before generating.

1. **The iOS 26 "Use Model" action (recommended for the main build).** Built into Shortcuts on iOS 26. You add one action called *Use Model*, pick *ChatGPT* as the model, type the prompt, and its *Response* is a clean variable you route onward. This is the reliable, vendor-documented path with a proper text output. **But it needs Apple Intelligence, which is iPhone 15 Pro, 15 Pro Max, the entire iPhone 16 line (including 16e), the iPhone 17 line, and iPhone Air only.** A new mum on an iPhone 13, 14, SE or a standard 15 cannot use it. (iPhone Air added 2026-06-28 per Apple Support "How to get Apple Intelligence", https://support.apple.com/en-us/121115.)

**Confirmed native action: *Show Result.*** Challenge 1's reliable v1 ends here. *Show Result* displays the passed content in a popup/preview (and speaks it when run from Siri), which is exactly what's needed to let the mum read the three sorted lists. Source: heydingus.net "Use 'Show Result' for Troubleshooting". Checked 2026-06-28.
2. **The ChatGPT app's own "Ask ChatGPT" action (works on any iPhone with the free app).** The official ChatGPT app adds Shortcuts actions including *Ask ChatGPT*. This works on older phones with no Apple Intelligence. The catch: its output handling has historically been less clean (it has shown answers in a popup / copied to clipboard in some builds), so routing the answer cleanly into three different apps is **less reliable for a first-timer** and I could not fully confirm its current downstream-variable behaviour from vendor docs (see "Could not confirm").

**Suggested framing for the writer:** teach the **Use Model** path as the main build (it is the reliable one and the "no subscription" claim is intact), and add a short, calm aside naming which iPhones have it, with the ChatGPT-app *Ask ChatGPT* action as the fallback for older phones. Do **not** promise the slick one-tap sorting on every iPhone ever made. The honest line is "works best on iPhone 15 Pro and the 16/17 family; older iPhones can still do it through the free ChatGPT app, with a little more tapping."

**Routing reliability premise (Challenge 1, also load-bearing):** the simplest reliable approach for a non-technical first-timer is **not** to loop and add many calendar events automatically. It is to **ask ChatGPT to return its answer in a fixed, splittable format** (e.g. three labelled blocks: a calendar line, a reminders list, a notes block) and then have the shortcut show that one tidy result, or route the whole notes block into Notes and let the learner glance at the calendar/reminders lines. **Realistic v1: one tidy AI-sorted result the mum reads and acts on, or at most one event + one reminder + a notes block. Multi-item looping (auto-creating five separate reminders from one dump) is achievable in Shortcuts but is fragile and beyond a first-timer; keep it out of v1.** Frame the brain dump's value as "AI sorts your jumble into clear buckets," not "AI silently files everything for you with zero review."

---

## ChatGPT iOS app: https://help.openai.com/en/articles/7993358-chatgpt-ios-app-siri-and-shortcuts

**Prerequisites (path-dependent):**
- **Use Model path (main build):** No ChatGPT app install required and **no account required**. ChatGPT is built into Apple Intelligence at the OS level. The learner enables it once in *Settings → Apple Intelligence & Siri → Extensions → ChatGPT → Set Up*. A **free** ChatGPT account is **optional** and only matters for saving questions to ChatGPT history; signing in is done **in Settings** (*Settings → Apple Intelligence & Siri → ChatGPT → Sign In*), not via the app. No Plus subscription required. (Confirmed: Apple Support "Use ChatGPT with Apple Intelligence"; MacRumors / MacStories / 9to5Mac iOS 18.2 integration coverage, the feature persists in iOS 26. Re-checked 2026-06-28.)
- **Ask ChatGPT fallback path (older iPhones only):** The free ChatGPT iOS app **is** required and you must be signed in, because that Shortcuts action is contributed by the app. No Plus required.

Correction note (2026-06-28): an earlier draft of this sheet implied the app was always required. It is not, for the main Use Model path. This strengthens the course's "nothing to install, no account needed" angle.

### Task: Use ChatGPT from inside a Shortcut to sort/format dictated text

- **Path A, iOS 26 "Use Model" (main build, needs Apple Intelligence):**
  - **Steps (as of 2026-06-28):** 1. First-time only: *Settings* → *Apple Intelligence & Siri* → set up the *ChatGPT* extension (tap *ChatGPT*, then *Enable ChatGPT*; sign in to a free account if you want history). 2. In your shortcut, add the *Use Model* action. 3. In the model picker choose *ChatGPT*. 4. Type your prompt in the text field under *Use Model* and insert the dictated text variable into it. 5. Use the action's *Response* (a Magic Variable, the blue token) in the next action.
  - **Exact labels:** *Use Model* (the action), *ChatGPT* (the model option, listed as an Extension model), *Response* (its output variable), *Enable ChatGPT* (the no-account toggle in setup).
  - **Cost/credits:** Free. Free account is fine; Plus only increases how often the more capable model is used.
  - **Gotchas:** Only on iPhone 15 Pro / Pro Max, all iPhone 16 (incl. 16e) and iPhone 17 models. Not on iPhone 14, 13, SE, or standard iPhone 15. There is an optional *Follow Up* setting that shows the response and lets you tweak before it passes on; for a hands-free flow you usually leave that off.
  - **Source:** Apple Support, "Use Apple Intelligence in Shortcuts on iPhone" (apple.com/guide/iphone/iph78c41eaf8); "Use ChatGPT with Apple Intelligence on iPhone" (apple.com/guide/iphone/iph00fd3c8c2). Checked 2026-06-28.

- **Path B, ChatGPT app's "Ask ChatGPT" action (fallback, any iPhone with the free app):**
  - **Steps (as of 2026-06-28):** 1. Install the free ChatGPT app and sign in. 2. In Shortcuts, add an action and search *ChatGPT*; the app contributes actions including *Ask ChatGPT*. 3. Put your prompt + dictated text into it. 4. Use its result downstream.
  - **Exact labels:** *Ask ChatGPT* (the app-provided action). The ChatGPT app also exposes voice/voice-conversation actions and an *Open ChatGPT Voice* control for the Action Button.
  - **Cost/credits:** Free account works; you must be signed in to the ChatGPT app. No Plus required.
  - **Gotchas:** Output handling is less clean than *Use Model*; in some builds the answer has appeared in a popup / been copied to the clipboard rather than flowing neatly as a variable into three separate app actions. Treat this as the "still works, a bit more tapping" path, not the slick one for a non-technical first build. See "Could not confirm".
  - **Source:** OpenAI Help "ChatGPT iOS app - Siri and Shortcuts" (help.openai.com/en/articles/7993358); AppleInsider "How to use Siri with ChatGPT on older iPhones without Apple Intelligence"; Yahoo/Tech reprint confirming free-account use. Checked 2026-06-28.

### Task: Free-account usage limits a mum would realistically hit
- **Limit (as of 2026-06-28):** On the free plan, roughly **10 messages every 5 hours** on the default capable model, after which it silently falls back to a faster "mini" model until the window resets. The mini fallback still answers; it is just less capable. A mum running a brain dump and a few baby-log entries across a day is unlikely to be fully blocked, but heavy use in one burst can tip into the mini model.
- **Cost/credits:** Free. Limits are dynamic and can shift with region/load.
- **Gotchas:** Don't promise "unlimited." The honest line is "more than enough for a few brain dumps and a handful of log entries a day; if you go on a big run it may switch to a quicker, simpler model for a while." Model names churn (the GPT-5.x family was current as of early 2026); avoid hard-coding a model name in the course.
- **Source:** Multiple 2026 limit trackers reflecting OpenAI's published free-tier behaviour (Northflank, AI-Toolbox, makesaasbetter). Vendor exact numbers vary; treat "~10 / 5 hours then mini fallback" as the working figure. Checked 2026-06-28.

---

## Shortcuts app (native actions): https://support.apple.com/guide/shortcuts/welcome/ios

**Prerequisites:** Shortcuts is pre-installed on every iPhone. No account or cost.

### Task: Dictate the brain dump / the log entry
- **Steps (as of 2026-06-28):** 1. Add the *Dictate Text* action as the first step. 2. (Optional) set its language. 3. Its output is the spoken text, passed to the next action.
- **Exact labels:** *Dictate Text*.
- **Cost/credits:** Free.
- **Gotchas:** *Dictate Text* uses the device's dictation; pauses can end dictation early, so tell the learner to keep talking and not pause too long.
- **Source:** Apple Support Shortcuts guide; MacMost "Creating Shortcuts That Accept Voice Input". Checked 2026-06-28.

### Task: Add an event to Calendar
- **Exact labels:** *Add New Event* ("Creates a new event and adds it to the selected calendar"). Not "Create event" / "New appointment".
- **Cost/credits:** Free.
- **Gotchas:** It needs a date/time; if the AI's text is vague the event time may be wrong. For v1, prefer routing the calendar items into the readable result the mum reviews rather than auto-creating events from loose phrasing.
- **Source:** iMore "All the Shortcuts actions: Apple apps". Checked 2026-06-28.

### Task: Add a to-do to Reminders
- **Exact labels:** *Add New Reminder* ("Creates a new reminder and adds it to the selected list of reminders"). A beginner might look for "Add to-do" or "Add task".
- **Cost/credits:** Free.
- **Source:** iMore "All the Shortcuts actions: Apple apps". Checked 2026-06-28.

### Task: Put the rest into Notes / append a timestamped line to ONE running note
- **Steps (as of 2026-06-28):** 1. Add *Find Notes* and filter by *Name* so it returns the one note (e.g. a note titled "Baby Log"). 2. Add *Append to Note* and pass the found note (its Magic Variable) as the target, then the text to append. The text is added at the bottom of that note. 3. To timestamp: add a *Format Date* action on the *Current Date* variable, and put the formatted date in front of the appended line.
- **Exact labels:** *Find Notes*, *Append to Note* (appends at the bottom, does not replace), *Create Note* (only if making a new note), *Format Date*, *Current Date*. The grouped Notes actions historically also include *Show Note*.
- **Cost/credits:** Free.
- **Gotchas:** *Append to Note* needs an existing note to target; have the learner create the "Baby Log" note once by hand first, otherwise *Find Notes* returns nothing. Pinning to "one specific note" is done by the *Find Notes* name filter, not a setting on *Append to Note*. *Current Date* is a built-in variable; tapping it lets you pick Short/Medium/Long or *Custom* formats (Custom uses Unicode UTS #35 patterns, e.g. text in single quotes for literals). Keep the learner on a preset format (Short/Medium) rather than custom patterns.
- **Source:** MacStories "Shortcuts ... new Apple Notes actions" (Find Note + Append to Note via Magic Variable); Apple Support "Handling timestamps using Format Date" and "Custom date formats". Checked 2026-06-28.

### Task: Run a named shortcut by voice with Siri
- **Steps (as of 2026-06-28):** Name the shortcut something easy to say (e.g. "Brain Dump"), then say "Hey Siri, Brain Dump" (or "Siri, Brain Dump"). The shortcut's name is its Siri phrase by default.
- **Cost/credits:** Free.
- **Gotchas:** Pick a name that isn't easily confused with an app or contact. Avoid names that clash with built-in Siri commands.
- **Source:** OpenAI Help "ChatGPT iOS app - Siri and Shortcuts"; Apple Shortcuts guide. Checked 2026-06-28.

---

## Triggers and device features

### Task: Add a shortcut to the Home Screen / Lock Screen
- **Exact labels:** In the shortcut's share/details menu, *Add to Home Screen*. Lock Screen access is via adding a *Shortcuts* widget when customising the Lock Screen, or a *Control* on the Lock Screen in iOS 26.
- **Cost/credits:** Free.
- **Gotchas:** "Add to Lock Screen" is not a single button in the same place as Home Screen; on current iOS it is done through Lock Screen customisation / Control Center controls. Confirm exact wording on a live device before writing literal taps (see "Could not confirm").
- **Source:** Apple Support Shortcuts guide (general); exact current Lock Screen wording not pinned from vendor docs. Checked 2026-06-28.

### Task: Run a shortcut by tapping the back of the phone (Back Tap)
- **Steps (as of 2026-06-28):** 1. *Settings* → *Accessibility* → *Touch* → scroll down to *Back Tap*. 2. Choose *Double Tap* or *Triple Tap*. 3. Scroll to the *Shortcuts* section of that list and pick your shortcut. Then double/triple-tap the back of the phone to run it.
- **Exact labels:** *Settings* → *Accessibility* → *Touch* → *Back Tap* → *Double Tap* / *Triple Tap*.
- **Cost/credits:** Free.
- **Gotchas:** Back Tap is iPhone 8 and newer only (covers essentially all of the audience). It can misfire in a case or when picking the phone up; triple tap is slightly less prone to accidental triggers.
- **Source:** Apple Support "Run shortcuts by tapping the back of your iPhone" (apple.com/guide/shortcuts/apd897693606); AbilityNet iOS 26 Back Tap guide. Checked 2026-06-28.

### Task: Use the Action Button (the "calm factual aside" about which models have it)
- **Facts (as of 2026-06-28):** The Action Button exists on **iPhone 15 Pro and 15 Pro Max; the entire iPhone 16 line including iPhone 16e; the iPhone 17 line; and iPhone Air**. It does **not** exist on the standard iPhone 15 / 15 Plus, or any iPhone 14 and earlier (those have the ring/silent switch). Set it via *Settings* → *Action Button*, then swipe to *Shortcut* and choose your shortcut. The ChatGPT app also offers an *Open ChatGPT Voice* control that can be mapped to it.
- **Cost/credits:** Free.
- **Gotchas:** Don't tell every learner to "press your Action Button"; many won't have one. Frame as "if your iPhone has the Action Button (15 Pro, 16, 17 family)...". Older phones use Back Tap or the Home Screen icon instead.
- **Source:** Apple Support "Use and customize the Action button on iPhone" (apple.com/guide/iphone/iphe89d61d66); MacRumors Action Button guide. Checked 2026-06-28.

### Task: Dictate in another language (e.g. Polish)
- **Steps (as of 2026-06-28):** 1. *Settings* → *General* → *Keyboard* → *Keyboards* → *Add New Keyboard* and add the language (e.g. Polish). 2. When dictating, press and hold the dictation microphone on the keyboard to pick the dictation language. *Dictate Text* in Shortcuts also has a language setting on the action.
- **Exact labels:** *Settings* → *General* → *Keyboard* → *Keyboards* → *Add New Keyboard*.
- **Cost/credits:** Free.
- **Gotchas:** Polish dictation is supported (Apple added Polish among others). Dictation availability varies by region; tell the learner to check it's listed. ChatGPT itself handles non-English text fine, so a Polish dictation flows through and comes back sorted in Polish if the prompt asks for that.
- **Source:** Apple Support "Dictate text on iPhone" (apple.com/guide/iphone/iph2c0651d2) and "Commands for dictating text"; Apple release notes listing Polish dictation. Checked 2026-06-28.

### Fact: Current iOS version for "go to Settings" wording
- **As of 2026-06-28:** Current is **iOS 26.5** (iPhone 11 through 16e) and **iOS 26.5.1** (iPhone 17 line / iPhone Air). iOS 26 introduced the "Liquid Glass" redesign. Use "iOS 26" in any version-specific wording; iOS 27 is expected in autumn 2026.
- **Source:** Apple Support "About iOS 26 Updates"; Wikipedia iOS 26 / version history. Checked 2026-06-28.

### Task: Share the Baby Log note with a doctor
- **Facts:** A Notes note can be shared via the standard *Share* sheet (send as text, or share the note). This is straightforward, so the "show your doctor / health visitor" claim holds. Exact current share-sheet wording for "send a copy" vs "collaborate" not pinned from vendor docs; the capability is not in doubt.
- **Source:** Apple Notes general behaviour; not separately fetched today. Treat capability as confirmed, exact label as "verify on device".

---

## Could not confirm

- **The ChatGPT app's own _Ask ChatGPT_ action returning a clean downstream variable in current (2026) builds.** Vendor docs (help.openai.com/articles/7993358) returned HTTP 403 to automated fetch, so I relied on third parties. Third parties agree the action exists and is free, but disagree on output: some describe a usable result copied to clipboard, an OpenAI community post describes a display-only popup. **What the writer should do:** for the main build, teach the iOS 26 *Use Model* path (vendor-confirmed clean *Response* variable) and treat the ChatGPT-app action as the older-phone fallback, framed as "works, a bit more tapping," not as the slick sorter. If the course must support older phones as the primary path, test *Ask ChatGPT* on a real older iPhone first.
- **Exact current "Add to Lock Screen" tap sequence on iOS 26 — now broadly confirmed.** Flow: long-press the Lock Screen → *Customize* → tap the plus to add a Control Center control → choose the Shortcuts control → *Done*. Source: MacRumors "iOS 26 Lock Screen customizations" (https://www.macrumors.com/2025/09/16/ios-26-whats-new-iphone-lock-screen/), checked 2026-06-28. The course keeps deliberately-vague wording ("look under *Customise*"), which is fine; this entry is upgraded from "could not confirm" to confirmed-flow should exact taps be wanted later.
- **Exact free-account message numbers.** "~10 messages / 5 hours then a mini-model fallback" is the working figure from 2026 trackers, but OpenAI states free limits are dynamic. **What to do:** keep the course's wording qualitative ("plenty for a few dumps and some log entries a day; heavy bursts may switch to a quicker model"), don't print a hard number.
- **Whether _Use Model_ / ChatGPT is available in the learner's specific country.** Apple Intelligence and ChatGPT integration are not in all regions/languages. **What to do:** add a one-line "if it's available in your region and language" caveat rather than asserting universal availability.
