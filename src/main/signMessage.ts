import { createHmac } from 'crypto'

export function signMessage(
  verb: string,
  path: string,
  expires: number,
  secret: string,
  data?: string
): string {
  let parsedData: typeof data
  if (!data) {
    parsedData = ''
  } else {
    parsedData = data
  }

  return createHmac('sha256', secret)
    .update(verb + path + expires + parsedData)
    .digest('hex')
}
