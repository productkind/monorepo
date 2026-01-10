import { coreMarbles, mtest } from './marbles-vitest.ts'

import { Subject } from 'rxjs'
import { test } from 'vitest'

test('it should run a single marble', coreMarbles(({ expect, cold }) => {
  expect(cold('a')).toBeObservable('a', { a: 'a' })
}))

test.each([
  ['tf', 'tf'],
  ['ft', 'ft'],
])(
  'it should work with each',
  coreMarbles(({ expect, coldBoolean }, a: string, b: string) => {
    expect(coldBoolean(a)).toBeObservableBoolean(b)
  }),
)

mtest('it should run without the wrapper', ({ expect, coldBoolean }) => {
  expect(coldBoolean('tf')).toBeObservableBoolean('tf')
})

mtest('it should run a single function', ({ expect, coldCall }) => {
  const s = new Subject()
  coldCall('-cc', {
    c: () => {
      s.next('c')
    },
  })
  expect(s).toBeObservable('-cc', { c: 'c' })
})

mtest('it should run multiple functions', ({ expect, coldCall }) => {
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


mtest('it should create a boolean marble', ({ expect, coldBoolean }) => {
  expect(coldBoolean('tf')).toBeObservable('tf', { t: true, f: false })
})

mtest('it should assert a boolean marble', ({ expect, cold }) => {
  expect(cold('tf', { t: true, f: false })).toBeObservableBoolean('tf')
})

mtest('it should create a cold marble with a value', ({ expect, coldValue }) => {
  expect(coldValue('-v', true)).toBeObservableBoolean('-t')
})

mtest('it should create a cold marble with a value or undefined', ({ expect, coldValueOrUndefined }) => {
  expect(coldValueOrUndefined('-v0', true)).toBeObservable('-t0', {
    t: true,
    '0': undefined,
  })
})

mtest('it should create a cold marble with a value step', ({ expect, coldStep }) => {
  expect(coldStep(true)).toBeObservableBoolean('-t')
  expect(coldStep(true, 2)).toBeObservableBoolean('--t')
})

mtest(
  'it should create a cold marble with a value step and close',
  ({ expect, coldStepAndClose }) => {
    expect(coldStepAndClose(true)).toBeObservableBoolean('-(t|)')
    expect(coldStepAndClose(true, 2)).toBeObservableBoolean('--(t|)')
  },
)

mtest('it should create a cold marble with an error', ({ expect, coldError }) => {
  expect(coldError(new Error('test error'))).toBeObservable('-#', {}, new Error('test error'))
  expect(coldError(new Error('test error'), 2)).toBeObservable('--#', {}, new Error('test error'))
})

mtest('it should create a cold marble with a value and error', ({ expect, coldStepAndError }) => {
  expect(coldStepAndError(true, new Error('test error')))
    .toBeObservable('-(t#)', { t: true }, new Error('test error'))
  expect(coldStepAndError(true, new Error('test error'), 2))
    .toBeObservable('--(t#)', { t: true }, new Error('test error'))
})


mtest('it should assert a value marble', ({ expect, coldStep }) => {
  expect(coldStep(true)).toBeObservableValue('-v', true)
})

mtest('it should assert a value marble default pattern', ({ expect, coldStep }) => {
  expect(coldStep(true, 0)).toBeObservableValue(true)
})

mtest('it should assert a value and close marble', ({ expect, coldStepAndClose }) => {
  expect(coldStepAndClose(true, 0)).toBeObservableValueAndClose(true)
})

mtest('it should assert a value and close marble', ({ expect, coldStepAndError }) => {
  expect(coldStepAndError(true, new Error('test error'), 0)).toBeObservableValueAndError(true, new Error('test error'))
})

mtest('it should assert a value marble or undefined', ({ expect, coldValueOrUndefined }) => {
  expect(coldValueOrUndefined('-v0', true)).toBeObservableValueOrUndefined('-v0', true)
})

mtest('it should assert a step', ({ expect, coldStep }) => {
  expect(coldStep(true)).toBeObservableStep(true)
  expect(coldStep(true, 2)).toBeObservableStep(true, 2)
})

mtest('it should assert a step and close', ({ expect, coldStepAndClose }) => {
  expect(coldStepAndClose(true)).toBeObservableStepAndClose(true)
  expect(coldStepAndClose(true, 2)).toBeObservableStepAndClose(true, 2)
})

mtest('it should assert an error', ({ expect, coldError }) => {
  expect(coldError(new Error('test error')))
    .toBeObservableError(new Error('test error'))
  expect(coldError(new Error('test error'), 2))
    .toBeObservableError(new Error('test error'), 2)
})

mtest('it should assert a step with an error', ({ expect, coldStepAndError }) => {
  expect(coldStepAndError(true, new Error('test error')))
    .toBeObservableStepAndError(true, new Error('test error'))
  expect(coldStepAndError(true, new Error('test error'), 2))
    .toBeObservableStepAndError(true, new Error('test error'), 2)
})
