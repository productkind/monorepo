import type { CommandResult, ExecContext } from '@dungarees/test-environment/interactors/node-command-line.ts'
import { Given, Then, When } from '../support/test-environment.ts'


Given('the Dungarees Binary is published', async function (world) {
  const npmPublisher = world.get('dungareesNpmPublisher')
  await publishDungareesBinary(npmPublisher.execWithAssertions)
})

When('the user installs the Dungarees Binary', async function (world) {
  const nodeCommandLine = world.get('nodeCommandLine')
  console.log(await nodeCommandLine.execWithAssertions('npm install -g @dungarees/core --registry http://npmregistry:4873'))
})

Then('the user should be able to run dungarees', async function (world) {
  const nodeCommandLine = world.get('nodeCommandLine')
  console.log(await nodeCommandLine.execWithAssertions('dungarees --help'))
})

const publishDungareesBinary = async (npmPublisherExec: (command: string, context?: Partial<ExecContext>) => Promise<CommandResult>) => {
  await authenticateNpmRegistry(npmPublisherExec)
  await npmPublisherExec('npm install', { workingDir: '/opt/app/' })
  await npmPublisherExec('npm run publish:dungarees -- --registry http://npmregistry:4873', { workingDir: '/opt/app/' })
}

const authenticateNpmRegistry = async (npmPublisherExec: (command: string) => Promise<CommandResult>) => {
  const response = await fetch('http://localhost:4873/-/user/org.couchdb.user:test', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name: 'test', password: 'test' })
  })
  const data = await response.json()
  await npmPublisherExec(`echo "//npmregistry:4873/:_authToken=${data.token}" > /root/.npmrc`)
  await npmPublisherExec('cat ~/.npmrc')
}
