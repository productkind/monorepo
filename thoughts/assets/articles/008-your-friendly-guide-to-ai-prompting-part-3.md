# Your Friendly Guide to AI Prompting: 4+1 Practical Prompting Techniques (Part 3 of 3)

*How to enhance your thinking with AI, not replace it*

**Date:** July 30, 2025
**Author:** Kinga Magyar

---

Welcome to the final instalment of Your Friendly Guide to AI Prompting! In Part 1, you learned 4 basic prompting techniques, then Part 2 brought you some insights on why AI is biased and how you can get outputs you can use right away. This week, we'll go through more advanced techniques you can apply to your work and life to make AI's outputs more useful.

There is a lot of chatter around "AI damaging our brains." As with most things in life, there's more nuance to this than the clickbait headlines and LinkedIn posts suggest. A recently published study, titled "Your Brain on ChatGPT," received significant media coverage, and many people inflated its findings. Using AI doesn't damage your brain, but outsourcing your thinking does make your brain lazier.

I was reading Ethan Mollick's commentary on this misinterpretation (his newsletter came highly recommended by Teresa Torres). It was particularly interesting as it offered a nuanced look at how to use AI to our advantage. The core idea was to think first, then use AI, rather than replacing our own thinking by asking ChatGPT to solve our homework, write our strategy, or create articles for us.

The prompting techniques that follow are a bit more advanced than those covered in Parts 1 and 2, designed to enhance your thinking rather than replace it.

Let's dive in!

[Upgrade to paid button]

## Practical Prompting Techniques

### 1. Chain-of-Thought (CoT) Prompting

**Tip**

Encourage the model to "think step by step" before giving its final answer.

For complex problems, you can even structure the prompt to explicitly list out intermediate steps you want the AI to follow.

**Rationale**

This mimics human reasoning and allows the AI to break down complex problems.

It elicits reasoning in LLMs, and has shown significant performance improvements on complex reasoning tasks (e.g., arithmetic, common sense, symbolic reasoning).

Caveat: While CoT is proven to be a powerful method to improve the performance of large language models (LLMs), a recent study surfaced its limitations. Researchers found that the multi-step "thought process" the model generates doesn't necessarily represent the actual reasoning mechanism it used to arrive at its output. Therefore, the reasoning cannot be trusted blindly, we still need to exercise our critical thinking. Having said this, in the majority of the cases, this technique still improves the output of the model.

**Example**

Add phrases to your prompt like:

- "Think step by step,"
- "Break this down into smaller parts,"
- "First, identify the key variables, then…"

Business use cases:

> "We need to plan a product rollout across 5 markets. Each market requires 3 weeks of preparation and 2 weeks of post-launch support. We have 3 teams that can work in parallel, but each team can only handle one market at a time. What's the minimum time to complete the entire rollout? Let's think through this step by step:"

> "Here's a list of user feedback from the past month. Think step by step: first group related comments, then identify the core issues or requests, and finally suggest product opportunities based on them." [Insert user feedback]

Life use cases:

> "Help me plan a move to Lisbon, Portugal as an EU citizen. Step by step: 1) What do I need to research before moving? 2) What administrative processes should I keep in mind? 3) What's the ideal timeline? 4) What should I prepare and pack in the final weeks?"

> "I want to buy a new laptop, I'm based in the EU. First, walk me through the trade-offs between performance, weight, and price. Then suggest 2–3 models that balance those well."

### 2. Encourage Analysis

**Tip**

Prompt the model to analyse, evaluate, or compare before generating a direct answer.

**Rationale**

This ties into CoT but also broader cognitive prompting techniques. Encouraging the model to engage in analytical steps before responding can lead to more insightful and accurate outputs.

**Example**

Business use cases:

> "Analyse the pros and cons of these content management systems: Wix, WordPress, Squarespace, then provide a recommendation on which one to use for our website. We are a small design agency."

> "I would like to set up a SaaS company with only 5 people, I'm based in Germany. Where should I incorporate my company? Before giving a recommendation, analyse the tax rules and ensure it's economically viable to set up the company, invoice our customers and pay dividend to the founders."

Life use cases:

> "I'm a product manager. I want to explore a more creative path outside of work, maybe something with writing, mentoring, or coaching. But I'm not sure how to start or whether it's worth pursuing seriously. What are three different ways to explore this desire? Evaluate each approach in terms of time investment, clarity gained, and potential to lead to something fulfilling."

> "I'm choosing between two weekend routines to create more balance in my life:
> Option 1: Saturday focused on errands and productivity, Sunday fully off.
> Option 2: Spread tasks lightly across both days to reduce pressure.
> Compare these two approaches and identify their similarities and differences in terms of mental load, rest quality, and long-term sustainability. I have two kids and a demanding job, so I need something that restores me."

### 3. Encourage Self-Criticism

**Tip**

Prompt the model to check its own response for mistakes or gaps, generate constructive feedback, and revise its answer based on that feedback. Then, repeat the process a couple of times if needed.

**Rationale**

Self-criticism helps improve accuracy and depth. It encourages the model to "reflect" on its output, spot errors or weaknesses, and strengthen its answer iteratively. It's similar to how people refine ideas through feedback and revision.

**Example**

After writing your initial prompt, and the LLM gave you an output, you can use these phrases to encourage self-criticism and improve the output:

- "Now check your own response for mistakes or gaps, generate constructive feedback, and revise your answer based on that feedback."
- "Check your answer for errors or weak points. List your criticisms and rewrite your answer based on them."
- "Critique your solution thoroughly, and improve it using your own critique."

Business use case:

> "Here's something I wrote. Can you check it for clarity, assumptions, and completeness? Then give me 2–3 suggestions to improve it, and revise the text using your own feedback." [Attach or paste your text]

[After receiving a response]

Follow-up: "Now do a second review of your revision. Are there still any gaps or weak points?"

### 4. Decomposition

**Tip**

Prompt the model to break down the problem into smaller parts, solve each one step by step, then combine the answers to reach a final solution.

This is especially useful when you are setting up AI agents to complete tasks on their own, but you can also apply it when prompting AI in a chat interface. Just break the questions down, and once the AI has replied, prompt it with the next piece.

**Rationale**

Complex problems often benefit from being tackled in stages.

Decomposition mirrors how experts approach big challenges by identifying subproblems, addressing them individually, then synthesising the results for a stronger, more complete answer.

**Example**

Business use cases:

> "This challenge feels too big to tackle in one go. Help me break it down into manageable steps so I can make progress one part at a time. The issue is that I need to build a company-wide AI education plan that's actually useful to non-technical teams."

[After receiving a response]

Follow-up: "Now, create a clear, detailed outline for each step, then highlight the immediate next step I need to take."

> "I want to write a book or a long essay about my experience in tech and leadership, but I keep stalling. Break this creative project into clear phases so I can stop treating it like one giant 'thing'. Then help me tackle the first step in a simple, no-pressure way."

> "There's growing tension between product and sales: sales keeps pushing for roadmap changes based on requests from prospects. Break this issue down into its root components. What needs to be resolved first, and in what order?"

[After receiving a response]

Follow up: "Based on the resolutions, suggest a practical and detailed plan to rebuild alignment without adding more process overhead."

Life use cases:

> "I'm just coming out of a major burnout phase and want to rebuild my energy, routine, and confidence but it feels overwhelming. Help me break this down into smaller parts. Suggest 4–5 focus areas I can work on one at a time, like physical health, mindset, routines, or identity. Then let's start with the first one: guide me through simple, realistic steps to rebuild that area."

> "I've been feeling stuck in my relationship. We're not in crisis, but we've lost connection and alignment. Help me break this into smaller areas I can reflect on or work through. Start with the first one and help me explore how I could improve that gently."

> "I'm in a weird in-between phase. I left a demanding job, and now I don't know who I am without it. Can you help me break this identity shift into smaller parts to work through?"

[After receiving a response]

Follow up: "Let's begin with the first part: how do I understand what I lost?"

### +1 Iterate and Refine

**Tip**

Don't expect the perfect answer on the first try.

Start with a simpler prompt, evaluate the output.

Identify what's missing or incorrect, and then add more specific instructions, examples, or constraints in subsequent prompts.

**Rationale**

Prompt engineering is an empirical process. It's often the most practical and effective way to get desired results, especially for complex tasks.

**Example**

> "Write a LinkedIn post about what I learned from launching a product that didn't meet its adoption goals, because we relied too heavily on stakeholder feedback, instead of doing more thorough user research."

[After receiving a response]

> "Dial down the emojis and the buzzwords. Keep the tone honest and humble. End with a short question to invite other PMs to share similar experiences."

> "Help me write a message to a client who keeps messaging me outside of working hours."

[After receiving a response]

Follow-Up: "Make it clear but kind. Reinforce that I care about their work, but that I stick to working hours unless there's an emergency. Suggest an async way to collect their questions."

[Upgrade to paid button]

## One Last Tip and Let's Chat

I found the Encourage Self-Criticism technique very powerful, and I'd like to encourage you to try it after your next prompt. It quickly improves the quality of the AI replies and doesn't require a lot of energy to remember. So, give it a shot!

I'd be intrigued to hear what techniques you use for getting better answers from LLMs. What are your experiences with prompting so far? Let's learn from each other.

## References

- Your Friendly Guide to AI Prompting: Four Practical Prompting Techniques (Part 1 of 3) — https://productkind.substack.com/p/your-friendly-guide-to-ai-prompting
- Your Friendly Guide to AI Prompting: Four Practical Prompting Techniques (Part 2 of 3) — https://productkind.substack.com/p/your-friendly-guide-to-ai-prompting-adf
