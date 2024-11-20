import { json, LoaderFunctionArgs, redirect } from '@remix-run/node'
import client from '@starter/client'

import { cookie } from '~/cookie.server'

export const setupDefaultLayout = async ({ request }: LoaderFunctionArgs) => {
  const Cookie = await cookie.getSession(request.headers.get('Cookie'))

  const accessToken = Cookie.get('accessToken')

  // console.log(import.meta.env.STAGE)

  if (!accessToken) {
    return redirect('http://localhost:3000')
  }

  client.authenticate(accessToken)

  const user = await client.profile.retrieve({})

  return json({ user })
}
