import { createFakeGoogleDriveClient } from './fake.ts'
import { buildFolderQuery, buildListQuery, escapeQueryValue, FOLDER_MIME_TYPE } from './query.ts'

import { expect, test } from 'vitest'

test('a plain value needs no escaping', () => {
  expect(escapeQueryValue('reports')).toBe('reports')
})

test('a single quote is escaped, so it cannot end the query value', () => {
  expect(escapeQueryValue("Bob's folder")).toBe("Bob\\'s folder")
})

test('a backslash is escaped before the quotes are, so the escape cannot be escaped away', () => {
  expect(escapeQueryValue('a\\b')).toBe('a\\\\b')
})

test('a value trying to break out of the quotes is neutralised', () => {
  expect(escapeQueryValue("x' or name='y")).toBe("x\\' or name=\\'y")
})

test('no list options means no query at all', () => {
  expect(buildListQuery()).toBe('')
})

test('a folder id becomes a parents clause', () => {
  expect(buildListQuery({ folderId: 'folder-1' })).toBe("'folder-1' in parents")
})

test('a caller query is used as it stands', () => {
  expect(buildListQuery({ query: "mimeType='text/csv'" })).toBe("mimeType='text/csv'")
})

test('a folder id and a caller query are joined with and', () => {
  expect(buildListQuery({ folderId: 'folder-1', query: 'trashed=false' })).toBe(
    "'folder-1' in parents and trashed=false",
  )
})

test('a folder query looks for a folder by name that is not in the trash', () => {
  expect(buildFolderQuery({ name: 'reports' })).toBe(
    `name='reports' and mimeType='${FOLDER_MIME_TYPE}' and trashed=false`,
  )
})

test('a folder query narrows to a parent when one is given', () => {
  expect(buildFolderQuery({ name: 'reports', parentFolderId: 'folder-1' })).toBe(
    `name='reports' and mimeType='${FOLDER_MIME_TYPE}' and trashed=false and ` +
      `'folder-1' in parents`,
  )
})

test('a folder name with a quote in it is escaped in the query', () => {
  expect(buildFolderQuery({ name: "Bob's" })).toContain("name='Bob\\'s'")
})

test('a created folder can be found again by name', async () => {
  const { client } = createFakeGoogleDriveClient()

  const created = await client.createFolder({ name: 'reports' })

  expect(await client.findFolderByName({ name: 'reports' })).toEqual(created)
})

test('a folder that was never created is not found', async () => {
  const { client } = createFakeGoogleDriveClient()

  expect(await client.findFolderByName({ name: 'missing' })).toBe(undefined)
})

test('getOrCreateFolder creates a folder that is not there yet', async () => {
  const { client, files } = createFakeGoogleDriveClient()

  await client.getOrCreateFolder({ name: 'reports' })

  expect(files.map(({ name }) => name)).toEqual(['reports'])
})

test('getOrCreateFolder hands back the existing folder rather than a second one', async () => {
  const { client, files } = createFakeGoogleDriveClient()
  const created = await client.createFolder({ name: 'reports' })

  const found = await client.getOrCreateFolder({ name: 'reports' })

  expect(found).toEqual(created)
  expect(files).toHaveLength(1)
})

test('getOrCreateFolder treats the same name under a different parent as a different folder', async () => {
  const { client, files } = createFakeGoogleDriveClient()
  await client.createFolder({ name: 'reports', parentFolderId: 'folder-1' })

  await client.getOrCreateFolder({ name: 'reports', parentFolderId: 'folder-2' })

  expect(files).toHaveLength(2)
})

test('getOrCreateFolder still works when the client has been destructured', async () => {
  const { client } = createFakeGoogleDriveClient()
  const { getOrCreateFolder } = client

  await expect(getOrCreateFolder({ name: 'reports' })).resolves.toHaveProperty('name', 'reports')
})

test('an uploaded file can be fetched by its id', async () => {
  const { client } = createFakeGoogleDriveClient()

  const uploaded = await client.uploadFile({
    metadata: { name: 'data.csv', mimeType: 'text/csv' },
    content: 'a,b',
  })

  expect(await client.getFile({ fileId: uploaded.id })).toEqual(uploaded)
})

test('fetching a file that does not exist fails', async () => {
  const { client } = createFakeGoogleDriveClient()

  await expect(client.getFile({ fileId: 'nope' })).rejects.toThrow('No such file: nope')
})

test('an uploaded file keeps its content', async () => {
  const { client, files } = createFakeGoogleDriveClient()

  await client.uploadFile({ metadata: { name: 'data.csv' }, content: 'a,b' })

  expect(files[0]?.content?.toString('utf-8')).toBe('a,b')
})

test('a deleted file is gone', async () => {
  const { client, files } = createFakeGoogleDriveClient()
  const uploaded = await client.uploadFile({ metadata: { name: 'data.csv' }, content: 'a,b' })

  await client.deleteFile({ fileId: uploaded.id })

  expect(files).toEqual([])
})

test('deleting a file that is not there is not an error', async () => {
  const { client } = createFakeGoogleDriveClient()

  await expect(client.deleteFile({ fileId: 'nope' })).resolves.toBeUndefined()
})

test('listFiles narrows to the files in one folder', async () => {
  const { client } = createFakeGoogleDriveClient()
  await client.uploadFile({ metadata: { name: 'in', parents: ['folder-1'] }, content: '1' })
  await client.uploadFile({ metadata: { name: 'out', parents: ['folder-2'] }, content: '2' })

  const { files } = await client.listFiles({ options: { folderId: 'folder-1' } })

  expect(files.map(({ name }) => name)).toEqual(['in'])
})

test('listFiles stops at the page size', async () => {
  const { client } = createFakeGoogleDriveClient()
  await client.uploadFile({ metadata: { name: 'one' }, content: '1' })
  await client.uploadFile({ metadata: { name: 'two' }, content: '2' })

  const { files } = await client.listFiles({ options: { pageSize: 1 } })

  expect(files).toHaveLength(1)
})

test('listFiles with no arguments lists everything', async () => {
  const { client } = createFakeGoogleDriveClient()
  await client.uploadFile({ metadata: { name: 'one' }, content: '1' })

  expect((await client.listFiles()).files).toHaveLength(1)
})
