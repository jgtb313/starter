import { vi } from 'vitest'

import { SetupTestDependencies } from '@/config/tests'
import { AuthError } from '@/support/errors'
import { IJWT } from '@/ports/jwt'

export const JWTInMemory: SetupTestDependencies<IJWT> = {
  generate: vi.fn(() => {
    return ''
  }),

  decode: vi.fn(<T>(value: string) => {
    const [token] = value?.split(' ').reverse() ?? []

    if (token === 'Unauthorized') {
      throw new AuthError('Unauthorized')
    }

    return {} as T
  }),
}
