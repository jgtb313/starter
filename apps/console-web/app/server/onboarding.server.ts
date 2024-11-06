import { json, redirect, LoaderFunctionArgs } from '@remix-run/node'
import client from '@ss/client'

import { getEnv } from '~/support/utilities'
import { createCookie } from './cookies'

export const setupOnboardingLayout = async ({ request }: LoaderFunctionArgs) => {
  const cookie = request.headers.get('cookie')

  if (!cookie) {
    return redirect('/sign-in')
  }

  const { token } = createCookie(cookie)

  if (!token) {
    return redirect('/sign-in')
  }

  const env = getEnv()

  client.connect(env)
  client.authenticate(token)

  const { user } = await client.user.me({})

  if (!user.onboarding) {
    return redirect('/')
  }

  return json({
    user
  })
}
