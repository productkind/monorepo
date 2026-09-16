---
piece: diagram-webhook-vs-api
format: single diagram image (1080x1350), Little Parrot brand
goes with: linkedin-tamas-webhook-vs-api.md
status: drafted
---

# Diagram: API request vs webhook

Two panels, same two actors, same arrow geometry. The only things that move between the panels are the direction of the request and the side the endpoint sits on, so the swap is the thing the eye picks up. The post carries the polling explanation, so it is not on the slide.

## Slide 1 (the only slide)

Visual: two framed panels, each with a server icon labelled our service on the left, the Instagram camera icon on the right, and the messages between them. Branding sits in the bottom right corner, with the Little Parrot mascot's head peeking over the bottom edge of the card beside it.

- Title: API Request vs Webhook
- Footer handle: LittleParrot.app

### Panel 1

- Kicker, on a gradient highlight: API REQUEST: ON DEMAND
- Left actor: our service
- Right actor: Instagram
- Endpoint under Instagram: /tags/cutecats
- Arrow, left to right. Tag: HTTP request. Payload: posts with #cutecats
- Arrow, right to left. Tag: HTTP response. Payload: a list of posts

### Panel 2

- Kicker, on a gradient highlight: WEBHOOK: FOR LIVE UPDATES
- Left actor: our service
- Right actor: Instagram
- Endpoint under our service: /instagram-events
- Moment tag: ONCE, AT SETUP
- Arrow, left to right. Tag: HTTP request. Payload: send new posts to /instagram-events
- Arrow, right to left. Tag: HTTP response. Payload: okay, got it, <3
- Moment tag: THEN, ON EVERY NEW POST
- Arrow, right to left. Tag: HTTP request. Payload: new post with #cutecats
- Arrow, left to right. Tag: HTTP response. Payload: thanks, I got it, xoxo

## Takeaway

A webhook is the same HTTP request-and-response pattern as an API request, with our service holding the endpoint and Instagram sending the request.

## Alt text

A diagram comparing an API request with a webhook, using the same two actors in both panels: our service on the left, drawn as a server, and Instagram on the right, drawn as the Instagram camera icon. In the first panel, our service sends an HTTP request for posts with #cutecats to Instagram's endpoint /tags/cutecats, and Instagram sends back an HTTP response with a list of posts. In the second panel, our service holds the endpoint /instagram-events. Once, at setup, our service sends one HTTP request telling Instagram to send new posts to that endpoint, and Instagram responds. After that, every time there is a new post, Instagram sends the HTTP request to our service, and our service responds.
