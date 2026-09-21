import { createTodosBehavior, todosQuery } from './behavior.ts'
import { createAppStore, getStateReadable } from './fake.ts'
import type { Todo } from './type.ts'

import { mtest } from '@dungarees/core/marbles-vitest.ts'
import { createFakeIdGeneratorBackend } from '@dungarees/id-generator/fake.ts'
import { createIdGenerator } from '@dungarees/id-generator/service.ts'

import { of } from 'rxjs'
import { expect, test } from 'vitest'

const WRITE_TESTS: Todo = { id: '1', title: 'Write tests', completed: false }
const READ_SPEC: Todo = { id: '2', title: 'Read the spec', completed: true }

const createBehavior = (filter: 'all' | 'active' | 'completed' = 'all') => {
  const { store } = createAppStore()
  const { backend } = createFakeIdGeneratorBackend()
  return {
    store,
    behavior: createTodosBehavior({
      store,
      idGenerator: createIdGenerator(backend),
      filter$: of(filter),
    }),
  }
}

mtest('visibleTodos$ narrows the list to the filter it is handed', ({ expect, cold }) => {
  const { visibleTodos$ } = todosQuery({
    store: getStateReadable(cold('s', { s: { items: [WRITE_TESTS, READ_SPEC] } })),
    filter$: cold('a', { a: 'active' }),
  })

  expect(visibleTodos$).toBeObservable('s', { s: [WRITE_TESTS] })
})

mtest('the counters and flags the footer needs come off the whole list', ({ expect, cold }) => {
  const store = getStateReadable(cold('s', { s: { items: [WRITE_TESTS, READ_SPEC] } }))
  const filter$ = cold('a', { a: 'all' as const })
  const { activeCount$, hasTodos$, hasCompletedTodos$, allCompleted$ } = todosQuery({
    store,
    filter$,
  })

  expect(activeCount$).toBeObservable('s', { s: 1 })
  expect(hasTodos$).toBeObservable('s', { s: true })
  expect(hasCompletedTodos$).toBeObservable('s', { s: true })
  expect(allCompleted$).toBeObservable('s', { s: false })
})

mtest('adding a todo gives it a generated id and appends it', ({ expect, coldCall }) => {
  const { behavior } = createBehavior()
  coldCall('-1', {
    1: () => {
      behavior.add('  Write tests  ')
    },
  })

  expect(behavior.visibleTodos$).toBeObservable('01', {
    0: [],
    1: [{ id: 'fake-uuid-1', title: 'Write tests', completed: false }],
  })
})

mtest('a blank title never becomes a todo', ({ expect, coldCall }) => {
  const { behavior } = createBehavior()
  coldCall('-1', {
    1: () => {
      behavior.add('   ')
    },
  })

  expect(behavior.visibleTodos$).toBeObservable('0', { 0: [] })
})

mtest('toggling, editing and destroying reach the list', ({ expect, coldCall }) => {
  const { behavior } = createBehavior()
  coldCall('-123', {
    1: () => {
      behavior.add('Write tests')
    },
    2: () => {
      behavior.toggle('fake-uuid-1')
    },
    3: () => {
      behavior.edit({ id: 'fake-uuid-1', title: 'Write more tests' })
    },
  })

  expect(behavior.visibleTodos$).toBeObservable('0123', {
    0: [],
    1: [{ id: 'fake-uuid-1', title: 'Write tests', completed: false }],
    2: [{ id: 'fake-uuid-1', title: 'Write tests', completed: true }],
    3: [{ id: 'fake-uuid-1', title: 'Write more tests', completed: true }],
  })
})

mtest('clearing completed and toggling all reach the list', ({ expect, coldCall }) => {
  const { behavior } = createBehavior()
  coldCall('-123', {
    1: () => {
      behavior.seed([WRITE_TESTS, READ_SPEC])
    },
    2: () => {
      behavior.setAllCompleted(true)
    },
    3: () => {
      behavior.clearCompleted()
    },
  })

  expect(behavior.visibleTodos$).toBeObservable('0123', {
    0: [],
    1: [WRITE_TESTS, READ_SPEC],
    2: [{ ...WRITE_TESTS, completed: true }, READ_SPEC],
    3: [],
  })
})

mtest('destroying removes just the one named', ({ expect, coldCall }) => {
  const { behavior } = createBehavior()
  coldCall('-12', {
    1: () => {
      behavior.seed([WRITE_TESTS, READ_SPEC])
    },
    2: () => {
      behavior.destroy('1')
    },
  })

  expect(behavior.visibleTodos$).toBeObservable('012', {
    0: [],
    1: [WRITE_TESTS, READ_SPEC],
    2: [READ_SPEC],
  })
})

test('the whole list reads out synchronously, which is how the server hands it to the browser', () => {
  const { behavior } = createBehavior()
  behavior.seed([WRITE_TESTS, READ_SPEC])

  expect(behavior.toTodos()).toEqual([WRITE_TESTS, READ_SPEC])
})

// What the browser has to start from is every todo, not the slice the current route happens to
// show, or navigating after hydration would find the rest of them gone.
test('reading the list out ignores the filter in force', () => {
  const { behavior } = createBehavior('active')
  behavior.seed([WRITE_TESTS, READ_SPEC])

  expect(behavior.visibleTodos$).toBeDefined()
  expect(behavior.toTodos()).toEqual([WRITE_TESTS, READ_SPEC])
})
