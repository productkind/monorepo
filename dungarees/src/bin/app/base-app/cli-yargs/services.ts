import type { CliCommands } from '@dungarees/cli-command/service.ts'
import type { RendererProcess } from '@dungarees/cli/yargs-renderer.ts'
import type { FileSystemService } from '@dungarees/fs/service.ts'

export type DungareesBinServices = {
  fileSystem: FileSystemService
  process: { argv: string[] } & RendererProcess
} & CliCommands
