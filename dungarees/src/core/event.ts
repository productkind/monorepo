export type DomainEvent<TYPE extends string = string, PAYLOAD = any> = {
  type: TYPE
  payload: PAYLOAD
}
