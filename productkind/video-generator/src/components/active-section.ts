import type { TimelineSection } from '../narration/timeline'

/**
 * The section showing at a frame.
 *
 * `Series` decides this for the visuals themselves, but the annotation layer sits outside the
 * series — above the captions and the Rive overlays, where nothing can paint over it — so it has
 * to work the same answer out for itself.
 */
export const sectionAt = ({
  sections,
  frame,
}: {
  sections: TimelineSection[]
  frame: number
}): TimelineSection | undefined =>
  sections.find(
    (section) => frame >= section.fromFrame && frame < section.fromFrame + section.durationInFrames,
  ) ?? sections[sections.length - 1]
