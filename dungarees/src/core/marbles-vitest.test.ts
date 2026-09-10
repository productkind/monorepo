import { configure, coreMarbles, mtest } from './marbles-vitest.ts'

import { Subject } from 'rxjs'
import { expect, test } from 'vitest'

test(
  'it should run a single marble',
  coreMarbles(({ expect, cold }) => {
    expect(cold('a')).toBeObservable('a', { a: 'a' })
  }),
)

test.each([
  ['tf', 'tf'],
  ['ft', 'ft'],
])(
  'it should work with each',
  coreMarbles(({ expect, coldBoolean }, a: string, b: string) => {
    expect(coldBoolean(a)).toBeObservableBoolean(b)
  }),
)

mtest.each([
  ['tf', 'tf'],
  ['ft', 'ft'],
])('mtest should work with each', ({ expect, coldBoolean }, a: string, b: string) => {
  expect(coldBoolean(a)).toBeObservableBoolean(b)
})

mtest('mtest runs a marble test without coreMarbles wrapping it', ({ expect, coldBoolean }) => {
  expect(coldBoolean('tf')).toBeObservableBoolean('tf')
})

mtest('coldCall invokes the one function its marble names', ({ expect, coldCall }) => {
  const s = new Subject()
  coldCall('-cc', {
    c: () => {
      s.next('c')
    },
  })
  expect(s).toBeObservable('-cc', { c: 'c' })
})

mtest('coldCall invokes each function its marble names, in frame order', ({ expect, coldCall }) => {
  const s = new Subject()
  coldCall('-cd', {
    c: () => {
      s.next('c')
    },
    d: () => {
      s.next('d')
    },
  })
  expect(s).toBeObservable('-cd', { c: 'c', d: 'd' })
})

mtest('coldBoolean turns t and f into true and false', ({ expect, coldBoolean }) => {
  expect(coldBoolean('tf')).toBeObservable('tf', { t: true, f: false })
})

mtest('toBeObservableBoolean matches a stream of booleans against t and f', ({ expect, cold }) => {
  expect(cold('tf', { t: true, f: false })).toBeObservableBoolean('tf')
})

mtest('coldValue emits the value its marble names', ({ expect, coldValue }) => {
  expect(coldValue('-v', true)).toBeObservableBoolean('-t')
})

mtest(
  'coldValueOrUndefined emits the value for v and undefined for 0',
  ({ expect, coldValueOrUndefined }) => {
    expect(coldValueOrUndefined('-v0', true)).toBeObservable('-t0', {
      t: true,
      '0': undefined,
    })
  },
)

mtest('coldStep emits the value after as many frames as it was told', ({ expect, coldStep }) => {
  expect(coldStep(true)).toBeObservableBoolean('-t')
  expect(coldStep(true, 2)).toBeObservableBoolean('--t')
})

mtest(
  'coldStepAndClose emits the value and completes in the same frame',
  ({ expect, coldStepAndClose }) => {
    expect(coldStepAndClose(true)).toBeObservableBoolean('-(t|)')
    expect(coldStepAndClose(true, 2)).toBeObservableBoolean('--(t|)')
  },
)

mtest('coldError errors after as many frames as it was told', ({ expect, coldError }) => {
  expect(coldError(new Error('test error'))).toBeObservable('-#', {}, new Error('test error'))
  expect(coldError(new Error('test error'), 2)).toBeObservable('--#', {}, new Error('test error'))
})

mtest(
  'coldStepAndError emits the value and errors in the same frame',
  ({ expect, coldStepAndError }) => {
    expect(coldStepAndError(true, new Error('test error'))).toBeObservable(
      '-(t#)',
      { t: true },
      new Error('test error'),
    )
    expect(coldStepAndError(true, new Error('test error'), 2)).toBeObservable(
      '--(t#)',
      { t: true },
      new Error('test error'),
    )
  },
)

mtest(
  'toBeObservableValue matches a value against the marble it is given',
  ({ expect, coldStep }) => {
    expect(coldStep(true)).toBeObservableValue('-v', true)
  },
)

mtest(
  'toBeObservableValue falls back to a single-frame marble when given only a value',
  ({ expect, coldStep }) => {
    expect(coldStep(true, 0)).toBeObservableValue(true)
  },
)

mtest(
  'toBeObservableValueAndClose matches a value followed by completion',
  ({ expect, coldStepAndClose }) => {
    expect(coldStepAndClose(true, 0)).toBeObservableValueAndClose(true)
  },
)

mtest(
  'toBeObservableValueAndError matches a value followed by an error',
  ({ expect, coldStepAndError }) => {
    expect(coldStepAndError(true, new Error('test error'), 0)).toBeObservableValueAndError(
      true,
      new Error('test error'),
    )
  },
)

mtest(
  'toBeObservableValueOrUndefined matches a stream carrying undefined frames',
  ({ expect, coldValueOrUndefined }) => {
    expect(coldValueOrUndefined('-v0', true)).toBeObservableValueOrUndefined('-v0', true)
  },
)

mtest(
  'toBeObservableStep matches a value delayed by a number of frames',
  ({ expect, coldStep }) => {
    expect(coldStep(true)).toBeObservableStep(true)
    expect(coldStep(true, 2)).toBeObservableStep(true, 2)
  },
)

mtest(
  'toBeObservableStepAndClose matches a delayed value followed by completion',
  ({ expect, coldStepAndClose }) => {
    expect(coldStepAndClose(true)).toBeObservableStepAndClose(true)
    expect(coldStepAndClose(true, 2)).toBeObservableStepAndClose(true, 2)
  },
)

mtest(
  'toBeObservableError matches an error delayed by a number of frames',
  ({ expect, coldError }) => {
    expect(coldError(new Error('test error'))).toBeObservableError(new Error('test error'))
    expect(coldError(new Error('test error'), 2)).toBeObservableError(new Error('test error'), 2)
  },
)

mtest(
  'toBeObservableStepAndError matches a delayed value followed by an error',
  ({ expect, coldStepAndError }) => {
    expect(coldStepAndError(true, new Error('test error'))).toBeObservableStepAndError(
      true,
      new Error('test error'),
    )
    expect(coldStepAndError(true, new Error('test error'), 2)).toBeObservableStepAndError(
      true,
      new Error('test error'),
      2,
    )
  },
)

const { cases } = configure({})
const casesThatRan: string[] = []

cases(
  'skip and only flags',
  (_m, { name }) => {
    casesThatRan.push(name)
  },
  [
    { name: 'plain case' },
    { name: 'case flagged skip', skip: true },
    { name: 'case with skip false', skip: false },
  ],
)

test('cases runs every case except the ones flagged skip', () => {
  expect(casesThatRan).toEqual(['plain case', 'case with skip false'])
})
