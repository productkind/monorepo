import { useState } from 'react'

import type { Candidate } from './api'
import { fitBadge, motionBadge, usedBadge } from './badges'
import { BadgeRow } from './BadgeRow'

/**
 * The candidates for one section.
 *
 * Two affordances exist because of what the sourcing rules say kills most picks: sticker-pack
 * wordmarks that only show at full size, and text that appears in a gif's final third. So every
 * card enlarges, and every card can show the eight-frame strip inline — four frames is not enough
 * to catch a caption that arrives late.
 */
export const CandidateGrid: React.FC<{
  candidates: Candidate[]
  busy: string | null
  onPick: (candidate: Candidate) => void
}> = ({ candidates, busy, onPick }) => {
  const [strips, setStrips] = useState<Record<string, boolean>>({})
  const [enlarged, setEnlarged] = useState<Candidate | null>(null)

  if (candidates.length === 0) {
    return <p className="empty">No candidates yet. Search above.</p>
  }

  return (
    <>
      <div className="grid">
        {candidates.map((candidate) => {
          const used = usedBadge({ usedIn: candidate.usedIn })
          return (
            <article key={candidate.id} className={used ? 'card used' : 'card'}>
              <img className="gif" src={candidate.gifUrl} alt={candidate.title || candidate.id} />
              <div className="card-body">
                <span className="card-title" title={`${candidate.title} · ${candidate.term}`}>
                  {candidate.title || candidate.id}
                </span>
                <BadgeRow
                  badges={[
                    { text: `${candidate.seconds.toFixed(2)}s`, tone: 'plain' },
                    fitBadge({ repeats: candidate.repeats }),
                    motionBadge({ motion: candidate.motion }),
                    { text: `${String(candidate.width)}x${String(candidate.height)}`, tone: 'plain' },
                    ...(used ? [used] : []),
                  ]}
                />
                {candidate.fit.rate === null ? null : (
                  <span className="badge good">rate {candidate.fit.rate}</span>
                )}
                <div className="card-actions">
                  <button
                    type="button"
                    className="action"
                    disabled={busy !== null}
                    onClick={() => {
                      onPick(candidate)
                    }}
                  >
                    {busy === candidate.id ? 'applying…' : 'use'}
                  </button>
                  <button
                    type="button"
                    className="action ghost"
                    onClick={() => {
                      setStrips((current) => ({ ...current, [candidate.id]: !current[candidate.id] }))
                    }}
                  >
                    8 frames
                  </button>
                  <button
                    type="button"
                    className="action ghost"
                    onClick={() => {
                      setEnlarged(candidate)
                    }}
                  >
                    zoom
                  </button>
                </div>
              </div>
              {strips[candidate.id] === true ? (
                <img className="strip" src={candidate.stripUrl} alt={`${candidate.id}, 8 frames`} />
              ) : null}
            </article>
          )
        })}
      </div>

      {enlarged === null ? null : (
        <button
          type="button"
          className="enlarged"
          aria-label="Close"
          onClick={() => {
            setEnlarged(null)
          }}
        >
          <img src={enlarged.gifUrl} alt={enlarged.title || enlarged.id} />
        </button>
      )}
    </>
  )
}
