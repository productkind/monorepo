---
challenge: "7 - Handling Security Errors and Warnings"
---
## Security Warnings Decision Framework

A step-by-step flow for handling the security findings that Lovable's built-in auditor surfaces. Use this every time you open the Security panel and see items to address.

### Step 1: Know your app's context

Before deciding what to fix, be clear about who uses your app. This determines how urgently each finding needs attention.

| App type | Who uses it | Priority level |
|---|---|---|
| **Personal tool** | Just you | Low. Fix errors, note warnings for later. |
| **Internal team tool** | A small group you know | Medium. Fix errors and review warnings. |
| **Public app** | Anyone on the internet | High. Fix errors and warnings before publishing. |

### Step 2: Read the severity levels

Each finding in Lovable's Security panel has a severity label. Here's what they mean and what to do:

| Severity | What it means | What to do |
|---|---|---|
| **Error** (red) | A critical security issue. Data could be exposed or the app could be exploited. | Fix before publishing, regardless of app type. |
| **Warning** (orange) | An important concern that may or may not apply to your situation. | Fix for public apps. For personal or team tools, review the details and decide if it's relevant to your context. |
| **Info** (white) | A general recommendation or best practice. | Good to address over time, but not urgent for any app type. |

### Step 3: Fix what you can automatically

1. **Click "Try to fix all"** in the Security panel. Lovable will attempt to resolve the findings automatically.
2. **Run the scan again.** Check how many findings remain.
3. **Repeat up to 3 times total.** If findings persist after 3 rounds, move to Step 4.

### Step 4: Ask for guidance on remaining issues

For findings that weren't resolved automatically, use the **inline chat in the Security view** (this is free and doesn't cost credits).

**Copy this prompt and fill in the blanks:**
```
Explain what this finding means and suggest how to fix it. Here's my context:
- Who uses this app: [just me / my team / anyone on the internet]
- What the app does: [brief description]
- App stage: [prototype / hobby project / live product with real users]

Don't change the user experience. Only fix the security issue.
```

Read Lovable's explanation and decide whether to apply the fix based on your app type and the severity level.

### Common findings and quick fixes

#### Row Level Security (RLS) not enabled

**What it means:** Your database tables don't have rules controlling who can see or change each row. Without RLS, anyone who finds your Supabase project URL and public key (both are visible in your app's code) could read or modify all data directly, bypassing your app entirely.

**Why it matters:** Even if your app's interface only shows users their own data, the database itself is wide open. Someone could access every user's email, preferences, and history.

#### Leaked password protection disabled

**What it means:** Your app doesn't check whether a user's password has appeared in known data breaches. Users could sign up with passwords that have already been exposed.

**How to fix:**
1. Open the **Cloud** menu in Lovable.
2. Go to **Users**, then **Auth Settings**.
3. Select the **Email** sign-in method.
4. Enable the **Password HIBP Check** toggle.

This checks passwords against billions of known breached passwords and blocks any that have been compromised.

### After addressing security findings

- [ ] **Run the security scan one final time** to confirm everything is resolved.
- [ ] **Bookmark the secure version** so you have a safe point if future changes reintroduce issues.
- [ ] **Re-check security after adding new features** that involve user data, authentication, or database tables. New features can introduce new findings.
- [ ] **Security issues can rise even if you don't change code.** For example, if a new vulnerability is discovered in a library you use, it could trigger a new finding. Regularly check the Security panel to stay on top of any new issues.
