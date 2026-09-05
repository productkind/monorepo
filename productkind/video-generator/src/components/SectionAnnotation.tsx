import { AbsoluteFill, getRemotionEnvironment, staticFile, useCurrentFrame } from 'remotion'

import type { VideoDefinition, Visual } from '../narration/definition'
import type { Timeline } from '../narration/timeline'
import { sectionAt } from './active-section'
import { isFlagged } from './flags'
import { annotationLine } from './section-label'
import { useFlags } from './useFlags'
import { useGifDuration } from './useGifDuration'
import { VisualView } from './Visual'
import { withKnobs } from './visual-knobs'

const HIGHLIGHT = '#ffb65b'
const FLAGGED = '#ff8a70'

/** A section's visual with Studio's knobs applied. Lives inside the series, like the plain one. */
export const TunedVisual: React.FC<{ index: number; visual: Visual; assets: string }> = ({
  index,
  visual,
  assets,
}) => <VisualView visual={withKnobs({ visual, index })} assets={assets} />

/**
 * The annotated pass's overlay: what the section is, how the gif fits its slot, and a control for
 * marking the gif as one to replace.
 *
 * It renders outside the `Series`, after the captions and the Rive overlays, because those paint
 * over anything drawn inside a section — a Rive animation is a canvas across the whole frame, and
 * it swallowed the flag button until this moved out here.
 */
export const AnnotationLayer: React.FC<{
  definition: VideoDefinition
  timeline: Timeline
}> = ({ definition, timeline }) => {
  const frame = useCurrentFrame()
  const section = sectionAt({ sections: timeline.sections, frame })
  const { flags, toggle } = useFlags({ assets: definition.assets })
  const visual = section === undefined ? undefined : definition.sections[section.index].visual
  const gifSeconds = useGifDuration({
    // Hooks cannot be called conditionally, so a non-gif measures a path nothing will fetch.
    src: visual?.kind === 'gif' ? staticFile(`${definition.assets}/${visual.src}`) : '',
  })

  if (section === undefined || visual === undefined) {
    return null
  }

  const flagged = isFlagged({ flags, section: section.index, src: visual.src })
  const colour = flagged ? FLAGGED : HIGHLIGHT

  return (
    <AbsoluteFill style={{ pointerEvents: 'none', zIndex: 20 }}>
      <div
        style={{
          position: 'absolute',
          top: 24,
          left: 24,
          right: 24,
          display: 'flex',
          alignItems: 'stretch',
          gap: 12,
        }}
      >
        <div
          style={{
            flex: 1,
            padding: '14px 20px',
            background: 'rgba(8, 8, 9, 0.82)',
            color: colour,
            // 26px keeps the longest line — a stretched gif with every number — on one row at 1080 wide.
            font: `500 26px/1.3 ui-monospace, SFMono-Regular, Menlo, monospace`,
            fontVariantNumeric: 'tabular-nums',
            borderLeft: `6px solid ${colour}`,
          }}
        >
          {annotationLine({
            index: section.index,
            visual,
            slotSeconds: section.durationInFrames / timeline.fps,
            gifSeconds: visual.kind === 'gif' ? gifSeconds : undefined,
          })}
          {flagged ? ' · FLAGGED' : ''}
        </div>
        {/* A render has no one to click this, and no Studio to write the file it would change. */}
        {getRemotionEnvironment().isStudio ? (
          <button
            type="button"
            onClick={() => {
              toggle({ section: section.index, src: visual.src })
            }}
            style={{
              pointerEvents: 'auto',
              cursor: 'pointer',
              padding: '0 22px',
              background: flagged ? FLAGGED : 'rgba(8, 8, 9, 0.82)',
              color: flagged ? '#1a0044' : HIGHLIGHT,
              border: `2px solid ${colour}`,
              font: '600 24px/1 ui-monospace, SFMono-Regular, Menlo, monospace',
            }}
          >
            {flagged ? 'flagged' : 'flag'}
          </button>
        ) : null}
      </div>
    </AbsoluteFill>
  )
}
