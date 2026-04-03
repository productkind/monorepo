# Build Your First App with Lovable

Welcome to this micro-course! In the next six challenges, you'll go from "I've never built anything" to "I just shipped my first app." By the end, you'll have a working web app live on the internet that you can share with anyone.

No coding required. Just your ideas, a structure that works, and a willingness to experiment.

---

## Challenge 1: Your First Prompt

**Build working software in the first few minutes.**

You're about to create a real, working app. Not a mockup. Not a prototype. An actual web application that runs in a browser. And you're going to do it by describing what you want in plain English.

### What is vibe coding?

**Vibe coding** is a way of building software by describing what you want instead of writing code. You explain how the app should look, feel, and behave, and an AI tool like Lovable translates your words into a working product.

It's called "vibe coding" because you're communicating the vibe of what you want, not the technical details. The AI handles the technical bits.

### What does Lovable create?

Lovable builds **web applications**, meaning software that runs in a browser on phones, tablets, and computers. Think of apps like Notion, Trello, or Google Docs. These are all web apps.

Fun fact: Little Parrot (the platform you might be using right now) was built with Lovable.

### Why structure matters

Here's something important: **vague prompts get vague results**.

If you tell Lovable "make me an app for my book club," you'll get something generic. It might work, but it probably won't match what you imagined.

The secret to getting closer to what you want on the first try? A structured prompt.

### The prompt formula

This formula helps you describe your app clearly:

```markdown
## Product overview
[What is this app? What problem does it solve?]

## User flow
[What does the user do, step by step?]

## Platform requirements
- It's a mobile-first platform. Optimise layout, font sizes, and buttons for mobile. Prioritise speed and readability.
- The platform is accessible. Implement WCAG AA compliance.

## Design system
- Brand colours: [your colours]
- Heading font: [font name]
- Paragraph font: [font name]
- Logo: [describe or upload later]

## Implementation details
[Any specific technical requirements]

## Target user
[Who is this app for?]
```

Don't worry if you don't know what to put in every section yet. You can start simple and add detail later. The structure itself helps Lovable understand what you're after.

### Start small, then grow

Here's a mindset that will save you time and frustration: **don't try to build everything at once**.

It's tempting to describe your entire vision in one big prompt. But this often backfires. Lovable might misunderstand part of it, or build things in a way that's hard to change later. You end up spending more effort fixing than you would have spent building step by step.

Instead, start with one core user flow. Get that working. Then add the next piece.

### Example: The Book Club Organiser

Let's walk through a real example. Meet Sarah. She runs a book club with her friends, but coordination is a nightmare. Messages are scattered across WhatsApp, book suggestions get lost, and they spend more time figuring out logistics than actually reading.

Sarah's full vision includes suggesting books, voting, tracking what they're reading, and more. But for her first prompt, she focuses on just one thing: **a place to collect book suggestions**.

Here's her starting prompt:

```markdown
## Product overview
A simple app where book club members can suggest books for the group to read next.

## User flow
1. User opens the app and sees a list of book suggestions
2. User can add a new suggestion with the book title and a short note about why they recommend it

## Platform requirements
- It's a mobile-first platform. Optimise layout, font sizes, and buttons for mobile. Prioritise speed and readability.
- The platform is accessible. Implement WCAG AA compliance.

## Design system
- Brand colours: warm cream background (#FDF6E3), deep brown text (#5C4033), accent coral (#E07A5F)
- Heading font: Merriweather
- Paragraph font: Open Sans
- Style: cosy, bookish, friendly

## Implementation details
- No login required for the first version
- Store data locally for now

## Target user
Sarah, a book club organiser who wants to spend less time on admin and more time reading with friends.
```

Notice what's not in this prompt: voting, deadlines, current book tracking, organiser controls. Those will come later. Right now, Sarah just wants to see if Lovable can create a clean list where people can add suggestions.

### Now it's your turn

You can use Sarah's Book Club Organiser prompt above, or adapt the formula for your own idea. Either way works. The goal is to see Lovable in action.

If you use your own idea, resist the urge to include everything. Pick one core thing your app needs to do. You can add more in the next challenge.

**INPUT:** Open Lovable (lovable.dev), paste your structured prompt, and press Enter.

Watch what happens. In less than a minute, you'll have a working app.

Take a moment to click around. Test the buttons. See what Lovable created. It might not be perfect, and that's completely fine. You've just built your first app. 💫

---

## Challenge 2: Iterate and Improve

**Build in small steps. Test after each one.**

Now that you have something working, let's make it better. This is where the real power of vibe coding shows up.

### Why small steps beat big prompts

You might be wondering: why didn't we include voting, deadlines, and everything else in the first prompt? Wouldn't it be faster to describe it all at once?

Here's what actually happens when you try that:
- Lovable might misunderstand one part, and that mistake ripples through everything else
- You get a complex app that's harder to understand and fix
- You spend more time untangling problems than you saved by combining prompts

Building one feature at a time means:
- You can test each piece before adding the next
- Problems are easier to spot and fix
- You stay in control of how your app grows

This also helps with credits. Lovable uses credits based on the complexity of your request. A detailed, focused prompt often uses fewer credits than a vague mega-prompt followed by lots of fixes.

### The rebuild mindset

Here's a freeing thought: **it's cheap to start over**.

If Lovable creates something that's 70% right but the 30% that's wrong is fundamental, don't spend hours trying to fix it. Just start fresh with a better prompt.

This might feel wasteful if you're used to thinking about code as precious. But in vibe coding, your prompt is the valuable thing, not the output. A clearer prompt will give you a cleaner result.

**When to tweak vs when to start fresh:**
- Tweak when the structure is right but details need adjusting
- Start fresh when the fundamental approach is wrong

### Example: Adding voting to the Book Club app

Sarah's app can now collect book suggestions. Time for the next piece: letting members vote.

Here's her follow-up prompt:

```
Add a voting feature. Each club member can vote for one book from the suggestions. Show vote counts next to each book. Highlight the book with the most votes.
```

See how specific that is? She's not saying "make voting work." She's describing exactly what voting means for this app: one vote per person, visible counts, and a clear winner.

After this works, she might add the ability to close voting, then a "currently reading" section, then reading deadlines. One step at a time.

### Now it's your turn

Think of the next feature your app needs. Just one. Resist the temptation to add three things at once.

Maybe it's:
- A way to filter or sort items
- A confirmation message when something is saved
- A place to add notes or comments
- A button to delete or edit entries

**INPUT:** Write a follow-up prompt that adds one specific feature to your app. Be as detailed as you can about what it should do and look like. Test it. Then, if it works, think about what comes next.

---

## Challenge 3: Navigate the Lovable Interface

**Find your way around without getting lost.**

Lovable has several helpful features beyond the chat window. Let's explore the ones you'll use most.

### Preview mode

The preview shows your app as users will see it. You can:
- View it full-screen (click the expand icon)
- Test how it looks on mobile vs desktop (use the device toggle)
- Click around to test all the interactions

Get in the habit of checking the preview after every change. It's the quickest way to spot problems.

### Code view

There's a tab that shows the actual code Lovable is generating. You don't need to understand it. But it's there if you're curious, and it becomes more useful as you build more apps and start recognising patterns.

Think of it like the engine of a car. You don't need to be a mechanic to drive, but knowing where the engine is doesn't hurt.

### Visual edits

This is one of the most useful features for quick tweaks. Click the paintbrush icon to enter visual edit mode. Now you can:
- Click on any text to change it
- Adjust colours by clicking on elements
- Tweak spacing and sizing

It's perfect for small refinements without writing another prompt.

### Adding assets

Want to add your logo or images? Look for the assets panel. You can upload images here and reference them in your prompts.

### Design themes

Lovable offers pre-built themes that can change the overall look of your app with one click. It's a quick way to experiment with different styles before committing to a design direction.

### Now it's your turn

**INPUT:** Open your app in Lovable and make three changes using the visual edit tool. Maybe fix a typo, adjust a colour, or change the spacing on a button. Get comfortable clicking around.

---

## Challenge 4: Experiment and Undo Mistakes

**Be prepared when something breaks.**

Here's the truth about building apps: things will break. You'll try something and it won't work. This is normal. What matters is knowing how to recover.

### Automatic saving

Good news: Lovable automatically saves every version of your app. You can't accidentally lose everything with an errant click.

### Bookmarking versions

Before you try something risky (like a big structural change), bookmark your current version. It's like saving your game before a boss fight.

Look for the bookmark icon in the version history. Give it a name you'll recognise, like "Working version before adding login."

### Reverting

If something goes wrong, you can go back to any previous version. Open the version history, find the version you want, and restore it.

**When to revert vs when to fix:**
- Revert when the change broke something fundamental or created a mess you can't easily untangle
- Fix when it's a small issue and you can describe clearly what went wrong

### Now it's your turn

**INPUT:** Bookmark your current app version with a clear name. Then try something experimental, something you're not sure will work. If it breaks things, practise reverting to your bookmarked version. If it works, great! Bookmark the new version too.

---

## Challenge 5: Go Beyond the Interface

**Make your app more capable.**

So far you've been working in the main interface. Now let's explore some features that unlock more possibilities.

### Planning mode

For complex features, you can ask Lovable to plan before building. This is helpful when you're not quite sure how something should work.

Enable planning mode and describe what you want. Lovable will outline an approach and check with you before writing code.

A word of caution: **don't over-plan**. Lovable works best when you build as you go. Planning too far ahead leads to what's called "context rot," meaning the plan becomes outdated as you learn what actually works. Plan one feature at a time, not your entire product roadmap.

### Knowledge files

You can give Lovable documents to reference, like brand guidelines, product requirements, or examples of what you like. Upload them as knowledge files, and Lovable can refer to them when building.

### API keys and secrets

If you want to connect your app to other services (like sending emails or processing payments), you'll need API keys. These are like passwords that let your app talk to other services.

**Never put API keys in your prompts.** Lovable has a dedicated secrets panel for storing them safely. Look for it in the settings.

### Lovable Cloud

Lovable Cloud handles backend features like user accounts and data storage without you needing to set up servers. For most apps, it's the simplest way to add these capabilities.

### Handling security warnings

Sometimes Lovable will flag security issues before you publish. Don't panic. This is normal and helpful. Developers deal with security considerations all the time.

Read what Lovable suggests and follow its guidance. Usually it's something straightforward, like making sure certain data isn't publicly accessible.

### Now it's your turn

**INPUT:** Enable planning mode and ask Lovable to add a feature to your app. Watch how it breaks down the problem before building. Decide whether you like the plan or want to adjust it.

---

## Challenge 6: Publish Your App

**Put your work on the internet.**

You've built something. Now let's share it with the world.

### Before you publish

Take a few minutes to set up:
- **Favicon:** The small icon that appears in browser tabs. Upload something simple, like your logo.
- **Meta tags:** The title and description that appear when someone shares your link. Make them clear and inviting.
- **Thumbnail:** The image that shows when your app is shared on social media.

These small details make your app feel more polished and professional.

### The publish button

When you're ready, click publish. Lovable will give you a URL where your app lives. It's now on the internet.

### Your published URL

Here's something reassuring: **nobody will find your app unless you share the link**. It's not going to appear in Google searches. So don't worry if it's not perfect. You can publish early, get feedback, and keep improving.

### Why "not done" is fine

Products are never done. They evolve. The apps you use every day get updates constantly.

There's a useful rule called the 80/20 reality: **getting to 80% takes 20% of the effort. The final 20% takes the remaining 80%.**

This means a simple, working version is achievable quickly. Polishing every detail takes much longer. For now, focus on getting something useful out there.

### What to do next

Share your app with one person. Maybe a friend, a potential user, or someone who fits your target audience. Ask them:
- What makes sense?
- What's confusing?
- What would they want to see added?

Their feedback is more valuable than any amount of solo polishing.

### Now it's your turn

**INPUT:** Set your favicon and meta tags. Then hit publish. Copy your URL and share it with at least one person. Ask them for honest feedback.

Congratulations on publishing your first app! 🎉

---

## What You've Learned

You've come a long way. Let's recap what you can now do:

- **Write structured prompts** that get you closer to what you want on the first try
- **Use Lovable's interface** confidently: preview, visual edits, bookmarks, reverts
- **Handle security warnings** calmly, knowing they're normal and fixable
- **Publish your app** and share it with others
- **Know when to start over** vs when to iterate

Most importantly, you've experienced the core truth of vibe coding: **you can build real things by describing what you want.**

### Keep going

This was just the beginning. Here are some paths to explore next:

- **Debugging with Lovable:** When things break, how to figure out why and fix them
- **Build Valuable Products:** How to go from idea to a product people actually want
- **Basics of Software for Vibe Coding:** Technical concepts that help you communicate more precisely with AI tools

The more you build, the better you'll get at describing what you want. Every app teaches you something new.

Good luck, and happy building! 🚀
