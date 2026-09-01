import type { InteractorConfig, RunnerConfig, ServiceConfig } from './type.ts'

import type { FilterRecord, GetKey, RecordToEntries } from '@dungarees/core/type-util.ts'

export type InteractorNames<SERVICES extends Record<string, ServiceConfig>> = GetKey<
  RecordToEntries<FilterRecord<SERVICES, InteractorConfig>>
>

export type RunnerNames<SERVICES extends Record<string, ServiceConfig>> = GetKey<
  RecordToEntries<FilterRecord<SERVICES, RunnerConfig>>
>

// Narrows the name, not the config. A guard on the config alone tells TypeScript nothing about
// which key it came from, so the interactor and runner maps — keyed by their own subset of the
// service names — cannot be written to without it.
export const isInteractorName = <SERVICES extends Record<string, ServiceConfig>>(
  serviceConfigs: SERVICES,
  name: string,
): name is InteractorNames<SERVICES> & string => serviceConfigs[name]?.type === 'interactor'

export const isRunnerName = <SERVICES extends Record<string, ServiceConfig>>(
  serviceConfigs: SERVICES,
  name: string,
): name is RunnerNames<SERVICES> & string => serviceConfigs[name]?.type === 'runner'
