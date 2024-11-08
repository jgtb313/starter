import { json, redirect, LoaderFunctionArgs } from '@remix-run/node'
import client from '@starter/client'

import { getStage } from '~/support/utilities'
import { createCookie } from './cookies'

export const setupDefaultLayout = async ({ request }: LoaderFunctionArgs) => {
  const cookie = request.headers.get('cookie')

  if (!cookie) {
    return redirect('/sign-in')
  }

  const { token } = createCookie(cookie)

  if (!token) {
    return redirect('/sign-in')
  }

  const stage = getStage()

  client.connect(stage)
  client.authenticate(token)

  const user = await client.profile.retrieve({})

  return json({
    user,
  })
}
