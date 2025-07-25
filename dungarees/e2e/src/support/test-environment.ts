
import { createCucumberTestEnvironment } from '@dungarees/test-environment/cucumber-test-environment.ts'

import { nodeCommandLineInteractor } from '@dungarees/test-environment/interactors/node-command-line.ts'
import { npmRegistryRunner } from '@dungarees/test-environment/runners/npm-registry.ts'
import { networkInteractor } from '@dungarees/test-environment/interactors/network.ts'

import { type StartedNetwork } from 'testcontainers'

let networkSingleton: StartedNetwork | undefined
let initializationPromise: Promise<StartedNetwork> | null = null

const getNetworkSingleton = async (): Promise<StartedNetwork> => {
  if (networkSingleton !== undefined) {
    return networkSingleton
  }

  if (initializationPromise === null) {
    initializationPromise = initializeNetwork()
  }

  return await initializationPromise
}

const initializeNetwork = async (): Promise<StartedNetwork> => {
  const network = networkInteractor()
  await network.start()
  const networkContext = await network.startContext()
  networkSingleton = networkContext.context.network
  return networkSingleton
}

export const { Given, When, Then } = createCucumberTestEnvironment({
  nodeCommandLine: {
    creator: async () => nodeCommandLineInteractor({
      workingDir: '/opt/app',
      network: await getNetworkSingleton(),
    }),
    type: 'interactor',
    hook: 'before-all',
  },
  dungareesNpmRegistry: {
    creator: async () =>
      npmRegistryRunner({
        port: 4873,
        network: await getNetworkSingleton(),
        alias: 'npmregistry',
      }),
    type: 'runner',
    hook: 'before-all',
  },
  dungareesNpmPublisher: {
    creator: async () =>
      nodeCommandLineInteractor({
        path: `${String(process.cwd()) ?? ''}/../..`,
        workingDir: '/opt/app',
        network: await getNetworkSingleton(),
        environment: {
          NPM_CONFIG_REGISTRY: 'http://npmregistry:4873',
          NPM_CONFIG_ALWAYS_AUTH: 'false',
          NPM_CONFIG_USERNAME: 'test',
          NPM_CONFIG_PASSWORD: 'test',
          NPM_CONFIG_EMAIL: 'test@example.com',
          NPM_CONFIG_AUTH_TYPE: 'legacy'
        }
      }),
    type: 'interactor',
    hook: 'before-all',
  },
}, {
  timeout: 60 * 1000 * 1000,
})
