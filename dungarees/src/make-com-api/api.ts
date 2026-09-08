import type { AuthSearchParams, Scenario, ScenarioAction, ScenarioActionResponse } from './type.ts'

import { createJsonRestClient } from '@dungarees/rest/json.ts'
import type { AUTH_HEADER, RestEndpoint } from '@dungarees/rest/type.ts'

export const MAKE_COM_BASE_URL = 'https://eu2.make.com'

export const SCENARIO_BASE_PATHNAME = 'api/v2/scenarios'

export type ScenarioApiListRequest = {
  method: 'GET'
  pathname: typeof SCENARIO_BASE_PATHNAME
  search: AuthSearchParams
  headers: AUTH_HEADER
}

export type ScenarioApiListResponse = {
  scenarios: Scenario[]
}

export type ScenarioApiListEndpoint = RestEndpoint<ScenarioApiListRequest, ScenarioApiListResponse>

export type ScenarioApiSingleRequest = {
  method: 'GET'
  pathname: `${typeof SCENARIO_BASE_PATHNAME}/${number}`
  headers: AUTH_HEADER
}

export type ScenarioApiSingleResponse = {
  scenario: Scenario
}

export type ScenarioApiSingleEndpoint = RestEndpoint<
  ScenarioApiSingleRequest,
  ScenarioApiSingleResponse
>

export type ScenarioApiActionRequest = {
  method: 'POST'
  pathname: `${typeof SCENARIO_BASE_PATHNAME}/${number}/${ScenarioAction}`
  headers: AUTH_HEADER
}

export type ScenarioApiActionResponse = {
  scenario: ScenarioActionResponse
}

export type ScenarioApiActionEndpoint = RestEndpoint<
  ScenarioApiActionRequest,
  ScenarioApiActionResponse
>

export type ScenarioApi =
  ScenarioApiListEndpoint | ScenarioApiSingleEndpoint | ScenarioApiActionEndpoint

export type ScenarioApiClient = ReturnType<typeof createJsonRestClient<ScenarioApi>>

// A creator rather than a module-level client, so the base url is configurable and no network
// client is built as a side effect of importing this module.
export const createScenarioApiClient = (baseUrl: string = MAKE_COM_BASE_URL): ScenarioApiClient =>
  createJsonRestClient<ScenarioApi>(baseUrl)

const toAuthHeader = (accessToken: string): AUTH_HEADER => ({
  Authorization: `Token ${accessToken}`,
})

// An organization narrows further than a team, so it wins when both are given.
const toAuthSearch = ({
  organizationId,
  teamId,
}: {
  organizationId?: string
  teamId?: string
}): AuthSearchParams => {
  if (organizationId !== undefined) {
    return { organizationId }
  }
  return teamId !== undefined ? { teamId } : {}
}

export const createListScenarioRequest = ({
  accessToken,
  organizationId,
  teamId,
}: {
  accessToken: string
  organizationId?: string
  teamId?: string
}): ScenarioApiListRequest => ({
  method: 'GET',
  pathname: SCENARIO_BASE_PATHNAME,
  search: toAuthSearch({
    ...(organizationId !== undefined && { organizationId }),
    ...(teamId !== undefined && { teamId }),
  }),
  headers: toAuthHeader(accessToken),
})

export const createGetScenarioRequest = ({
  scenarioId,
  accessToken,
}: {
  scenarioId: number
  accessToken: string
}): ScenarioApiSingleRequest => ({
  method: 'GET',
  pathname: `${SCENARIO_BASE_PATHNAME}/${scenarioId}`,
  headers: toAuthHeader(accessToken),
})

export const createScenarioActionRequest = ({
  action,
  scenarioId,
  accessToken,
}: {
  action: ScenarioAction
  scenarioId: number
  accessToken: string
}): ScenarioApiActionRequest => ({
  method: 'POST',
  pathname: `${SCENARIO_BASE_PATHNAME}/${scenarioId}/${action}`,
  headers: toAuthHeader(accessToken),
})
