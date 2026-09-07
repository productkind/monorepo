import { createFakeGcsClient } from './fake.ts'
import {
  MINIMUM_SIGNED_URL_SECONDS,
  toBuffer,
  toListQuery,
  toSaveOptions,
  toSignedUrlConfig,
} from './request.ts'

import { expect, test } from 'vitest'

test('a string is written as its own bytes', () => {
  expect(toBuffer('hello').toString('utf-8')).toBe('hello')
})

test('a buffer is written as it stands', () => {
  const buffer = Buffer.from('hello')

  expect(toBuffer(buffer)).toBe(buffer)
})

test('no write options means nothing is sent to the storage SDK', () => {
  expect(toSaveOptions()).toEqual({})
})

test('write options that were given are carried through', () => {
  expect(
    toSaveOptions({ gzip: true, contentType: 'text/csv', metadata: { owner: 'test' } }),
  ).toEqual({ gzip: true, contentType: 'text/csv', metadata: { owner: 'test' } })
})

test('gzip set to false is carried through rather than dropped as falsy', () => {
  expect(toSaveOptions({ gzip: false })).toEqual({ gzip: false })
})

test('a write option that was not given is left off entirely', () => {
  const saveOptions = toSaveOptions({ gzip: true })

  expect('contentType' in saveOptions).toBe(false)
  expect('metadata' in saveOptions).toBe(false)
})

test('no list options means an empty query', () => {
  expect(toListQuery()).toEqual({})
})

test('list options that were given are carried through', () => {
  expect(toListQuery({ prefix: 'a/', maxResults: 10, delimiter: '/', pageToken: 'token' })).toEqual(
    { prefix: 'a/', maxResults: 10, delimiter: '/', pageToken: 'token' },
  )
})

test('maxResults of zero is carried through rather than dropped as falsy', () => {
  expect(toListQuery({ maxResults: 0 })).toEqual({ maxResults: 0 })
})

test('a signed url expires the requested number of seconds from now', () => {
  expect(
    toSignedUrlConfig({ options: { action: 'read', expiresInSeconds: 60 }, now: 1_000 }),
  ).toEqual({ action: 'read', expires: 61_000 })
})

test('a signed url keeps the action it was asked for', () => {
  expect(
    toSignedUrlConfig({ options: { action: 'write', expiresInSeconds: 60 }, now: 0 }),
  ).toHaveProperty('action', 'write')
})

test('a signed url carries a content type when one is given', () => {
  expect(
    toSignedUrlConfig({
      options: { action: 'write', expiresInSeconds: 60, contentType: 'text/csv' },
      now: 0,
    }),
  ).toHaveProperty('contentType', 'text/csv')
})

test('a signed url that would expire immediately is pushed to the minimum', () => {
  expect(
    toSignedUrlConfig({ options: { action: 'read', expiresInSeconds: 0 }, now: 0 }),
  ).toHaveProperty('expires', MINIMUM_SIGNED_URL_SECONDS * 1000)
})

test('a signed url with a negative duration is pushed to the minimum', () => {
  expect(
    toSignedUrlConfig({ options: { action: 'read', expiresInSeconds: -60 }, now: 0 }),
  ).toHaveProperty('expires', MINIMUM_SIGNED_URL_SECONDS * 1000)
})

test('an object written to the fake bucket reads back', async () => {
  const { client } = createFakeGcsClient()

  await client.writeObject({ bucket: 'b', objectName: 'o', data: 'contents' })

  expect((await client.readObject({ bucket: 'b', objectName: 'o' })).toString('utf-8')).toBe(
    'contents',
  )
})

test('reading an object that was never written fails', async () => {
  const { client } = createFakeGcsClient()

  await expect(client.readObject({ bucket: 'b', objectName: 'missing' })).rejects.toThrow(
    'No such object: b/missing',
  )
})

test('existsObject reports whether an object is there', async () => {
  const { client } = createFakeGcsClient()
  await client.writeObject({ bucket: 'b', objectName: 'o', data: 'contents' })

  expect(await client.existsObject({ bucket: 'b', objectName: 'o' })).toBe(true)
  expect(await client.existsObject({ bucket: 'b', objectName: 'other' })).toBe(false)
})

test('a deleted object is no longer there', async () => {
  const { client } = createFakeGcsClient()
  await client.writeObject({ bucket: 'b', objectName: 'o', data: 'contents' })

  await client.deleteObject({ bucket: 'b', objectName: 'o' })

  expect(await client.existsObject({ bucket: 'b', objectName: 'o' })).toBe(false)
})

test('deleting an object that is not there is not an error', async () => {
  const { client } = createFakeGcsClient()

  await expect(client.deleteObject({ bucket: 'b', objectName: 'missing' })).resolves.toBeUndefined()
})

test('listObjects names the objects in one bucket only', async () => {
  const { client } = createFakeGcsClient()
  await client.writeObject({ bucket: 'b', objectName: 'one', data: '1' })
  await client.writeObject({ bucket: 'b', objectName: 'two', data: '2' })
  await client.writeObject({ bucket: 'other', objectName: 'three', data: '3' })

  expect(await client.listObjects({ bucket: 'b' })).toEqual({ objects: ['one', 'two'] })
})

test('listObjects narrows to a prefix when one is given', async () => {
  const { client } = createFakeGcsClient()
  await client.writeObject({ bucket: 'b', objectName: 'logs/one', data: '1' })
  await client.writeObject({ bucket: 'b', objectName: 'data/two', data: '2' })

  expect(await client.listObjects({ bucket: 'b', options: { prefix: 'logs/' } })).toEqual({
    objects: ['logs/one'],
  })
})

test('listObjects stops at maxResults', async () => {
  const { client } = createFakeGcsClient()
  await client.writeObject({ bucket: 'b', objectName: 'one', data: '1' })
  await client.writeObject({ bucket: 'b', objectName: 'two', data: '2' })

  expect(await client.listObjects({ bucket: 'b', options: { maxResults: 1 } })).toEqual({
    objects: ['one'],
  })
})

test('the fake signed url names the bucket, object, action and expiry', async () => {
  const { client } = createFakeGcsClient({ now: 1_000 })

  expect(
    await client.getSignedUrl({
      bucket: 'b',
      objectName: 'o',
      options: { action: 'read', expiresInSeconds: 60 },
    }),
  ).toBe('https://fake-storage.invalid/b/o?action=read&expires=61000')
})

test('a stream written to the fake bucket reads back', async () => {
  const { client } = createFakeGcsClient()
  const stream = client.writeStream({ bucket: 'b', objectName: 'o' })

  await new Promise<void>((resolve) => {
    stream.on('finish', resolve)
    stream.end('streamed')
  })

  expect((await client.readObject({ bucket: 'b', objectName: 'o' })).toString('utf-8')).toBe(
    'streamed',
  )
})

test('an object can be read back through a stream', async () => {
  const { client } = createFakeGcsClient()
  await client.writeObject({ bucket: 'b', objectName: 'o', data: 'contents' })
  const chunks: Buffer[] = []

  for await (const chunk of client.readStream({ bucket: 'b', objectName: 'o' })) {
    chunks.push(Buffer.from(chunk as Buffer))
  }

  expect(Buffer.concat(chunks).toString('utf-8')).toBe('contents')
})
