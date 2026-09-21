// @vitest-environment happy-dom
import { createBehaviorsContext } from './behaviors-context.ts'

import { cleanup, render, screen } from '@testing-library/react'
import type { FC } from 'react'
import { afterEach, expect, test } from 'vitest'

type Behaviors = {
  todos: { label: string }
  navigation: { label: string }
}

const BEHAVIORS: Behaviors = { todos: { label: 'todos' }, navigation: { label: 'navigation' } }

afterEach(cleanup)

test('the hook hands back the behaviors the provider holds', () => {
  const { BehaviorsProvider, useBehaviors } = createBehaviorsContext<Behaviors>()
  const Label: FC = () => <p data-testid="label">{useBehaviors().todos.label}</p>

  render(
    <BehaviorsProvider value={BEHAVIORS}>
      <Label />
    </BehaviorsProvider>,
  )

  expect(screen.getByTestId('label').textContent).toBe('todos')
})

test('one behavior can be named instead of destructured', () => {
  const { BehaviorsProvider, useBehavior } = createBehaviorsContext<Behaviors>()
  const Label: FC = () => <p data-testid="label">{useBehavior('navigation').label}</p>

  render(
    <BehaviorsProvider value={BEHAVIORS}>
      <Label />
    </BehaviorsProvider>,
  )

  expect(screen.getByTestId('label').textContent).toBe('navigation')
})

// Without a provider the behaviors would read as undefined deep inside a component tree, so the
// failure is raised where the mistake is rather than where the value is finally used.
test('reading behaviors outside the provider names the missing provider', () => {
  const { useBehaviors } = createBehaviorsContext<Behaviors>()
  const Label: FC = () => <p>{useBehaviors().todos.label}</p>

  expect(() => render(<Label />)).toThrow('BehaviorsProvider is missing above this component')
})
