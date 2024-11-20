import { json, LoaderFunctionArgs } from '@remix-run/node'

import { cookie } from '~/cookie.server'

export const setupDefaultLayout = async ({ request }: LoaderFunctionArgs) => {
  const accessToken = await cookie.parse(request.headers.get('Cookie'))

  return json({ user: !!accessToken })
}
