import { json, LoaderFunctionArgs } from '@remix-run/node'
import client from '@starter/client'

import { getStage } from '~/support/utilities'
import { createCookie } from './cookies'

export const setupDefaultLayout = async ({ request }: LoaderFunctionArgs) => {
  const stage = getStage()

  client.connect(stage)

  const cookie = request.headers.get('cookie')

  if (!cookie) {
    return json({})
  }

  const { token } = createCookie(cookie)

  client.authenticate(token)

  const user = await client.profile.retrieve({})

  return json({
    user,
  })
}
