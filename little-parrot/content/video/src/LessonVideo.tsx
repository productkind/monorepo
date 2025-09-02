import {
  AbsoluteFill,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
  Audio,
  staticFile,
  Video,
  spring,
  interpolate,
} from "remotion";
import {Gif} from '@remotion/gif';
import { loadFont as loadSpaceMono } from '@remotion/google-fonts/SpaceMono';
import { loadFont as loadMontserrat } from '@remotion/google-fonts/Lexend';
import './styles.css';
import { PropsWithChildren } from "react";
import { z } from "zod";
import { FRAME_RATE } from "./config";

const {fontFamily: spaceMonoFontFamily} = loadSpaceMono();
const {fontFamily: montserratFontFamily} = loadMontserrat();

export const CaptionsSchema = z.array(z.object({
  text: z.string(),
  start: z.number(),
  end: z.number(),
}))

export type Captions = z.infer<typeof CaptionsSchema>

export const LessonVideoPropsSchema = z.object({
  captions: CaptionsSchema,
  titleDuration: z.number().default(60),
  endDuration: z.number().default(60),
  allDuration: z.number().default(100),
})

export const LessonVideo2: React.FC<z.infer<typeof LessonVideoPropsSchema>> = ({captions, titleDuration, endDuration, allDuration}) => {
 /*  const frame = useCurrentFrame()
  const startMusicCutoff = 65;
  const startMusicDuration = 35;
  const volume = interpolate(frame, [startMusicCutoff, startMusicCutoff + startMusicDuration], [0.4, 0.05], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    })*/

  return (
    <>
      <Sequence durationInFrames={titleDuration}>
        <FullScreenText>
          <TypingText delay={0}>Prompting Technique</TypingText>
          <br/>
          <TypingText delay={22}>#1</TypingText>
          <br/>
          <TypingText delay={24}>Tone and Style</TypingText>
        </FullScreenText>
      </Sequence>
      { /*
      <Sequence from={0} durationInFrames={allDuration}>
        <Audio src={staticFile('start.mp3')} volume={volume} />
      </Sequence>
      */ }
      <Sequence from={titleDuration} durationInFrames={44}>
        <FullScreenGif src={staticFile('video-2/section1.gif')} />
      </Sequence>
      <Sequence from={titleDuration + 44} durationInFrames={72}>
        <FullScreenGif src={staticFile('video-2/section2.gif')} fit="contain" color="#f6adcd" />
      </Sequence>
      <Sequence from={titleDuration + 116} durationInFrames={76}>
        <FullScreenGif src={staticFile('video-2/section3.gif')} fit="contain" color="#fcedc4" />
      </Sequence>
      <Sequence from={titleDuration + 116 + 76} durationInFrames={54}>
        <FullScreenGif src={staticFile('video-2/section4.gif')} fit="contain" color="#fefefe" />
      </Sequence>
      <Sequence from={titleDuration + 116 + 76 + 54} durationInFrames={116}>
        <FullScreenGif src={staticFile('video-2/section5.gif')} fit="contain" />
      </Sequence>
      { /*
      <Sequence from={titleDuration + 116 + 76 + 54 + 116} durationInFrames={endDuration}>
        <FullScreenEnd />
      </Sequence>
         */
      }
      <Sequence from={titleDuration}>
        <Captions captions={captions} />
      </Sequence>
      <Sequence from={titleDuration}>
        <Audio src={staticFile('video-2/speech.wav')} />
      </Sequence>
    </>
  )
}



export const LessonVideo: React.FC<z.infer<typeof LessonVideoPropsSchema>> = ({captions, titleDuration, endDuration, allDuration}) => {
  const frame = useCurrentFrame()
  const startMusicCutoff = 65;
  const startMusicDuration = 35;
  const volume = interpolate(frame, [startMusicCutoff, startMusicCutoff + startMusicDuration], [0.4, 0.05], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })

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
      { /*
      <Sequence  durationInFrames={allDuration}>
        <Audio src={staticFile('start.mp3')} volume={volume} />
      </Sequence>
      */ }
      <Sequence from={titleDuration} durationInFrames={218}>
        <FullScreenGif src={staticFile('section1.gif')} />
      </Sequence>
      <Sequence from={titleDuration + 218} durationInFrames={205}>
        <ImageSteps
          allDuration={205}
          images={[
            {image: staticFile('section2.mp4'), delay: 0},
            {image: staticFile('section2-2.mp4'), delay: 70, offset: -100},
            {image: staticFile('section2-3.mp4'), delay: 110},
            {image: staticFile('section2-4.mp4'), delay: 155, offset: -150},
          ]}
        />
      </Sequence>
      <Sequence from={titleDuration + 218 + 205} durationInFrames={230}>
        <FullScreenGif src={staticFile('section3.gif')} offset={-500} />
      </Sequence>
      <Sequence from={titleDuration + 218 + 205 + 230} durationInFrames={200}>
        <ImageSteps
          allDuration={200}
          images={[
            {image: staticFile('section4.mp4'), delay: 0},
            {image: staticFile('section4-2.mp4'), delay: 70},
            {image: staticFile('section4-3.mp4'), delay: 136, offset: -320},
          ]}
        />
      </Sequence>
      <Sequence from={titleDuration + 218 + 205 + 230 + 200} durationInFrames={188}>
        <ImageSteps
          allDuration={188}
          images={[
            {image: staticFile('section5.jpg'), delay: 0},
            {image: staticFile('section5-2.jpg'), delay: 70},
          ]}
        />
      </Sequence>
      <Sequence from={titleDuration + 218 + 205 + 230 + 200 + 188} durationInFrames={274}>
        <FullScreenGif src={staticFile('section6.gif')} />
      </Sequence>
      <Sequence from={titleDuration + 218 + 205 + 230 + 200 + 188 + 274} durationInFrames={104}>
        <FullScreenGif src={staticFile('section7.gif')} />
      </Sequence>
      <Sequence from={titleDuration + 218 + 205 + 230 + 200 + 188 + 274 + 104} durationInFrames={98}>
        <FullScreenGif src={staticFile('section8.gif')} />
      </Sequence>
      <Sequence from={titleDuration + 218 + 205 + 230 + 200 + 188 + 274 + 104 + 98} durationInFrames={86}>
        <FullScreenGif src={staticFile('section9.gif')} />
      </Sequence>
      <Sequence from={titleDuration + 218 + 205 + 230 + 200 + 188 + 274 + 104 + 98 + 86} durationInFrames={148}>
        <ImageSteps
          allDuration={148}
          images={[
            {image: staticFile('section10.mp4'), delay: 0},
            {image: staticFile('section10-2.mp4'), delay: 65, offset: -100},
            {image: staticFile('section10-3.mp4'), delay: 101, offset: -100},
          ]}
        />
      </Sequence>
      <Sequence from={titleDuration + 218 + 205 + 230 + 200 + 188 + 274 + 104 + 98 + 86 + 148} durationInFrames={110}>
        <FullScreenGif src={staticFile('section11.gif')} />
      </Sequence>
      <Sequence from={titleDuration + 218 + 205 + 230 + 200 + 188 + 274 + 104 + 98 + 86 + 148 + 110} durationInFrames={178}>
        <ImageSteps
          allDuration={178}
          images={[
            {image: staticFile('section12.mp4'), delay: 0, offset: -250},
            {image: staticFile('section12-2.mp4'), delay: 65, offset: -100},
            {image: staticFile('section12-3.mp4'), delay: 92, offset: -240},
            {image: staticFile('section12-4.mp4'), delay: 118},
          ]}
        />
      </Sequence>
      <Sequence from={titleDuration + 218 + 205 + 230 + 200 + 188 + 274 + 104 + 98 + 86 + 148 + 110 + 178} durationInFrames={88}>
        <FullScreenGif src={staticFile('section6.gif')} />
      </Sequence>
      <Sequence from={titleDuration + 218 + 205 + 230 + 200 + 188 + 274 + 104 + 98 + 86 + 148 + 110 + 178 + 88} durationInFrames={65}>
        <FullScreenGif src={staticFile('section14.gif')} />
      </Sequence>
      <Sequence from={titleDuration + 218 + 205 + 230 + 200 + 188 + 274 + 104 + 98 + 86 + 148 + 110 + 178 + 88 + 65} durationInFrames={74}>
        <FullScreenGif src={staticFile('section15.gif')} />
      </Sequence>
      <Sequence from={titleDuration + 218 + 205 + 230 + 200 + 188 + 274 + 104 + 98 + 86 + 148 + 110 + 178 + 88 + 65 + 74} durationInFrames={96}>
        <FullScreenGif src={staticFile('section16.gif')} />
      </Sequence>
      <Sequence from={titleDuration + 218 + 205 + 230 + 200 + 188 + 274 + 104 + 98 + 86 + 148 + 110 + 178 + 88 + 65 + 74 + 96} durationInFrames={194}>
        <ImageSteps
          allDuration={200}
          images={[
            {image: staticFile('section17.mp4'), delay: 0, offset: -160},
            {image: staticFile('section17-2.mp4'), delay: 54, offset: -20},
            {image: staticFile('section17-3.mp4'), delay: 98, offset: -420},
            {image: staticFile('section17-4.mp4'), delay: 138, offset: -200},
          ]}
        />
      </Sequence>
      <Sequence from={titleDuration + 218 + 205 + 230 + 200 + 188 + 274 + 104 + 98 + 86 + 148 + 110 + 178 + 88 + 65 + 74 + 96 + 194} durationInFrames={endDuration}>
        <FullScreenEnd />
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
  const sentences = getCaptionSentences(captions, 26)
  const sentence = sentences.find((sentence) => sentence.start <= frame && sentence.end >= frame)

  return (
    <AbsoluteFill style={{
      fontFamily: montserratFontFamily,
    }}>
      <div className="flex flex-col items-center justify-end h-full w-full">
        <div className="font-bold text-8xl text-center w-full p-10 min-h-1/8">
          {sentence?.words.map((word, index) => {
            const isCurrentWord = word.start <= frame && word.end >= frame
            return (
              <span key={index} className="inline-block m-4 line-height-1" style={{
                backgroundColor: isCurrentWord ? '#fdb226' : '#fff',
                color: '#230156',
                height: '112px',
              }}>
                {word.text}
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

const ImageSteps: React.FC<{images: { image: string, delay: number, offset?: number, scale?: number}[], allDuration: number}> = ({ images, allDuration }) => {
  return (
    <AbsoluteFill className="bg-black" style={{
      fontFamily: spaceMonoFontFamily,
    }}>
          {images.map(({delay}, index) => {
            const height = 1920 / images.length
            const durationLeft = allDuration - delay
            return (
              <Sequence from={delay} durationInFrames={durationLeft} key={index}>
                <div className="flex flex-col items-center justify-center h-full w-full">
                  {
                    images.map(({image, offset = 0, scale = 1}, i) => {
                      const isVideo = image.endsWith('.mp4')
                      return <div>
                        <div key={i} style={{
                          width: 1080,
                          height,
                          overflow: 'hidden',
                        }}>
                          {isVideo ?
                            i === index ? <Video loop src={image} trimBefore={0} width={1080} style={{
                              translate: `0 ${offset}px`,
                            }}/> :
                            <div></div>
                          :
                            <div className="flex items-center justify-center" style={{
                              width: 1080,
                              height,
                              overflow: 'hidden',
                            }}>
                              <img src={image} width={1080} style={{
                                translate: `0 ${offset}px`,
                                scale,
                              }}/>
                          </div>
                          }
                        </div>
                      </div>
                    })
                  }
                </div>
              </Sequence>
            )
          })}
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
      fontFamily: spaceMonoFontFamily,
    }}>
      <img src={staticFile('logo.png')} className="absolute top-10 left-10 w-60" />
      <div className="flex flex-col items-center justify-center h-full w-full">
        <div className="font-black text-9xl text-center w-full" style={{
          color: '#230156'
        }}>
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

const FullScreenGif: React.FC<{src: string, offset?: number, fit?: 'cover' | 'contain', color?: string}> = ({
  src,
  offset = 0,
  fit = 'cover',
  color = '#000',
}) => {
  return (
    <AbsoluteFill>
      <div className="flex flex-col items-center justify-center h-full w-full" style={{backgroundColor: color}}>
      <Gif
        src={src}
        width={1080 + Math.abs(offset) * 2}
        height={1920}
        fit={fit}
        style={{
          translate: `${offset}px 0`,
        }}
      />
      </div>
    </AbsoluteFill>
  )
}

const FullScreenEnd: React.FC = () => {
  return (
    <AbsoluteFill className="bg-[#230156]">
      <div className="flex flex-col items-center justify-center h-full w-full">
        <img src={staticFile('logo.png')} className="w-120" />
      </div>
      <div className="absolute bottom-10 right-10 w-240 text-white font-black text-3xl">
        Flow by Moavii | https://www.youtube.com/@MoaviiMusic <br />
        Free To Use | https://freetouse.com/music <br />
        Music promoted by https://www.free-stock-music.com
      </div>
    </AbsoluteFill>
  )
}
