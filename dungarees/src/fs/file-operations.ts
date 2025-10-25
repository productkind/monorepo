import type { FileSystem } from './service.ts';
import {
  catchAndRethrow,
  createGetTransformSet,
  createGetTransformSetContext,
  type GetTransformSetContext,
  type GetTransformSet
} from '@dungarees/rxjs/util.ts'
import { type Observable, map, mergeMap, forkJoin } from 'rxjs'
import path from 'path'

type Options = {
  input: string;
  output: string;
  readError?: (input: string) => string;
  writeError?: (output: string) => string;
}

type FileOperations = {
  transformFile(
    options: Options,
  ): GetTransformSet<string, string>
  transformFileContext<CONTEXT>(
    options: Options,
  ): GetTransformSetContext<CONTEXT, string, string>
  copyFile(
    source: string,
    destination: string,
  ): Observable<void>
  copyDirectory(
    source: string,
    destination: string,
    exclude?: string[],
  ): Observable<void>
}

export const createFileOperations = (fileSystem: FileSystem): FileOperations => {
  const transformFile: FileOperations['transformFile'] = ({ input, output, readError, writeError }: Options): GetTransformSet<string, string> => {
    const readFile = () => fileSystem.readFile(input, 'utf-8').pipe(
      catchAndRethrow((cause) => new Error(readError?.(input) ?? `Could not read input: ${input}`, { cause })),
    )
    const writeFile = (content: string) => fileSystem.writeFile(output, content).pipe(
      catchAndRethrow((cause) => new Error(writeError?.(output) ?? `Could not write output: ${output}`, { cause })),
    )
    return createGetTransformSet(readFile, writeFile)
  }

  const transformFileContext: FileOperations['transformFileContext'] = <CONTEXT>({ input, output, readError, writeError }: Options) => {
    const readFile = () => fileSystem.readFile(input, 'utf-8').pipe(
      catchAndRethrow((cause) => new Error(readError?.(input) ?? `Could not read input: ${input}`, { cause })),
    )
    const writeFile = (content: string) => fileSystem.writeFile(output, content).pipe(
      catchAndRethrow((cause) => new Error(writeError?.(output) ?? `Could not write output: ${output}`, { cause })),
    )
    return createGetTransformSetContext<CONTEXT, string, string>(readFile, writeFile)
  }

  const copyFile: FileOperations['copyFile'] = (source: string, destination: string): Observable<void> => {
    const destinationDir = path.dirname(destination)
    const transform = transformFile({ input: source, output: destination })
    return fileSystem.mkdir(destinationDir).pipe(
      mergeMap(() => transform()),
      map(() => undefined),
    )
  }

  const copyDirectory: FileOperations['copyDirectory'] = (source: string, destination: string, exclude: string[] = []): Observable<void> => {
    const excludeGlobs = exclude.map(pattern => fileSystem.glob(path.join(source, pattern)))
    return forkJoin([
      fileSystem.readDirDeep(source),
      ...excludeGlobs,
    ] as const).pipe(
      map(([allFiles, ...excludedFilesArrays]) => {
        const excludedFiles = new Set(excludedFilesArrays.flat())
        return allFiles.filter(file => !excludedFiles.has(file))
      }),
      map(files => files.map(file => ({
        from: file,
        to: file.replace(source, destination),
      }))),
      mergeMap(filePairs =>
        forkJoin(
          filePairs.map(({ from, to }) =>
            copyFile(from, to)
          )
        )
      ),
      map(() => undefined),
    )
  }

  return {
    transformFile,
    transformFileContext,
    copyFile,
    copyDirectory,
  }
}
