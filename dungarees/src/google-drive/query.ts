import type { FolderRef, GoogleDriveListOptions } from './type.ts'

export const FOLDER_MIME_TYPE = 'application/vnd.google-apps.folder'

export const DEFAULT_PAGE_SIZE = 100

export const DEFAULT_UPLOAD_MIME_TYPE = 'application/octet-stream'

// Drive query values are single quoted, so a quote or a backslash in a folder name has to be
// escaped or it ends the value and the rest is read as query syntax.
export const escapeQueryValue = (value: string): string =>
  value.replace(/\\/g, '\\\\').replace(/'/g, "\\'")

export const buildListQuery = (options?: GoogleDriveListOptions): string =>
  [
    ...(options?.folderId !== undefined
      ? [`'${escapeQueryValue(options.folderId)}' in parents`]
      : []),
    ...(options?.query !== undefined ? [options.query] : []),
  ].join(' and ')

export const buildFolderQuery = ({ name, parentFolderId }: FolderRef): string =>
  [
    `name='${escapeQueryValue(name)}'`,
    `mimeType='${FOLDER_MIME_TYPE}'`,
    'trashed=false',
    ...(parentFolderId !== undefined ? [`'${escapeQueryValue(parentFolderId)}' in parents`] : []),
  ].join(' and ')
