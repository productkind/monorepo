import type { FileSystem } from "@dungarees/fs/service.ts"
import type {ProcessService} from "@dungarees/sub-process/type.ts"

export type DungareesBinExternalServices = {
  fileSystem: FileSystem
  process: ProcessService
}
