---
piece: email-cards-api-webhook
format: two illustration cards (1120x860 each), Little Parrot brand
goes with: little-parrot/assets/emails/2026-09-pm-webhooks-and-api-requests.html
status: drafted
---

# Cards: the two examples in the webhooks and API requests email

**One takeaway:** The same two systems, the same two messages. The difference is who sends the first message, and what triggers it. **Format:** 2 cards · 1120 x 860 · little-parrot

## Card 1 (API request)

Visual: one framed card. A server icon labelled your product on the left, a payment card icon labelled payment provider on the right, two arrows between them. The trigger sits above the actors, the result in a framed box below. Branding bottom left, the Little Parrot mascot peeking over the bottom edge.

- Kicker, on a gradient highlight: API REQUEST: ON DEMAND
- Trigger: WHEN A CUSTOMER OPENS THEIR BOOKING
- Left actor: your product
- Right actor: payment provider
- Arrow, left to right. Tag: request. Payload: payment status?
- Arrow, right to left. Tag: response. Payload: paid
- Result label: THE CUSTOMER SEES
- Result box: The booking screen shows it as paid.
- Footer handle: LittleParrot.app

## Card 2 (webhook)

Visual: the same framed card, the same two actors in the same places. The first arrow now runs right to left, so the swap is what the eye picks up. Branding bottom left, the Little Parrot mascot peeking over the bottom edge.

- Kicker, on a gradient highlight: WEBHOOK: REACT TO AN EVENT
- Trigger: WHEN A PAYMENT SUCCEEDS
- Left actor: your product
- Right actor: payment provider
- Arrow, right to left. Tag: request. Payload: payment succeeded
- Arrow, left to right. Tag: response. Payload: got it
- Result label: THE CUSTOMER GETS
- Result box: A booking confirmation, without anyone asking.
- Footer handle: LittleParrot.app

## Alt text

Card 1: a diagram of an API request. Your product, drawn as a server, sits on the left and the payment provider, drawn as a payment card, on the right. When a customer opens their booking, your product sends a request asking for the payment status, and the payment provider responds that it is paid, so the booking screen shows it as paid.

Card 2: a diagram of a webhook, with the same two systems in the same places. When a payment succeeds, the payment provider sends your product a request saying the payment succeeded, and your product responds that it got it, so the customer gets a booking confirmation without anyone asking.

## Design notes

- Card size is 1120 x 720, not the 1080 x 1350 carousel slide: these sit inside the email's 560px content column at 2x.
- Both cards keep the same actor positions and arrow geometry, so only the direction of the first arrow changes between them.
