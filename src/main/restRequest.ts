export async function restRequest(
  verb: string,
  path: string,
  authHeaders?: HeadersInit,
  postBody?: string
): Promise<unknown> {
  const res = await fetch(`https://www.bitmex.com${path}`, {
    method: verb,
    headers: {
      'content-type': 'application/json',
      Accept: 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      ...authHeaders
    },
    body: postBody
  })

  return res.json()
}
