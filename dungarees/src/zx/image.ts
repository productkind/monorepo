import { $ } from 'zx'

export type SvgToRasterize = {
  inputFilePath: string,
  outputFilePath: string,
  size: [number, number] | number,
  background?: string,
}

export const rasterizeSvg = async ({
  inputFilePath,
  outputFilePath,
  size,
  background
}: SvgToRasterize) => {
  const isSingleDimension = typeof size === 'number'
  const isBackgroundDefined = background !== undefined
  const baseArgs = [
    '--export-type', 'png',
    '--export-filename', outputFilePath,
    ...(isBackgroundDefined ? ['--export-background', background] : []),
    '--export-width', isSingleDimension ? size : size[0],
    ...(isSingleDimension ? [] : ['--export-height', size[1]]),
    inputFilePath
  ]

  // check if file exists first
  await $`echo "Checking if input file exists: ${inputFilePath}"`.verbose()
  await $`test -f ${inputFilePath}`

  // generate
  await $`inkscape ${baseArgs}`
}
