import { json, redirect, LoaderFunctionArgs } from '@remix-run/node'

import { cookie } from '~/cookie.server'

export const setupDefaultLayout = async ({ request }: LoaderFunctionArgs) => {
  const session = await cookie.getSession(request.headers.get('Cookie'))

  console.log(session.get('accessToken'))

  const url = new URL(request.url)
  const searchParams = url.searchParams

  const clientId = searchParams.get('client_id')

  // if (!clientId) {
  //   return redirect('https://www.google.com')
  // }

  return json({})
}
