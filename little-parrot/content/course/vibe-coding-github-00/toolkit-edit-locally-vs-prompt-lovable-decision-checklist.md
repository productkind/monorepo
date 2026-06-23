---
challenge: "7 - Your Workflow"
type: "Cheat sheet"
---
## Which Tool for Which Change

This whole course's workflow on one page: how to pick the cheapest, easiest route for any change you want to make in your app, and keep everything in sync. Glance at it whenever you're about to make a change and aren't sure where it belongs.

### Start with one question
**Does the change touch what people *see*, or what happens *behind the scenes*?**

### What people see (yours to change, for free)
The words, icons, colours, and layout, all editable on your own computer:
- **By hand in VS Code** for small things you can change directly: a word, an icon's name, a colour.
- **With Copilot** when it needs actual code written, not just a word swapped. Describe what you want and let the agent write it.

### Behind the scenes (belongs in Lovable)
The part that saves data, handles logins, sends emails, or takes payments lives in the **backend Lovable manages for you** (Lovable Cloud). Your local copy talks to it but can't safely change it. Brand-new features usually need backend work, so they belong here too.

### Not sure which side it's on?
Ask Lovable itself in **Plan mode** (one credit, and it changes nothing): describe what you want and ask whether it would touch the backend. If it does, build it in Lovable; if it doesn't, make it yourself with Copilot, for free.

### Keep everything in sync
- **Before you start:** run `npm run dev`, then **pull** in VS Code to grab anything that changed in Lovable since last time.
- **When you're done:** **commit and push** in VS Code, then **Publish** in Lovable when you want your visitors to see it.
- **If a change goes wrong:** in Lovable's **chat**, scroll to the version just before your change and click its **revert** option.
