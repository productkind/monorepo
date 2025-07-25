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
    outputPath: string
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

        return alignment;

    } catch (error) {
        console.error('Error generating speech:', error);
    }
}

const ELEVENLABS_API_KEY = 'sk_91544f2e0c841dcc7f863f643795881543dcd0f56baddfce';
const VOICE_ID = 'iP95p4xoKVk53GoZ742B'; // The voice ID you provided
const TEXT_TO_GENERATE = `
Set the tone and style how the AI is expected to phrase its replies.
Especially useful when crafting messages that need to reflect your authentic voice, rather than generic AI-generated hyperbole.
`
const MODEL_ID = 'eleven_multilingual_v2'; //'eleven_v3_turbo'; // The v3 model as requested
const OUTPUT_FILE_NAME = 'generated_speech-tip.wav';
const OUTPUT_FILE_PATH = OUTPUT_FILE_NAME // Saves in the same directory as the script


// Call the function to generate speech and handle the returned alignment data
generateSpeech(TEXT_TO_GENERATE, VOICE_ID, MODEL_ID, ELEVENLABS_API_KEY, OUTPUT_FILE_PATH)
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



