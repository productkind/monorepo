import path from 'node:path'
import { parse } from 'yaml'
import { z } from 'zod'

const altSchema = z.string().nullable()

const instagramPostSchema = z.object({
  url: z.string(),
  posted: z.string(),
  caption: z.string(),
  alt: z.object({
    panels: z.array(altSchema),
    strip: altSchema,
  }),
})

export type ReleaseDescription = {
  url: string
  posted: string
  caption: string
  images: { file: string; alt: string | null }[]
  linkedIn: { file: string; pages: string[] }
}

export const describeRelease = ({
  namePrefix,
  panelFiles,
  instagramYaml,
}: {
  namePrefix: string
  panelFiles: string[]
  instagramYaml: string
}): ReleaseDescription => {
  const post = instagramPostSchema.parse(parse(instagramYaml))
  if (post.alt.panels.length !== panelFiles.length) {
    throw new Error(
      `${namePrefix}: instagram.yaml has ${post.alt.panels.length} panel alt texts for ${panelFiles.length} panels`,
    )
  }
  const panelPngs = panelFiles.map(
    (filePath) => namePrefix + path.basename(filePath).replace('.svg', '.png'),
  )
  const stripPng = namePrefix + 'strip.png'
  return {
    url: post.url,
    posted: post.posted,
    caption: post.caption,
    images: [
      ...panelPngs.map((file, index) => ({ file, alt: post.alt.panels[index] })),
      { file: stripPng, alt: post.alt.strip },
    ],
    linkedIn: {
      file: namePrefix + 'linkedin.pdf',
      pages: panelPngs.length > 1 ? [...panelPngs, stripPng] : panelPngs,
    },
  }
}
