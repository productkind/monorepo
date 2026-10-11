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

type ParameterType<NAME extends string> = NAME extends keyof BuiltInParameterTypes
  ? BuiltInParameterTypes[NAME]
  : unknown

export type StepParameters<EXPRESSION extends string> =
  EXPRESSION extends `${string}{${infer NAME}}${infer REST}`
    ? [ParameterType<NAME>, ...StepParameters<REST>]
    : []

const PARAMETER = /\{[^{}]*\}/g

export type ToCucumberStepArgs<WORLD, EXPRESSION extends string> = {
  expression: EXPRESSION
  callback: (world: WORLD, ...parameters: StepParameters<EXPRESSION>) => Promise<void>
}

export const toCucumberStep = <WORLD, EXPRESSION extends string>({
  expression,
  callback,
}: ToCucumberStepArgs<WORLD, EXPRESSION>) => {
  const step = async function (
    this: { testEnvironmentWorld: WORLD },
    ...parameters: StepParameters<EXPRESSION>
  ): Promise<void> {
    await callback(this.testEnvironmentWorld, ...parameters)
  }
  return Object.defineProperty(step, 'length', {
    value: expression.match(PARAMETER)?.length ?? 0,
  })
}
