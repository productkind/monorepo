---
challenge: "3 - Run Your App on Your Computer"
type: "Cheat sheet"
---
## Run Your App on Your Computer

The handful of terminal commands that bring your app onto your computer and run it, all in one place so you never have to remember them. Open this whenever you sit down to work on your app.

### First time on this app

Run these once, from your terminal (**Terminal** on Mac, **Git Bash** on Windows):

```
mkdir Projects
```
```
cd Projects
```
```
git clone <your repository link>
```
```
cd <your-app-folder>
```
```
npm install --no-save
```
```
npm run dev
```

- `<your repository link>` is the **HTTPS** address from GitHub's green **Code** button (it ends in `.git`).
- The first `git clone` opens a **GitHub sign-in** in your browser. Sign in once and Git remembers you.
- When `npm run dev` finishes, open **http://localhost:8080** in your browser. Your app is running.

The *Projects* folder is just a tidy home for all your apps; the name and place are up to you.

### Every time after

No cloning or installing again. From your terminal:

```
cd Projects/<your-app-folder>
```
```
npm run dev
```

Then open **http://localhost:8080**. Pull the latest first (in VS Code, **Source Control → ... → Pull**, or `git pull`) so you start from the newest version.

### Stopping

Click the terminal and press **Ctrl + C** (on a Mac too, not Cmd), or just close the window.

### If something complains

**`Could not resolve dependency` / `Fix the upstream dependency conflict`**
The app's ingredient list is out of date. In **Lovable**, send:
```
Check if all my dependencies are up-to-date. If not, update them.
```
Then run `git pull`, and `npm install --no-save` once more.

**`The following dependencies are imported but could not be resolved`**
Lovable added new building blocks since your last install. Run:
```
npm install --no-save
```
```
npm run dev
```

**Windows: a missing `.dll` or `Visual C++` error**
Install the free **Microsoft Visual C++ Redistributable (x64)** from [Microsoft's download page](https://learn.microsoft.com/en-us/cpp/windows/latest-supported-vc-redist?view=msvc-170#latest-supported-redistributable-version), then reopen your terminal and run `npm run dev` again.

**`command not found`**
Close the terminal and open a fresh one (it picks up newly installed tools). If it persists, reinstall the tool it named.
