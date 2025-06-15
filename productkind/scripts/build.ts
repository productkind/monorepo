import { $ } from 'zx'
import platformsRaw from '../config/platforms.json' with { type: 'json' }
import { z } from 'zod'
import path from 'node:path'
import { rasterizeSvg , type SvgToRasterize } from '@dungarees/zx/image.ts'
import { type FaviconSettings, IconTransformationType, type MasterIcon, generateFaviconFiles } from '@realfavicongenerator/generate-favicon';
import { getNodeImageAdapter, loadAndConvertToSvg } from "@realfavicongenerator/image-adapter-node";
import fs from 'node:fs'
import { createFileSystem } from '@dungarees/fs/service.ts'

const fsService = createFileSystem(fs)

const PlatformNameSchema = z.union([
  z.literal('github'),
  z.literal('substack'),
  z.literal('youtube'),
  z.literal('instagram'),
  z.literal('linkedin'),
  z.literal('meetup'),
  z.literal('website'),
])

const AssetTypeSchema = z.union([
  z.literal('profile'),
  z.literal('cover'),
  z.literal('email-banner'),
  z.literal('wordmark'),
  z.literal('email-footer'),
  z.literal('logo'),
  z.literal('logo-inverted'),
])

const PlatformSchema = z.array(
  z.object({
    platform: PlatformNameSchema,
    profileImages: z.array(
      z.object({
        type: AssetTypeSchema,
        size: z.tuple([z.number(), z.number()]).or(z.number()),
      })
    ),
  })
)

const platforms = PlatformSchema.parse(platformsRaw)

type AssetType = z.infer<typeof AssetTypeSchema>

type PlatformName = z.infer<typeof PlatformNameSchema>

const PRODUCT_BASE_DIR = '../'
const ASSETS_DIR = 'assets'
const SOURCE_DIR = 'src'
const OUTPUT_DIR = 'dist'
const absoluteBaseDir = path.resolve(__dirname, PRODUCT_BASE_DIR);

const logoK: string = path.join(absoluteBaseDir, ASSETS_DIR, SOURCE_DIR, 'logo', 'logo-k.svg')

const LOGO_K_PLATFORMS = ['substack', 'youtube', 'linkedin', 'github'] as const;

const asset_to_input_image: Partial<Record<`${PlatformName}-${AssetType}`, string>> = {
  ...(fromEntriesConst(LOGO_K_PLATFORMS.map((p) => [`${p}-profile` as const, logoK]))),
  'instagram-profile': path.join(absoluteBaseDir, ASSETS_DIR, SOURCE_DIR, 'logo', 'logo-kim-and-tim-by-productkind.svg'),
  'substack-wordmark': path.join(absoluteBaseDir, ASSETS_DIR, SOURCE_DIR, 'logo', 'logo-thoughts-by-productkind-linear.svg'),
  'substack-email-banner': path.join(absoluteBaseDir, ASSETS_DIR, SOURCE_DIR, 'logo', 'logo-thoughts-by-productkind-gradient-background.svg'),
  'substack-cover': path.join(absoluteBaseDir, ASSETS_DIR, SOURCE_DIR, 'logo', 'logo-thoughts-by-productkind-gradient-background-square.svg'),
  'meetup-cover': path.join(absoluteBaseDir, ASSETS_DIR, SOURCE_DIR, 'logo', 'logo-seminars-by-productkind-gradient.svg'),
  'website-logo': path.join(absoluteBaseDir, ASSETS_DIR, SOURCE_DIR, 'logo', 'logo-crop-to-content.svg'),
  'website-logo-inverted': path.join(absoluteBaseDir, ASSETS_DIR, SOURCE_DIR, 'logo', 'logo-crop-to-content-monochrome-white.svg'),
}

const images: SvgToRasterize[] = platforms.flatMap((platform) =>
  platform.profileImages.map((profileImage) => {
    const isSingleDimension = typeof profileImage.size === 'number'
    const size = isSingleDimension ? String(profileImage.size) : `${profileImage.size[0]}x${profileImage.size[1]}`
    const outputFileName = `${platform.platform}-${profileImage.type}-${size}.png`
    const outputFilePath = path.join(absoluteBaseDir, ASSETS_DIR, OUTPUT_DIR, outputFileName)
    const inputFilePath = asset_to_input_image[`${platform.platform}-${profileImage.type}` as const]
    return {
      inputFilePath,
      outputFilePath,
      size: profileImage.size,
    }
 })
)
.filter(filterDefinedByKey('inputFilePath'))

// Ensure the output directory exists
await $`mkdir -p ${path.join(absoluteBaseDir, ASSETS_DIR, OUTPUT_DIR)}`

for (const image of images) {
  console.log(`Exporting ${image.outputFilePath}...`);
  await rasterizeSvg(image);
}


function fromEntriesConst<
  const T extends readonly (readonly [PropertyKey, unknown])[]
>(entries: T): {
  [K in T[number] as K[0]]: K[1];
} {
  return Object.fromEntries(entries) as any;
}

function filterDefinedByKey<
  K extends string,
  T extends Record<K, any>
>(
  key: K
): (item: T) => item is T & { [P in K]-?: Exclude<T[P], undefined> } {
  return (item): item is T & { [P in K]-?: Exclude<T[P], undefined> } =>
    item[key] !== undefined;
}

const imageAdapter = await getNodeImageAdapter();

const masterIcon: MasterIcon = {
  icon: await loadAndConvertToSvg(path.join(absoluteBaseDir, ASSETS_DIR, SOURCE_DIR, 'logo', 'logo-k-crop-to-content.svg')),
}

const faviconSettings: FaviconSettings = {
  icon: {
    desktop: {
      regularIconTransformation: {
        type: IconTransformationType.Background,
        backgroundColor: "#ffffff",
        backgroundRadius: 0.4,
        imageScale: 0.8,
      },
      darkIconType: "none",
    },
    touch: {
      transformation: {
        type: IconTransformationType.Background,
        backgroundColor: "#ffffff",
        backgroundRadius: 0,
        imageScale: 0.7,
      },
      appTitle: "productkind"
    },
    webAppManifest: {
      transformation: {
        type: IconTransformationType.Background,
        backgroundColor: "#ffffff",
        backgroundRadius: 0,
        imageScale: 0.7,
      },
      backgroundColor: "#ffffff",
      themeColor: "#ffffff",
      name: "productkind",
      shortName: "productkind"
    }
  },
  path: "/",
};

await $`mkdir -p ${path.join(absoluteBaseDir, ASSETS_DIR, OUTPUT_DIR, 'favicon')}`

// Generate files
const files = await generateFaviconFiles(masterIcon, faviconSettings, imageAdapter);
// Do something with the files: store them, etc.
Object.entries(files).forEach(([name, content]) => {
  const outputFilePath = path.join(absoluteBaseDir, ASSETS_DIR, OUTPUT_DIR, 'favicon', name)
  console.log(`Writing ${outputFilePath}`)
  fsService.writeFileSync(outputFilePath, content)
})
