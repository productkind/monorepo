import {
  buildFolderQuery,
  buildListQuery,
  DEFAULT_PAGE_SIZE,
  DEFAULT_UPLOAD_MIME_TYPE,
  FOLDER_MIME_TYPE,
} from './query.ts'
import type { GoogleDriveClient, GoogleDriveConfig, GoogleDriveFile } from './type.ts'

import { parseJson } from '@dungarees/zod/json.ts'

import { google } from 'googleapis'
import type { drive_v3 } from 'googleapis'
import { readFile } from 'node:fs/promises'
import { Readable } from 'node:stream'
import { z } from 'zod'

const DRIVE_SCOPES = ['https://www.googleapis.com/auth/drive']

const FILE_FIELDS = 'id, name, mimeType, webViewLink, webContentLink'

const credentialsSchema = z.object({ client_email: z.string(), private_key: z.string() })

const toGoogleDriveFile = (file: drive_v3.Schema$File): GoogleDriveFile => ({
  id: file.id ?? '',
  name: file.name ?? '',
  mimeType: file.mimeType ?? '',
  ...(file.webViewLink !== null &&
    file.webViewLink !== undefined && { webViewLink: file.webViewLink }),
  ...(file.webContentLink !== null &&
    file.webContentLink !== undefined && { webContentLink: file.webContentLink }),
})

export const createGoogleDriveClient = async (
  config?: GoogleDriveConfig,
): Promise<GoogleDriveClient> => {
  const credentials =
    config?.clientEmail !== undefined && config.privateKey !== undefined
      ? { client_email: config.clientEmail, private_key: config.privateKey }
      : config?.keyFilename !== undefined
        ? parseJson({
            json: await readFile(config.keyFilename, 'utf-8'),
            schema: credentialsSchema,
            message: `Invalid service account key file ${config.keyFilename}`,
          })
        : undefined

  const auth =
    credentials !== undefined
      ? new google.auth.JWT({
          email: credentials.client_email,
          key: credentials.private_key,
          scopes: DRIVE_SCOPES,
        })
      : new google.auth.GoogleAuth({ scopes: DRIVE_SCOPES })

  const drive = google.drive({ version: 'v3', auth })

  const createFolder: GoogleDriveClient['createFolder'] = async ({
    name,
    parentFolderId,
    driveId,
  }) => {
    const { data } = await drive.files.create({
      requestBody: {
        name,
        mimeType: FOLDER_MIME_TYPE,
        ...(parentFolderId !== undefined && { parents: [parentFolderId] }),
        ...(driveId !== undefined && { driveId }),
      },
      fields: FILE_FIELDS,
      supportsAllDrives: true,
    })
    return toGoogleDriveFile(data)
  }

  const findFolderByName: GoogleDriveClient['findFolderByName'] = async ({
    name,
    parentFolderId,
    driveId,
  }) => {
    const { data } = await drive.files.list({
      q: buildFolderQuery({ name, ...(parentFolderId !== undefined && { parentFolderId }) }),
      pageSize: 1,
      fields: `files(${FILE_FIELDS})`,
      supportsAllDrives: true,
      includeItemsFromAllDrives: true,
      ...(driveId !== undefined && { corpora: 'drive', driveId }),
    })
    const [first] = data.files ?? []
    return first === undefined ? undefined : toGoogleDriveFile(first)
  }

  return {
    createFolder,
    findFolderByName,

    uploadFile: async ({ metadata, content }) => {
      const { data } = await drive.files.create({
        requestBody: {
          name: metadata.name,
          ...(metadata.mimeType !== undefined && { mimeType: metadata.mimeType }),
          ...(metadata.parents !== undefined && { parents: metadata.parents }),
          ...(metadata.driveId !== undefined && { driveId: metadata.driveId }),
        },
        media: {
          mimeType: metadata.sourceMimeType ?? metadata.mimeType ?? DEFAULT_UPLOAD_MIME_TYPE,
          body: Readable.from(typeof content === 'string' ? Buffer.from(content) : content),
        },
        fields: FILE_FIELDS,
        supportsAllDrives: true,
      })
      return toGoogleDriveFile(data)
    },

    getFile: async ({ fileId }) => {
      const { data } = await drive.files.get({
        fileId,
        fields: FILE_FIELDS,
        supportsAllDrives: true,
      })
      return toGoogleDriveFile(data)
    },

    deleteFile: async ({ fileId }) => {
      await drive.files.delete({ fileId, supportsAllDrives: true })
    },

    listFiles: async (args) => {
      const { data } = await drive.files.list({
        q: buildListQuery(args?.options),
        pageSize: args?.options?.pageSize ?? DEFAULT_PAGE_SIZE,
        ...(args?.options?.pageToken !== undefined && { pageToken: args.options.pageToken }),
        fields: `nextPageToken, files(${FILE_FIELDS})`,
        supportsAllDrives: true,
        includeItemsFromAllDrives: true,
      })
      return {
        files: (data.files ?? []).map(toGoogleDriveFile),
        ...(data.nextPageToken !== null &&
          data.nextPageToken !== undefined && { nextPageToken: data.nextPageToken }),
      }
    },

    // Calls the local bindings rather than reaching through `this`, so the two are still the same
    // functions when the client is destructured.
    getOrCreateFolder: async (folder) =>
      (await findFolderByName(folder)) ?? (await createFolder(folder)),
  }
}
