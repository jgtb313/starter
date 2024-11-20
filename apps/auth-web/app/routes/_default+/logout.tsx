import { redirect, LoaderFunctionArgs } from '@remix-run/node'

import { cookie } from '~/cookie.server'

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url)
  const clientId = url.searchParams.get('client_id')

  const session = await cookie.getSession(request.headers.get('Cookie'))

  session.unset('accessToken')

  await cookie.commitSession(session)

  const cookieHeader = await cookie.commitSession(session)

  return redirect(`${clientId}`, {
    headers: {
      'Set-Cookie': cookieHeader,
    },
  })
}
