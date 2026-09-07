import { useEffect, useState } from 'react'

import type { Candidate, Section } from './api'
import { assetUrl, measureSection, pickGif, searchGifs, setFlag } from './api'
import { fitBadge, motionBadge, seconds } from './badges'
import { BadgeRow } from './BadgeRow'
import { CandidateGrid } from './CandidateGrid'

/** Enough to name a file by, from whatever was searched for: `woman raising hand` -> `raising-hand`. */
const nameFrom = ({ term }: { term: string }): string =>
  term
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .split(/\s+/)
    .slice(-2)
    .join('-') || 'gif'

export const SectionPanel: React.FC<{
  video: string
  section: Section
  onChanged: (section: Section) => void
}> = ({ video, section, onChanged }) => {
  const [measured, setMeasured] = useState<Section>(section)
  const [terms, setTerms] = useState(section.search ?? '')
  const [provider, setProvider] = useState('auto')
  const [candidates, setCandidates] = useState<Candidate[]>([])
  const [searching, setSearching] = useState(false)
  const [busy, setBusy] = useState<string | null>(null)
  const [problem, setProblem] = useState<string | null>(null)

  // Measuring costs a full decode per gif, so it happens when a section is opened, not for the
  // whole list. Candidates are dropped on the way in: they belong to the section just left.
  useEffect(() => {
    setMeasured(section)
    setTerms(section.search ?? '')
    setCandidates([])
    setProblem(null)
    let current = true
    measureSection({ video, section: section.index })
      .then((result) => {
        if (current) {
          setMeasured(result.section)
        }
      })
      .catch((error: unknown) => {
        if (current) {
          setProblem(String(error))
        }
      })
    return () => {
      current = false
    }
  }, [video, section])

  const search = () => {
    setSearching(true)
    setProblem(null)
    searchGifs({
      video,
      section: section.index,
      terms: terms.split(/\s*[,;]\s*/).filter((term) => term.length > 0),
      provider,
      show: 12,
    })
      .then((result) => {
        setCandidates(result.candidates)
        if (result.candidates.length === 0) {
          setProblem('Nothing came back that fits the frame. Try different words.')
        }
      })
      .catch((error: unknown) => {
        setProblem(String(error))
      })
      .finally(() => {
        setSearching(false)
      })
  }

  const pick = (candidate: Candidate) => {
    setBusy(candidate.id)
    setProblem(null)
    pickGif({
      video,
      section: section.index,
      gifId: candidate.id,
      name: nameFrom({ term: candidate.term }),
      search: candidate.term,
    })
      .then((result) => {
        setMeasured(result.section)
        onChanged(result.section)
        setCandidates([])
      })
      .catch((error: unknown) => {
        setProblem(String(error))
      })
      .finally(() => {
        setBusy(null)
      })
  }

  const flag = () => {
    setFlag({ video, section: section.index, src: measured.src, flagged: !measured.flagged })
      .then(() => {
        const next = { ...measured, flagged: !measured.flagged }
        setMeasured(next)
        onChanged(next)
      })
      .catch((error: unknown) => {
        setProblem(String(error))
      })
  }

  return (
    <section className="pane">
      <div className="pane-head">
        <span className="label">section</span>
        <span className="num">{String(section.index).padStart(2, '0')}</span>
        <span className="label">slot</span>
        <span className="num">{seconds({ value: measured.slotSeconds })}</span>
        <span className="label">gif</span>
        <span className="num">{seconds({ value: measured.gifSeconds })}</span>
      </div>

      <div className="panel-body">
        <p className="spoken">{section.text}</p>

        <div className="controls">
          <img
            src={assetUrl({ video, src: measured.src })}
            alt={measured.src}
            width={96}
            height={96}
            style={{ objectFit: 'contain', background: measured.color ?? '#1a0044' }}
          />
          <div>
            <div className="num" style={{ fontSize: 12 }}>
              {measured.src}
            </div>
            <BadgeRow
              badges={[
                fitBadge({ repeats: measured.repeats, seam: measured.seam }),
                measured.motion === undefined
                  ? { text: 'measuring…', tone: 'plain' }
                  : motionBadge({ motion: measured.motion }),
                measured.playbackRate === null
                  ? undefined
                  : { text: `rate ${measured.playbackRate}`, tone: 'plain' },
                measured.color === null ? undefined : { text: measured.color, tone: 'plain' },
                measured.seam === undefined
                  ? undefined
                  : { text: `seam ${measured.seam.toFixed(2)}`, tone: 'plain' },
              ]}
            />
            {measured.edgeColour !== undefined &&
            measured.edgeColour !== null &&
            measured.edgeColour !== measured.color ? (
              <span className="badge warn">
                <span className="swatch" style={{ background: measured.edgeColour }} />
                sits on {measured.edgeColour}, letterbox does not match
              </span>
            ) : null}
          </div>
          <button
            type="button"
            className={measured.flagged ? 'action flagged' : 'action ghost'}
            onClick={flag}
          >
            {measured.flagged ? 'flagged' : 'flag'}
          </button>
        </div>

        <div className="controls">
          <input
            type="text"
            value={terms}
            placeholder="search terms, comma separated"
            onChange={(event) => {
              setTerms(event.target.value)
            }}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                search()
              }
            }}
          />
          <select
            value={provider}
            onChange={(event) => {
              setProvider(event.target.value)
            }}
          >
            <option value="auto">giphy, then klipy</option>
            <option value="giphy">giphy only</option>
            <option value="klipy">klipy only</option>
          </select>
          <button type="button" className="action" disabled={searching} onClick={search}>
            {searching ? 'searching…' : 'search'}
          </button>
        </div>

        {problem === null ? null : <p className="problem">{problem}</p>}

        <CandidateGrid candidates={candidates} busy={busy} onPick={pick} />
      </div>
    </section>
  )
}
