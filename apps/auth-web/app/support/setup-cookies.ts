import { LoaderFunctionArgs } from '@remix-run/node'

import { cookie } from '~/cookie.server'

export const setupCookie = async ({ request }: LoaderFunctionArgs, accessToken: string) => {
  const session = await cookie.getSession(request.headers.get('Cookie'))

  await session.set('accessToken', accessToken)

  const cookieHeader = await cookie.commitSession(session)

  return cookieHeader
}
