import type { RendererProcess } from '@dungarees/cli/yargs-renderer.ts'
import type { FileSystemService } from '@dungarees/fs/service.ts'
import type { SubProcessService } from '@dungarees/sub-process/type.ts'

export type DungareesBinServices = {
  fileSystem: FileSystemService
  subProcess: SubProcessService
  process: { argv: string[] } & RendererProcess
}
