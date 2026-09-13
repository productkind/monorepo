import { getErrorMessage } from '@dungarees/core/error.ts'

import { chalk } from 'zx'

export const printError = (message: string): void => {
  console.error(chalk.red(`❌ Error: ${message}`))
}

export const printCatchedError = (error: unknown): void => {
  printError(getErrorMessage(error))
}

export const printWarning = (message: string): void => {
  console.warn(chalk.yellow(`⚠️  Warning: ${message}`))
}

export const printSuccess = (message: string): void => {
  console.log(chalk.green(`✅ ${message}`))
}

export const print = (message: string): void => {
  console.log(message)
}
