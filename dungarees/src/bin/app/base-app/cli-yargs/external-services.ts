import type { FileSystem } from '@dungarees/fs/service.ts'
import type { SubProcessService } from '@dungarees/sub-process/type.ts'

export type DungareesBinExternalServices = {
  fileSystem: FileSystem
  subProcess: SubProcessService
}
