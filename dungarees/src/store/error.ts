// A plain object rather than an Error, so it survives being held in the store and exported.
export type StoreError = {
  message: string
  stack: string
}

export const toStoreError = ({ message, stack = '' }: Error): StoreError => ({
  message,
  stack,
})

export const createStoreError = (message: string): StoreError => toStoreError(new Error(message))
