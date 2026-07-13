import * as fs from 'fs'

// If you are using an older Node.js version that doesn't have global fetch,
// you might need to install 'node-fetch' and uncomment the line below:
// import fetch from 'node-fetch';

/**
 * Interface for the alignment data received from ElevenLabs API.
 */
interface Alignment {
  char_start_times_ms: number[]
  chars_durations_ms: number[]
  chars: string[]
}

/**
 * Generates speech from text using the ElevenLabs API, including timestamp data,
 * and saves the result in a WAV file.
 * @param text The text to convert to speech.
 * @param voiceId The ID of the voice to use (e.g., 'iP95p4xoKVk53GoZ742B').
 * @param modelId The ID of the ElevenLabs model to use (e.g., 'eleven_v3_turbo').
 * @param apiKey Your ElevenLabs API key.
 * @param outputPath The full path where the generated WAV file will be saved.
 * @returns A Promise that resolves with the Alignment data if successful, otherwise void.
 */
async function generateSpeech(
  text: string,
  voiceId: string,
  modelId: string,
  apiKey: string,
  outputPath: string,
  jsonOutputPath?: string,
): Promise<Alignment | void> {
  // Changed the URL to request timestamps
  const url = `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}/with-timestamps`

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'xi-api-key': apiKey,
      },
      body: JSON.stringify({
        text: text,
        model_id: modelId,
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.75,
          speed: 1.1,
        },
        output_format: 'wav_44100', // Request WAV format directly at 44.1 kHz sample rate
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(
        `ElevenLabs API error: ${response.status} ${response.statusText} - ${errorText}`,
      )
    }

    // The response is now JSON, containing audio_base64 and alignment
    const responseData = await response.json()
    const audioBase64 = responseData.audio_base64
    const alignment: Alignment = responseData.alignment

    if (!audioBase64) {
      throw new Error('No audio_base64 found in the response.')
    }

    // Decode the base64 audio data
    const buffer = Buffer.from(audioBase64, 'base64')

    // Write the buffer to the specified output path
    fs.writeFileSync(outputPath, buffer)
    console.log(`Speech generated and saved to ${outputPath}`)
    console.log('Timestamp (Alignment) Data:')
    console.log(JSON.stringify(alignment, null, 2))
    // Optionally save the alignment data to a JSON file
    if (jsonOutputPath) {
      fs.writeFileSync(jsonOutputPath, JSON.stringify(alignment, null, 2))
      console.log(`Alignment data saved to ${jsonOutputPath}`)
    }

    return alignment
  } catch (error) {
    console.error('Error generating speech:', error)
  }
}

const ELEVENLABS_API_KEY = 'sk_91544f2e0c841dcc7f863f643795881543dcd0f56baddfce'
const DEFAULT = 'iP95p4xoKVk53GoZ742B' // The voice ID you provided
const ARIA = '9BWtsMINqrJLrRacOk9x' // Aria
const LILY = 'pFZP5JQG7iQjIQuC4Bku' // Lily
const SARAH = 'EXAVITQu4vr4xnSDxMaL' // Sarah
const ELIZABETH = 'AXdMgz6evoL7OPd7eU12' // Elizabeth
const BETH = '8N2ng9i2uiUWqstgmWlH' // Beth
const LANA = 'roYauZ4bOLAKvVZTPLre'
const CHLOE = 'lhgliD0TncfFOY1Nc93M' // Chloe
const VOICE_ID = CHLOE // Change to the desired voice ID
const video1 = `
In simple terms, Artificial Intelligence is the capability of a machine to perform tasks that would normally require human intelligence. This includes things like learning from data, understanding language, recognising patterns, and making decisions. Many problems are too complex for traditional, rule-based programming. AI gives us new ways to tackle these challenges: it can help us automate repetitive tasks, personalise user experiences, and make better predictions. Today, when we use tools like ChatGPT or Gemini, we often call them Artificial Intelligence. Technically, they’re a specific kind of AI known as Large Language Models, or LLMs. So, what exactly is an LLM? To answer that, let’s start with the basics: an AI model. An AI model is simply a program that’s trained on data to do a particular job, for example, classifying images, spotting trends, or generating text. A model always takes an input and produces an output. The input and output can be text, images, audio, or other forms of data. A Large Language Model is a type of AI model that’s specialised in human language. It’s trained on vast amounts of text to learn the structure and patterns of how we write and speak. This allows it to generate text, summarise information, answer questions, and even help you brainstorm ideas.
`

const video2 = `
Set the tone and style how the AI is expected to phrase its replies.
Especially useful when crafting messages that need to reflect your authentic voice, rather than generic AI-generated hyperbole.
`

const video3 = `
AI models evolve like pizza recipes.
The first pizzas were simple flatbreads.
Over time, people tweak the recipe: cook, taste, adjust, repeat.
Training a model works the same way.
An algorithm runs the model millions of times, checks the output, adjusts the parameters if the output is incorrect, then runs it again until it improves.
When you chat with AI, you are not training it.
You are using the final recipe.
Billions of fixed parameters work together to serve your answer in seconds.
No half-hour wait like a pizza delivery.
`

const video4 = `
When you type a message into an AI chat, your prompt isn’t processed on its own.
Behind the scenes, the system adds another piece: a hidden system prompt.
This is written by the model’s creators and sets the ground rules for how the AI should behave with you.
The model then takes both the system prompt and your prompt, breaks them down into tokens,
and starts predicting what comes next.
A token can be as short as a single letter or as long as a word.
At each step, the model ranks possible next tokens by likelihood, chooses from the top candidates,
and then repeats the process. By stringing these predictions together, one token at a time, it produces a full reply. Because it samples from the top options rather than always picking the single most likely one, the same prompt can lead to slightly different answers.
But what about memory? The model doesn’t actually remember past interactions.
Instead, the app feeds it the conversation history again each time you send a new message.
This history, along with any files you’ve attached, is bundled into the latest prompt and called the context.
The model pays most attention to the most recent few thousand tokens, roughly five to seven thousand.
This is why, in long conversations, it can seem like the AI forgets earlier details.
`

const video5 = `
Until recently, building applications was much harder. Now, with AI app builders such as Lovable,
anyone can get started. Still, it helps to understand the basic building blocks of a typical
application. By learning key terms from design and software development, you can become better at
prompting these AI tools. In this micro-course, we’ll focus on demystifying the common terms used
when building software, so you can grow your vocabulary and confidence.

By the end, you’ll be able to:

Understand key terms used in app design and development,
recognise these terms in AI app builders, and
use them to create clearer prompts for AI app builders.
`

const video6 = `
Everything on the web is made up of boxes. Each box has a width and height, usually defined in pixels. A box can have a border, and you can set how thick it is and what colour it has. Inside the border is the padding, which defines the space between the border and the box’s content. Outside the border is the margin, which defines the space between this box and the other boxes around it.
`

const video7 = `
When you start working on an app idea, it can be hard to know where to begin. In this micro-course, you’ll define the problem you want to solve, understand your target user, and sketch a simple storyboard that shows how your product helps them.
You’ll then break your idea into buildable steps using user story mapping, shape a focused minimum viable product, and turn it into a clear prompt for an AI app builder.
You’ll finish with a small, workable version of your idea and a plan for gathering early feedback. Most importantly, you’ll see that you can move an idea forward one clear step at a time.
`

const videoLanding = `
We’re living through a moment that could reshape who gets to build the future. With AI app builders, anyone can turn an idea into working software using simple prompts.

Yet women are being left out. They make up a large share of online workers and business owners, but only about one in five vibe coders are women. We have seen a pattern like this before. In the early 1980s, women were entering computer science at a faster rate than men. Then personal computers were marketed mainly to boys, and that progress faded.

We don’t want to see history repeat itself.

Right now, many of the people building apps come from similar backgrounds. They absolutely belong there, but they shouldn’t be the only ones.

We care because software is a form of power, and power should be shared. When a woman builds something, she creates economic independence, solves problems that matter to her community, and becomes a role model for future generations.

At Little Parrot, we’re helping women gain the skills to create value and opportunity through software.

Our microlearning approach fits into busy lives. Short, science-backed lessons make it possible to learn during coffee breaks, commutes, or after the children are asleep, without career interruptions or major sacrifices.

And this all happens in a kind, welcoming space where curiosity is encouraged, mistakes are part of learning, and everyone belongs.
`

const videoDebugging1 = `
If you’ve ever built something in Lovable and thought, "Why isn't this working?", you’re already debugging.
Debugging isn’t a sign that you’ve failed, or that you’re not technical enough. It’s simply the process of understanding why your app isn't doing what you expected, and then fixing it.
Here’s something that might surprise you: even experienced developers spend a massive part of their day fixing things that don't work. Bugs happen to everyone.
The difference between someone who feels stuck and someone who moves forward isn't being "more technical." It’s knowing what to do when things go wrong.
That’s exactly what you’ll learn here: how to debug with confidence.
In this micro-course, you’ll learn to identify different types of bugs, spot their root causes, and investigate properly before jumping into fixes.
You’ll pick up the same habits professional developers use:
How to prevent bugs in the first place. How to investigate issues step by step.
And how to use Lovable’s debugging tools properly, instead of guessing or getting stuck in "fix-break" loops.
By the end, you’ll have a practical toolkit for troubleshooting. When something breaks, you’ll know where to look, what questions to ask, and exactly how to move forward.
Bugs will still happen. But they won’t stop you anymore.
`

const videoLovableBasics1 = `
You have an idea for an app.
---
Maybe it's something to help your community, your
business, or just solve a problem that's been bugging you. But you don't know how
to code, so that idea stays stuck in your head.
What if that changed today? What if you could describe what you want and watch it
become real software, live on the internet, that you can share with anyone?
---
That's exactly what's about to happen. By the end of this micro-course, you'll go
from "I can't build apps" to "I just published my first one." You'll know how to
turn ideas into working products by describing what you want. No coding required.
Along the way, you'll learn to build step by step, handle problems calmly, and
experiment without fear of breaking things.
---
Ready to become someone who builds?
---
Let's go!
`

const videoLovablePublish1 = `
You've built an app with Lovable.
---
That's a real achievement!
---
But right now, it probably lives on a generic URL, has a default favicon, and maybe still uses test
data. If you share it with someone, they might wonder: is this a real product?
---
That's about to change. In this micro-course, you'll go from "I built an app" to "I'm running a digital
product that people can find, trust, and use." You'll publish your app properly, set up a
custom domain, add legal pages, make it discoverable through search engines and AI
tools, track how people use it, and plan your growth.
By the end, you won't just have an app. You'll have a live product with a
professional presence on the internet. And you'll know exactly how to keep
improving it based on what your users tell you.
---
Ready to launch?
---
Let's go!
`

const videoSocialMedia000 = `
You are not falling behind on AI. The panic is being sold to you.
Since ChatGPT entered our everyday lives, we’ve been bombarded with the message that we’ll be left behind if we don’t constantly keep up with every new AI tool, model, and workflow.

As with any message, it is worth asking what motivation sits behind it.

Much of this urgency comes from private, venture-backed AI companies that need enough users to meet the immense growth expectations of their investors. If you are afraid you will lose your job, or become a Discman in a Spotify world, you are more likely to start paying for their services sooner.

In reality, AI can improve how you work. It can even make work more fun and exciting. But that does not mean you need to rush.

It is completely fine to take your time and get started with these technologies at your own pace.
If you'd like to learn more about AI calmly, follow along.
`

const videoSocialMedia001 = `
Learning the newest AI tool the week it launches usually means learning it twice.

If you have not tried Claude Code yet, or any of the other AI tools trending on LinkedIn, that is completely fine.

We, at productkind, saw the same posts about 10x productivity last yrar. We felt the FOMO too. Still, we waited half a year before really trying Claude Code.

When AI tools are this new, they change constantly. The workflow you learn in the spring can be gone by autumn. Rushing to use a brand new tool often means learning it twice.

When you do sit down with it, you will find it can improve how you work, but it's not a magic wand you wave to become Wonder Woman.

If you have not touched it yet, you are not behind. Waiting a little often means less mental load. Learn AI at your own pace, without the tech industry rushing you.
`

const videoSocialMedia002 = `
Ask most people what AI is, and they picture a chat assistant like ChatGPT, Claude or Gemini. But that is a very recent association. The idea is far older than these tools.

The first systems that we called AI go back to the 1950s. Back then, people tried all sorts of ways to build machines that seemed intelligent. Some programs reproduced patterns in text. Others followed strict sets of rules. Some even loosely copied how the human brain works.

The AI inside today's chat assistants is called an LLM. Short for Large Language Model. It blends two of those older ideas: the brain-inspired one and the text-pattern one.

More on understanding LLMs in the next video.
`

const videoSocialMedia003 = `
Humans have been chasing intelligent machines for centuries, with varying degrees of honesty. In 1770, a Hungarian inventor toured Europe with the Mechanical Turk, a chess-playing cabinet that beat Napoleon and Benjamin Franklin. He forgot to mention the chess master folded inside, doing all the actual chess.

Today's most common attempt looks very different. It's the Large Language Model.

To understand LLMs, start with what a model is. A model is a mathematical mechanism that learns from data. Traditional software follows rules that a person wrote. A model is created differently. Making one involves showing it enormous piles of examples until it finds patterns in them. Once the model is finished, it uses those patterns to answer new questions.

The process of teaching a model those patterns is called machine learning.

If you would like to keep learning how AI works, calmly, follow along.
`

const videoSocialMedia004 = `
Remember the GPT Store? For about a week it was the biggest news in AI. Now you barely hear about it.

Every single week there is a new AI tool or feature, and it feels like if you don't keep up, you will miss every good opportunity. But a lot of that pressure is manufactured. Companies fuel the excitement around their products to keep investors funding them. And plenty of these tools quietly disappear a few months later.

It's completely fine to wait and learn the ones that prove useful over time. Think of it like investing in a good pair of jeans that lasts for years, instead of the fast-fashion trend piece that looks dated by next season.

Learning AI does not have to feel like a race. If that suits you, follow along.
`

const videoSocialMedia005 = `
An AI model is really just a huge pile of numbers. GPT-5 has around a few trillion of them.

These numbers are called weights. When you send a question, the model uses all of them to work out an answer.

How do the weights know what a good answer looks like? The model went through training.

Training works like this. The model is shown one example at a time. It makes a guess. Its guess is compared to the correct answer. If the guess is off, all the weights get nudged a tiny bit, so the next guess gets closer.

Repeat billions of times.

Eventually, the guesses start coming up right. Then training stops, and the weights freeze. That's when AI companies release the model.

From that moment on, the model does not learn anything new. Even if you correct it in a chat, the weights stay the same. It is done with school.

More on how this changes what you can expect from AI in the next video.
`

const videoSocialMedia006 = `
When you send a message to a chat assistant, it does not see your words the way you do. It sees tokens.

A token is a small chunk of text. Sometimes it is a whole word. Sometimes it is a piece of one. Common words like "hello" are usually a single token. Longer or less common words like "hippopotamus" get split into two or three.

Punctuation and spaces get their own tokens too.

Why chop things up like this? Because the model works with numbers, not letters. Every possible token has its own number in the model's vocabulary. Splitting text into tokens is how it turns what you wrote into something it can do maths on.

If you have ever seen chat assistants priced "per million tokens", this is what they mean. It is not the same as words. Roughly, a hundred tokens is about seventy-five words in English.

More on how the model uses these tokens in the next video. Follow us, so you won't miss it.
`

const videoSocialMedia007 = `
Chat assistants build their replies one token at a time.

Once your message has been chopped into tokens, the model looks at everything so far and asks a single question: what token should come next?

It ranks all the possible next tokens by probability, picks from the top few, and writes it. Then it looks at what it has just written, and asks the same question again. And again.

By stringing these predictions together, one token at a time, it builds you a full reply.

There is no bigger plan. The model does not decide the sentence before starting it, or the paragraph before starting it. It is guessing what should come next, then guessing again.

The finished answer often looks planned. That is because the model was trained on planned writing.

More in the next video on what else the model sees when it does this. Follow us, so you won't miss it.
`

const videoSocialMedia008 = `
When you send a message to a chat assistant, your prompt is not the only thing the model sees.

The app also adds a hidden message called the system prompt. It sits before your message, and you never see it.

The system prompt is written by the model's creators. It sets the ground rules for how the AI should behave: how polite to be, what topics to swerve around, what tone to hit, what to refuse, when to add a disclaimer.

The model treats this hidden message the same way it treats yours. It reads both, tokens them, and generates a reply that fits everything it has been given. 

Your prompt and the system prompt are not the only things the model sees. More on that in the next video. Follow for more.
`

const videoSocialMedia009 = `
Two things that surprise people about chat assistants.

First, they do not remember your past conversations. Each time you send a message, the app resends the entire chat history back to the model. That bundle of history, plus any files you have attached, is called the context.

The model pays closest attention to the most recent chunk of that context, roughly five to seven thousand tokens. Anything older gradually slips off the edge, which is why long conversations can feel like the AI is forgetting.

Second, the same prompt can give you different answers. When the model predicts the next token, it does not always pick the single most likely word. It samples from the top few options. A bit of randomness is why hitting regenerate can produce a different reply.

So the model is not remembering you, and it is not being consistent either. It is doing maths, with a small amount of dice-rolling on top.

How AI assistants handle the context is getting more nuanced every day. If you want to learn more about it, follow along.
`

const videoSocialMedia010 = `
Most chat assistants come with a hidden set of instructions called a system prompt. Most companies keep theirs private. Anthropic, the company behind Claude, publishes theirs.

You can read the current one on docs.anthropic.com. It is thousands of words long, and full of small, surprisingly human notes.

Claude is told to avoid the words "genuinely", "honestly", and "actually".

It's told never to use bullet points when declining a task, because "the additional care helps soften the blow".

It's told to check whether an image is really attached before responding, because "the person may have forgotten to upload it".

Reading it feels a bit like reading a job brief for the AI, written by someone who has paid attention to a lot of chats.

If you want to know why your chat assistant behaves the way it does, its system prompt is a good place to start. Follow us for more interesting and fun insights on AI.
`

const videoSocialMedia011 = `
Training a language model needs data. A lot of data.

The pile of text used to train a model is called a corpus. It can be almost anything written down: books, articles, websites, code, forum posts, Wikipedia, product reviews, film scripts. The more variety, the better the model gets at handling questions across different topics.

Before any of it is fed to the model, the corpus has to be cleaned. Duplicates get removed. Low-quality text gets thrown out. Anything that would confuse or mislead the model gets pulled aside.

Anthropic and OpenAI rarely gather all this data themselves. They buy most of it. A whole industry of data brokers hoovers up huge chunks of the internet, cleans it, packages it, and sells the finished corpus to whoever is training a model. One of the least visible, most consequential industries in AI.

If you would like to learn more, follow along.
`

const videoSocialMedia012 = `
Language models borrow their basic idea from the brain. Emphasis on "basic".

Your brain does its thinking with neurons. Each is a cell with a long tail that connects to others. It receives signals from the neurons before it, and it decides whether to fire a signal onwards.

An artificial neuron in an LLM works in a similar way, only with maths instead of biology. It takes the numbers coming in. It multiplies each by its own weight. It adds them all up. If the total is bigger then a certain other number, called a bias, it sends a signal onwards. If not, it stays silent.

That is one neuron. A language model has billions of them, stacked in layers, all passing signals along.

The weights and biases are the model's parameters. They are what training adjusts. The more neurons you have, the more subtle the patterns the model can pick up.

More like this coming up. Follow along.
`

const videoSocialMedia013 = `
Ever noticed how a chat assistant will apologise the second you correct it. The mechanism is simpler than it looks.

A language model is essentially a glorified autocomplete. It predicts the next word based on what came before. When you type "you are wrong, the actual answer is..." the model looks at everything so far and asks: what would a human typically say next?

The most likely continuation, based on the entire internet, is a polite apology followed by a corrected answer. So that is what you get.

The model does not know it was wrong. It does not remember being wrong. It is just predicting what a helpful person would say after being corrected. And a helpful person usually starts with "You're right, I apologise..."

Once you see this, chat assistants stop feeling like they are learning from you. They are just very good at predicting what humans say next.

If you'd like to learn more about AI calmly, follow along.
`

const videoSocialMedia015 = `
Science-fiction AI does not talk like ChatGPT. HAL, Skynet, C-3PO, the ship's computer on the Enterprise. They are precise, literal, occasionally menacing. Never rambly.

Today's chat assistants are the opposite. They will happily invent a fake court case, misremember a date, or apologise five times for something you did not ask about. Creative slop, essentially.

The reason is that those sci-fi books were written in the sixties and seventies, when everyone assumed AI would be built by giving a machine an enormous set of rules to follow. Rule-based reasoning. Cold, careful, exact.

That is not how it went. The AI that broke through was the pattern-matching kind. A model that has read most of the internet and is guessing what word should come next. Warm, verbose, and occasionally making things up.

If your idea of AI still comes from those books, no wonder the real thing feels strange. It was built from a different assumption.

More like this coming up. Follow along.
`

const TEXT_TO_GENERATE = videoSocialMedia015
const MODEL_ID = 'eleven_v3' //'eleven_multilingual_v2' // // The v3 model as requested
const videoName = 'social-015-chloe'
const OUTPUT_FILE_NAME = `generated_speech-${videoName}.wav` // e.g.,
const ALIGNMENT_JSON_FILE_NAME = `alignment-${videoName}.json`
const OUTPUT_FILE_PATH = OUTPUT_FILE_NAME // Saves in the same directory as the script

// Call the function to generate speech and handle the returned alignment data
generateSpeech(
  TEXT_TO_GENERATE,
  VOICE_ID,
  MODEL_ID,
  ELEVENLABS_API_KEY,
  OUTPUT_FILE_PATH,
  ALIGNMENT_JSON_FILE_NAME,
)
  .then((alignment) => {
    if (alignment) {
      console.log('Successfully retrieved speech and timestamp data.')
      // You can now use the 'alignment' object for video synchronization
      // For example, you could iterate through alignment.chars and alignment.char_start_times_ms
      // to display text on screen at the correct time.
    } else {
      console.log(
        'Speech generation completed, but no alignment data was returned or an error occurred.',
      )
    }
  })
  .catch((error) => {
    console.error('Unhandled promise rejection:', error)
  })
