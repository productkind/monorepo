import type { Observable } from 'rxjs'

export type UserInfo = {
  id: number
  name: string
  email: string
}

export type Scenario = {
  id: number
  name: string
  teamId?: number
  hookId?: number
  deviceId?: number
  description?: string
  folderId?: number
  isinvalid: boolean
  islinked: boolean
  islocked: boolean
  isPaused: boolean
  lastEdit: string
  scheduling?: {
    type: string
    interval: number
  }
  iswaiting: boolean
  usedPackages: string[]
  nextExec: string
  createdByUser: UserInfo
  updatedByUser: UserInfo
}

export type ScenarioActionResponse = Pick<Scenario, 'id' | 'islinked'>

export const SCENARIO_ACTIONS = {
  start: 'start',
  stop: 'stop',
} as const

export type ScenarioAction = (typeof SCENARIO_ACTIONS)[keyof typeof SCENARIO_ACTIONS]

// Make identifies the caller by organization or by team, never by both.
export type AuthSearchParams = { teamId?: string } | { organizationId: string }

export type AuthParams = {
  accessToken: string
}

export type ScenarioRequestParams = AuthParams & {
  scenarioId: number
}

export type ScenarioService = {
  getAllScenarios: (params: AuthParams & AuthSearchParams) => Observable<Scenario[]>
  getScenarioById: (params: ScenarioRequestParams) => Observable<Scenario | undefined>
  startScenario: (params: ScenarioRequestParams) => Observable<ScenarioActionResponse | undefined>
  stopScenario: (params: ScenarioRequestParams) => Observable<ScenarioActionResponse | undefined>
}
