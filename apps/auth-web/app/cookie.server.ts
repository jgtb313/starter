import { createCookieSessionStorage, createCookie, LoaderFunctionArgs } from '@remix-run/node'
import { config } from '@starter/config'

export const cookie = createCookieSessionStorage({
  cookie: createCookie('auth', {
    secrets: [config.name],
    httpOnly: true,
    secure: import.meta.env.VITE_STAGE !== 'local',
    sameSite: 'lax',
    path: '/',
  }),
})

export const setupCookie = async ({ request }: LoaderFunctionArgs, accessToken?: string) => {
  const session = await cookie.getSession(request.headers.get('Cookie'))

  await session.set('accessToken', accessToken)

  const cookieHeader = await cookie.commitSession(session)

  return cookieHeader
}
