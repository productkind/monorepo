# Where education willingness to pay actually sits

**Date:** 22 August 2026
**Question asked:** are there high pay-intent educational niches, who is willing to pay for education, and exactly what type?
**Status:** evidence, three kills and one hypothesis with a cheap test attached. Not a decision.

**Verbatim note.** Sections 5 and 6 quote OpenAI and Anthropic pages exactly as written, which means
American spellings we do not use ourselves. Per the folder convention, `check-banned.py` hits on those
quotes should be ignored.

---

## 1. The finding in one sentence

Willingness to pay in education tracks **compulsion and consequence, not interest.** Nobody pays much
for capability in the abstract. They pay to remove a specific, dated, consequential barrier: an exam on
a date, a licence renewal, a client deliverable they cannot produce, a capability their revenue depends
on.

Every number below is an instance of that, and the places where the numbers collapse are exactly the
places where nothing forces the purchase.

## 2. Method and limits

Semrush volume, keyword difficulty, CPC and competitive density across 22 terms spanning five
education structures, run by Kinga and reproduced in full in section 3. No separate file holds this
pull, so section 3 is its only record.
CPC is read as the primary signal throughout, because what an advertiser pays per click is the cheapest
honest proxy for money in a market. Price anchors and programme facts were then verified against
primary sources.

**Limits.**

- **Single-source volume data.** Keyword Planner remains locked behind the unfinished Google Ads
  account, so there is no second opinion on any figure here. See `../ai-research/README.md` chain and
  the memory note on tool access.
- **US and UK only.** Semrush has no global database.
- **CPC measures what advertisers pay for a click, not what a customer pays for a product.** A high CPC
  proves budget exists in the market. It does not prove the searcher will buy the thing we would sell,
  which is precisely the risk that section 7 turns on.
- **Certification and CPD prices come from third-party aggregator sites** and are indicative. Two
  claims found on such sites during this research turned out to be fabricated, including a specific
  price and exam format for an Anthropic certification that its own pages do not state. Treat any
  certification figure not sourced to the vendor as approximate.
- **Competitive density measures ad competition only.** It does not see bundled incumbents such as
  LinkedIn Learning or Coursera for Business, which matters a great deal in section 7.

## 3. The data

Semrush, US and UK databases, August 2026, sorted by US CPC descending.

| Keyword | US vol | UK vol | KD US | KD UK | CPC US | CPC UK | Density US |
|---|---:|---:|---:|---:|---:|---:|---|
| ai training for employees | 320 | 70 | **23** | **0** | **$23.01** | $14.80 | 0.15 low |
| corporate ai training | 90 | 50 | 23 | 0 | $16.93 | $20.37 | 0.48 med |
| cissp training | 1,900 | 390 | 62 | 40 | $16.01 | $6.04 | 0.47 med |
| ai training for business | 110 | 90 | 57 | 53 | $11.87 | $11.20 | 0.43 med |
| enterprise ai training | 20 | 20 | 0 | 0 | $10.25 | $0 | 0.63 med |
| ai agent development course | 20 | 10 | 0 | 0 | $8.01 | $4.06 | 0.35 med |
| ai course for beginners | 1,000 | 390 | 71 | 64 | $5.11 | $2.38 | 0.75 high |
| prompt engineering course | 3,600 | 1,000 | 59 | 41 | $4.91 | $2.07 | 0.66 high |
| solutions architect training | 40 | 30 | 41 | 0 | $4.66 | $1.97 | 0.42 med |
| technical product manager course | 70 | 10 | 29 | 0 | $4.61 | $0 | 0.35 med |
| pmp exam prep | 1,300 | 50 | 26 | 0 | $4.20 | $2.08 | 0.51 med |
| scrum master certification course | 720 | 210 | 52 | 29 | $3.71 | $3.94 | 0.19 low |
| consulting skills training | 170 | 70 | 27 | 0 | $3.58 | $2.34 | 0.19 low |
| vibe coding course | 480 | 140 | 38 | 29 | $3.37 | $1.92 | 0.71 high |
| claude certification | 590 | 110 | 41 | 34 | $3.32 | $1.63 | 0.16 low |
| salesforce certification training | 260 | 20 | 53 | 0 | $2.32 | $0 | 0.17 low |
| aws certification training | 1,600 | 170 | **97** | 76 | $2.17 | $1.47 | 0.20 low |
| hr cpd courses | 40 | 30 | 60 | 0 | **$0** | $4.01 | 0.33 med |
| rics cpd courses | 20 | 20 | 0 | 0 | **$0** | $1.58 | 0.33 med |
| riba cpd courses | 20 | 30 | 0 | 0 | **$0** | $1.29 | 0.33 med |
| cpd courses for engineers | 30 | 20 | 0 | 0 | **$0** | $1.90 | 0.33 med |
| ai upskilling for teams | no data | no data | | | | | |

## 4. Who pays, ranked

| Tier | Who | Why they pay | Evidence | Reachable by us |
|---|---|---|---|---|
| 1 | **Employers whose revenue is gated by a credential or capability** | Cannot sell the work without it | Anthropic put $100M into partner training; 1,300+ organisations pushed 36,000+ consultants through proctored exams in about five months | Budget proven, motion mostly excluded. See section 7 |
| 2 | **Individuals facing a gated exam on a date** | Failure costs money and time | CISSP prep paths $1,200 to $7,000, exam $749; PMP prep $279 to $899 | No accreditation needed, but see section 6 |
| 3 | **Licence holders with mandatory CPD hours** | Legally or professionally required, and recurring | RICS 20 hours a year with 10 structured, RIBA 35, CII 35 | No. See section 6 |
| 4 | **Owners buying an outcome they already monetise** | Attaches to their own revenue | Teachable $39 to $189 and Circle $89 to $199 tiers sustain among operating creators | Yes, and it is the natural adjacent step |
| 5 | **Curious individuals building general capability** | Nothing forces the purchase | Worst quadrant in section 3, and being taken to zero in section 5 | Already where we are |

## 5. Kill one: generic AI literacy is being taken to zero

On 9 December 2025 OpenAI announced its first certification courses: **AI Foundations**, launching
inside ChatGPT through pilot programmes with employers and public-service partners, and **ChatGPT
Foundations for Teachers**, available on Coursera. From the announcement:

> "we're accelerating our push to certify 10 million Americans by 2030"

It also states that more than 800 million people use ChatGPT each week, and cites research claiming
workers with AI skills earn about 50% more. That earnings figure is OpenAI's framing of third-party
research, not a verified fact, and should not be repeated as one.

Three consequences for us:

1. **Generic AI literacy is becoming free at a scale we cannot compete with** on price or distribution,
   delivered by the model vendor inside the product itself.
2. **It lands on our audience.** "ChatGPT Foundations for Teachers" is adjacent to the people Little
   Parrot reaches, and it is free.
3. **It contests tier 1 directly**, because AI Foundations is being delivered to employers.

This is the most consequential finding here for the existing business, not just for a new one. The
terms Little Parrot naturally targets are already the worst quadrant in section 3, and the vendor is
now moving into them at zero price.

## 6. Kills two and three: certification prep and CPD

### Certification prep

The structure is genuinely strong on paper. Exams are gated, dated and expensive to fail, no
accreditation is needed to sell preparation, and people demonstrably pay: CISSP prep paths run $1,200
to $7,000 against a $749 exam fee, and PMP prep runs $279 to $899. General 2026 exam pricing sits at
roughly $60 to $130 foundational, $150 to $250 associate and $300 to $760 professional or expert.

Two things kill it for us.

**The CPC says the traffic is not valuable.** `cissp training` is the exception at $16.01, and it
carries KD 62. Everything else in the cluster is cheap: `pmp exam prep` $4.20, `claude certification`
$3.32, `salesforce certification training` $2.32, `aws certification training` $2.17 at **KD 97**. The
mature certifications are either off-audience or unrankable, and often both.

**The obvious one for us is already given away.** Anthropic's programme is real and growing fast: four
role-based certifications (Associate: Foundations, Developer: Foundations, Architect: Foundations,
Architect: Professional), expanded on 23 July 2026, administered through Pearson Professional
Assessments. Exams are proctored and identity-verified. More than 36,000 consultants have been
certified across more than 1,300 organisations since March, and more than 400,000 people have
completed Claude training this year.

The decisive detail is that preparation courses are **already available free in the Anthropic Partner
Academy**, described as Anthropic's free training platform for partners. Selling prep against the
vendor's own free official prep, for an exam the vendor designed, with no brand and no exam-item
expertise, is the same failure that killed the course-freshness monitor in
`saas-niche-arbitration-2026-08-22.md`: the incumbent gives it away.

One honest qualification. AWS also provides free training and a large third-party prep market exists
anyway, because official material is often insufficient to pass. So this is a bad bet for two people,
not a logical impossibility. If it is ever revisited, the question to answer first is whether Partner
Academy material is actually sufficient to pass, which only certified candidates can tell us.

### CPD

Structurally the strongest shape in all of education, because the requirement is recurring and
externally imposed. RICS requires at least 20 hours a year with 10 structured and revised its
framework from 1 January 2026, RIBA requires 35, and the CII maintains 35.

It is unreachable for us on three counts.

1. **Accreditation.** To sell hours that count, the provider must be accredited by the professional
   body. We are not, and becoming so is a per-body process.
2. **The strictest schemes sit in excluded domains.** Dental CPD is compulsory under the GDC, and the
   toughest regimes are health, legal and financial, all of which are out of scope.
3. **Nobody is buying the traffic.** Every CPD term returns **$0.00 CPC in the US** on volumes of 20 to
   40 a month. UK CPCs are £1.29 to £4.01. A zero CPC on a mandatory purchase is a strong signal that
   the demand is captured elsewhere, most likely by the professional bodies themselves.

A fourth reason for caution: these requirements can be withdrawn. The FCA removed its mandatory
15-hour CPD requirement, which means a business built on one body's rules carries regulatory risk with
no upside.

## 7. The one hypothesis worth testing

> **Self-serve, per-seat AI training for small and mid-size company teams, with the completion
> reporting an L&D lead needs as evidence, bought on a card without a sales call.**

### Why the data points here

The company-paid cluster carries **4.5 times the CPC at a third of the keyword difficulty** of the
learner-paid cluster. `ai training for employees` is the standout: $23.01 CPC, KD 23 in the US and
**KD 0 in the UK**, at low ad density. High CPC with low difficulty and thin ad competition is the
classic gap, meaning advertisers are paying hard while nobody has built the organic answer.

The buyer is an L&D or HR lead with a budget, which is tier 1 in section 4, and a $23 CPC is explained
by one won contract being worth thousands.

### Why it has to take this specific shape

Corporate AI training is normally sold rather than bought, scoped bespoke and delivered live. Read
literally, the highest willingness to pay in this data belongs to a consulting business, which the
operating constraints exclude: no cold outbound, no live workshops, must survive travel. Per-seat
self-serve with admin reporting is the only version that fits, and it does fit well, because it uses
the self-paced card format rather than delivery time.

### Sizing

At $30 per seat per month, EUR 5,000 a month needs roughly 170 seats, which is six to seventeen
companies of 10 to 30 people. Against about 540 US searches a month on the four high-intent terms,
that is a slow build but not an impossible one.

### The three risks, worst first

1. **Intent mismatch, and it is decisive.** The $23 CPC may exist precisely because the searcher wants
   a bespoke workshop. If so, a $30 per-seat self-serve product is not what they came for and the high
   CPC is a mirage for us specifically. Everything else is secondary to this.
2. **OpenAI is already in this exact place**, delivering AI Foundations to employers through pilots,
   free, backed by the 10-million-by-2030 programme.
3. **Bundled incumbents.** LinkedIn Learning, Coursera for Business and Udemy Business already sell
   per-seat libraries into L&D. Semrush's low competitive density does not see them, because it
   measures ad competition rather than shelf space.

### The test

Risk 1 is answerable for a few hundred pounds, which makes it the cheapest decisive test found in any
of this research. One landing page offering per-seat self-serve AI training with admin reporting, and
paid traffic bought on those exact terms. At $23 a click, about GBP 300 buys 13 to 15 highly qualified
clicks. If none will buy self-serve, that is learned for the price of a dinner rather than a quarter.

**Continue if** qualified clicks convert to trials or enquiries that accept a per-seat self-serve offer
without asking for a workshop. **Reject if** the responses ask for bespoke delivery, which would
confirm the CPC belongs to a business we have ruled out.

This test needs the Google Ads account finished, which also unlocks Keyword Planner and removes the
single-source dependency on Semrush noted in section 2. It is the highest-value unblock available.

## 8. How this compares with the marketplace recommendation

Recorded so the two are not confused, since they point in different directions.

| | Google Workspace to Jira bridge | Company-paid AI training |
|---|---|---|
| Demand evidence | 10,990 measured installs on a broken app | $23.01 CPC, 540 US searches a month |
| Price evidence | $3.17 per user per month, demonstrated by yasoon at 7,100 installs | None. No comparable self-serve per-seat AI product priced |
| Channel | Marketplace, delivers buyers without selling | SEO and paid, must be built |
| Founder fit | Uses almost none of the education expertise | Uses all of it |
| Biggest risk | Google rebuilds it | The buyer wants a workshop, not a subscription |

The bridge has the better evidence. The training has the better founder fit and an unproven channel.
The ads test in section 7 resolves the training question in about two weeks, which is faster than any
test on the bridge, so running it first costs little and could change the ranking.

## 9. What was not done

- **No buyer was spoken to.** Everything here is desk research and keyword data.
- **No Keyword Planner cross-check**, so all volume and CPC figures are single-source.
- **The tier 4 route was not investigated.** Selling to operating course creators and consultants who
  already monetise is the natural adjacent step from the current business and was not tested with its
  own keyword set. It may be the best fit of all and it has no data here.
- **Bundled incumbent pricing was not gathered.** LinkedIn Learning, Coursera for Business and Udemy
  Business per-seat prices would set the ceiling for section 7 and were not collected.
- **No supply audit of existing per-seat AI training products**, which is the equivalent of the
  marketplace instrument and would show whether the shelf is actually empty.

## Sources

Programme facts, primary sources, verified 22 August 2026:

- [Launching our first OpenAI Certifications courses, OpenAI, 9 December 2025](https://openai.com/index/openai-certificate-courses/)
- [Four role-based Claude certifications, Anthropic](https://claude.com/blog/four-role-based-claude-certifications)
- [Anthropic invests $100 million into the Claude Partner Network](https://www.anthropic.com/news/claude-partner-network)
- [Claude Academy](https://www.anthropic.com/learn)

CPD requirements:

- [CPD requirements by professional body, CPD Standards Office](https://www.cpdstandards.com/cpd-requirements/)
- [FCA removes mandatory 15-hour CPD requirement](https://thecpdregister.com/blog/fca-removes-mandatory-15-hour-cpd-requirement-what-this-means-for-professional-standards)

Certification and prep prices, third-party aggregators, indicative only:

- [IT certification exam costs 2026](https://www.examcert.app/blog/it-certification-exam-costs-2026/)
- [PMP exam prep course pricing](https://prepsolution.com/best/pmp-exam-prep-courses)
- [CISSP certification cost](https://destcert.com/resources/how-much-cissp-certification-costs/)

Search demand:

- Section 3 of this document is the primary record of the education keyword pull. The niche pulls for
  the three SaaS candidates are in `semrush-keyword-research-jira-2026-08.md`, and the deep pull on the
  Lovable and vibe-coding niche is in `semrush-keyword-research-production-ready-2026-08.md`.

Related:

- `saas-niche-arbitration-2026-08-22.md`, this folder, for the marketplace recommendation this is
  compared against in section 8
