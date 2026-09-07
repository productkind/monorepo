import type {
  CaseReducersObject,
  EffectFunction,
  ReducersObject,
  SourceEffectFunction,
  StateMapper,
  Store,
  StoreEventCreators,
  StoreImportExport,
  StoreSlice,
  StoreSliceConfig,
} from './type.ts'

import type { DomainEvent } from '@dungarees/core/event.ts'
import type { JsonObject, ObjectWithStringLiteralKey } from '@dungarees/core/type-util.ts'
import { capitalize } from '@dungarees/core/util.ts'

import {
  combineReducers,
  configureStore,
  createSlice,
  type CreateSliceOptions,
  isAction,
  type Middleware,
  type Reducer as ReduxReducer,
  type UnknownAction,
} from '@reduxjs/toolkit'
import { Observable, of, Subject } from 'rxjs'
import { concatMap, mergeAll } from 'rxjs/operators'

const IMPORT_TYPE = 'IMPORT'

// redux hands middleware an `unknown` action. isAction checks the part that matters — an object
// with a string `type` — and the index signature UnknownAction adds on top is vacuously true of
// any object, since reading an absent key yields undefined.
const isUnknownAction = (action: unknown): action is UnknownAction => isAction(action)

export const createStore = <STATE extends JsonObject, EVENT extends DomainEvent>(
  reducers: ReducersObject<STATE, EVENT>,
  config: { rehydrateMode: boolean } = { rehydrateMode: false },
): Store<STATE, EVENT> & StoreImportExport<STATE> => {
  // combineReducers is typed against the state it rebuilds key by key from the reducer map and the
  // action union it collects from them, neither of which TypeScript can recognise as the STATE and
  // EVENT that are still generic here. Cast once, at this boundary, rather than at each call.
  const combinedReducer = combineReducers(reducers) as unknown as ReduxReducer<STATE, UnknownAction>

  const reducerWithImport: ReduxReducer<STATE, UnknownAction> = (state, action) => {
    if (action.type === IMPORT_TYPE) {
      // The imported state is whatever exportState produced, and STATE is still generic here, so
      // there is no shape to check it against. importState below is its only source.
      return action['payload'] as STATE
    }
    return combinedReducer(state, action)
  }

  const eventsBeforeImport: UnknownAction[] = []
  let rehydrationComplete = false

  // Buffers everything that arrives before the imported state and replays it on top, so a store
  // rehydrated from storage does not discard what happened while that load was in flight.
  const rehydrationMiddleware: Middleware = (store) => (next) => (action) => {
    if (!config.rehydrateMode || rehydrationComplete || !isUnknownAction(action)) {
      return next(action)
    }
    if (action.type !== IMPORT_TYPE) {
      eventsBeforeImport.push(action)
      return next(action)
    }
    rehydrationComplete = true
    const imported = next(action)
    eventsBeforeImport.forEach((event) => store.dispatch(event))
    eventsBeforeImport.length = 0
    return imported
  }

  const store = configureStore({
    reducer: reducerWithImport,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(rehydrationMiddleware),
  })

  const event$ = new Subject<EVENT>()
  const event$$ = new Subject<Observable<EVENT>>()
  const eventAfterEffects$ = new Subject<EVENT>()
  event$$.pipe(mergeAll()).subscribe((event) => {
    store.dispatch(event)
    eventAfterEffects$.next(event)
  })
  event$$.next(event$)

  const state$ = new Observable<STATE>((subscriber) => {
    subscriber.next(store.getState())
    store.subscribe(() => {
      subscriber.next(store.getState())
    })
  })

  return {
    state$,
    send: (event) => {
      event$.next(event)
    },
    registerEffect: <EVENT_OUT extends EVENT>(effect: EffectFunction<STATE, EVENT, EVENT_OUT>) => {
      event$$.next(eventAfterEffects$.pipe(concatMap((event) => effect(of(event), state$))))
    },
    registerSourceEffect: <EVENT_OUT extends EVENT>(
      sourceEffect: SourceEffectFunction<STATE, EVENT_OUT>,
    ) => {
      event$$.next(sourceEffect(state$))
    },
    exportState: () => store.getState(),
    importState: (state) => {
      store.dispatch({ type: IMPORT_TYPE, payload: state })
    },
  }
}

export const createStoreSlice = <
  STATE,
  CASE_REDUCERS extends CaseReducersObject<STATE>,
  NAMESPACE extends string = string,
>(
  config: StoreSliceConfig<STATE, CASE_REDUCERS, NAMESPACE>,
): StoreSlice<STATE, CASE_REDUCERS, NAMESPACE> => {
  const { name, reducer, actions } = createSlice({
    name: config.name,
    initialState: config.initialState,
    // Our case reducers return the next state, which createSlice accepts, but its parameter type is
    // written in terms of immer's Draft and cannot be satisfied from outside.
    reducers: config.reducers as unknown as CreateSliceOptions['reducers'],
  })

  return {
    name,
    reducer,
    // The action creators already have the right runtime shape; only immer's types stand between
    // them and StoreEventCreators, and restating those would duplicate redux-toolkit.
    eventCreators: actions as unknown as StoreEventCreators<STATE, CASE_REDUCERS>,
    ...createStateMapper<STATE, NAMESPACE>(config.name),
  }
}

// The mapper's key is built from the namespace at runtime, and no type-safe construction of a
// dynamically keyed object exists — the same limitation core's createEventCreators works around.
const createStateMapper = <STATE, NAMESPACE extends string>(
  namespace: NAMESPACE,
): StateMapper<STATE, NAMESPACE> => {
  const readSlice = ({ [namespace]: state }: ObjectWithStringLiteralKey<NAMESPACE, STATE>): STATE =>
    state
  return { [`stateTo${capitalize(namespace)}`]: readSlice } as unknown as StateMapper<
    STATE,
    NAMESPACE
  >
}

export const identityReducer = <STATE, EVENT extends DomainEvent>(state: STATE, _: EVENT): STATE =>
  state
