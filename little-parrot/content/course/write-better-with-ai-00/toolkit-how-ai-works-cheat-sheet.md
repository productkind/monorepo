---
challenge: "4 - Learn more efficiently by using AI"
type: "Cheat sheet"
---
## How AI Works

The terms from this course in one place, with what each one changes about the way you prompt. Look something up here when you hit the word in a meeting, or when the AI does something odd and you want to know whether it's broken or behaving normally.

### The vocabulary

| Term | What it means | What it changes about your prompting |
|---|---|---|
| **AI** | The umbrella term for machines doing things that would normally need human intelligence: recognising patterns, understanding language, making predictions. Covers face recognition, self-driving cars, fraud detection, and much more. | Not much on its own. When someone says "the AI", ask which kind, because the answer is usually a large language model (LLM), the row below. |
| **AI model** | A program trained on data to do one particular job. It takes an input and produces an output. Inputs and outputs can be text, images, audio, or other data. | Reminds you the thing has a job it was trained for. Asking a text model to be a calculator or a search engine goes badly. |
| **LLM (Large Language Model)** | An AI model specialised in human language, trained on enormous amounts of text. The thing you're talking to when you use an AI chat assistant like ChatGPT or Claude.ai. | It's a language specialist. It's excellent at shaping and rewording what you give it, and unreliable about facts you didn't give it. |
| **Training data** | The text the model learned from: books, articles, websites, code, forums. "Large" refers to how much of it there was. | It has seen millions of Slack messages, LinkedIn posts, and exec memos. Naming the format taps into all of that. |
| **Token** | A small unit of text: a word, part of a word, or a punctuation mark. "Unbelievable" might be three tokens. Models read and write in tokens, not words. | Rough rule: 100 words is about 130 tokens. Useful when a tool tells you a limit in tokens. |
| **Prediction** | The model generates one token at a time, each time picking from the most likely next tokens given everything before it. It continues a pattern rather than reasoning towards an answer. | Everything you put in the prompt shifts what's "likely" next. That's why tone words and format names work so well. |
| **Prompt** | Everything you send: your instruction, plus anything you paste or attach. | The only lever you have. There's no hidden setting that fixes a thin prompt. |
| **System prompt** | Hidden instructions written by whoever built the tool, sent alongside your prompt every time. They set the ground rules for how it behaves. | Explains why the same model feels different in different apps, and why it sometimes refuses things or defaults to a particular style. |
| **Context** | Everything the model can see right now: the system prompt, your current message, the earlier messages in this conversation, and any attached files. | The model has no memory. Each time you send a message, the app resends the conversation, sometimes a summarised version of it. Context is the entire world it knows. |
| **Context window** | The maximum amount of context a model can hold at once, measured in tokens. | Today's models hold a lot, but they read the start and the end of what you've given them most reliably. Put your key instructions at the end. Once a conversation nears the limit, some apps summarise the earlier part, so don't rely on a detail you mentioned an hour ago still being there in full. |
| **Hallucination** | Output that's wrong or invented, produced with the same confidence as anything correct. | You can't prompt it away. It happens when the model fills a gap. Give it fewer gaps, and check the output. |
| **Variation** | The same prompt can produce different answers, because the model picks at random from several likely next tokens rather than always taking the top one. | Rerunning is a legitimate technique when you want options. It won't tell you whether something is true. |

### Five things this explains

**Why long conversations start to drift.** Three separate things stack up, and it's worth knowing they're separate. The model reads the middle of a long context less reliably than the start and the end. Some apps summarise earlier messages once you approach the limit, so that detail is gone rather than skimmed. The biggest factor is neither of those. Research on long back-and-forth conversations shows that models tend to commit to an assumption early and then fail to recover from it. Fix for all three: restate the key details in your latest message, and if it's already off track, start a fresh chat with a short summary rather than trying to steer it back.

**Why the same prompt gives you a different answer.** It picks at random from a set of likely options rather than always taking the single most likely one. This is by design and it's why the second draft is sometimes better than the first.

**Why it sounds confident when it's wrong.** Confidence is a property of the writing style it learned. It says nothing about how sure the model is. A hallucinated metric is written in exactly the same voice as a real one.

**Why context beats clever phrasing.** It's tempting to hunt for the magic wording. Most disappointing output comes from missing information rather than from the wrong wording, and the model can't tell you what it doesn't know.

**Why "are you sure?" doesn't verify anything.** That question gets answered the same way everything else does, by predicting a likely response. Ask twice and you can get two different answers. Verification means checking against the source.

### The mental model to keep

An LLM is an extremely well-read autocomplete. It has read more Slack messages, release notes, and exec memos than you ever will, and it's very good at producing the next plausible piece of one. It has never seen your product, your customers, or your roadmap.

That's the whole trade. It brings the shape and the fluency. You bring the facts and the judgement.

### Where to go from here

- The [Tone and Style Word Bank](TOOLKIT_LINK_PLACEHOLDER) for controlling how the output sounds
- [Build a Prompt in Three Parts](TOOLKIT_LINK_PLACEHOLDER) for giving it the context it's missing
- [Check an AI Draft Before You Send It](TOOLKIT_LINK_PLACEHOLDER) for catching what it invented
