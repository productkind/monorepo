import { TODOS_NAMESPACE } from './config.ts'
import { todosReducer } from './store.ts'

import { createStoreTools } from '@dungarees/store/fake.ts'

export const { createAppStore, getStateReadable } = createStoreTools({
  namespace: TODOS_NAMESPACE,
  reducer: todosReducer,
})

export const todosReducers = { [TODOS_NAMESPACE]: todosReducer }
