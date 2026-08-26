import { AbsoluteFill, Img, Video, staticFile } from 'remotion'
import { Gif } from '@remotion/gif'

import type { ClipVisual, GifVisual, StillVisual, Visual } from '../narration/definition'
import { FRAME_HEIGHT, FRAME_WIDTH } from '../config'
import type { Placement } from '../narration/safe-zone'
import { placeMedia } from '../narration/safe-zone'
import { useMediaSize } from './useMediaSize'

type Framed<VISUAL> = { visual: VISUAL; assets: string }

const sourceOf = ({ visual, assets }: { visual: Visual; assets: string }): string =>
  staticFile(`${assets}/${visual.src}`)

/**
 * The letterbox that makes a `contain` fit read as deliberate rather than as a mistake: the
 * backdrop is set to the media's own background colour, so the seam disappears.
 */
const Letterbox: React.FC<React.PropsWithChildren<{ color: string }>> = ({ color, children }) => (
  <AbsoluteFill style={{ backgroundColor: color, overflow: 'hidden' }}>
    <div className="flex flex-col items-center justify-center h-full w-full">{children}</div>
  </AbsoluteFill>
)

/** A box at an exact position, for media whose placement has already been worked out. */
const Placed: React.FC<React.PropsWithChildren<{ color: string; placement: Placement; scale: number }>> = ({
  color,
  placement,
  scale,
  children,
}) => (
  <AbsoluteFill style={{ backgroundColor: color, overflow: 'hidden' }}>
    <div
      style={{
        position: 'absolute',
        left: 0,
        top: placement.top,
        width: placement.width,
        height: placement.height,
        scale: String(scale),
      }}
    >
      {children}
    </div>
  </AbsoluteFill>
)

/**
 * Works out where the media belongs and renders it there, so no visual needs a hand-tuned offset
 * to clear the platform bars and the captions. Renders nothing until the size is known, which
 * Remotion waits for.
 */
const AboveCaptions: React.FC<{
  src: string
  color: string
  offset: number
  scale: number
  isVideo: boolean
  render: (placement: Placement) => React.ReactElement
}> = ({ src, color, offset, scale, isVideo, render }) => {
  const media = useMediaSize({ src, isVideo })
  if (media === undefined) {
    return <AbsoluteFill style={{ backgroundColor: color }} />
  }
  const placement = placeMedia({ media, offset })
  return (
    <Placed color={color} placement={placement} scale={scale}>
      {render(placement)}
    </Placed>
  )
}

const GifVisualView: React.FC<Framed<GifVisual>> = ({ visual, assets }) => {
  const src = sourceOf({ visual, assets })
  const gif = (placement: { width: number; height: number }) => (
    <Gif
      src={src}
      width={placement.width}
      height={placement.height}
      fit="fill"
      loopBehavior={visual.loopBehavior}
      playbackRate={visual.playbackRate}
    />
  )

  if (visual.place === 'above-captions') {
    return (
      <AboveCaptions
        src={src}
        color={visual.color}
        offset={visual.offset}
        scale={visual.scale}
        isVideo={false}
        render={gif}
      />
    )
  }

  return (
    <Letterbox color={visual.color}>
      <Gif
        src={src}
        width={FRAME_WIDTH}
        height={FRAME_HEIGHT}
        fit={visual.fit}
        loopBehavior={visual.loopBehavior}
        playbackRate={visual.playbackRate}
        style={{ translate: `0 ${visual.offset}px`, scale: String(visual.scale) }}
      />
    </Letterbox>
  )
}

const StillVisualView: React.FC<Framed<StillVisual>> = ({ visual, assets }) => {
  const src = sourceOf({ visual, assets })

  if (visual.place === 'above-captions') {
    return (
      <AboveCaptions
        src={src}
        color={visual.color}
        offset={visual.offset}
        scale={visual.scale}
        isVideo={false}
        render={(placement) => (
          <Img src={src} width={placement.width} height={placement.height} />
        )}
      />
    )
  }

  return (
    <Letterbox color={visual.color}>
      <Img
        src={src}
        width={FRAME_WIDTH}
        style={{
          translate: `0 ${visual.offset}px`,
          scale: String(visual.scale),
          objectFit: visual.fit,
          height: FRAME_HEIGHT,
        }}
      />
    </Letterbox>
  )
}

const ClipVisualView: React.FC<Framed<ClipVisual>> = ({ visual, assets }) => {
  const src = sourceOf({ visual, assets })

  if (visual.place === 'above-captions') {
    return (
      <AboveCaptions
        src={src}
        color={visual.color}
        offset={visual.offset}
        scale={1}
        isVideo
        render={(placement) => (
          <Video
            src={src}
            muted={visual.muted}
            trimBefore={visual.trimBefore}
            width={placement.width}
            height={placement.height}
          />
        )}
      />
    )
  }

  return (
    <Video
      src={src}
      muted={visual.muted}
      trimBefore={visual.trimBefore}
      style={{ position: 'absolute', translate: `0 ${visual.offset}px` }}
    />
  )
}

/** Keyed dispatch, so nothing downstream has to guess a visual's type from its file extension. */
const VIEWS: {
  [KIND in Visual['kind']]: (options: Framed<Extract<Visual, { kind: KIND }>>) => React.ReactElement
} = {
  gif: ({ visual, assets }) => <GifVisualView visual={visual} assets={assets} />,
  still: ({ visual, assets }) => <StillVisualView visual={visual} assets={assets} />,
  clip: ({ visual, assets }) => <ClipVisualView visual={visual} assets={assets} />,
}

/**
 * The key is a single type parameter so `VIEWS[kind]` resolves to one function type rather than a
 * union of them, which is what lets this dispatch without an `as` cast.
 */
const view = <KIND extends Visual['kind']>(
  options: Framed<Extract<Visual, { kind: KIND }>>,
): React.ReactElement => VIEWS[options.visual.kind](options)

export const VisualView: React.FC<{ visual: Visual; assets: string }> = ({ visual, assets }) =>
  view({ visual, assets })
