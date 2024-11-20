import { createCookieSessionStorage, createCookie } from '@remix-run/node'

export const cookie = createCookieSessionStorage({
  cookie: createCookie('auth', {
    httpOnly: true,
    secure: import.meta.env.STAGE === 'prd',
    sameSite: 'lax',
    path: '/',
  }),
})
