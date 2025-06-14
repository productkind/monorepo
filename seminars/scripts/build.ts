import eventsRaw from '../content/events.json' with { type: 'json' }
import { z } from 'zod'
import { createFileSystem } from '@dungarees/fs/service.ts'
import fs from 'node:fs'
import path from 'node:path'
import { rasterizeSvg } from '@dungarees/zx/image.ts'
import { $ } from 'zx'
import qrcode from 'qrcode'
import { DOMParser, XMLSerializer } from '@xmldom/xmldom'

const fsService = createFileSystem(fs)

const EventBaseSchema = z.object({
  id: z.number(),
  date: z.string().date(),
  venue: z.string(),
  address: z.string(),
  registerForm: z.string().url().optional(), // optional since old events may not have it
})

const EventSchema = z.union([
  EventBaseSchema.extend({
    cover: z.union([
      z.literal('cover-seminars-by-productkind-two-line-title-with-sponsor-logos'),
      z.literal('cover-seminars-by-productkind-two-line-title'),
    ]),
    title: z.tuple([z.string(), z.string()]),
  }),
  EventBaseSchema.extend({
    cover: z.literal('cover-seminars-by-productkind-one-line-title'),
    title: z.tuple([z.string()]),
  }),
  EventBaseSchema.extend({
    cover: z.literal('cover-seminars-by-productkind-three-line-title'),
    title: z.tuple([z.string(), z.string(), z.string()]),
  }),
])

const PRODUCT_BASE_DIR = '../'
const ASSETS_DIR = 'assets'
const SOURCE_DIR = 'src'
const OUTPUT_DIR = 'dist'
const absoluteBaseDir = path.resolve(__dirname, PRODUCT_BASE_DIR)

const EventsSchema = z.array(EventSchema)
const events = EventsSchema.parse(eventsRaw)

// Ensure output directory exists
await $`mkdir -p ${path.join(absoluteBaseDir, ASSETS_DIR, OUTPUT_DIR)}`

const parser = new DOMParser()
const serializer = new XMLSerializer()

for (const event of events) {
  {
    console.log(`Generating cover for event: ${event.title.join(' ')} on ${event.date}`)

    const rawSvgPath = path.join(absoluteBaseDir, ASSETS_DIR, SOURCE_DIR, `${event.cover}.svg`)
    const content = fsService.readFileSync(rawSvgPath, 'utf-8')
    const substitutedContent = event.title.reduce((acc, line, index) => {
      return acc.replace(`LINE-${index + 1}`, line)
    }, content)

    const outputFileName = `event-cover-${String(event.id).padStart(3, '0')}-${event.date}.svg`
    const outputSvgPath = path.join(absoluteBaseDir, ASSETS_DIR, OUTPUT_DIR, outputFileName)
    fsService.writeFileSync(outputSvgPath, substitutedContent, 'utf-8')

    const outputPngPath = outputSvgPath.replace('.svg', '.png')
    await rasterizeSvg({
      inputFilePath: outputSvgPath,
      outputFilePath: outputPngPath,
      size: [1200, 675],
    })
  }

  // ----- NEW QR CODE COVER GENERATION -----
  if (event.registerForm) {
    const fixedTemplatePath = path.join(absoluteBaseDir, ASSETS_DIR, SOURCE_DIR, 'cover-seminars-by-productkind-qr.svg')
    const rawSvgTemplate = fsService.readFileSync(fixedTemplatePath, 'utf-8')

    const substitutedContent = event.title.reduce((acc, line, index) => {
      return acc.replace(`LINE-${index + 1}`, line)
    }, rawSvgTemplate)

    const doc = parser.parseFromString(substitutedContent, 'image/svg+xml')
    const root = doc.documentElement

    // Generate QR SVG
    const qrSvgStr = await qrcode.toString(event.registerForm, { type: 'svg' })
    const qrDoc = parser.parseFromString(qrSvgStr, 'image/svg+xml')
    const qrSvg = qrDoc.documentElement

    // Dimensions of the main SVG
    let width = parseFloat(root.getAttribute('width') || '0')
    let height = parseFloat(root.getAttribute('height') || '0')
    const viewBox = root.getAttribute('viewBox')
    if ((!width || !height) && viewBox) {
      const [, , vbWidth, vbHeight] = viewBox.split(/\s+/).map(Number)
      width = width || vbWidth
      height = height || vbHeight
    }

    // Dimensions of the QR SVG
    const qrViewBox = qrSvg.getAttribute('viewBox')
    let qrWidth = 0
    let qrHeight = 0
    if (qrViewBox) {
      const parts = qrViewBox.split(/\s+/).map(Number)
      qrWidth = parts[2]
      qrHeight = parts[3]
    } else {
      qrWidth = parseFloat(qrSvg.getAttribute('width') || '0')
      qrHeight = parseFloat(qrSvg.getAttribute('height') || '0')
    }

    // Place QR in bottom-left with padding and scaling
    const padding = 10
    const qrScale = 3.6
    const qrHeightInSvgUnits = qrHeight * qrScale
    const y = height - qrHeightInSvgUnits - padding

    const qrGroup = doc.createElementNS('http://www.w3.org/2000/svg', 'g')
    qrGroup.setAttribute('transform', `translate(${padding}, ${y}) scale(${qrScale})`)

    Array.from(qrSvg.childNodes).forEach(node => {
      if (node.nodeType === 1 || node.nodeType === 3) {
        qrGroup.appendChild(doc.importNode(node, true))
      }
    })
    root.appendChild(qrGroup)

    const outputFileName = `event-qr-${String(event.id).padStart(3, '0')}-${event.date}.svg`
    const outputSvgPath = path.join(absoluteBaseDir, ASSETS_DIR, OUTPUT_DIR, outputFileName)
    fsService.writeFileSync(outputSvgPath, serializer.serializeToString(doc), 'utf-8')

    const outputPngPath = outputSvgPath.replace('.svg', '.png')
    await rasterizeSvg({
      inputFilePath: outputSvgPath,
      outputFilePath: outputPngPath,
      size: [1200, 675],
    })

    console.log(`✅ Generated QR cover: ${outputFileName} and PNG`)
  }
}

