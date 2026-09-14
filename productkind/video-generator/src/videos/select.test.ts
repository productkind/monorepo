import { defineVideo, gif } from '../narration/definition'
import { selectVideos } from './select'

import { describe, expect, it } from 'vitest'

const video = ({ id }: { id: string }) =>
  defineVideo({
    id,
    voice: 'chloe',
    model: 'eleven_v3',
    sections: [{ text: 'A line.', visual: gif({ src: 'a.gif' }) }],
  })

const VIDEOS = [video({ id: 'hook-ai-news-01' }), video({ id: 'hook-ai-news-02' })]

describe('selectVideos', () => {
  it('builds every video when nothing is named', () => {
    expect(selectVideos({ videos: VIDEOS, only: [] }).map((one) => one.id)).toEqual([
      'hook-ai-news-01',
      'hook-ai-news-02',
    ])
  })

  it('builds only the videos named', () => {
    expect(
      selectVideos({ videos: VIDEOS, only: ['hook-ai-news-02'] }).map((one) => one.id),
    ).toEqual(['hook-ai-news-02'])
  })

  // A typo would otherwise narrate everything, which is the expensive mistake.
  it('refuses a name that matches no video', () => {
    expect(() => selectVideos({ videos: VIDEOS, only: ['hook-ai-news-99'] })).toThrow(
      /hook-ai-news-99/,
    )
  })
})
