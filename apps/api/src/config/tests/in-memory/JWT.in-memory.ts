import { vi } from 'vitest'

import { ForbiddenError } from '@/support/errors'
import { IJWT } from '@/ports/jwt'

export const JWTInMemory: IJWT = {
  generate: vi.fn(() => {
    return ''
  }),

  decode: vi.fn(<T>(value: string) => {
    const [token] = value?.split(' ').reverse() ?? []

    if (token === 'Unauthorized') {
      throw new ForbiddenError('Unauthorized')
    }

    return {} as T
  }) as IJWT['decode']
}
