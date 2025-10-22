import type { FileSystem } from './service.ts';
import {
  catchAndRethrow,
  createGetTransformSet,
  createGetTransformSetContext,
  type GetTransformSetContext,
  type GetTransformSet
} from '@dungarees/rxjs/util.ts'
import type { Observable } from 'rxjs';

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
  readDirDeep(path: string): Observable<string[]>
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

  return {
    transformFile,
    transformFileContext,
  }
}
