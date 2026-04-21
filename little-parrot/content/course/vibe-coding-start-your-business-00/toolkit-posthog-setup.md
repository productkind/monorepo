---
challenge: "4 - Set Up Analytics Before Your First Visitors Arrive"
---
## PostHog Analytics Setup Guide

A step-by-step guide for adding PostHog analytics to your app. Use this while you're setting up analytics so you can copy the prompts directly into your AI app builder.

### Before you start

You'll need a PostHog account. Sign up for free at [posthog.com](https://posthog.com/) (the free tier covers up to 1 million events per month). Once you're in, find these two values in your project settings:

- **Your project API key** (a long string starting with `phc_`)
- **Your project host URL** (either `https://us.i.posthog.com` for US-hosted projects or `https://eu.i.posthog.com` for EU-hosted projects)

### Prompt 1: Set up PostHog

Copy this prompt, replace the two placeholders with your values, and paste it into your AI app builder.

```markdown
Add PostHog analytics using posthog-js.

Requirements:
- Initialize PostHog at app startup so it works on all pages
- Wrap the app with <PostHogProvider client={posthog}>
- Call init() on the PostHog client before passing it to the provider
- Enable session replay
- Use my API key: [POSTHOG_KEY]
- Use host: [POSTHOG_HOST]
- Use this config for initialization:

const options = {
  api_host: POSTHOG_HOST,
  defaults: '2026-01-30' as const,
  person_profiles: 'always' as const,
  session_recording: {
    recordCrossOriginIframes: false,
  },
}
```

**Filling in the placeholders:**

| Placeholder | What to put there |
|-------------|-------------------|
| `[POSTHOG_KEY]` | Your project API key from PostHog (starts with `phc_`) |
| `[POSTHOG_HOST]` | `https://us.i.posthog.com` for US projects, `https://eu.i.posthog.com` for EU projects |

Check the [PostHog JS config docs](https://posthog.com/docs/libraries/js/config) to see if a newer default config version is available and update the date if needed (we use `2026-01-30` in this example because it's the latest version at the time of writing).

### Verify it's working

After your app builder adds the code, open your app in the browser and then check your PostHog dashboard. You should see:

- A new event appearing in the **Activity** tab
- Your visit showing up under **Session Replay** (give it a minute or two)

If nothing appears, check that your API key and host URL are correct.

### Prompt 2: Add custom event tracking

Once PostHog is set up and working, use a separate prompt to add tracking for the actions that matter to your business. Adjust the event names to match your product.

```text
Now add PostHog event tracking using posthog.capture().

Track:
- "signup-form-submitted" - [Explain what this event means in your product, e.g. when a visitor
  submits the signup form]
- "feedback-button-clicked" - [Explain what this event means in your product, e.g. when a user
  clicks the button to give feedback]
```

Replace the example events with the ones that matter for your product. Use **kebab-case** with **object-verb** naming (like the examples above) so your events are easy to read in the PostHog dashboard. Good candidates are actions where a visitor becomes a user (signing up, starting a trial) or where a user gets value (completing a task, sharing something).

### Why two separate prompts

Keeping setup and tracking in separate prompts gives better results. The first prompt focuses on getting PostHog initialised correctly across the whole app. The second prompt focuses on placing tracking calls in the right spots in your code. Mixing both into one prompt often leads to the AI app builder cutting corners on one or the other.
