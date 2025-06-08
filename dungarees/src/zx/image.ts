import { $ } from 'zx'

export type SvgToRasterize = {
  inputFilePath: string,
  outputFilePath: string,
  size: [number, number],
  background?: string,
}

export const rasterizeSvg = async ({
  inputFilePath,
  outputFilePath,
  size: [width, height],
  background = 'ffffffff'
}: Image) => {
  await $`inkscape --export-type png --export-filename ${outputFilePath} --export-background ${background} -w ${width} -h ${height} ${inputFilePath}`
}
