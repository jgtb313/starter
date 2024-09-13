import { sign, verify } from 'jsonwebtoken'

import { env } from '@/config'
import { ConflictError } from '@/support/errors'
import { IJWT } from '@/ports/jwt'

const SERVER_SECRET = env('SERVER_SECRET')

export const JWT: IJWT = {
  generate(value, { expiresIn = '7d' } = {}) {
    return sign(value as never, SERVER_SECRET, { expiresIn })
  },

  decode<T>(value: string) {
    const [token] = value?.split(' ').reverse() ?? []
    try {
      return verify(`${token}`, SERVER_SECRET, { algorithms: ['HS256'] }) as T
    } catch (error) {
      throw new ConflictError('Não autorizado')
    }
  }
}
