# Concepts

## AI

### Definition

Artificial Intelligence refers to an ability of a machine to perform tasks that typically require
human intelligence. This includes learning, comprehension, reasoning, problem-solving, perception,
language understanding, and more.

### Aspects

 - Nowadays most AI systems are based on machine learning, particularly deep learning.


## model

### Aspects

 - Always has an input and output.
 - Both the input and output can be in various forms such as text, images, audio, etc.
 - Models are created by training on large datasets.
 -




 - context
 - prompt
 - token
 - ai
 - LLM (Large Language Model)
 -



1. What
   **Definition:** Define the concept clearly and concisely
   **By the Platform:** Yes
2. Why
   **Definition:** Explain the need and/or the pain and/or the innovation
   **By the Platform:** Yes
3. When
   **Definition:** Explain real use-cases for the concept
   **By the Platform:** Yes
4. Like
   **Definition:** Describe a common phenomenon as metaphor
   **By the Platform:** Yes
4. Show

    - The concept is explained by directly showing the happy case
5. Guide
    - Showing counter examples, common mistakes, and nested examples
6. Recognize
    - Able to spot the concept in context
7. Fix
    - Able to correct the concept
8. Try
    - Able to reproduce the concept based on example
9. Translate
    - Able to use the concept with explicit instructions
10. Express
    - Able to use the concept with implicit instructions
11. Pick
    - Able to use and pick the concept as correct sub-task/sub-concept with explicit instructions
12. Reason
    - Able to use and pick the concept as correct sub-task/sub-concept with implicit instructions




## Cards


### Video

In simple terms, Artificial Intelligence is the capability of a machine to perform tasks that would normally require human intelligence. This includes things like learning from data, understanding language, recognising patterns, and making decisions.

Many problems are too complex for traditional, rule-based programming. AI gives us new ways to tackle these challenges: it can help us automate repetitive tasks, personalise user experiences, and make better predictions.

Today, when we use tools like ChatGPT or Gemini, we often call them Artificial Intelligence. Technically, they’re a specific kind of AI known as Large Language Models, or LLMs.

So, what exactly is an LLM? To answer that, let’s start with the basics: an AI model.

An AI model is simply a program that’s trained on data to do a particular job, for example, classifying images, spotting trends, or generating text. A model always takes an input and produces an output. The input and output can be text, images, audio, or other forms of data.

A Large Language Model is a type of AI model that’s specialised in human language. It’s trained on vast amounts of text to learn the structure and patterns of how we write and speak. This allows it to generate text, summarise information, answer questions, and even help you brainstorm ideas.

### Quiz



### Video

LLMs are the form of AI that you encounter most often in your day-to-day life. It's likely that
you have used them in a chat setup, like ChatGPT, and maybe you had the impression that you are
talking with a thinking being. But in reality LLMs are not thinking, just predicting the output.
To understand how they work, we need to understand what a token is.

A token is a unit of text that the model processes. It can be a word, part of a word, or even
punctuation. When you give an input to an LLM, it breaks down the text into tokens,
then based on the input tokens it predicts the next token in the sequence. This process continues
until it generates a complete response.

The predictions are based on the patterns and relationships learned during training.

This means you can think of an LLM as a very advanced autocomplete system that predicts the next
word or phrase based on the context provided by the input tokens.

This also means that LLMs do not have a deep understanding of the content they generate.

When the output is not correct, or has mistakes we usually say that the model is hallucinating.

It is better to have the mental model that LLMs are always hallucinating, and in most of the
cases they are hallucinating outputs that are useful and correct.

### Reel Video

AI models are created in an evolutionary process. Similarly how the human civilization created the
recipe of pizza. The recipe that results the pizza that you can order from your from your favourite
place differs a lot from the first pizza like flat breads of ancient Italy. A recipe is evolving
by each time it is followed through people can taste the pizza and adjust its parameters based on
the taste. A model also has parameters and the learning process that creates it, involves running
the model millions of times and based on the output it creates these parameters are changed to
have better results. When the model is used, as you type into an AI chat interface, just runs the
billions of parameters parameters that have been set during training and delivers you your answer
quite a bit faster than your pizza is delivered to you after somebody executed the few parameters
the pizza recipe we as society created through centuries.

### Last AI Video

Every time when you give your prompt in a chat interface for an LLM, a system prompt is stitched to
your input. The system prompt is a prompt written by the creators of that LLM it contains general
rules how it should behave when it is chatting with you. After processing all the tokens of the
system prompt and your prompt, it listing internally what would would be the most probable tokens
that could be the next right after the input based on the statistical relationships between tokens.
It randomly picks one from the top of this list, then it repeats this process for the next token.
By repeating this process over and over it generates the most probable answer to your prompt.
This random picking it the reason why LLMs are giving different answers for the same prompt every
time. How does the LLM remembers the conversation that you had in the chat? The LLM does not have
any memory, so the previous messages both by you and the LLM, are simply prepended to your latest
message automatically. Anything that is prepended to your current prompt, like previous messages or
attached files are called the context. By latest studies it is shown that the last 5000 to 7000
tokens have the most influence to the output. That is why it can feel that it forgets things from a
long context.




AI models evolve like pizza recipes.
The first pizzas were simple flatbreads.
Over time, people tweak the recipe: cook, taste, adjust, repeat.
Training a model works the same way.
A model has parameters. An algorithm runs the model millions of times, checks the output, nudges adjusts the parameters if the output is incorrect, then runs it again until it improves.
This process is called machine learning.
When you type into an chat with AI chat, you are not training it.
You are using the final recipe.
Billions of fixed parameters work together to serve your answer in seconds.
No half-hour wait like a pizza delivery.




Chat AI the whole context

Because of this prediction based nature, you can expect totally different output for asking
verifications on a previous output, or asking the same question multiple times.

pizza

### try AI

### Video

what is a prompt and what is prompt engineering




### Motivational video


Until recently, building applications was much harder. Now, with AI app builders such as Lovable,
anyone can get started. Still, it helps to understand the basic building blocks of a typical
application. By learning key terms from design and software development, you can become better at
prompting these AI tools. In this micro-course, we’ll focus on demystifying the common terms used
when building software, so you can grow your vocabulary and confidence.

By the end, you’ll be able to:
 - Understand key terms used in app design and development
 - Recognise these terms in AI app builders
 - Use them to create clearer prompts for AI app builders

## Design course

- Wireframes
- Components
- User flows
- Visual hierarchy
- Box Model
- Colors
- Typography
- Icons

## Box model


Everything on the web is made up of boxes. Each box has a width and height usually defined in
pixels. A box can have a border, and we can define how thick the border is and what color it has.
Inside the border there is a padding area that defines how much space there is between the border
and the content of the box. Outside the border there is a margin area that defines how much space
there is between this box and other boxes around it.

### Landing

We’re living through a moment that could reshape who gets to build the future. AI builders let
anyone turn ideas into real software just by using plain English. It should be a huge opening for
women.

But here’s the problem. Women are being left out of this revolution. Women make up a huge share of
online workers and business owners, yet only around one in five vibe coders are women. And we’ve
been here before. Before 1984, the percentage of women majoring in computer science was rising
faster than the percentage of men. Then personal computers were marketed as toys for boys, and we
lost that momentum.

We’re not letting that happen again.

Right now, the people shipping apps often look the same. They deserve to be there, but they
shouldn’t be the only ones. Women have ideas worth building. They have communities to serve.
They deserve the tools to create, not just to consume.

Little Parrot exists because women have ideas worth building. They have businesses, they have
ambition, and they are often the ones juggling the most unpaid work at home. Long courses and
expensive bootcamps don’t fit into their lives, but microlearning does. So we teach women how to
build real software products in tiny, science-based steps that fit into spare moments. No
overwhelm, no jargon, no gatekeeping. Just practical skills and a supportive community.

Software is power. And power should be shared. When women can build, they can change their income,
their businesses, and their communities. That’s the future we’re working on at Little Parrot.




- skills
    - Chat-bar
    - chat mode
    - code view
    - visual edit
    - knowledge file
    - credit use
    - changes
    - revert
    - api key prompt
    - sql prompt
    - auth setup
    - preview
    - changes
    - mindeset about credits
    - publish
    - security review
    - database view
    - database edit
    - backend logs
    - frontend logs
    - migrations
    - github connect
    - google auth
    - sending emails
    - sending texts
    - reading third party apis
    - CMS
    - DNS
    - Metrics
    - Favicon
    - social tags
    - seo
    - payment

### Debugging

When you create applications with AI app builders, sometimes things don’t work as expected.
Debugging is the process of identifying and fixing these issues. In this micro-lesson, we’ll cover
techniques, and foundational knowledge to help you troubleshoot problems in your AI-built
applications. By the end, you’ll be able to: Understand common issues that arise in AI-built
applications, use systematic approaches to identify the root cause of problems, and apply
techniques to fix issues effectively.
