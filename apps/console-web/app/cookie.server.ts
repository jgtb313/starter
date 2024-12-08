import { createCookieSessionStorage, createCookie } from '@remix-run/node'
import { config } from '@starter/config'

export const cookie = createCookieSessionStorage({
  cookie: createCookie('auth', {
    secrets: [config.name],
    httpOnly: true,
    secure: import.meta.env.STAGE === 'prd',
    sameSite: 'lax',
    path: '/',
  }),
})
