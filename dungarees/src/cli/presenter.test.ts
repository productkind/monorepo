import { mtest } from '@dungarees/core/marbles-vitest.ts'

import { of } from 'rxjs'

mtest('CliPresenter', ({ expect }) => {
  /* const cliPresenter = createCliPresenter({
    args2Events: (args) => ({ type: args.type, payload: { a: args.a, b: args.b } }),
    routes: {
      add: ({ a, b }) => of({ type: 'add-result', payload: a + b }),
    },
    render: {
      add: ({ a, b }) => ({
        message: `Adding ${a} and ${b}`,
        type: 'stdout',
        level: 'info',
      }),
      'add-result': (payload) => ({
        message: `Result: ${payload}`,
        type: 'stdout',
        level: 'info',
      }),
    },
  })

  const presentation$ = cliPresenter.present$({ type: 'add', a: 1, b: 2 })
  expect(presentation$).toBeObservable() */
})
