import { assetUrl, posterUrl } from './api'

/**
 * A section's current visual.
 *
 * A clip is a `<video>` and a gif an `<img>`, keyed by kind rather than guessed from the file
 * extension — the definition already says which it is. Clips are muted and loop here so a
 * thumbnail behaves like the gif beside it; in the video itself they play once, unmuted by nobody.
 */
export const VisualPreview: React.FC<{
  video: string
  src: string
  kind: 'gif' | 'clip' | 'still'
  color: string | null
  size: number
  /** When the file was last written. Two picks from one search share a filename. */
  version: number | null
}> = ({ video, src, kind, color, size, version }) => {
  const style = {
    width: size,
    height: size,
    objectFit: 'contain' as const,
    background: color ?? '#1a0044',
  }
  // Keyed by the file and its version, so replacing a section's visual replaces the element rather
  // than swapping an attribute underneath it. A `<video>` keeps playing what it already loaded
  // when its `src` changes, which made a section look unchanged after its clip had been swapped.
  const key = `${src}?${String(version)}`
  return kind === 'clip' ? (
    // The poster carries the picture whether or not the clip decodes: a tab that is not really
    // visible has its media loading throttled, and an empty box tells you nothing about a beat.
    <video
      key={key}
      src={assetUrl({ video, src, version })}
      poster={posterUrl({ video, src, version })}
      style={style}
      muted
      loop
      autoPlay
      playsInline
      preload="none"
    />
  ) : (
    <img key={key} src={assetUrl({ video, src, version })} alt="" style={style} />
  )
}
