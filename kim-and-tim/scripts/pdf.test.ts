import { createCarouselPdf } from './pdf.ts'

import { crc32, deflateSync } from 'node:zlib'
import { PDFDocument } from 'pdf-lib'
import { describe, expect, test } from 'vitest'

const chunk = ({ type, data }: { type: string; data: Buffer }) => {
  const length = Buffer.alloc(4)
  length.writeUInt32BE(data.length)
  const typeAndData = Buffer.concat([Buffer.from(type, 'ascii'), data])
  const crc = Buffer.alloc(4)
  crc.writeUInt32BE(crc32(typeAndData))
  return Buffer.concat([length, typeAndData, crc])
}

const whitePng = ({ width, height }: { width: number; height: number }) => {
  const header = Buffer.alloc(13)
  header.writeUInt32BE(width, 0)
  header.writeUInt32BE(height, 4)
  header.writeUInt8(8, 8)
  header.writeUInt8(2, 9)
  const row = Buffer.concat([Buffer.from([0]), Buffer.alloc(width * 3, 0xff)])
  return new Uint8Array(
    Buffer.concat([
      Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
      chunk({ type: 'IHDR', data: header }),
      chunk({ type: 'IDAT', data: deflateSync(Buffer.concat(Array(height).fill(row))) }),
      chunk({ type: 'IEND', data: Buffer.alloc(0) }),
    ]),
  )
}

describe('createCarouselPdf', () => {
  test('makes one page per image, each the size of its image', async () => {
    const pdf = await PDFDocument.load(
      await createCarouselPdf({
        pngs: [whitePng({ width: 4, height: 5 }), whitePng({ width: 8, height: 10 })],
      }),
    )
    expect(pdf.getPages().map((page) => page.getSize())).toEqual([
      { width: 4, height: 5 },
      { width: 8, height: 10 },
    ])
  })
})
