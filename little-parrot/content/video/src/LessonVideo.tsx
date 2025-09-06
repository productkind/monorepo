import {
  AbsoluteFill,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
  Audio,
  staticFile,
  Video,
  spring,
  Img,
  Series,
} from "remotion";
import {Gif} from '@remotion/gif';
import { loadFont as loadSpaceMono } from '@remotion/google-fonts/SpaceMono';
import { loadFont as loadMontserrat } from '@remotion/google-fonts/Lexend';
import './styles.css';
import { PropsWithChildren } from "react";
import { z } from "zod";
import "@rive-app/canvas-single";
import {RemotionRiveCanvas} from "@remotion/rive";

const {fontFamily: spaceMonoFontFamily} = loadSpaceMono();
const {fontFamily: montserratFontFamily} = loadMontserrat();

const DARK_PURPLE = '#230156'
const BG_CLASS = 'bg-[#0e0023]'

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

export const LessonVideo4: React.FC<z.infer<typeof LessonVideoPropsSchema>> = ({captions, titleDuration}) => {
  return (
    <AbsoluteFill className={BG_CLASS}>
      <Series>
        <Series.Sequence durationInFrames={titleDuration}>
          <FullScreenText>
            <TypingText delay={0}>System Prompt</TypingText>
            <br/>
            <TypingText delay={22}>&amp;</TypingText>
            <br/>
            <TypingText delay={24}>Processing Tokens</TypingText>
          </FullScreenText>
        </Series.Sequence>
        <Series.Sequence durationInFrames={160}>
          <FullScreenImage src={staticFile('video-4/section1-cat-type.gif')} fit="contain" />
        </Series.Sequence>
        <Series.Sequence durationInFrames={68}>
          <FullScreenImage src={staticFile('video-4/section2-green-screen.gif')} fit="contain" />
        </Series.Sequence>
        <Series.Sequence durationInFrames={38}>
          <FullScreenImage src={staticFile('video-4/section3-add.gif')} fit="contain" scale={1.6} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={56}>
          <FullScreenImage src={staticFile('video-4/section4-hide.gif')} fit="contain" />
        </Series.Sequence>
        <Series.Sequence durationInFrames={76}>
          <FullScreenImage src={staticFile('video-4/section5-dog-lab.gif')} fit="contain" />
        </Series.Sequence>
        <Series.Sequence durationInFrames={88}>
          <FullScreenImage src={staticFile('video-4/section6-list.gif')} fit="contain" />
        </Series.Sequence>
        <Series.Sequence durationInFrames={840}>
          <AbsoluteFill>
            <RemotionRiveCanvas src={staticFile('video-4/ai-video.riv')} />
          </AbsoluteFill>
        </Series.Sequence>
        <Series.Sequence durationInFrames={165}>
          <FullScreenImage src={staticFile('video-4/section8-sample.gif')} fit="contain" />
        </Series.Sequence>
        <Series.Sequence durationInFrames={96}>
          <FullScreenImage src={staticFile('video-4/section9-different.gif')} fit="contain" color="#ffffff" />
        </Series.Sequence>
        <Series.Sequence durationInFrames={60}>
          <FullScreenImage src={staticFile('video-4/section10-memory.gif')} fit="contain" />
        </Series.Sequence>
        <Series.Sequence durationInFrames={102}>
          <FullScreenImage src={staticFile('video-4/section11-remember.gif')} fit="contain" />
        </Series.Sequence>
        <Series.Sequence durationInFrames={58}>
          <FullScreenImage src={staticFile('video-4/section12-feed.gif')} fit="contain" />
        </Series.Sequence>
        <Series.Sequence durationInFrames={165}>
          <FullScreenImage src={staticFile('video-4/section13-conversation.gif')} fit="contain" />
        </Series.Sequence>
        <Series.Sequence durationInFrames={161}>
          <FullScreenImage src={staticFile('video-4/section14-bundle.gif')} fit="contain" />
        </Series.Sequence>
        <Series.Sequence durationInFrames={207}>
          <FullScreenImage src={staticFile('video-4/section15-look.gif')} fit="contain" color="#000000" />
        </Series.Sequence>
        <Series.Sequence durationInFrames={200}>
          <FullScreenImage src={staticFile('video-4/section16-remember.gif')} fit="contain" />
        </Series.Sequence>
      </Series>
      <Sequence from={titleDuration}>
        <Captions captions={captions} />
      </Sequence>
      <Sequence from={titleDuration}>
        <Audio src={staticFile('video-4/speech.wav')} />
      </Sequence>
    </AbsoluteFill>
  )
}

export const LessonVideo3: React.FC<z.infer<typeof LessonVideoPropsSchema>> = ({captions, titleDuration}) => {
  return (
    <AbsoluteFill className={BG_CLASS}>
      <Series>
        <Series.Sequence durationInFrames={90}>
          <FullScreenImage src={staticFile('video-3/section1.gif')} fit="contain" color="#f9f1e3" />
        </Series.Sequence>
        <Series.Sequence durationInFrames={82}>
          <FullScreenImage src={staticFile('video-3/section2.jpg')} fit="contain" />
        </Series.Sequence>
        <Series.Sequence durationInFrames={91}>
          <FullScreenImage src={staticFile('video-3/section3.gif')} fit="contain" color="#fbbdc6" />
        </Series.Sequence>
        <Series.Sequence durationInFrames={120}>
          <ImageSteps
            allDuration={120}
            images={[
              {image: staticFile('video-3/section4-1.mp4'), delay: 0},
              {image: staticFile('video-3/section4-2.mp4'), delay: 26, offset: -50},
              {image: staticFile('video-3/section4-3.mp4'), delay: 59, offset: -60},
              {image: staticFile('video-3/section4-1.mp4'), delay: 94},
            ]}
          />
        </Series.Sequence>
        <Series.Sequence durationInFrames={93}>
          <FullScreenImage src={staticFile('video-3/section5.gif')} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={90}>
          <FullScreenImage src={staticFile('video-3/section7.gif')} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={40}>
          <FullScreenImage src={staticFile('video-3/section8.gif')} fit="contain" />
        </Series.Sequence>
        <Series.Sequence durationInFrames={50}>
          <FullScreenImage src={staticFile('video-3/section9.gif')} fit="contain" />
        </Series.Sequence>
        <Series.Sequence durationInFrames={50}>
          <FullScreenImage src={staticFile('video-3/section10.gif')} fit="contain" />
        </Series.Sequence>
        <Series.Sequence durationInFrames={86}>
          <FullScreenImage src={staticFile('video-3/section7.gif')} fit="contain" />
        </Series.Sequence>
        <Series.Sequence durationInFrames={74}>
          <FullScreenImage src={staticFile('video-3/section11.gif')} fit="contain" />
        </Series.Sequence>
        <Series.Sequence durationInFrames={52}>
          <FullScreenImage src={staticFile('video-3/section12.gif')} fit="contain" />
        </Series.Sequence>
        <Series.Sequence durationInFrames={68}>
          <FullScreenImage src={staticFile('video-3/section13.gif')} fit="contain" />
        </Series.Sequence>
        <Series.Sequence durationInFrames={165}>
          <FullScreenImage src={staticFile('video-3/section14.gif')} fit="contain" />
        </Series.Sequence>
        <Series.Sequence durationInFrames={86}>
          <FullScreenImage src={staticFile('video-3/section15.gif')} fit="contain" />
        </Series.Sequence>
      </Series>
      <Sequence from={titleDuration}>
        <Captions captions={captions} />
      </Sequence>
      <Sequence from={titleDuration}>
        <Audio src={staticFile('video-3/speech.wav')} />
        <Audio src={staticFile('soundtrack.wav')} volume={0.1} />
      </Sequence>
    </AbsoluteFill>
  )
}

export const LessonVideo2: React.FC<z.infer<typeof LessonVideoPropsSchema>> = ({captions, titleDuration}) => {
  return (
    <AbsoluteFill className={BG_CLASS}>
      <Series>
        <Series.Sequence durationInFrames={titleDuration}>
          <FullScreenText>
            <TypingText delay={0}>Prompting Technique</TypingText>
            <br/>
            <TypingText delay={22}>#1</TypingText>
            <br/>
            <TypingText delay={24}>Tone and Style</TypingText>
          </FullScreenText>
        </Series.Sequence>
        <Series.Sequence durationInFrames={52}>
          <FullScreenImage src={staticFile('video-2/section1.gif')} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={80}>
          <FullScreenImage src={staticFile('video-2/section2.gif')} fit="contain" color="#f6adcd" />
        </Series.Sequence>
        <Series.Sequence durationInFrames={76}>
          <FullScreenImage src={staticFile('video-2/section3.gif')} fit="contain" color="#fcedc4" />
        </Series.Sequence>
        <Series.Sequence durationInFrames={66}>
          <FullScreenImage src={staticFile('video-2/section4.gif')} fit="contain" color="#fefefe" />
        </Series.Sequence>
        <Series.Sequence durationInFrames={116}>
          <FullScreenImage src={staticFile('video-2/section5.gif')} fit="contain" />
        </Series.Sequence>
      </Series>
      <Sequence from={titleDuration}>
        <Captions captions={captions} />
      </Sequence>
      <Sequence from={titleDuration}>
        <Audio src={staticFile('video-2/speech.wav')} />
      </Sequence>
    </AbsoluteFill>
  )
}



export const LessonVideo: React.FC<z.infer<typeof LessonVideoPropsSchema>> = ({captions, titleDuration}) => {
  return (
    <AbsoluteFill className={BG_CLASS}>
      <Series>
        <Series.Sequence durationInFrames={titleDuration}>
          <FullScreenText>
            <TypingText delay={0}>Artificial Intelligence</TypingText>
            <br/>
            <TypingText delay={22}>&amp;</TypingText>
            <br/>
            <TypingText delay={24}>AI Models</TypingText>
          </FullScreenText>
        </Series.Sequence>
        <Series.Sequence durationInFrames={262}>
          <FullScreenImage src={staticFile('video-1/section1.gif')} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={205}>
          <ImageSteps
            allDuration={236}
            images={[
              {image: staticFile('video-1/section2.mp4'), delay: 0},
              {image: staticFile('video-1/section2-2.mp4'), delay: 86, offset: -100},
              {image: staticFile('video-1/section2-3.mp4'), delay: 128},
              {image: staticFile('video-1/section2-4.mp4'), delay: 172, offset: -150},
            ]}
          />
        </Series.Sequence>
        <Series.Sequence durationInFrames={246}>
          <FullScreenImage src={staticFile('video-1/section3.gif')} offset={-500} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={200}>
          <ImageSteps
            allDuration={230}
            images={[
              {image: staticFile('video-1/section4.mp4'), delay: 0},
              {image: staticFile('video-1/section4-2.mp4'), delay: 82},
              {image: staticFile('video-1/section4-3.mp4'), delay: 151, offset: -320},
            ]}
          />
        </Series.Sequence>
        <Series.Sequence durationInFrames={214}>
          <ImageSteps
            allDuration={214}
            images={[
              {image: staticFile('video-1/section5.jpg'), delay: 0},
              {image: staticFile('video-1/section5-2.jpg'), delay: 100},
            ]}
          />
        </Series.Sequence>
        <Series.Sequence durationInFrames={270}>
          <FullScreenImage src={staticFile('video-1/section6.gif')} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={80}>
          <FullScreenImage src={staticFile('video-1/section7.gif')} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={114}>
          <FullScreenImage src={staticFile('video-1/section8.gif')} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={86}>
          <FullScreenImage src={staticFile('video-1/section9.gif')} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={174}>
          <ImageSteps
            allDuration={174}
            images={[
              {image: staticFile('video-1/section10.mp4'), delay: 0},
              {image: staticFile('video-1/section10-2.mp4'), delay: 75, offset: -250},
              {image: staticFile('video-1/section10-3.mp4'), delay: 111, offset: -100},
            ]}
          />
        </Series.Sequence>
        <Series.Sequence durationInFrames={110}>
          <FullScreenImage src={staticFile('video-1/section11.gif')} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={178}>
          <ImageSteps
            allDuration={178}
            images={[
              {image: staticFile('video-1/section12.mp4'), delay: 0, offset: -250},
              {image: staticFile('video-1/section12-2.mp4'), delay: 70, offset: -100},
              {image: staticFile('video-1/section12-3.mp4'), delay: 92, offset: -240},
              {image: staticFile('video-1/section12-4.mp4'), delay: 118},
            ]}
          />
        </Series.Sequence>
        <Series.Sequence durationInFrames={88}>
          <FullScreenImage src={staticFile('video-1/section6.gif')} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={65}>
          <FullScreenImage src={staticFile('video-1/section14.gif')} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={61}>
          <FullScreenImage src={staticFile('video-1/section15.gif')} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={96}>
          <FullScreenImage src={staticFile('video-1/section16.gif')} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={238}>
          <ImageSteps
            allDuration={238}
            images={[
              {image: staticFile('video-1/section17.mp4'), delay: 0, offset: -160},
              {image: staticFile('video-1/section17-2.mp4'), delay: 77, offset: -20},
              {image: staticFile('video-1/section17-3.mp4'), delay: 128, offset: -420},
              {image: staticFile('video-1/section17-4.mp4'), delay: 175, offset: -200},
            ]}
          />
        </Series.Sequence>
      </Series>
      <Sequence from={titleDuration}>
        <Captions captions={captions} />
      </Sequence>
      <Sequence from={titleDuration}>
        <Audio src={staticFile('video-1/speech.wav')} />
      </Sequence>
    </AbsoluteFill>
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
                color: DARK_PURPLE,
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
    <AbsoluteFill className={BG_CLASS} style={{
      fontFamily: spaceMonoFontFamily,
    }}>
          {images.map(({delay}, index) => {
            const height = 1920 / images.length
            const durationLeft = allDuration - delay
            console.log({delay, durationLeft})
            return (
              <Sequence from={delay} durationInFrames={durationLeft} key={index}>
                <div className="flex flex-col items-center justify-center h-full w-full">
                  {
                    images.map(({image, offset = 0, scale = 1, delay: delayIn}, i) => {
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
                              <Img src={image} width={1080} style={{
                                translate: `0 ${offset}px`,
                                scale,
                                opacity: delayIn > delay ? 0 : 1,
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
      <Img src={staticFile('logo.png')} className="absolute top-10 left-10 w-60" />
      <div className="flex flex-col items-center justify-center h-full w-full">
        <div className="font-black text-9xl text-center w-full" style={{
          color: DARK_PURPLE,
        }}>
          {children}
        </div>
      </div>
      <Img src={staticFile('parrot.png')} className="absolute bottom-10 right-10 w-240" style={{
        rotate: `${rotation}deg`,
        transformOrigin: 'bottom',
        translate: `${translate}px 0`,
        scale: '-1 1',
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

const FullScreenImage: React.FC<{src: string, offset?: number, fit?: 'cover' | 'contain', color?: string, scale?: number}> = ({
  src,
  offset = 0,
  fit = 'cover',
  color = '#0e0023',
  scale = 1,
}) => {
  const isGif = src.endsWith('.gif')
  return (
    <AbsoluteFill>
      <div className="flex flex-col items-center justify-center h-full w-full" style={{backgroundColor: color}}>
        {
          isGif ?
            <Gif
              src={src}
              width={1080 + Math.abs(offset) * 2}
              height={1920}
              fit={fit}
              style={{
                translate: `${offset}px 0`,
                scale: String(scale),
              }}
            />
          :
            <Img
              src={src}
              width={1080 + Math.abs(offset) * 2}
              style={{
                translate: `${offset}px 0`,
                objectFit: fit,
                height: 1920,
              }}
            />
        }
      </div>
    </AbsoluteFill>
  )
}

const FullScreenEnd: React.FC = () => {
  return (
    <AbsoluteFill className="bg-[#230156]">
      <div className="flex flex-col items-center justify-center h-full w-full">
        <Img src={staticFile('logo.png')} className="w-120" />
      </div>
      <div className="absolute bottom-10 right-10 w-240 text-white font-black text-3xl">
        Flow by Moavii | https://www.youtube.com/@MoaviiMusic <br />
        Free To Use | https://freetouse.com/music <br />
        Music promoted by https://www.free-stock-music.com
      </div>
    </AbsoluteFill>
  )
}
