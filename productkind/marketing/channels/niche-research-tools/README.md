# Niche research tools

Two scripts that automate signals A and D of `../steps-to-find-your-niche.md`.
Neither needs an account or an API key.

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

## What these do not cover

YouTube Studio Trends (signal B) and Google Ads Keyword Planner both need a
signed-in session and stay manual. Three of four signals is enough to decide
positioning. Run Studio before committing to video production.
