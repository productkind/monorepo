# Search demand by validated PM need

**Analysis date:** 24 August 2026  
**Semrush snapshot date:** 24 August 2026 UTC  
**Markets:** US and UK  
**Scope:** supplied qualitative research and Semrush Datasets A–C only  
**New research, Google Trends and competitor analysis run:** no

The row-level output is in the
[search-demand analysis workbook](./outputs/01a033b6-25b5-7020-b6ae-58bf9f1895d4/pm-technical-fluency-search-demand-analysis.xlsx).
It contains the clean keyword dataset, intent-family analysis, need summary,
SERP assessment, Google Trends shortlist, exclusion log and the three unedited
source tables.

## How to read the numbers

- **Exact learning query:** a specific question, explanation, comparison or task,
  such as `how does an api work` or `staging vs production`.
- **Search-intent family:** closely related ways of expressing one learning
  intent. Family variants are not added together. The workbook reports the
  largest individual variant in each country.
- **Broad category term:** an umbrella term such as `api`, `ci/cd`, `technical
  debt` or `vibe coding`. Its volume is not treated as PM-specific demand.
- `0` is a Semrush-reported zero. A blank numeric cell with **No row returned**
  is missing data, not zero.

## 1. Clean keyword dataset

| Source | Source rows | Unique keywords | Included | Excluded |
|---|---:|---:|---:|---:|
| Dataset A — observed seeds | 112 country rows | 56 | 56 | 0 |
| Dataset B — related/discovered | 150 | 150 | 99 | 51 |
| **Combined clean dataset** | — | **206** | **155** | **51** |

The **Clean Keywords** sheet contains all requested fields: keyword, need
cluster, search-intent family, US volume, UK volume, CPC, KDI, audience fit,
keyword type, include/exclude decision and reason. CPC and KDI are split into US
and UK columns so that country-specific values are not collapsed. It also keeps
source dataset, source seeds, relationship type, audience-fit basis and data
status for auditability.

The **Exclusions** sheet records every removal. The main exclusion patterns are:

- irrelevant semantic matches: APY finance queries, bed bugs, sports clubs,
  mathematical logs, log amplifiers and hydraulic log splitters;
- ambiguous terms: `ci`, `c.i.`, `mvp`, `mvp meaning`, `what is prod`,
  `integrations` and `with vibe`;
- typos/noise: `vide coding`, `sprots club` and the malformed ChatGPT-browser
  phrase;
- specialist or non-learning intent: API development and gateways,
  supply-chain EDI, banking integrations, containers, CI tooling, SAP/Windows
  logs, integration services and tool-marketplace searches.

Relevant zero-volume and no-row keywords were retained. Examples include
`how does software deployment work`, `how to explain a reproducible bug to a
developer`, `prototype vs production software` and several explicitly
non-technical AI-tool queries.

## 2. Cluster summary

| Validated PM need | Exact learning-query evidence | Intent-family and broad-category evidence | US versus UK signal | Audience fit and supplied SERPs | Original PM evidence | Defensible reading and caveat |
|---|---|---|---|---|---|---|
| **Software product/system mental model** | `what happens when you type a url in the browser`: **40 US / 20 UK**. `frontend backend database`: **20 / 20**. `tech stack explained`: **10 / 10**. Most architecture formulations are 0 or missing. | Four relevant families—request flow, web architecture, frontend/backend/database and tech stack—but no defensible broad category anchor in the supplied data. | Low in both countries; the same request-flow phrase leads each market. | Strong fit for non-engineers. Earlier result checks found PM-specific and unusually accessible explainers, but Dataset C returned no SERP for these seeds. | **Very strong** originally; high confidence in existence and moderate-high confidence in rank after validation. | **Strong PM need + weak/fragmented public search demand.** Public search cannot represent the need to understand a company's own internal system. |
| **APIs, integrations and data flow** | `what is an api`: **673,000 / 40,500**. `how does an api work`: **720 / 90**. `what is an api and how does it work`: **210 / 20**. `webhooks vs api`: **720 / 40**. The overlapping variant `what is a webhook vs api` is **2,900 / 6,600** and is not added to it. | Seven families. Broad `api`: **135,000 / 27,100**; specific `api integration`: **5,400 / 1,600**. Definition, mechanism, integration and webhook-comparison variants overlap heavily. | Strong in both. US is usually larger, but webhook-comparison wording has a notable UK-leading variant. | Exact plain-English questions fit generalist PMs well. API basics are mixed but accessible; integration SERPs include explicitly non-technical guides; webhook results are more developer/vendor-led. | **Very strong** originally; moderate-high confidence after validation, with less new independent replication than release workflow. | **Strong PM need + strong search demand.** The large API totals include developers, students and commercial researchers, so they are evidence of explanation demand—not PM market size. |
| **Development, testing and release** | `staging vs production`: **110 / 20**. `how does ci cd pipeline work`: **40 / 20**. `feature flags explained`: **30 / 10**. Most code-review, deployment and beginner CI/CD questions are 0–20 or missing. | Five families. Broad spelling variants `ci/cd` (**14,800 / 3,600**), `cicd` (**9,900 / 2,400**) and `ci cd` (**8,100 / 2,400**) describe overlapping intent and are not summed. `continuous integration` is **12,100 / 2,900** and `continuous deployment` **6,600 / 260**. | The same pattern holds in both: modest exact questions, much larger broad technical categories. | Staging comparisons are reasonably accessible. Supplied CI/CD and environment SERPs are predominantly developer/DevOps. | **Strong** originally; high confidence in existence and the best new cross-community validation. | **Strong PM need + weak/fragmented PM-fit public search demand.** Broad CI/CD demand cannot stand in for PM demand, and the end-to-end need fragments across PRs, pipelines, staging, deployment and release controls. |
| **Investigation and bug triage** | `bug triage process`: **30 / 20**. `how to reproduce a bug`: **20 / 0**. `what are application logs` and `severity vs priority bug`: **20 / 20** each. Several directly relevant discovered questions are 0–10. | Five small families: reproduction, triage/backlog, application logs, DevTools and severity/priority. No supplied broad category term is safe to use as a demand proxy. | Weak in both; UK has more zeros or missing rows. | Query wording fits PM work, but earlier result checks found insect noise for reproduction and OS/security/specialist intent for logs. Dataset C contains no seed SERP for this need. | **Strong** originally; moderate confidence after validation. | **Strong PM need + weak/fragmented public search demand.** Investigation is often product-specific and happens in internal tools or colleague conversations. |
| **Feasibility, technical debt and trade-offs** | `what is tech debt`: **2,900 / 590**. `what is technical debt`: **2,900 / 720**. `mvp vs prototype vs poc`: **50 / 20**. `buy vs build software pros and cons`: **20 / 10**. No direct feasibility/dependency query appears in the Semrush inputs. | Five families. Broad `technical debt`: **5,400 / 1,600**; `tech debt`: **3,600 / 1,000**; unambiguous `minimum viable product`: **6,600 / 1,600**. These are separate categories, not one pool. | Technical-debt demand exists in both; direct feasibility language is absent in both. | Technical-debt SERPs are accessible across engineering and product. The supplied MVP-comparison SERP is materially contaminated: four of ten results are unrelated healthcare/sports entities. | **Very strong** for feasibility/scope/trade-offs and **strong** for technical-debt decisions; moderate-high after validation. | **Strong PM need + concentrated category demand, but weak direct feasibility search demand.** Technical debt and MVP cannot represent the whole job of judging feasibility and dependencies. |
| **AI-assisted prototyping/building** | `what is vibe coding`: **49,500 / 5,400**. `vibe coding meaning`: **12,100 / 1,900**. `how to vibe code`: **1,600 / 170**. The more bounded `build mvp with ai` is only **20 / 20**; several non-technical tool queries have no Semrush row. | Eight families. Broad `vibe coding`: **90,500 / 18,100**. Variants such as `vibe code`, `vibecoding`, `vibecode` and `vibe-coding` overlap and are not summed. Direct AI app-building, Claude Code, Lovable and production-boundary demand is much thinner. | Strong vibe-coding signal in both, markedly larger in the US; direct bounded-building queries are weak in both. | Beginner and definition queries fit non-technical learners well. The supplied beginner SERP is accessible; mechanism results mix general learners and experienced developers. | **Strong, emerging and contested** originally; moderate and platform-concentrated after validation. | **Emerging PM need + strong AI-era category/explanation demand, but weak PM-specific prototype demand.** Tool churn and spelling overlap are high, and a working prototype is not production readiness. |

The central contrast is therefore not “searched” versus “not needed”. It is:

- **Strong PM need + strong search demand:** API basics, mechanisms and
  integrations.
- **Strong PM need + weak or fragmented public search demand:** product/system
  mental models, release workflow at PM depth, and issue investigation.
- **Strong PM need + demand concentrated in an adjacent category:** feasibility
  appears mainly through technical-debt and MVP language.
- **Emerging PM need + strong category demand but weaker bounded-outcome
  demand:** AI-assisted building appears strongly as vibe-coding explanation,
  not yet as PM-specific prototyping or production-boundary searches.

## 3. Google Trends shortlist

No Trends data was collected. These 25 terms or concepts would answer the most
useful next questions about stability, growth and the post-2024 AI shift.

| Term or concept | Why investigate it next |
|---|---|
| `what happens when you type a url in the browser` | Test whether established request-flow interest is stable or declining. |
| `frontend backend database` | Check a whole-system mental-model term that has low Semrush volume but strong audience fit. |
| `application architecture explained` | Test whether architecture-learning demand exists below Semrush reporting thresholds. |
| `what is an api` | Establish a large, mature API-learning baseline. |
| `how does an api work` | Compare a specific mechanism query with the broad API baseline. |
| `api integration` | Test stability and regional movement in an established integration category. |
| `webhook vs api` | Resolve the trajectory of a comparison family with many overlapping variants. |
| `ci/cd` | Test long-term stability while treating punctuation/spelling variants as one concept. |
| `continuous deployment` | Separate one release concept from the broader CI/CD label. |
| `staging vs production` | Track an accessible comparison with modest exact demand. |
| `how to reproduce a bug` | Test whether Trends detects a validated task that Semrush reports weakly. |
| `bug triage process` | Check whether issue-triage interest is stable or declining. |
| `technical debt` | Establish the large, long-standing category baseline. |
| `what is technical debt` | Compare learning intent with the broad technical-debt category. |
| `mvp vs prototype vs poc` | Track an unambiguous comparison rather than the contaminated bare `mvp` acronym. |
| `prototype vs production software` | Test whether production-boundary interest is emerging below Semrush thresholds. |
| `vibe coding` | Measure growth and persistence of the primary AI-era category. |
| `what is vibe coding` | Compare explanation intent with the category term. |
| `vibe coding for beginners` | Test whether non-technical beginner interest follows the broader category curve. |
| `how to vibe code` | Track task intent rather than definition intent. |
| `build mvp with ai` | Test the direct bounded-building outcome that has low exact Semrush demand. |
| `ai coding tools for beginners` | Measure broader AI-building learning interest. |
| `claude code for non technical people` | Check an emerging, tool-specific non-technical term absent from Semrush. |
| `lovable for beginners` | Measure a tool lifecycle and possible regional differences. |
| `vibe coding production apps` | Test whether attention is moving from first builds towards production boundaries. |

## 4. Data limitations

- Dataset B discovery used the US database and a display limit of ten per list;
  it is not an exhaustive keyword universe. UK metrics were added only for the
  discovered US terms.
- Dataset A distinguishes Semrush-reported zero from no returned row. Dataset B
  provides US metrics for its discovery rows, but some UK rows are missing.
- KDI US was not returned for discovered Dataset B keywords. Intent and trend
  history were not returned by the supplied endpoints. Missing cells remain
  blank rather than being estimated.
- CPC and KDI describe their country databases and should not be averaged across
  the US and UK. They are retained for later analysis, not used as demand scores.
- Keyword variants overlap. The workbook preserves every individual metric but
  uses largest-variant evidence rather than a summed family total. Even that
  does not estimate unique searchers.
- Broad terms cannot identify PMs. `api`, `ci/cd`, `technical debt` and `vibe
  coding` include developers, students, founders and other learners.
- Ambiguous acronyms and semantic neighbours required judgement. The exclusion
  log makes each decision reversible. The supplied MVP SERP supports the
  decision to exclude bare acronym queries.
- Dataset C covers ten seeds in the US only. Titles and SERP features were not
  returned. Result-audience assessments therefore use domains, URLs and the
  previously supplied search-language evidence—not a new live SERP review.
- Weak public search demand cannot invalidate a first-person PM need. Internal
  product architecture, feasibility, dependencies and issue investigation are
  often expressed inside companies rather than through public keywords.
- AI-tool and vibe-coding language is unusually volatile. The snapshot cannot
  establish whether 2026 demand will persist; that is precisely what the later
  Trends stage should test.

This analysis does not assess competitors, willingness to pay, an offer,
positioning or curriculum.
