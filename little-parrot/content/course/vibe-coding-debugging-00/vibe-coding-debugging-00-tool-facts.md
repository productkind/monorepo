# Tool facts: vibe-coding-debugging-00
_Checked 2026-06-27. Verify again if generating more than ~2 weeks later._

## Premise check
The course rests on three load-bearing premises, all of which hold against current Lovable documentation:

1. **"Investigate before you fix" using browser DevTools + Lovable's own tools.** Holds. Plan mode is explicitly documented as a non-destructive reasoning/investigation mode, and the Console/Network/Cloud-logs/database flow is sound.
2. **"Small prompts and iterating cost fewer credits overall than one big prompt."** Holds in spirit and is the standard Lovable guidance, but note it is a judgement claim, not a documented metric. Build mode is usage-based and larger/multi-step generations cost more, which supports the angle. Safe to teach as a habit, not as a guaranteed number.
3. **"Lovable has a built-in security auditor; let it try first, then ask in chat for what's left."** Holds, with one correction below.

**One premise-level correction the writer must make before generating is final:**
- The course (Challenge 7 step "When a warning feels too technical" and the Security Warnings toolkit) tells the learner to use **"Reference in chat"** / the Security view inline chat and describes it as **free / "doesn't cost credits."** Current docs say the opposite: *"Referencing a finding in chat to ask Lovable to analyze or fix it is treated as standard chat usage and consumes credits."* **Try to fix all** is the free action. See the Security task below. This is a "free feature described as paid / paid described as free" defect and should be corrected.

---

## Lovable: https://docs.lovable.dev
**Prerequisites:** A Lovable account and an existing project. Most debugging actions assume the learner already has an app open in the editor. Build mode generations and Plan mode messages consume credits (see each task). A free tier exists but credit allowances change; do not state a specific free-credit number without rechecking.

### Task: Use the "Try to Fix" button on errors (Challenge 1 and Challenge 4)
- **Steps (as of 2026-06-27):** When Lovable detects an error (build failure, error in logs), a *Try to Fix* button appears. 1. Click *Try to Fix*. 2. Lovable scans logs, detects the issue and attempts an automatic repair.
- **Exact labels:** *Try to Fix* (the course's capitalisation "Try to Fix" matches the docs).
- **Cost/credits:** Docs do not explicitly state the cost of *Try to Fix*. A vendor feedback thread reports it *does* consume credits in practice despite some docs implying otherwise. Treat as "may consume credits"; do not promise it is free.
- **Gotchas:** The course's "three-attempt rule" (stop after 3 tries, switch to Plan mode) is a community best practice, not a documented Lovable rule. It is sound advice and consistent with the docs' "take a step back, analyse, break into smaller parts" guidance, but present it as a habit, not as a Lovable feature.
- **Source:** https://docs.lovable.dev/tips-tricks/troubleshooting , https://feedback.lovable.dev/p/try-to-fix-button-using-credits-despite-docs (checked 2026-06-27)

### Task: Switch to Plan mode to investigate without changing code (Challenge 4, Challenge 5)
- **Steps (as of 2026-06-27):** 1. Click the *Plan* button next to the message input field at the bottom of the chat. 2. Describe the issue; Lovable reasons across steps and can inspect files, logs and project context. 3. When ready to apply, switch to *Build* mode and approve/implement the plan.
- **Exact labels:** *Plan* and *Build* (Build mode was previously called *Agent mode*; the course correctly uses *Build*). The course says "switch between two modes: *Build* and *Plan*" which matches.
- **Cost/credits:** **Every message in Plan mode deducts one credit.** The course's "it will cost one credit" note in the "Pause and try this: Plan mode" step is correct.
- **Gotchas:** Docs confirm Plan mode "never modifies your project," which backs the course's "safe investigation" framing. The course claims Plan mode can "query your database" / "Query your database to check if data exists." Docs explicitly confirm it inspects **files and logs**; database querying is not explicitly listed. Soften to "inspect your project context (files and logs)" unless the writer can confirm DB querying, or flag as the learner's experience may vary.
- **Source:** https://docs.lovable.dev/features/plan-mode , https://docs.lovable.dev/features/agent-mode (checked 2026-06-27)

### Task: Use the preview toolbar to fix appearance and edit text (Challenge 4)
- **Steps (as of 2026-06-27):** The preview toolbar sits on the app preview. It has four modes: *Select elements*, *Edit text inline*, *Draw annotation*, *Add a comment*. For appearance: choose *Select elements*, click the element, describe the change. To multi-select: hold *Cmd* (Mac) or *Ctrl* (Windows) and click additional elements. For text: choose *Edit text inline* and edit on the page.
- **Exact labels:** *Select elements* (course uses "Select elements" - matches), *Edit text inline* (course uses "Edit text inline" - matches). The toolbar is officially the *preview toolbar* (it replaced the older "Visual Edits" panel).
- **Cost/credits:** *Edit text inline* is **free up to a daily limit of 100 edits per user**; beyond that it uses credits. The course says inline text editing "costs no credits", which is true only up to that daily cap. Recommend adding "free up to a daily limit" so a heavy user is not surprised. *Select elements* and *Draw annotation* are treated as standard chat usage and **consume credits** (the course does not claim Select elements is free, so this is fine, but worth knowing).
- **Gotchas (RESOLVED 2026-06-27 by the product owner on a live project):** You **can** now inline-edit a dynamic, database-driven value, but Lovable **hardcodes** what you type, replacing the live binding with a fixed value that no longer updates from the data. The third-party "two-way sync to the database" claim is misleading; the real behaviour is hardcoding, which is usually undesirable for dynamic content. The course's old "only works on static elements / if you can't edit it, it's dynamic" rule was outdated and has been rewritten to: you can edit dynamic text inline, but it hardcodes the value, so prompt Lovable for dynamic content instead. Challenge 4 step and quiz updated accordingly.
- **Source:** https://docs.lovable.dev/features/preview-toolbar (checked 2026-06-27)

### Task: Bookmark a stable version and revert (Challenge 2, Challenge 5)
- **Steps (as of 2026-06-27):** Lovable keeps an edit history (Versioning 2.0) grouped by date like Google Docs. 1. View history by scrolling up in the chat or pressing the *View history* icon at the top of the chat. 2. Bookmark a working version to mark it as a favourite/stable point. 3. To revert: find an earlier version (or use the revert option under a chat response), click it to preview, then *Restore* to roll the project back to that state.
- **Exact labels:** *Restore* is the documented action for rolling back; the course uses "revert" / "revert option" / "revert button" as plain language. Both are understood, but note the docs' primary button is *Restore*. The course's "bookmark" terminology matches Lovable's bookmarks feature.
- **Cost/credits:** Restoring/bookmarking is not a credit-consuming generation.
- **Gotchas:** The course's reassurance that reverting "keeps all the messages and changes after that point visible in your history" is correct: "This does not delete the newer versions, they remain in your chat history, so you can go forward again." Good. The exact placement of the bookmark control may differ slightly from the screenshots in the course; the screenshots (bookmark-version.png etc.) are the course's own and should be sanity-checked against the live UI before publishing.
- **Source:** https://lovable.dev/blog/versioning-with-lovable-two-point-zero , https://lovable.dev/faq/projects/version-history (checked 2026-06-27)

### Task: Open Lovable Cloud, view backend function logs (Challenge 3)
- **Steps (as of 2026-06-27):** 1. Open the **Cloud** tab inside the project. Docs say it is reached by clicking the **`+` button next to Preview mode**. 2. Inside Cloud, go to the **Logs** section. 3. View function/backend logs (real-time monitoring of app activity).
- **Exact labels:** The course says "click the **More button** next to Preview, select the **Cloud** tab, click **Logs**, select **Function logs** from the dropdown." Docs describe the entry point as the **`+` button next to Preview**, not a "More button", and confirm a **Logs** section exists but do **not** explicitly confirm a "Function logs" dropdown label. See "Could not confirm" for the exact button label and the "Function logs" sub-label; these should be checked against the live UI, as the Cloud tab entry control has changed name/icon over time.
- **Cost/credits:** Viewing logs is free.
- **Gotchas:** Entry-point label drift is the main risk here. "More button" vs "`+` button" vs "Cloud icon on the top bar" all appear across sources, suggesting the UI affordance has changed. Verify on a live project.
- **Source:** https://docs.lovable.dev/integrations/cloud (checked 2026-06-27)

### Task: View database tables to check if data saved (Challenge 3)
- **Steps (as of 2026-06-27):** 1. Open the **Cloud** tab. 2. Go to the **Database** section. 3. Click the table you are investigating (e.g. `book_votes`). 4. View/inspect rows directly; you can sort by a column such as `created_at`.
- **Exact labels:** *Cloud* tab, *Database* section. Docs confirm the Database section lets you "view, edit, and organize records directly in the UI." Course path "Cloud tab > Database" matches.
- **Cost/credits:** Free to view.
- **Gotchas:** Table and column names (`book_votes`, `created_at`) are the course's own example, not a Lovable default; fine as illustration.
- **Source:** https://docs.lovable.dev/integrations/cloud (checked 2026-06-27)

### Task: Run the security auditor and handle findings (Challenge 7)
- **Steps (as of 2026-06-27):** 1. Findings live in the **Security view** (project level; a workspace-level **Security center** also exists). 2. A **Basic scan** runs automatically when you open the publish dialog (fast config + dependency check, includes RLS policy linting and database schema review). 3. A **Deep scan** is a thorough agentic code review that you run on demand; it does not run automatically as you work. 4. To fix: click **Try to fix all** to auto-remediate multiple findings; you can also fix individual findings or make manual changes.
- **Exact labels:** *Security view* (course says "Security view" - matches), *Basic scan*, *Deep scan*, *Try to fix all* (course "Try to fix all" - matches). Severity labels per docs are **errors, warnings, info** (course uses Error/Warning/Info with red/orange/white - consistent; the specific colours are the course's own and should be sanity-checked but are reasonable).
- **Cost/credits:** **Try to fix all is FREE** (listed under "Automated security actions (free)", along with running scans, reviewing findings, ignoring findings, downloading JSON reports). **BUT referencing a finding in chat consumes credits**: *"Referencing a finding in chat to ask Lovable to analyze or fix it is treated as standard chat usage and consumes credits."* This contradicts the course and the Security Warnings toolkit, which call the inline chat "free / doesn't cost credits." **Correction required** in: Challenge 7 step "When a warning feels too technical" (the *Reference in chat* prompt) and toolkit-security-warnings-decision-framework.md Step 4 ("use the inline chat... this is free and doesn't cost credits"). Reframe to: *Try to fix all* is free; asking about a finding in chat costs credits like any chat message.
- **Gotchas:** The exact button label *Reference in chat* used by the course is plausible but not confirmed verbatim in the docs (docs say "referencing a finding in chat"). Verify the exact button text on the live UI. The course's claim that Basic scan runs "automatically every time you publish" matches docs ("when you open the publish dialog").
- **Source:** https://docs.lovable.dev/features/security (checked 2026-06-27)

### Task: Fix a Row Level Security (RLS) warning (Challenge 7)
- **Steps (as of 2026-06-27):** 1. In the Security view, open the RLS finding. 2. Click **Try to fix all** (free) to let Lovable add policies, or ask Lovable to add RLS policies. 3. Lovable adds policies that typically restrict each user to their own data. 4. Run the scan again to confirm the finding is gone.
- **Exact labels:** *Try to fix all*. The course's example prompt "Add Row Level Security policies" is fine as a natural-language instruction.
- **Cost/credits:** *Try to fix all* free; a chat prompt to add policies costs credits.
- **Gotchas:** The course's RLS explanation (public Supabase URL + public `anon` key embedded in the app, so without RLS the database can be read directly bypassing the app) is accurate and matches the real, well-documented Lovable/Supabase RLS-bypass risk. Sound to teach. The screenshots are the course's own; verify they still match the Security view layout.
- **Source:** https://docs.lovable.dev/features/security , https://ptkd.com/journal/lovable-dev-supabase-rls-bypass-vulnerability (checked 2026-06-27)

### Task: Enable leaked password protection (HIBP) (Challenge 7)
- **Steps (as of 2026-06-27):** Course path: 1. Open the **Cloud** menu. 2. Select **Users**. 3. Open **Auth Settings**. 4. Click **Email** among the sign-in methods. 5. Enable the **Password HIBP Check** toggle. A search result corroborates this exact path ("Cloud > Users > Auth settings > Email" with a "Password HIBP Check" / HIBP check), and the sibling path Cloud > Users > Auth > Google is documented for Google sign-in, so the menu structure is consistent.
- **Exact labels:** *Cloud*, *Users*, *Auth Settings* (docs sometimes render this section as *Users & Auth*), *Email*, *Password HIBP Check* toggle. The exact label *Password HIBP Check* is not in the official docs page I could read; it is supported by a search snippet, so verify on the live UI.
- **Cost/credits:** On raw Supabase, leaked-password protection is a **Pro plan and above** feature. Lovable Cloud manages its own backend and abstracts Supabase, so this Supabase plan gate may **not** map directly to a Lovable cost. Do not state it is free or paid without confirming on a live Lovable Cloud project. See "Could not confirm".
- **Gotchas:** HIBP only checks passwords at new sign-up / password change, not existing passwords. The privacy-preserving k-anonymity detail (only the first 5 chars of the SHA-1 hash are sent) is accurate but more than the course needs. The course's user-facing explanation ("if a user tries to sign up with a compromised password they'll be prompted to choose a different one") is correct.
- **Source:** https://supabase.com/docs/guides/auth/password-security , https://vibe-eval.com/lovable-password-protection/ (checked 2026-06-27)

---

## Browser DevTools: https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status
**Prerequisites:** A modern browser (Chrome, Edge, Safari, Firefox). No account needed. Free.

### Task: Open DevTools and use the Console / Network tab (Challenge 3)
- **Steps (as of 2026-06-27):** Chrome/Edge: press `F12` or `Ctrl+Shift+I` (Windows/Linux) / `Cmd+Option+I` (Mac), or right-click > *Inspect*. Safari: Safari menu > Settings > Advanced > tick "Show features for web developers", then `Cmd+Option+I`. Then click the *Console* tab for frontend errors, or the *Network* tab to see requests and their status codes.
- **Exact labels:** *Console*, *Network*, *Inspect*. The course's shortcuts and the Safari "Show features for web developers" path are correct as of current Safari. (Older Safari labelled this "Show Develop menu in menu bar"; the course's current wording is right.)
- **Cost/credits:** Free, built into the browser.
- **Gotchas:** Errors only appear in the Console at the moment they happen, so the course is right to tell the learner to open DevTools first, then reproduce the bug. Right-click > Inspect works in Chrome and Edge; Safari needs the developer features enabled first (course states this). Correct.
- **Source:** https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status (status codes) and standard browser DevTools behaviour (checked 2026-06-27)

### Task: Read HTTP status codes (Challenge 3 + HTTP status codes toolkit)
- **Confirmed against MDN (2026-06-27):**
  - 200 OK = success. Correct.
  - 201 Created = new resource created (e.g. new DB row). Correct (toolkit).
  - 400 Bad Request = client sent malformed/invalid request. Correct.
  - 401 Unauthorized = client must authenticate; semantically "unauthenticated" (user not logged in / session expired). The course says "Not authenticated" and the quiz says "the user is not authorised" / "needs to log in". Accurate. Note MDN's own spelling is **"Unauthorized"** (US), and the toolkit uses British "Unauthorised"; the meaning is right either way. Minor: the quiz option "The user is not authorised" is slightly loose wording for 401 (401 is about authentication, 403 is about authorisation), but the explanation correctly says "needs to be logged in but isn't, or their session has expired", so it teaches the right thing.
  - 403 Forbidden = authenticated but no permission. Correct. Toolkit's note that 403 is most commonly an RLS block in Lovable apps is plausible and consistent with the RLS-bypass material.
  - 404 Not Found = resource/endpoint does not exist. Correct.
  - 409 Conflict = request conflicts with current state (e.g. duplicate). Correct (toolkit).
  - 429 Too Many Requests = rate limiting. Correct (toolkit).
  - 500 Internal Server Error = generic server crash. Correct.
  - 502 Bad Gateway = invalid response from upstream server. Correct (toolkit).
  - 503 Service Unavailable = server overloaded/down, usually temporary. Correct (toolkit).
  - Digit classes: 2xx success, 4xx client error, 5xx server error. Correct.
- **Gotchas:** All status-code facts in both the course and the HTTP toolkit hold against MDN. The Console error-message meanings in the toolkit (`TypeError: Cannot read properties of undefined`, `X is not a function`, `ReferenceError`, `SyntaxError: Unexpected token`, `Failed to fetch`) are accurate plain-language summaries of standard JavaScript errors.
- **Source:** https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status (checked 2026-06-27)

---

## Resolved on live check (2026-06-27, confirmed by the product owner)
- **Inline edit on dynamic text:** you CAN inline-edit a dynamic, database-driven value, but Lovable **hardcodes** what you type (replaces the live binding with a fixed value that no longer updates). The old "only works on static" rule was wrong; the course now teaches "you can, but it hardcodes, so prompt Lovable for dynamic content instead." Challenge 4 step + quiz updated.
- **Cloud tab entry point is the "More button" next to Preview** — the course's label is correct on the current live UI (the docs' "+ button" wording is out of date). No change needed.
- **"Password HIBP Check" toggle (Cloud > Users > Auth Settings > Email)** — label is correct and free-tier Lovable learners can enable it. No change needed.
- **Plan mode "query your database"** — claim removed from the course (Challenge 4) rather than asserted; docs confirm files + logs only.

## Could not confirm
- **"Function logs" dropdown sub-label inside Cloud > Logs.** Docs confirm a Logs section but not a dropdown labelled exactly "Function logs". Verify on the live UI.
- **"Reference in chat" exact button label.** Docs describe "referencing a finding in chat" but do not quote a button named *Reference in chat*. (The credit-cost correction for this action is confirmed and applied.)
- **Lovable's specific screenshots in this course** (build-error.webp, plan-mode.webp, preview-toolbar.webp, security-menu.webp, etc.) are the course's own assets and could not be checked against the live UI. Recommend a quick visual pass on a real project before publishing, since Lovable's UI changes frequently.
