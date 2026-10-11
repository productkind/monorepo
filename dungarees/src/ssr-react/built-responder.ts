import { createSsrResponder, type SsrResponder, type SsrTemplateRender } from './responder.ts'

export type CreateBuiltSsrResponderArgs = {
  template: string
  render: SsrTemplateRender
  onError: (error: unknown) => void
}

export const createBuiltSsrResponder = ({
  template,
  render,
  onError,
}: CreateBuiltSsrResponderArgs): SsrResponder =>
  createSsrResponder({
    onError,
    render: async ({ url, nonce }) => render({ url, nonce, template }),
  })
