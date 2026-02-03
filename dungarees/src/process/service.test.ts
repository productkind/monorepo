import { test, expect } from 'vitest'
import { createFakeNodeProcess } from './fake'
import { createProcessService } from './service'

test('processService getUserId returns correct user ID', () => {
  const fakeProcess = createFakeNodeProcess({ userId: 1001 })
  const processService = createProcessService(fakeProcess)

  const userId = processService.getUserId()
  expect(userId).toBe(1001)
})

test('processService getUserId throws on unsupported platform', () => {
  const fakeProcess = createFakeNodeProcess({ platform: 'win32' })
  const processService = createProcessService(fakeProcess)

  expect(() => processService.getUserId()).toThrow(
    'getuid is not supported on this platform: win32'
  )
})

test('processService getGroups returns correct groups', () => {
  const fakeProcess = createFakeNodeProcess({ groups: [1001, 1002, 1003] })
  const processService = createProcessService(fakeProcess)

  const groups = processService.getGroups()
  expect(groups).toEqual([1001, 1002, 1003])
})

test('processService getGroups throws on unsupported platform', () => {
  const fakeProcess = createFakeNodeProcess({ platform: 'win32' })
  const processService = createProcessService(fakeProcess)

  expect(() => processService.getGroups()).toThrow(
    'getgroups is not supported on this platform: win32'
  )
})

test('processService.isRoot true if user id is 0', () => {
  const fakeProcess = createFakeNodeProcess({ userId: 0 })
  const processService = createProcessService(fakeProcess)

  expect(processService.isRoot()).toBe(true)
})

test('processService.isRoot throws on unsupported platform', () => {
  const fakeProcess = createFakeNodeProcess({ platform: 'win32' })
  const processService = createProcessService(fakeProcess)

  expect(() => processService.isRoot()).toThrow(
    'getuid is not supported on this platform: win32'
  )
})
