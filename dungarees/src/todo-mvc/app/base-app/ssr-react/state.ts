import type { DehydratedQueryCache } from '@dungarees/query-cache/service.ts'
import type { SsrRequest } from '@dungarees/ssr-react/host.ts'

export type TodoMvcState = DehydratedQueryCache

export type TodoMvcInput = SsrRequest
