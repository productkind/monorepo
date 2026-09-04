import { parseJson } from '@dungarees/zod/json.ts'

import { z } from 'zod'
import { $ } from 'zx'

const WORKSPACE_INFO = z.object({ children: z.object({ Version: z.string() }) })

export const getPackageVersionInWorkspace = async (
  workspaceName: string,
  path: string,
): Promise<string> => {
  const output =
    await $`yarn workspace ${workspaceName} info ${workspaceName}@workspace:${path} --json`.quiet()
  const info = parseJson({
    json: output.stdout,
    schema: WORKSPACE_INFO,
    message: `Unexpected \`yarn workspace info\` output for ${workspaceName}`,
  })

  return info.children.Version.trim()
}

export const getPackageVersion = async (): Promise<string> => {
  const output = await $`npm pkg get version`.quiet()

  // The command prints the version as a JSON string, so parsing it is what unquotes it.
  return parseJson({
    json: output.stdout,
    schema: z.string(),
    message: 'Unexpected `npm pkg get version` output',
  })
}
