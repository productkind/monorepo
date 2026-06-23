---
challenge: "4 - Change Your Website Copy"
type: "Checklist"
---
## The Credit-Free Edit Loop

The full loop for making a change on your computer and getting it live, without spending a Lovable credit. Tick your way down it each time until it's second nature.

### Before you start
- [ ] **Pull** the latest version of our app's code in VS Code (**Source Control → ... → Pull**), so you build on the newest version and avoid clashes when you save.
- [ ] To run your app from your Terminal (Mac) or GitBash (Windows), type `npm run dev`, then open the **local web address** in your browser it prints (e.g., http://localhost:8080).
    - **You encountered an error?** Check the [**Run Your App on Your Computer**](https://littleparrot.app/nest/toolkit/6cdb24bd-b8c1-4d3b-8154-bbfd703da608) for possible fixes.

### Make the change in VS Code
- [ ] **Find** the words or icon: **Ctrl/Cmd + Shift + F** searches every file at once.
- [ ] **Edit** it right in the file, like any document.
- [ ] **Save**: **Cmd + S** (Mac) or **Ctrl + S** (Windows).
- [ ] **Check** your app in the browser at localhost; the change appears after saving your file, instantly.

### Send it to GitHub and Lovable
- [ ] In VS Code, open the **Source Control** panel (the branch icon, or **Ctrl + Shift + G**).
- [ ] Click your file to open the **diff** and confirm you changed exactly what you meant.
- [ ] **Stage** just your file with the **+** (leave auto-generated files like `routeTree.gen.ts` out of your save).
- [ ] Write a short, specific **commit message**, like `Fix typo on the book suggestion button`. A simple trick if you're not sure what to write: finish the sentence *"This change will..."*
- [ ] Click the **Commit** button, then **Sync** (push) to send it to GitHub. It syncs into Lovable in a couple of seconds.

### Go live
- [ ] In **Lovable**, check the change arrived in your project.
- [ ] Press **Publish** to put it live for your app's users.

### Worth remembering
- When you push your change from your computer, it syncs your code into GitHub, and from there to Lovable; **Publish** is a separate step that updates the live app your visitors see.
- You can make several changes, then publish once when you're happy with them all.
- If a change ever goes wrong, revert it in **Lovable's chat**: scroll to the version just before your change and click its revert option.
