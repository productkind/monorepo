export const SERVER_ENVIRONMENTS = ['development', 'production'] as const

export type ServerEnvironment = (typeof SERVER_ENVIRONMENTS)[number]

const isServerEnvironment = (environment: string): environment is ServerEnvironment =>
  SERVER_ENVIRONMENTS.some((known) => known === environment)

export const serverEnvironmentParameterType = {
  regexp: new RegExp(SERVER_ENVIRONMENTS.join('|')),
  transformer: (environment: string): ServerEnvironment => {
    if (!isServerEnvironment(environment)) {
      throw new Error(
        `There is no ${environment} server, only ${SERVER_ENVIRONMENTS.join(' and ')}`,
      )
    }
    return environment
  },
}

export const TODO_MVC_PORTS: Record<ServerEnvironment, number> = {
  development: 5401,
  production: 5402,
}

export const todoMvcOrigin = (environment: ServerEnvironment): string =>
  `http://localhost:${TODO_MVC_PORTS[environment]}`
