import { type TypedArray, type StaticFn } from '@dungarees/core/type-util.ts'
import { mapConst, mapConstKeysToEntries, mapObjectFromKeys, objectFromConstEntries, unPrototypeProperties } from '@dungarees/core/util.ts'
import { asyncFunctionToObservable, UnsafeService } from '@dungarees/rxjs/util.ts'
import { glob as libGlob, globSync as libGlobSync } from 'glob'
import { type Stats } from 'node:fs'
import { type Observable, of } from 'rxjs'
import { join } from 'node:path'

export type FilePermissions = {
  read: boolean
  write: boolean
  execute: boolean
}

export type FileStats = {
  isDirectory: boolean
  mode: number
  userId: number
  groupId: number
  permissions: {
    user: FilePermissions
    group: FilePermissions
    others: FilePermissions
  }
}

export type FileSystem = {
  readFileSync: (path: string, encoding: BufferEncoding) => string
  readFileAsync: (path: string, encoding: BufferEncoding) => Promise<string>
  readFile: (path: string, encoding: BufferEncoding) => Observable<string>
  writeFileSync: (path: string, data: string | TypedArray) => void
  writeFileAsync: (path: string, data: string | TypedArray) => Promise<void>
  writeFile: (path: string, data: string | TypedArray) => Observable<void>
  readDirSync: (path: string) => string[]
  readDirAsync: (path: string) => Promise<string[]>
  readDir: (path: string) => Observable<string[]>
  readDirDeepSync: (path: string) => string[]
  readDirDeepAsync: (path: string) => Promise<string[]>
  readDirDeep: (path: string) => Observable<string[]>
  readBulkSync: (paths: string[]) => Record<string, string>
  readBulkAsync: (paths: string[]) => Promise<Record<string, string>>
  readBulk: (paths: string[]) => Observable<Record<string, string>>
  mkdirSync: (path: string) => void
  mkdirAsync: (path: string) => Promise<void>
  mkdir: (path: string) => Observable<void>
  globSync: (path: string) => string[]
  globAsync: (path: string) => Promise<string[]>
  glob: (path: string) => Observable<string[]>
  isExeSync: (path: string) => boolean
  isExeAsync: (path: string) => Promise<boolean>
  isExe: (path: string) => Observable<boolean>
  getStatSync: (path: string) => FileStats
  getStatAsync: (path: string) => Promise<FileStats>
  getStat: (path: string) => Observable<FileStats>
  chmodSync: (path: string, mode: number) => void
  chmodAsync: (path: string, mode: number) => Promise<void>
  chmod: (path: string, mode: number) => Observable<void>
  chownSync: (path: string, uid: number, gid: number) => void
  chownAsync: (path: string, uid: number, gid: number) => Promise<void>
  chown: (path: string, uid: number, gid: number) => Observable<void>
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
  | 'chmodSync'
  | 'chownSync'

type UsedPromisesMethods =
  | 'lstat'
  | 'readdir'
  | 'readlink'
  | 'realpath'
  | 'readFile'
  | 'writeFile'
  | 'mkdir'
  | 'chmod'
  | 'chown'

export type NodeFs =
  Pick<typeof import('fs'), UsedFsMethods>
  & {
    promises: Pick<(typeof import('fs'))['promises'], UsedPromisesMethods>
  }

export const createFileSystem = (fs: NodeFs): UnsafeService<FileSystem> => {
  type IsexeOptions = {
    uid?: number
    gid?: number
    groups?: number[]
  }

  const checkMode = (stat: Stats, options: IsexeOptions) => {
    const myUid = options.uid ?? process.getuid?.()
    const myGroups = options.groups ?? process.getgroups?.() ?? []
    const myGid = options.gid ?? process.getgid?.() ?? myGroups[0]
    if (myUid === undefined || myGid === undefined) {
      throw new Error('cannot get uid or gid')
    }

    const groups = new Set([myGid, ...myGroups])

    const mod = stat.mode
    const uid = stat.uid
    const gid = stat.gid

    const u = parseInt('100', 8)
    const g = parseInt('010', 8)
    const o = parseInt('001', 8)
    const ug = u | g

    return !!(
      mod & o ||
      (mod & g && groups.has(gid)) ||
      (mod & u && uid === myUid) ||
      (mod & ug && myUid === 0)
    )
  }

  const checkStat = (stat: Stats, options: IsexeOptions) =>
    stat.isFile() && checkMode(stat, options)

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

  const readBulkAsync: FileSystem['readBulkAsync'] = async (paths) => {
    return Object.fromEntries(await Promise.all(
      paths.map(async (filePath) => {
        const content = await fs.promises.readFile(filePath, 'utf8')
        return [filePath, content]
      })
    ))
  }

  const readBulkSync: FileSystem['readBulkSync'] = (paths) => {
    return Object.fromEntries(
      paths.map((filePath) => {
        const content = fs.readFileSync(filePath, 'utf8')
        return [filePath, content]
      })
    )
  }

  const isExeSync: FileSystem['isExeSync'] = (path) => {
    const stat = fs.lstatSync(path)
    return checkStat(stat, {})
  }

  const isExeAsync: FileSystem['isExeAsync'] = async (path) => {
    const stat = await fs.promises.lstat(path)
    return checkStat(stat, {})
  }

  const permissionGroupNames = ['user', 'group', 'others'] as const
  const groupSelectors = [0o100, 0o010, 0o001] as const
  const permissionNames = ['read', 'write', 'execute'] as const
  const permissionValues = [4, 2, 1] as const

  const statToFileStats = (stat: Stats): FileStats => {
    const permissions =
      mapObjectFromKeys(permissionGroupNames, (_, index) =>
        mapObjectFromKeys(permissionNames, (_, permissionIndex) =>
          Boolean(stat.mode & groupSelectors[index] * permissionValues[permissionIndex])
        )
      )

    return {
      isDirectory: stat.isDirectory(),
      mode: stat.mode,
      userId: stat.uid,
      groupId: stat.gid,
      permissions,
    }
  }

  const getStatSync: FileSystem['getStatSync'] = (path) => {
    const stat = fs.lstatSync(path)
    return statToFileStats(stat)
  }

  const getStatAsync: FileSystem['getStatAsync'] = async (path) => {
    const stat = await fs.promises.lstat(path)
    return statToFileStats(stat)
  }

  const chmodSync: FileSystem['chmodSync'] = (path, mode) => {
    fs.chmodSync(path, mode)
  }

  const chmodAsync: FileSystem['chmodAsync'] = async (path, mode) => {
    await fs.promises.chmod(path, mode)
  }

  const chownSync: FileSystem['chownSync'] = (path, uid, gid) => {
    fs.chownSync(path, uid, gid)
  }

  const chownAsync: FileSystem['chownAsync'] = async (path, uid, gid) => {
    await fs.promises.chown(path, uid, gid)
  }

  return {
    readFileSync,
    readFileAsync,
    readFile: asyncFunctionToObservable(readFileAsync),
    writeFileSync,
    writeFileAsync,
    writeFile: asyncFunctionToObservable(writeFileAsync),
    readDirSync,
    readDirAsync,
    readDir: asyncFunctionToObservable(readDirAsync),
    readDirDeepSync,
    readDirDeepAsync,
    readDirDeep: asyncFunctionToObservable(readDirDeepAsync),
    readBulkSync,
    readBulkAsync,
    readBulk: asyncFunctionToObservable(readBulkAsync),
    mkdirSync,
    mkdirAsync,
    mkdir: asyncFunctionToObservable(mkdirAsync),
    globAsync: (path) => glob(path),
    globSync: (path) => globSync(path),
    glob: asyncFunctionToObservable(glob),
    isExeSync,
    isExeAsync,
    isExe: asyncFunctionToObservable(isExeAsync),
    getStatSync,
    getStatAsync,
    getStat: asyncFunctionToObservable(getStatAsync),
    chmodSync,
    chmodAsync,
    chmod: asyncFunctionToObservable(chmodAsync),
    chownSync,
    chownAsync,
    chown: asyncFunctionToObservable(chownAsync),
  }
}
