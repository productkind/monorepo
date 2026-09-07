import type { DomainEvent } from '@dungarees/core/event.ts'
import type {
  JsonObject,
  ObjectWithStringLiteralKey,
  Serializable,
} from '@dungarees/core/type-util.ts'

import type { Observable } from 'rxjs'

export type Store<ALL_STATE, ALL_EVENT extends DomainEvent> = StateReadable<ALL_STATE> &
  EventReceiver<ALL_EVENT> &
  EffectRegistry<ALL_STATE, ALL_EVENT>

export type StoreImportExport<ALL_STATE> = {
  importState: (state: ALL_STATE) => void
  exportState: () => ALL_STATE
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

// A plain object rather than an Error, so it survives being held in the store and exported.
export type StoreError = {
  message: string
  stack: string
}

// An effect is handed every event the store reduces and answers with events of its own, which need
// only be some of them: a navigation effect reads an application-wide union and emits navigation
// events back into it. Hence the separate in and out parameters — one type in both positions would
// force every effect to be written against the whole application's event union.
export type EffectFunction<
  STATE,
  EVENT_IN extends DomainEvent,
  EVENT_OUT extends DomainEvent = EVENT_IN,
> = (event$: Observable<EVENT_IN>, state$: Observable<STATE>) => Observable<EVENT_OUT>

export type SourceEffectFunction<STATE, EVENT_OUT extends DomainEvent> = (
  state$: Observable<STATE>,
) => Observable<EVENT_OUT>

export type Effect<
  STATE,
  EVENT_IN extends DomainEvent,
  EFFECTS extends string,
  SOURCE_EFFECTS extends string = never,
  EVENT_OUT extends DomainEvent = EVENT_IN,
> = {
  [KEY in EFFECTS]: EffectFunction<STATE, EVENT_IN, EVENT_OUT>
} & {
  [KEY in SOURCE_EFFECTS]: SourceEffectFunction<STATE, EVENT_OUT>
}
