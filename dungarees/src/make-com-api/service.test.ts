import {
  createGetScenarioRequest,
  createListScenarioRequest,
  createScenarioActionRequest,
  createScenarioApiClient,
  MAKE_COM_BASE_URL,
  SCENARIO_BASE_PATHNAME,
} from './api.ts'
import { createScenarioService } from './service.ts'
import { createScenarioApiStub, FAKE_SCENARIO } from './stub.ts'
import { SCENARIO_ACTIONS } from './type.ts'

import { mtest } from '@dungarees/core/marbles-vitest.ts'

import { firstValueFrom } from 'rxjs'
import { expect, test } from 'vitest'

const AUTH = { accessToken: '12345', organizationId: '1' }

const createService = (): ReturnType<typeof createScenarioService> =>
  createScenarioService(createScenarioApiStub())

mtest('getAllScenarios lists the scenarios Make answered with', ({ expect }) => {
  expect(createService().getAllScenarios(AUTH)).toBeObservable('-(s|)', {
    s: [FAKE_SCENARIO],
  })
})

mtest('getScenarioById returns the scenario that was asked for', ({ expect }) => {
  expect(
    createService().getScenarioById({ accessToken: AUTH.accessToken, scenarioId: 1 }),
  ).toBeObservable('-(s|)', { s: FAKE_SCENARIO })
})

mtest('startScenario reports the scenario as linked', ({ expect }) => {
  expect(
    createService().startScenario({ accessToken: AUTH.accessToken, scenarioId: 1 }),
  ).toBeObservable('-(s|)', { s: { id: 1, islinked: true } })
})

mtest('stopScenario reports the scenario as unlinked', ({ expect }) => {
  expect(
    createService().stopScenario({ accessToken: AUTH.accessToken, scenarioId: 1 }),
  ).toBeObservable('-(s|)', { s: { id: 1, islinked: false } })
})

test('a request with the wrong access token is not answered', async () => {
  await expect(
    firstValueFrom(createService().getAllScenarios({ accessToken: 'wrong', organizationId: '1' })),
  ).rejects.toThrow('No stubbed endpoint matches the request')
})

test('a list request identifies the caller by organization when one is given', () => {
  expect(
    createListScenarioRequest({ accessToken: 'token', organizationId: 'org', teamId: 'team' }),
  ).toEqual({
    method: 'GET',
    pathname: SCENARIO_BASE_PATHNAME,
    search: { organizationId: 'org' },
    headers: { Authorization: 'Token token' },
  })
})

test('a list request falls back to the team when there is no organization', () => {
  expect(createListScenarioRequest({ accessToken: 'token', teamId: 'team' })).toHaveProperty(
    'search',
    { teamId: 'team' },
  )
})

test('a list request identifies nobody when neither is given', () => {
  expect(createListScenarioRequest({ accessToken: 'token' })).toHaveProperty('search', {})
})

test('a single scenario request addresses the scenario by id', () => {
  expect(createGetScenarioRequest({ accessToken: 'token', scenarioId: 7 })).toEqual({
    method: 'GET',
    pathname: 'api/v2/scenarios/7',
    headers: { Authorization: 'Token token' },
  })
})

test('an action request posts to the action path of the scenario', () => {
  expect(
    createScenarioActionRequest({
      accessToken: 'token',
      scenarioId: 7,
      action: SCENARIO_ACTIONS.start,
    }),
  ).toEqual({
    method: 'POST',
    pathname: 'api/v2/scenarios/7/start',
    headers: { Authorization: 'Token token' },
  })
})

test('the two scenario actions are start and stop', () => {
  expect(Object.values(SCENARIO_ACTIONS)).toEqual(['start', 'stop'])
})

test('the client defaults to the Make host', () => {
  expect(MAKE_COM_BASE_URL).toBe('https://eu2.make.com')
  expect(typeof createScenarioApiClient()).toBe('function')
})

test('the client can be pointed at another host', () => {
  expect(typeof createScenarioApiClient('https://make.example.com')).toBe('function')
})
