# What people ask about AI (October 2026)

Research for Tamas's workshop at Tech Women Summit Moldova on 24 October 2026, and for the toolkit item we hand out there. The workshop is about understanding how to use AI, and participants bring their own questions. This research anticipates those questions. Tamas will also collect the real ones in the room.

Researched 20 October 2026, in English only, from UK and US search behaviour plus two online communities. Items marked **[Inference]** are judgement, not sourced fact.

Several sections quote search suggestions, questions and comments exactly as people typed them, including American spellings and words we never use ourselves. `check-banned.py` hits on those quotes should be ignored; see `../README.md`.

## Summary

- **Prompting is the biggest specific question.** "How to prompt" outsizes "how to use chatgpt" by almost two to one in UK search, and Google's "People also ask" boxes show people want a short rule set they can remember ("What are the 7 things of a prompt?", "the 5 P's", "the three C's").
- **"What should I never tell ChatGPT?" is the question that turns up everywhere.** It appeared in Google's "People also ask" box for 8 of the 24 searches, from "how to use chatgpt" to "is chatgpt accurate". Privacy of personal and financial details was also the most repeated concern in YouTube comments.
- **Trust is the third pillar.** People ask whether it can be wrong, why it makes things up, why it always agrees with them, and why it gives a different answer to the same question.
- **The tool question has shifted towards Claude.** "How to use claude" tripled in UK search over the year and "chatgpt vs claude" rose 54% worldwide, while "is chatgpt free" and "is chatgpt safe" fell by about half. Google's "People also ask" box now includes "Why is everyone switching from ChatGPT to Claude?".
- **Jobs are the summit's theme, and the search data backs it.** The most-watched video in the whole pull is about which jobs survive AI (24 million views). People ask whether to still learn to code, whether 25 is too old to start, and, in one comment that fits "Rebuilding the Ladder" exactly, "if you replace all the junior people with AI, where do the senior people come from?"
- **Builders ask the same questions one stage further on.** In the Women Build AI community, where members are building products to earn, the biggest AI questions are which tool to use (15% of question posts) and what it costs before you hit a limit (15%). Prompting turns into a question about context: what background to give the AI and how to keep it current. The environment, common in search, is almost absent (1%). Nearly a quarter of introductions mention a career change.
- **Everything about the tools dates fast.** ChatGPT's model names changed several times this year (GPT-5.6 Sol, GPT-6 Astra, GPT-6.1 Sol), and new modes keep arriving (ChatGPT Work, Claude Cowork). A toolkit item that names menus or models will be out of date within weeks.

## The question families, ranked

Ranked by how many independent sources each family appeared in, then by Trends size where measured, then by fit with the summit audience (students, people early in their IT careers and career switchers).

| # | Question family | Autocomplete | People also ask | YouTube comments | OpenAI forum | Women Build AI | Trends (worldwide, 12 months) |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | How do I write a good prompt and get better answers? | Yes, 635 suggestions | 10 boxes | Prompt formula video, 3.9m views | Yes | 60 (8%), plus 36 on context and instructions | Biggest specific term; down 23% |
| 2 | What should I never tell or upload? Is my data safe? | Yes, 165 | 11 boxes | Most repeated concern | No | 61 (8%) | Small; "is chatgpt safe" down 57% |
| 3 | Can I trust the answers? Why does it make things up or agree with me? | Yes, 105 | 7 boxes | Yes | Yes | 40 (5%), plus 13 on models getting worse | Not measured directly |
| 4 | Which AI should I use, and for what? | Yes, 190 | 8 boxes | Yes | No | 108 (15%) | "chatgpt vs claude" up 54%, "how to use claude" up 85% |
| 5 | Will AI take my job? Should I still learn to code? | Yes, 180 | 3 boxes | 24m-view video, junior-roles comment | No | 52 (7%); 23% of introductions mention a career change | Small and steady; "will ai replace my job" rising |
| 6 | Is it free? Is paying worth it? Why do I hit limits? | Yes, 232 | 12 boxes | Yes | Yes | 111 (15%) | "is chatgpt free" large but down 47% |
| 7 | Is it OK to use AI for my CV, school or work, and can people tell? | Yes, 69 | 3 boxes | No | No | 33 (4%) | Not measured |
| 8 | How does it actually work? Does it remember me? What is an agent? | Yes, 153 | 5 boxes | 521-like pinned comment | Yes | 26 (4%) | "what is an ai agent" small, up 28% |
| 9 | How do I use it to learn, study and find a job? | Yes, 307 | 5 boxes | No | No | 164 (22%) | Tiny next to generic how-to |
| 10 | Is AI bad for the environment? | Yes, 67 | Not seeded | One comment | No | 8 (1%) | Not measured: Trends rate-limited the run twice |
| 11 | Is it healthy to rely on it, even for advice or venting? | Yes | No | Yes | No | 46 (6%), plus 11 on thinking skills | Not measured |
| 12 | Can I make money with AI? | Yes, 162 | 1 box | No | No | 158 (21%) | Not measured: Trends rate-limited the run twice |
| 13 | What else can it do (images, video, voice, files)? Could it take over? | Yes, the second-largest theme | No | No | Yes | 187 (25%) | Not measured |

Counts in the autocomplete column are distinct suggestions across Google and YouTube, UK and US, sorted by `common-ai-questions-themes.py`. They measure how many different ways people phrase a theme, not how often they search. Families 1 and 9 are inflated because many seed phrases already contained "prompt" or "use ai to". The "People also ask" column counts boxes out of 46. The Women Build AI column counts question posts out of 739.

## What people actually type, family by family

### 1. Prompting and better answers

- Google suggests "how to prompt ai effectively", "properly", "better", "to get the best results", "to write like a human", "to sound more human".
- "People also ask": "How to prompt AI correctly?", "What are examples of good prompts?", "How to get the best results out of ChatGPT?", "How to get correct answers in ChatGPT?", and named frameworks: "What are the 7 things of a prompt?" (4 boxes), "What are the 5 rules of AI?", "What are the four rules for ChatGPT?", "What are the 5 P's of effective prompting?", "What are the three C's of prompting?".
- Forum: "How can I make ChatGPT follow my instructions better?", "Natural-language requests vs. long structured prompts: what actually improves performance?".
- Trends: "how to prompt" mean 39.9 in the UK against 22.1 for "how to use chatgpt"; 52.2 against 20.1 in the US. Both are falling.

**[Inference]** People want a short, memorable structure they can reuse, which is exactly what a toolkit item can give them. The many competing frameworks also mean there's no single agreed one.

### 2. What not to share, and whether data is safe

- The single most repeated "People also ask" question: "What to not tell ChatGPT?", "What shouldn't you tell ChatGPT?", "What are 5 things you should never tell ChatGPT?", "What should you not upload to ChatGPT?", "What to not ask an AI?" (11 boxes across 8 searches).
- Close variants: "Should I tell ChatGPT my real name?", "Will ChatGPT leak your data?", "If I upload a document to ChatGPT, does it become public?", "Can people see your conversations on ChatGPT?", "Does ChatGPT store the files I upload?".
- Google suggests: "is chatgpt safe for confidential information", "is chatgpt safe to use at work", "is it safe to put resume on chatgpt", "is it safe to put your face on chatgpt", "can my employer see my chatgpt history", "does chatgpt store my data", "does chatgpt sell your data", "can chatgpt know my location", "can chatgpt keep a secret", "why does chatgpt want my phone number".
- YouTube: ten separate comments on privacy, for example "Aren't you scared you are giving so much personal information including your financials to chatgpt. Do you use any guardrails?" and "Every person can't afford an enterprise account."

### 3. Trust, mistakes and flattery

- "People also ask": "How often is ChatGPT incorrect?", "Can ChatGPT be trusted?", "Does AI still hallucinate in 2026?", "What's it called when ChatGPT makes stuff up?".
- Google suggests: "why does chatgpt lie", "why does chatgpt gaslight me", "why does chatgpt make up quotes", "why does chatgpt always agree with me", "why does chatgpt always take your side", "why is chatgpt a yes man", "why does chatgpt get worse the more i use it", "why does chatgpt forget information in long conversations", "can chatgpt be wrong about relationship advice", "is chatgpt accurate with calories".
- YouTube: "Should I bring an umbrella today? 6 times it will say yes and 4 times no."
- Forum: "Different answers for same prompt?", "how to avoid it giving wrong facts?".

### 4. Which tool, and for what

- "People also ask": "Which AI is best for beginners?", "Which AI is better than ChatGPT?", "Is ChatGPT still the best AI?", "Why is everyone switching from ChatGPT to Claude?", "What can Claude do that ChatGPT cannot?".
- Google suggests: "best ai for research / coding / studying / writing / image generation", "should i use chatgpt or claude or gemini", "which is safer to use chatgpt or gemini", "should i use chatgpt chat or work", "should i use chatgpt website or app".
- YouTube: "Can you create a video comparing ChatGPT Free vs. Claude Free vs. Gemini Free?", "For writing blog post, what is best?", "Research and scientific usage wise which one would you recommend?".
- Trends rising: "chatgpt work vs claude cowork", "chatgpt go vs plus", "claude vs chatgpt 2026".

### 5. Jobs, entry-level careers and learning to code

- "People also ask": "Which jobs cannot be replaced by AI?", "What are the 5 jobs that will survive AI?", "What jobs will be gone by 2030?", "Is it still worth learning to code?", "Will coding be replaced by AI?", "Is 25 too old to start coding?".
- Google suggests: "will ai replace software engineers", "should i learn to code in the age of ai", "should i learn to code or use ai", "how to get a job in ai without a degree", "how to get a job in ai with no experience".
- Trends: "will ai replace" is small (mean 6.3 against 44.0 for "how to use chatgpt") but steady; rising related searches are "will ai replace my job", "what jobs will ai replace by 2030", "will ai replace data analysts" and "will ai replace copywriters".
- YouTube: the jobs videos are the most watched in the pull (24m, 3.2m, 1.4m views). The comments are mostly anger about billionaires; the one real question is the junior-roles one quoted in the summary.

### 6. Cost and limits

- "People also ask": "Is ChatGPT free to use?", "Can I learn AI for free?", "Is it worth paying $20 a month for ChatGPT?", "Is it better to get ChatGPT Plus or Go?", "Does paid ChatGPT give better results?".
- Google suggests: "is chatgpt free for students", "is claude free for students", "why does chatgpt have a limit", "why does chatgpt have ads now", "why does chatgpt want me to pay".
- YouTube: "I pay over %20.00 a month and today I only asked 10 questions and got a message that I have reached my limit???"; "Could you possibly make your product offering more confusing? All kinds of BS made up names, pricing levels, limits, tokens and so on."

### 7. Is it allowed, and can people tell

- Google suggests a long "is it ok to use chatgpt for…" list: "resume", "cover letter", "job applications", "college essays", "research", "in school", "to edit an essay", "for emails", "for brainstorming".
- "People also ask": "Is it okay to use ChatGPT for work?", "Do employers check if you use AI?", "Can interviewers tell if you are using AI?".
- Google suggests: "how to detect ai writing", "how to make chatgpt sound human", "why does chatgpt use em dashes", "why does chatgpt write like that".

**[Inference]** For job seekers and students this is the practical worry behind the jobs question: not "will AI replace me" but "will I be penalised for using it".

### 8. How it works

- YouTube, pinned and liked 521 times: "Who else thought ChatGPT and AI were the same thing?"
- "People also ask": "What is the difference between LLM and AI?", "Is ChatGPT LLM?", "Is ChatGPT an AI agent?", "What exactly does an AI agent do?", "Does ChatGPT actually remember everything?", "Does ChatGPT learn your personality?", "Does ChatGPT get smarter over time?".
- Google suggests: "does chatgpt remember across chats", "does chatgpt remember deleted chats", "what is an ai agent in simple terms", "how does chatgpt get its information", "how does chatgpt know my name".
- Forum: "You've reached the maximum length for this conversation… how do you actually continue a complex project?"

### 9. Using it to learn, study and job-hunt

- Google suggests: "how to use ai to study for exams", "how to use ai to learn coding", "how to use chatgpt for resume tailoring", "how to use chatgpt to write a resume based on job description", "how to use ai for interview prep", "can chatgpt apply for jobs for me".
- "People also ask": "Can I use AI to find me a job?", "Which AI tools to use for job search?".
- Trends: these specific phrasings are tiny next to "how to use chatgpt" (0.1 to 2.5 against 44.0). People search the generic question and bring the specific use with them.

### 10 to 13. Questions to have a short answer ready for

- **Environment.** The water question appears under 12 of the seed phrases, for example "does chatgpt use water", "how does ai use water", "is chatgpt bad for the environment", "is it bad to use chatgpt environment", "is it unethical to use chatgpt environment", "can ai data centers reuse water".
- **Relying on it.** "is it bad to use chatgpt everyday", "is it ok to use chatgpt as therapist", "is it ok to use chatgpt to vent", "why does chatgpt feel like my friend"; on YouTube, "How much learning will it prevent?".
- **Making money.** "how to use ai to make money" is the first suggestion for "how to use ai to" and "how can i use ai"; "How to use AI to make $10,000 a month?" appears under "how to prompt ai".
- **Other abilities and big risks.** Images and photo editing are the second-largest autocomplete theme ("why does chatgpt change my face when editing photos" has many variants). "can ai take over the world", "is chatgpt conscious" and "is ai dangerous" appear on both Google and YouTube.

## What builders ask: Women Build AI

The Women Build AI community on Skool (6,801 members) is further along than the summit audience: its members are building apps and services to earn. Of 4,773 posts from the past year, 739 asked a question. Most are about building, marketing and finding clients, but the AI questions line up with the search families:

- **Which tool**, asked again and again: moving between ChatGPT and Claude, choosing between one company's chat app, desktop agent and coding agent, and choosing a first app builder.
- **Cost and limits:** running out of tokens or credits mid-project, and plans changing under them.
- **Consistency:** whether a model has got worse this week, and what to do when a model is retired.
- **Context:** what to put in profile preferences and instruction files, and how to keep several clients separate. This is the prompting question once people use AI every day.
- **Starting without a technical background:** where to start, what "building" means, and the jargon that causes panic.
- **Thinking for yourself:** whether AI makes us think less, and how to answer people who dislike AI.
- **Careers:** salaries, remote AI work and which certifications are worth it. 23% of introductions mention a career change or job, and 11% say they feel overwhelmed or behind.

Counts, method and paraphrased themes are in `raw/skool-women-build-ai-2026-10-20.md`. The community is members-only, so nothing there names a member or quotes a post.

## Trends detail

Worldwide unless marked, past 12 months. "Mean" is relative to the biggest term in the same comparison, so numbers only compare within a row group. "Change" compares the first four months with the last four.

| Comparison | Term                         | Mean | Change |
| ---------- | ---------------------------- | ---- | ------ |
| Basics     | how to use ai                | 51.5 | −34%   |
|            | how to prompt                | 33.9 | −23%   |
|            | prompt engineering           | 17.3 | +3%    |
|            | how to use chatgpt           | 14.1 | −27%   |
|            | ai for beginners             | 8.2  | −6%    |
| Concerns   | how to use chatgpt           | 44.0 | −27%   |
|            | is chatgpt free              | 29.7 | −47%   |
|            | chatgpt vs claude            | 18.2 | +54%   |
|            | is chatgpt safe              | 8.4  | −57%   |
|            | will ai replace              | 6.3  | −18%   |
| Tools      | how to use chatgpt           | 44.0 | −27%   |
|            | how to use claude            | 28.2 | +85%   |
|            | how to use gemini            | 17.0 | −36%   |
|            | how to use copilot           | 10.3 | −32%   |
|            | what is an ai agent          | 4.8  | +28%   |
| Uses       | how to use chatgpt           | 44.0 | −27%   |
|            | how to use ai to learn       | 2.5  | flat   |
|            | how to use ai at work        | 1.9  | flat   |
|            | how to use ai for job search | 0.1  | n/a    |
|            | should i learn to code       | 0.1  | n/a    |
| UK         | how to prompt                | 39.9 | −19%   |
|            | how to use chatgpt           | 22.1 | −30%   |
|            | how to use claude            | 14.1 | ×3     |
|            | is chatgpt safe              | 5.0  | −28%   |
|            | will ai replace              | 3.5  | −25%   |

Rising related searches worth knowing: Claude Cowork, "chatgpt work vs claude cowork", OpenClaw, Hermes Agent, "how to use claude skills", "how to use chatgpt astra". Agents and new work modes are what is rising. Trends also returns obvious noise in rising queries ("how to bake a cake", "best time to visit maldives"); those were ignored.

**[Inference]** Nearly every generic how-to term fell by a quarter to a third over the year. A likely reason is that people now ask the AI chat assistant itself, or read Google's AI answer, instead of searching for a tutorial. The questions haven't gone away; they've moved somewhere search data can't see.

## What this means for the toolkit item

- **Lead with the three questions every source agrees on:** how to write a prompt, what not to share, and how to check an answer. Together they cover families 1 to 3.
- **Give a short structure people can remember.** The "People also ask" boxes show people looking for exactly that.
- **Speak to the summit's theme.** Families 5, 7 and 9 are this audience's version of the questions: will AI take entry-level work, will using it count against me, and how do I use it to learn and apply.
- **Stay tool-neutral and version-free.** Model names, plan names and menus changed several times this year. Name the type of tool (AI chat assistant, AI agent), not the version.
- **Families 10 to 13 belong in Tamas's preparation,** not necessarily on the handout: they are likely to come up as questions in the room.

## Limits of this research

- English only, from UK and US search. Moldova's own search behaviour is not measured, and the summit audience mainly speaks Romanian.
- Reddit could not be read: the browser extension now blocks reddit.com, and it was not worked around.
- Google showed its "unusual traffic" check after 46 searches, so the "People also ask" pass stopped at one level.
- YouTube commenters on beginner videos skew older than the summit audience.
- Women Build AI members are builders and entrepreneurs, further along than the summit audience. Skool stopped serving pages after 4,773 of 6,616 posts (72%), and theme counts there are keyword matches.
- The OpenAI forum is used by developers and heavy paying users, so its yield for beginner questions was low.
- Autocomplete counts reflect the seed list's design as much as demand.

## Sources and files

| File | What it holds |
| --- | --- |
| `raw/google-autocomplete-{gb,us}-{base,alphabet}-2026-10-20.txt` | Google autocomplete, 81 seed phrases plus 234 alphabet expansions, UK and US |
| `raw/youtube-autocomplete-{gb,us}-{base,alphabet}-2026-10-20.txt` | The same for YouTube |
| `raw/google-people-also-ask-2026-10-20.md` | 46 "People also ask" boxes and the recurring questions |
| `raw/youtube-comments-2026-10-20.md` | 23 videos, 2,134 comments read, the real questions kept |
| `raw/youtube-supply-audit-2026-10-20.txt` | Top 12 YouTube results for six searches |
| `raw/openai-community-forum-2026-10-20.md` | 363 top forum topics of the year, the relevant ones kept |
| `raw/google-trends-2026-10-20.txt` | Every Trends comparison, with related queries |
| `raw/skool-women-build-ai-2026-10-20.md` | Women Build AI: 4,773 posts read, 739 questions, theme counts and paraphrases (no names or quotes) |

Seed lists and the theme script are in `../../marketing/channels/niche-research-tools/` (`common-ai-questions-seeds.txt`, `common-ai-questions-seeds-alphabet.txt`, `common-ai-questions-themes.py`).
