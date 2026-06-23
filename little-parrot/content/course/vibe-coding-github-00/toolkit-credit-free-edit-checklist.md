---
challenge: "4 - Change Your Website Copy"
type: "Checklist"
---
## The Credit-Free Edit Loop

The full loop for making a change on your computer and getting it live, without spending a Lovable credit. Tick your way down it each time until it's second nature.

### Before you start
- [ ] Your app is running: `npm run dev`, then open **http://localhost:8080**.
- [ ] **Pull** the latest in VS Code (**Source Control → ... → Pull**), so you build on the newest version and avoid clashes when you save.

### Make the change
- [ ] **Find** the words or icon: **Ctrl/Cmd + Shift + F** searches every file at once.
- [ ] **Edit** it right in the file, like any document.
- [ ] **Save**: **Cmd + S** (Mac) or **Ctrl + S** (Windows).
- [ ] **Check** your browser at localhost; the change appears on its own, instantly.

### Send it to GitHub and Lovable
- [ ] Open the **Source Control** panel (the branch icon, or **Ctrl + Shift + G**).
- [ ] Click your file to open the **diff** and confirm you changed exactly what you meant.
- [ ] **Stage** just your file with the **+** (leave auto-generated files like `routeTree.gen.ts` out of your save).
- [ ] Write a short, specific **commit message**, like `Fix typo on the book suggestion button`.
- [ ] **Commit**, then **Sync** (push) to send it to GitHub. It syncs into Lovable within seconds.

### Go live
- [ ] In **Lovable**, check the change arrived in your project.
- [ ] Press **Publish** to put it live for your visitors.

### Worth remembering
- Pushing syncs your code into Lovable; **Publish** is a separate step that updates the live app your visitors see.
- You can make several changes, then publish once when you're happy with them all.
- If a change ever goes wrong, revert it in **Lovable's chat**: scroll to the version just before your change and click its revert option.
