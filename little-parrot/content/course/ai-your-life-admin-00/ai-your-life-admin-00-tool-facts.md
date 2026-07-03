# Tool facts: ai-your-life-admin-00
_Checked 2026-06-28. Verify again if generating more than ~2 weeks later._

Audience: new mums, non-technical, following steps literally on their own iPhone. Tools taught: the **Shortcuts** app, the free **ChatGPT** iOS app, plus Calendar, Reminders, Notes, Siri, Back Tap, the Action Button and Dictation.

---

## Premise check

**SCOPE DECISION (2026-06-30): the course targets Apple Intelligence iPhones ONLY.** The older-iPhone ChatGPT-app (*Ask ChatGPT*) fallback has been dropped entirely to lower the learner's mental load, since Apple Intelligence is already a stated prerequisite. Path B below is retained for reference but is no longer taught. The course requires an iPhone 15 Pro / 15 Pro Max, any iPhone 16, the iPhone 17 line, or iPhone Air.

**SCOPE DECISION (2026-07-03): the shortcut must now ACTUALLY FILE its output.** The owner has decided the brain dump no longer just shows a tidy result: events go into Calendar, to-dos into Reminders, and the notes bucket into Notes. This supersedes the "one tidy result the mum reads and acts on" framing below. See the full **Addendum: routing build (checked 2026-07-03)** at the foot of this file for the recommended beginner build, exact labels, and the fragility flags that come with auto-filing.

**Verdict: GO, with one framing decision the writer must make up front.**

The course's load-bearing premise is: _"It all runs on a free ChatGPT account and tools already on your iPhone, no subscription needed."_ That premise **holds**. A free ChatGPT account (or even no account) can drive ChatGPT from inside Shortcuts, and the answer can be passed into Calendar, Reminders and Notes. Apple and OpenAI both document this. Confirmed today:

- You do **not** need ChatGPT Plus. "You don't need a ChatGPT account, but if you have one, free or paid, you can connect to your account." A paid account only raises how often you get the more capable model. (Apple Support, OpenAI Help, checked 2026-06-28.)
- The AI answer **can be fed into the next action** (e.g. Add New Reminder) as a variable, it is not stuck in a popup. (Apple Support "Use Apple Intelligence in Shortcuts", checked 2026-06-28.)

**The decision: which "ask ChatGPT" path does the course teach?** There are two, and they differ by iPhone model. This affects the whole build, so decide before generating.

1. **The iOS 26 "Use Model" action (recommended for the main build).** Built into Shortcuts on iOS 26. You add one action called *Use Model*, pick *ChatGPT* as the model, type the prompt, and its *Response* is a clean variable you route onward. This is the reliable, vendor-documented path with a proper text output. **But it needs Apple Intelligence, which is iPhone 15 Pro, 15 Pro Max, the entire iPhone 16 line (including 16e), the iPhone 17 line, and iPhone Air only.** A new mum on an iPhone 13, 14, SE or a standard 15 cannot use it. (iPhone Air added 2026-06-28 per Apple Support "How to get Apple Intelligence", https://support.apple.com/en-us/121115.)

**Confirmed native action: *Show Result.*** Challenge 1's reliable v1 ends here. *Show Result* displays the passed content in a popup/preview (and speaks it when run from Siri), which is exactly what's needed to let the mum read the three sorted lists. Source: heydingus.net "Use 'Show Result' for Troubleshooting". Checked 2026-06-28.

> **CORRECTION (2026-07-03): the action is now labelled *Show Content*, not *Show Result*.** Apple renamed *Show Result* to *Show Content* in iOS 26 (the owner confirmed this on a real device). It is the same display-a-result action, now also able to show scrollable lists (calendar events, reminders, etc.). Anywhere this sheet or the course says *Show Result*, read *Show Content* for iOS 26. Note too that the 2026-07-03 scope change means the shortcut now files its output rather than only showing it, so *Show Content* becomes an optional "here's what I just filed" confirmation, not the endpoint. Full detail and sources in the addendum at the foot of this file. Checked 2026-07-03.
2. **The ChatGPT app's own "Ask ChatGPT" action (works on any iPhone with the free app).** The official ChatGPT app adds Shortcuts actions including *Ask ChatGPT*. This works on older phones with no Apple Intelligence. The catch: its output handling has historically been less clean (it has shown answers in a popup / copied to clipboard in some builds), so routing the answer cleanly into three different apps is **less reliable for a first-timer** and I could not fully confirm its current downstream-variable behaviour from vendor docs (see "Could not confirm").

**Suggested framing for the writer:** teach the **Use Model** path as the main build (it is the reliable one and the "no subscription" claim is intact), and add a short, calm aside naming which iPhones have it, with the ChatGPT-app *Ask ChatGPT* action as the fallback for older phones. Do **not** promise the slick one-tap sorting on every iPhone ever made. The honest line is "works best on iPhone 15 Pro and the 16/17 family; older iPhones can still do it through the free ChatGPT app, with a little more tapping."

**Routing reliability premise (Challenge 1, also load-bearing):** the simplest reliable approach for a non-technical first-timer is **not** to loop and add many calendar events automatically. It is to **ask ChatGPT to return its answer in a fixed, splittable format** (e.g. three labelled blocks: a calendar line, a reminders list, a notes block) and then have the shortcut show that one tidy result, or route the whole notes block into Notes and let the learner glance at the calendar/reminders lines. **Realistic v1: one tidy AI-sorted result the mum reads and acts on, or at most one event + one reminder + a notes block. Multi-item looping (auto-creating five separate reminders from one dump) is achievable in Shortcuts but is fragile and beyond a first-timer; keep it out of v1.** Frame the brain dump's value as "AI sorts your jumble into clear buckets," not "AI silently files everything for you with zero review." _(2026-07-03: the owner has since chosen full auto-filing; the addendum below reconciles that decision with these reliability limits, i.e. what is safe to file automatically and what stays fragile.)_

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
- **Gotchas:** *Dictate Text* uses the device's dictation; pauses can end dictation early, so tell the learner to keep talking and not pause too long. _(2026-07-03: exact settings labels now confirmed, see addendum: *Language* and *Stop Listening* with values *After Pause* / *After Short Pause* / *On Tap*.)_
- **Source:** Apple Support Shortcuts guide; MacMost "Creating Shortcuts That Accept Voice Input". Checked 2026-06-28.

### Task: Add an event to Calendar
- **Exact labels:** *Add New Event* ("Creates a new event and adds it to the selected calendar"). Not "Create event" / "New appointment".
- **Cost/credits:** Free.
- **Gotchas:** It needs a date/time; if the AI's text is vague the event time may be wrong. For v1, prefer routing the calendar items into the readable result the mum reviews rather than auto-creating events from loose phrasing. _(2026-07-03: this is the single most fragile part of the new auto-filing build, see addendum for the reliable pattern and a dated-reminder fallback.)_
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

---

## Addendum: routing build (checked 2026-07-03)

_This addendum answers the owner's five 2026-07-03 questions: the shortcut must now file its output into Calendar, Reminders and Notes rather than end on a summary popup. Every fact carries a source and date. British English throughout. iOS 26.5 is current._

### 0. The headline reliability picture (read first)

Two things in the new "auto-file" plan are genuinely fragile for a non-technical first-timer, and the writer needs to know before building:

1. **Structured (Dictionary/List) output is only *guaranteed* when the model is one of Apple's own (On This iPhone / Private Cloud Compute), not ChatGPT.** The *Use Model* action does offer an output-type menu for every model, but only Apple's Foundation Models use guided generation to *force* a valid typed result. With *ChatGPT* selected, a typed result is coerced from whatever text ChatGPT returns, so it can occasionally fail to parse. (See task 1.)
2. **Auto-creating dated Calendar events from spoken phrasing ("health visitor Tuesday at 11") is the least reliable step of all**, because the date has to survive: speech to text, ChatGPT's rephrasing, and Shortcuts' date coercion. (See task 2b.)

Everything else (to-dos into Reminders, the notes bucket into Notes) is reliable. The recommended build in task 2 keeps the fragile date step optional and offers a dated-reminder fallback.

### 1. Use Model structured output, and whether it works with ChatGPT

- **Can you request a structured type?** Yes. In the *Use Model* action you tap the **Output** pop-up menu and choose the return type. The available options are **Automatic, Text, Number, Date, Boolean, List, Dictionary** (six explicit types plus *Automatic*).
- **Exact labels:** the action is *Use Model*; the model picker offers *On This iPhone*, *Private Cloud Compute*, and *ChatGPT* (labelled as the Extension model); the type chooser is the *Output* pop-up menu; the result variable is *Response*. There is also a *Follow Up* toggle.
- **Does typed output work with ChatGPT, or only Apple models?** The menu is offered **regardless of the chosen model** (MacStories: "Regardless of the model you're using, you can tell the Use Model action to return a response with an 'Automatic' format or one of six custom formats: Text, Number, Date, Boolean, List, Dictionary"). So the UI does let you ask for a *Dictionary* with ChatGPT selected. **But reliability differs by model.** Apple's *On This iPhone* / *Private Cloud Compute* models use guided generation (the Foundation Models framework) and reliably return a valid typed object. With *ChatGPT*, the typed result is coerced from ChatGPT's text reply, and no vendor source guarantees it will always parse. I could **not** find an Apple or OpenAI statement that "ChatGPT in Use Model returns text only", so the honest position is: *typed output is offered for ChatGPT but not guaranteed; Apple's own models are the dependable structured path.*
- **Recommendation for this course:** if you want a reliable *Dictionary* out of one AI call, use *On This iPhone* or *Private Cloud Compute* (still free, still no account, and it keeps the "runs on your phone" angle even more literally). If you keep *ChatGPT* for its stronger sorting, either keep *Output* on *Text* and split it yourself, or accept the occasional re-run. This is a genuine premise nudge worth raising with the owner.
- **Sources:** MacStories, "I Have Many Questions About Apple's Updated Foundation Models and the (Great) 'Use Model' Action in Shortcuts" (https://www.macstories.net/notes/i-have-many-questions-about-apples-updated-foundation-models-and-the-great-use-model-action-in-shortcuts/); MacStories, "iOS and iPadOS 26: The MacStories Review", p.8 (https://www.macstories.net/stories/ios-and-ipados-26-the-macstories-review/8/); Apple Support, "Use Apple Intelligence in Shortcuts on iPhone" (https://support.apple.com/guide/iphone/use-apple-intelligence-in-shortcuts-iph78c41eaf8/ios). Checked 2026-07-03.

### 2. The recommended beginner build: one AI answer into three apps

**Recommended shape:** one *Use Model* call that returns a **Dictionary** with three keys (`events`, `todos`, `notes`), then three routing blocks. Ask for a Dictionary (not three separate AI calls) so you spend one message, not three, against the free-ChatGPT ~10-per-5-hours limit. If the owner wants maximum reliability of the Dictionary step, set the model to *On This iPhone* per task 1; if she keeps *ChatGPT*, the same build works but the Dictionary may occasionally need a re-run.

Full action sequence, exact labels:

1. *Dictate Text* (the brain dump). See task 4 for its settings.
2. *Use Model*: choose the model, set the *Output* pop-up to *Dictionary*, and write a prompt that (a) includes the *Dictated Text* variable, (b) includes today's date so the model can resolve "Tuesday" (insert the *Current Date* variable into the prompt), and (c) asks for exactly these keys: `todos` (a list of short strings), `events` (a list of strings each formatted `Title @ YYYY-MM-DD HH:mm`), and `notes` (one text block).
3. **To-dos to Reminders (reliable):** *Get Dictionary Value* → *Value* for key `todos` → *Repeat with Each* → inside the loop, *Add New Reminder* with *Title* set to the *Repeat Item* variable, and the list chosen by tapping the list name on the action (default is *Reminders*) → *End Repeat*. *Add New Reminder* creates one reminder per run, so the loop is what produces several from one dump; it cannot take a whole list and split it itself.
4. **Notes bucket to Notes (reliable):** *Get Dictionary Value* → *Value* for key `notes` → *Create Note* with that text (or, for the Baby Log pattern, *Find Notes* by name then *Append to Note* into the existing running note).
5. **Events to Calendar (fragile, keep optional):** *Get Dictionary Value* → *Value* for key `events` → *Repeat with Each* → inside, *Add New Event* with the *Repeat Item* as the event, supplying the start date from the `YYYY-MM-DD HH:mm` portion (a fixed format coerces far more reliably than raw speech). *End Repeat*.
6. *(Optional)* *Show Content* at the end to display "here's what I filed" so the mum can glance and correct.

**Answers to the specific sub-questions:**
- **(a) Reminders, one per to-do:** yes, you need *Repeat with Each* + *Add New Reminder*. *Add New Reminder* does **not** accept a list and create several at once; it makes one reminder. The learner selects the target list by tapping the list name shown on the *Add New Reminder* action (default *Reminders*). Source: Apple Support "Use Repeat actions in Shortcuts" (https://support.apple.com/guide/shortcuts/use-repeat-actions-apdc11deb2c1/ios); MacStories "Shortcuts Corner: Creating Multiple Reminders in a Row" (https://www.macstories.net/ios/shortcuts-corner-creating-multiple-reminders-in-a-row-playing-audio-on-homepod-and-reading-tech-news/). Checked 2026-07-03.
- **(b) Calendar events from spoken items:** *Add New Event* needs a start date. Shortcuts *does* parse some natural language ("this Friday") in a date field, but arbitrary ChatGPT phrasing is not dependable, so have the model emit a fixed `YYYY-MM-DD HH:mm` string and feed that; *Get Dates from Input* can parse a date out of a text line if needed. **If auto-creating dated events proves flaky on device, the most reliable simple alternative is to file each event as a *dated reminder with an alert* instead of a calendar event** (reminders take a due date/alert reliably and need no separate parse step). Recommend the writer decide this after testing on a real device. Source: Apple Support "Use dates as written language in Shortcuts" (https://support.apple.com/guide/shortcuts/dates-as-written-language-apdc6348bca9/ios); leancrew "Parsing date strings in Shortcuts" (https://leancrew.com/all-this/2020/09/parsing-date-strings-in-shortcuts/); MacStories "Shortcuts Rewind: Dates, Calendars, and Beyond" (https://www.macstories.net/stories/shortcuts-rewind-dates-calendars-and-beyond/). Checked 2026-07-03.
- **(c) Notes bucket:** *Create Note* (exact label) makes a new note from the text. Gotcha: it creates a fresh note each run, which is right for the brain dump but wrong for the Baby Log; for a single running note use *Find Notes* (by *Name*) + *Append to Note* instead (already documented above). Source: Apple Support Shortcuts guide; MacStories Apple Notes actions coverage. Checked 2026-07-03.
- **Why one Dictionary call, not three separate Use Model calls:** three calls would spend three messages against the free ~10-per-5-hours limit and triple the latency; one Dictionary call plus *Get Dictionary Value* is cheaper and faster. The alternative "three labelled text blocks + *Split Text*" also works and avoids the ChatGPT-Dictionary reliability caveat, but *Split Text* + trimming is fiddlier for a first-timer than *Get Dictionary Value*. Source (dictionaries): Apple Support "Get Dictionary Value action" (https://support.apple.com/guide/shortcuts/get-dictionary-value-action-apdf01294032/ios); "Using Dictionaries in Shortcuts" (https://support.apple.com/guide/shortcuts/dictionaries-apd43b69f337/ios). Checked 2026-07-03.

**Honest caveat for the writer:** a three-app auto-filing shortcut with two *Repeat with Each* loops, *Get Dictionary Value* and date coercion is genuinely at the upper edge of "first-timer, one sitting". If the course must stay gentle, consider filing to-dos and events *both as Reminders* (events as dated reminders) so only one loop and no calendar-date parsing is needed, and keep Calendar as an optional upgrade. This preserves "it actually files" while cutting the fragile bits.

### 3. "Show Result" vs "Show Content"

- **Correct current label: *Show Content*.** Apple renamed *Show Result* to *Show Content* in iOS 26. It is the same action (display a result / preview content), now also able to show scrollable lists such as calendar events and reminders. There is no separate surviving *Show Result* action in iOS 26; it is a straight rename. The owner's on-device observation is correct.
- **Source:** Matthew Cassinelli, iOS 26 Shortcuts actions ("Show Result is now titled Show Content") (https://matthewcassinelli.com/ios-26-public-beta-shortcuts-actions-apple-intelligence-messages-notes-checklists/); 9to5Mac "iOS 26's Shortcuts app adds 25+ new actions" (https://9to5mac.com/2025/12/09/ios-26s-shortcuts-app-adds-25-new-actions-heres-everything-new/). Checked 2026-07-03.

### 4. Dictate Text settings

- **Language:** the *Dictate Text* action has a *Language* field that must be set manually to pick the dictation language before it will use it (confirmed by MacStories' multi-language dictation walkthrough).
- **Stop Listening:** the setting is *Stop Listening*, with three values: *After Pause*, *After Short Pause*, and *On Tap*. *After Pause* is the effective default (user reports; not stated in a vendor doc, treat as "verify on device").
  - *After Short Pause*: ends quickly on the first pause. Suits a **short one-line log entry** ("she fed at 60 ml").
  - *After Pause*: tolerates longer gaps before stopping. Better for a **60-second brain dump**, though even this can cut off on a long silent pause.
  - *On Tap*: keeps listening until the learner taps to stop, so it never cuts off mid-thought. **This is the safest choice for the 60-second brain dump** where the mum may pause to think, but note the reported bug that *On Tap* has sometimes behaved like *After Pause*; recommend the writer verify on device and keep a "if it stops early, keep talking / try On Tap" reassurance.
- **Recommendation:** brain dump → *On Tap* (fallback *After Pause*); baby log one-liner → *After Short Pause*.
- **Source:** MacStories "How to Dictate iMessages in Multiple Languages ... with Shortcuts" (https://www.macstories.net/ios/how-to-dictate-imessages-in-multiple-languages-from-a-widget-with-shortcuts/); Apple Support Community "Stop Listening On Tap option doesn't work in Dictate Text" (https://discussions.apple.com/thread/255582634). Checked 2026-07-03.

### 5. Add New Reminder details

- **Exact parameter labels:** *Title* (the reminder text), the target **list** (chosen by tapping the list name on the action, default *Reminders*), and a date/alert field. A reminder's due date/alert **can** be set from a variable (e.g. a *Date* variable or the `YYYY-MM-DD HH:mm` string the model produced), which is what makes the dated-reminder fallback in task 2b reliable.
- **Version note:** Apple has been rolling out a newer App Intents-based *Create Reminder* action (with extra fields: *List Section*, *Subtasks*, and separate *All-Day* / *Due Date* fields instead of one combined alert) alongside the older *Add New Reminder*. Which name shows on the learner's iOS 26.5 device is **not confirmed from current docs** (see Could not confirm). Both behave the same for this course's purposes (title + list + optional date). Tell the writer to use whichever the device shows and not to hard-code screenshots of field names beyond *Title* and the list.
- **Source:** Matthew Cassinelli "Apple Testing Updated Native Actions in Shortcuts (Starting with Reminders)" (https://matthewcassinelli.com/apple-testing-updated-native-actions-in-shortcuts-starting-with-reminders/); Automators "Reminders.app - set alert date" (https://talk.automators.fm/t/reminders-app-set-alert-date-time-and-location-help/7295). Checked 2026-07-03.

### Later confirmations (accuracy critic, 2026-07-03)

- **ChatGPT setup screen labels:** *Enable ChatGPT* (no-account path) and *Use ChatGPT with an Account* (account path) both confirmed, via *Settings → Apple Intelligence & Siri → Extensions → ChatGPT → Set Up*. Source: Apple Support "Use ChatGPT with Apple Intelligence on iPhone" (https://support.apple.com/guide/iphone/use-chatgpt-with-apple-intelligence-iph00fd3c8c2/ios); OpenAI Help "Setting up ChatGPT with Apple Intelligence" (https://help.openai.com/en/articles/10269382-setting-up-chatgpt-with-apple-intelligence). Checked 2026-07-03.
- **Format Date for a time-only stamp:** set *Date Format* to *None* and *Time Format* to *Short* to get "9:41 am"-style output; picking the *Short* Date Format alone shows a date, not the time. Source: Apple Support "Date and time formats in Shortcuts" (https://support.apple.com/guide/shortcuts/date-and-time-formats-apdfbad418ca/ios). Checked 2026-07-03.

### Could not confirm (2026-07-03)

- **Whether *ChatGPT*-in-*Use Model* reliably honours a requested *Dictionary*/typed output.** The UI offers the type for all models (MacStories, "regardless of the model"), but no vendor source guarantees ChatGPT's coerced result always parses; Apple's own models are the guaranteed structured path. **What to do:** either use *On This iPhone*/*Private Cloud Compute* for the structured call, or test the ChatGPT Dictionary on a real device and add a "if it looks wrong, run it again" note.
- **The *Stop Listening* default value.** "*After Pause*" is the effective default per user reports, not a vendor doc, and *On Tap* has a reported bug. **What to do:** verify on device; keep a reassurance line either way.
- **Whether the current iOS 26.5 device shows *Add New Reminder* or the newer *Create Reminder*.** Docs describing *Create Reminder* date from the iOS 18 beta; the current-device label is unconfirmed. **What to do:** verify on device before writing literal field names; both work for this build.
- **Exact *Add New Event* start-date behaviour with a variable on iOS 26.5** (does the fixed `YYYY-MM-DD HH:mm` string coerce cleanly, or is *Get Dates from Input* required?). **What to do:** test on a real device; if it is fragile, switch events to dated reminders per task 2b.
