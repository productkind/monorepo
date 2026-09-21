import { toTodoFilterPath } from './routes.ts'

import type { NavigationCommand } from '@dungarees/navigation/command.ts'
import type { TodoFilter } from '@dungarees/todo-mvc-todos-domain/type.ts'

import type { FC } from 'react'

export type FilterLinkProps = {
  filter: TodoFilter
  label: string
  isSelected: boolean
  navigation: NavigationCommand
}

export const FilterLink: FC<FilterLinkProps> = ({ filter, label, isSelected, navigation }) => {
  const pathname = toTodoFilterPath(filter)

  return (
    <li>
      {/* A real href so the server can answer it and so the link is one, while the click is
          handled here to keep the page from reloading. */}
      <a
        href={pathname}
        className={isSelected ? 'selected' : ''}
        onClick={(event) => {
          event.preventDefault()
          navigation.appNavigation({ pathname, search: '', hash: '' })
        }}
      >
        {label}
      </a>
    </li>
  )
}
