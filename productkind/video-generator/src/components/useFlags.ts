import { useCallback, useEffect, useState } from 'react'
import { getRemotionEnvironment, staticFile } from 'remotion'
import { watchStaticFile, writeStaticFile } from '@remotion/studio'

import type { Flags } from './flags'
import { parseFlags, serialiseFlags, toggled } from './flags'

/**
 * The flags for one video, kept in `public/<assets>/flags.json` and written from Studio.
 *
 * Studio has no panel API, but it does have `writeStaticFile`, so a control drawn on the canvas
 * can persist to the repo. That is the whole trick behind flagging a gif from the preview: no
 * separate review app, and the result is a file the sourcing scripts can read.
 */
export const useFlags = ({
  assets,
}: {
  assets: string
}): { flags: Flags; toggle: (options: { section: number; src: string }) => void } => {
  const path = `${assets}/flags.json`
  const [flags, setFlags] = useState<Flags>({})

  useEffect(() => {
    // Flags are a Studio concern. A render has no one to read them and would only log a 404 for
    // a file most videos never have.
    if (!getRemotionEnvironment().isStudio) {
      return
    }
    let current = true
    const read = () => {
      // A video that has never been flagged has no file, and 404 means nothing is flagged.
      fetch(staticFile(path))
        .then(async (response) => (response.ok ? response.text() : ''))
        .catch(() => '')
        .then((text) => {
          if (current) {
            setFlags(parseFlags({ text }))
          }
        })
    }
    read()
    const watcher = watchStaticFile(path, read)
    return () => {
      current = false
      watcher.cancel()
    }
  }, [path])

  const toggle = useCallback(
    ({ section, src }: { section: number; src: string }) => {
      setFlags((current) => {
        const next = toggled({ flags: current, section, src })
        void writeStaticFile({ filePath: path, contents: serialiseFlags({ flags: next }) })
        return next
      })
    },
    [path],
  )

  return { flags, toggle }
}
