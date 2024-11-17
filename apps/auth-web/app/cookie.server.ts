import { createCookie } from '@remix-run/node'

export const cookie = createCookie('accessToken', {
  domain: '.localhost',
  path: '/',
  httpOnly: true,
  secure: false,
  sameSite: 'none',
})
