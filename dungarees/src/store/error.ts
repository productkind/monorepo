import type { StoreError } from './type.ts'

export const toStoreError = ({ message, stack = '' }: Error): StoreError => ({
  message,
  stack,
})

export const createStoreError = (message: string): StoreError => toStoreError(new Error(message))
