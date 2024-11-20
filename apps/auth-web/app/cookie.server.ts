import { createCookieSessionStorage, createCookie } from '@remix-run/node'

export const cookie = createCookieSessionStorage({
  cookie: createCookie('auth', {
    httpOnly: true,
    secure: import.meta.env.VITE_STAGE !== 'local',
    sameSite: 'lax',
    path: '/',
  }),
})
