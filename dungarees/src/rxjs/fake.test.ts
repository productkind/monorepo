import {mtest} from "@dungarees/core/marbles-vitest.ts";
import {createGetTransformSetContextInspector} from "./fake.ts";
import {map} from "rxjs";

mtest('createGetTransformSetContextInspector created with get and set', ({expect, coldStepAndClose}) => {
  const [transformer, contentInspector$] = createGetTransformSetContextInspector<string, string, string>({
    get: () => coldStepAndClose('input content'),
    set: () => coldStepAndClose(undefined),
  })

  const transform$ = transformer(
    map((content: string) => ({ set: content.toUpperCase(), context: 'context' })),
  )

  expect(transform$).toBeObservableStepAndClose(
    { set: 'INPUT CONTENT', context: 'context', get: 'input content' },
    2
  )

  expect(contentInspector$).toBeObservableStep( 'INPUT CONTENT',)
})

mtest('createGetTransformSetContextInspector created with content', ({expect}) => {
  const [transformer, contentInspector$] = createGetTransformSetContextInspector<string, string, string>({
    content: 'input content',
  })

  const transform$ = transformer(
    map((content: string) => ({ set: content.toUpperCase(), context: 'context' })),
  )

  expect(transform$).toBeObservableValueAndClose(
    { set: 'INPUT CONTENT', context: 'context', get: 'input content' },
  )

  expect(contentInspector$).toBeObservableValue('INPUT CONTENT')
})
