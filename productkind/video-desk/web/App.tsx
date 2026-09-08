import { useEffect, useState } from 'react'

import type { Section, VideoDetail, VideoSummary } from './api'
import { listVideos, loadVideo } from './api'
import { clipBadge, fitBadge, seconds } from './badges'
import { BadgeRow } from './BadgeRow'
import { SectionPanel } from './SectionPanel'
import { VisualPreview } from './VisualPreview'

export const App: React.FC = () => {
  const [videos, setVideos] = useState<VideoSummary[]>([])
  const [video, setVideo] = useState<VideoDetail | null>(null)
  const [selected, setSelected] = useState<number | null>(null)
  const [problem, setProblem] = useState<string | null>(null)

  useEffect(() => {
    listVideos()
      .then((result) => {
        setVideos(result.videos)
      })
      .catch((error: unknown) => {
        setProblem(`${String(error)} — is the api running? npm run desk starts both.`)
      })
  }, [])

  const open = (id: string) => {
    setSelected(null)
    loadVideo(id)
      .then(setVideo)
      .catch((error: unknown) => {
        setProblem(String(error))
      })
  }

  /** A pick or a flag changes one section; the list holds the rest as it was. */
  const replace = (section: Section) => {
    setVideo((current) =>
      current === null
        ? current
        : {
            ...current,
            sections: current.sections.map((existing) =>
              existing.index === section.index ? section : existing,
            ),
          },
    )
  }

  const current = video?.sections.find((section) => section.index === selected)

  return (
    <main className="desk">
      <nav className="pane">
        <div className="pane-head">
          <span className="label">videos</span>
          <span className="num">{videos.length}</span>
        </div>
        {problem === null ? null : <p className="problem">{problem}</p>}
        {videos.map((summary) => (
          <button
            key={summary.id}
            type="button"
            className="video"
            aria-current={summary.id === video?.id}
            onClick={() => {
              open(summary.id)
            }}
          >
            <span className="video-id">{summary.id}</span>
            <span className="video-meta">
              <span className="num">{summary.sections} sections</span>
              {summary.flagged > 0 ? (
                <span className="num" style={{ color: 'var(--flagged)' }}>
                  {summary.flagged} flagged
                </span>
              ) : null}
              {summary.narrated ? null : <span>not narrated</span>}
            </span>
          </button>
        ))}
      </nav>

      <section className="pane">
        <div className="pane-head">
          <span className="label">sections</span>
          <span className="num">{video === null ? '—' : video.sections.length}</span>
          {video === null || video.narrated ? null : (
            <span className="label" style={{ color: 'var(--warn)' }}>
              no timeline yet
            </span>
          )}
        </div>
        {video === null ? (
          <p className="empty">Pick a video.</p>
        ) : (
          video.sections.map((section) => (
            <button
              key={section.index}
              type="button"
              className="section"
              aria-current={section.index === selected}
              onClick={() => {
                setSelected(section.index)
              }}
            >
              <VisualPreview
                video={video.id}
                src={section.src}
                kind={section.kind}
                color={section.color}
                size={56}
                version={section.version}
              />
              <span>
                <span className="section-index">
                  {String(section.index).padStart(2, '0')}
                  {section.flagged ? ' · FLAGGED' : ''}
                </span>
                <span className="section-line"> {section.text}</span>
                <BadgeRow
                  badges={[
                    { text: seconds({ value: section.slotSeconds }), tone: 'plain' },
                    // A clip is judged on whether it outlasts its beat, a gif on how often it
                    // comes round inside it.
                    section.kind === 'clip'
                      ? clipBadge({
                          headroom:
                            section.gifSeconds === null || section.slotSeconds === null
                              ? undefined
                              : Math.round((section.gifSeconds - section.slotSeconds) * 10) / 10,
                        })
                      : fitBadge({ repeats: section.repeats }),
                    section.kind === 'clip' ? { text: 'clip', tone: 'plain' } : undefined,
                    section.color === null ? undefined : { text: section.color, tone: 'plain' },
                  ]}
                />
              </span>
            </button>
          ))
        )}
      </section>

      {video === null || current === undefined ? (
        <section className="pane">
          <div className="pane-head">
            <span className="label">gif</span>
          </div>
          <p className="empty">Pick a section to search for its gif.</p>
        </section>
      ) : (
        <SectionPanel video={video.id} section={current} onChanged={replace} />
      )}
    </main>
  )
}
