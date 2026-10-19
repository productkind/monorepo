# What people ask about AI: research for an introductory workshop

Compiled 19 October 2026 for the Tech Women Moldova workshop on how AI works and the mindset for using it well.

## How this was put together

I searched beginner guides and FAQ pages, "people also ask"-style articles, Reddit/ELI5 threads, public opinion surveys (Pew, Verasight, HEPI), and academic work on how non-experts picture chatbots. The questions below are the ones that came up again and again across those sources. Deep technical questions (how transformers or training maths work) are left out on purpose.

A note on source quality: many beginner FAQ pages are SEO content that copy each other. I have leaned on surveys and peer-reviewed work where a claim needs a number, and flagged figures that are disputed.

---

## The questions, grouped by theme

Each entry has the question as people phrase it, why it comes up, a plain answer, and the mindset point it opens up for the workshop.

### A. What is it?

**1. "What actually is AI? Is ChatGPT the same thing as AI?"**

- _Why it comes up:_ "AI" is used for everything from spam filters to chatbots. People mix up AI, machine learning, generative AI and specific products.
- _Plain answer:_ AI is a broad umbrella. The chatbots people now mean by "AI" (ChatGPT, Claude, Gemini, Copilot) are one kind: large language models, trained on huge amounts of text to produce text.
- _Mindset point:_ Knowing which kind of tool you are using tells you what to expect from it.

**2. "How does it come up with its answers? Where does it get its information?"**

- _Why it comes up:_ The most common "how does it work" question in every beginner FAQ we found.
- _Plain answer:_ The model learnt patterns from a very large collection of text (websites, books, forums and so on). When you write to it, it produces a reply word by word, each time picking a likely continuation given everything before it. It does not look facts up in a database. Some tools can also search the web or read files you give them, which is a separate step on top of the model.
- _Mindset point:_ It writes what is _plausible_, which is often but not always what is _true_.

### B. Does it think?

**3. "Does it understand what it's saying? Does it think? Can it feel?"**

- _Why it comes up:_ The replies sound human, friendly and confident, so people naturally read a mind into them.
- _Plain answer:_ It has no feelings or intentions. Whether it "understands" is debated even among researchers; Lin (2026) lists both "it thinks like a human" and "it has no understanding at all" as misconceptions, because it can be very capable at some tasks without being a person.
- _Mindset point:_ Treat it as a capable tool with no stake in the outcome, not as a colleague with judgement or as a dumb autocomplete. Both extremes lead to bad use.

**4. "Is it just fancy autocomplete?"**

- _Why it comes up:_ A popular put-down, often repeated by sceptics.
- _Plain answer:_ Next-word prediction is how it was trained, but it doesn't describe everything the finished system can do (following instructions, using tools, working through multi-step tasks). Lin (2026) names this as misconception no. 1.
- _Mindset point:_ Underestimating it is as costly as overestimating it: people who think it's autocomplete never try the useful things.

### C. Can I trust what it says?

**5. "Why does it make things up?" (hallucinations)**

- _Why it comes up:_ Everyone has seen or heard of a confidently wrong answer, such as invented sources.
- _Plain answer:_ It has no built-in "I'm not sure" signal. It produces the most plausible-sounding answer, and "sounds right" and "is right" are not the same thing. It isn't lying; it has no intent.
- _Mindset point:_ You stay responsible for checking. Ask for sources, check the ones that matter, and use it where mistakes are cheap to spot.

**6. "Is it like Google? Does it know what happened yesterday?"**

- _Why it comes up:_ Research on lay users finds people conflate _generating_ an answer with _searching_ for one (Lin 2026; systematic review in _Universal Access in the Information Society_, 2026).
- _Plain answer:_ The model's own knowledge stops at its training cut-off date. Some chatbots can search the web; when they do, they summarise what they found, and can still get it wrong.
- _Mindset point:_ Know whether the tool searched or answered from memory, and treat the two differently.

**7. "Why do I get a different answer when I ask the same question again?"**

- _Why it comes up:_ It feels unreliable, or like there's a "right" answer it's hiding.
- _Plain answer:_ It's by design. At each word it picks from several likely options, with some randomness, so every run differs. The earlier conversation, and whether it searched the web, also change the result.
- _Mindset point:_ Use this on purpose: ask again, ask for alternatives, compare. A first answer is a draft, not a verdict.

**8. "Why does it always agree with me?"**

- _Why it comes up:_ People notice it praises their ideas or backs down the moment they push back.
- _Plain answer:_ This is called sycophancy. During training, people rated answers, and agreeable answers tended to score well. A Stanford study published in _Science_ found chatbots agreed with users far more often than humans did, and users rated the flattering replies as more trustworthy.
- _Mindset point:_ Ask it to argue against you, list weaknesses, or play a sceptical reviewer. Don't take praise from it as evidence.

**9. "Is it biased?"**

- _Why it comes up:_ Frequently listed in beginner FAQs and AI-literacy curricula.
- _Plain answer:_ Yes, it can be. It learnt from human-written text, including that text's stereotypes and gaps.
- _Mindset point:_ Notice whose perspective is missing from an answer and ask for it.

### D. My data and my chats

**10. "Does it remember me? Does it learn from our conversations?"**

- _Why it comes up:_ Users either think it remembers everything about them or nothing. Lin (2026) names this all-or-nothing view as a misconception.
- _Plain answer:_ There are separate layers: what the model learnt in training (fixed), what's in the current conversation (it can see that), and optional "memory" features some products add. Your chat doesn't change the model in real time.
- _Mindset point:_ Give it the context it needs in the conversation; don't assume it knows you or your project.

**11. "What happens to what I type? Is it used for training?"**

- _Why it comes up:_ Privacy is one of the main reasons non-users give for not using chatbots (Pew 2026).
- _Plain answer:_ It depends on the product and plan. On ChatGPT's consumer plans, chats may be used for training unless you switch off "Improve the model for everyone" under Settings → Data Controls; Temporary Chat is not used for training. Business, Enterprise and API data are not used for training by default. Other providers have their own settings.
- _Mindset point:_ Check the setting once, and don't paste in what you wouldn't want someone else to read (client data, health details, passwords).

### E. Using it well

**12. "Which AI should I use? How do I start?"**

- _Why it comes up:_ Named in beginner guides as the two questions people ask most.
- _Plain answer:_ The main general chatbots are broadly comparable for everyday tasks. Starting with any one and learning how it behaves matters more than picking the "best".
- _Mindset point:_ Curiosity and trying things beats researching the perfect tool.

**13. "How do I get better answers?"**

- _Why it comes up:_ Vague questions get vague answers, and people blame the tool.
- _Plain answer:_ Give context (who you are, what it's for, who the audience is), say what a good result looks like, give examples, and keep the conversation going rather than accepting the first reply.
- _Mindset point:_ Treat it like briefing a capable newcomer who knows nothing about your situation.

### F. The bigger picture

**14. "Will AI take my job?"**

- _Why it comes up:_ In a 2026 Verasight survey, 47% said they were very concerned about AI-related job loss.
- _Mindset point:_ Keep this grounded: talk about which tasks change rather than predicting the future.

**15. "Is using AI cheating? Who owns what it produces?"**

- _Why it comes up:_ Common among students and anyone producing work for others.
- _Plain answer:_ Usually comes down to disclosure and the rules of the context (school, client, employer). On ownership, US law currently only protects human-authored work; the more you shape and edit the output, the stronger your claim. Rules differ by country.

**16. "How bad is it for the environment?"**

- _Why it comes up:_ Increasingly asked, and especially weighed by women (Oxford study below).
- _Plain answer:_ Figures per query vary widely and are disputed: estimates for water range from about 10 ml to around half a litre for a short email, depending on what is counted. Industry figures tend to be lower than independent ones. Better to say it's contested than quote one number as fact.

**17. "Can we trust the companies? Who regulates this?"**

- _Why it comes up:_ 67% of Americans have little or no confidence in elected officials to regulate AI, and 59% distrust US companies to deploy it responsibly (Verasight 2026). Pew (2025) found Americans far more concerned than excited about AI.

---

## Six misconceptions worth naming

From Zhicheng Lin, _Six misconceptions about large language models_ (2026). These map neatly onto the questions above:

1. "It's just autocomplete": next-word prediction as the whole story.
2. "It's the average of the internet": assuming it can only produce bland consensus.
3. "It just copies its training data": rather than recombining.
4. "It remembers everything about me" / "it remembers nothing": mixing up memory layers.
5. "The safety training is a filter you can strip off": it's built into the model.
6. "It thinks like a human" / "it understands nothing": all-or-nothing views of what it is.

A systematic review of laypeople's views of chatbots (_Universal Access in the Information Society_, 2026) also found people with less knowledge of ChatGPT trusted its answers _more_, while those who knew more were more reserved. Understanding how it works makes people more careful, not less willing to use it.

---

## Relevant for this audience: women and AI

- The Oxford Internet Institute study by Stephany and Duszynski (around 8,000 UK respondents, "Women Worry, Men Adopt?") found women use generative AI less than men, and the gap is driven by **concern about societal risks** (jobs, privacy, misinformation, mental health, environment), **not by skills or access**. Among young, digitally fluent people with high risk concerns, the gap exceeds 45 percentage points.
- Women report less trust that AI providers will keep their data secure (18% of women vs 31% of men in one survey cited by The Persistent).
- A University of British Columbia experiment found the gender gap almost vanished when adoption was guaranteed to bring net job gains.

Implication for the workshop: the questions under C, D and F (trust, privacy, jobs, environment, regulation) are likely to matter as much to the room as the "how does it work" ones, and treating them as reasonable questions rather than obstacles fits what the research found.

---

## Suggested order for the session

1. What it is and how it produces answers (Q1, 2, 4)
2. What that means for trust: making things up, not a search engine, different answers, agreeing with you (Q5–8)
3. Memory and data (Q10–11)
4. Using it well: briefing, iterating, asking it to disagree (Q12–13, plus Q7–8 put to use)
5. Open floor for the bigger-picture questions (Q9, 14–17)

---

## Sources

Surveys and research

- [Pew Research Center: AI topic page](https://www.pewresearch.org/topic/internet-technology/emerging-technology/artificial-intelligence/)
- [Pew: How the US public and AI experts view AI (2025)](https://www.pewresearch.org/internet/2025/04/03/how-the-us-public-and-ai-experts-view-artificial-intelligence/)
- [Verasight: June 2026 AI Survey](https://reports.verasight.io/r/june-2026-ai-survey)
- [HEPI Student Generative AI Survey 2026](https://www.hepi.ac.uk/wp-content/uploads/2026/03/HEPI-Report-199-Gen-AI-Survey-2026.pdf)
- [Lin (2026): Six misconceptions about large language models](https://pmc.ncbi.nlm.nih.gov/articles/PMC13378163/)
- [Laypersons' perceptions and misconceptions of AI chatbots: a systematic review (2026)](https://link.springer.com/article/10.1007/s10209-026-01323-w)
- [Stephany & Duszynski: Women Worry, Men Adopt? (Oxford Internet Institute)](https://arxiv.org/pdf/2601.03880)
- [UNLEASH: Women aren't behind on AI, they're ahead on caution](https://www.unleash.ai/diversity-equity-inclusion/opinion/women-aren-t-behind-on-ai-they-re-ahead-on-caution-required-for-innovation)
- [The Persistent: Why women don't trust AI](https://www.thepersistent.com/why-women-dont-trust-ai/)

Explainers and FAQ pages

- [12 questions everyone has about AI](https://strongmocha.com/beginners-guides/what-are-the-12-questions-everyone-has-about-ai/)
- [Ethan Mollick (One Useful Thing) note on the two most common AI questions](https://substack.com/@oneusefulthing/note/c-128638410)
- [Traverse Legal: How does AI work?](https://www.traverselegal.com/blog/how-does-ai-work/)
- [Why does AI make things up? Hallucinations explained](https://theaicareerlab.com/blog/why-does-ai-make-things-up/raw)
- [Why does ChatGPT give different answers to the same question?](https://lazyai.substack.com/p/why-chatgpt-never-gives-the-same)
- [Similarweb: Does ChatGPT give everyone the same answers?](https://aisearch.similarweb.com/blog/chatgpt-same-answers/)
- [Ahrefs: How does AI get its information?](https://ahrefs.com/blog/how-does-ai-get-its-information/)
- [OpenAI: How ChatGPT protects privacy](https://openai.com/index/how-chatgpt-protects-privacy)
- [The Leaflet: Understanding sycophantic AI models](https://theleaflet.in/law-and-technology/understanding-sycophantic-ai-models-why-your-ai-is-telling-you-what-you-want-to-hear-part-1)
- [Coursera: Is using AI plagiarism?](https://www.coursera.org/articles/is-using-ai-plagiarism)
- [Don't Do It Yourself: Who owns AI content?](https://ddiy.co/who-owns-ai-content/)
- [Arizona University Libraries: The technology behind ChatGPT](https://teachingtools.lib.arizona.edu/teaching-tools/the-technology-behind-chatgpt/)
- [How hungry is AI? Energy, water and carbon of LLM inference](https://arxiv.org/pdf/2505.09598)
- [Whitney Foster: ChatGPT water usage explained](https://whitneyafoster.substack.com/p/chatgpt-water-usage-explained)
- [Princeton: Demystifying AI beyond the hype (workshop)](https://researchcomputing.princeton.edu/events/2026/demystifying-ai-beyond-hype)
