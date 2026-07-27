---
status: drafted
channels: [tiktok]
account: productkind
---

# When your app breaks and you can't see why — script

Bucket: doom-loop / stuck-moment rescue. Source:
`../../../../thoughts/assets/articles/015-building-with-lovable-my-vibe-coding-experience.md`.
Written in personal-tone-of-voice.

**Treatment:** brief Kinga to camera, screen recording of the real error and
fix in the middle, brief close. Roughly 60 seconds. The real hiccup is the
point; leave it in.

| Beat | Spoken | On-screen text |
|---|---|---|
| Hook (0-4s, to camera) | "I built a discount code feature, tested it, and hit an error I couldn't explain." | When your app breaks and you can't see why |
| Setup (4-14s, screen) | "I added a code, deleted it, added another, and got this: 'invalid coupon code or coupon has expired.' But the coupon existed. I could see it in Stripe." | — |
| The move (14-34s, screen) | "Here's the bit I want you to take. I didn't try to fix it myself. I asked the AI to explain what was wrong first. It can read all the error logs, so it found what I couldn't: the code I'd deleted was gone from the screen, but still sitting in the backend." | — |
| The lesson (34-48s) | "That's usually what a bug is. The AI did exactly what I asked, and I hadn't asked for enough. I told it to remove the code from the page, but never from Stripe and the backend." | — |
| The takeaway (48-60s) | "So when something breaks, ask the AI to explain what's wrong before you let it change anything. You fix the right thing instead of guessing." | — |
| CTA | "Follow for more real stuck moments and how we get out of them." | littleparrot.app |

**Screen recording needed:** the actual coupon error and the diagnosis prompt
("Why couldn't I apply this coupon? It exists in Stripe.") and Lovable's reply.
**Payoff/technique:** diagnose before fixing — ask the AI to explain what is
wrong before it changes anything.
