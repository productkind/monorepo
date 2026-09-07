import type { ConnectionBuilder, Datasource } from '../type.ts'

import { CamelCasePlugin } from 'kysely'
import { randomUUID } from 'node:crypto'
import { DataType, newDb } from 'pg-mem'

// pg-mem hands interval operands over untyped, so this states the shape the operator relies on.
type PostgresInterval = {
  years?: number
  months?: number
  days?: number
  hours?: number
  minutes: number
  seconds?: number
  milliseconds?: number
}

// The registrations below fill in the few things pg-mem does not implement itself.
export const createInMemoryPostgresConnectionBuilder = (): ConnectionBuilder => {
  const mem = newDb()
  const catalog = mem.getSchema('pg_catalog')

  catalog.registerOperator({
    operator: '!~',
    left: DataType.text,
    right: DataType.text,
    returns: DataType.bool,
    // '!~' is "does not match", so the result of the match is negated.
    implementation: (value, pattern) => !new RegExp(String(pattern)).test(String(value)),
  })

  catalog.registerOperator({
    operator: '*',
    left: DataType.integer,
    right: DataType.interval,
    returns: DataType.interval,
    implementation: (factor: number, interval: PostgresInterval) => {
      const totalMinutes = interval.minutes * factor
      return {
        years: interval.years,
        months: interval.months,
        days: interval.days,
        // The parenthesis matters: hours carried out of the multiplied minutes have to be added to
        // the interval's own hours, not discarded when it happens to have some.
        hours: (interval.hours ?? 0) + Math.floor(totalMinutes / 60),
        minutes: totalMinutes % 60,
        seconds: interval.seconds,
        milliseconds: interval.milliseconds,
      }
    },
  })

  mem.public.registerFunction({
    name: 'gen_random_uuid',
    implementation: () => randomUUID(),
  })

  return <SCHEMA>() =>
    mem.adapters.createKysely(undefined, {
      plugins: [new CamelCasePlugin()],
      // pg-mem's adapter is typed against its own loose schema; this is the boundary at which the
      // application's schema is declared.
    }) as Datasource<SCHEMA>
}
