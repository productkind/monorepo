
import fs from 'fs';
import path from 'path';

/**
 * Processes character-level timing data to extract words with their start and end times.
 * @param {object} data - The input JSON object containing characters and their timings.
 * @param {string[]} data.characters - An array of individual characters.
 * @param {number[]} data.character_start_times_seconds - An array of start times for each character in seconds.
 * @param {number[]} data.character_end_times_seconds - An array of end times for each character in seconds.
 * @returns {Array<object>} An array of word objects, each with 'text', 'start', and 'end' properties.
 */
function processCharacterData(data) {
    const words = []; // Array to store the final word objects
    let currentWordChars = []; // Temporary array to build the current word's characters
    let currentWordStartTime = null; // Stores the start time of the current word

    // Iterate through each character and its corresponding timing data
    for (let i = 0; i < data.characters.length; i++) {
        const char = data.characters[i];
        const charStartTime = data.character_start_times_seconds[i];
        const charEndTime = data.character_end_times_seconds[i];

        // If the current character is not a space, it's part of a word
        if (char !== ' ' && char !== '\n') {
            // If this is the first character of a new word, record its start time
            if (currentWordChars.length === 0) {
                currentWordStartTime = charStartTime;
            }
            currentWordChars.push(char); // Add character to the current word
        }

        // Determine if the current character marks the end of a word.
        // This happens if:
        // 1. The current character is a space.
        // 2. It's the very last character in the entire sequence.
        const isEndOfWordBoundary = (char === ' ' || char === '\n' || i === data.characters.length - 1);

        // If it's an end-of-word boundary and we have characters accumulated for a word
        if (isEndOfWordBoundary && currentWordChars.length > 0) {
            const wordText = currentWordChars.join(''); // Join characters to form the word string
            let wordEndTime;

            // Determine the end time of the word:
            if (char === ' ' || char === '\n') {
                // If the current character is a space, the word ended with the character
                // *before* this space. So, use the end time of the previous character.
                wordEndTime = data.character_end_times_seconds[i - 1];
            } else {
                // If it's the last character and not a space, the word ends with this character.
                // So, use the end time of the current character.
                wordEndTime = charEndTime;
            }

            // Add the completed word object to our results array
            words.push({
                text: wordText,
                start: currentWordStartTime,
                end: wordEndTime
            });

            // Reset for the next word
            currentWordChars = [];
            currentWordStartTime = null;
        }
    }
    return words;
}

// --- Main execution block ---
async function main() {
    const inputFilePath = 'timestamps-tip.json';
    const outputFilePath = 'output-tip.json';

    try {
        // 1. Read the input JSON file
        console.log(`Reading input from: ${inputFilePath}`);
        const rawData = fs.readFileSync(inputFilePath, 'utf8');
        const inputData = JSON.parse(rawData);

        // 2. Process the data
        console.log('Processing character data into words...');
        const outputWords = processCharacterData(inputData);

        // 3. Write the output JSON file
        console.log(`Writing output to: ${outputFilePath}`);
        fs.writeFileSync(outputFilePath, JSON.stringify(outputWords, null, 2), 'utf8');

        console.log('Successfully processed data and saved the output!');

    } catch (error) {
        console.error('An error occurred:', error.message);
        if (error.code === 'ENOENT') {
            console.error(`Error: The file '${inputFilePath}' was not found.`);
            console.error('Please ensure your input JSON data is saved in a file named `input.json` in the same directory as this script.');
        } else if (error instanceof SyntaxError) {
            console.error('Error: Invalid JSON format in `input.json`. Please check your JSON syntax.');
        } else {
            console.error('An unexpected error occurred. Please check the input data and script logic.');
        }
    }
}

// Run the main function
main();

