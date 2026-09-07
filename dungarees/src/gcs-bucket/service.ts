import { toBuffer, toListQuery, toSaveOptions, toSignedUrlConfig } from './request.ts'
import type { GcsBucketConfig, GcsClient } from './type.ts'

import { Storage } from '@google-cloud/storage'
import { PassThrough } from 'node:stream'

export const createGcsClient = (config?: GcsBucketConfig): GcsClient => {
  const storage = new Storage(
    config?.projectId !== undefined ? { projectId: config.projectId } : undefined,
  )

  const getFile = ({ bucket, objectName }: { bucket: string; objectName: string }) =>
    storage.bucket(bucket).file(objectName)

  return {
    writeObject: async ({ bucket, objectName, data, options }) => {
      await getFile({ bucket, objectName }).save(toBuffer(data), toSaveOptions(options))
    },

    readObject: async ({ bucket, objectName }) => {
      const [contents] = await getFile({ bucket, objectName }).download()
      return contents
    },

    deleteObject: async ({ bucket, objectName }) => {
      await getFile({ bucket, objectName }).delete({ ignoreNotFound: true })
    },

    existsObject: async ({ bucket, objectName }) => {
      const [exists] = await getFile({ bucket, objectName }).exists()
      return exists
    },

    listObjects: async ({ bucket, options }) => {
      const query = toListQuery(options)
      const [files, , response] = await storage
        .bucket(bucket)
        .getFiles(Object.keys(query).length > 0 ? query : undefined)
      const nextPageToken =
        typeof response === 'object' && response !== null && 'nextPageToken' in response
          ? response.nextPageToken
          : undefined

      return {
        objects: files.map(({ name }) => name),
        ...(typeof nextPageToken === 'string' && { nextPageToken }),
      }
    },

    getSignedUrl: async ({ bucket, objectName, options }) => {
      const [url] = await getFile({ bucket, objectName }).getSignedUrl(
        toSignedUrlConfig({ options, now: Date.now() }),
      )
      return url
    },

    // Written through a PassThrough so the caller gets a stream it can write to immediately,
    // rather than one whose errors surface only once the upload starts.
    writeStream: ({ bucket, objectName, options }) => {
      const passThrough = new PassThrough()
      passThrough.pipe(getFile({ bucket, objectName }).createWriteStream(toSaveOptions(options)))
      return passThrough
    },

    readStream: ({ bucket, objectName }) => getFile({ bucket, objectName }).createReadStream(),
  }
}
