import { type TypedArray } from '@dungarees/core/type-util.ts'
import { unPrototypeProperties } from '@dungarees/core/util.ts'
import { glob as libGlob, globSync as libGlobSync } from 'glob'

export type FileSystem = {
  writeFileSync: (path: string, data: string | TypedArray) => void
  readFileSync: (path: string, encoding: BufferEncoding) => string
  readDirSync: (path: string) => string[]
  glob: (path: string) => Promise<string[]>
  globSync: (path: string) => string[]
}

export type NodeFs =
  Pick<typeof import('fs'), 'writeFileSync' | 'readFileSync' | 'readdirSync' | 'readdir' | 'readlinkSync' | 'realpathSync' | 'lstatSync' >
  & {
    promises: Pick<(typeof import('fs'))['promises'], 'lstat' | 'readdir' | 'readlink' | 'realpath' >
  }

export const createFileSystem = (fs: NodeFs): FileSystem => {
  const fsForGlob = {
    ...unPrototypeProperties(fs, ['lstatSync', 'readdir', 'readdirSync', 'readlinkSync', 'realpathSync']),
    promises: unPrototypeProperties(fs.promises, ['lstat', 'readdir', 'readlink', 'realpath']),
  }

  const glob = async (path: string) => {
    return libGlob(path, {
      fs: fsForGlob,
    })
  }
  const globSync = (path: string) => {
    return libGlobSync(path, {
      fs: fsForGlob,
    })
  }

  return {
    writeFileSync: (path, data) => fs.writeFileSync(path, data),
    readFileSync: (path, encoding) => fs.readFileSync(path, encoding).toString(),
    readDirSync: (path) => fs.readdirSync(path).map((item) => item.toString()),
    glob: (path) => glob(path),
    globSync: (path) => globSync(path),
  }
}
