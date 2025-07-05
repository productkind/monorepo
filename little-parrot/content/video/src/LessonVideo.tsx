import {
  AbsoluteFill,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
  Audio,
  staticFile,
  Video,
  Freeze,
  spring,
} from "remotion";
import {Gif} from '@remotion/gif';
import { loadFont } from '@remotion/google-fonts/SpaceMono';
import './styles.css';
import { PropsWithChildren } from "react";
import { z } from "zod";

const {fontFamily} = loadFont();

export const CaptionsSchema = z.array(z.object({
  text: z.string(),
  start: z.number(),
  end: z.number(),
}))

export type Captions = z.infer<typeof CaptionsSchema>

export const LessonVideoPropsSchema = z.object({
  captions: CaptionsSchema,
  titleDuration: z.number().default(60),
})

export const LessonVideo: React.FC<z.infer<typeof LessonVideoPropsSchema>> = ({captions, titleDuration}) => {

  return (
    <>
      <Sequence durationInFrames={titleDuration}>
        <FullScreenText>
          <TypingText delay={0}>Artificial Intelligence</TypingText>
          <br/>
          <TypingText delay={22}>&amp;</TypingText>
          <br/>
          <TypingText delay={24}>AI Models</TypingText>
        </FullScreenText>
      </Sequence>
      <Sequence from={titleDuration} durationInFrames={218}>
        <FullScreenGif src={staticFile('section1.gif')} />
      </Sequence>
      <Sequence from={titleDuration + 218} durationInFrames={218}>
        <ImageSteps
          images={[
            [staticFile('section2.mp4'), 0],
            [staticFile('section2.mp4'), 50],
            [staticFile('section2.mp4'), 100],
            [staticFile('section2.mp4'), 150],
          ]}
        />
      </Sequence>
      <Sequence from={titleDuration}>
        <Captions captions={captions} />
      </Sequence>
      <Sequence from={titleDuration}>
        <Audio src={staticFile('section1.wav')} />
      </Sequence>
    </>
  );
};

const Captions: React.FC<{captions: Captions}> = ({captions}) => {
  const frame = useCurrentFrame()
  const sentences = getCaptionSentences(captions, 60)
  const sentence = sentences.find((sentence) => sentence.start <= frame && sentence.end >= frame)

  return (
    <AbsoluteFill style={{
      fontFamily,
    }}>
      <div className="flex flex-col items-center justify-end h-full w-full">
        <div className="font-black text-6xl text-center w-full p-10 min-h-1/8" style={{
          WebkitTextStroke: '2px #fff',
        }}>
          {sentence?.words.map((word, index) => {
            const isCurrentWord = word.start <= frame && word.end >= frame
            return (
              <span key={index} style={{
                WebkitTextStroke: isCurrentWord ? '2px #fdb226' : '2px #fff',
              }}>
                {`${word.text} `}
              </span>
            )
          })}
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

const ImageSteps: React.FC<{images: [string, number][]}> = ({ images }) => {
  const frame = useCurrentFrame()
  return (
    <AbsoluteFill className="bg-black" style={{
      fontFamily,
    }}>
        <div className="flex flex-col items-center justify-center h-full w-full">
          {images.map(([image, delay], index) => {
            const height = 1920 / images.length
            return (
              <div key={index} style={{
                width: 1080,
                height,
                overflow: 'hidden',
              }}>
                <Freeze active={frame < delay} frame={delay}>
                  <Video loop src={image} width={1080} style={{
                    opacity: frame < delay ? 0 : 1,
                  }}/>
                </Freeze>
              </div>
            )
          })}
        </div>
    </AbsoluteFill>
  )
}

const FullScreenText: React.FC<PropsWithChildren> = ({ children }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const rotation = spring({
    frame,
    fps,
    config: {
      damping: 100,
    },
    durationInFrames: 30,
    from: 30,
    to: -30,
  });
  const translate = spring({
    frame,
    fps,
    config: {
      damping: 100,
    },
    durationInFrames: 30,
    from: 800,
    to: 600,
  });
  return (
    <AbsoluteFill className="bg-[image:var(--gradient)]" style={{
      fontFamily,
    }}>
      <img src={staticFile('logo.png')} className="absolute top-10 left-10 w-60" />
      <div className="flex flex-col items-center justify-center h-full w-full">
        <div className="font-black text-9xl text-center w-full">
          {children}
        </div>
      </div>
      <img src={staticFile('parrot.png')} className="absolute bottom-10 right-10 w-240" style={{
        rotate: `${rotation}deg`,
        transformOrigin: 'bottom',
        translate: `${translate}px 0`,
      }} />
    </AbsoluteFill>
  )
}

const TypingText: React.FC<{children: string, delay?: number}> = ({ children, delay = 0 }) => {
  const frame = useCurrentFrame();
  const chars = children.split("")
  const now = (frame - delay) < 0 ? 0 : frame - delay
  const masked = chars.map(char => char === " " ? " " : "#")
  const text = children.substring(0, now) + masked.slice(now).join("")
  return <>
    {text}
  </>
}

const FullScreenGif: React.FC<{src: string}> = ({ src }) => {
  return (
    <AbsoluteFill>
      <Gif
        src={src}
        width={1080}
        height={1920}
        fit="cover"
      />
    </AbsoluteFill>
  )
}