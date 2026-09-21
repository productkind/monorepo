import { FilterLink } from './filter-link.tsx'

import type { NavigationCommand } from '@dungarees/navigation/command.ts'
import { TODO_FILTERS, type TodoFilter } from '@dungarees/todo-mvc-todos-domain/type.ts'

import type { FC } from 'react'

const FILTER_LABELS: { [FILTER in TodoFilter]: string } = {
  all: 'All',
  active: 'Active',
  completed: 'Completed',
}

export type TodoFooterProps = {
  activeCount: number
  hasCompletedTodos: boolean
  filter: TodoFilter
  navigation: NavigationCommand
  onClearCompleted: () => void
}

export const TodoFooter: FC<TodoFooterProps> = ({
  activeCount,
  hasCompletedTodos,
  filter,
  navigation,
  onClearCompleted,
}) => (
  <footer className="footer">
    <span className="todo-count">
      <strong>{activeCount}</strong> {activeCount === 1 ? 'item' : 'items'} left
    </span>
    <ul className="filters">
      {TODO_FILTERS.map((name) => (
        <FilterLink
          key={name}
          filter={name}
          label={FILTER_LABELS[name]}
          isSelected={name === filter}
          navigation={navigation}
        />
      ))}
    </ul>
    {hasCompletedTodos && (
      <button className="clear-completed" onClick={onClearCompleted}>
        Clear completed
      </button>
    )}
  </footer>
)
