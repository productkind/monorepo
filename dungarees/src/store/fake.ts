import { createStore } from './service.ts'
import type { Reducer, ReducersObject, StateReadable, Store } from './service.ts'

import type { DomainEvent } from '@dungarees/core/event.ts'
import type {
  JsonObject,
  ObjectWithStringLiteralKey,
  StringLiteral,
} from '@dungarees/core/type-util.ts'
import { makeObjectFromStringLiteral } from '@dungarees/core/util.ts'

import type { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

export type SlicedStoreState<STATE, STATE_KEY> = ObjectWithStringLiteralKey<STATE_KEY, STATE>

// No reducer handles this, so reducing it returns whatever initial state each one declares. That
// is the only way to read an initial state out of a reducer without standing up a store.
export const STORE_INIT: DomainEvent<'init', undefined> = { type: 'init', payload: undefined }

export type StoreTools<
  STATE,
  EVENT extends DomainEvent,
  STATE_KEY,
  BASE_STATE extends JsonObject = Record<never, never>,
  SLICED_STATE = SlicedStoreState<STATE, STATE_KEY>,
> = {
  getStateReadable: (in$: Observable<Partial<STATE>>) => StateReadable<SLICED_STATE>
  createAppStore: () => {
    store: Store<SLICED_STATE & BASE_STATE, EVENT>
    sliceState$: Observable<STATE>
  }
}

type CreateStoreToolsArgs<
  NAMESPACE,
  STATE,
  EVENT extends DomainEvent,
  BASE_STATE extends JsonObject,
> = {
  namespace: StringLiteral<NAMESPACE>
  reducer: Reducer<STATE, EVENT>
  baseReducers?: ReducersObject<BASE_STATE, EVENT>
}

export const createStoreTools = <
  NAMESPACE,
  STATE,
  EVENT extends DomainEvent = DomainEvent,
  BASE_STATE extends JsonObject = Record<never, never>,
>({
  namespace,
  reducer,
  baseReducers,
}: CreateStoreToolsArgs<NAMESPACE, STATE, EVENT, BASE_STATE>): StoreTools<
  STATE,
  EVENT,
  NAMESPACE,
  BASE_STATE
> => {
  type SlicedState = SlicedStoreState<STATE, NAMESPACE>

  return {
    getStateReadable: (in$) => ({
      // Standing in for the whole store state while only part of one slice is supplied is the
      // point of this helper: a query test states the fields it reads and nothing else.
      state$: in$.pipe(
        map((sliceState) => makeObjectFromStringLiteral(namespace, sliceState)),
      ) as Observable<SlicedState>,
    }),
    createAppStore: () => {
      const store = createStore<SlicedState & BASE_STATE, EVENT>({
        ...baseReducers,
        ...makeObjectFromStringLiteral(namespace, reducer),
        // The reducer map is assembled from a dynamically keyed object, which cannot be built in a
        // way TypeScript can check against the state it produces.
      } as unknown as ReducersObject<SlicedState & BASE_STATE, EVENT>)

      return {
        store,
        sliceState$: store.state$.pipe(map((state) => state[namespace])),
      }
    },
  }
}
