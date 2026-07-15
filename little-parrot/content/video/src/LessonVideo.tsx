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
  interpolate,
  Easing,
} from "remotion";
import { Gif } from '@remotion/gif';
import { loadFont as loadSpaceMono } from '@remotion/google-fonts/SpaceMono';
import { loadFont as loadMontserrat } from '@remotion/google-fonts/Lexend';
import { loadFont as loadInter } from '@remotion/google-fonts/Inter';
import './styles.css';
import { PropsWithChildren } from "react";
import { z } from "zod";
import "@rive-app/canvas-single";
import { RemotionRiveCanvas } from "@remotion/rive";

const { fontFamily: spaceMonoFontFamily } = loadSpaceMono();
const { fontFamily: montserratFontFamily } = loadMontserrat();
const { fontFamily: interFontFamily } = loadInter();

const DARK_PURPLE = '#1a0044'
const BLACK = '#080809'
const BG_CLASS = 'bg-[#1a0044]'
const CURRENT_TEXT_COLOR = '#ffb65b'

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

const DEBUG = true

export const SocialVideo015: React.FC<z.infer<typeof LessonVideoPropsSchema>> = ({ captions, titleDuration }) => {
  return (
    <AbsoluteFill className={BG_CLASS}>
      <Series>
        <Series.Sequence durationInFrames={108}>
          <FullScreenImage src={staticFile('social-015/section-00-scifi.gif')} fit="contain" offset={-200} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={28}>
          <FullScreenImage src={staticFile('social-015/section-01-hal.gif')} fit="contain" offset={-150} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={24}>
          <FullScreenImage src={staticFile('social-015/section-02-skynet.gif')} fit="contain" offset={-150} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={38}>
          <FullScreenImage src={staticFile('social-015/section-03-c3po.gif')} fit="contain" offset={-100} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={64}>
          <FullScreenImage src={staticFile('social-015/section-04-enterprise.gif')} fit="contain" offset={-220} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={113}>
          <FullScreenImage src={staticFile('social-015/section-05-precise.gif')} fit="contain" offset={-150} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={50}>
          <FullScreenImage src={staticFile('social-015/section-06-rambling.gif')} fit="contain" offset={-100} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={69}>
          <FullScreenImage src={staticFile('social-015/section-07-opposite.gif')} fit="contain" offset={-150} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={223}>
          <FullScreenImage src={staticFile('social-015/section-08-babbling.gif')} fit="contain" offset={-150} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={68}>
          <FullScreenImage src={staticFile('social-015/section-09-slop.gif')} fit="contain" offset={-150} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={143}>
          <FullScreenImage src={staticFile('social-015/section-10-60s.gif')} fit="contain" offset={-150} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={155}>
          <FullScreenImage src={staticFile('social-015/section-11-list.gif')} fit="contain" offset={-150} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={137}>
          <FullScreenImage src={staticFile('social-015/section-12-machine.gif')} fit="contain" offset={-150} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={61}>
          <FullScreenImage src={staticFile('social-015/section-13-nope.gif')} fit="contain" offset={-150} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={164}>
          <FullScreenImage src={staticFile('social-015/section-14-pattern.gif')} fit="contain" offset={-220} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={86}>
          <FullScreenImage src={staticFile('social-015/section-15-read.gif')} fit="contain" offset={-150} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={113}>
          <FullScreenImage src={staticFile('social-015/section-16-fluffy.gif')} fit="contain" offset={0} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={177}>
          <FullScreenImage src={staticFile('social-015/section-17-strange.gif')} fit="contain" offset={-150} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={67}>
          <FullScreenImage src={staticFile('social-015/section-18-built.gif')} fit="contain" offset={-150} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={618}>
          <FullScreenImage src={staticFile('social-015/section-19-row.gif')} fit="contain" offset={-150} />
        </Series.Sequence>
      </Series>
      <Sequence from={titleDuration}>
        <Captions captions={captions} />
      </Sequence>
      <Sequence from={titleDuration}>
        <Audio src={staticFile('social-015/speech.wav')} />
        <Audio src={staticFile('soundtrack.wav')} volume={0.1} />
        <RemotionRiveCanvas src={staticFile('parrot-greet-00.riv')} />
      </Sequence>
      <Sequence from={titleDuration + 3000}>
        <RemotionRiveCanvas src={staticFile('parrot-follow-00.riv')} />
      </Sequence>
      <Sequence from={titleDuration + 500}>
        <RemotionRiveCanvas src={staticFile('parrot-peek-00.riv')} />
      </Sequence>
      <AbsoluteFill className="border-16 border-[#000000] z-10">
      </AbsoluteFill>
      {DEBUG ? <DebugSafeZone /> : null
      }
    </AbsoluteFill>
  )
}



export const SocialVideo014: React.FC<z.infer<typeof LessonVideoPropsSchema>> = ({ captions, titleDuration }) => {
  return (
    <AbsoluteFill className={BG_CLASS}>
      <Series>
        <Series.Sequence durationInFrames={83}>
          <FullScreenImage src={staticFile('video-3/section1.gif')} fit="contain" color="#f9f1e3" />
        </Series.Sequence>
        <Series.Sequence durationInFrames={92}>
          <FullScreenImage src={staticFile('video-3/section2.jpg')} fit="contain" offset={-150} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={75}>
          <FullScreenImage src={staticFile('video-3/section3.gif')} fit="contain" color="#fbbdc6" />
        </Series.Sequence>
        <Series.Sequence durationInFrames={83}>
          <ImageSteps
            allDuration={83}
            images={[
              { image: staticFile('video-3/section4-1.mp4'), delay: 0 },
              { image: staticFile('video-3/section4-2.mp4'), delay: 19, offset: -50 },
              { image: staticFile('video-3/section4-3.mp4'), delay: 38, offset: -60 },
              { image: staticFile('video-3/section4-1.mp4'), delay: 60 },
            ]}
          />
        </Series.Sequence>
        <Series.Sequence durationInFrames={74}>
          <FullScreenImage src={staticFile('social-014/section-05-training.gif')} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={99}>
          <FullScreenImage src={staticFile('video-3/section7.gif')} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={35}>
          <FullScreenImage src={staticFile('video-3/section8.gif')} offset={-150} fit="contain" />
        </Series.Sequence>
        <Series.Sequence durationInFrames={44}>
          <FullScreenImage src={staticFile('video-3/section9.gif')} offset={-150} fit="contain" />
        </Series.Sequence>
        <Series.Sequence durationInFrames={54}>
          <FullScreenImage src={staticFile('video-3/section10.gif')} offset={-150} fit="contain" />
        </Series.Sequence>
        <Series.Sequence durationInFrames={65}>
          <FullScreenImage src={staticFile('video-3/section7.gif')} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={58}>
          <FullScreenImage src={staticFile('video-3/section11.gif')} offset={-100} fit="contain" />
        </Series.Sequence>
        <Series.Sequence durationInFrames={40}>
          <FullScreenImage src={staticFile('video-3/section12.gif')} offset={-150} fit="contain" />
        </Series.Sequence>
        <Series.Sequence durationInFrames={76}>
          <FullScreenImage src={staticFile('video-3/section13.gif')} offset={-150} fit="contain" />
        </Series.Sequence>
        <Series.Sequence durationInFrames={142}>
          <FullScreenImage src={staticFile('video-3/section14.gif')} offset={-150} fit="contain" />
        </Series.Sequence>
        <Series.Sequence durationInFrames={186}>
          <FullScreenImage src={staticFile('video-3/section15.gif')} offset={-150} fit="contain" />
        </Series.Sequence>
      </Series>
      <Sequence from={titleDuration}>
        <Captions captions={captions} />
      </Sequence>
      <Sequence from={titleDuration}>
        <Audio src={staticFile('social-014/speech.wav')} />
        <Audio src={staticFile('soundtrack.wav')} volume={0.1} />
        <RemotionRiveCanvas src={staticFile('parrot-greet-00.riv')} />
      </Sequence>
      <Sequence from={titleDuration + 3000}>
        <RemotionRiveCanvas src={staticFile('parrot-follow-00.riv')} />
      </Sequence>
      <Sequence from={titleDuration + 500}>
        <RemotionRiveCanvas src={staticFile('parrot-peek-00.riv')} />
      </Sequence>
      <AbsoluteFill className="border-16 border-[#000000] z-10">
      </AbsoluteFill>
      {DEBUG ? <DebugSafeZone /> : null
      }
    </AbsoluteFill>
  )
}

export const SocialVideo013: React.FC<z.infer<typeof LessonVideoPropsSchema>> = ({ captions, titleDuration }) => {
  return (
    <AbsoluteFill className={BG_CLASS}>
      <Series>
        <Series.Sequence durationInFrames={120}>
          <FullScreenImage src={staticFile('social-013/section-00-sorry.gif')} fit="contain" offset={-200} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={84}>
          <FullScreenImage src={staticFile('social-013/section-01-simple.gif')} fit="contain" offset={-150} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={120}>
          <FullScreenImage src={staticFile('social-013/section-02-autocomplete.gif')} fit="contain" offset={-150} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={92}>
          <FullScreenImage src={staticFile('social-013/section-03-predict.gif')} fit="contain" offset={-100} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={121}>
          <FullScreenImage src={staticFile('social-013/section-04-wrong.gif')} fit="contain" offset={-220} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={82}>
          <FullScreenImage src={staticFile('social-013/section-05-research.gif')} fit="contain" offset={-150} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={84}>
          <FullScreenImage src={staticFile('social-013/section-06-human.gif')} fit="contain" color="#000000" offset={-100} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={280}>
          <FullScreenImage src={staticFile('social-013/section-07-art.gif')} fit="contain" color="#000000" offset={-150} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={70}>
          <FullScreenImage src={staticFile('social-013/section-08-dont-know.gif')} fit="contain" offset={-150} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={183}>
          <FullScreenImage src={staticFile('social-013/section-09-forgot.gif')} fit="contain" offset={0} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={162}>
          <FullScreenImage src={staticFile('social-013/section-10-sorry.gif')} fit="contain" offset={-150} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={132}>
          <FullScreenImage src={staticFile('social-013/section-11-stop.gif')} fit="contain" offset={-150} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={93}>
          <FullScreenImage src={staticFile('social-013/section-12-predict.gif')} fit="contain" offset={-150} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={616}>
          <FullScreenImage src={staticFile('social-013/section-13-calm.gif')} fit="contain" offset={-150} />
        </Series.Sequence>
      </Series>
      <Sequence from={titleDuration}>
        <Captions captions={captions} />
      </Sequence>
      <Sequence from={titleDuration}>
        <Audio src={staticFile('social-013/speech.wav')} />
        <Audio src={staticFile('soundtrack.wav')} volume={0.1} />
        <RemotionRiveCanvas src={staticFile('parrot-greet-00.riv')} />
      </Sequence>
      <Sequence from={titleDuration + 3000}>
        <RemotionRiveCanvas src={staticFile('parrot-follow-00.riv')} />
      </Sequence>
      <Sequence from={titleDuration + 500}>
        <RemotionRiveCanvas src={staticFile('parrot-peek-00.riv')} />
      </Sequence>
      <AbsoluteFill className="border-16 border-[#000000] z-10">
      </AbsoluteFill>
      {DEBUG ? <DebugSafeZone /> : null
      }
    </AbsoluteFill>
  )
}



/* NOT READY */
export const SocialVideo012: React.FC<z.infer<typeof LessonVideoPropsSchema>> = ({ captions, titleDuration }) => {
  return (
    <AbsoluteFill className={BG_CLASS}>
      <Series>
        <Series.Sequence durationInFrames={100}>
          <FullScreenImage src={staticFile('social-012/section-00-brain.gif')} fit="contain" offset={-200} color="#FDE2FE" />
        </Series.Sequence>
        <Series.Sequence durationInFrames={71}>
          <FullScreenImage src={staticFile('social-012/section-01-basic.gif')} fit="contain" offset={-150} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={357}>
          <FullScreenImage src={staticFile('social-012/section-02-brain.gif')} fit="contain" offset={-150} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={996}>
          <RemotionRiveCanvas src={staticFile('social-012/neurons.riv')} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={133}>
          <FullScreenImage src={staticFile('social-012/section-04-bigger.gif')} fit="contain" offset={-120} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={139}>
          <FullScreenImage src={staticFile('social-012/section-05-follow.gif')} fit="contain" offset={0} />
        </Series.Sequence>
      </Series>
      <Sequence from={titleDuration}>
        <Captions captions={captions} />
      </Sequence>
      <Sequence from={titleDuration}>
        <Audio src={staticFile('social-012/speech.wav')} />
        <Audio src={staticFile('soundtrack.wav')} volume={0.1} />
        <RemotionRiveCanvas src={staticFile('parrot-greet-00.riv')} />
      </Sequence>
      <Sequence from={titleDuration + 3000}>
        <RemotionRiveCanvas src={staticFile('parrot-follow-00.riv')} />
      </Sequence>
      <Sequence from={titleDuration + 500}>
        <RemotionRiveCanvas src={staticFile('parrot-peek-00.riv')} />
      </Sequence>
      <AbsoluteFill className="border-16 border-[#000000] z-10">
      </AbsoluteFill>
      {DEBUG ? <DebugSafeZone /> : null
      }
    </AbsoluteFill>
  )
}




export const SocialVideo011: React.FC<z.infer<typeof LessonVideoPropsSchema>> = ({ captions, titleDuration }) => {
  return (
    <AbsoluteFill className={BG_CLASS}>
      <Series>
        <Series.Sequence durationInFrames={66}>
          <FullScreenImage src={staticFile('social-011/section-00-training.gif')} fit="contain" offset={-200} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={158}>
          <FullScreenImage src={staticFile('social-011/section-01-lot.gif')} fit="contain" offset={-150} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={110}>
          <FullScreenImage src={staticFile('social-011/section-02-library.gif')} fit="contain" offset={-150} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={25}>
          <FullScreenImage src={staticFile('social-011/section-03-website.gif')} fit="contain" offset={-100} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={16}>
          <FullScreenImage src={staticFile('social-011/section-04-code.gif')} fit="contain" offset={-120} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={39}>
          <FullScreenImage src={staticFile('social-011/section-05-reddit.gif')} fit="contain" offset={-150} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={20}>
          <FullScreenImage src={staticFile('social-011/section-06-wikipedia.gif')} fit="contain" offset={-100} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={36}>
          <FullScreenImage src={staticFile('social-011/section-07-review.gif')} fit="contain" offset={-150} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={40}>
          <FullScreenImage src={staticFile('social-011/section-08-script.gif')} fit="contain" offset={-150} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={160}>
          <FullScreenImage src={staticFile('social-011/section-09-variety.gif')} fit="contain" offset={0} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={142}>
          <FullScreenImage src={staticFile('social-011/section-10-feed.gif')} fit="contain" offset={-150} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={54}>
          <FullScreenImage src={staticFile('social-011/section-11-clean.gif')} fit="contain" offset={-150} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={74}>
          <FullScreenImage src={staticFile('social-011/section-13-clean.gif')} fit="contain" offset={-150} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={54}>
          <FullScreenImage src={staticFile('social-011/section-12-clean.gif')} fit="contain" offset={-150} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={66}>
          <FullScreenImage src={staticFile('social-011/section-14-clean.gif')} fit="contain" offset={-150} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={131}>
          <FullScreenImage src={staticFile('social-011/section-15-nope.gif')} fit="contain" offset={-150} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={65}>
          <FullScreenImage src={staticFile('social-011/section-16-buy.gif')} fit="contain" offset={-100} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={131}>
          <FullScreenImage src={staticFile('social-011/section-17-hoover.gif')} fit="contain" offset={-150} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={26}>
          <FullScreenImage src={staticFile('social-011/section-18-clean.gif')} fit="contain" offset={-150} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={37}>
          <FullScreenImage src={staticFile('social-011/section-19-package.gif')} fit="contain" offset={0} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={92}>
          <FullScreenImage src={staticFile('social-011/section-20-sale.gif')} fit="contain" offset={-150} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={135}>
          <FullScreenImage src={staticFile('social-011/section-21-invisible.gif')} fit="contain" offset={-150} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={174}>
          <FullScreenImage src={staticFile('social-011/section-22-follow.gif')} fit="contain" offset={-150} />
        </Series.Sequence>
      </Series>
      <Sequence from={titleDuration}>
        <Captions captions={captions} />
      </Sequence>
      <Sequence from={titleDuration}>
        <Audio src={staticFile('social-011/speech.wav')} />
        <Audio src={staticFile('soundtrack.wav')} volume={0.1} />
        <RemotionRiveCanvas src={staticFile('parrot-greet-00.riv')} />
      </Sequence>
      <Sequence from={titleDuration + 3000}>
        <RemotionRiveCanvas src={staticFile('parrot-follow-00.riv')} />
      </Sequence>
      <Sequence from={titleDuration + 500}>
        <RemotionRiveCanvas src={staticFile('parrot-peek-00.riv')} />
      </Sequence>
      <AbsoluteFill className="border-16 border-[#000000] z-10">
      </AbsoluteFill>
      {DEBUG ? <DebugSafeZone /> : null
      }
    </AbsoluteFill>
  )
}


export const SocialVideo010: React.FC<z.infer<typeof LessonVideoPropsSchema>> = ({ captions, titleDuration }) => {
  return (
    <AbsoluteFill className={BG_CLASS}>
      <Series>
        <Series.Sequence durationInFrames={128}>
          <FullScreenImage src={staticFile('social-010/section-00-hidden.gif')} fit="contain" offset={-200} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={67}>
          <FullScreenImage src={staticFile('social-010/section-01-secret.gif')} fit="contain" offset={-150} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={116}>
          <FullScreenImage src={staticFile('social-010/section-02-anthropic.gif')} fit="contain" offset={-150} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={315}>
          <FullScreenImage src={staticFile('social-010/section-03-system-prompt.gif')} fit="contain" offset={-220} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={138}>
          <FullScreenImage src={staticFile('social-010/section-04-avoid.gif')} fit="contain" offset={-120} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={128}>
          <FullScreenImage src={staticFile('social-010/section-05-decline.gif')} fit="contain" />
        </Series.Sequence>
        <Series.Sequence durationInFrames={84}>
          <FullScreenImage src={staticFile('social-010/section-06-pillow.gif')} fit="contain" offset={-100} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={220}>
          <FullScreenImage src={staticFile('social-010/section-07-attach.gif')} fit="contain" offset={-150} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={215}>
          <FullScreenImage src={staticFile('social-010/section-08-job.gif')} fit="contain" offset={-150} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={190}>
          <FullScreenImage src={staticFile('social-010/section-09-behave.gif')} fit="contain" offset={0} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={175}>
          <FullScreenImage src={staticFile('social-010/section-10-follow.gif')} fit="contain" offset={-150} />
        </Series.Sequence>
      </Series>
      <Sequence from={titleDuration}>
        <Captions captions={captions} />
      </Sequence>
      <Sequence from={titleDuration}>
        <Audio src={staticFile('social-010/speech.wav')} />
        <Audio src={staticFile('soundtrack.wav')} volume={0.1} />
        <RemotionRiveCanvas src={staticFile('parrot-greet-00.riv')} />
      </Sequence>
      <Sequence from={titleDuration + 3000}>
        <RemotionRiveCanvas src={staticFile('parrot-follow-00.riv')} />
      </Sequence>
      <Sequence from={titleDuration + 500}>
        <RemotionRiveCanvas src={staticFile('parrot-peek-00.riv')} />
      </Sequence>
      <AbsoluteFill className="border-16 border-[#000000] z-10">
      </AbsoluteFill>
      {DEBUG ? <DebugSafeZone /> : null
      }
    </AbsoluteFill>
  )
}

export const SocialVideo009: React.FC<z.infer<typeof LessonVideoPropsSchema>> = ({ captions, titleDuration }) => {
  return (
    <AbsoluteFill className={BG_CLASS}>
      <Series>
        <Series.Sequence durationInFrames={81}>
          <FullScreenImage src={staticFile('social-009/section-00-two.gif')} fit="contain" offset={-100} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={130}>
          <FullScreenImage src={staticFile('social-009/section-01-forget.gif')} fit="contain" offset={-150} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={164}>
          <FullScreenImage src={staticFile('social-009/section-02-letter.gif')} fit="contain" offset={-150} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={159}>
          <FullScreenImage src={staticFile('social-009/section-03-file.gif')} fit="contain" offset={-100} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={219}>
          <FullScreenImage src={staticFile('social-009/section-04-focus.gif')} fit="contain" offset={-120} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={91}>
          <FullScreenImage src={staticFile('social-009/section-05-slip.gif')} fit="contain" />
        </Series.Sequence>
        <Series.Sequence durationInFrames={128}>
          <FullScreenImage src={staticFile('social-009/section-06-long-text.gif')} fit="contain" offset={-100} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={115}>
          <FullScreenImage src={staticFile('social-009/section-07-different.gif')} fit="contain" offset={-150} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={179}>
          <FullScreenImage src={staticFile('social-009/section-08-future.gif')} fit="contain" offset={-150} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={80}>
          <FullScreenImage src={staticFile('social-009/section-09-choose.gif')} fit="contain" offset={-100} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={148}>
          <FullScreenImage src={staticFile('social-009/section-10-random.gif')} fit="contain" offset={-150} color="#ffffff" />
        </Series.Sequence>
        <Series.Sequence durationInFrames={140}>
          <FullScreenImage src={staticFile('social-009/section-11-forgot.gif')} fit="contain" offset={0} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={126}>
          <FullScreenImage src={staticFile('social-009/section-12-dice.gif')} fit="contain" offset={-200} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={151}>
          <FullScreenImage src={staticFile('social-009/section-13-complicated.gif')} fit="contain" offset={-200} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={164}>
          <FullScreenImage src={staticFile('social-009/section-14-follow.gif')} fit="contain" offset={-100} />
        </Series.Sequence>
      </Series>
      <Sequence from={titleDuration}>
        <Captions captions={captions} />
      </Sequence>
      <Sequence from={titleDuration}>
        <Audio src={staticFile('social-009/speech.wav')} />
        <Audio src={staticFile('soundtrack.wav')} volume={0.1} />
        <RemotionRiveCanvas src={staticFile('parrot-greet-00.riv')} />
      </Sequence>
      <Sequence from={titleDuration + 3000}>
        <RemotionRiveCanvas src={staticFile('parrot-follow-00.riv')} />
      </Sequence>
      <Sequence from={titleDuration + 500}>
        <RemotionRiveCanvas src={staticFile('parrot-peek-00.riv')} />
      </Sequence>
      <AbsoluteFill className="border-16 border-[#000000] z-10">
      </AbsoluteFill>
      {DEBUG ? <DebugSafeZone /> : null
      }
    </AbsoluteFill>
  )
}


export const SocialVideo008: React.FC<z.infer<typeof LessonVideoPropsSchema>> = ({ captions, titleDuration }) => {
  return (
    <AbsoluteFill className={BG_CLASS}>
      <Series>
        <Series.Sequence durationInFrames={91}>
          <FullScreenImage src={staticFile('social-008/section-00-type.gif')} fit="contain" offset={-100} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={65}>
          <FullScreenImage src={staticFile('social-008/section-01-see.gif')} fit="contain" offset={-150} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={124}>
          <FullScreenImage src={staticFile('social-008/section-02-hidden.gif')} fit="contain" offset={-150} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={99}>
          <FullScreenImage src={staticFile('social-008/section-03-hidden.gif')} fit="contain" offset={-100} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={91}>
          <FullScreenImage src={staticFile('social-008/section-04-scientist.gif')} fit="contain" offset={-120} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={103}>
          <FullScreenImage src={staticFile('social-008/section-05-rules.gif')} fit="contain" />
        </Series.Sequence>
        <Series.Sequence durationInFrames={40}>
          <FullScreenImage src={staticFile('social-008/section-06-polite.gif')} fit="contain" offset={-100} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={60}>
          <FullScreenImage src={staticFile('social-008/section-07-swerve.gif')} fit="contain" offset={-150} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={36}>
          <FullScreenImage src={staticFile('social-008/section-08-tone.gif')} fit="contain" offset={-150} color="#ffffff" />
        </Series.Sequence>
        <Series.Sequence durationInFrames={34}>
          <FullScreenImage src={staticFile('social-008/section-09-disagree.gif')} fit="contain" offset={-260} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={48}>
          <FullScreenImage src={staticFile('social-008/section-10-disclaimer.gif')} fit="contain" offset={-150} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={123}>
          <FullScreenImage src={staticFile('social-008/section-11-equal.gif')} fit="contain" offset={-150} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={164}>
          <FullScreenImage src={staticFile('social-008/section-12-factory.gif')} fit="contain" offset={-100} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={141}>
          <FullScreenImage src={staticFile('social-008/section-13-see.gif')} fit="contain" offset={0} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={141}>
          <FullScreenImage src={staticFile('social-008/section-14-more.gif')} fit="contain" offset={-100} />
        </Series.Sequence>
      </Series>
      <Sequence from={titleDuration}>
        <Captions captions={captions} />
      </Sequence>
      <Sequence from={titleDuration}>
        <Audio src={staticFile('social-008/speech.wav')} />
        <Audio src={staticFile('soundtrack.wav')} volume={0.1} />
        <RemotionRiveCanvas src={staticFile('parrot-greet-00.riv')} />
      </Sequence>
      <Sequence from={titleDuration + 1260}>
        <RemotionRiveCanvas src={staticFile('parrot-follow-00.riv')} />
      </Sequence>
      <Sequence from={titleDuration + 500}>
        <RemotionRiveCanvas src={staticFile('parrot-peek-00.riv')} />
      </Sequence>
      <AbsoluteFill className="border-16 border-[#000000] z-10">
      </AbsoluteFill>
      {DEBUG ? <DebugSafeZone /> : null
      }
    </AbsoluteFill>
  )
}


export const SocialVideo007: React.FC<z.infer<typeof LessonVideoPropsSchema>> = ({ captions, titleDuration }) => {
  return (
    <AbsoluteFill className={BG_CLASS}>
      <Series>
        <Series.Sequence durationInFrames={101}>
          <FullScreenImage src={staticFile('social-007/section-00-conveyor.gif')} fit="contain" />
        </Series.Sequence>
        <Series.Sequence durationInFrames={811}>
          <RemotionRiveCanvas src={staticFile('social-007/ai-video.riv')} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={71}>
          <FullScreenImage src={staticFile('social-007/section-02-plan.gif')} fit="contain" offset={-150} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={74}>
          <FullScreenImage src={staticFile('social-007/section-03-dont-know.gif')} fit="contain" offset={-100} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={63}>
          <FullScreenImage src={staticFile('social-007/section-04-dont-know.gif')} fit="contain" offset={-120} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={106}>
          <FullScreenImage src={staticFile('social-007/section-05-guess.gif')} fit="contain" />
        </Series.Sequence>
        <Series.Sequence durationInFrames={79}>
          <FullScreenImage src={staticFile('social-007/section-06-good.gif')} fit="contain" offset={-100} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={97}>
          <FullScreenImage src={staticFile('social-007/section-07-training.gif')} fit="contain" offset={-150} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={52}>
          <FullScreenImage src={staticFile('social-007/section-08-more.gif')} fit="contain" offset={-150} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={62}>
          <FullScreenImage src={staticFile('social-007/section-09-see.gif')} fit="contain" offset={-100} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={175}>
          <FullScreenImage src={staticFile('social-007/section-10-miss.gif')} fit="contain" offset={-270} />
        </Series.Sequence>
      </Series>
      <Sequence from={titleDuration}>
        <Captions captions={captions} />
      </Sequence>
      <Sequence from={titleDuration}>
        <Audio src={staticFile('social-007/speech.wav')} />
        <Audio src={staticFile('soundtrack.wav')} volume={0.1} />
        <RemotionRiveCanvas src={staticFile('parrot-greet-00.riv')} />
      </Sequence>
      <Sequence from={titleDuration + 3000}>
        <RemotionRiveCanvas src={staticFile('parrot-follow-00.riv')} />
      </Sequence>
      <Sequence from={titleDuration + 500}>
        <RemotionRiveCanvas src={staticFile('parrot-peek-00.riv')} />
      </Sequence>
      <AbsoluteFill className="border-16 border-[#000000] z-10">
      </AbsoluteFill>
      {DEBUG ? <DebugSafeZone /> : null
      }
    </AbsoluteFill>
  )
}


export const SocialVideo006: React.FC<z.infer<typeof LessonVideoPropsSchema>> = ({ captions, titleDuration }) => {
  return (
    <AbsoluteFill className={BG_CLASS}>
      <Series>
        <Series.Sequence durationInFrames={74}>
          <FullScreenImage src={staticFile('social-006/section-00-send.gif')} fit="contain" offset={-100} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={76}>
          <FullScreenImage src={staticFile('social-006/section-01-see.gif')} fit="contain" offset={-150} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={99}>
          <FullScreenImage src={staticFile('social-006/section-02-symbol.gif')} fit="contain" offset={-150} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={50}>
          <FullScreenImage src={staticFile('social-006/section-03-words.gif')} fit="contain" offset={-100} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={64}>
          <FullScreenImage src={staticFile('social-006/section-04-word.gif')} fit="contain" offset={-120} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={61}>
          <FullScreenImage src={staticFile('social-006/section-05-scrabble.gif')} fit="contain" />
        </Series.Sequence>
        <Series.Sequence durationInFrames={119}>
          <FullScreenImage src={staticFile('social-006/section-06-hello.gif')} fit="contain" offset={-100} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={155}>
          <FullScreenImage src={staticFile('social-006/section-07-hippo.gif')} fit="contain" offset={-150} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={121}>
          <FullScreenImage src={staticFile('social-006/section-08-punctuation.gif')} fit="contain" offset={-150} color="#ffffff" />
        </Series.Sequence>
        <Series.Sequence durationInFrames={78}>
          <FullScreenImage src={staticFile('social-006/section-09-chop.gif')} fit="contain" offset={-100} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={94}>
          <FullScreenImage src={staticFile('social-006/section-10-numbers.gif')} fit="contain" offset={-150} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={128}>
          <FullScreenImage src={staticFile('social-006/section-11-files.gif')} fit="contain" offset={-150} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={169}>
          <FullScreenImage src={staticFile('social-006/section-12-splitting.gif')} fit="contain" offset={-100} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={193}>
          <FullScreenImage src={staticFile('social-006/section-13-price.png')} fit="contain" offset={-200} color="#000000" />
        </Series.Sequence>
        <Series.Sequence durationInFrames={62}>
          <FullScreenImage src={staticFile('social-006/section-14-not-the-same.gif')} fit="contain" offset={-220} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={133}>
          <FullScreenImage src={staticFile('social-006/section-15-less.gif')} fit="contain" offset={-150} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={107}>
          <FullScreenImage src={staticFile('social-006/section-16-coming.gif')} fit="contain" offset={-220} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={181}>
          <FullScreenImage src={staticFile('social-006/section-17-miss.gif')} fit="contain" offset={-150} />
        </Series.Sequence>
      </Series>
      <Sequence from={titleDuration}>
        <Captions captions={captions} />
      </Sequence>
      <Sequence from={titleDuration}>
        <Audio src={staticFile('social-006/speech.wav')} />
        <Audio src={staticFile('soundtrack.wav')} volume={0.1} />
      </Sequence>
      <Sequence from={titleDuration + 150}>
        <RemotionRiveCanvas src={staticFile('parrot-greet-00.riv')} />
      </Sequence>
      <Sequence from={titleDuration + 2600}>
        <RemotionRiveCanvas src={staticFile('parrot-follow-00.riv')} />
      </Sequence>
      <Sequence from={titleDuration + 500}>
        <RemotionRiveCanvas src={staticFile('parrot-peek-00.riv')} />
      </Sequence>
      <AbsoluteFill className="border-16 border-[#000000] z-10">
      </AbsoluteFill>
      {DEBUG ? <DebugSafeZone /> : null
      }
    </AbsoluteFill>
  )
}



export const SocialVideo005: React.FC<z.infer<typeof LessonVideoPropsSchema>> = ({ captions, titleDuration }) => {
  return (
    <AbsoluteFill className={BG_CLASS}>
      <Series>
        <Series.Sequence durationInFrames={108}>
          <FullScreenImage src={staticFile('social-005/section-00-numbers.gif')} fit="contain" offset={0} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={86}>
          <FullScreenImage src={staticFile('social-005/section-01-pile.gif')} fit="contain" offset={-150} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={71}>
          <FullScreenImage src={staticFile('social-005/section-02-weights.gif')} fit="contain" offset={-150} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={65}>
          <FullScreenImage src={staticFile('social-005/section-03-question.gif')} fit="contain" offset={-100} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={68}>
          <FullScreenImage src={staticFile('social-005/section-04-answer.gif')} fit="contain" offset={-120} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={96}>
          <FullScreenImage src={staticFile('social-005/section-05-smart.gif')} fit="contain" />
        </Series.Sequence>
        <Series.Sequence durationInFrames={59}>
          <FullScreenImage src={staticFile('social-005/section-06-study.gif')} fit="contain" offset={-100} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={55}>
          <FullScreenImage src={staticFile('social-005/section-07-study.gif')} fit="contain" offset={-150} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={79}>
          <FullScreenImage src={staticFile('social-005/section-08-example.gif')} fit="contain" offset={-150} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={39}>
          <FullScreenImage src={staticFile('social-005/section-09-guess.gif')} fit="contain" offset={-100} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={75}>
          <FullScreenImage src={staticFile('social-005/section-10-compare.gif')} fit="contain" offset={-150} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={53}>
          <FullScreenImage src={staticFile('social-005/section-11-off.gif')} fit="contain" offset={-150} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={69}>
          <FullScreenImage src={staticFile('social-005/section-12-nudge.gif')} fit="contain" offset={-100} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={68}>
          <FullScreenImage src={staticFile('social-005/section-13-closer.gif')} fit="contain" offset={0} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={64}>
          <FullScreenImage src={staticFile('social-005/section-14-repeat.gif')} fit="contain" offset={-100} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={81}>
          <FullScreenImage src={staticFile('social-005/section-15-right.gif')} fit="contain" offset={-150} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={86}>
          <FullScreenImage src={staticFile('social-005/section-16-freeze.gif')} fit="contain" offset={-150} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={81}>
          <FullScreenImage src={staticFile('social-005/section-17-release.gif')} fit="contain" offset={-150} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={126}>
          <FullScreenImage src={staticFile('social-005/section-18-relax.gif')} fit="contain" offset={-150} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={65}>
          <FullScreenImage src={staticFile('social-005/section-19-incorrect.gif')} fit="contain" offset={-250} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={43}>
          <FullScreenImage src={staticFile('social-005/section-20-chill.gif')} fit="contain" offset={-150} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={50}>
          <FullScreenImage src={staticFile('social-005/section-21-graduate.gif')} fit="contain" offset={-150} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={143}>
          <FullScreenImage src={staticFile('social-005/section-22-more.gif')} fit="contain" offset={-150} />
        </Series.Sequence>
      </Series>
      <Sequence from={titleDuration}>
        <Captions captions={captions} />
      </Sequence>
      <Sequence from={titleDuration}>
        <Audio src={staticFile('social-005/speech.wav')} />
        <Audio src={staticFile('soundtrack.wav')} volume={0.1} />
        <RemotionRiveCanvas src={staticFile('parrot-greet-00.riv')} />
      </Sequence>
      <Sequence from={titleDuration + 3000}>
        <RemotionRiveCanvas src={staticFile('parrot-follow-00.riv')} />
      </Sequence>
      <Sequence from={titleDuration + 500}>
        <RemotionRiveCanvas src={staticFile('parrot-peek-00.riv')} />
      </Sequence>
      <AbsoluteFill className="border-16 border-[#000000] z-10">
      </AbsoluteFill>
      {DEBUG ? <DebugSafeZone /> : null
      }
    </AbsoluteFill>
  )
}

export const SocialVideo004: React.FC<z.infer<typeof LessonVideoPropsSchema>> = ({ captions, titleDuration }) => {
  return (
    <AbsoluteFill className={BG_CLASS}>
      <Series>
        <Series.Sequence durationInFrames={59}>
          <FullScreenImage src={staticFile('social-004/section-00-remember.gif')} fit="contain" offset={-100} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={91}>
          <FullScreenImage src={staticFile('social-004/section-01-newspaper.gif')} fit="contain" offset={-150} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={65}>
          <FullScreenImage src={staticFile('social-004/section-02-nothing.gif')} fit="contain" offset={-150} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={119}>
          <FullScreenImage src={staticFile('social-004/section-03-chicks.gif')} fit="contain" offset={-100} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={132}>
          <FullScreenImage src={staticFile('social-004/section-04-keep-up.gif')} fit="contain" offset={-120} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={88}>
          <FullScreenImage src={staticFile('social-004/section-05-factory.gif')} fit="contain" />
        </Series.Sequence>
        <Series.Sequence durationInFrames={93}>
          <FullScreenImage src={staticFile('social-004/section-06-burn.gif')} fit="contain" offset={-100} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={61}>
          <FullScreenImage src={staticFile('social-004/section-07-investor.gif')} fit="contain" offset={-150} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={112}>
          <FullScreenImage src={staticFile('social-004/section-08-disappear.gif')} fit="contain" offset={-150} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={58}>
          <FullScreenImage src={staticFile('social-004/section-09-wait.gif')} fit="contain" offset={-100} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={88}>
          <FullScreenImage src={staticFile('social-004/section-10-learn.gif')} fit="contain" offset={-150} color="#000000" />
        </Series.Sequence>
        <Series.Sequence durationInFrames={72}>
          <FullScreenImage src={staticFile('social-004/section-11-jeans.gif')} fit="contain" offset={-150} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={40}>
          <FullScreenImage src={staticFile('social-004/section-12-long-time.gif')} fit="contain" offset={-100} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={144}>
          <FullScreenImage src={staticFile('social-004/section-13-fast-fashion.gif')} fit="contain" offset={0} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={75}>
          <FullScreenImage src={staticFile('social-004/section-14-couch.gif')} fit="contain" offset={-100} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={188}>
          <FullScreenImage src={staticFile('social-004/section-15-follow.gif')} fit="contain" offset={-150} />
        </Series.Sequence>
      </Series>
      <Sequence from={titleDuration}>
        <Captions captions={captions} />
      </Sequence>
      <Sequence from={titleDuration}>
        <Audio src={staticFile('social-004/speech.wav')} />
        <Audio src={staticFile('soundtrack.wav')} volume={0.1} />
        <RemotionRiveCanvas src={staticFile('parrot-greet-00.riv')} />
      </Sequence>
      <Sequence from={titleDuration + 1693}>
        <RemotionRiveCanvas src={staticFile('parrot-follow-00.riv')} />
      </Sequence>
      <Sequence from={titleDuration + 300}>
        <RemotionRiveCanvas src={staticFile('parrot-peek-00.riv')} />
      </Sequence>
      <AbsoluteFill className="border-16 border-[#000000] z-10">
      </AbsoluteFill>
      {DEBUG ? <DebugSafeZone /> : null
      }
    </AbsoluteFill>
  )
}

export const SocialVideo003: React.FC<z.infer<typeof LessonVideoPropsSchema>> = ({ captions, titleDuration }) => {
  return (
    <AbsoluteFill className={BG_CLASS}>
      <Series>
        <Series.Sequence durationInFrames={30}>
          <FullScreenImage src={staticFile('social-003/section-00-chasing.gif')} fit="contain" offset={-100} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={63}>
          <FullScreenImage src={staticFile('social-003/section-01-intelligent-machine.gif')} fit="contain" offset={-200} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={60}>
          <FullScreenImage src={staticFile('social-003/section-02-almost.gif')} fit="contain" offset={-150} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={60}>
          <FullScreenImage src={staticFile('social-003/section-03-1770.jpg')} fit="contain" offset={-100} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={60}>
          <FullScreenImage src={staticFile('social-003/section-04-kempelen.jpg')} fit="contain" offset={-120} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={89}>
          <FullScreenImage src={staticFile('social-003/section-05-mechanical-turk.jpg')} fit="contain" offset={-120} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={21}>
          <FullScreenImage src={staticFile('social-003/section-06-napoleon.gif')} fit="contain" offset={-150} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={43}>
          <FullScreenImage src={staticFile('social-003/section-07-benjamin-franklin.gif')} fit="contain" offset={-150} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={143}>
          <FullScreenImage src={staticFile('social-003/section-08-mechanical-turk.webp')} fit="contain" offset={-150} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={99}>
          <FullScreenImage src={staticFile('social-003/section-09-different.gif')} fit="contain" offset={-100} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={78}>
          <FullScreenImage src={staticFile('social-003/section-10-language.gif')} fit="contain" offset={-150} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={35}>
          <FullScreenImage src={staticFile('social-003/section-11-understand.gif')} fit="contain" offset={-150} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={83}>
          <FullScreenImage src={staticFile('social-003/section-12-language-model.gif')} fit="contain" />
        </Series.Sequence>
        <Series.Sequence durationInFrames={105}>
          <FullScreenImage src={staticFile('social-003/section-13-learn-robot.gif')} fit="contain" offset={-200} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={113}>
          <FullScreenImage src={staticFile('social-003/section-14-code.gif')} fit="contain" offset={-100} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={77}>
          <FullScreenImage src={staticFile('social-003/section-15-different.gif')} fit="contain" offset={-150} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={149}>
          <FullScreenImage src={staticFile('social-003/section-16-examples.gif')} fit="contain" offset={-150} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={66}>
          <FullScreenImage src={staticFile('social-003/section-17-ready.gif')} fit="contain" offset={-150} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={87}>
          <FullScreenImage src={staticFile('social-003/section-18-write.gif')} fit="contain" offset={-150} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={170}>
          <FullScreenImage src={staticFile('social-003/section-19-teach-robots.gif')} fit="contain" offset={-150} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={170}>
          <FullScreenImage src={staticFile('social-003/section-20-follow.gif')} fit="contain" offset={-150} />
        </Series.Sequence>
      </Series>
      <Sequence from={titleDuration}>
        <Captions captions={captions} />
      </Sequence>
      <Sequence from={titleDuration}>
        <Audio src={staticFile('social-003/speech.wav')} />
        <Audio src={staticFile('soundtrack.wav')} volume={0.1} />
        <RemotionRiveCanvas src={staticFile('parrot-greet-00.riv')} />
      </Sequence>
      <Sequence from={titleDuration + 1693}>
        <RemotionRiveCanvas src={staticFile('parrot-follow-00.riv')} />
      </Sequence>
      <Sequence from={titleDuration + 700}>
        <RemotionRiveCanvas src={staticFile('parrot-peek-00.riv')} />
      </Sequence>
      <AbsoluteFill className="border-16 border-[#000000] z-10">
      </AbsoluteFill>
      {DEBUG ? <DebugSafeZone /> : null
      }
    </AbsoluteFill>
  )
}


export const SocialVideo002: React.FC<z.infer<typeof LessonVideoPropsSchema>> = ({ captions, titleDuration }) => {
  return (
    <AbsoluteFill className={BG_CLASS}>
      <Series>
        <Series.Sequence durationInFrames={71}>
          <FullScreenImage src={staticFile('social-002/section-00-ask.gif')} fit="contain" offset={-100} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={59}>
          <FullScreenImage src={staticFile('social-002/section-01-chatgpt.gif')} fit="contain" offset={-200} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={25}>
          <FullScreenImage src={staticFile('social-002/section-02-chatgpt.gif')} fit="contain" offset={-150} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={21}>
          <FullScreenImage src={staticFile('social-002/section-03-claude.gif')} fit="contain" offset={-100} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={23}>
          <FullScreenImage src={staticFile('social-002/section-04-gemini.jpg')} fit="contain" offset={-100} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={90}>
          <FullScreenImage src={staticFile('social-002/section-05-newborn.gif')} fit="contain" offset={-150} color="#f7f7ec" />
        </Series.Sequence>
        <Series.Sequence durationInFrames={90}>
          <FullScreenImage src={staticFile('social-002/section-06-old.gif')} fit="contain" offset={-150} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={120}>
          <FullScreenImage src={staticFile('social-002/section-07-vintage-robot.gif')} fit="contain" offset={-150} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={145}>
          <FullScreenImage src={staticFile('social-002/section-08-vintage.gif')} fit="contain" offset={-150} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={92}>
          <FullScreenImage src={staticFile('social-002/section-09-book.gif')} fit="contain" offset={-100} color="#0a2f9e" />
        </Series.Sequence>
        <Series.Sequence durationInFrames={77}>
          <FullScreenImage src={staticFile('social-002/section-10-long-list.gif')} fit="contain" offset={-150} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={93}>
          <FullScreenImage src={staticFile('social-002/section-11-brain.gif')} fit="contain" offset={-150} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={142}>
          <FullScreenImage src={staticFile('social-002/section-12-cat-box.gif')} fit="contain" />
        </Series.Sequence>
        <Series.Sequence durationInFrames={75}>
          <FullScreenImage src={staticFile('social-002/section-13-language.gif')} fit="contain" offset={-150} color="#f7f7f7" />
        </Series.Sequence>
        <Series.Sequence durationInFrames={66}>
          <FullScreenImage src={staticFile('social-002/section-14-blend.gif')} fit="contain" offset={-200} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={84}>
          <FullScreenImage src={staticFile('social-002/section-15-brain.gif')} fit="contain" offset={-100} color="#fde2fe" />
        </Series.Sequence>
        <Series.Sequence durationInFrames={102}>
          <FullScreenImage src={staticFile('social-002/section-16-more.gif')} fit="contain" offset={-150} />
        </Series.Sequence>
      </Series>
      <Sequence from={titleDuration}>
        <Captions captions={captions} />
      </Sequence>
      <Sequence from={titleDuration}>
        <Audio src={staticFile('social-002/speech.wav')} />
        <Audio src={staticFile('soundtrack.wav')} volume={0.1} />
        <RemotionRiveCanvas src={staticFile('parrot-greet-00.riv')} />
      </Sequence>
      <Sequence from={titleDuration + 1637}>
        <RemotionRiveCanvas src={staticFile('parrot-follow-00.riv')} />
      </Sequence>
      <Sequence from={titleDuration + 700}>
        <RemotionRiveCanvas src={staticFile('parrot-peek-00.riv')} />
      </Sequence>
      <AbsoluteFill className="border-16 border-[#000000] z-10">
      </AbsoluteFill>
      {DEBUG ? <DebugSafeZone /> : null
      }
    </AbsoluteFill>
  )
}


export const SocialVideo001: React.FC<z.infer<typeof LessonVideoPropsSchema>> = ({ captions, titleDuration }) => {
  return (
    <AbsoluteFill className={BG_CLASS}>
      <Series>
        <Series.Sequence durationInFrames={66}>
          <FullScreenImage src={staticFile('social-001/section-00-learning.gif')} fit="contain" offset={-100} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={59}>
          <FullScreenImage src={staticFile('social-001/section-01-two.gif')} fit="contain" offset={-200} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={79}>
          <FullScreenImage src={staticFile('social-001/section-02-lazy.gif')} fit="contain" offset={-150} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={88}>
          <FullScreenImage src={staticFile('social-001/section-03-many.gif')} fit="contain" offset={-100} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={50}>
          <FullScreenImage src={staticFile('social-001/section-04-okay.gif')} fit="contain" offset={-100} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={54}>
          <FullScreenImage src={staticFile('social-001/logo.png')} fit="contain" offset={-270} color="#ffffff" />
        </Series.Sequence>
        <Series.Sequence durationInFrames={96}>
          <FullScreenImage src={staticFile('social-001/section-06-saw.gif')} fit="contain" offset={-150} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={70}>
          <FullScreenImage src={staticFile('social-001/section-07-fomo.gif')} fit="contain" offset={-150} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={112}>
          <FullScreenImage src={staticFile('social-001/section-08-lazy.gif')} fit="contain" offset={-150} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={71}>
          <FullScreenImage src={staticFile('social-001/section-09-shiny-new.gif')} fit="contain" offset={-100} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={50}>
          <FullScreenImage src={staticFile('social-001/section-10-change.gif')} fit="contain" offset={-150} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={100}>
          <FullScreenImage src={staticFile('social-001/section-11-season.gif')} fit="contain" offset={-150} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={117}>
          <FullScreenImage src={staticFile('social-001/section-12-rushing.gif')} fit="contain" />
        </Series.Sequence>
        <Series.Sequence durationInFrames={132}>
          <FullScreenImage src={staticFile('social-001/section-13-sit-computer.gif')} fit="contain" offset={-150} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={70}>
          <FullScreenImage src={staticFile('social-001/section-14-magic-wand.gif')} fit="contain" offset={-200} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={22}>
          <FullScreenImage src={staticFile('social-001/section-15-wonder-woman.gif')} fit="contain" offset={-100} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={102}>
          <FullScreenImage src={staticFile('social-001/section-16-contemplating.gif')} fit="contain" offset={-260} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={88}>
          <FullScreenImage src={staticFile('social-001/section-17-waiting.gif')} fit="contain" offset={-160} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={123}>
          <FullScreenImage src={staticFile('social-001/section-18-learning.gif')} fit="contain" offset={-160} />
        </Series.Sequence>
      </Series>
      <Sequence from={titleDuration}>
        <Captions captions={captions} />
      </Sequence>
      <Sequence from={titleDuration}>
        <Audio src={staticFile('social-001/speech.wav')} />
        <Audio src={staticFile('soundtrack.wav')} volume={0.1} />
        <RemotionRiveCanvas src={staticFile('parrot-greet-00.riv')} />
      </Sequence>
      <Sequence from={titleDuration + 1637}>
        <RemotionRiveCanvas src={staticFile('parrot-follow-00.riv')} />
      </Sequence>
      <Sequence from={titleDuration + 700}>
        <RemotionRiveCanvas src={staticFile('parrot-peek-00.riv')} />
      </Sequence>
      <AbsoluteFill className="border-16 border-[#000000] z-10">
      </AbsoluteFill>
      {DEBUG ? <DebugSafeZone /> : null
      }
    </AbsoluteFill>
  )
}



export const SocialVideo000: React.FC<z.infer<typeof LessonVideoPropsSchema>> = ({ captions, titleDuration }) => {
  return (
    <AbsoluteFill className={BG_CLASS}>
      <Series>
        <Series.Sequence durationInFrames={66}>
          <FullScreenImage src={staticFile('social-000/section-00-running-fail.gif')} fit="contain" offset={-100} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={70}>
          <FullScreenImage src={staticFile('social-000/section-01-panic.gif')} fit="contain" />
        </Series.Sequence>
        <Series.Sequence durationInFrames={196}>
          <FullScreenImage src={staticFile('social-000/section-02-chatgpt.gif')} fit="contain" offset={-150} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={48}>
          <FullScreenImage src={staticFile('social-000/section-03-follow.gif')} fit="contain" offset={-100} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={101}>
          <FullScreenImage src={staticFile('social-000/section-04-puppies.gif')} fit="contain" />
        </Series.Sequence>
        <Series.Sequence durationInFrames={150}>
          <FullScreenImage src={staticFile('social-000/section-05-what.gif')} fit="contain" offset={-150} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={167}>
          <FullScreenImage src={staticFile('social-000/section-06-greed.gif')} fit="contain" offset={-150} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={95}>
          <FullScreenImage src={staticFile('social-000/section-07-ads.gif')} fit="contain" offset={-150} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={108}>
          <FullScreenImage src={staticFile('social-000/section-08-fired.gif')} fit="contain" offset={-150} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={50}>
          <FullScreenImage src={staticFile('social-000/section-09-diskman.gif')} fit="contain" offset={-100} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={92}>
          <FullScreenImage src={staticFile('social-000/section-10-pay.gif')} fit="contain" offset={-150} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={108}>
          <FullScreenImage src={staticFile('social-000/section-11-work.gif')} fit="contain" offset={-250} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={96}>
          <FullScreenImage src={staticFile('social-000/section-12-excited.gif')} fit="contain" />
        </Series.Sequence>
        <Series.Sequence durationInFrames={63}>
          <FullScreenImage src={staticFile('social-000/section-13-no-rush.gif')} fit="contain" offset={-250} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={87 + 15}>
          <FullScreenImage src={staticFile('social-000/section-14-walk-slow.gif')} fit="contain" offset={-200} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={79 + 13}>
          <FullScreenImage src={staticFile('social-000/section-15-computer.gif')} fit="contain" offset={-100} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={77}>
          <FullScreenImage src={staticFile('social-000/section-16-come.gif')} fit="contain" offset={-260} />
        </Series.Sequence>
      </Series>
      <Sequence from={titleDuration}>
        <Captions captions={captions} />
      </Sequence>
      <Sequence from={titleDuration}>
        <Audio src={staticFile('social-000/speech.wav')} />
        <Audio src={staticFile('soundtrack.wav')} volume={0.1} />
        <RemotionRiveCanvas src={staticFile('parrot-greet-00.riv')} />
      </Sequence>
      <Sequence from={titleDuration + 1637}>
        <RemotionRiveCanvas src={staticFile('parrot-follow-00.riv')} />
      </Sequence>
      <Sequence from={titleDuration + 700}>
        <RemotionRiveCanvas src={staticFile('parrot-peek-00.riv')} />
      </Sequence>
      <AbsoluteFill className="border-16 border-[#000000] z-10">
      </AbsoluteFill>
      {DEBUG ? <DebugSafeZone /> : null
      }
    </AbsoluteFill>
  )
}



export const LessonVideoLovablePublish01: React.FC<z.infer<typeof LessonVideoPropsSchema>> = ({ captions, titleDuration }) => {
  return (
    <AbsoluteFill className={BG_CLASS}>
      <Series>
        <Series.Sequence durationInFrames={titleDuration}>
          <FullScreenText>
            <TypingText delay={0}>Micro-course</TypingText>
            <br />
            <TypingText delay={20}>Overview</TypingText>
          </FullScreenText>
        </Series.Sequence>
        <Series.Sequence durationInFrames={72}>
          <FullScreenImage src={staticFile('video-lovable-publish-01/section-01-built.gif')} fit="contain" />
        </Series.Sequence>
        <Series.Sequence durationInFrames={53}>
          <FullScreenImage src={staticFile('video-lovable-publish-01/section-02-congrats.gif')} fit="contain" />
        </Series.Sequence>
        <Series.Sequence durationInFrames={214}>
          <FullScreenImage src={staticFile('video-lovable-publish-01/section-03-boring.gif')} fit="contain" />
        </Series.Sequence>
        <Series.Sequence durationInFrames={38}>
          <FullScreenImage src={staticFile('video-lovable-publish-01/section-04-share.gif')} fit="contain" />
        </Series.Sequence>
        <Series.Sequence durationInFrames={111}>
          <FullScreenImage src={staticFile('video-lovable-publish-01/section-05-wondering.gif')} fit="contain" />
        </Series.Sequence>
        <Series.Sequence durationInFrames={48}>
          <FullScreenImage src={staticFile('video-lovable-publish-01/section-06-change.gif')} fit="contain" />
        </Series.Sequence>
        <Series.Sequence durationInFrames={51}>
          <FullScreenImage src={staticFile('video-lovable-publish-01/section-07-small-cat.gif')} fit="contain" />
        </Series.Sequence>
        <Series.Sequence durationInFrames={66}>
          <FullScreenImage src={staticFile('video-lovable-publish-01/section-08-built.gif')} fit="contain" />
        </Series.Sequence>
        <Series.Sequence durationInFrames={56}>
          <FullScreenImage src={staticFile('video-lovable-publish-01/section-09-app.gif')} fit="contain" />
        </Series.Sequence>
        <Series.Sequence durationInFrames={100}>
          <FullScreenImage src={staticFile('video-lovable-publish-01/section-10-trust.gif')} fit="contain" />
        </Series.Sequence>
        <Series.Sequence durationInFrames={70}>
          <FullScreenImage src={staticFile('video-lovable-publish-01/section-11-submit.gif')} fit="contain" />
        </Series.Sequence>
        <Series.Sequence durationInFrames={55}>
          <FullScreenImage src={staticFile('video-lovable-publish-01/section-12-neon-sign.gif')} fit="contain" color="#000000" />
        </Series.Sequence>
        <Series.Sequence durationInFrames={46}>
          <FullScreenImage src={staticFile('video-lovable-publish-01/section-13-legal.gif')} fit="contain" />
        </Series.Sequence>
        <Series.Sequence durationInFrames={100}>
          <FullScreenImage src={staticFile('video-lovable-publish-01/section-14-search-engine.gif')} fit="contain" />
        </Series.Sequence>
        <Series.Sequence durationInFrames={48}>
          <FullScreenImage src={staticFile('video-lovable-publish-01/section-15-dashboard.gif')} fit="contain" />
        </Series.Sequence>
        <Series.Sequence durationInFrames={58}>
          <FullScreenImage src={staticFile('video-lovable-publish-01/section-16-planning.gif')} fit="contain" />
        </Series.Sequence>
        <Series.Sequence durationInFrames={79}>
          <FullScreenImage src={staticFile('video-lovable-publish-01/section-17-app.gif')} fit="contain" />
        </Series.Sequence>
        <Series.Sequence durationInFrames={120}>
          <FullScreenImage src={staticFile('video-lovable-publish-01/section-18-internet.gif')} fit="contain" />
        </Series.Sequence>
        <Series.Sequence durationInFrames={140}>
          <FullScreenImage src={staticFile('video-lovable-publish-01/section-19-grow.gif')} fit="contain" />
        </Series.Sequence>
        <Series.Sequence durationInFrames={67}>
          <FullScreenImage src={staticFile('video-lovable-publish-01/section-20-launch.gif')} fit="contain" />
        </Series.Sequence>
      </Series>
      <Sequence from={titleDuration}>
        <Captions captions={captions} />
      </Sequence>
      <Sequence from={titleDuration}>
        <Audio src={staticFile('video-lovable-publish-01/speech.wav')} />
      </Sequence>
    </AbsoluteFill>
  )
}



export const LessonVideoLovableBasics01: React.FC<z.infer<typeof LessonVideoPropsSchema>> = ({ captions, titleDuration }) => {
  return (
    <AbsoluteFill className={BG_CLASS}>
      <Series>
        <Series.Sequence durationInFrames={titleDuration}>
          <FullScreenText>
            <TypingText delay={0}>Micro-course</TypingText>
            <br />
            <TypingText delay={20}>Overview</TypingText>
          </FullScreenText>
        </Series.Sequence>
        <Series.Sequence durationInFrames={70}>
          <FullScreenImage src={staticFile('video-lovable-basics-01/section-01-idea.gif')} fit="contain" />
        </Series.Sequence>
        <Series.Sequence durationInFrames={167}>
          <ImageSteps
            allDuration={167}
            images={[
              { image: staticFile('video-lovable-basics-01/section-02-women-group.mp4'), delay: 0, offset: 60 },
              { image: staticFile('video-lovable-basics-01/section-02-business.mp4'), delay: 63 },
              { image: staticFile('video-lovable-basics-01/section-02-solve.mp4'), delay: 87 },
            ]}
          />
        </Series.Sequence>
        <Series.Sequence durationInFrames={56}>
          <FullScreenImage src={staticFile('video-lovable-basics-01/section-03-delete-computer.gif')} fit="contain" />
        </Series.Sequence>
        <Series.Sequence durationInFrames={84}>
          <FullScreenImage src={staticFile('video-lovable-basics-01/section-04-stuck.gif')} fit="contain" />
        </Series.Sequence>
        <Series.Sequence durationInFrames={58}>
          <FullScreenImage src={staticFile('video-lovable-basics-01/section-05-transformation.gif')} fit="contain" />
        </Series.Sequence>
        <Series.Sequence durationInFrames={58}>
          <FullScreenImage src={staticFile('video-lovable-basics-01/section-06-typing.gif')} fit="contain" />
        </Series.Sequence>
        <Series.Sequence durationInFrames={66}>
          <FullScreenImage src={staticFile('video-lovable-basics-01/section-07-typing.gif')} fit="contain" />
        </Series.Sequence>
        <Series.Sequence durationInFrames={86}>
          <FullScreenImage src={staticFile('video-lovable-basics-01/section-08-internet.gif')} fit="contain" />
        </Series.Sequence>
        <Series.Sequence durationInFrames={76}>
          <FullScreenImage src={staticFile('video-lovable-basics-01/section-09-exactly.gif')} fit="contain" />
        </Series.Sequence>
        <Series.Sequence durationInFrames={54}>
          <FullScreenImage src={staticFile('video-lovable-basics-01/section-10-small.gif')} fit="contain" />
        </Series.Sequence>
        <Series.Sequence durationInFrames={76}>
          <FullScreenImage src={staticFile('video-lovable-basics-01/section-11-dog-computer.gif')} fit="contain" />
        </Series.Sequence>
        <Series.Sequence durationInFrames={59}>
          <FullScreenImage src={staticFile('video-lovable-basics-01/section-12-success.gif')} fit="contain" />
        </Series.Sequence>
        <Series.Sequence durationInFrames={144}>
          <FullScreenImage src={staticFile('video-lovable-basics-01/section-13-woman-type.gif')} fit="contain" />
        </Series.Sequence>
        <Series.Sequence durationInFrames={56}>
          <FullScreenImage src={staticFile('video-lovable-basics-01/section-14-coding.gif')} fit="contain" />
        </Series.Sequence>
        <Series.Sequence durationInFrames={92}>
          <FullScreenImage src={staticFile('video-lovable-basics-01/section-15-step.gif')} fit="contain" />
        </Series.Sequence>
        <Series.Sequence durationInFrames={62}>
          <FullScreenImage src={staticFile('video-lovable-basics-01/section-16-calm-down.gif')} fit="contain" />
        </Series.Sequence>
        <Series.Sequence durationInFrames={94}>
          <FullScreenImage src={staticFile('video-lovable-basics-01/section-17-experiment.gif')} fit="contain" />
        </Series.Sequence>
        <Series.Sequence durationInFrames={148}>
          <FullScreenImage src={staticFile('video-lovable-basics-01/section-18-build.gif')} fit="contain" />
        </Series.Sequence>
      </Series>
      <Sequence from={titleDuration}>
        <Captions captions={captions} />
      </Sequence>
      <Sequence from={titleDuration}>
        <Audio src={staticFile('video-lovable-basics-01/speech.wav')} />
      </Sequence>
    </AbsoluteFill>
  )
}



export const LessonVideoDebugging01: React.FC<z.infer<typeof LessonVideoPropsSchema>> = ({ captions, titleDuration }) => {
  return (
    <AbsoluteFill className={BG_CLASS}>
      <Series>
        <Series.Sequence durationInFrames={titleDuration}>
          <FullScreenText>
            <TypingText delay={0}>Micro-course</TypingText>
            <br />
            <TypingText delay={20}>Overview</TypingText>
          </FullScreenText>
        </Series.Sequence>
        <Series.Sequence durationInFrames={80}>
          <FullScreenImage src={staticFile('video-debugging-01/section-01-build.gif')} fit="contain" />
        </Series.Sequence>
        <Series.Sequence durationInFrames={111}>
          <FullScreenImage src={staticFile('video-debugging-01/section-02-broken.gif')} fit="contain" />
        </Series.Sequence>
        <Series.Sequence durationInFrames={48}>
          <FullScreenImage src={staticFile('video-debugging-01/section-03-bug.gif')} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={36}>
          <FullScreenImage src={staticFile('video-debugging-01/section-04-fail.gif')} fit="contain" />
        </Series.Sequence>
        <Series.Sequence durationInFrames={53}>
          <FullScreenImage src={staticFile('video-debugging-01/section-05-computer-what.gif')} fit="contain" />
        </Series.Sequence>
        <Series.Sequence durationInFrames={160}>
          <FullScreenImage src={staticFile('video-debugging-01/section-06-research.gif')} fit="contain" />
        </Series.Sequence>
        <Series.Sequence durationInFrames={60}>
          <FullScreenImage src={staticFile('video-debugging-01/section-07-fix.gif')} fit="contain" />
        </Series.Sequence>
        <Series.Sequence durationInFrames={64}>
          <FullScreenImage src={staticFile('video-debugging-01/section-08-suprise.gif')} fit="contain" />
        </Series.Sequence>
        <Series.Sequence durationInFrames={112}>
          <FullScreenImage src={staticFile('video-debugging-01/section-09-girl-developer.gif')} fit="contain" />
        </Series.Sequence>
        <Series.Sequence durationInFrames={63}>
          <FullScreenImage src={staticFile('video-debugging-01/section-10-repair.gif')} fit="contain" />
        </Series.Sequence>
        <Series.Sequence durationInFrames={76}>
          <FullScreenImage src={staticFile('video-debugging-01/section-11-bugs.gif')} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={192}>
          <FullScreenImage src={staticFile('video-debugging-01/section-12-tortoise.gif')} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={84}>
          <FullScreenImage src={staticFile('video-debugging-01/section-13-wonder-woman.gif')} fit="contain" />
        </Series.Sequence>
        <Series.Sequence durationInFrames={74}>
          <FullScreenImage src={staticFile('video-debugging-01/section-14-study.gif')} fit="contain" color="#fcf0e5" />
        </Series.Sequence>
        <Series.Sequence durationInFrames={106}>
          <FullScreenImage src={staticFile('video-debugging-01/section-15-study.gif')} fit="contain" color="#fcf0e5" />
        </Series.Sequence>
        <Series.Sequence durationInFrames={38}>
          <FullScreenImage src={staticFile('video-debugging-01/section-16-micro.gif')} fit="contain" />
        </Series.Sequence>
        <Series.Sequence durationInFrames={88}>
          <FullScreenImage src={staticFile('video-debugging-01/section-17-bugs.gif')} fit="contain" />
        </Series.Sequence>
        <Series.Sequence durationInFrames={48}>
          <FullScreenImage src={staticFile('video-debugging-01/section-18-point-map.gif')} fit="contain" />
        </Series.Sequence>
        <Series.Sequence durationInFrames={98}>
          <FullScreenImage src={staticFile('video-debugging-01/section-19-investigate.gif')} fit="contain" />
        </Series.Sequence>
        <Series.Sequence durationInFrames={106}>
          <FullScreenImage src={staticFile('video-debugging-01/section-20-women-in-tech.gif')} fit="contain" />
        </Series.Sequence>
        <Series.Sequence durationInFrames={74}>
          <FullScreenImage src={staticFile('video-debugging-01/section-21-bug-spray.gif')} fit="contain" />
        </Series.Sequence>
        <Series.Sequence durationInFrames={84}>
          <FullScreenImage src={staticFile('video-debugging-01/section-22-investigate.gif')} fit="contain" />
        </Series.Sequence>
        <Series.Sequence durationInFrames={97}>
          <FullScreenImage src={staticFile('video-debugging-01/section-23-tools.gif')} fit="contain" />
        </Series.Sequence>
        <Series.Sequence durationInFrames={116}>
          <FullScreenImage src={staticFile('video-debugging-01/section-24-stuck.gif')} fit="contain" />
        </Series.Sequence>
        <Series.Sequence durationInFrames={108}>
          <FullScreenImage src={staticFile('video-debugging-01/section-25-toolbox.gif')} fit="contain" />
        </Series.Sequence>
        <Series.Sequence durationInFrames={74}>
          <FullScreenImage src={staticFile('video-debugging-01/section-26-break.gif')} fit="contain" />
        </Series.Sequence>
        <Series.Sequence durationInFrames={48}>
          <FullScreenImage src={staticFile('video-debugging-01/section-27-ask.gif')} fit="contain" />
        </Series.Sequence>
        <Series.Sequence durationInFrames={72}>
          <FullScreenImage src={staticFile('video-debugging-01/section-28-move.gif')} fit="contain" />
        </Series.Sequence>
        <Series.Sequence durationInFrames={134}>
          <FullScreenImage src={staticFile('video-debugging-01/section-29-unstoppable.gif')} fit="contain" />
        </Series.Sequence>
      </Series>
      <Sequence from={titleDuration}>
        <Captions captions={captions} />
      </Sequence>
      <Sequence from={titleDuration}>
        <Audio src={staticFile('video-debugging-01/speech.wav')} />
      </Sequence>
    </AbsoluteFill>
  )
}


export const LessonVideoLanding: React.FC<z.infer<typeof LessonVideoPropsSchema>> = ({ captions, titleDuration }) => {
  return (
    <AbsoluteFill className={BG_CLASS}>
      <Series>
        <Series.Sequence durationInFrames={titleDuration}>
          <FullScreenText>
            <TypingText delay={0}>Little</TypingText>
            <br />
            <TypingText delay={10}>Parrot</TypingText>
          </FullScreenText>
        </Series.Sequence>
        <Series.Sequence durationInFrames={128}>
          <FullScreenImage src={staticFile('video-landing/section-1-planting.gif')} fit="contain" />
        </Series.Sequence>
        <Series.Sequence durationInFrames={124}>
          <FullScreenImage src={staticFile('video-landing/section-2-builder.gif')} fit="contain" />
        </Series.Sequence>
        <Series.Sequence durationInFrames={48}>
          <FullScreenImage src={staticFile('video-landing/section-3-app.gif')} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={58}>
          <FullScreenImage src={staticFile('video-landing/section-4-prompt.gif')} fit="contain" />
        </Series.Sequence>
        <Series.Sequence durationInFrames={66}>
          <FullScreenImage src={staticFile('video-landing/section-5-leave.gif')} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={134}>
          <FullScreenImage src={staticFile('video-landing/section-6-women-do.gif')} fit="contain" />
        </Series.Sequence>
        <Series.Sequence durationInFrames={120}>
          <FullScreenImage src={staticFile('video-landing/section-7-odd.gif')} fit="contain" />
        </Series.Sequence>
        <Series.Sequence durationInFrames={84}>
          <FullScreenImage src={staticFile('video-landing/section-8-seen.gif')} fit="contain" />
        </Series.Sequence>
        <Series.Sequence durationInFrames={176}>
          <FullScreenImage src={staticFile('video-landing/section-9-women-cs.png')} fit="contain" />
        </Series.Sequence>
        <Series.Sequence durationInFrames={63}>
          <FullScreenImage src={staticFile('video-landing/section-10-pc.gif')} fit="contain" />
        </Series.Sequence>
        <Series.Sequence durationInFrames={57}>
          <FullScreenImage src={staticFile('video-landing/section-11-pc.gif')} fit="contain" />
        </Series.Sequence>
        <Series.Sequence durationInFrames={65}>
          <FullScreenImage src={staticFile('video-landing/section-12-fade.gif')} fit="contain" />
        </Series.Sequence>
        <Series.Sequence durationInFrames={79}>
          <FullScreenImage src={staticFile('video-landing/section-13-nope.gif')} fit="contain" />
        </Series.Sequence>
        <Series.Sequence durationInFrames={30}>
          <FullScreenImage src={staticFile('video-landing/section-14-now.gif')} fit="contain" />
        </Series.Sequence>
        <Series.Sequence durationInFrames={106}>
          <FullScreenImage src={staticFile('video-landing/section-15-bro.jpg')} fit="contain" color="#ffffff" />
        </Series.Sequence>
        <Series.Sequence durationInFrames={60}>
          <FullScreenImage src={staticFile('video-landing/section-16-belong.gif')} fit="contain" />
        </Series.Sequence>
        <Series.Sequence durationInFrames={64}>
          <FullScreenImage src={staticFile('video-landing/section-17-women.gif')} fit="contain" />
        </Series.Sequence>
        <Series.Sequence durationInFrames={76}>
          <FullScreenImage src={staticFile('video-landing/section-18-power.gif')} fit="contain" />
        </Series.Sequence>
        <Series.Sequence durationInFrames={54}>
          <FullScreenImage src={staticFile('video-landing/section-19-share.gif')} fit="contain" />
        </Series.Sequence>
        <Series.Sequence durationInFrames={48}>
          <FullScreenImage src={staticFile('video-landing/section-20-build.gif')} fit="contain" />
        </Series.Sequence>
        <Series.Sequence durationInFrames={66}>
          <FullScreenImage src={staticFile('video-landing/section-21-work.gif')} fit="contain" />
        </Series.Sequence>
        <Series.Sequence durationInFrames={82}>
          <FullScreenImage src={staticFile('video-landing/section-22-community.gif')} fit="contain" />
        </Series.Sequence>
        <Series.Sequence durationInFrames={95}>
          <FullScreenImage src={staticFile('video-landing/section-23-role-model.gif')} fit="contain" />
        </Series.Sequence>
        <Series.Sequence durationInFrames={38}>
          <FullScreenImage src={staticFile('video-landing/section-24-parrot.gif')} fit="contain" />
        </Series.Sequence>
        <Series.Sequence durationInFrames={152}>
          <FullScreenImage src={staticFile('video-landing/section-25-helping.gif')} fit="contain" />
        </Series.Sequence>
        <Series.Sequence durationInFrames={108}>
          <FullScreenImage src={staticFile('video-landing/section-26-learning.gif')} fit="contain" />
        </Series.Sequence>
        <Series.Sequence durationInFrames={92}>
          <FullScreenImage src={staticFile('video-landing/section-27-lesson.gif')} fit="contain" />
        </Series.Sequence>
        <Series.Sequence durationInFrames={123}>
          <ImageSteps
            allDuration={123}
            images={[
              { image: staticFile('video-landing/section-28-coffee.mp4'), delay: 0, offset: -160 },
              { image: staticFile('video-landing/section-28-train.mp4'), delay: 38 },
              { image: staticFile('video-landing/section-28-sleep.mp4'), delay: 72 },
            ]}
          />
        </Series.Sequence>

        <Series.Sequence durationInFrames={109}>
          <FullScreenImage src={staticFile('video-landing/section-29-too-much.gif')} fit="contain" />
        </Series.Sequence>
        <Series.Sequence durationInFrames={106}>
          <FullScreenImage src={staticFile('video-landing/section-30-kind.gif')} fit="contain" />
        </Series.Sequence>
        <Series.Sequence durationInFrames={66}>
          <FullScreenImage src={staticFile('video-landing/section-31-what.gif')} fit="contain" />
        </Series.Sequence>
        <Series.Sequence durationInFrames={50}>
          <FullScreenImage src={staticFile('video-landing/section-32-mistake.gif')} fit="contain" />
        </Series.Sequence>
        <Series.Sequence durationInFrames={74}>
          <FullScreenImage src={staticFile('video-landing/section-33-belong.gif')} fit="contain" color="#ffffff" />
        </Series.Sequence>
        <Series.Sequence durationInFrames={200}>
          <AbsoluteFill style={{ scale: 0.8 }}>
            <RemotionRiveCanvas src={staticFile('video-landing/little-parrot-greet.riv')} />
          </AbsoluteFill>
        </Series.Sequence>
      </Series>
      <Sequence from={titleDuration}>
        <Captions captions={captions} />
      </Sequence>
      <Sequence from={titleDuration}>
        <Audio src={staticFile('video-landing/speech.wav')} />
        <Audio src={staticFile('soundtrack.wav')} volume={0.1} />
      </Sequence>
      <Sequence from={titleDuration + 1736} durationInFrames={540}>
        <RemotionRiveCanvas src={staticFile('video-3/reel-parrot.riv')} />
      </Sequence>
    </AbsoluteFill>
  )
}

export const LessonVideo7: React.FC<z.infer<typeof LessonVideoPropsSchema>> = ({ captions, titleDuration }) => {
  return (
    <AbsoluteFill className={BG_CLASS}>
      <Series>
        <Series.Sequence durationInFrames={titleDuration}>
          <FullScreenText>
            <TypingText delay={0}>Micro-course</TypingText>
            <br />
            <br />
            <TypingText delay={20}>Overview</TypingText>
          </FullScreenText>
        </Series.Sequence>
        <Series.Sequence durationInFrames={68}>
          <FullScreenImage src={staticFile('video-7/section1-start.gif')} fit="contain" />
        </Series.Sequence>
        <Series.Sequence durationInFrames={78}>
          <FullScreenImage src={staticFile('video-7/section2-where.gif')} fit="contain" />
        </Series.Sequence>
        <Series.Sequence durationInFrames={52}>
          <FullScreenImage src={staticFile('video-7/section3-micro.gif')} fit="contain" />
        </Series.Sequence>
        <Series.Sequence durationInFrames={74}>
          <FullScreenImage src={staticFile('video-7/section4-solve.gif')} fit="contain" />
        </Series.Sequence>
        <Series.Sequence durationInFrames={66}>
          <FullScreenImage src={staticFile('video-7/section5-understand.gif')} fit="contain" />
        </Series.Sequence>
        <Series.Sequence durationInFrames={144}>
          <FullScreenImage src={staticFile('video-7/section6-storyboard.gif')} fit="contain" />
        </Series.Sequence>
        <Series.Sequence durationInFrames={135}>
          <FullScreenImage src={staticFile('video-7/section7-mapping.gif')} fit="contain" />
        </Series.Sequence>
        <Series.Sequence durationInFrames={84}>
          <FullScreenImage src={staticFile('video-7/section8-shape.gif')} fit="contain" />
        </Series.Sequence>
        <Series.Sequence durationInFrames={116}>
          <FullScreenImage src={staticFile('video-7/section9-prompt.gif')} fit="contain" />
        </Series.Sequence>
        <Series.Sequence durationInFrames={103}>
          <FullScreenImage src={staticFile('video-7/section10-ready.gif')} fit="contain" />
        </Series.Sequence>
        <Series.Sequence durationInFrames={95}>
          <FullScreenImage src={staticFile('video-7/section11-plan.gif')} fit="contain" />
        </Series.Sequence>
        <Series.Sequence durationInFrames={181}>
          <FullScreenImage src={staticFile('video-7/section12-step.gif')} fit="contain" />
        </Series.Sequence>
      </Series>
      <Sequence from={titleDuration}>
        <Captions captions={captions} />
      </Sequence>
      <Sequence from={titleDuration}>
        <Audio src={staticFile('video-7/speech.wav')} />
      </Sequence>
    </AbsoluteFill>
  )
}

export const LessonVideo6: React.FC<z.infer<typeof LessonVideoPropsSchema>> = ({ captions, titleDuration }) => {
  return (
    <AbsoluteFill className={BG_CLASS}>
      <Series>
        <Series.Sequence durationInFrames={titleDuration}>
          <FullScreenText>
            <TypingText delay={0}>Box Model</TypingText>
          </FullScreenText>
        </Series.Sequence>
        <Series.Sequence durationInFrames={840}>
          <AbsoluteFill>
            <RemotionRiveCanvas src={staticFile('video-6/box-model.riv')} />
          </AbsoluteFill>
        </Series.Sequence>
      </Series>
      <Sequence from={titleDuration}>
        <Captions captions={captions} />
      </Sequence>
      <Sequence from={titleDuration}>
        <Audio src={staticFile('video-6/speech.wav')} />
      </Sequence>
    </AbsoluteFill>
  )
}

export const LessonVideo5: React.FC<z.infer<typeof LessonVideoPropsSchema>> = ({ captions, titleDuration }) => {
  return (
    <AbsoluteFill className={BG_CLASS}>
      <Series>
        <Series.Sequence durationInFrames={titleDuration}>
          <FullScreenText>
            <TypingText delay={0}>Micro-course</TypingText>
            <br />
            <br />
            <TypingText delay={20}>Overview</TypingText>
          </FullScreenText>
        </Series.Sequence>
        <Series.Sequence durationInFrames={108}>
          <FullScreenImage src={staticFile('video-5/section1-beaver.gif')} fit="contain" />
        </Series.Sequence>
        <Series.Sequence durationInFrames={54}>
          <FullScreenImage src={staticFile('video-5/section2-robot.gif')} fit="contain" />
        </Series.Sequence>
        <Series.Sequence durationInFrames={34}>
          <FullScreenImage src={staticFile('video-5/section3-lovable.gif')} fit="contain" color="#ffffff" />
        </Series.Sequence>
        <Series.Sequence durationInFrames={50}>
          <FullScreenImage src={staticFile('video-5/section4-start-button.gif')} fit="contain" />
        </Series.Sequence>
        <Series.Sequence durationInFrames={52}>
          <FullScreenImage src={staticFile('video-5/section5-understand.gif')} fit="contain" />
        </Series.Sequence>
        <Series.Sequence durationInFrames={88}>
          <FullScreenImage src={staticFile('video-5/section6-building-block.gif')} fit="contain" color="#8dff83" />
        </Series.Sequence>
        <Series.Sequence durationInFrames={110}>
          <FullScreenImage src={staticFile('video-5/section7-learning.gif')} fit="contain" />
        </Series.Sequence>
        <Series.Sequence durationInFrames={96}>
          <FullScreenImage src={staticFile('video-5/section8-typing.gif')} fit="contain" />
        </Series.Sequence>
        <Series.Sequence durationInFrames={42}>
          <FullScreenImage src={staticFile('video-5/section9-micro-pig.gif')} fit="contain" />
        </Series.Sequence>
        <Series.Sequence durationInFrames={85}>
          <FullScreenImage src={staticFile('video-5/section10-crystal-ball.gif')} fit="contain" />
        </Series.Sequence>
        <Series.Sequence durationInFrames={45}>
          <FullScreenImage src={staticFile('video-5/section11-building-software.gif')} fit="contain" />
        </Series.Sequence>
        <Series.Sequence durationInFrames={88}>
          <FullScreenImage src={staticFile('video-5/section12-confidence.gif')} fit="contain" />
        </Series.Sequence>
        <Series.Sequence durationInFrames={54}>
          <FullScreenImage src={staticFile('video-5/section13-we-can.gif')} fit="contain" />
        </Series.Sequence>
        <Series.Sequence durationInFrames={107}>
          <FullScreenImage src={staticFile('video-5/section14-cat-turn.gif')} fit="contain" />
        </Series.Sequence>
        <Series.Sequence durationInFrames={84}>
          <FullScreenImage src={staticFile('video-5/section15-leo-point.gif')} fit="contain" color="#000000" />
        </Series.Sequence>
        <Series.Sequence durationInFrames={200}>
          <FullScreenImage src={staticFile('video-5/section16-type.gif')} fit="contain" />
        </Series.Sequence>
      </Series>
      <Sequence from={titleDuration}>
        <Captions captions={captions} />
      </Sequence>
      <Sequence from={titleDuration}>
        <Audio src={staticFile('video-5/speech.wav')} />
      </Sequence>
    </AbsoluteFill>
  )
}

export const LessonVideo4: React.FC<z.infer<typeof LessonVideoPropsSchema>> = ({ captions, titleDuration }) => {
  return (
    <AbsoluteFill className={BG_CLASS}>
      <Series>
        <Series.Sequence durationInFrames={titleDuration}>
          <FullScreenText>
            <TypingText delay={0}>System Prompt</TypingText>
            <br />
            <TypingText delay={22}>&amp;</TypingText>
            <br />
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

export const LessonVideo3: React.FC<z.infer<typeof LessonVideoPropsSchema>> = ({ captions, titleDuration }) => {
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
              { image: staticFile('video-3/section4-1.mp4'), delay: 0 },
              { image: staticFile('video-3/section4-2.mp4'), delay: 26, offset: -50 },
              { image: staticFile('video-3/section4-3.mp4'), delay: 59, offset: -60 },
              { image: staticFile('video-3/section4-1.mp4'), delay: 94 },
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
        <RemotionRiveCanvas src={staticFile('video-3/reel-parrot.riv')} />
      </Sequence>
    </AbsoluteFill>
  )
}

export const LessonVideo2: React.FC<z.infer<typeof LessonVideoPropsSchema>> = ({ captions, titleDuration }) => {
  return (
    <AbsoluteFill className={BG_CLASS}>
      <Series>
        <Series.Sequence durationInFrames={titleDuration}>
          <FullScreenText>
            <TypingText delay={0}>Prompting Technique</TypingText>
            <br />
            <TypingText delay={22}>#1</TypingText>
            <br />
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



export const LessonVideo: React.FC<z.infer<typeof LessonVideoPropsSchema>> = ({ captions, titleDuration }) => {
  return (
    <AbsoluteFill className={BG_CLASS}>
      <Series>
        <Series.Sequence durationInFrames={titleDuration}>
          <FullScreenText>
            <TypingText delay={0}>Artificial Intelligence</TypingText>
            <br />
            <TypingText delay={22}>&amp;</TypingText>
            <br />
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
              { image: staticFile('video-1/section2.mp4'), delay: 0 },
              { image: staticFile('video-1/section2-2.mp4'), delay: 86, offset: -100 },
              { image: staticFile('video-1/section2-3.mp4'), delay: 128 },
              { image: staticFile('video-1/section2-4.mp4'), delay: 172, offset: -150 },
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
              { image: staticFile('video-1/section4.mp4'), delay: 0 },
              { image: staticFile('video-1/section4-2.mp4'), delay: 82 },
              { image: staticFile('video-1/section4-3.mp4'), delay: 151, offset: -320 },
            ]}
          />
        </Series.Sequence>
        <Series.Sequence durationInFrames={214}>
          <ImageSteps
            allDuration={214}
            images={[
              { image: staticFile('video-1/section5.jpg'), delay: 0 },
              { image: staticFile('video-1/section5-2.jpg'), delay: 100 },
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
              { image: staticFile('video-1/section10.mp4'), delay: 0 },
              { image: staticFile('video-1/section10-2.mp4'), delay: 75, offset: -250 },
              { image: staticFile('video-1/section10-3.mp4'), delay: 111, offset: -100 },
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
              { image: staticFile('video-1/section12.mp4'), delay: 0, offset: -250 },
              { image: staticFile('video-1/section12-2.mp4'), delay: 70, offset: -100 },
              { image: staticFile('video-1/section12-3.mp4'), delay: 92, offset: -240 },
              { image: staticFile('video-1/section12-4.mp4'), delay: 118 },
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
              { image: staticFile('video-1/section17.mp4'), delay: 0, offset: -160 },
              { image: staticFile('video-1/section17-2.mp4'), delay: 77, offset: -20 },
              { image: staticFile('video-1/section17-3.mp4'), delay: 128, offset: -420 },
              { image: staticFile('video-1/section17-4.mp4'), delay: 175, offset: -200 },
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

const DebugSafeZone: React.FC = () => {
  return (
    <AbsoluteFill>
      <div className="bg-[rgba(255,0,0,0.5)] w-full h-[250px] text-9xl">250</div>
      <div className="bg-[rgba(255,0,0,0.5)] w-full h-[420px] mt-[1250px] text-9xl">420</div>
    </AbsoluteFill>
  )
}

const Captions: React.FC<{ captions: Captions }> = ({ captions }) => {
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

const ImageSteps: React.FC<{ images: { image: string, delay: number, offset?: number, scale?: number }[], allDuration: number }> = ({ images, allDuration }) => {
  return (
    <AbsoluteFill className={BG_CLASS} style={{
      fontFamily: spaceMonoFontFamily,
    }}>
      {images.map(({ delay }, index) => {
        const height = 1920 / images.length
        const durationLeft = allDuration - delay
        console.log({ delay, durationLeft })
        return (
          <Sequence from={delay} durationInFrames={durationLeft} key={index}>
            <div className="flex flex-col items-center justify-center h-full w-full">
              {
                images.map(({ image, offset = 0, scale = 1, delay: delayIn }, i) => {
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
                        }} /> :
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
                          }} />
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
          color: BLACK,
        }}>
          {children}
        </div>
      </div>
      <Img src={staticFile('parrot.png')} className="absolute bottom-10 right-75 w-100" style={{
        rotate: `${rotation}deg`,
        transformOrigin: 'bottom',
        translate: `${translate}px 0`,
        scale: '-1 1',
      }} />
    </AbsoluteFill>
  )
}

const TypingText: React.FC<{ children: string, delay?: number }> = ({ children, delay = 0 }) => {
  const frame = useCurrentFrame();
  const chars = children.split("")
  const now = (frame - delay) < 0 ? 0 : frame - delay
  const masked = chars.map(char => char === " " ? " " : "#")
  const text = children.substring(0, now) + masked.slice(now).join("")
  return <>
    {text}
  </>
}

const FullScreenImage: React.FC<{ src: string, zoom?: number, offset?: number, fit?: 'cover' | 'contain', color?: string, scale?: number }> = ({
  src,
  zoom = 0,
  offset = 0,
  fit = 'cover',
  color = DARK_PURPLE,
  scale = 1,
}) => {
  const isGif = src.endsWith('.gif')
  return (
    <AbsoluteFill>
      <div className="flex flex-col items-center justify-center h-full w-full" style={{ backgroundColor: color }}>
        {
          isGif ?
            <Gif
              src={src}
              width={1080 + Math.abs(zoom) * 2}
              height={1920}
              fit={fit}
              style={{
                translate: `${zoom}px ${offset}px`,
                scale: String(scale),
              }}
            />
            :
            <Img
              src={src}
              width={1080 + Math.abs(zoom) * 2}
              style={{
                translate: `${zoom}px ${offset}px`,
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
    <AbsoluteFill className={BG_CLASS}>
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

// [Time, X, Y, Scale]
type Zoom = [number, number, number, number]

const VideoZoom: React.FC<{ src: string, zoom: Zoom[], duration: number }> = ({ src, zoom, duration }) => {
  const frame = useCurrentFrame();
  const zoomWithBeginning = zoom[0][0] === 0 ? zoom : [[0, ...zoom[0].slice(1)], ...zoom]
  const zoomWithEnds = zoomWithBeginning[zoomWithBeginning.length - 1][0] === duration ? zoomWithBeginning : [...zoomWithBeginning, [duration, ...zoomWithBeginning[zoomWithBeginning.length - 1].slice(1)]]
  const now = zoomWithEnds.filter(([time]) => time <= frame)
  const before = now[now.length - 1]
  const after = zoomWithEnds[now.length]
  console.log(before, after, frame)
  const scale = interpolate(frame, [before[0], after[0]], [before[3], after[3]], {
    extrapolateRight: 'clamp',
    easing: Easing.inOut(Easing.ease),
  });
  const x = interpolate(frame, [before[0], after[0]], [before[1], after[1]], {
    extrapolateRight: 'clamp',
    easing: Easing.inOut(Easing.ease),
  });
  const y = interpolate(frame, [before[0], after[0]], [before[1], after[1]], {
    extrapolateRight: 'clamp',
    easing: Easing.inOut(Easing.ease),
  });


  return (
    <AbsoluteFill>
      <div className="flex flex-col items-center justify-center h-full w-full">
        <Video
          src={src}
          width={1080}
          style={{
            transform: `scale(${scale}) translate(${x}%, ${y}%)`,
          }}
        />
      </div>
    </AbsoluteFill>
  )
}
