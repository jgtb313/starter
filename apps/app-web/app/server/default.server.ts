import { json, LoaderFunctionArgs } from '@remix-run/node'
import client from '@starter/client'

import { cookie } from '~/cookie.server'

export const setupDefaultLayout = async ({ request }: LoaderFunctionArgs) => {
  const Cookie = await cookie.getSession(request.headers.get('Cookie'))

  const accessToken = Cookie.get('accessToken')

  // console.log(import.meta.env.STAGE)

  if (accessToken) {
    client.authenticate(accessToken)

    const user = await client.profile.retrieve({})

    return json({ user })
  }

  return json({ user: undefined })
}
