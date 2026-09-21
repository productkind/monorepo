import type { Todo } from '@dungarees/todo-mvc-todos-domain/type.ts'

import { type FC, useRef, useState } from 'react'

export type TodoItemProps = {
  todo: Todo
  onToggle: (id: string) => void
  onDestroy: (id: string) => void
  onEdit: (args: { id: string; title: string }) => void
}

export const TodoItem: FC<TodoItemProps> = ({ todo, onToggle, onDestroy, onEdit }) => {
  const [draft, setDraft] = useState<string | undefined>(undefined)
  // Escape has to survive the blur that follows it when the editor is taken away, and the blur
  // handler still closes over the discarded draft at that point.
  const discarded = useRef(false)

  const startEditing = (): void => {
    discarded.current = false
    setDraft(todo.title)
  }

  // Committing the same title twice changes nothing and committing an emptied one twice destroys
  // an already absent todo, so a stray blur after enter needs no guard of its own.
  const commit = (): void => {
    if (!discarded.current && draft !== undefined) {
      onEdit({ id: todo.id, title: draft })
    }
    setDraft(undefined)
  }

  const discard = (): void => {
    discarded.current = true
    setDraft(undefined)
  }

  const onKeyDown: { [KEY in 'Enter' | 'Escape']: () => void } = {
    Enter: commit,
    Escape: discard,
  }

  return (
    <li
      className={[todo.completed ? 'completed' : '', draft !== undefined ? 'editing' : '']
        .filter((name) => name !== '')
        .join(' ')}
    >
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          checked={todo.completed}
          aria-label={`Toggle ${todo.title}`}
          onChange={() => {
            onToggle(todo.id)
          }}
        />
        <label
          onDoubleClick={() => {
            startEditing()
          }}
        >
          {todo.title}
        </label>
        <button
          className="destroy"
          aria-label={`Delete ${todo.title}`}
          onClick={() => {
            onDestroy(todo.id)
          }}
        />
      </div>
      {draft !== undefined && (
        <input
          className="edit"
          value={draft}
          autoFocus
          aria-label={`Edit ${todo.title}`}
          onChange={({ target }) => {
            setDraft(target.value)
          }}
          onBlur={commit}
          onKeyDown={({ key }) => {
            if (key === 'Enter' || key === 'Escape') {
              onKeyDown[key]()
            }
          }}
        />
      )}
    </li>
  )
}
