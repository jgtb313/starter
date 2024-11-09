import { json, LoaderFunctionArgs } from '@remix-run/node'
import client from '@starter/client'
import { defineCookies } from '@starter/use-remix-hooks'

export const setupDefaultLayout = async ({ request }: LoaderFunctionArgs) => {
  const stage = import.meta.env.VITE_STAGE

  client.connect(stage)

  const cookie = request.headers.get('cookie')

  if (!cookie) {
    return json({
      user: undefined,
    })
  }

  const { token } = defineCookies(cookie)

  if (!token) {
    return json({
      user: undefined,
    })
  }

  client.authenticate(token)

  const user = await client.profile.retrieve({})

  return json({
    user,
  })
}
