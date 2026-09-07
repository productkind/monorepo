import {
  createGetScenarioRequest,
  createListScenarioRequest,
  createScenarioActionRequest,
  type ScenarioApi,
  type ScenarioApiClient,
} from './api.ts'
import { type Scenario, SCENARIO_ACTIONS } from './type.ts'

import { createStubRestClient } from '@dungarees/rest/stub.ts'
import type { StubEndpoint } from '@dungarees/rest/type.ts'

export const FAKE_USER = {
  id: 1,
  name: 'Test User',
  email: 'test@email.com',
}

export const FAKE_SCENARIO: Scenario = {
  id: 1,
  name: 'Test Scenario',
  description: 'This is a test scenario',
  teamId: 1,
  scheduling: {
    type: 'interval',
    interval: 5000,
  },
  lastEdit: '2021-08-10T15:00:00.000Z',
  isinvalid: false,
  islinked: false,
  islocked: false,
  isPaused: false,
  iswaiting: false,
  usedPackages: [],
  nextExec: '2021-08-10T15:00:00.000Z',
  createdByUser: FAKE_USER,
  updatedByUser: FAKE_USER,
}

export const createScenarioApiStub = ({
  accessToken = '12345',
  organizationId = '1',
  scenario = FAKE_SCENARIO,
}: {
  accessToken?: string
  organizationId?: string
  scenario?: Scenario
} = {}): ScenarioApiClient => {
  const endpoints = [
    {
      request: createListScenarioRequest({ accessToken, organizationId }),
      response: { scenarios: [scenario] },
    },
    {
      request: createGetScenarioRequest({ accessToken, scenarioId: scenario.id }),
      response: { scenario },
    },
    {
      request: createScenarioActionRequest({
        accessToken,
        scenarioId: scenario.id,
        action: SCENARIO_ACTIONS.start,
      }),
      response: { scenario: { id: scenario.id, islinked: true } },
    },
    {
      request: createScenarioActionRequest({
        accessToken,
        scenarioId: scenario.id,
        action: SCENARIO_ACTIONS.stop,
      }),
      response: { scenario: { id: scenario.id, islinked: false } },
    },
  ] as const satisfies ReadonlyArray<StubEndpoint<ScenarioApi>>

  return createStubRestClient<ScenarioApi, typeof endpoints>(endpoints)
}
