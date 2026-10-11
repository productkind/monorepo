import { Then, When } from '../support/test-environment.ts'
import { TODO_MVC_MODES, type TodoMvcMode, todoMvcOrigin } from '../support/todo-mvc-server.ts'
import type { TodoMvcVisit } from '../support/todo-mvc-visit.ts'

import { expect, type Page } from '@playwright/test'

const SEEDED_COMPLETED_TITLES = ['Render this list on the server', 'Hydrate it in the browser']
const SEEDED_ACTIVE_TITLES = ['Navigate the filters without a reload']

const isTodoMvcMode = (mode: string): mode is TodoMvcMode =>
  TODO_MVC_MODES.some((known) => known === mode)

When('the visitor opens {string} on the {word} server', async (world, path, mode) => {
  if (!isTodoMvcMode(mode)) {
    throw new Error(`There is no ${mode} server, only ${TODO_MVC_MODES.join(' and ')}`)
  }
  const { page } = world.get('browser')
  const recordError = (error: string): void => {
    const visit = world.getState('todoMvcVisit')
    world.setState('todoMvcVisit', { ...visit, errors: [...visit.errors, error] })
  }
  page.on('console', (message) => {
    if (message.type() === 'error') {
      recordError(message.text())
    }
  })
  page.on('pageerror', (error) => {
    recordError(error.message)
  })

  const response = await page.goto(`${todoMvcOrigin(mode)}${path}`)
  if (response === null) {
    throw new Error(`Opening ${path} got no response`)
  }
  world.setState('todoMvcVisit', {
    ...world.getState('todoMvcVisit'),
    response: { status: response.status(), html: await response.text() },
  })
})

const responseOf = ({ response }: TodoMvcVisit): NonNullable<TodoMvcVisit['response']> => {
  if (response === undefined) {
    throw new Error('The visitor has not opened a page yet')
  }
  return response
}

const renderedTitles = (html: string): string[] =>
  Array.from(html.matchAll(/<label>([^<]*)<\/label>/g)).map(([, title = '']) => title)

Then('the page the server sent lists only the completed todos', async (world) => {
  expect(renderedTitles(responseOf(world.getState('todoMvcVisit')).html)).toEqual(
    SEEDED_COMPLETED_TITLES,
  )
})

Then('the server answers that the page is not found', async (world) => {
  expect(responseOf(world.getState('todoMvcVisit')).status).toBe(404)
})

const waitUntilHydrated = async (page: Page): Promise<void> => {
  await page.waitForFunction(() => {
    const link = document.querySelector('.filters a')
    return link !== null && Object.keys(link).some((key) => key.startsWith('__reactFiber$'))
  })
}

const STILL_THE_SAME_PAGE = 'e2eStillTheSamePage'

When('the visitor picks the active filter', async (world) => {
  const { page } = world.get('browser')
  await waitUntilHydrated(page)
  await page.evaluate((marker) => Reflect.set(window, marker, true), STILL_THE_SAME_PAGE)
  await page.getByRole('link', { name: 'Active' }).click()
  await page.waitForURL('**/active')
})

Then('the page lists only the active todos', async (world) => {
  await expect(world.get('browser').page.locator('.todo-list li label')).toHaveText(
    SEEDED_ACTIVE_TITLES,
  )
})

Then('the page was not reloaded', async (world) => {
  const { page } = world.get('browser')
  expect(
    await page.evaluate((marker) => Reflect.get(window, marker) === true, STILL_THE_SAME_PAGE),
  ).toBe(true)
})

Then('the browser reported no errors', async (world) => {
  expect(world.getState('todoMvcVisit').errors).toEqual([])
})
