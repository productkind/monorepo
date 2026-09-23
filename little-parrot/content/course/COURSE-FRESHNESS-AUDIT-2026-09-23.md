# Course freshness audit — 23 September 2026

Scope: all 9 courses in `little-parrot/content/course/` plus their toolkit items.

Lovable courses were last updated **14 June 2026**. Checked against the Lovable changelog (`docs.lovable.dev/changelog`, every entry from 15 June 2026 to 22 September 2026 — 61 dated entries) and against current Lovable docs pages. Non-Lovable tools checked against their own current documentation.

Severity:

- **BROKEN** — verified against current docs; a learner following the step cannot complete it.
- **WRONG** — verified factually incorrect, but the learner can still get there.
- **STALE** — the changelog says this area changed; needs a live UI check before rewriting.
- **GAP** — not wrong, but a beginner now meets something the course never mentions.

---

## 1. Build Your First App with Lovable (`lovable-intro-00`)

### BROKEN

**Publishing challenge, "Set up your meta tags" (yaml:889–901)** Course: Publish → "follow the guided flow until you reach **Add info to help people find your site**" → "**Icon & title** section" → upload favicon → Description → Social image → "**Edit settings** in the Publish panel". Reality (changelog 19 Aug 2026 "A simpler Publish dialog", confirmed on `docs.lovable.dev/features/publish`): the Publish dialog is now a single view — Website URL, visibility, security scan, Publish. Lovable **generates the title, description and icon automatically while it builds your app**. There is no "Add info to help people find your site" step and no "Edit settings" button. To change any of it you either ask Lovable in chat, or use the Publish dialog's **⋮ → Social & search appearance**, or click the favicon next to the website URL, or click **Edit** next to the site title on the "Your website is live" screen. The whole step needs rewriting, and the framing changes with it: the learner no longer _has to_ prepare meta tags before publishing, they review what Lovable generated.

**Publishing challenge, "Choose your URL" (yaml:906–917)** Course: Publish → "**Your website URL** section, click the pencil icon" → checkmark to save. Reality: on first publish you can still edit the Website URL field in the dialog, but changing it afterwards is now **Project settings → URL subdomain → Update URL subdomain**. The pencil/checkmark flow is gone. Also in the same step: _"If you want a custom domain you'll need a paid Lovable plan, and you'll need to buy the domain separately before connecting it in Lovable."_ The paid-plan part is still true. The second half is now wrong — **you can buy a domain through Lovable**, including from the project chat (changelog 1 Sep 2026).

### WRONG

**"Database changes", manual approval path (yaml:427)** Course: "Click the **+** button under the chat input, then go to **Connectors → Manage connectors → Cloud → Manage permissions**." Reality: the label is **Manage my agent's permissions**, and there is now a second, better path — **Settings → Your account → Preferences → Agent permissions** (changelog 21 Sep 2026), one page listing every agent permission with Always allow / Ask each time / Never allow. The `+` button is now the **Chat actions** menu and was redesigned twice (9 Sep, 16 Sep); its groups are Project / Add context / Attach files / Help & support.

**"Plan mode" credit claim (yaml:747)** Course: _"Each Plan mode prompt uses 1 credit regardless the complexity of the question."_ Reality (`docs.lovable.dev/introduction/credits-and-usage`): a Plan mode message costs **"1 credit, plus the cost of any subagent research"**. The "regardless of complexity" promise is no longer true and is exactly the kind of claim a learner will notice when their balance drops.

**"The preview toolbar", inline text edit cost (yaml:571)** Course: _"Edit text inline: ... no prompt needed and it costs no credits."_ Reality (`docs.lovable.dev/features/preview-toolbar`): your account includes **100 free inline text edits total** (not per day), across all workspaces and projects, plus a workspace cap of 2,000 per 24 hours. After that they are billed as standard build usage. Note this also contradicts the debugging course, which says _"free for up to 100 a day"_ — both are wrong, in different directions.

**"What if something goes wrong?" / "Handling security errors and warnings" (yaml:438, 790)** Course presents **Try to fix** and **Try to fix all** as freely repeatable. Reality (changelog 11 Aug 2026, confirmed on `docs.lovable.dev/features/projects/chat`): your account includes **10 free fixes**, covering both _Try to fix_ on build errors and security-scan fixes, shared across all workspaces and projects. Each one becomes available again 24 hours after use. Past 10, a fix runs as a normal chat message and uses credits. Security scans themselves stay free.

**"Browser testing" limitation note (yaml:813)** Course: _"it cannot automatically log in with Google authentication."_ Reality (changelog 8 Sep 2026): Lovable now **signs in to test pages behind your app's login**, provided your app's sign-in runs on Lovable Cloud. If the app has one user it signs in as that user; with several it asks in chat first. The blanket limitation as written is now misleading.

### STALE

- **"Why structure is important" (yaml:99)** — _"by default you get 5 free credits every day"_. Still right as far as it goes, but the Free plan is now documented as **5 per day, up to 30 per month**, plus a separate daily _chat_ allowance. Worth stating the monthly cap so learners aren't surprised.
- **"Attach images for inspiration" (yaml:582)** — the `+` button is now the Chat actions menu; **Attach files** is its own group. Check the screenshot and wording against the live menu.
- **"Preview"/"Code View"/"Knowledge"** — all still exist, but the navigation around them moved: the project name menu was **removed** (4 Sep 2026) and project settings now open from the sidebar, the **More** tab, the Chat actions menu, or **Cmd+.** / **Ctrl+.**.

### GAP

- **Chat mode (21 Sep 2026).** The mode picker below the input is no longer just Build / Plan — there is now a **Chat** option, and chatting is _free within a daily allowance on Free, Pro and Business_. For a beginner course about spending credits wisely this is arguably the single most valuable addition of the quarter, and the course teaches the picker without it (yaml:745).
- **Drafts (9 Sep 2026).** A separate copy of the project with its own chat and preview, accept or discard. This sits naturally next to Challenge 5 (Experiment and Undo Mistakes Safely) — arguably the safer default for experimenting than bookmark-and-revert.
- **Follow-ups (8 Sep 2026).** You can now send a correction while Lovable is still working. The message queue is deprecated.
- **Paste an API key in chat and Lovable saves it as a secret** (26 Jun 2026), and a pasted key can now offer to set up a connector (1 Sep 2026). The "Add Secret panel" step (yaml:779) is still correct, but this is now the easier route.

---

## 2. How to Publish a Lovable App (`lovable-publishing-00`)

This is the worst-affected course — publishing is precisely what changed most.

### BROKEN

**"How to check and update your API keys" (yaml:114)** Course: _"open the **Cloud** tab (click the **+** button next to Preview at the top of the screen)"_. Reality: Cloud is opened from the **More** tab in the project toolbar — **More → Cloud → Secrets**. There is no `+` next to Preview. (The course's own debugging-course tool-facts sheet already flagged the `+`-button wording as out of date back in June; this course never got the same fix.)

**"Customising your subdomain" (yaml:131–141)** — same problem as the intro course: "Your website URL … pencil icon", "**Edit settings** → **URL** section". Now **Project settings → URL subdomain**.

**"Set your favicon" (yaml:154–171) and "Set your meta tags" (yaml:172–188)** — both built entirely on the removed **Add info to help people find your site** / **Icon & title** / **Edit settings** flow. Lovable now generates title, description and icon during the build. These two steps need rewriting from scratch, not patching.

**"How to buy and connect a domain" (yaml:294–315)** Course: Publish → **Edit settings** → **URL** pencil → **Add custom domain** → **Add existing domain** → **Connect domain**. Reality (`docs.lovable.dev/features/custom-domain`): domain setup is now reached from **Project → Settings → Domains**, from the **Publish dialog → Add domain**, from **Workspace settings → Workspace domains**, or **by asking Lovable in the project chat**. And you can **buy a domain through Lovable** — the whole "go to GoDaddy first" premise of this challenge is now only one of two routes. (Paid plan still required; already stated correctly at yaml:275.)

**"Built-in Lovable metrics" (yaml:728–748)** Course: _"Click on **...** at the top, next to Preview. Select the **Analytics** tab."_ Reality: **More → Analytics**. Also, since 14 Jul 2026 the control in **Project settings → General → Publishing** is **Visitor analytics** (on by default), replacing the old "Disable analytics" toggle — the course should say so, because a learner who turned the old toggle on will now read it backwards.

### GAP

- **Social & search cards in the page selector (26 Aug 2026).** You can now hover a page's preview icon and see exactly how that page will appear in Google results and link previews, before publishing. This belongs in Challenge 1 (meta tags) and Challenge 4 (SEO), and is a better teaching device than the current static screenshot.
- **TanStack Start (28 Jul 2026).** Lovable's current stack renders pages on the server "so search engines and social link previews can read your content". Older React + Vite projects can migrate in place (`/` → **Migrate to TanStack Start**, or Settings → General → Project actions). For an SEO challenge this is now the single biggest lever and the course does not mention it at all.
- **Domain health (7 Sep 2026).** Live custom domains are now checked when you open domain settings and can show **Connection issue** or **Check failed**, with a **Check status** button. Good material for the DNS-propagation step, which currently just says "wait a few hours".
- **Trust Center (7 Aug 2026).** Every publicly published app gets a security page at `/.well-known/trust.html` — but it is **disabled by default since 17 Aug**, enabled under **Project settings → Publishing**. Natural fit for the legal/trust challenge (Challenge 3).
- **PostHog is now a Lovable connector (27 Jul 2026)** — relevant to Challenge 5's analytics section.

### NEEDS VERIFICATION

- **"the 512MB deployment limit" (yaml:943)** — I could not confirm this figure in current Lovable docs. The publish docs only mention "a file that is too large to include" without a number. Either find a current source or soften the claim.

---

## 3. Fix Bugs with Confidence: Debugging Your Lovable App (`vibe-coding-debugging-00`)

### WRONG

**"Try to fix all" described as free — four places (yaml:1574, 1583, 1607, 1612)** Course: _"Running the scans and the **Try to fix all** button are the free actions."_ and the three-step framework built on "click Try to fix all up to 3 times". Reality: **10 free fixes per account**, covering both _Try to fix_ and security-scan fixes, each regenerating 24 hours after use; past that they cost credits (changelog 11 Aug 2026). The scans themselves are still free. The "click it three times" advice now has a real budget attached to it and the course should say so. Same correction needed in **`toolkit-security-warnings-decision-framework.md:31,37`** and in **`lovable-intro-00/toolkit-pre-publish-checklist.md:19`**.

**"Preview toolbar" inline edit cost (yaml:922)** Course: _"Inline text edits are free for up to 100 a day, then they use credits."_ Reality: **100 free inline text edits per account in total**, not per day, plus a 2,000-per-24-hours workspace cap.

### STALE

- **"Plan mode: Your debugging partner" (yaml:855)** — _"a switch between two modes: Build and Plan"_. There are now three: **Build, Plan, Chat** (21 Sep 2026). Worth more than a label fix here: a free daily chat allowance changes the economics of "ask before you fix", which is this course's thesis.
- **"Pause and try this: Plan mode" (yaml:902)** — _"it will cost one credit"_; now 1 credit plus any subagent research.
- **Plan mode diff view** — the **Show changes** view of revised plans was **removed** (9 Sep 2026), replaced by undo/redo arrows and plan version history. Not referenced in the course text, but check the `plan-mode.webp` screenshot.

### CORRECT — no change needed

- Backend logs path **More → Preview … Cloud → Logs** (yaml:698) — the "More button" wording is right; current docs confirm "open the **More** tab in the project toolbar and select **Cloud**".
- Leaked-password fix path **Cloud → Users → Auth Settings → Email → Password HIBP Check** (yaml:1553) — matches the current Auth settings structure.
- Basic scan runs automatically on publish (yaml:1400) — still true, and the old opt-out setting was removed on 10 Aug, which makes this _more_ true than when it was written.

### GAP

- **Drafts (9 Sep 2026)** — a sixth escape strategy for Challenge 4 (Escaping Bug Loops): try the risky fix in a draft rather than reverting afterwards.
- **Fewer false alarms in dependency scans (29 Jul 2026)** — findings that cannot affect deployed Lovable apps are now shown with an info marker instead of counted. Reassuring context for the "building blocks" step.
- **Credit check-ins / running out mid-message (17–18 Aug 2026)** — a long debugging session can now pause and ask. Worth a line so a learner isn't alarmed by the card.

---

## 4. Save Lovable Credits: Edit Your App Like a Developer (`vibe-coding-github-00`)

Least affected of the Lovable courses; the GitHub/VS Code/terminal material is all still accurate.

### STALE

- **"First, connect GitHub to Lovable" (yaml:102)** — _"**Project settings → Git → GitHub** (or use the **+** menu in the chat)"_. Project settings → Git is still correct. The `+` menu is now **Chat actions**, where Settings sits under the **Project** group. Also worth knowing: **Bitbucket Cloud** is now a third option (10 Sep 2026), and project settings now also open with **Cmd+.** / **Ctrl+.**
- **Copilot terminology (yaml:797–807)** — the names **Ask / Plan / Agent** are still correct, but VS Code now calls the control the **agent picker** and these **built-in agent roles**; what used to be "custom chat modes" are now "custom agents" (`.chatmode.md` → `.agent.md`). The screenshot `copilot-modes.webp` and the phrase "mode picker" will look dated.
- **Copilot free tier (yaml:793)** — _"about 50 chat requests a month (plus thousands of inline code completions)"_. Still accurate (50 chat requests, 2,000 completions). But GitHub moved Copilot to usage-based billing with **GitHub AI Credits** on 1 June 2026, so the free allowance is now described differently on GitHub's own pages. Re-word rather than re-number.

### GAP

- **Download your codebase from Git settings (14 Aug 2026)** — **Project settings → Git → Download codebase** gives a one-time `.zip` with no repository at all. A useful escape hatch to mention for learners who stall on the GitHub connection.

---

## 5. Basics of Software for Vibe Coding (`vibe-coding-tech-00`)

Conceptual course, mostly durable. One framing issue:

### STALE

- **"Your backend toolkit" (yaml:681–685) and "The database" (yaml:131)** — _"Most AI app builders use **Supabase** for your app as the backend."_ For Lovable specifically, the thing a learner sees and is taught elsewhere in this catalogue is **Lovable Cloud** (Supabase underneath, but never named that in the product). The intro course teaches Lovable Cloud; this course teaches Supabase. A learner moving between the two will not connect them. Reconcile the vocabulary, or say plainly that Lovable Cloud is built on Supabase.
- **"Third-party services" (yaml:708)** — _"Hootsuit"_ is misspelt (Hootsuite). Separately, the whole "integrate X" story has changed shape: Lovable now has a **Connectors** catalogue with ~60 prebuilt integrations, custom connectors for any REST API, and a project **Connectors** page at **More → Connectors**. Prompting _"Integrate Stripe for payments"_ still works, but it is no longer the only route and the course reads as if it is.

---

## 6. Plan Your Vibe Coded App (`vibe-coding-product-management-00`)

No tool-specific instructions; the Lovable mentions are all generic ("open Lovable or your chosen AI app builder"). **Nothing to change.** This is the right pattern for staying evergreen.

---

## 7. Start Your Business (`vibe-coding-start-your-business-00`)

### NEEDS VERIFICATION

- **"Look for your events in the **Activity** menu" (yaml:550)** — I could not confirm PostHog's current left-nav label from their docs. Check against a live PostHog project before the next run.

### CORRECT

- PostHog free tier "1 million events per month" (yaml:487) — confirmed current on posthog.com/pricing.
- Project token starting `phc_`, found in project settings (yaml:537) — still correct.

### GAP

- **Session replay has its own free cap** — 5,000 recordings/month, separate from the 1M events. The course promotes session replay heavily (yaml:560–572) without mentioning it has its own limit.
- **PostHog is now a Lovable connector (27 Jul 2026)** — both an app connector and a chat connector. The course teaches a prompt-plus-token setup; the connector route is now simpler and the toolkit (`toolkit-posthog-setup.md`) should mention it.
- **Domains (Challenge 2)** sends learners to GoDaddy. If they are building in Lovable they can now buy and connect a domain from the project chat.
- **Stripe (Challenge 8)** — Lovable now has a built-in **Payments** section (Stripe and Paddle) always visible under **More** (23 Jul 2026), with its own revenue dashboard. Worth at least a pointer.

---

## 8. Write Better with AI (`write-better-with-ai-00`)

### WRONG

**"Examples: Popular LLMs" (yaml:274–279)** Course lists: _OpenAI: GPT-5, o3 / Anthropic: Claude Sonnet 4, Claude Opus 4.1 / Google: Gemini 2.5 Pro, Gemini 2.5 Flash / Meta: LLaMA 3, LLaMA 4._ Every one of these is at least a generation behind as of September 2026. For reference, Lovable's own changelog in this period shipped **GPT-6 Astra**, **GPT-5.6**, **Gemini 3.8 Flash**, and **Claude Opus 5**. A course about working with AI that names models from over a year ago undermines its own credibility in the first five minutes. Recommendation: replace the specific version list with families (OpenAI GPT, Anthropic Claude, Google Gemini, Meta Llama) and one line saying versions change every few months. That makes the step maintenance-free instead of needing a rewrite each quarter.

The rest of the course (tokens, prediction, prompt structure, tone) is model-agnostic and fine.

---

## 9. AI for Your Life Admin (`ai-your-life-admin-00`)

Built on iOS Shortcuts + Apple Intelligence, verified in late June 2026 against iOS 26. **iOS 27 has since shipped**, and it changed the exact action this course is built around.

### STALE — needs a rebuild on an iOS 27 device

- **The "Use Model" action's processing options.** The course teaches _Private Cloud Compute_ (Brain Dump) and _ChatGPT_ (Baby Log). iOS 27 adds a **Cloud Pro** option (Private Cloud Compute with extended context) and routes ChatGPT through an **Extension Model** option. The picker the learner sees no longer matches the course's instructions or the `systemPrompt` troubleshooting text in the free-text exercises (yaml:543, 627), which name the old options explicitly.
- **Settings paths** — _Settings → Apple Intelligence & Siri → Extensions → ChatGPT_ (yaml:472–477) and the Lock Screen / Back Tap / Action Button paths (yaml:593–600). These are exactly the labels Apple reshuffles between major releases. The course already hedges ("Apple shuffles these screens around between updates"), which is good, but the screenshots will be visibly wrong.
- **Device requirement** (iPhone 15 Pro or newer) — still correct on iOS 27.

Note: every step of both shortcuts is illustrated with a screenshot of the iOS 26 Shortcuts editor. A full rebuild-and-recapture on iOS 27 is the honest fix here; patching labels will leave the images contradicting the text.

---

## Cross-cutting: every Lovable screenshot is now stale

Four changes in this window mean essentially none of the ~50 Lovable UI screenshots across the four Lovable courses still match what a learner sees:

| Date            | Change                                                                    |
| --------------- | ------------------------------------------------------------------------- |
| 17 Jun 2026     | **A refreshed colour palette** — Lovable's whole interface changed colour |
| 19 Aug 2026     | Publish dialog simplified to a single view                                |
| 4 Sep 2026      | Project name menu removed; project settings moved                         |
| 9 + 16 Sep 2026 | Chat actions menu redesigned twice; now one **Add context** group         |
| 18 Sep 2026     | Project cards redesigned; all actions moved into the **⋯** menu           |

The colour palette change alone (17 June, three days after the last update) means every Lovable screenshot in the catalogue is off-brand for the current product, regardless of whether the flow it shows is still correct.

Highest-priority recaptures, because the flow changed _and_ the image is load-bearing: `lovable-publishing-00/upload-favicon.webp`, `set-meta-tags.webp`, `lovable-subdomain.webp`, `lovable-subdomain-updated.webp`, `update-api-key.webp`; `lovable-intro-00/publish-your-app-menu.webp`, `publish-your-app-menu-and-button.webp`, `published-url.webp`, `plan-mode.webp`, `attach-image.webp`; `vibe-coding-debugging-00/plan-mode.webp`.

---

## Suggested order of work

1. **`lovable-publishing-00`** — four broken step-by-step flows (API keys, subdomain, favicon/meta tags, custom domain) plus analytics. A learner cannot complete Challenge 1 or Challenge 2 as written. Fix first.
2. **`lovable-intro-00`** — one broken flow (meta tags), plus the credit and free-fix claims. Add **Chat mode** while you are in there; it is the most learner-relevant new feature of the quarter.
3. **`vibe-coding-debugging-00`** + its security toolkit + the intro course's pre-publish checklist — the "Try to fix all is free" correction, which appears in six places across three files.
4. **`write-better-with-ai-00`** — one step, five minutes, and it removes a recurring maintenance burden if you switch to model families.
5. **`ai-your-life-admin-00`** — needs a device with iOS 27 and a screenshot rebuild. Schedule it rather than squeezing it in.
6. **`vibe-coding-tech-00`** — vocabulary reconciliation (Supabase vs Lovable Cloud) and the Connectors reality. Not urgent.
7. **`vibe-coding-github-00`**, **`vibe-coding-start-your-business-00`** — wording touch-ups only.
8. **`vibe-coding-product-management-00`** — nothing.

## A note on cadence

Lovable shipped changelog entries on **61 separate days** in these 14 weeks. Three months between checks means roughly 60 changes to review at once, and it let two courses drift into a state where the published steps cannot be followed. The tool-facts sheets in the course folders already carry the right instinct — _"Checked 2026-06-27. Verify again if generating more than ~2 weeks later."_ — but nothing enforces it. A monthly pass over the changelog, scoped to the handful of pages the courses actually depend on (publish, custom-domain, credits-and-usage, preview-toolbar, projects/chat, projects/settings, cloud, analytics), would have caught every BROKEN item above within a fortnight.
