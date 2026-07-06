# Research: Substack welcome email formats for conversion

Researched: 4 July 2026, via deep-research workflow (22 sources fetched, 107 claims extracted, 25 top claims adversarially verified: 22 confirmed, 3 refuted).

## Summary

The evidence converges on one formula: keep each welcome email roughly the length of Substack's default template, write it in a personal first-person voice rather than a polished marketing one, and give each of the four emails exactly one job. The single strongest, officially backed conversion tactic is putting an upgrade button above the fold of the free-subscriber welcome email. Welcome emails are the highest-performing email type there is, so this is the highest-leverage copy on Substack.

## Substack mechanics (confirmed, high confidence)

- Substack supports exactly four customisable welcome emails: free, paid, imported, founding. Configured under **Settings > Emails** (older guides cite Settings > Basics; that path is outdated).
- Every new organic subscriber automatically receives one, using Substack's pre-set template unless customised. Paid and founding versions only appear once payments are enabled.
- Subscribers who upgrade from free have already received the free welcome email, so the paid welcome should not repeat the introduction.
- Founding subscribers receive the founding email instead of the paid one (by default it is the same email), so a custom founding email must carry the paid signposting too.
- Substack provides no A/B testing or per-email analytics for welcome emails.

## Benchmarks (medium confidence)

- Opens: ~84% average for welcome emails vs ~40% for regular sends (GetResponse, 4.4B+ messages). Absolute numbers inflated by Apple Mail Privacy Protection auto-opens and not Substack-specific; the relative pattern (roughly double a normal send) is robust across GetResponse, MailerLite and Klaviyo.
- Clicks: ~16.6% CTR, the highest of any email type measured.
- Unsubscribes: 0.94% for welcome emails vs 0.15% all-email average. First touch is when people bail; argues for a gentle, personal opening, especially on imported lists.
- No Substack-native welcome-email benchmarks exist anywhere in the verified set.

## Format by email type

### Free subscribers (job: start the free-to-paid path)

Substack's own team, verbatim: "Our team advises including an upgrade button 'above the fold' of the email (before the reader needs to scroll), along with details of the paid benefits laying out the differences for free and paid subscribers."

1. Warm, personal opening in the writer's own voice. Framing is "you're in the right place" onboarding, not a re-sell.
2. Upgrade button visible before scrolling, with a plain statement of what paid adds.
3. Three or four links to best posts to build the reading habit; include great paid posts so free readers see what they're missing (one practitioner deliberately makes at least two of four links paywalled).
4. A genuine "hit reply and tell me why you joined" ask. Double duty: audience insight, and replies are the strongest signal to inbox providers that the sender is not spam.

### Paid subscribers (job: confirm the purchase was right)

- Do not repeat the free welcome (upgraders already got it).
- Thank them genuinely; name the solo-writer reality if true (personal beats polished, and this is where it earns retention).
- Signpost exactly what they unlocked, with direct links.
- Purpose is buyer's-remorse prevention and immediate engagement with paid material, not selling.

### Imported subscribers (job: deliverability, not spooking people)

- Substack requires imported lists to be explicitly opted in; contact/lead collections are likely to be denied, and imports can be flagged for manual review by Standards & Enforcement.
- Substack officially suggests sending a re-opt-in email before importing a large list.
- Known gotcha (documented January 2026, acknowledged by Substack support in one case): subscribers not yet opted in to the new publication may receive Substack's generic, uncustomisable invitation email without the writer's name, even when a custom imported welcome is configured.
- Content: remind them where they know you from, set expectations for cadence and topics, make unsubscribing easy and unshameful, include the reply ask. No hard upgrade pitch; the 0.94% first-touch unsubscribe benchmark says be gentle.

### Founding subscribers (job: appreciation)

Weakest-covered segment; no verified source gives founding-specific structure or data. From first principles plus confirmed tone guidance: a short, visibly personal thank-you, name concretely what the support funds, list founding perks, and carry the paid signposting (since this email replaces the paid one). Do not leave it as the default paid email.

## Length and tone (all four)

- Length: Substack says its default template is "a good guide for length and content". Practitioner recommendations cluster around 150-300 words; short wins.
- Tone: personal beats polished, officially backed: "Try not to make the welcome email feel too formal or like it's been autogenerated." Cited examples: handwritten signature, informal asides, even a family photo.
- Substack frames the stakes: this email "can be the difference between instant churn... and upsell from free to paying subscribers."

## Refuted claims (do not build on these)

- "73% of free-to-paid upgrades happen in the first two weeks" (circulates in creator blogs; unsourced, refuted 0-3).
- "Only three welcome email types exist" (wrong; there are four).
- "The welcome email is the only email Substack can send automatically" (refuted).

Weakly evidenced but structurally interesting: a 5-email sequence over 14 days (welcome, personal story, social proof, invitation, gentle pitch). Substack has no native multi-email automation, so it would require manual sends; the idea survived verification, its supporting stats did not.

## Open questions

- Actual Substack-native welcome email open/click/upgrade rates, and the conversion lift of a customised welcome vs the default template.
- Founding-specific structure and data.
- Whether Substack has fixed the January 2026 generic-invitation issue for non-opted-in imports.
- How much subscriber recovery is lost via the safer re-opt-in route vs direct import (acknowledged but unquantified everywhere).

## Key sources

- [Substack support: How do I set up welcome emails](https://support.substack.com/hc/en-us/articles/24034796625428-How-do-I-set-up-welcome-emails-on-Substack) (primary)
- [On Substack: Writing a good welcome email](https://on.substack.com/p/writing-a-good-welcome-email-on-substack) (primary, March 2023, still live)
- [Substack support: How do email list imports work](https://support.substack.com/hc/en-us/articles/360044079591-How-do-email-list-imports-work) (primary)
- [On Substack: How to convert subscribers from free to paid](https://on.substack.com/p/free-vs-paid) (primary)
- [GetResponse email marketing benchmarks](https://www.getresponse.com/resources/reports/email-marketing-benchmarks) (primary data)
- [MailerLite benchmarks](https://www.mailerlite.com/blog/compare-your-email-performance-metrics-industry-benchmarks) (primary data)
- [Unstack It: Substack welcome emails](https://unstackit.substack.com/p/substack-welcome-emails) and [importing an email list](https://unstackit.substack.com/p/importing-email-list-to-substack) (practitioner)
- [The Soirée: Let's talk about welcome emails](https://thesoiree.substack.com/p/lets-talk-about-welcome-emails) (practitioner)

Note on bias: Substack's own advice is platform self-guidance with a commercial interest in paid conversions; its core guide dates from March 2023 and remains unretracted.

## How this was applied (July 2026)

Drafts live in `thoughts/assets/emails/`: `welcome-email-to-free-subscribers.md`, `welcome-email-to-paid-subscribers.md`, `welcome-email-to-founding-subscribers.md`. Publication decisions taken: no fixed publishing schedule (write when there is something useful to say), paid tier = real numbers from running productkind, founding perk = free Little Parrot membership via discount code.
