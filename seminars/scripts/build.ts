import eventsRaw from '../content/events.json' with { type: 'json' }
import { z } from 'zod'
import { createFileSystem } from '@dungarees/fs/service.ts'
import fs from 'node:fs'
import path from 'node:path'
import {rasterizeSvg} from '@dungarees/zx/image.ts'
import { $ } from 'zx'

const fsService = createFileSystem(fs)

const EventBaseSchema = z.object({
  id: z.number(),
  date: z.string().date(),
  venue: z.string(),
  address: z.string(),
})

const EventSchema = EventBaseSchema.extend({
  cover: z.literal('cover-seminars-by-productkind-two-line-title-with-sponsor-logos').or(z.literal('cover-seminars-by-productkind-two-line-title')),
  title: z.tuple([z.string(), z.string()])
}).or(EventBaseSchema.extend({
  cover: "cover-seminars-by-productkind-one-line-title",
  title: z.tuple([z.string()])
}).or(EventBaseSchema.extend({
  cover: z.literal('cover-seminars-by-productkind-three-line-title'),
  title: z.tuple([z.string(), z.string(), z.string()])
})))


const PRODUCT_BASE_DIR = '../'
const ASSETS_DIR = 'assets'
const SOURCE_DIR = 'src'
const OUTPUT_DIR = 'dist'
const absoluteBaseDir = path.resolve(__dirname, PRODUCT_BASE_DIR);


const EventsSchema = z.array(EventSchema)

const events = EventsSchema.parse(eventsRaw)

// Ensure the output directory exists
await $`mkdir -p ${path.join(absoluteBaseDir, ASSETS_DIR, OUTPUT_DIR)}`

events.forEach(async (event) => {
  console.log(`Generating cover for event: ${event.title} on ${event.date}`);
  const rawSvgPath = path.join(absoluteBaseDir, ASSETS_DIR, SOURCE_DIR, `${event.cover}.svg`)
  const content = fsService.readFileSync(rawSvgPath, 'utf-8')
  const substitutedContent = event.title.reduce((acc, line, index) => {
    return acc.replace(`LINE-${index + 1}`, line)
  }, content)
  const outputFileName = `event-${String(event.id).padStart(3, '0')}-${event.date}.svg`
  const outputSvgPath = path.join(absoluteBaseDir, ASSETS_DIR, OUTPUT_DIR, outputFileName)
  fsService.writeFileSync(outputSvgPath, substitutedContent)
  const outputPngPath = outputSvgPath.replace('.svg', '.png')
  await rasterizeSvg({
    inputFilePath: outputSvgPath,
    outputFilePath: outputPngPath,
    size: [1200, 675],
  })
})
