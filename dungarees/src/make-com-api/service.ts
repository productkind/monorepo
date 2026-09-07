import {
  createGetScenarioRequest,
  createListScenarioRequest,
  createScenarioActionRequest,
  type ScenarioApiClient,
} from './api.ts'
import {
  SCENARIO_ACTIONS,
  type ScenarioAction,
  type ScenarioActionResponse,
  type ScenarioRequestParams,
  type ScenarioService,
} from './type.ts'

import type { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

export const createScenarioService = (scenarioApiClient: ScenarioApiClient): ScenarioService => {
  const runAction = (
    action: ScenarioAction,
    params: ScenarioRequestParams,
  ): Observable<ScenarioActionResponse | undefined> =>
    scenarioApiClient(createScenarioActionRequest({ ...params, action })).pipe(
      map(({ scenario }) => scenario),
    )

  return {
    // Make answers a list request with no scenarios key at all when there are none.
    getAllScenarios: (params) =>
      scenarioApiClient(createListScenarioRequest(params)).pipe(
        map(({ scenarios }) => scenarios ?? []),
      ),

    getScenarioById: (params) =>
      scenarioApiClient(createGetScenarioRequest(params)).pipe(map(({ scenario }) => scenario)),

    startScenario: (params) => runAction(SCENARIO_ACTIONS.start, params),

    stopScenario: (params) => runAction(SCENARIO_ACTIONS.stop, params),
  }
}
