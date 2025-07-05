import './index.css';

import { Composition, staticFile } from "remotion";
import { CaptionsSchema, LessonVideo, LessonVideoPropsSchema, Captions } from "./LessonVideo";
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
          const endDuration = 60
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
  