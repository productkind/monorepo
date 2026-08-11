---
challenge: "1 - The Brain Dump"
type: "Cheat sheet"
---
## Troubleshooting your shortcuts

This gets your Shortcuts working again when something misbehaves. It's a fix-it lookup for the two iPhone Shortcuts in this course: the **Brain Dump** (you talk, and AI sorts it into checklist notes) and the **Baby Log** (you talk, and AI saves timestamped lines to one note). Find your symptom below, and jump to the fix.

### While building the Brain Dump

**A category pops up "What checklist item name?" and the shortcut stops.**
That category came back empty, and its **Append Checklist Item** ran with nothing to add. Each category block needs its own **If (Combined Text has any value)** wrapped around the **Append Checklist Item** (drag the Append in between the **If** and **End If**). With the guard in place, an empty category is skipped instead.

**Items land in the wrong category** (for example "buy raspberries" ends up in Logistics).
That's the model's sorting judgement, and a leading verb like "buy" can pull an item the wrong way. Tighten the category definitions in your prompt: list **Food & Household first** and let it own "buy, get, or restock", and add "(not shopping)" to Logistics. Or just move the odd item by hand in Notes.

**An item comes back stripped of its meaning** (for example "call my partner" loses "about dinner tonight").
The prompt is over-trimming. Make sure your prompt says to keep the details that make each item stand on its own: what it is, why, and any time or day.

**Get Dictionary Value is reading the wrong thing.**
On the 2nd and 3rd blocks, **Get Dictionary Value** tends to auto-fill its **Dictionary** field from the action just above it, not the AI's answer. Tap it and set it back to **Response** each time.

**All the items run together on one line in the note.**
Your **Combine Text** action needs to be set to **New Lines** (not Spaces), so each item sits on its own line and becomes its own checklist item.

**Why isn't there a Find Notes action?**
There used to be. An earlier build used **Find Notes** to locate each category note, but it sometimes flipped to **Filter Notes** (which searches nothing) and broke. Picking the note directly in **Append Checklist Item** avoids that completely, so there's no Find Notes anymore.

### When you run the Brain Dump

**You tapped it, said nothing, and it invented a random list.**
With the output forced into a dictionary, the model fills empty categories with made-up items. The fix is the outer **If (Dictated Text has any value)** that wraps everything after **Dictate Text**, so an empty tap does nothing. Check it's there and wraps every action.

**Nothing sorted, or you saw a brief error.**
Now and then the model returns the wrong shape or hiccups. Run it again, it almost always sorts cleanly the second time.

**The dictation cut off before you finished.**
Two causes: the screen dimmed mid-dictation (keep it awake, give it a tap if it starts to dim), or **Stop Listening** is set to stop on a pause. For a rambly dump, set **Stop Listening** to **On Tap** so it waits for your tap.

### Sharing with your partner

**Your partner can't see the shared folder.**
Check they've accepted the folder invite, and that they're signed in to iCloud with Notes turned on. Folder sharing is Apple-to-Apple only, so if they're on Android, use the WhatsApp/message route instead.

**Tapping Recipients on the Send Message action doesn't show a "To" field.**
Delete the **Send Message** action and add it again; it usually comes back correctly.

**The category headings show asterisks instead of bold in the message.**
Single-asterisk bold only renders in **WhatsApp and Telegram**. In email and some apps the `*Logistics*` shows as plain characters. The list still comes through clearly.

**A category heading appears with nothing under it.**
That category was empty this time. It's harmless, just a bare heading.

**The message came out messy when you asked the AI to format it.**
Don't ask the model to format the WhatsApp message. Type the bold headings and line breaks yourself in the **Text** action; Private Cloud Compute sorts reliably but formats poorly.

### The Baby Log

**Nothing appends to the Baby Log note.**
Check the note exists (first line **Baby Log**), that your **Append to Note** has the **Baby Log** note picked in its note field, and that the text is the **Response** from Use Model.

**The lines have no date or time.**
The **Formatted Date** chip isn't in the prompt. Place it right after "the date and time now is:".

**ChatGPT isn't available in the model picker.**
Turn on the extension: **Settings → Apple Intelligence & Siri → Extensions → ChatGPT → Set Up → Next → Enable ChatGPT**.

**The entry stops before you finish talking.**
The Baby Log uses **Stop Listening → After Pause**, which ends on a breath, that suits a short log line. If you want longer, switch that action to **On Tap** and tap to finish.

### Hands-free triggers

**"Hey Siri, Brain Dump" cuts you off when you pause to think.**
Siri ends the dictation the moment you take a breath. For the pause-heavy Brain Dump, start it by tapping the Home Screen icon, Back Tap, or the Action Button instead. Hey Siri suits the short Baby Log.

**"Hey Siri" does nothing.**
Siri needs to be on: **Settings → Apple Intelligence & Siri**, turn on **Talk to Siri** (or **Listen for "Hey Siri"**).

**Back Tap doesn't fire the shortcut.**
Tap the back of the phone **firmly**, and make sure the screen is on (not black) first. It works even from the lock screen once set in **Settings → Accessibility → Touch → Back Tap**.
