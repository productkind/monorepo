import type { WriteableRawKeyValueStore } from '../type.ts'

import { BehaviorSubject, type Observable } from 'rxjs'

export type BehaviorSubjectStore<T> = WriteableRawKeyValueStore<T | undefined> & {
  state$: Observable<Map<string, T>>
}

export const createMemoryObservableRawKeyValueStore = <T = unknown>(): BehaviorSubjectStore<T> => {
  const store = new Map<string, T>()
  const state = new BehaviorSubject<Map<string, T>>(new Map())

  return {
    get: (key) => store.get(key),
    set: (key, value) => {
      if (value === undefined) {
        store.delete(key)
      } else {
        store.set(key, value)
      }
      // Emits a copy so an already-delivered snapshot keeps describing the store as it was when
      // subscribers received it.
      state.next(new Map(store))
    },
    state$: state.asObservable(),
  }
}
