# Niche research tools

Small command-line tools for collecting and auditing niche-research signals.
None needs an account or an API key.

## `google-autocomplete.sh`

Queries Google's public autocomplete endpoint for every phrase in a file. It
uses the same input and output format as `youtube-autocomplete.sh`:

```
zsh google-autocomplete.sh seeds.txt gb
```

## `youtube-autocomplete.sh` (Signal A)

Queries YouTube's public autocomplete for every phrase in a file and prints the
suggestion count plus the suggestions.

```
./youtube-autocomplete.sh seeds.txt gb      # gb, us, pt, hu ...
./youtube-autocomplete.sh seeds.txt gb | grep -v '\[0\]'   # hide dead phrases
```

A count of 0 means nobody types that phrase. A count of 10 is the ceiling, so
treat 10 as "at least 10", not "exactly 10". Read the suggestions themselves,
not just the count: they tell you the modifiers people add and often hand you
an audience you had not thought of.

For alphabet expansion, generate `<phrase> a`, `<phrase> b` and so on into a
file and run that. What YouTube volunteers on a letter you did not intend is
usually the most useful thing in the run.

## `pm-search-observation-audit.py`

Re-runs the PM technical-fluency seed list against Google autocomplete (GB)
and YouTube autocomplete (GB and US), then checks every autocomplete-labelled
row in the research report against the live responses. It catches phrases that
were attributed to the wrong interface or retained only because they had been
entered manually as discovery queries.

Run it from this directory:

```
python3 pm-search-observation-audit.py
```

The script currently audits these fixed files:

- `pm-technical-fluency-seeds.txt`
- `../../../ai-research/pm-technical-fluency/pm-technical-fluency-observed-search-phrases-2026-08.md`

A clean run ends with `Missing observations: 0`. Because autocomplete changes
over time, a later missing observation does not prove the phrase was never
shown; investigate it against the dated research notes before changing the
report. This script validates autocomplete attributions only. It does not
recheck Google People Also Ask, related searches, result intent, YouTube result
performance or comments.

## `youtube-supply-audit.py` (Signal D and step 4)

Scrapes the top twelve results for each query with channel, view count, publish
age and length.

```
python3 youtube-supply-audit.py "adhd iphone shortcuts" "apple shortcuts adhd"
```

What to look for: how many of the twelve precisely match the query, how old the
top matches are, and whether small channels rank. A five-year-old video from a
900-view channel sitting in the top five is the clearest gap signal there is.

If it prints `<no data>`, YouTube changed its page shape. The regex for
`ytInitialData` is the thing to fix.

## Seed files

`seeds.txt`, `seeds2.txt` and `seeds3.txt` are the phrase lists from the
August 2026 run on `ai-your-life-admin-00`
(`../../content/courses/ai-your-life-admin/niche-research.md`). Keep them as
worked examples of how broad to cast the first pass.

## `google-trends.py` (Signal C)

Interest over time plus top and rising related queries. **No account needed.**
If it returns 429, that is rate limiting, not a login wall; wait a minute.

```
python3 google-trends.py --geo GB --time "today 5-y" "mental load" "brain dump"
python3 google-trends.py --property youtube --geo US "apple intelligence"
python3 google-trends.py --geo "" --time "today 12-m" "adhd mum"    # worldwide
```

`--property youtube` reads YouTube Search. Leave it off for Google web search,
which is what SEO pages target. Space calls about ten seconds apart.

**Run this before any positioning or naming decision.** Autocomplete tells you a
phrase exists and a supply audit tells you it is badly served. Neither tells you
how many people type it. On the August 2026 run, those two signals agreed with
each other and both pointed at a rename that Trends then reversed, because the
proposed term turned out to be half the size of the existing one and flat.

Two readings that are easy to get wrong:

- **Values are relative to the biggest term in the comparison**, so they only
  mean anything within a single run. Always put a known term in the comparison
  as a yardstick.
- **A huge rising percentage off a near-zero base is still near zero.** On that
  same run, `adhd brain dump template` showed +132,100% and had a mean of 0.2
  when sized against `mental load`. Check the mean before believing the rise.

## PM technical-fluency Trends collection

`pm-technical-fluency-google-trends.py` is the dated job collector for the
25-term PM technical-fluency matrix. It retains the full weekly series, related
queries, related topics, run metadata, labelled fallbacks and same-request
comparisons. Successful raw responses are cached so a rate-limited run can be
resumed.

```
python3 -u pm-technical-fluency-google-trends.py \
  --output-dir /absolute/path/to/google-trends-data
```

`pm-technical-fluency-google-trends-assemble.py` assembles the cached signed-in
browser runs into Datasets A–D, run metadata, a manifest and the data-quality
note. It refuses to proceed unless all 150 exact and 30 comparison runs exist.

```
python3 -u pm-technical-fluency-google-trends-assemble.py \
  --data-dir /absolute/path/to/google-trends-data
```

`google-trends-download-watcher.py` is an optional browser-export helper. It
moves only newly created `multiTimeline`, `relatedEntities` and
`relatedQueries` CSV files when a matching request file exists in its control
directory. It is not a general Downloads-folder watcher.

## `marketplace-supply-audit.py` (product-niche version of signals A and D)

Not for content niches. This one finds product niches inside the Atlassian
Marketplace, where the purchase happens in the marketplace rather than through
search, so install counts replace search volume as the demand signal. The REST
API is public and needs no key.

```
python3 marketplace-supply-audit.py pull            # cache the catalogue first
python3 marketplace-supply-audit.py screen          # big installs, poor rating
python3 marketplace-supply-audit.py vacancies       # abandoned Connect-era apps
python3 marketplace-supply-audit.py slot "google chat"    # who owns one slot
python3 marketplace-supply-audit.py reviews <appKey>      # what users say fails
python3 marketplace-supply-audit.py pricing <appKey>      # per-user tiers
```

What to look for: a slot where one app holds thousands of installs at under 3.8
stars and no rival clears 200 installs at 4.2 stars. That is measured demand
with weak supply, which is the same shape as an old video from a small channel
ranking top five.

Three readings that are easy to get wrong:

- **Installs are not active users.** An abandoned app keeps its install count.
  Treat the number as an upper bound on live demand.
- **Check pricing before believing demand.** The biggest installed bases are
  usually free integrations a SaaS vendor built as a checkbox, which measures
  demand at a price of zero. `pricing` returning nothing means the app is free.
- **The API text search ranks on general relevance**, so it returns unrelated
  apps as matches. `slot` filters to apps whose name or tagline contains the
  whole token. An earlier version matched only the first word and reported empty
  slots that were not empty. Keep that filter.

Findings from the August 2026 run are in
`../../ai-research/saas-niche-arbitration-2026-08-22.md`.

## What these do not cover

YouTube Studio Trends (signal B) and Google Ads Keyword Planner both need a
signed-in session and stay manual. Three of four signals is enough to decide
positioning. Run Studio before committing to video production.
