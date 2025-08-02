import { switchMap } from 'rxjs/operators';
import {FileSystem} from './service';
import {type OperatorFunction, type Observable } from 'rxjs';
import {catchAndRethrow} from '@dungarees/rxjs/util';

type Options = {
  input: string;
  output: string;
  readError?: (input: string) => string;
  writeError?: (output: string) => string;
}

type FileOperations = {
  transformFile(
    options: Options,
  ): Observable<void>
  transformFile(
    options: Options,
    operator: OperatorFunction<string, string>
  ): Observable<void>
  transformFile<A>(
    options: Options,
    operator1: OperatorFunction<string, A>,
    operator2: OperatorFunction<A, string>
  ): Observable<void>
  transformFile<A, B>(
    options: Options,
    operator1: OperatorFunction<string, A>,
    operator2: OperatorFunction<A, B>,
    operator3: OperatorFunction<B, string>
  ): Observable<void>
  transformFile<A, B, C>(
    options: Options,
    operator1: OperatorFunction<string, A>,
    operator2: OperatorFunction<A, B>,
    operator3: OperatorFunction<B, C>,
    operator4: OperatorFunction<C, string>
  ): Observable<void>
  transformFile<A, B, C, D>(
    options: Options,
    operator1: OperatorFunction<string, A>,
    operator2: OperatorFunction<A, B>,
    operator3: OperatorFunction<B, C>,
    operator4: OperatorFunction<C, D>,
    operator5: OperatorFunction<D, string>
  ): Observable<void>
  transformFile<A, B, C, D, E>(
    options: Options,
    operator1: OperatorFunction<string, A>,
    operator2: OperatorFunction<A, B>,
    operator3: OperatorFunction<B, C>,
    operator4: OperatorFunction<C, D>,
    operator5: OperatorFunction<D, E>,
    operator6: OperatorFunction<E, string>
  ): Observable<void>
  transformFile<A, B, C, D, E, F>(
    options: Options,
    operator1: OperatorFunction<string, A>,
    operator2: OperatorFunction<A, B>,
    operator3: OperatorFunction<B, C>,
    operator4: OperatorFunction<C, D>,
    operator5: OperatorFunction<D, E>,
    operator6: OperatorFunction<E, F>,
    operator7: OperatorFunction<F, string>
  ): Observable<void>
  transformFile<A, B, C, D, E, F, G>(
    options: Options,
    operator1: OperatorFunction<string, A>,
    operator2: OperatorFunction<A, B>,
    operator3: OperatorFunction<B, C>,
    operator4: OperatorFunction<C, D>,
    operator5: OperatorFunction<D, E>,
    operator6: OperatorFunction<E, F>,
    operator7: OperatorFunction<F, G>,
    ...opperators: [OperatorFunction<G, any>, ...OperatorFunction<any, any>[], OperatorFunction<any, string>]
  ): Observable<void>
}

export const createFileOperations = (fileSystem: FileSystem): FileOperations => {
  const transformFile: FileOperations['transformFile'] = ({ input, output, readError, writeError }: Options, ...transform: OperatorFunction<any, any>[]) =>
    fileSystem.readFile(input, 'utf-8').pipe(
      catchAndRethrow((cause) => new Error(readError?.(input) ?? `Could not read input: ${input}`, { cause })),
      ...transform as [OperatorFunction<string, string>],
      switchMap(transformedContent =>
        fileSystem.writeFile(output, transformedContent).pipe(
          catchAndRethrow((cause) => new Error(writeError?.(output) ?? `Could not write output: ${output}`, { cause })),
        ),
      ),
    )

  return {
    transformFile,
  }
}
