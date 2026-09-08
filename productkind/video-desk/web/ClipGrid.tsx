import type { ClipCandidate } from './api'
import { BadgeRow } from './BadgeRow'
import { clipBadge } from './badges'

/**
 * Stock footage offered for a beat.
 *
 * The cards play the clip itself rather than a poster: what matters about footage is the movement,
 * and pexels' posters are a single frame chosen by pexels. Shortest usable clip comes first,
 * because the trim throws away everything past the beat.
 */
export const ClipGrid: React.FC<{
  clips: ClipCandidate[]
  busy: string | null
  onPick: (clip: ClipCandidate) => void
}> = ({ clips, busy, onPick }) => {
  if (clips.length === 0) {
    return <p className="empty">No footage yet. Search above.</p>
  }

  return (
    <div className="grid">
      {clips.map((clip) => (
        <article key={`${clip.provider}-${clip.id}`} className="card">
          <video
            className="gif"
            src={clip.downloadUrl}
            poster={clip.posterUrl}
            muted
            loop
            autoPlay
            playsInline
            preload="metadata"
          />
          <div className="card-body">
            <span className="card-title" title={`${clip.term} · ${clip.provider}`}>
              {clip.author === '' ? clip.provider : `by ${clip.author}`}
            </span>
            <BadgeRow
              badges={[
                { text: `${clip.seconds.toFixed(1)}s`, tone: 'plain' },
                clipBadge({ headroom: clip.fit.headroom }),
                { text: clip.provider, tone: 'plain' },
              ]}
            />
            <div className="card-actions">
              <button
                type="button"
                className="action"
                disabled={busy !== null}
                onClick={() => {
                  onPick(clip)
                }}
              >
                {busy === clip.id ? 'trimming…' : 'use'}
              </button>
              <a className="action ghost" href={clip.sourceUrl} target="_blank" rel="noreferrer">
                source
              </a>
            </div>
          </div>
        </article>
      ))}
    </div>
  )
}
