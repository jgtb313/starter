import { json, redirect, LoaderFunctionArgs } from '@remix-run/node'
import client, { StageEnum } from '@starter/client'
import { defineCookies } from '@starter/use-remix-hooks'

export const setupDefaultLayout = async ({ request }: LoaderFunctionArgs) => {
  const cookie = request.headers.get('cookie')

  if (!cookie) {
    return redirect('/sign-in')
  }

  const { token } = defineCookies(cookie)

  if (!token) {
    return redirect('/sign-in')
  }

  const stage = import.meta.env.VITE_STAGE as StageEnum

  client.connect(stage)
  client.authenticate(token)

  const user = await client.profile.retrieve({})

  return json({
    user,
  })
}
