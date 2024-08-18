import { signMessage } from './signMessage'

export function getAuthObj(
  verb: string,
  path: string,
  key: string,
  secret: string,
  data?: string
): object {
  const expires = Math.round(new Date().getTime() / 1000) + 60000

  return {
    'api-expires': expires,
    'api-key': key,
    'api-signature': signMessage(verb, path, expires, secret, data)
  }
}
