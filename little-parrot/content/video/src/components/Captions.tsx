import { AbsoluteFill, useCurrentFrame } from 'remotion'
import { loadFont as loadMontserrat } from '@remotion/google-fonts/Lexend'

import type { TimelineWord } from '../narration/timeline'

const { fontFamily: montserratFontFamily } = loadMontserrat()

const BLACK = '#080809'
const CURRENT_TEXT_COLOR = '#ffb65b'

/** Words with frame timings, as the timeline stores them. */
type Captions = TimelineWord[]

/**
 * Lifted unchanged from LessonVideo.tsx so the captions keep rendering exactly as they do in the
 * videos already published.
 */
export const Captions: React.FC<{ captions: Captions }> = ({ captions }) => {
  const frame = useCurrentFrame()
  const sentences = getCaptionSentences(captions, 26)
  const sentence = sentences.find((sentence) => sentence.start <= frame && sentence.end >= frame)

  return (
    <AbsoluteFill style={{
      fontFamily: montserratFontFamily,
    }}>
      <div className="mt-[250px] mb-[420px] w-full h-full">
        <div className="flex flex-col items-center justify-end h-full w-full px-8">
          <div className="font-bold text-8xl text-center w-full min-h-1/8">
            {sentence?.words.map((word, index) => {
              const isCurrentWord = word.start <= frame && word.end >= frame
              return (
                <span key={index} className="inline-block m-4 line-height-1" style={{
                  backgroundColor: isCurrentWord ? CURRENT_TEXT_COLOR : '#fff',
                  color: BLACK,
                  height: '112px',
                }}>
                  {word.text}
                </span>
              )
            })}
          </div>
        </div>
      </div>
    </AbsoluteFill>
  )
}

type CaptionSentence = {
  text: string;
  start: number;
  end: number;
  words: Captions
}

const getCaptionSentences = (captions: Captions, maxSentenceLength: number): CaptionSentence[] => {
  const sentences: CaptionSentence[] = [];
  if (!captions || captions.length === 0) {
    return sentences;
  }

  let currentSentenceWords: Captions = [];

  for (const caption of captions) {
    const newWords = [...currentSentenceWords, caption];
    const newText = newWords.map(c => c.text).join(' ');

    if (newText.length > maxSentenceLength && currentSentenceWords.length > 0) {
      // Max length exceeded. Finalize the previous sentence.
      sentences.push({
        text: currentSentenceWords.map(c => c.text).join(' '),
        start: currentSentenceWords[0].start,
        end: currentSentenceWords[currentSentenceWords.length - 1].end,
        words: currentSentenceWords,
      });

      // Start new sentence with current caption
      currentSentenceWords = [caption];
    } else {
      // Add caption to current sentence
      currentSentenceWords.push(caption);
    }

    // Check for punctuation AFTER deciding on length.
    if (/[.!?]$/.test(caption.text)) {
      // Punctuation marks the end of a sentence regardless of length.
      if (currentSentenceWords.length > 0) {
        sentences.push({
          text: currentSentenceWords.map(c => c.text).join(' '),
          start: currentSentenceWords[0].start,
          end: currentSentenceWords[currentSentenceWords.length - 1].end,
          words: currentSentenceWords,
        });
      }
      currentSentenceWords = []; // Reset for the next sentence
    }
  }

  // Add any remaining words as the last sentence
  if (currentSentenceWords.length > 0) {
    sentences.push({
      text: currentSentenceWords.map(c => c.text).join(' '),
      start: currentSentenceWords[0].start,
      end: currentSentenceWords[currentSentenceWords.length - 1].end,
      words: currentSentenceWords,
    });
  }

  return sentences;
};
