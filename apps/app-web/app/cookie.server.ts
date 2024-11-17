import { createCookieSessionStorage, createCookie } from '@remix-run/node'

export const cookie = createCookieSessionStorage({
  cookie: createCookie('accessToken', {
    domain: '.localhost',
    path: '/',
    httpOnly: true,
    secure: false,
    sameSite: 'none',
  }),
})
