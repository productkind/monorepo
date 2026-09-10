import { useEffect, useState } from 'react'

import type { Candidate, ClipCandidate, Section } from './api'
import { measureSection, pickClip, pickGif, searchGifs, searchStock, setFlag } from './api'
import { clipBadge, fitBadge, motionBadge, seconds } from './badges'
import { BadgeRow } from './BadgeRow'
import { CandidateGrid } from './CandidateGrid'
import { ClipGrid } from './ClipGrid'
import { VisualPreview } from './VisualPreview'

/** Enough to name a file by, from whatever was searched for: `woman raising hand` -> `raising-hand`. */
const nameFrom = ({ term }: { term: string }): string =>
  term
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .split(/\s+/)
    .slice(-2)
    .join('-') || 'gif'

const splitTerms = ({ text }: { text: string }): string[] =>
  text.split(/\s*[,;]\s*/).filter((term) => term.length > 0)

export const SectionPanel: React.FC<{
  video: string
  section: Section
  onChanged: (section: Section) => void
}> = ({ video, section, onChanged }) => {
  const [measured, setMeasured] = useState<Section>(section)
  const [terms, setTerms] = useState(section.search ?? '')
  // Every source is available on every section: a stock clip can serve a beat that holds a gif and
  // the other way round, so what was searched decides what comes back, not what is there now.
  const [provider, setProvider] = useState(section.kind === 'clip' ? 'pexels' : 'auto')
  const stock = provider === 'pexels' || provider === 'pixabay'
  const [candidates, setCandidates] = useState<Candidate[]>([])
  const [clips, setClips] = useState<ClipCandidate[]>([])
  const [searching, setSearching] = useState(false)
  const [busy, setBusy] = useState<string | null>(null)
  const [problem, setProblem] = useState<string | null>(null)

  // Measuring costs a full decode per gif, so it happens when a section is opened, not for the
  // whole list. Candidates are dropped on the way in: they belong to the section just left.
  useEffect(() => {
    setMeasured(section)
    setTerms(section.search ?? '')
    setCandidates([])
    setClips([])
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
    const searched = splitTerms({ text: terms })
    setCandidates([])
    setClips([])
    if (stock) {
      searchStock({ video, section: section.index, terms: searched, provider, show: 12 })
        .then((result) => {
          setClips(result.clips)
          if (result.clips.length === 0) {
            setProblem(
              'Nothing came back long enough to cover the beat. Try different words, or pixabay.',
            )
          }
        })
        .catch((error: unknown) => {
          setProblem(String(error))
        })
        .finally(() => {
          setSearching(false)
        })
      return
    }
    searchGifs({
      video,
      section: section.index,
      terms: searched,
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

  const takeClip = (clip: ClipCandidate) => {
    setBusy(clip.id)
    setProblem(null)
    pickClip({
      video,
      section: section.index,
      id: clip.id,
      term: clip.term,
      author: clip.author,
      provider: clip.provider,
      downloadUrl: clip.downloadUrl,
    })
      .then((result) => {
        setMeasured(result.section)
        onChanged(result.section)
        setClips([])
      })
      .catch((error: unknown) => {
        setProblem(String(error))
      })
      .finally(() => {
        setBusy(null)
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
          <VisualPreview
            video={video}
            src={measured.src}
            kind={measured.kind}
            color={measured.color}
            size={96}
            version={measured.version}
          />
          <div>
            <div className="num" style={{ fontSize: 12 }}>
              {measured.src}
            </div>
            <BadgeRow
              badges={
                measured.kind === 'clip'
                  ? [
                      clipBadge({ headroom: measured.clip?.headroom }),
                      { text: 'clip', tone: 'plain' },
                      measured.width === undefined
                        ? undefined
                        : {
                            text: `${String(measured.width)}x${String(measured.height ?? 0)}`,
                            tone: 'plain',
                          },
                      measured.source?.author === undefined
                        ? undefined
                        : { text: `by ${measured.source.author}`, tone: 'plain' },
                    ]
                  : [
                      fitBadge({ repeats: measured.repeats, seam: measured.seam }),
                      measured.motion === undefined
                        ? { text: 'measuring…', tone: 'plain' }
                        : motionBadge({ motion: measured.motion }),
                      measured.playbackRate === null
                        ? undefined
                        : { text: `rate ${measured.playbackRate}`, tone: 'plain' },
                      measured.color === null
                        ? undefined
                        : { text: measured.color, tone: 'plain' },
                      measured.seam === undefined
                        ? undefined
                        : { text: `seam ${measured.seam.toFixed(2)}`, tone: 'plain' },
                    ]
              }
            />
            {measured.kind === 'clip' && measured.clip !== undefined ? (
              <span className={measured.clip.covers ? 'badge' : 'badge bad'}>
                {measured.clip.why}
              </span>
            ) : null}
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
            <optgroup label="gifs">
              <option value="auto">giphy, then klipy</option>
              <option value="giphy">giphy only</option>
              <option value="klipy">klipy only</option>
            </optgroup>
            <optgroup label="stock footage">
              <option value="pexels">pexels</option>
              <option value="pixabay">pixabay</option>
            </optgroup>
          </select>
          <button type="button" className="action" disabled={searching} onClick={search}>
            {searching ? 'searching…' : 'search'}
          </button>
        </div>

        {problem === null ? null : <p className="problem">{problem}</p>}

        {(stock && measured.kind === 'gif') || (!stock && measured.kind === 'clip') ? (
          <p className="problem" style={{ borderLeftColor: 'var(--warn)' }}>
            {stock
              ? `This beat holds a gif. Using footage turns it into a clip, trimmed to the ${
                  measured.slotSeconds === null ? 'beat' : `${measured.slotSeconds.toFixed(1)}s beat`
                } plus a second, and filling the frame with the captions over it — footage is the
                  frame's own shape, so it is never letterboxed.`
              : 'This beat holds a clip. Using a gif turns it into one: it loops inside the beat ' +
                'rather than playing once, and sits above the captions the way every other gif ' +
                'does.'}
          </p>
        ) : null}

        {clips.length > 0 || (stock && candidates.length === 0) ? (
          <ClipGrid clips={clips} busy={busy} onPick={takeClip} />
        ) : (
          <CandidateGrid candidates={candidates} busy={busy} onPick={pick} />
        )}
      </div>
    </section>
  )
}
