import { sign, verify } from 'jsonwebtoken'

import { env } from '@/config'
import { AuthError } from '@/support/errors'
import { IJWT } from '@/ports/jwt'

const SERVER_AUTHENTICATE_SECRET = env('SERVER_AUTHENTICATE_SECRET')

export const JWT: IJWT = {
  generate(value, { expiresIn = '7d' } = {}) {
    return sign(value as never, SERVER_AUTHENTICATE_SECRET, { expiresIn })
  },

  decode<T>(value: string) {
    const [token] = value?.split(' ').reverse() ?? []
    try {
      return verify(`${token}`, SERVER_AUTHENTICATE_SECRET, { algorithms: ['HS256'] }) as T
    } catch (_error) {
      throw new AuthError('Invalid token')
    }
  },
}
