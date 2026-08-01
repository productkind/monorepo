---
challenge: "4 - Learn more efficiently by using AI"
type: "Cheat sheet"
---
## How AI Actually Works

Every term from this course in one place, with what each one changes about the way you prompt. Look something up here when you hit the word in a meeting, or when the AI does something odd and you want to know whether it's broken or behaving normally.

### The vocabulary

| Term | What it means | What it changes about your prompting |
|---|---|---|
| **AI** | The umbrella term for machines doing things that would normally need human intelligence: recognising patterns, understanding language, making predictions. Covers face recognition, self-driving cars, fraud detection, and much more. | Not much on its own. When someone says "the AI", ask which kind, because the answer is usually an LLM. |
| **AI model** | A program trained on data to do one particular job. It takes an input and produces an output. Inputs and outputs can be text, images, audio, or other data. | Reminds you the thing has a job it was trained for. Asking a text model to be a calculator or a search engine goes badly. |
| **LLM (Large Language Model)** | An AI model specialised in human language, trained on enormous amounts of text. The thing you're talking to when you use a chat assistant. | It's a language specialist. It's excellent at shaping and rewording what you give it, and unreliable about facts you didn't give it. |
| **Training data** | The text the model learned from: books, articles, websites, code, forums. "Large" refers to how much of it there was. | It has seen millions of Slack messages, LinkedIn posts, and exec memos. Naming the format taps into all of that. |
| **Token** | A small unit of text: a word, part of a word, or a punctuation mark. "Unbelievable" might be three tokens. Models read and write in tokens, not words. | Rough rule: 100 words is about 130 tokens. Useful when a tool tells you a limit in tokens. |
| **Prediction** | The model generates one token at a time, each time picking from the most likely next tokens given everything before it. It continues a pattern rather than reasoning towards an answer. | Everything you put in the prompt shifts what's "likely" next. That's why tone words and format names work so well. |
| **Prompt** | Everything you send: your instruction, plus anything you paste or attach. | The only lever you have. There's no hidden setting that fixes a thin prompt. |
| **System prompt** | Hidden instructions written by whoever built the tool, sent alongside your prompt every time. They set the ground rules for how it behaves. | Explains why the same model feels different in different apps, and why it sometimes refuses things or defaults to a particular style. |
| **Context** | Everything the model can see right now: the system prompt, your current message, the earlier messages in this conversation, and any attached files. | The model has no memory. Each time you send a message, the app resends the whole conversation. Context is the entire world it knows. |
| **Context window** | The maximum amount of context a model can hold at once, measured in tokens. | Today's models hold a lot, but they attend most reliably to the start and the end of what you've given them. Put your key instructions at the end. |
| **Hallucination** | Output that's wrong or invented, produced with the same confidence as anything correct. | Not a fault you can prompt away. It's what happens when the model fills a gap. Give it fewer gaps, and check the output. |
| **Variation** | The same prompt can produce different answers, because the model samples from several likely next tokens rather than always picking the top one. | Rerunning is a legitimate technique when you want options. It's not a way to check whether something is true. |

### Five things this explains

**Why long conversations start to drift.** The model rereads the whole conversation each time rather than remembering it. As the conversation grows, your original instructions sit further from the end, where they get less weight. Fix: restate the key instruction in your latest message, or start a fresh chat and paste in only what's needed.

**Why the same prompt gives you a different answer.** It samples from a set of likely options rather than the single most likely one. This is by design and it's why the second draft is sometimes better than the first.

**Why it sounds confident when it's wrong.** Confidence is a property of the writing style it learned, not of how sure it is. A hallucinated metric is written in exactly the same voice as a real one.

**Why context beats clever phrasing.** People spend a long time hunting for the magic wording. Almost every disappointing output is a missing-information problem instead. The model can't tell you what it doesn't know.

**Why "are you sure?" doesn't verify anything.** That question gets answered the same way everything else does, by predicting a likely response. Ask twice and you can get two different answers. Verification means checking against the source.

### The mental model to keep

An LLM is an extremely well-read autocomplete. It has read more Slack messages, release notes, and exec memos than you ever will, and it's very good at producing the next plausible piece of one. It has never seen your product, your customers, or your roadmap.

That's the whole trade. It brings the shape and the fluency. You bring the facts and the judgement.

### Where to go from here

- The [Tone and Style Word Bank](TOOLKIT_LINK_PLACEHOLDER) for controlling how the output sounds
- [Build a Prompt in Three Parts](TOOLKIT_LINK_PLACEHOLDER) for giving it the context it's missing
- [Check an AI Draft Before You Send It](TOOLKIT_LINK_PLACEHOLDER) for catching what it invented
