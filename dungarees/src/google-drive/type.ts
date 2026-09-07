export type GoogleDriveConfig = {
  // Left out to let Application Default Credentials pick the credentials up.
  keyFilename?: string
  clientEmail?: string
  privateKey?: string
}

export type GoogleDriveFileMetadata = {
  name: string
  // The MIME type the file should become, e.g. a Google Sheet.
  mimeType?: string
  // The MIME type of the bytes being uploaded, e.g. text/csv. Falls back to mimeType.
  sourceMimeType?: string
  parents?: string[]
  driveId?: string
}

export type GoogleDriveFile = {
  id: string
  name: string
  mimeType: string
  webViewLink?: string
  webContentLink?: string
}

export type GoogleDriveListOptions = {
  folderId?: string
  pageSize?: number
  pageToken?: string
  query?: string
}

export type GoogleDriveListResult = {
  files: GoogleDriveFile[]
  nextPageToken?: string
}

export type FolderRef = {
  name: string
  parentFolderId?: string
  driveId?: string
}

export type GoogleDriveClient = {
  createFolder: (args: FolderRef) => Promise<GoogleDriveFile>
  uploadFile: (args: {
    metadata: GoogleDriveFileMetadata
    content: Buffer | string
  }) => Promise<GoogleDriveFile>
  getFile: (args: { fileId: string }) => Promise<GoogleDriveFile>
  deleteFile: (args: { fileId: string }) => Promise<void>
  listFiles: (args?: { options?: GoogleDriveListOptions }) => Promise<GoogleDriveListResult>
  findFolderByName: (args: FolderRef) => Promise<GoogleDriveFile | undefined>
  getOrCreateFolder: (args: FolderRef) => Promise<GoogleDriveFile>
}
