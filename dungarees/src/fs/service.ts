import { type TypedArray } from '@dungarees/core/type-util.ts'
import { unPrototypeProperties } from '@dungarees/core/util.ts'
import { asyncFunctionToObservable } from '@dungarees/rxjs/util.ts'
import { glob as libGlob, globSync as libGlobSync } from 'glob'
import { type Observable } from 'rxjs'
import { join } from 'node:path'

export type FileSystem = {
  readFileSync: (path: string, encoding: BufferEncoding) => string
  writeFileSync: (path: string, data: string | TypedArray) => void
  readDirSync: (path: string) => string[]
  readDirDeepSync: (path: string) => string[]
  mkdirSync: (path: string) => void
  globSync: (path: string) => string[]
  writeFileAsync: (path: string, data: string | TypedArray) => Promise<void>
  readFileAsync: (path: string, encoding: BufferEncoding) => Promise<string>
  readDirAsync: (path: string) => Promise<string[]>
  readDirDeepAsync: (path: string) => Promise<string[]>
  mkdirAsync: (path: string) => Promise<void>
  globAsync: (path: string) => Promise<string[]>
  readFile: (path: string, encoding: BufferEncoding) => Observable<string>
  writeFile: (path: string, data: string | TypedArray) => Observable<void>
  readDir: (path: string) => Observable<string[]>
  readDirDeep: (path: string) => Observable<string[]>
  mkdir: (path: string) => Observable<void>
  glob: (path: string) => Observable<string[]>
}

type UsedFsMethods =
  | 'writeFileSync'
  | 'readFileSync'
  | 'readdirSync'
  | 'readdir'
  | 'readlinkSync'
  | 'realpathSync'
  | 'lstatSync'
  | 'mkdirSync'

type UsedPromisesMethods =
  | 'lstat'
  | 'readdir'
  | 'readlink'
  | 'realpath'
  | 'readFile'
  | 'writeFile'
  | 'mkdir'

export type NodeFs =
  Pick<typeof import('fs'), UsedFsMethods>
  & {
    promises: Pick<(typeof import('fs'))['promises'], UsedPromisesMethods>
  }

export const createFileSystem = (fs: NodeFs): FileSystem => {
  const fsForGlob = {
    ...unPrototypeProperties(fs, [
      'lstatSync',
      'readdir',
      'readdirSync',
      'readlinkSync',
      'realpathSync',
    ]),
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

  const pathToString = (path: string) => path.toString()

  const readFileSync: FileSystem['readFileSync'] = (path, encoding) =>
    fs.readFileSync(path, encoding).toString()

  const writeFileSync: FileSystem['writeFileSync'] = (path, data) => fs.writeFileSync(path, data)

  const readDirSync: FileSystem['readDirSync'] = (path) =>
    fs.readdirSync(path).map(pathToString)

  const readDirDeepSync = (path: string): string[] => {
    const entries = fs.readdirSync(path, { recursive: true, withFileTypes: true })
    return entries
      .filter(entry => entry.isFile())
      .map(entry => join(entry.parentPath, entry.name))
  }


  const mkdirSync: FileSystem['mkdirSync'] = (path) => {
    fs.mkdirSync(path, { recursive: true })
  }

  const readFileAsync: FileSystem['readFileAsync'] = async (path, encoding) => {
    const content = await fs.promises.readFile(path, encoding)
    return content.toString()
  }

  const writeFileAsync: FileSystem['writeFileAsync'] = async (path, data) => {
    await fs.promises.writeFile(path, data)
  }

  const readDirAsync: FileSystem['readDirAsync'] = async (path) => {
    const files = await fs.promises.readdir(path)
    return files.map(pathToString)
  }

  const readDirDeepAsync = async (path: string): Promise<string[]> => {
    const entries = await fs.promises.readdir(path, { recursive: true, withFileTypes: true })
    return entries
      .filter(entry => entry.isFile())
      .map(entry => join(entry.parentPath, entry.name))
  }

  const mkdirAsync: FileSystem['mkdirAsync'] = async (path) => {
    await fs.promises.mkdir(path, { recursive: true })
  }

  return {
    readFileSync,
    writeFileSync,
    readDirSync,
    readDirDeepSync,
    mkdirSync,
    readFileAsync,
    writeFileAsync,
    readDirAsync,
    readDirDeepAsync,
    mkdirAsync,
    globAsync: (path) => glob(path),
    globSync: (path) => globSync(path),
    readFile: asyncFunctionToObservable(readFileAsync),
    writeFile: asyncFunctionToObservable(writeFileAsync),
    readDir: asyncFunctionToObservable(readDirAsync),
    readDirDeep: asyncFunctionToObservable(readDirDeepAsync),
    mkdir: asyncFunctionToObservable(mkdirAsync),
    glob: asyncFunctionToObservable(glob),
  }
}
