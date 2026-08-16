---
status: drafted
channels: [instagram, tiktok]
account: productkind (Instagram), kinga (TikTok)
---

# Carousel: Hi, we're Kinga and Tamas

**Type:** evergreen introduction, pinned to the top of the profile on Instagram
and TikTok. Filed in `content/build-in-public/` next to `tiktok-intro/`, the
video version of the same introduction.
**Brand:** productkind (warm gradient, Montserrat, Kim mascot), with the Little
Parrot logo on the product slide and LittleParrot.app on the CTA.
**Channels:** Instagram (`by_productkind`, pinned), TikTok (Kinga's creator
account, pinned). Both take the PNGs.
**Date:** August 2026

**Sources:** productkind site copy (`productkind/site/src/Home.tsx`: what we do,
our why, values, both bios, the talks list), the `little-parrot-ai-skill-gap`
skill (mission, audience, ethos, one-in-five figure, free first challenge), the
"employee to running a business" article carousel (the 1984 / 37% figure), and
the course READMEs in `content/courses/` (every course's first challenge is
free).

**One takeaway:** productkind is two people working on one thing, closing the
gender gap in AI adoption, and Little Parrot is the ten-minutes-at-a-time way
the reader can start building with AI herself.

**Story arc:** who we are, with our faces (1), the gap we exist because of, with
the number (2), the reason we take it seriously, because it happened before (3),
so the mission, stated once and plainly (4), who is actually behind it, both of
us (5), where we've taught it in person (6), the turn, a workshop is one
afternoon and most women can't spare one, so we built an app (7), what Little
Parrot gives you (8), which of these two people is you (9), the invitation, with
a share-ask (10).

**Visually different on purpose:** this is the only photo-led carousel we post.
The cover is a full-bleed photo with the type on a black band, and three more
slides carry real photos of us teaching and working. Everything else on the grid
is copy and device-led, so the photos alone make the pinned post read as the
"start here" card.

## Format

**Carousel, 10 slides, 1080 x 1350 (4:5 portrait).** productkind editorial
style. Devices used: full-bleed cover photo, big stat on gradient, the
1963-1984 chart, black statement card, paired photo cards, full-width photo,
Little Parrot logo with three short cards, paired text cards, brand CTA.

**Export note:** the same 1080 x 1350 export works on both channels. TikTok
photo mode pads the sides, so everything essential stays inside the 1080 x 1080
centre square.

**Header handle:** `productkind.com` on every slide (this is the company
introduction on the company account). LittleParrot.app appears as the Little
Parrot logo on slide 8 and the URL badge on slide 10.

**Spec key:** any text the reader literally types renders verbatim in monospace
inside the prompt-window mockup (no prompt snippets in this carousel).

**Full-fidelity rule:** every word that appears on a slide is in this table,
verbatim. The implemented carousel may not add copy; `check.py` in
`productkind/carousel-design/` enforces it.

| Slide | Visual | Display copy (verbatim) | Prompt window / mockup content (verbatim) |
| --- | --- | --- | --- |
| 1 (cover) | Full-bleed photo of the two of us (workshop or working together), type on a black band across the lower third | Kicker: "WE ARE PRODUCTKIND". Headline: "Hi, we're Kinga and Tamas. We help women build with AI." Runner: "SWIPE →" | – |
| 2 | Big stat on the warm gradient, copy below | Stat: "1 IN 5". Copy: "Anyone can build an app now by describing what they want. Only about one in five people doing it are women." | – |
| 3 | The 1963-1984 line chart, copy below | Chart label: "WOMEN'S SHARE OF US COMPUTER SCIENCE DEGREES". Chart labels: "37%", "1963", "1984". Copy: "It happened before. By 1984 women earned 37% of US computer science degrees. Then home computers were sold to boys, and the number fell." | – |
| 4 | Short copy above a black statement card | Copy: "We don't want a repeat, so we refocused our two-person company on one thing:". Statement card: "Closing the gender gap in AI adoption." | – |
| 5 | Paired photo cards, one each, square headshots with a label and a line | Card 1 label: "KINGA". Card 1: "Product leader. Ten years in tech, then a coding bootcamp to see how software really works." Card 2 label: "TAMAS". Card 2: "Software engineer. Eleven years mentoring women and girls into software development." | – |
| 6 | Full-width photo of us teaching a workshop or on stage, copy below | "We teach this in person too, in workshops and talks in Copenhagen, Porto, Lisbon and Málaga." | – |
| 7 | Full-width photo of the two of us working at our laptops, copy below | "A workshop is one afternoon though, and learning has to fit around work and family. So we built an app instead." | – |
| 8 | Little Parrot logo, then three short framed cards | Headline: "It's called Little Parrot. Short courses for women building with AI." Card 1: "Ten minutes at a time, around your day." Card 2: "Steps you can use the same evening." Card 3: "Questions and mistakes are welcome." | – |
| 9 | Paired text cards, the reader picks one, line below | Card 1: "I have an idea and no clue where to start." Card 2: "I'm building with AI but I don't understand what it made." Line: "Both are where our courses begin." | – |
| 10 (CTA) | Brand card: Little Parrot mascot, URL badge, offer line, share-ask | "Come and build something with us." Badge: "LITTLEPARROT.APP" · "The first challenge of every course is free 💛" · "Know someone with an idea she hasn't started? Send her this" | – |

**Alt text (for the post):** An introduction to productkind, a two-person
company. Slide one: Kinga and Tamas, who help women build with AI. Slide two:
anyone can build an app now by describing what they want, but only about one in
five people doing it are women. Slide three: a chart showing that by 1984 women
earned 37% of US computer science degrees, before home computers were sold to
boys and the number fell. Slide four: the mission, closing the gender gap in AI
adoption. Slide five: Kinga, a product leader with ten years in tech who went to
a coding bootcamp, and Tamas, a software engineer who has spent eleven years
mentoring women and girls into software development. Slide six: the workshops
and talks we teach in Copenhagen, Porto, Lisbon and Málaga. Slide seven: why we
built an app, because a workshop is one afternoon and learning has to fit around
work and family. Slide eight: Little Parrot, short courses for women building
with AI, ten minutes at a time, with steps you can use the same evening and a
space where questions and mistakes are welcome. Slide nine: two starting points,
having an idea with no clue where to start, or building with AI without
understanding what it made. Slide ten: an invitation to LittleParrot.app, where
the first challenge of every course is free.

## Photos needed

Four photo slots. The two headshots for slide 5 already exist in the repo
(`productkind/site/public/assets/photo-kinga.webp`, `photo-tamas.webp`) and get
copied into `uploads/`. The other three need files from you, dropped into
`uploads/` with these names:

| File | Slide | What it needs to show | Shape |
| --- | --- | --- | --- |
| `cover-us.jpg` | 1 (full bleed) | The two of us together, teaching or working. It sits behind a black type band across the lower third, so keep faces in the upper half. | Portrait, at least 880 x 1150 |
| `workshop.jpg` | 6 | Us teaching: a workshop room, participants at laptops, or one of us on stage. Participants visible is stronger than a stage portrait. | Landscape, roughly 3:2 |
| `working.jpg` | 7 | The two of us working at our laptops, candid, a desk or a cafe. | Landscape, roughly 3:2 |

Until they arrive the design uses labelled placeholder slots, so the layout and
the export can be reviewed without them.

## Posting notes

- Pinned on both channels. On Instagram it's the first thing a visitor from a
  course link or a Story sees; on TikTok there is no clickable bio link yet, so
  the LittleParrot.app badge on slide 10 is the only way the URL travels.
- Captions come after the carousel is final, with the captions skill
  (`captions.md` in this folder). TikTok's caption ends on a follow-ask, never
  "link in bio".
- The 37% / 1984 figure is the same one we've already published in the "employee
  to running a business" carousel, so the two pieces stay consistent.
- **Slide 2's figure needs a decision.** This carousel uses "about one in five",
  which is the sourced claim about vibe coders. The intro TikTok pinned next to
  it (`../tiktok-intro/captions.md`) says "only 14% of the people building with
  AI are women", which is really the Lovable user figure. Two different numbers
  on two pinned introductions is worth avoiding. Either swap the stat slide to
  "14%" and attribute it to Lovable's users, or correct the TikTok caption to
  one in five.
- "Both are where our courses begin" is true across the current catalogue: the
  builder courses start from an idea, and software-basics, write-better and
  debugging start from not understanding what the AI made.
- Slide 6 lists only cities where we actually taught (Copenhagen Developers
  Festival, NDC Porto, Productized Lisbon, Wey Wey Web Málaga). Singapore is
  left out on purpose: we attended the SheBuilds event there, we didn't teach it.
- Slide 7 says "learning has to fit around work and family", which is our own
  stated premise for microlearning. If it's true that the women you met at the
  workshops told you they couldn't spare an afternoon, say so and I'll use that
  instead, it's the more concrete line.
- Slide 10's share-ask says "she". Happy to make it "them" if you'd rather keep
  it open to the non-binary folks the site also welcomes.


| Slide| On-slide copy| Photo |
| -----| ----- | ----- |
| **1. Hook**| **Little Parrot helps women build what felt impossible before AI.**, kicker: **Meet the people behind Little Parrot** | NDC Cph |
| **2. The old life** | I started my career in luxury fashion, moved into tech, and eventually became a Lead Product Manager. I loved building products. | La Perla SG |
| **3. The tension** | I wanted my work to have a more positive impact, beyond increasing revenue for shareholders. So I left my full-time product role.| On stage at Geek Girls |
| **4. The uncertain bit** | **I knew I wanted to help women. I had no idea what that would look like yet.** I tried coaching. I consulted. I experimented. | Presenting at Productized |
| **5. The discovery** | I started Little Parrot in June 2025. At first, it was for product managers. Then I saw a much bigger opportunity: helping more women become builders with AI. | Little Parrot sticker |
| **6. We become "we"** | **That’s where Little Parrot found its purpose.** Tamas joined as our technical partner and educator, and we started rebuilding it around a simple goal: help more women build with AI. | NDC Cph workshop |
| **7. Signs we were onto something** | Then people we didn’t know started learning with us. 663 people registered for our free course we offered at International Women's Day. Then someone we didn’t know paid for one. Then another. And another. From South Korea, England, the US, Australia… | Wey Wey Web workshop |
| **11. Where we are now** | **Little Parrot is still just the two of us.** We make short, practical, science-based courses for women with ideas who don’t yet see themselves as technical. / Today, we make hands-on courses for women who want to turn ideas into real products with AI. | ? |
| **12. Invitation** | Maybe you have an idea too. **We want to help you get from “Could I build this?” to opening your laptop and trying.** | ? |