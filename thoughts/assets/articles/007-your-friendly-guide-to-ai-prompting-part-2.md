# Your Friendly Guide to AI Prompting: Four Practical Prompting Techniques (Part 2 of 3)

*Get better at prompting and find out why AI has baked-in bias*

**Date:** July 23, 2025
**Author:** Kinga Magyar

---

Welcome to Your Friendly Guide to AI Prompting – Part 2! Last week you learned 4 basic prompting techniques and this week, we'll dive even deeper. Reading this article takes 6 minutes, and you'll get actionable techniques and real-life examples to get better outputs from ChatGPT, Claude, or Gemini. Let's dive in!

Over the past few months, I witnessed several conversations and presentations where someone (often women) referred to ChatGPT or Microsoft Copilot as "he". We tend to automatically ascribe maleness to authority. It doesn't matter if you self-identify as a feminist, you probably have internalised the idea that authority, especially in a technical field, is male. This article isn't about gender inequalities and the issues that stem from patriarchal societies; it is about prompting AI. Where these two areas intersect is the inherent bias in AI's responses, which we need to be aware of. A recent scientific study showed that women consistently received lower salary suggestions from large language models (LLMs) than men for the same roles. This shows that LLMs carry residual societal stereotypes, likely learned from their training data.

It's important to manage our expectations when interacting with AI. Therefore, in this instalment of Your Friendly Guide to AI Prompting, I'll briefly go through how AI models work. It will be quick and handy. Then, we'll explore four practical prompting techniques you can apply right away in your work and life.

[Upgrade to paid button]

## Brief Overview of How AI Models Work

First, let's get our definitions straight.

An AI model is a program trained on data to find patterns and produce useful outputs like text, predictions, or insights.

Large language models are a specific type of AI model designed to process and generate human language. They are trained on vast amounts of information: articles, your social media posts, books, and other available online resources, which shape what they know and how they respond.

Now you might see why gender bias is baked into AI. These models don't "think" like humans but recognise statistical relationships in text. They predict what word (or part of a word) is likely to come next, based on training data, not human reasoning. So, the reply you get from ChatGPT is merely based on probabilities.

They generate output that looks correct, but don't ask for clarification or additional details when they're uncertain. You've probably seen that they're overconfident.

So, if you're a product person wondering how to get true value from AI, here's your mindset shift: You're the one with the ideas, the AI helps you test and shape them faster.

The following prompting techniques will result in better AI outputs, but now that you understand how AI works, you know that you cannot omit critical thinking.

## Practical Prompting Techniques

### 1. Specify Output Format

**Tip**

Tell the AI exactly how you want the output formatted.

**Rationale**

Ensures the output is directly usable for your next steps.

Ensures that important details you need are part of the output.

**Example**

Business use cases:

> "Format the interview notes as a markdown table with 3 columns: name of interviewee, date of interview, pain point." [Attach or paste notes]

> "Summarise the main insights in this research article in 5 bullet points." [Attach article]

> "Create a JSON array of 3 product items for a mock e-commerce site. Include: id, name, category, price, in_stock (boolean)."

> "Turn each user quote into a Job-to-Be-Done statement. Use this format: 'When [situation], I want to [motivation], so I can [expected outcome].'" [List quotes]

Life use cases:

> "Write my holiday packing list to Norway in July as a checklist I can tick off."

> "Compare these three serums in a table with pros, cons, and price:" [List serums]

### 2. Provide Examples

**Tip**

Provide a few examples of input-output pairs that demonstrate the desired task or style.

If you want a specific style or format, include 1-3 (or more, depending on complexity) examples within your prompt that illustrate the format, tone, or specific task you want the AI to perform.

Ensure your examples are diverse enough to cover different scenarios or variations of the task.

**Rationale**

AI learns from patterns. Examples are incredibly powerful for guiding output.

**Example**

Business use cases:

> "Here are three examples of effective cold outreach emails. Write a new one in a similar style." [Attach or paste the examples]

Example prompt with input-output pairs:

```
Tag each support ticket with 1-3 relevant labels based on the issue. Use tags like: billing, bug, feature request, account, onboarding, mobile, UX feedback, performance.

Follow the examples below:
Input: "I can't log into my account after resetting my password twice."
Output: ["account"]

Input: "Is there a way to export my data? I couldn't find that option."
Output: ["feature request", "UX feedback"]

Input: "The app keeps freezing whenever I try to upload a photo on Android."
Output: ["bug", "mobile", "performance"]

Now tag the attached tickets.
```
[Attach a document with support tickets]

Life use cases:

Example prompt for reframing thoughts:

```
Reframe these thoughts with a calm, self-supportive tone. Follow this pattern:

Example:
Limiting thought: I don't have enough experience to lead this project.
Empowering reframe: I bring a unique perspective, and I'm capable of learning what I don't yet know.

Now reframe:
1. I always mess up when I speak in meetings.
2. People won't take me seriously if I ask questions.
3. I'm not sure I'm ready for this promotion.
```

### 3. Break Down Complex Tasks

**Tip**

If you have a long prompt, break it into smaller, manageable steps.

Use clear separators (Markdown, XML tags, numbered lists) to distinguish between instructions, context, examples, and input data.

**Rationale**

Separators help the model to parse the prompt more effectively, thereby helping it to process and adhere to all instructions.

**Example**

Business use cases:

Example prompt using markdown separators:

```
## Role
You are an SEO expert. You write SEO titles and descriptions that make an article easily discoverable online.

## Rules to follow
* SEO title: The length for an SEO title is under 60 characters.
* SEO description: The length for an SEO description is between 50-160 characters.

## Good examples
<example-1>
[Give example here]
</example-1>

<example-2>
[Give example here]
</example-2>

### Your task
Compare the tools below for the purpose of product analytics in a mid-sized SaaS company. The output should be a table with:
– Tool name
– Strengths
– Limitations
– Price

### Tools
– Amplitude
– Mixpanel
– PostHog
```

Another example, using a "Task" and "Original" section:

```
### Task
Rewrite this explanation so it's clear to non-technical stakeholders. Keep it concise and neutral in tone.

### Original
We migrated our user tracking from a server-side setup to a client-side implementation because the old backend pipeline was slowing things down and causing delays in reporting user events.
```

Life use cases:

Example prompt structured with instructions and background sections:

```
### Instructions
Help me think through a potential career change by doing three things:
1. List 3 career paths that align with my interests
2. Suggest 1-2 steps I could take for each path
3. Highlight any skills I may already have that transfer well

### About me
– I enjoy writing, coaching, and solving problems
– I'd like more flexibility and meaning in my work
– My CV is attached with my professional background
```
[Attach your CV or pdf of your LinkedIn page]

### 4. Affirmative Directives over Negative Constraints

**Tip**

Tell the AI what to do and what boundaries it needs to stay within, rather than what not to do.

**Rationale**

While AI models are getting better at handling negative constraints, framing in the positive is generally more robust.

Prevents unwanted outputs and keeps the AI focused.

**Example**

Business use cases:

> "Write 5 user interview questions to understand why users churn after onboarding. Make the questions open-ended and focused on behaviour. Avoid leading language by using neutral wording."

(Note: "avoid" here is acceptable as it sets a boundary on how to do something, not what not to output.)

Life use cases:

❌ Instead of "Don't use jargon," try

✅ "Use simple, accessible language."

[Upgrade to paid button]

## Next week: A Batch of More Advanced Prompting Techniques

I encourage you to mix and match these prompting techniques (and the ones you learned last week) for maximum benefit. Remember, AI is just doing some (complex) statistics to predict the next word based on its training data, but it doesn't think. So, next time it gives you a suboptimal answer, instead of being frustrated at it, try adjusting your prompt with these techniques. Then take it's output as a starting point and get your neural network to work as well!

Next week we'll go through four more advanced prompting techniques and a bonus one.

Until then, happy practicing!

[Subscribe button]
