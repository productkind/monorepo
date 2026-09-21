import { useBehaviors } from './behaviors.ts'
import { NewTodoInput } from './new-todo-input.tsx'
import { toTodoFilter } from './routes.ts'
import { TodoFooter } from './todo-footer.tsx'
import { TodoItem } from './todo-item.tsx'

import { useObservableValue } from '@dungarees/react/use-observable.ts'

import type { FC } from 'react'
import 'todomvc-app-css/index.css'

export const TodoApp: FC = () => {
  const { todos, navigation } = useBehaviors()
  const visibleTodos = useObservableValue(todos.visibleTodos$)
  const activeCount = useObservableValue(todos.activeCount$)
  const hasTodos = useObservableValue(todos.hasTodos$)
  const hasCompletedTodos = useObservableValue(todos.hasCompletedTodos$)
  const allCompleted = useObservableValue(todos.allCompleted$)
  const filter = toTodoFilter(useObservableValue(navigation.route$))

  return (
    <>
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <NewTodoInput onAdd={todos.add} />
        </header>
        {hasTodos && (
          <section className="main">
            <input
              id="toggle-all"
              className="toggle-all"
              type="checkbox"
              checked={allCompleted}
              onChange={() => {
                todos.setAllCompleted(!allCompleted)
              }}
            />
            <label htmlFor="toggle-all">Mark all as complete</label>
            <ul className="todo-list">
              {visibleTodos.map((todo) => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  onToggle={todos.toggle}
                  onDestroy={todos.destroy}
                  onEdit={todos.edit}
                />
              ))}
            </ul>
          </section>
        )}
        {hasTodos && (
          <TodoFooter
            activeCount={activeCount}
            hasCompletedTodos={hasCompletedTodos}
            filter={filter}
            navigation={navigation}
            onClearCompleted={todos.clearCompleted}
          />
        )}
      </section>
      <footer className="info">
        <p>Double-click to edit a todo</p>
      </footer>
    </>
  )
}
