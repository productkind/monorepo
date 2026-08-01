---
challenge: "7 - Get Feedback on What You've Built"
type: "Guide"
---
## Run Your First User Test

A step-by-step script for a 15-minute user test, plus the questions to ask when you have more time.

### Before the test: set up

**Who to invite:** Someone who matches your persona, the profile of your target user, or at least someone who has the problem your product solves. One person is enough for a first test.

**What to prepare:**
- [ ] Your app is ready to use (published online, or open on your own screen)
- [ ] You know what you want to learn (pick 1-2 things you're unsure about)
- [ ] You have a way to take notes (recording your session is a great way to keep your eyes on the person rather than a screen)

### The script

#### Opening (2 minutes)

Say something like:

> "Thanks for helping me test this. I'm building an app for [who it's for] and I'd love to see how it feels to use it. There are no wrong answers. If something is confusing or frustrating, that's the app's fault, not yours. I want to hear the honest truth because it helps me improve it."

This puts the person at ease and gives them permission to be critical.

#### The task (6 minutes)

Give them the app and a simple task that matches your core user flow. Don't explain how the app works. Describe the goal and let them find their own way there.

> "Imagine you're [describe their situation]. Try to [the main thing your user would do]."

**For the Book Club Organiser, this might be:**
> "Imagine you run a book club and you want to suggest a book for next month. What would you do?"

While they're using the app:
- **Watch their face and hands.** Where do they hesitate? Where do they look confused? Where do they smile?
- **Don't help them.** If they get stuck, resist the urge to point at the right button. Instead, ask: "What are you looking for?" Their answer tells you what's missing or unclear.
- **Write down what you see**, not what you think. "She tapped the header three times" is an observation. "She couldn't find the button" is an interpretation. Capture the observation first.

#### The questions (5 minutes)

After they've finished (or got stuck), ask these three questions:

**1. "What were you trying to do, and how did it go?"**
This reveals whether the app's purpose is clear and whether they could complete the task. If they describe something different from what you intended, your app may not be communicating its purpose well.

**2. "What frustrated you or confused you?"**
This surfaces usability problems and bugs. Don't defend your choices. Write down what they say, word for word where you can. If they say "nothing", ask: "Was there any moment where you paused or weren't sure what to do next?"

**3. "What would make this more useful for you?"**
This tells you what to build next. Listen for things that align with activities already on your story map. If they suggest something you hadn't thought of, that's even more valuable.

#### Closing (2 minutes)

> "This was really helpful, thank you. Would you be open to trying it again once I've made some improvements?"

Testers who stay involved will see how your product changes over time, and some may go on to recommend it to people they know.

### After the test: turn observations into prompts

Take your notes and sort them into three categories:

| What you observed | What it means | What to do |
|---|---|---|
| **They couldn't find something** | The design needs to make it more visible | Prompt your AI app builder to make the button or link more prominent or move it |
| **They expected something that doesn't exist** | A feature may be missing from your MVP | Check your story map. Is this a detail you cut that should come back? |
| **They completed the task but it felt slow or awkward** | The flow needs simplifying | Prompt Lovable to reduce the number of steps or clarify the interface |
| **They liked something** | Keep it. Don't redesign what works. | Note it so you don't accidentally change it later |

**Example prompt from a test observation:**

Observation: "She scrolled up and down three times looking for the 'Add book' action."

A good fix prompt does three things: it describes what you watched happen, names the change in design words, and fences off everything you don't want touched.

Prompt for Lovable:
```
On the /books page, the "Add Book" button sits underneath the list. I watched someone scroll up and down three times looking for a way to add a book, so it needs to be visible without scrolling.

- Look: move the button above the list, at the top of the page. Make it full width, in the same style as the main button on the voting page, and change its label from "Add Book" to "Suggest a book".

- Behaviour: tapping it opens the suggestion form that already exists. On a long list, the button stays visible at the top of the screen as the page scrolls.

Leave the suggestion form, the voting page, and the rest of this page as they are.
```

That `/books` at the start is the page's address inside your app, the part that appears after your domain name in the browser bar. Naming it saves Lovable guessing which screen you mean, and it's worth getting into the habit: you can read the address of any page straight off the browser bar while you're looking at it.

Then check it yourself: open the app and try the same task.

Corner cases can wait for a second prompt. Once the button is where you want it, send a smaller follow-up:

```
On the /books page, when nobody has suggested a book yet, show the line "No books suggested yet" below the button.
```

Keeping them apart means each change is small enough to check.

If the fix worked, put it in front of the same tester next time and watch whether the hunting stops.

### Question bank for deeper conversations

If you have more time or want to go deeper in follow-up sessions, pick from these:

**Understanding how they currently solve the problem:**
- "How do you handle [the problem] right now?"
- "What tools or workarounds are you using today?"
- "What's the most annoying part of your current approach?"

**Testing your core assumptions.** People are poor at predicting what they'll do later, and they'll say "yes, I'd use that" to be kind. Ask about what has already happened, where the answers are facts:
- "Tell me about the last time [the problem] came up. What did you do?"
- "How often did that happen?"
- "What have you tried before, and why did you stop using it?"

Then ask for something real, which tells you more than any opinion:
- "Shall we set this up for your book club's next round?"
- "Can I add you now and check back after your next meeting?"

A yes with a date in it tells you more than an enthusiastic compliment. A polite "maybe later" is useful too: it usually means the problem isn't painful enough yet, which is worth knowing before you build more.

**Prioritising what to build next:**
- "If I could only add one thing, what would make the biggest difference for you?"
- "Which parts of this have you needed in the last month?"
- "What would you tell a friend this app does?"

If you're looking for an even broader set of feedback questions for after you've launched, the [User Feedback Question Bank](https://littleparrot.app/nest/toolkit/ab78ba0e-37bb-4c6c-b21b-a7466df4b19d) in the Launch and Grow Your Lovable App course covers post-launch feedback conversations in more depth.
