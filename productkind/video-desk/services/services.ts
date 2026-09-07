import type { FileSystemService } from '@dungarees/fs/service.ts'
import type { SubProcessService } from '@dungarees/sub-process/type.ts'

/**
 * What the desk needs from the world. Each field is the boundary as it is: the pixel work is a
 * subprocess because ImageMagick decodes gifs and nothing in the browser or in node does it as
 * well, and searching is `fetch` because that is all a provider is.
 */
export type VideoDeskServices = {
  fileSystem: FileSystemService
  subProcess: SubProcessService
  http: { fetch: typeof fetch }
  clock: { now: () => Date }
  env: Record<string, string | undefined>
}
