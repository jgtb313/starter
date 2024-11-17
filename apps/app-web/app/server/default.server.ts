import { json, LoaderFunctionArgs } from '@remix-run/node'

import { cookie } from '~/cookie.server'

export const setupDefaultLayout = async ({ request }: LoaderFunctionArgs) => {
  const session = await cookie.getSession(request.headers.get('Cookie'))

  const accessToken = session.get('accessToken')

  return json({ user: !!accessToken })
}
