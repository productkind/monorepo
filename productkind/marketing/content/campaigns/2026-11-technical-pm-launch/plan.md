---
status: proposal
campaign: technical-pm-launch-2026-11
brand: little-parrot
channels: [linkedin, email, communities, events, partners]
---

# Launch plan: the technical PM learning journey

**Date:** 10 October 2026 **For:** Kinga and Tamas **Builds on:**

- [Matt Pocock's Total TypeScript launch](../../../../ai-research/total-typescript-launch-research-2026-10.md)
- [the learning journey design](../../../../../little-parrot/content/course/technical-skills-for-product-managers-learning-journey-design.md)
- [the September validation campaign](../2026-09-pm-technical-fluency-validation/brief.md)
- [the content ideas planned to feed the waitlist](../2026-09-waitlist-value-content/README.md)

**Waitlist page:** https://littleparrot.app/guides/technical-product-manager

Numbers marked _target_ are guesses to test, not forecasts.

## The plan on one page

- **Goal for the first season:** 10–15 paying founding learners, most of them paid for by their employer, before we build Missions 4–8.
- **Sell before we build, as Matt did.**
  - Run the free workshop (Mission 1) twice: in person in Lisbon during Portugal Tech Week, then online the week after.
  - Open founding enrolment straight after, with the season starting in January 2027.
  - Employers can pay from what's left of their 2026 budget (invoice in December) or from the new year's budget (start in January).
- **Three channels, in this order:**
  1. **Warm enterprise contacts:** Volkswagen in Portugal, then memoQ. This is the route most likely to lead to a sale, because the employer pays and the four PMs are already interested.
  2. **LinkedIn,** through Kinga's and Tamas's own profiles (about 5,900 followers together), not the company page.
  3. **Email:** the 859 people on the Little Parrot list, the waitlist, and everyone who registers for a workshop.
- **Not in this launch:**
  - **TikTok and Instagram:** the September review found 0 net followers, and viewers were 83% Hungarian and 68% male.
  - **X:** no audience there.
  - **Podcasts and Code Like a Girl:** these come after the workshops, to grow the audience for the second season.
- **Marketing time:** one day a week, so every week below is a single working day's list, done in order.

## 1. Decisions needed this week

The plan depends on these. My recommendation is in brackets.

1. **Workshop format and dates.**
   - (Agreed on 16 October: in person in Lisbon on Friday 13 November, 19:00–21:30, the day after Web Summit ends. The workshop takes 2 hours and starts a little after 19:00, because people often arrive late to evening meetups in Portugal.)
   - (Recommend: 20–30 places in Lisbon, plus the same workshop online on Tuesday 17 November for up to 60.)
   - Portugal Tech Week prefers in-person events. The online repeat reaches the LinkedIn audience outside Lisbon, and people who are busy with Web Summit, which runs 9–12 November in the same week.
2. **A venue for the Lisbon workshop.**
   - (Agreed on 16 October: PTW Palace, the festival's central venue, at R. Gomes Freire 98.)
   - A co-host is still worth asking for: Product Management Society Lisbon or the Volkswagen contacts would bring their own PMs into the room.
3. **What the workshop runs on.**
   - The design now has attendees set up their own copy of the product in GitHub Codespaces during the workshop, start the app themselves, and end by giving their bug report to GitHub Copilot and testing its fix in their copy. A shared fallback copy covers laptops that can't run it. None of it is built yet, and four weeks of evenings is tight.
   - (Agreed on 11 October: run the Codespaces trial checks in the week of 12 October and decide on Friday 16 October.)
   - If the checks pass, both workshops run on Codespaces.
   - If they don't, Lisbon runs on one shared copy with the browser, the server log and the database view on a single page, and without the setup and the Copilot fix, so it goes back to 90 minutes. Codespaces then starts with the online workshop on 17 November, or in January, when founding learners set up their copy at the start of the season, if it still isn't ready.
   - This is the biggest risk to the dates, so the workshop build (section 3) runs alongside the marketing weeks.
4. **Founding price.**
   - (Recommend €490 per learner, invoiced to the employer, with a team price for three or more.)
   - It sits inside the €400–€800 range from the willingness-to-pay research, and it's the same deliberate move as Matt's $490: under the amount that often needs no extra approval.
   - Check what card or approval limits the Volkswagen PMs actually have, and change the price if theirs differ.
   - The waitlist page already asks signups whether the price works. Use those answers before 2 November.
5. **Season format.**
   - The design says eight weeks with weekly clinics. You described a self-paced course of a couple of weeks with office hours.
   - The marketing works either way, but the offer email needs one answer by 2 November.
   - (Recommend: self-paced missions with two fixed office-hour slots a week, a suggested pace, and a start date in January so the founding group moves through together.)
6. **What the session says about the paid season.**
   - Portugal Tech Week rejects side events that "try to sell products and services".
   - (Recommend: the Lisbon session only teaches. At the end, people are told they'll get an email with the field guide, the bug report template, the recording and details of what comes next. The online session on 17 November ends with five minutes on what the learning path covers, after the teaching, as the design now describes.)

## 2. Targets

| Stage | Target | How we measure it |
| --- | --- | --- |
| Workshop registrations | 30 in Lisbon, 80 online | Registration form, with `utm_content` for each post, email and partner |
| Attendance | 70% in Lisbon, 40% online | Check-in and Zoom report |
| Waitlist signups | 4 now → 100 by 30 November | Waitlist page, with UTMs already saved |
| Founding learners | 10–15, 5+ of them employer-paid | Invoices |
| Team deals | 1 company buying 3+ seats | Signed order |

If registrations are under 15 for Lisbon or 40 online by 2 November, that tells us about channel reach, not interest in the course. Put the extra hours into direct outreach (section 4.1), not more posts.

## 3. Week by week

Each week is one marketing day.

### The workshop build, alongside the marketing weeks

The marketing days don't include building. This is the build track that has to keep pace with them. The check numbers refer to the trial checks in the design's section 6.

| Week | Build | Done when |
| --- | --- | --- |
| From 12 October | The workshop trial checks, 1–14: the machine Twenty needs with the frontend running from source, setup as a short lesson, start times, signing in through the forwarded addresses, the story data, the bug seeded across all four layers, Copilot in a codespace, ten Copilot runs with the bug report and ten with a one-line complaint, the branch with the fix, 30 codespaces at once, a phone hotspot, a locked-down work laptop and idle stops | The decision on Friday 16 October |
| From 19 October | If the checks passed: the development container and prebuild, the seeded bug, the story data and the branch with the fix. If not: the one-page shared copy | The whole trail and the fix work on one laptop |
| From 26 October | The shared fallback copy, the field guide, the recorded run of the trail and of the one-line complaint, and a small test codespace for the laptop check | Everything in place by Friday 30 October |
| From 2 November | Re-run the Copilot checks (7–10), then a full rehearsal with two or three testers, one of them on a locked-down work laptop over a phone hotspot. Fix what breaks, then send the setup email | Setup email out by Tuesday 3 November, ten days before Lisbon |

The remaining trial checks (15–18) are for the season, so they move to December.

### Week 1, from 12 October: set up and tell the warm network

1. Make the six decisions in section 1.
2. **Submit the Lisbon session to Portugal Tech Week** (https://portugaltechweek.com/submit-event/), using the [listing text](portugal-tech-week-submission.md).
   - Submit after the decision on Friday 16 October, because the listing promises the setup and the Copilot fix, which need Codespaces. If the checks fail, the listing file says what to cut.
   - No deadline is published. Call +351 960 306 376 to confirm it's accepted, and to ask whether a related online session can also be listed.
3. **Message the four Volkswagen PMs individually.** Ask each one three things:
   - Will they come to the workshop?
   - Who else in their team or network should be invited? Ask for introductions, not just names.
   - Who decides on training budgets?

   Also ask whether the office could host the Lisbon session.

4. **Message Gabriela Naumnik at Product Management Society Lisbon** (1,200+ members, Slack) to offer the workshop as a co-hosted session or a listing in their Slack.
5. **Set up the registration page and UTMs.**
   - Registration can be a section on the waitlist page or its own page, but each registration has to save its UTM values.
   - Update the waitlist page so its main button invites people to the workshop. The page itself stays as it is.
6. **LinkedIn:** Kinga posts the workshop announcement. Tamas posts one problem-led post from the existing campaign material (the webhook vs API diagram is ready) with the workshop link in the first comment.

### Week 2, from 19 October: the free series and the communities

1. **Start a numbered LinkedIn series,** our equivalent of Matt's "🔥 TypeScript Tip #N 🔥": _"Questions PMs don't ask in standup #N"_.
   - Each post covers one technical question, answered in under 200 words with one picture.
   - Two a week, alternating between Kinga and Tamas. Write four in this session to cover two weeks.
   - Topics come from the eight existing video scripts and the five PM ideas in the waitlist content plan:
     - "Engineering says it's done. Users still don't have it."
     - "Can we just add a field?"
     - "Send engineering a bug they can act on in five minutes"
     - and others from the same lists.
   - Every post ends with the workshop link, never a fear-based hook.
2. **Email the Little Parrot list.**
   - One email: "Are you a product manager? We're running a free workshop".
   - Ask readers to forward it to a PM friend. Tag everyone who registers so later emails go only to them.
3. **Community posts,** with permission and UTMs:
   - Geek Girls Portugal;
   - Women in Product (community.womenpm.org; there's no Lisbon chapter);
   - the Product Management Society Lisbon Slack;
   - ProductTank Lisbon (2,789 members). Pitch a talk through mindtheproduct.com/speak for a future meetup; it won't happen in time for November.
4. **memoQ:** message your former manager or the head of product. Offer the online session to their PMs, and ask about a team place in the founding season.

### Week 3, from 26 October: proof and preparation

1. **Series posts #3 and #4.**
2. **A build-in-public post,** like Matt's "How I gained 6,250 followers": what we learned from the four Volkswagen conversations and the price answers so far. People respond to a real process.
3. **Email registrants** the laptop check from the design (section 6), using the small test codespace, two weeks ahead. Anyone with an amber or red result has time to find a personal laptop or ask IT. This also reminds them it's happening.
4. **Pitch Code Like a Girl** by Substack DM.
   - A solo-authored post of 1,000–3,000 words, draft due two weeks before publication.
   - Aim for early December. Its job is to bring readers to the season two waitlist, not to this launch.
5. **Write the follow-up email sequence** (section 5) now, so it's ready the day after each workshop.

### Week 4, from 2 November: last push

1. **Series posts #5 and #6.**
2. **Send the setup email** by Tuesday 3 November: create a free GitHub account, turn on GitHub Copilot's free plan and run the laptop check, about ten minutes. The workshop's own codespace is created in the room, because setting it up is part of the lesson. Only if the trial checks passed; otherwise the email says the workshop needs nothing but a browser.
3. **Run the paid ad** (section 4.4) on Kinga's online-workshop post, for 10 days until 16 November.
4. **Ask the Volkswagen and memoQ contacts to share the online session** with a ready-to-forward message.
5. **Fix the offer:** the price, the start date, what's included, the invoice and the message to send to a manager. The design's expense route has the template.

### Week 5, from 9 November: the workshops

- **Lisbon session** on Friday 13 November, 19:00–21:30, at PTW Palace.
- **Day 1 email** the next morning (section 5).
- **One LinkedIn post each:** what happened, with photos and a quote from an attendee (ask permission).
- **Online session on Tuesday 17 November.**

### Weeks 6–8, from 16 November to 4 December: founding enrolment

1. Run the follow-up sequence (section 5).
2. **Offer every attendee a 15-minute call.**
   - Enterprise PMs who ask their employer to pay need answers to their manager's questions. A conversation is more likely to lead to a sale than another email.
3. Keep the series going at two a week.
4. **Close enrolment on a real date,** e.g. 11 December, so invoices can go out before budgets close for the year and the founding group starts together.
   - Say why the date exists. Don't use invented deadlines, scarcity or "last chance" pressure.

### January 2027: the founding season starts

Build the self-paced version of Mission 1 and Missions 2 and 3 in December, run the remaining trial checks, and build the later missions one week ahead during the season, as the design proposes.

Founding learners who didn't attend a workshop do the self-paced Mission 1 in the week before the season starts. It uses chapters of the 17 November recording as its worked answers, so record that session.

GitHub deletes a codespace after 30 days without use (its default), so most November attendees' copies will be gone by January. The follow-up emails say Mission 2 starts with the same one-click setup, instead of promising their copy is still there.

## 4. Channels in more detail

### 4.1 Warm enterprise contacts (most likely to lead to sales)

- **Volkswagen in Portugal.**
  - The four PMs are senior, interested, and their employer would pay. Treat them as the first founding learners, and ask for introductions.
  - A team purchase of 3–5 seats from one company would on its own meet half the target.
  - If the Lisbon office hosts the workshop, its PMs come through the door with no marketing at all.
- **memoQ in Hungary.** The same approach, online.
- **Write down what each buyer asks,** e.g. "Does it need installs?", "What will they produce?", "Is there an invoice?". Those questions become the FAQ and the objections email.

### 4.2 LinkedIn (most reach)

- **Post from personal profiles:** Kinga 2,101 and Tamas 3,824 followers. The company page (290) only reshares.
- **Two posts a week** in the numbered series. Every two to three weeks, add a build-in-public post or a roundup of the series so far ("All the questions so far, in one place"). Matt's roundup posts got several times the reach of a single tip.
- **Write all of the next two weeks' posts in one sitting** on the marketing day. Use the linkedin-post skill and its critic so every post gets the same review.
- **A link in every post's first comment,** with UTMs.

### 4.3 Email

- **Little Parrot list (859):** one segmenting email in week 2, then only to people who say they're PMs or register.
- **Waitlist (4):** the workshop invitation now, and the offer later.
- **Registrants:** laptop check, setup email, reminder, then the follow-up sequence.

### 4.4 Paid ads, €135

- **Spend:** one LinkedIn Thought Leader Ad on Kinga's post for the online workshop, at $10/day for 10–13 days.
- **Who sees it:** people with Product Manager, Product Owner or Senior Product Manager titles, in Portugal, Spain, the UK and Hungary, at companies with 1,000+ employees.
- **What it buys:** at a cost per click of about €5–6 in Western Europe, about 20–25 clicks. That isn't enough to change the launch. It answers one question for later: what an enterprise PM's click and registration cost.
- **Why not elsewhere:** Meta and Reddit can't target job titles. TikTok and Instagram reached the wrong audience in September.
- **Requirements:** a Company Page and Campaign Manager. The post must be public, and can be text, single image or video, but not a carousel or poll.

### 4.5 Events and partners

| Partner | What to ask | When |
| --- | --- | --- |
| Portugal Tech Week | Side event listing, 6–15 November; free as far as published | Week 1 |
| Product Management Society Lisbon | Co-host, or a listing in their Slack | Week 1 |
| Geek Girls Portugal | Share the workshop; a future meetup talk | Week 2 |
| Women in Product | Community post | Week 2 |
| ProductTank Lisbon | A talk at a 2027 meetup (mindtheproduct.com/speak) | Week 2 |
| Code Like a Girl | Guest post, early December | Week 3 |
| Girl Tech HQ Women in Tech Summit | The 2026 edition ran 13–15 July. Contact them now about speaking in 2027 (the sponsorship issue already exists: productkind/monorepo#428) | December |
| Podcasts: The Product Experience, CPO Club | Guest pitch forms, once the founding cohort has outcomes to talk about | January–February |

## 5. Follow-up emails after each workshop

This builds on the design's Day 1/3/5 emails, adding the teams and objections emails that sold most in Matt's launch. No invented scarcity and no fear.

1. **Day 1:** the recording, the field guide, Tamas's model bug report, and what the season is.
2. **Day 3:** a full audio briefing from Mission 2 with its transcript.
3. **Day 5:** two things attendees did at work, quoted with permission.
4. **Day 7, for your manager:**
   - what the learner will produce;
   - the outcomes in an employer's words;
   - an invoice;
   - the manager message template;
   - the team price.
5. **Day 10, honest answers:**
   - "Do I need to code?"
   - "Can I install things on a company laptop?"
   - "What if I fall behind?"
   - "Can I learn this for free?" Yes, if you're self-directed, and say what the season adds.
6. **Day 14 and the day before enrolment closes:** the real reason for the date (the January start, invoices before year-end), stated once.

## 6. After the launch: making it repeatable

What we want is a system that keeps bringing paying learners, so we don't depend on other people's audiences. Once the founding season is running:

- **The free workshop every month,** online, plus a recorded self-serve version, so registrations can open at any time. Matt's free tutorial grew his email list more than anything else he did.
- **The numbered series every week,** with roundups. It feeds the workshop, and the workshop feeds the season.
- **One partner audience a month:** a community talk, a guest post or a podcast. Choose by how many people from that audience register for a workshop, not by how big the audience is.
- **Every founding learner's company as a lead for a team purchase,** and every learner's work story, with permission, as material for the next season.
- **Weekly numbers,** in one spreadsheet by `utm_content`:
  - registrations;
  - attendance;
  - waitlist signups;
  - calls booked;
  - seats sold;
  - time spent for each channel.

  Stop any channel that doesn't produce registrations after four weeks.
