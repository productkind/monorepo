import { createEventCreators, type DomainEventOf } from '@dungarees/core/event.ts'

export type MisdeclaredDependency = {
  name: string
  expected: 'dependency' | 'devDependency'
}

type AuditDependenciesEventPayloads = {
  'audit-start': { dir: string }
  'package-findings': {
    name: string
    missing: string[]
    unused: string[]
    misdeclared: MisdeclaredDependency[]
  }
  'audit-passed': { packageCount: number }
  'audit-failed': { packageCount: number }
}

export type AuditDependenciesEvent = DomainEventOf<AuditDependenciesEventPayloads>

export const eventCreators = createEventCreators<AuditDependenciesEventPayloads>()
