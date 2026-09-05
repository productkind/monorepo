import { useEffect, useState } from 'react'
import { continueRender, delayRender } from 'remotion'
import { getGifDurationInSeconds } from '@remotion/gif'

/** Measured once per gif and kept, the way `useMediaSize` keeps sizes. */
const MEASURED = new Map<string, number>()

/**
 * How long a gif runs, for the annotation strip.
 *
 * The frame is held while measuring, so a still rendered from an annotated composition carries
 * the real number rather than catching the strip mid-measurement. Unlike `useMediaSize` a failure
 * does not cancel the render: nothing about the video depends on this, and a debug overlay
 * reading “measuring…” beats a composition that refuses to draw.
 */
export const useGifDuration = ({ src }: { src: string }): number | undefined => {
  const alreadyMeasured = MEASURED.get(src)
  const [seconds, setSeconds] = useState<number | undefined>(alreadyMeasured)
  const [handle] = useState<number | undefined>(() =>
    alreadyMeasured === undefined ? delayRender(`Measuring gif ${src}`) : undefined,
  )

  useEffect(() => {
    if (handle === undefined) {
      return
    }
    getGifDurationInSeconds(src)
      .then((measured) => {
        MEASURED.set(src, measured)
        setSeconds(measured)
      })
      .catch(() => {
        setSeconds(undefined)
      })
      .finally(() => {
        continueRender(handle)
      })
  }, [handle, src])

  return seconds
}
