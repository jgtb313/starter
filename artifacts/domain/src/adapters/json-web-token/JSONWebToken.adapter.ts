import { sign, verify } from 'jsonwebtoken'

import { CreateDependenciesOptions } from '../../domain.types'
import { AuthError } from '../../domain.errors'
import { IJWT } from '../../ports/jwt'

export const JWT = ({}: CreateDependenciesOptions): IJWT => ({
  generate(value, secret, { expiresIn = '7d' } = {}) {
    return sign(value as never, secret, { expiresIn })
  },

  decode<T>(value: string, secret: string) {
    const [token] = value?.split(' ').reverse() ?? []
    try {
      return verify(`${token}`, secret, { algorithms: ['HS256'] }) as T
    } catch (_error) {
      throw new AuthError('Invalid token')
    }
  },
})
