import { type FC, useState } from 'react'

export type NewTodoInputProps = {
  onAdd: (title: string) => void
}

export const NewTodoInput: FC<NewTodoInputProps> = ({ onAdd }) => {
  const [title, setTitle] = useState('')

  return (
    <input
      className="new-todo"
      placeholder="What needs to be done?"
      value={title}
      autoFocus
      onChange={({ target }) => {
        setTitle(target.value)
      }}
      onKeyDown={({ key }) => {
        if (key === 'Enter') {
          onAdd(title)
          setTitle('')
        }
      }}
    />
  )
}
