import { json, redirect, LoaderFunctionArgs } from '@remix-run/node'
import { defineCookies } from '@starter/use-remix-hooks'

export const setupAuthLayout = async ({ request }: LoaderFunctionArgs) => {
  const cookie = request.headers.get('cookie')

  if (!cookie) {
    return json({})
  }

  const { token } = defineCookies(cookie)

  if (!token) {
    return json({})
  }

  return redirect('/')
}
