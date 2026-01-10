import { type Observable, of, Subject, ReplaySubject } from "rxjs";
import {createGetTransformSetContext, GetTransformSetContext} from "./util.ts";

type Options<INPUT, OUTPUT> = {
  get: () => Observable<INPUT>;
  set: (content: OUTPUT) => Observable<void>;
} | { content: INPUT };

export const createGetTransformSetContextInspector = <CONTEXT, INPUT, OUTPUT>(options: Options<INPUT, OUTPUT>): [
  GetTransformSetContext<CONTEXT, INPUT, OUTPUT>,
  Observable<OUTPUT>
] => {
  const getOptions = (options: Options<INPUT, OUTPUT>): {
    subject: Subject<OUTPUT>,
    get: () => Observable<INPUT>,
    set: (content: OUTPUT) => Observable<void>
  } => {
    return 'content' in options ? {
      subject: new ReplaySubject<OUTPUT>(1),
      get: () => of(options.content),
      set: () => of(undefined),
    } : {
      subject: new Subject<OUTPUT>(),
      get: options.get,
      set: options.set,
    }
  }

  const { subject, get, set } = getOptions(options)
  const transformer = createGetTransformSetContext<CONTEXT, INPUT, OUTPUT>(
    get,
    (content: OUTPUT): Observable<void> => {
      subject.next(content)
      return set(content)
    },
  )
  return [
    transformer,
    subject,
  ]
}


