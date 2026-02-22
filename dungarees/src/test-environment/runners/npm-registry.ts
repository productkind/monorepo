import type { Runner } from '../type.ts'
import type { StartedNetwork, StartedTestContainer } from 'testcontainers'
import { GenericContainer, Wait } from 'testcontainers'

export type NpmRegistryRunnerConfig = {
  port: number
  environment?: Record<string, string>
  network?: StartedNetwork
  alias?: string
  localScopes?: string[]
}

const generateVerdaccioConfig = (localScopes: string[]): string => {
  const localScopeRules = localScopes
    .map(scope => `  '${scope}/*':\n    access: $all\n    publish: $authenticated`)
    .join('\n')

  return `storage: /verdaccio/storage/data
auth:
  htpasswd:
    file: /verdaccio/storage/htpasswd
uplinks:
  npmjs:
    url: https://registry.npmjs.org/
packages:
${localScopeRules}
  '@*/*':
    access: $all
    publish: $authenticated
    proxy: npmjs
  '**':
    access: $all
    publish: $authenticated
    proxy: npmjs
`
}

export const npmRegistryRunner = ({
  port,
  environment = {},
  network,
  alias,
  localScopes,
}: NpmRegistryRunnerConfig): Runner => {
  let runningContainer: StartedTestContainer | undefined

  const container = new GenericContainer('verdaccio/verdaccio')
    .withExposedPorts({
      container: port,
      host: port,
    })
    .withEnvironment(environment)
    .withLogConsumer((stream) => {
      stream.on('data', (line) => {
        console.log(line)
      })
      stream.on('err', (line) => {
        console.error(line)
      })
      stream.on('end', () => {
        console.log('Verdaccio container closed')
      })
    })
    .withWaitStrategy(Wait.forListeningPorts().withStartupTimeout(300_000))

  if (localScopes !== undefined) {
    container.withCopyContentToContainer([{
      content: generateVerdaccioConfig(localScopes),
      target: '/verdaccio/conf/config.yaml',
    }])
  }

  if (alias !== undefined) {
    container.withName(alias)
  }

  if (network !== undefined) {
    container.withNetwork(network)
  }


  return {
    start: async () => {
      runningContainer = await container.start()
    },
    stop: async () => {
      if (runningContainer !== undefined) {
        await runningContainer.stop()
        console.log(`Verdaccio container stopped: ${alias ?? 'npm-registry'}`)
      }
    },
  }
}
