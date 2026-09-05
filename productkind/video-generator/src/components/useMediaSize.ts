import { useEffect, useState } from 'react'
import { cancelRender, continueRender, delayRender } from 'remotion'

import type { Size } from '../narration/safe-zone'

/**
 * Measured sizes, kept for the life of the process. A gif reused across sections is measured once,
 * and later frames of the same render never wait at all.
 */
const MEASURED = new Map<string, Size>()

const measureImage = async ({ src }: { src: string }): Promise<Size> =>
  new Promise((resolve, reject) => {
    const image = new Image()
    image.onload = () => {
      resolve({ width: image.naturalWidth, height: image.naturalHeight })
    }
    image.onerror = () => {
      reject(new Error(`Could not load ${src} to measure it.`))
    }
    image.src = src
  })

const measureVideo = async ({ src }: { src: string }): Promise<Size> =>
  new Promise((resolve, reject) => {
    const video = document.createElement('video')
    video.onloadedmetadata = () => {
      resolve({ width: video.videoWidth, height: video.videoHeight })
    }
    video.onerror = () => {
      reject(new Error(`Could not load ${src} to measure it.`))
    }
    video.preload = 'metadata'
    video.src = src
  })

/**
 * The media's own pixel size, which is what the placement needs and only the decoder knows.
 *
 * Measuring happens inside `delayRender`, so Remotion holds the frame until the answer is in.
 * Nothing is ever captured mid-measurement, in Studio or in a render.
 */
export const useMediaSize = ({ src, isVideo }: { src: string; isVideo: boolean }): Size | undefined => {
  const alreadyMeasured = MEASURED.get(src)
  const [size, setSize] = useState<Size | undefined>(alreadyMeasured)
  const [handle] = useState<number | undefined>(() =>
    alreadyMeasured === undefined ? delayRender(`Measuring ${src}`) : undefined,
  )

  useEffect(() => {
    if (handle === undefined) {
      return
    }
    const measure = isVideo ? measureVideo : measureImage
    measure({ src })
      .then((measured) => {
        MEASURED.set(src, measured)
        setSize(measured)
        continueRender(handle)
      })
      .catch((error: unknown) => {
        cancelRender(error)
      })
  }, [handle, src, isVideo])

  return size
}
