import { AbsoluteFill, staticFile } from 'remotion'

import type { Visual } from '../narration/definition'
import { annotationLine } from './section-label'
import { useGifDuration } from './useGifDuration'
import { VisualView } from './Visual'
import { withKnobs } from './visual-knobs'

type SectionProps = {
  index: number
  visual: Visual
  assets: string
  slotFrames: number
  fps: number
}

/**
 * A section as the annotated compositions draw it: the visual with Studio's knobs applied, under
 * a strip saying how it fits the slot.
 *
 * Studio has no API for a panel of its own, so anything richer than a timeline row label has to
 * live on the canvas.
 */
export const AnnotatedSection: React.FC<SectionProps> = ({
  index,
  visual,
  assets,
  slotFrames,
  fps,
}) => {
  const tuned = withKnobs({ visual, index })
  return (
    <>
      <VisualView visual={tuned} assets={assets} />
      <SectionAnnotation
        index={index}
        visual={tuned}
        assets={assets}
        slotFrames={slotFrames}
        fps={fps}
      />
    </>
  )
}

/** The strip itself. Sits above the platform-bar safe zone, where no visual is ever placed. */
export const SectionAnnotation: React.FC<SectionProps> = ({
  index,
  visual,
  assets,
  slotFrames,
  fps,
}) => {
  const gifSeconds = useGifDuration({
    // Hooks cannot be called conditionally, so a non-gif measures a path nothing will fetch.
    src: visual.kind === 'gif' ? staticFile(`${assets}/${visual.src}`) : '',
  })

  return (
    <AbsoluteFill style={{ pointerEvents: 'none' }}>
      <div
        style={{
          position: 'absolute',
          top: 24,
          left: 24,
          right: 24,
          padding: '14px 20px',
          background: 'rgba(8, 8, 9, 0.82)',
          color: '#ffb65b',
          // 26px keeps the longest line — a stretched gif with every number — on one row at 1080 wide.
          font: '500 26px/1.3 ui-monospace, SFMono-Regular, Menlo, monospace',
          fontVariantNumeric: 'tabular-nums',
          borderLeft: '6px solid #ffb65b',
        }}
      >
        {annotationLine({
          index,
          visual,
          slotSeconds: slotFrames / fps,
          gifSeconds: visual.kind === 'gif' ? gifSeconds : undefined,
        })}
      </div>
    </AbsoluteFill>
  )
}
