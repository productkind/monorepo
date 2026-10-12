type BuiltInParameterTypes = {
  int: number
  float: number
  double: number
  byte: number
  short: number
  long: number
  biginteger: bigint
  word: string
  string: string
  '': string
}

export type ParameterTypeDefinition<VALUE> = {
  regexp: RegExp
  transformer: (match: string) => VALUE
}

export type ParameterTypeValues<
  DEFINITIONS extends Record<string, ParameterTypeDefinition<unknown>>,
> = {
  [NAME in keyof DEFINITIONS]: ReturnType<DEFINITIONS[NAME]['transformer']>
}

type ParameterType<
  NAME extends string,
  REGISTERED extends Record<string, unknown>,
> = NAME extends keyof BuiltInParameterTypes
  ? BuiltInParameterTypes[NAME]
  : NAME extends keyof REGISTERED
    ? REGISTERED[NAME]
    : unknown

export type StepParameters<
  EXPRESSION extends string,
  REGISTERED extends Record<string, unknown> = Record<never, never>,
> = EXPRESSION extends `${string}{${infer NAME}}${infer REST}`
  ? [ParameterType<NAME, REGISTERED>, ...StepParameters<REST, REGISTERED>]
  : []

const PARAMETER = /\{[^{}]*\}/g

export type ToCucumberStepArgs<
  WORLD,
  EXPRESSION extends string,
  REGISTERED extends Record<string, unknown> = Record<never, never>,
> = {
  expression: EXPRESSION
  callback: (world: WORLD, ...parameters: StepParameters<EXPRESSION, REGISTERED>) => Promise<void>
}

export const toCucumberStep = <
  WORLD,
  EXPRESSION extends string,
  REGISTERED extends Record<string, unknown> = Record<never, never>,
>({
  expression,
  callback,
}: ToCucumberStepArgs<WORLD, EXPRESSION, REGISTERED>) => {
  const step = async function (
    this: { testEnvironmentWorld: WORLD },
    ...parameters: StepParameters<EXPRESSION, REGISTERED>
  ): Promise<void> {
    await callback(this.testEnvironmentWorld, ...parameters)
  }
  return Object.defineProperty(step, 'length', {
    value: expression.match(PARAMETER)?.length ?? 0,
  })
}
