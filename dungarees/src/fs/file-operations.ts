import {FileSystem} from './service';
import {catchAndRethrow, createGetTransformSet, type GetTransformSet} from '@dungarees/rxjs/util'

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

  return {
    transformFile,
  }
}
