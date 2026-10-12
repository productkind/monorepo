import type { Runner } from '@bobcats-coding/skid/test/type.js'
import type { StartedNetwork, StartedTestContainer } from 'testcontainers'
import { GenericContainer, Wait } from 'testcontainers'

export type NodeProcessSource = { path: string } | { bindMount: string }

export type NodeProcessRunnerConfig = NodeProcessSource & {
  args: string[]
  ports: number[]
  environment?: Record<string, string>
  network?: StartedNetwork
}

export const nodeProcessRunner = (config: NodeProcessRunnerConfig): Runner => {
  const { args, ports, environment = {}, network } = config
  const source = 'bindMount' in config ? config.bindMount : config.path
  let runningContainer: StartedTestContainer | undefined

  const container = new GenericContainer('node:24-bullseye')
    .withWorkingDir('/opt/app')
    .withEnvironment(environment)
    .withExposedPorts(...ports.map((port) => ({ container: port, host: port })))
    .withEntrypoint(args)
    .withLogConsumer((stream) => {
      stream.on('data', (line) => {
        console.log(line)
      })
      stream.on('err', (line) => {
        console.error(line)
      })
      stream.on('end', () => {
        console.log(`Container closed: ${source} ${args.join(' ')}}`)
      })
    })
    .withWaitStrategy(Wait.forListeningPorts().withStartupTimeout(300_000))

  if (network !== undefined) {
    container.withNetwork(network)
  }

  if ('bindMount' in config) {
    container.withBindMounts([{ source, target: '/opt/app/', mode: 'rw' }])
  } else {
    container.withCopyDirectoriesToContainer([{ source, target: '/opt/app/' }])
  }

  return {
    start: async () => {
      runningContainer = await container.start()
    },
    stop: async () => {
      if (runningContainer !== undefined) {
        await runningContainer.stop()
        console.log(`Container stopped: ${source} ${args.join(' ')}}`)
      }
    },
  }
}
