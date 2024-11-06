import { json, redirect, LoaderFunctionArgs } from '@remix-run/node'

import { createCookie } from './cookies'

export const setupAuthLayout = async ({ request }: LoaderFunctionArgs) => {
  const cookie = request.headers.get('cookie')

  if (!cookie) {
    return json({})
  }

  if (cookie) {
    const { token } = createCookie(cookie)

    if (!token) {
      return json({})
    }

    return redirect('/')
  }

  return json({})
}
