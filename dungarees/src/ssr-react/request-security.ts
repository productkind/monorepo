export type IsSecureRequestArgs = {
  isEncrypted: boolean
  trustProxy: boolean
  forwardedProto?: string
}

export const isSecureRequest = ({
  isEncrypted,
  trustProxy,
  forwardedProto,
}: IsSecureRequestArgs): boolean => {
  if (isEncrypted) {
    return true
  }
  if (!trustProxy || forwardedProto === undefined) {
    return false
  }
  return forwardedProto.split(',')[0]?.trim() === 'https'
}
