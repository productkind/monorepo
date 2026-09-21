// @vitest-environment happy-dom
import { useObservableValue } from './use-observable.ts'

import { act, cleanup, render, screen } from '@testing-library/react'
import type { FC } from 'react'
import { renderToString } from 'react-dom/server'
import { BehaviorSubject, of, Subject } from 'rxjs'
import { map } from 'rxjs/operators'
import { afterEach, expect, test } from 'vitest'

afterEach(cleanup)

const Value: FC<{ source$: Parameters<typeof useObservableValue<string>>[0] }> = ({ source$ }) => (
  <p data-testid="value">{useObservableValue(source$)}</p>
)

test('the current value of a synchronous observable is what renders', () => {
  render(<Value source$={of('first')} />)

  expect(screen.getByTestId('value').textContent).toBe('first')
})

test('a later emission re-renders', () => {
  const source$ = new BehaviorSubject('first')
  render(<Value source$={source$} />)

  act(() => {
    source$.next('second')
  })

  expect(screen.getByTestId('value').textContent).toBe('second')
})

test('a derived observable is read through without an extra subscription hop', () => {
  const source$ = new BehaviorSubject('first')
  render(<Value source$={source$.pipe(map((value) => value.toUpperCase()))} />)

  expect(screen.getByTestId('value').textContent).toBe('FIRST')
})

// The server has one synchronous pass and no chance to wait, so an observable that cannot answer
// on subscribe would render a hole that hydration then contradicts.
test('an observable with no synchronous value is refused rather than rendered empty', () => {
  expect(() => render(<Value source$={new Subject<string>()} />)).toThrow(
    'Observable did not emit a value synchronously',
  )
})

test('the server renders the same value the browser hydrates with', () => {
  const source$ = new BehaviorSubject('first')

  expect(renderToString(<Value source$={source$} />)).toContain('first')
})
