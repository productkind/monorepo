import { createFakeIdGeneratorBackend } from './fake.ts'
import { createIdGeneratorService } from './service.ts'
import { createUuidv7Backend } from './uuidv7.ts'

import { expect, test } from 'vitest'

const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-7[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/

test('generateUuid returns a version 7 uuid', () => {
  const idGenerator = createIdGeneratorService(createUuidv7Backend())

  expect(idGenerator.generateUuid()).toMatch(UUID_PATTERN)
})

test('generateUuid returns a different id every time', () => {
  const idGenerator = createIdGeneratorService(createUuidv7Backend())

  const ids = new Set(Array.from({ length: 100 }, () => idGenerator.generateUuid()))

  expect(ids.size).toBe(100)
})

test('generateUuid returns ids that sort in the order they were created', () => {
  const idGenerator = createIdGeneratorService(createUuidv7Backend())

  const ids = Array.from({ length: 10 }, () => idGenerator.generateUuid())

  expect([...ids].sort()).toEqual(ids)
})

test('the fake backend hands out predictable, numbered ids', () => {
  const { backend } = createFakeIdGeneratorBackend()
  const idGenerator = createIdGeneratorService(backend)

  expect([idGenerator.generateUuid(), idGenerator.generateUuid()]).toEqual([
    'fake-uuid-1',
    'fake-uuid-2',
  ])
})

test('the fake backend records the ids it handed out', () => {
  const { backend, uuidRequests } = createFakeIdGeneratorBackend()
  const idGenerator = createIdGeneratorService(backend)

  idGenerator.generateUuid()
  idGenerator.generateUuid()

  expect(uuidRequests).toEqual(['fake-uuid-1', 'fake-uuid-2'])
})
