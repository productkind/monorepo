---
status: drafted
channels: [instagram, tiktok, youtube-shorts]
account: little-parrot
campaign: pm-technical-fluency-validation-2026-08
---

# Captions: API request vs webhook diagram

- **Brand:** Little Parrot. Instagram publishes from Little Parrot as a Collab with Kinga and Tamas; TikTok publishes from Little Parrot; YouTube Shorts publishes from productkind.
- **Source material:** [linkedin-tamas-webhook-vs-api.md](../linkedin-tamas-webhook-vs-api.md) and the diagram in this folder (`export/slide-01.png`).
- **What the content shows:** one static diagram, two panels. Panel one is an API request: our service sends an HTTP request to Instagram's `/tags/cutecats` endpoint and gets a list of posts back. Panel two is a webhook: our service holds `/instagram-events`, registers it with Instagram once, then Instagram sends the HTTP request every time there is a new post.
- **Destination:** `https://littleparrot.app/guides/technical-product-manager`, the technical product manager waitlist page.
- **Search phrase:** `what is a webhook vs api` (6,600/mo UK, 2,900 US) and `webhooks vs api` (720 US / 40 UK), from the campaign search-demand analysis.
- **LinkedIn is not in this set:** the long-form version already exists as Tamas's personal post, which outperforms a page post on reach.
- **"cutecats" is unhashed in body copy** on purpose: a mid-caption hash renders as a live tag on all three platforms. It keeps its hash in the alt text, where it is not a tag.

## Instagram (single image, Collab with Kinga & Tamas)

**Caption:**

What is a webhook vs an API request? Both are HTTP requests, and both follow the same request-and-response pattern. What the difference between them is when they are used: an API request is on demand, a webhook is for live updates.

Say our service wants Instagram posts tagged 'cutecats'.

📩 With an API request, our service asks when it needs them, and Instagram sends back a list of posts. To show the newest ones we'd have to ask every five minutes. That wastes resources on both sides, and we still find out late.

🪝 So we set up a webhook instead. We send Instagram one request carrying our own endpoint, /instagram-events, and that single request is how Instagram learns our address. After that, Instagram sends the request to us every time a new 'cutecats' post appears, and our service responds.

Save this for your next integration conversation, and send it to a product manager who's been too afraid to ask.

If you're a woman in product who wants to understand how your product works more deeply, we're testing a Technical Product Manager learning path for exactly that. You can sign up for the waitlist in the link in our bio, so you'll be the first to know when the learning path opens.

#womeninproduct #womenintech #womenproductmanagers #technicalpm #apis

**Alt text:**

A diagram by LittleParrot.app comparing an API request with a webhook, using the same two actors in both panels: our service on the left, drawn as a server, and Instagram on the right, drawn as the Instagram camera icon. In the first panel, our service sends an HTTP request for posts with #cutecats to Instagram's endpoint /tags/cutecats, and Instagram sends back an HTTP response with a list of posts. In the second panel, our service holds the endpoint /instagram-events. Once, at setup, our service sends one HTTP request telling Instagram to send new posts to that endpoint, and Instagram responds. After that, every time there is a new post, Instagram sends the HTTP request to our service, and our service responds. The bottom of the card shows the LittleParrot.app website link and a cartoon, orange little parrot peaks out from the right side.

**Bio link while this post is active:** https://littleparrot.app/guides/technical-product-manager?utm_source=instagram&utm_campaign=tech-pm-26&utm_content=webhook-vs-api

**Kinga:**

I asked for half of this to come out. The first version had the polling problem and a comparison table in it too, and it was so busy that the one thing that actually changes between the two panels disappeared. Once we cut it back, you could finally see the swap.

**Thomas:**

The arrow I forget every time is the response on the webhook side. Once Instagram is the one sending, our endpoint has to be up when it calls, so retries and repeat deliveries become our problem rather than theirs. Worth asking your engineers when you scope the integration, not after it's built.

## TikTok (photo post)

**Title:**

What is a webhook vs an API request?

**Caption:**

What is a webhook vs an API request? An API request is on demand: our service asks Instagram for cutecats posts when it needs them. A webhook is for live updates: we hand Instagram our endpoint once, then it sends us each new post. Follow for how software works, explained for women in product.

#womeninproduct #womenintech #womenproductmanagers #technicalpm

**Pinned comment:**

https://littleparrot.app/guides/technical-product-manager?utm_source=tiktok&utm_medium=organic-social&utm_campaign=pm-technical-fluency-validation-2026-08&utm_content=webhook-vs-api-diagram

## YouTube Shorts

Needs a minimal video treatment: the diagram is a still, and a Short has to be vertical video. A 12 to 15 second slow pan down the image, holding on each panel, is enough.

**Title (paste the whole line into the title field, 70 characters):**

What is a webhook vs an API? #womeninproduct #womenintech #technicalpm

**Description:**

Both are HTTP requests, and both follow the same request-and-response pattern. What changes is when they happen. An API request is on demand: our service asks Instagram for posts tagged cutecats when it needs them. A webhook is for live updates: we give Instagram our own endpoint once, and after that Instagram sends us each new post as it appears. Subscribe for a new explanation of how software works, made for women in product.

**Pinned comment:**

https://littleparrot.app/guides/technical-product-manager?utm_source=youtube&utm_medium=organic-social&utm_campaign=pm-technical-fluency-validation-2026-08&utm_content=webhook-vs-api-diagram

## Posting checklist

- Invite Kinga and Tamas as collaborators on the Instagram post before publishing. Never re-upload the same image on either account.
- Set the tracked Instagram URL as the first bio link while the post is active.
- Kinga's and Thomas's comments go up within the first hour of the Instagram post.
- Reply to every real commenter in that first hour, on all three platforms.
- TikTok and YouTube links go in the pinned comment, not the caption.
- Confirm `/guides/technical-product-manager` loads and the email form works before publishing.
