import { describe, expect, test } from 'vitest'

import { CAPTION_BAND_HEIGHT, contentRegion, placeMedia } from './safe-zone'

describe('contentRegion', () => {
  test('runs from below the top platform bar to the top of the captions', () => {
    expect(contentRegion({})).toEqual({ top: 250, bottom: 1212, height: 962 })
  })

  test('grows when the captions are given fewer lines', () => {
    expect(contentRegion({ captionLines: 1 })).toEqual({ top: 250, bottom: 1356, height: 1106 })
  })
})

describe('placeMedia', () => {
  test('sits landscape content on top of the captions, with the slack above it', () => {
    // 16:9 filled to the frame width is 607.5 tall, which fits the 962 region.
    expect(placeMedia({ media: { width: 480, height: 270 } })).toEqual({
      width: 1080,
      height: 607.5,
      top: 1212 - 607.5,
    })
  })

  test('leaves no gap between the content and the captions', () => {
    const placed = placeMedia({ media: { width: 800, height: 600 } })

    expect(placed.top + placed.height).toBe(contentRegion({}).bottom)
  })

  test('overflows the region equally when the content is taller than it', () => {
    const placed = placeMedia({ media: { width: 1080, height: 1500 } })
    const region = contentRegion({})

    expect(placed).toEqual({ width: 1080, height: 1500, top: -19 })
    expect(region.top - placed.top).toBe(placed.top + placed.height - region.bottom)
  })

  test('leaves frame-shaped content exactly where it is, covering the whole frame', () => {
    expect(placeMedia({ media: { width: 1080, height: 1920 } })).toEqual({
      width: 1080,
      height: 1920,
      top: 0,
    })
  })

  test('treats any frame-shaped content as full frame, whatever it was exported at', () => {
    expect(placeMedia({ media: { width: 2160, height: 3840 } })).toEqual({
      width: 1080,
      height: 1920,
      top: 0,
    })
  })

  test('top-aligns content that exactly fills the region, since both edges meet', () => {
    const placed = placeMedia({ media: { width: 1080, height: 962 } })

    expect(placed).toEqual({ width: 1080, height: 962, top: 250 })
  })

  test('applies an offset on top of the placement, for when it is still needed', () => {
    const placed = placeMedia({ media: { width: 480, height: 270 }, offset: -50 })

    expect(placed.top).toBe(1212 - 607.5 - 50)
  })

  test('reserves two caption lines by default', () => {
    expect(CAPTION_BAND_HEIGHT).toBe(288)
  })
})
