
type FakeNodeProcessConfig = {
  userId?: number
  groups?: number[]
  platform?: NodeJS.Platform
}

export const DEFAULT_FAKE_NODE_PROCESS_CONFIG: Required<FakeNodeProcessConfig> = {
  userId: 1000,
  groups: [1000],
  platform: 'linux',
}

export const createFakeNodeProcess: (config?: FakeNodeProcessConfig) => NodeJS.Process = (config) => {
  const finalConfig = { ...DEFAULT_FAKE_NODE_PROCESS_CONFIG, ...config ?? {} }

  return {
    getuid: finalConfig.platform === 'win32' ? undefined : () => finalConfig.userId,
    getgid: finalConfig.platform === 'win32' ? undefined : () => finalConfig.groups[0],
    getgroups: finalConfig.platform === 'win32' ? undefined : () => finalConfig.groups,
    platform: finalConfig.platform,
  } as unknown as NodeJS.Process
}


