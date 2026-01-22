import { assertDefined } from '@dungarees/core/util.ts'

export type ProcessService = {
  getUserId: () => number
  getGroups: () => number[]
  isRoot: () => boolean
}

export const createProcessService = (nodeProcess: NodeJS.Process): ProcessService => {
  return {
    getUserId: () => {
      const uid = nodeProcess.getuid?.()
      return assertDefined(uid, `getuid is not supported on this platform: ${nodeProcess.platform}`)
    },
    getGroups: () => {
      const groups = nodeProcess.getgroups?.()
      return assertDefined(
        groups,
        `getgroups is not supported on this platform: ${nodeProcess.platform}`,
      )
    },
    isRoot: () => {
      const uid = nodeProcess.getuid?.()
      return assertDefined(
        uid,
        `getuid is not supported on this platform: ${nodeProcess.platform}`,
      ) === 0
    }
  }
}
