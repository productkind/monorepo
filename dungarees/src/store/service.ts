import type { EffectFunction, SourceEffectFunction } from './effect.ts'

import type { DomainEvent } from '@dungarees/core/event.ts'
import type {
  JsonObject,
  ObjectWithStringLiteralKey,
  Serializable,
} from '@dungarees/core/type-util.ts'
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

export type Store<ALL_STATE, ALL_EVENT extends DomainEvent> = StateReadable<ALL_STATE> &
  EventReceiver<ALL_EVENT> &
  EventReadable<ALL_EVENT> &
  EffectRegistry<ALL_STATE, ALL_EVENT>

// Split out because reading the state as it stands is the smaller capability: a caller that only
// serialises would otherwise have to ask for the power to overwrite the store as well.
export type StateExportable<ALL_STATE> = {
  exportState: () => ALL_STATE
}

export type StoreImportExport<ALL_STATE> = StateExportable<ALL_STATE> & {
  importState: (state: ALL_STATE) => void
}

export type StoreWithImport<ALL_STATE, ALL_EVENT extends DomainEvent> = Store<
  ALL_STATE,
  ALL_EVENT
> &
  StoreImportExport<ALL_STATE>

export type StateReadable<ALL_STATE> = {
  state$: Observable<ALL_STATE>
}

export type EventReceiver<ALL_EVENT extends DomainEvent> = {
  send: (event: ALL_EVENT) => void
}

// Everything the store reduced, which is what was sent to it plus whatever the effects answered
// with. A command whose reducer leaves the state alone on purpose has nothing else to show for
// itself, and an event log is what a devtool or an audit trail would read too.
export type EventReadable<ALL_EVENT extends DomainEvent> = {
  event$: Observable<ALL_EVENT>
}

export type EffectRegistry<ALL_STATE, ALL_EVENT extends DomainEvent> = {
  registerEffect: <EVENT_OUT extends ALL_EVENT>(
    effect: EffectFunction<ALL_STATE, ALL_EVENT, EVENT_OUT>,
  ) => void
  registerSourceEffect: <EVENT_OUT extends ALL_EVENT>(
    sourceEffect: SourceEffectFunction<ALL_STATE, EVENT_OUT>,
  ) => void
}

// Positional rather than an options object, because this is redux's reducer contract: the shape is
// dictated by combineReducers, not by us.
export type Reducer<STATE, EVENT extends DomainEvent = DomainEvent> = (
  state: STATE | undefined,
  event: EVENT,
) => STATE

export type ReducersObject<ALL_STATE extends JsonObject, ALL_EVENT extends DomainEvent> = {
  [KEY in keyof ALL_STATE]: Reducer<ALL_STATE[KEY], ALL_EVENT>
}

// Matched on the slice's own members rather than on StoreSlice, whose second parameter is
// constrained by its first and so cannot be left open for inference.
export type NamespacedState<SLICE> = SLICE extends {
  name: infer NAMESPACE extends string
  reducer: Reducer<infer STATE>
}
  ? ObjectWithStringLiteralKey<NAMESPACE, STATE>
  : never

export type NamespacedStoreEvent<
  NAMESPACE extends string,
  SUB_TYPE extends string,
  PAYLOAD extends Serializable = undefined,
> = DomainEvent<`${NAMESPACE}/${SUB_TYPE}`, PAYLOAD>

export type CaseReducer<STATE, EVENT extends DomainEvent = DomainEvent> = (
  state: STATE,
  event: EVENT,
) => STATE

// The event is `never` so that a case reducer declaring the one event it handles still satisfies
// this. Under strictFunctionTypes a reducer taking `AppendA` is not assignable to one taking any
// DomainEvent, but it is assignable to one taking `never`.
export type CaseReducersObject<STATE> = Record<string, CaseReducer<STATE, never>>

export type StoreSliceConfig<
  STATE,
  CASE_REDUCERS extends CaseReducersObject<STATE>,
  NAMESPACE extends string = string,
> = {
  name: NAMESPACE
  initialState: STATE
  reducers: CASE_REDUCERS
}

export type StoreEventCreator<EVENT extends DomainEvent> = EVENT extends {
  type: infer TYPE extends string
  payload: infer PAYLOAD extends Serializable
}
  ? undefined extends PAYLOAD
    ? () => EVENT
    : (payload: PAYLOAD) => DomainEvent<TYPE, PAYLOAD>
  : never

export type StoreEventCreators<STATE, CASE_REDUCERS extends CaseReducersObject<STATE>> =
  CASE_REDUCERS extends Record<infer KEY extends string, CaseReducer<STATE, never>>
    ? {
        [K in KEY]: CASE_REDUCERS[K] extends (
          state: never,
          event: infer EVENT extends DomainEvent,
        ) => unknown
          ? StoreEventCreator<EVENT>
          : StoreEventCreator<DomainEvent>
      }
    : never

export type StoreSlice<
  STATE = unknown,
  CASE_REDUCERS extends CaseReducersObject<STATE> = CaseReducersObject<STATE>,
  NAMESPACE extends string = string,
> = {
  name: NAMESPACE
  reducer: Reducer<STATE>
  eventCreators: StoreEventCreators<STATE, CASE_REDUCERS>
} & StateMapper<STATE, NAMESPACE>

export type StateMapper<STATE, NAMESPACE extends string> = {
  [KEY in keyof ObjectWithStringLiteralKey<NAMESPACE, STATE> as `stateTo${Capitalize<KEY>}`]: (
    allState: ObjectWithStringLiteralKey<NAMESPACE, STATE>,
  ) => STATE
}

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
  const observedEvent$ = new Subject<EVENT>()
  event$$.pipe(mergeAll()).subscribe((event) => {
    store.dispatch(event)
    observedEvent$.next(event)
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
    event$: observedEvent$,
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
