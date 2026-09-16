---
channel: linkedin-personal
account: Tamas, invite Kinga and productkind as collaborators
status: drafted
---

As a product manager, you may have heard the terms "API requests" and "webhooks". If you have ever been too afraid to ask what the difference is, or you could not explain it in your own words, this post might help.

Both terms describe communication between services. If you ask what a service is: a separate running parts of software that need to communicate and share data. These services could all belong to your product, or some could be third-party services provided by an external company.

One of the most common ways for services to communicate is through HTTP requests. If you remember one thing about them, let it be this: they follow a request-and-response pattern, rather than a back-and-forth conversation like a chat.

One service knows the address of another service, sends a request for some information, and receives a response.

An API request is the straightforward example we have just described.

Imagine our service needs images from Instagram based on a hashtag. Our service knows the Instagram API endpoint that returns results for a given hashtag. It sends a request containing #cutecats, and Instagram responds with a list of relevant posts.

Webhooks become useful when we need live updates from another service.

For example, imagine we want to show the latest cute cats in our app. We could send an API request to Instagram every five minutes to check whether there are any new posts, but that would waste resources for both our app and Instagram.

Instead, we can ask Instagram to send a request to us whenever something new happens.

This creates another problem: how does Instagram know where to send that request?

First, we give Instagram the API endpoint in our service that should receive the new posts. We do this, as you may have guessed, with an HTTP request. This is how we set up the webhook.

Once Instagram has our address, it can send a request to our service every time a new post containing #cutecats is created.

So the simple mental model is:

With an API request, we ask them for information.

With a webhook, we give them an address so they can tell us when something happens.

—

🧪 We're testing interest in a Little Parrot learning path for PMs who want to understand more deeply how their product works: https://littleparrot.app/guides/technical-product-manager?utm_source=linkedin&utm_medium=t&utm_campaign=tech-pm-26&utm_content=webhook-vs-api
