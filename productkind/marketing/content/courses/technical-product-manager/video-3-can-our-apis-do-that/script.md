---
status: drafted
channels: [linkedin, tiktok, instagram, youtube-shorts]
account: little-parrot
---

# Can our APIs do that?

**Runs:** about 90 seconds. **Search phrase:** "how does an API work".
**Learning path step:** 2, APIs, webhooks and integrations.

**Treatment:** narration over a screen recording of a real API response, shown
as text rather than code.

| Beat | Narration | Visual | On-screen text |
|---|---|---|---|
| Hook (0-12s) | "'Do the APIs we already use support the thing we want to build?' A product manager asked that. It's the kind of question that goes to engineering and comes back after the roadmap is agreed." | Text card, then the same question sitting in a Slack-style message while a calendar moves on | **"Do the APIs we currently use support the functionality we want to build?"** |
| What an API is (12-30s) | "An API is how one piece of software asks another for something, like our product asking the payment provider for a customer's invoices. Whether the ones you already pay for can do what your stakeholder wants is a fair question, and you can answer most of it yourself, without writing any code." | Screen recording: our product sending a request to the payment provider, the answer coming back | An API: one piece of software asking another for something |
| What comes back (30-40s) | "So look at what comes back. The request says what you want, and the response is a list of fields. Those field names tell you what data you can get." | Screen recording: a request sent, the response appearing as a list of labelled fields | Request in, fields back |
| The move (40-64s) | "Open the documentation for that service, find the response for the thing you care about, and read the field names. If your stakeholder wants to show the customer's last payment date, look for a date field. If it's there, the data exists, and the only question left for engineering is how to show it. If it isn't, you've found the hard part of the feature while you can still change the scope." | Documentation page, one field highlighted, then a missing field circled | Read the field names |
| The judgement (64-82s) | "What you can't tell from the field names is how often you're allowed to ask, whether the data is current, and what happens when the other system is down. Those are the three questions to bring to engineering, and they get you a specific answer, which 'is this possible?' never does." | Three question cards | How often? How fresh? What if it's down? |
| CTA (82-90s) | "Step two of our learning path is this question, answered against the APIs your own product uses. Not open yet, link's in the comments." | Waitlist page, step 2 in frame | littleparrot.app/guides/technical-product-manager |

## Short cut for TikTok, Reels and Shorts (about 45 seconds)

Keep the hook, "What an API is" and "The move". Drop "What comes back" and cut
"The judgement" to the three questions on screen with no narration over them.
Close with "Follow for more, one thing you can use in your next roadmap
conversation."

## Production notes

- **Screen recording needed:** one real API response. Use a service Little
  Parrot actually uses so the fields are real. Blur or replace any key, token
  or customer detail before it goes out, using the `media-to-webp` frosted
  panel or an edit in the recording.
- **Never show a live request with a working credential on screen**, even for a
  second, and check the frame before and after the highlight.
- **Payoff to protect in the edit:** "read the field names". The rest supports
  it.
