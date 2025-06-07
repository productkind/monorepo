import { $ } from 'zx'
import platformsRaw from '../config/platforms.json' with { type: 'json' }
import { z } from 'zod'
import path from 'node:path'

const PlatformNameSchema = z.union([
  z.literal('github'),
  z.literal('substack'),
  z.literal('youtube'),
  z.literal('instagram'),
  z.literal('linkedin'),
  z.literal('meetup'),
])

const AssetTypeSchema = z.union([
  z.literal('profile'),
  z.literal('cover'),
  z.literal('email-banner'),
  z.literal('watermark'),
  z.literal('email-footer'),
])

const PlatformSchema = z.array(
  z.object({
    platform: PlatformNameSchema,
    profileImages: z.array(
      z.object({
        type: AssetTypeSchema,
        size: z.tuple([z.number(), z.number()]),
      })
    ),
  })
)

const platforms = PlatformSchema.parse(platformsRaw)

type AssetType = z.infer<typeof AssetTypeSchema>

type PlatformName = z.infer<typeof PlatformNameSchema>

type Image = {
  inputFilePath: string,
  outputFilePath: string,
  size: [number, number],
  background?: string,
}

const PRODUCT_BASE_DIR = '../'
const ASSETS_DIR = 'assets'
const SOURCE_DIR = 'src'
const OUTPUT_DIR = 'dist'

const exportImage = async ({
  inputFilePath,
  outputFilePath,
  size: [width, height],
  background = 'ffffffff'
}: Image) => {
  await $`inkscape --export-type png --export-filename ${outputFilePath} --export-background ${background} -w ${width} -h ${height} ${inputFilePath}`
}

const logoK: string = path.join(PRODUCT_BASE_DIR, ASSETS_DIR, SOURCE_DIR, 'logo', 'logo-k.svg')

const LOGO_K_PLATFORMS = ['substack', 'youtube', 'instagram', 'linkedin', 'github'] as const;

const asset_to_input_image: Partial<Record<`${PlatformName}-${AssetType}`, string>> = {
  ...(fromEntriesConst(LOGO_K_PLATFORMS.map((p) => [`${p}-profile` as const, logoK]))),
  'substack-watermark': path.join(PRODUCT_BASE_DIR, ASSETS_DIR, SOURCE_DIR, 'logo', 'logo-thoughts-by-productkind-linear.svg'),
  'substack-email-banner': path.join(PRODUCT_BASE_DIR, ASSETS_DIR, SOURCE_DIR, 'logo', 'logo-thoughts-by-productkind-gradient-background.svg'),
}

const images: Image[] = platforms.flatMap((platform) =>
  platform.profileImages.map((profileImage) => {
    const outputFileName = `${platform.platform}-${profileImage.type}-${profileImage.size[0]}x${profileImage.size[1]}.png`
    const outputFilePath = path.join(PRODUCT_BASE_DIR, ASSETS_DIR, OUTPUT_DIR, outputFileName)
    const inputFilePath = asset_to_input_image[`${platform.platform}-${profileImage.type}` as const]
    return {
      inputFilePath,
      outputFilePath,
      size: profileImage.size,
    }
 })
)
.filter(filterDefinedByKey('inputFilePath'));

// Ensure the output directory exists
await $`mkdir -p ${path.join(PRODUCT_BASE_DIR, ASSETS_DIR, OUTPUT_DIR)}`;

for (const image of images) {
  console.log(`Exporting ${image.outputFilePath}...`);
  await exportImage(image);
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
