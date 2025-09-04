import './index.css';

import { Composition, staticFile } from "remotion";
import { LessonVideo, LessonVideoPropsSchema, Captions, LessonVideo2, LessonVideo3, LessonVideo4 } from "./LessonVideo";
import { FRAME_HEIGHT, FRAME_RATE, FRAME_WIDTH } from './config';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="lesson-00-video-00"
        component={LessonVideo}
        durationInFrames={FRAME_RATE}
        fps={FRAME_RATE}
        width={FRAME_WIDTH}
        height={FRAME_HEIGHT}
        schema={LessonVideoPropsSchema}
        defaultProps={{
          captions: [],
          titleDuration: 60,
          endDuration: 60,
          allDuration: 100,
        }}
        calculateMetadata={async ({props}) => {
          const titleDuration = 60
          const endDuration = 0
          const response = await fetch(staticFile('text.json'))
          const captions = await response.json()
          const duration = Math.ceil(captions.at(-1).end * FRAME_RATE) + titleDuration + endDuration

          return {
            durationInFrames: duration,
            props: {
              ...props,
              captions: transformCaptionsToFrames(captions),
              allDuration: duration,
            }
          }
        }}
      />
      <Composition
        id="lesson-00-video-01"
        component={LessonVideo2}
        durationInFrames={FRAME_RATE}
        fps={FRAME_RATE}
        width={FRAME_WIDTH}
        height={FRAME_HEIGHT}
        schema={LessonVideoPropsSchema}
        defaultProps={{
          captions: [],
          titleDuration: 60,
          endDuration: 30,
          allDuration: 100,
        }}
        calculateMetadata={async ({props}) => {
          const titleDuration = 60
          const endDuration = 0
          const response = await fetch(staticFile('video-2/text.json'))
          const captions = await response.json()
          const duration = Math.ceil(captions.at(-1).end * FRAME_RATE) + titleDuration + endDuration

          return {
            durationInFrames: duration,
            props: {
              ...props,
              captions: transformCaptionsToFrames(captions),
              allDuration: duration,
            }
          }
        }}
      />
      <Composition
        id="lesson-00-video-02"
        component={LessonVideo3}
        durationInFrames={FRAME_RATE}
        fps={FRAME_RATE}
        width={FRAME_WIDTH}
        height={FRAME_HEIGHT}
        schema={LessonVideoPropsSchema}
        defaultProps={{
          captions: [],
          titleDuration: 0,
          endDuration: 30,
          allDuration: 100,
        }}
        calculateMetadata={async ({props}) => {
          const titleDuration = 0
          const endDuration = 0
          const response = await fetch(staticFile('video-3/text.json'))
          const captions = await response.json()
          console.log(captions)
          const duration = Math.ceil(captions.at(-1).end * FRAME_RATE) + titleDuration + endDuration

          return {
            durationInFrames: duration,
            props: {
              ...props,
              captions: transformCaptionsToFrames(captions),
              allDuration: duration,
            }
          }
        }}
      />
      <Composition
        id="lesson-00-video-03"
        component={LessonVideo4}
        durationInFrames={FRAME_RATE}
        fps={FRAME_RATE}
        width={FRAME_WIDTH}
        height={FRAME_HEIGHT}
        schema={LessonVideoPropsSchema}
        defaultProps={{
          captions: [],
          titleDuration: 0,
          endDuration: 30,
          allDuration: 100,
        }}
        calculateMetadata={async ({props}) => {
          const titleDuration = 0
          const endDuration = 0
          const response = await fetch(staticFile('video-4/text.json'))
          const captions = await response.json()
          console.log(captions)
          const duration = Math.ceil(captions.at(-1).end * FRAME_RATE) + titleDuration + endDuration

          return {
            durationInFrames: duration,
            props: {
              ...props,
              captions: transformCaptionsToFrames(captions),
              allDuration: duration,
            }
          }
        }}
      />
    </>
  )
}

const transformCaptionsToFrames = (captions: Captions): Captions => {
  return captions.map((caption) => {
    return {
      ...caption,
      start: Math.ceil(caption.start * FRAME_RATE),
      end: Math.ceil(caption.end * FRAME_RATE),
    }
  })
}

