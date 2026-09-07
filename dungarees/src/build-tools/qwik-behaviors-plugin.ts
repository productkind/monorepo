import type { Plugin } from 'vite'

export type QwikBehaviorsConfig = {
  // The indirection lets a build swap in a different application per target without the importing
  // code naming either of them.
  applications: Record<string, string>
}

export const QWIK_BEHAVIORS_PLUGIN_NAME = 'qwik-behaviors'

// hasOwn rather than `in`, so an id like 'toString' is not mistaken for a configured application.
export const resolveApplicationId = ({
  applications,
  id,
}: QwikBehaviorsConfig & { id: string }): string | undefined =>
  Object.hasOwn(applications, id) ? id : undefined

export const loadApplicationModule = ({
  applications,
  id,
}: QwikBehaviorsConfig & { id: string }): string | undefined => {
  const application = applications[id]
  if (application === undefined) {
    return undefined
  }
  // The specifier goes through JSON so a path containing a quote cannot end the string and run as
  // code in the generated module.
  return `export { application } from ${JSON.stringify(application)}`
}

export const qwikBehaviors = ({ applications }: QwikBehaviorsConfig): Plugin => ({
  name: QWIK_BEHAVIORS_PLUGIN_NAME,
  // Claiming the id as resolved is what stops vite looking for a real module of that name.
  resolveId: (id) => resolveApplicationId({ applications, id }),
  load: (id) => loadApplicationModule({ applications, id }),
})
