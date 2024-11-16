import { json, redirect, LoaderFunctionArgs } from '@remix-run/node'
import { defineCookies } from '@starter/use-remix-hooks'

export const setupDefaultLayout = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url)
  const searchParams = url.searchParams

  const clientId = searchParams.get('client_id')

  if (!clientId) {
    return redirect('https://www.google.com')
  }

  const cookie = request.headers.get('cookie')

  if (!cookie) {
    return json({})
  }

  const { token } = defineCookies(cookie)

  if (!token) {
    return json({})
  }

  if (!clientId) {
    return json({})
  }

  return redirect(`${clientId}?authorizationToken=${token}`)
}
