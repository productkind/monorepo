import { toBuffer, toSignedUrlConfig } from './request.ts'
import type { GcsClient, GcsWriteOptions } from './type.ts'

import { PassThrough, Readable } from 'node:stream'

export type StoredObject = {
  data: Buffer
  options?: GcsWriteOptions
}

export type FakeGcsClient = {
  client: GcsClient
  objects: Map<string, StoredObject>
}

const toKey = ({ bucket, objectName }: { bucket: string; objectName: string }): string =>
  `${bucket}/${objectName}`

export const createFakeGcsClient = ({ now = 0 }: { now?: number } = {}): FakeGcsClient => {
  const objects = new Map<string, StoredObject>()

  const readOrThrow = (ref: { bucket: string; objectName: string }): StoredObject => {
    const stored = objects.get(toKey(ref))
    if (stored === undefined) {
      throw new Error(`No such object: ${toKey(ref)}`)
    }
    return stored
  }

  return {
    client: {
      writeObject: async ({ bucket, objectName, data, options }) => {
        objects.set(toKey({ bucket, objectName }), {
          data: toBuffer(data),
          ...(options !== undefined && { options }),
        })
        await Promise.resolve()
      },

      readObject: async ({ bucket, objectName }) =>
        await Promise.resolve(readOrThrow({ bucket, objectName }).data),

      deleteObject: async ({ bucket, objectName }) => {
        objects.delete(toKey({ bucket, objectName }))
        await Promise.resolve()
      },

      existsObject: async ({ bucket, objectName }) =>
        await Promise.resolve(objects.has(toKey({ bucket, objectName }))),

      listObjects: async ({ bucket, options }) => {
        const prefix = `${bucket}/`
        const names = [...objects.keys()]
          .filter((key) => key.startsWith(prefix))
          .map((key) => key.slice(prefix.length))
          .filter((name) => options?.prefix === undefined || name.startsWith(options.prefix))
          .sort()

        return await Promise.resolve({
          objects: options?.maxResults === undefined ? names : names.slice(0, options.maxResults),
        })
      },

      getSignedUrl: async ({ bucket, objectName, options }) => {
        const { action, expires } = toSignedUrlConfig({ options, now })
        return await Promise.resolve(
          `https://fake-storage.invalid/${bucket}/${objectName}?action=${action}&expires=${expires}`,
        )
      },

      writeStream: ({ bucket, objectName, options }) => {
        const passThrough = new PassThrough()
        const chunks: Buffer[] = []
        passThrough.on('data', (chunk: Buffer) => chunks.push(chunk))
        passThrough.on('end', () => {
          objects.set(toKey({ bucket, objectName }), {
            data: Buffer.concat(chunks),
            ...(options !== undefined && { options }),
          })
        })
        return passThrough
      },

      readStream: ({ bucket, objectName }) =>
        Readable.from(readOrThrow({ bucket, objectName }).data),
    },
    objects,
  }
}
