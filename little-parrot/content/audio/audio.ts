import * as fs from 'fs';
import * as path from 'path';

// If you are using an older Node.js version that doesn't have global fetch,
// you might need to install 'node-fetch' and uncomment the line below:
// import fetch from 'node-fetch';

/**
 * Interface for the alignment data received from ElevenLabs API.
 */
interface Alignment {
    char_start_times_ms: number[];
    chars_durations_ms: number[];
    chars: string[];
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
    jsonOutputPath?: string
): Promise<Alignment | void> {
    // Changed the URL to request timestamps
    const url = `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}/with-timestamps`;

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
                    similarity_boost: 0.75
                },
                output_format: 'wav_44100' // Request WAV format directly at 44.1 kHz sample rate
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`ElevenLabs API error: ${response.status} ${response.statusText} - ${errorText}`);
        }

        // The response is now JSON, containing audio_base64 and alignment
        const responseData = await response.json();
        const audioBase64 = responseData.audio_base64;
        const alignment: Alignment = responseData.alignment;

        if (!audioBase64) {
            throw new Error('No audio_base64 found in the response.');
        }

        // Decode the base64 audio data
        const buffer = Buffer.from(audioBase64, 'base64');

        // Write the buffer to the specified output path
        fs.writeFileSync(outputPath, buffer);
        console.log(`Speech generated and saved to ${outputPath}`);
        console.log('Timestamp (Alignment) Data:');
        console.log(JSON.stringify(alignment, null, 2));
        // Optionally save the alignment data to a JSON file
        if (jsonOutputPath) {
            fs.writeFileSync(jsonOutputPath, JSON.stringify(alignment, null, 2));
            console.log(`Alignment data saved to ${jsonOutputPath}`);
        }


        return alignment;

    } catch (error) {
        console.error('Error generating speech:', error);
    }
}

const ELEVENLABS_API_KEY = 'sk_91544f2e0c841dcc7f863f643795881543dcd0f56baddfce';
const DEFAULT = 'iP95p4xoKVk53GoZ742B'; // The voice ID you provided
const ARIA = '9BWtsMINqrJLrRacOk9x'; // Aria
const LILY = 'pFZP5JQG7iQjIQuC4Bku'; // Lily
const SARAH = 'EXAVITQu4vr4xnSDxMaL'; // Sarah
const ELIZABETH = 'AXdMgz6evoL7OPd7eU12'; // Elizabeth
const BETH = '8N2ng9i2uiUWqstgmWlH'; // Beth
const VOICE_ID = ELIZABETH; // Change to the desired voice ID
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

const TEXT_TO_GENERATE = videoLanding;
const MODEL_ID = 'eleven_multilingual_v2'; //'eleven_v3_turbo'; // The v3 model as requested
const videoName = 'video-landing-elizabeth';
const OUTPUT_FILE_NAME = `generated_speech-${videoName}.wav`; // e.g.,
const ALIGNMENT_JSON_FILE_NAME = `alignment-${videoName}.json`;
const OUTPUT_FILE_PATH = OUTPUT_FILE_NAME // Saves in the same directory as the script


// Call the function to generate speech and handle the returned alignment data
generateSpeech(TEXT_TO_GENERATE, VOICE_ID, MODEL_ID, ELEVENLABS_API_KEY, OUTPUT_FILE_PATH, ALIGNMENT_JSON_FILE_NAME)
    .then(alignment => {
        if (alignment) {
            console.log('Successfully retrieved speech and timestamp data.');
            // You can now use the 'alignment' object for video synchronization
            // For example, you could iterate through alignment.chars and alignment.char_start_times_ms
            // to display text on screen at the correct time.
        } else {
            console.log('Speech generation completed, but no alignment data was returned or an error occurred.');
        }
    })
    .catch(error => {
        console.error('Unhandled promise rejection:', error);
    });



