import type { CliCommandsService } from '@dungarees/cli-command/service.ts'
import type { FileSystemService } from '@dungarees/fs/service.ts'
import type { SubProcessService } from '@dungarees/sub-process/type.ts'

export type DungareesBinServices = {
  fileSystem: FileSystemService
  subProcess: SubProcessService
  cliCommands: CliCommandsService
}
