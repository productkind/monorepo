import { type StepParameters, toCucumberStep } from './step.ts'
import { createTestEnvironment } from './test-environment.ts'
import type { ServiceConfig } from './test-environment.ts'
import type { TestEnvironmentWorld } from './world.ts'

import {
  After,
  AfterAll,
  Before,
  BeforeAll,
  Given as CucumberGiven,
  Then as CucumberThen,
  When as CucumberWhen,
  setDefaultTimeout,
  setWorldConstructor,
  Status,
  World,
} from '@cucumber/cucumber'
import { type ITestCaseHookParameter } from '@cucumber/cucumber'

type DefineStep<SERVICES extends Record<string, ServiceConfig>> = <EXPRESSION extends string>(
  expression: EXPRESSION,
  callback: (
    world: TestEnvironmentWorld<SERVICES>,
    ...parameters: StepParameters<EXPRESSION>
  ) => Promise<void>,
) => void

type CucumberTestEnvironment<SERVICES extends Record<string, ServiceConfig>> = {
  Given: DefineStep<SERVICES>
  When: DefineStep<SERVICES>
  Then: DefineStep<SERVICES>
}

export const createCucumberTestEnvironment = <SERVICES extends Record<string, ServiceConfig>>(
  services: SERVICES,
  options: {
    timeout?: number
  } = {},
): CucumberTestEnvironment<SERVICES> => {
  setDefaultTimeout(options.timeout ?? 60 * 1000)
  const testEnvironment = createTestEnvironment(services)

  class TestEnvironmentWorld extends World {
    debug = false
    testEnvironmentWorld = testEnvironment.createWorld()
  }

  setWorldConstructor(TestEnvironmentWorld)

  BeforeAll(async function () {
    const entry$ = await testEnvironment.onBeforeAll()
    entry$.subscribe(({ entry, type }) => {
      console.log(entry, type)
    })
  })

  Before({ tags: '@ignore' }, function () {
    return 'skipped'
  })

  Before({ tags: '@debug' }, function (this: TestEnvironmentWorld) {
    this.debug = true
  })

  Before(async function (this: TestEnvironmentWorld) {
    const entry$ = await testEnvironment.onBefore(this.testEnvironmentWorld)
    entry$.subscribe(({ entry, type }) => {
      this.attach(entry as string, type)
    })
  })

  After(async function (this: TestEnvironmentWorld, { result, pickle }: ITestCaseHookParameter) {
    if (result?.status !== Status.PASSED) {
      const testName = pickle.name.replace(/\W/g, '-')
      const entries = await testEnvironment.onFailure(this.testEnvironmentWorld, testName)
      for (const { entry, type } of entries) {
        this.attach(entry as string, type)
      }
    }
    this.attach(`Status: ${result?.status ?? ''}. Duration:${result?.duration?.seconds ?? ''}s`)
    const entry$ = await testEnvironment.onAfter(this.testEnvironmentWorld)
    entry$.subscribe(({ entry, type }) => {
      this.attach(entry as string, type)
    })
  })

  AfterAll(async function () {
    const entry$ = await testEnvironment.onAfterAll()
    entry$.subscribe(({ entry, type }) => {
      console.log(entry, type)
    })
  })

  return {
    Given: (expression, callback) => {
      CucumberGiven(expression, toCucumberStep({ expression, callback }))
    },
    When: (expression, callback) => {
      CucumberWhen(expression, toCucumberStep({ expression, callback }))
    },
    Then: (expression, callback) => {
      CucumberThen(expression, toCucumberStep({ expression, callback }))
    },
  }
}
