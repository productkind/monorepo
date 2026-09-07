import { FOLDER_MIME_TYPE } from './query.ts'
import type { GoogleDriveClient, GoogleDriveFile } from './type.ts'

export type StoredFile = GoogleDriveFile & {
  parents: string[]
  content?: Buffer
}

export type FakeGoogleDriveClient = {
  client: GoogleDriveClient
  files: StoredFile[]
}

export const createFakeGoogleDriveClient = (): FakeGoogleDriveClient => {
  const files: StoredFile[] = []

  const nextId = (): string => `fake-file-${files.length + 1}`

  const findFolder = ({
    name,
    parentFolderId,
  }: {
    name: string
    parentFolderId?: string
  }): StoredFile | undefined =>
    files.find(
      (file) =>
        file.name === name &&
        file.mimeType === FOLDER_MIME_TYPE &&
        (parentFolderId === undefined || file.parents.includes(parentFolderId)),
    )

  const toFile = ({ id, name, mimeType }: StoredFile): GoogleDriveFile => ({
    id,
    name,
    mimeType,
    webViewLink: `https://fake-drive.invalid/file/${id}`,
  })

  const createFolder: GoogleDriveClient['createFolder'] = async ({ name, parentFolderId }) => {
    const folder: StoredFile = {
      id: nextId(),
      name,
      mimeType: FOLDER_MIME_TYPE,
      parents: parentFolderId === undefined ? [] : [parentFolderId],
    }
    files.push(folder)
    return await Promise.resolve(toFile(folder))
  }

  const findFolderByName: GoogleDriveClient['findFolderByName'] = async (folder) => {
    const found = findFolder(folder)
    return await Promise.resolve(found === undefined ? undefined : toFile(found))
  }

  return {
    client: {
      createFolder,
      findFolderByName,

      uploadFile: async ({ metadata, content }) => {
        const uploaded: StoredFile = {
          id: nextId(),
          name: metadata.name,
          mimeType: metadata.mimeType ?? 'application/octet-stream',
          parents: metadata.parents ?? [],
          content: typeof content === 'string' ? Buffer.from(content) : content,
        }
        files.push(uploaded)
        return await Promise.resolve(toFile(uploaded))
      },

      getFile: async ({ fileId }) => {
        const found = files.find(({ id }) => id === fileId)
        if (found === undefined) {
          throw new Error(`No such file: ${fileId}`)
        }
        return await Promise.resolve(toFile(found))
      },

      deleteFile: async ({ fileId }) => {
        const index = files.findIndex(({ id }) => id === fileId)
        if (index !== -1) {
          files.splice(index, 1)
        }
        await Promise.resolve()
      },

      listFiles: async (args) => {
        const folderId = args?.options?.folderId
        const matching = files.filter(
          (file) => folderId === undefined || file.parents.includes(folderId),
        )
        const pageSize = args?.options?.pageSize
        return await Promise.resolve({
          files: (pageSize === undefined ? matching : matching.slice(0, pageSize)).map(toFile),
        })
      },

      getOrCreateFolder: async (folder) =>
        (await findFolderByName(folder)) ?? (await createFolder(folder)),
    },
    files,
  }
}
