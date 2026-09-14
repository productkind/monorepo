---
status: drafted
campaign: pm-technical-fluency-validation-2026-08
brand: little-parrot
channels: [linkedin, instagram, tiktok]
account: little-parrot
---

# Carousel: what product managers type into Google

**Source material:** `productkind/ai-research/pm-technical-fluency/pm-technical-fluency-observed-search-phrases-2026-08.md` (the 157 observed phrases), with the need families and outcomes from `pm-technical-fluency-opportunity-synthesis-2026-08.md` and `../videos.md` **Brand:** Little Parrot **Channels:** LinkedIn (PDF document post, lead channel), Instagram, TikTok (PNGs) **Destination:** `https://littleparrot.app/guides/technical-product-manager` **Date:** September 2026

**One takeaway:** the words you look up afterwards are the words nobody explained in the room, and a definition still doesn't tell you what they mean for your release.

**Story arc:** the admission on the cover, you looked it up instead of asking (slide 1), then five real search phrases, one per need family, each with the meeting it followed (2 to 6), the turn, every one of those is a phrase Google or YouTube offered us and looking it up afterwards still answers the wrong question (7), who is building this (8), what you'll be doing by the end (9), the waitlist with a send-ask (10).

**Ten slides, matching the shape of the approved `carousel-230-quotes` deck**, so the two validation carousels read as one series: cover, five evidence slides, turn, credibility, outcomes, CTA. Where that deck shows a verbatim quote with its attribution, this one shows a verbatim search phrase with its observation source. Same structure, different evidence.

## Why this deck is built on search phrases

**An earlier draft of this spec was built from the situation table in `../videos.md`** and was rejected as the eight video scripts in slide form. It was. This version goes to a research file the campaign has never used.

`pm-technical-fluency-observed-search-phrases-2026-08.md` records 157 unique phrases, each retained only when Google autocomplete, YouTube autocomplete, People Also Ask or related searches returned it verbatim on 24 August 2026. The campaign brief originally planned to open every video with one of these phrases; `../videos.md` superseded that plan, so the file has never been used in any asset.

**The finding the deck is built on:** across six separate need families, the phrase the autocomplete offers ends the same way. "how does an api work for dummies", "ci cd explained for dummies", "technical debt explained for dummies", "webhooks explained for dummies", "claude code for non technical beginners", "What does it mean to reproduce a bug?". These are practising product managers, several of them directors, typing "for dummies" at their desk because they could not ask in the meeting.

**It also solves the problem that stopped the previous draft quoting anyone.** The vibe coder deck quotes real women because its corpus is anonymous public posts. Here the strictly eligible evidence units are named product managers with LinkedIn profile links, plus one person in a private Women in Product Slack, so quoting them is off the table and `../videos.md` already ruled it out for the campaign. A search phrase returned by an autocomplete endpoint belongs to nobody. It is public, verbatim, and carries no risk of embarrassing a real person in front of an employer.

**Still no prevalence claim.** Autocomplete proves a phrase is produced by the interface, not how often anyone searches it, and the research file says so explicitly. No slide says how many product managers do this, and no volume figure appears anywhere in the deck.

**Why these five phrases:** one per need family, all scoring 3 on the research's own audience-fit scale (directly relevant to a generalist product manager), and across three different observation sources so the deck does not rest on autocomplete alone. Slide 2 is "understand how a software product fits together", slide 3 is APIs and data flow, slide 4 is how a change gets from development to users, slide 5 is investigating and triaging issues, slide 6 is building a bounded prototype with AI. The sixth family, feasibility and technical trade-offs, is left out: its phrase is "technical debt explained for dummies", and technical debt is the one term on the list that is already product vocabulary rather than engineering vocabulary, so it makes the weakest version of the point. It is the first candidate if a second deck follows.

**Real terms, no definitions.** The phrases contain API, CI/CD and Claude Code unglossed, which is the point of the deck. This is the documented exception in `../videos.md` to the inline-definition rule in the `language-rules` skill, which exists for beginner-facing course copy.

## Format

**Carousel, 10 slides, 1080 x 1350 (4:5 portrait).** Little Parrot brand, same components as `carousel-230-quotes`: titles in the display font at the top of every slide, black statement cards for the turn and the credibility slide, four outcome cards on 9, brand CTA on 10. Slides 2 to 6 use the prompt-window mockup as a search box.

**Export note:** the same 1080 x 1350 export works on all three channels. TikTok pads the sides, so keep all essential text inside the 1080 x 1080 centre square.

**Spec key:** the search phrases on slides 2 to 6 are text a person literally typed, so they render verbatim in monospace inside the search-box mockup, exactly as the research file records them, including the lower case on four of them and the question mark on slide 5.

**Full-fidelity rule:** every word that appears on a slide is in this table, verbatim. The implemented carousel may not add copy; `check.py` in `productkind/carousel-design/` enforces it.

| Slide | Visual | Display copy (verbatim) | Prompt window / mockup content (verbatim) |
| --- | --- | --- | --- |
| 1 (cover) | Brand cover, parrot mascot peeking in from the right, kicker low left | Kicker: "FOR PRODUCT MANAGERS WHO AREN'T ENGINEERS". Headline: "You didn't ask in the meeting. You asked Google afterwards." Runner: "SWIPE →" | – |
| 2 | Search-box mockup, source label under it, our line below | Source label: "YouTube autocomplete, August 2026". Line: "After a design review where everyone else already knew how the app fits together." | Search box: "how web apps work for beginners" |
| 3 | Search-box mockup, layout repeats from slide 2 | Source label: "Google autocomplete, August 2026". Line: "After you said yes to the integration." | Search box: "how does an api work for dummies" |
| 4 | Search-box mockup | Source label: "Google autocomplete, August 2026". Line: "After you promised a date you couldn't explain." | Search box: "ci cd explained for dummies" |
| 5 | Search-box mockup | Source label: "Google People Also Ask, August 2026". Line: "After you forwarded a customer's screenshot." | Search box: "What does it mean to reproduce a bug?" |
| 6 | Search-box mockup | Source label: "Google autocomplete, August 2026". Line: "After a stakeholder asked when the prototype ships." | Search box: "claude code for non technical beginners" |
| 7 | Black statement card, gradient text on the second sentence | "Every one of those is a real phrase Google or YouTube offered us. You can look it up afterwards, and it still won't tell you what it means for your release." | – |
| 8 | Black statement card, gradient text on the third sentence | "Kinga was a lead product manager. Tamas spent fifteen years as a software engineer. We're building this from both sides of the conversation with engineering." | – |
| 9 | Four outcome cards, title above | Title: "What you'll be doing by the end." Card 1: "Repeat back what an engineer explained, in your own words, in the meeting" Card 2: "Map what your product depends on, and what breaks when one of those parts fails" Card 3: "Reproduce a bug and find the failed request yourself" Card 4: "Name what production needs that a prototype skipped" | – |
| 10 (CTA) | Brand card: parrot mascot, URL badge, offer line, send-ask | "We're building this learning path out of exactly these five searches." Badge: "LittleParrot.app/guides/technical-product-manager" · "Join the waitlist and we'll let you know when it opens 🦜" · "Know a product manager who looks these words up after the meeting? Send them this." | – |

**Alt text (for the post):** A carousel for product managers who aren't engineers, built from search phrases we observed in Google and YouTube. It opens on the admission that you didn't ask in the meeting, you asked Google afterwards. Then five real search phrases, each shown in a search box with where we observed it and the meeting it followed. "how web apps work for beginners", from YouTube autocomplete, after a design review where everyone else already knew how the app fits together. "how does an api work for dummies", from Google autocomplete, after you said yes to the integration. "ci cd explained for dummies", from Google autocomplete, after you promised a date you couldn't explain. "What does it mean to reproduce a bug?", from Google People Also Ask, after you forwarded a customer's screenshot. "claude code for non technical beginners", from Google autocomplete, after a stakeholder asked when the prototype ships. Then the point of the deck: every one of those is a real phrase Google or YouTube offered us, and you can look it up afterwards and it still won't tell you what it means for your release. Kinga was a lead product manager and Tamas spent fifteen years as a software engineer, so they're building this from both sides of the conversation with engineering. By the end you'll repeat back what an engineer explained, in your own words, in the meeting, map what your product depends on and what breaks when one of those parts fails, reproduce a bug and find the failed request yourself, and name what production needs that a prototype skipped. It ends with the waitlist at LittleParrot.app/guides/technical-product-manager.

## Posting notes

- Captions are written after the carousel is final, with the captions skill (`captions.md` in this folder).
- **Every search phrase is reproduced exactly as the research file records it**, including the lower case on four of them and the capitalised question on slide 5, which is how Google displayed it. Do not tidy them; the untidiness is the evidence.
- **LinkedIn is the lead channel**, as it is for the video half. This deck suits it: a product manager can recognise themselves without admitting anything in public, which a comment-bait question would ask them to do.
- The send-ask on slide 10 names the person to send it to, and deliberately does not ask the reader to confess in the comments.
- Video 1 ends on "What technical word did you look up last?". This deck answers that question with five real ones, so the two reinforce each other rather than repeating.
- Slide 8's facts are on the record in `productkind/little-parrot-context.md`: Kinga worked as a lead product manager, Tamas spent 15 years as a software engineer and engineering leader.
- Slide 9's four outcomes map to the "what they'll be able to do" column in `../videos.md` for videos 1, 2, 5 and 8, which `videos.md` states are each mapped to something on the waitlist page. Nothing here promises a reader will read their team's code, judge an estimate alone, or move into an engineering role.
- The five situations from the rejected draft (demoing every screen, saying yes to a small request, waiting behind another team's release, forwarding a screenshot, the prototype a stakeholder wants shipped) survive as the "After..." lines on slides 2 to 6, compressed to one line each.
- UTM for the LinkedIn link: `https://littleparrot.app/guides/technical-product-manager?utm_source=linkedin&utm_medium=organic-social&utm_campaign=technical-product-manager&utm_content=carousel-search-phrases`
