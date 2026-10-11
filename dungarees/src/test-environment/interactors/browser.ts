import type { Interactor } from '../test-environment.ts'

import { chromium, firefox, webkit } from '@playwright/test'
import type {
  APIRequestContext,
  BrowserContext,
  ConsoleMessage,
  LaunchOptions,
  Page,
} from '@playwright/test'
import { ensureDir } from 'fs-extra'
import { fromEventPattern, map, type Observable } from 'rxjs'

export type BrowserInteractorContext = {
  context: BrowserContext
  page: Page
}

export type RequestInteractorContext = {
  context: APIRequestContext
}

export const VALID_BROWSERS = ['firefox', 'webkit', 'chromium'] as const

export type BrowserTypes = (typeof VALID_BROWSERS)[number]

export type BrowserInteractorConfig = {
  browserOptions: LaunchOptions
  browser: BrowserTypes
  tracesDir: string
  screenshotsDir: string
  isVideoEnabled: boolean
}

export const browserInteractor = (
  config: BrowserInteractorConfig,
): Interactor<BrowserInteractorContext> => {
  const BROWSERS = {
    firefox,
    webkit,
    chromium,
  }

  let browser: Awaited<ReturnType<(typeof BROWSERS)[typeof config.browser]['launch']>>
  let current: BrowserInteractorContext | undefined

  const requireCurrent = (): BrowserInteractorContext => {
    if (current === undefined) {
      throw new Error('The browser has no context: startContext was not called')
    }
    return current
  }

  return {
    start: async () => {
      browser = await (BROWSERS[config.browser] ?? chromium).launch(config.browserOptions)
      await ensureDir(config.tracesDir)
    },
    stop: async () => {
      await browser.close()
    },
    startContext: async () => {
      const context = await browser.newContext({
        acceptDownloads: true,
        viewport: { width: 1200, height: 800 },
        ...(config.isVideoEnabled ? { recordVideo: { dir: 'reports/screenshots' } } : {}),
      })
      await context.tracing.start({ screenshots: true, snapshots: true })
      const page = await context.newPage()
      current = { page, context }
      const console$: Observable<string> = fromEventPattern((handler) =>
        page.on('console', (msg: ConsoleMessage) => {
          handler(`${msg.type()}: ${msg.text()}`)
        }),
      )
      return {
        context: { page, context },
        reportEntry$: console$.pipe(
          map((log) => ({
            entry: `console -> ${log}`,
            type: 'text/plain',
          })),
        ),
      }
    },
    stopContext: async () => {
      const { page, context } = requireCurrent()
      current = undefined
      await page.close()
      await context.close()
    },
    onFailure: async (testName) => {
      const { page, context } = requireCurrent()
      const image: Buffer = await page.screenshot()
      await context.tracing.stop({
        path: `${config.tracesDir}/${testName}-${
          new Date().toISOString().split('.')[0] ?? ''
        }-trace.zip`,
      })
      return {
        entry: image,
        type: 'image/png',
      }
    },
  }
}
