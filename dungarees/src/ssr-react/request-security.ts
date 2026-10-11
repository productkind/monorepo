export type IsSecureRequestArgs = {
  isEncrypted: boolean
  trustProxy: boolean
  forwardedProto: string | readonly string[] | undefined
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
  const firstHop = [forwardedProto].flat().join(',').split(',')[0]?.trim()
  return firstHop === 'https'
}
