import { vi } from 'vitest'

import { SetupTestDependencies } from '@/config/tests'
import { AuthError } from '@/support/errors'
import { IJWT } from '@/ports/jwt'

export const JWTInMemory: SetupTestDependencies<IJWT> = {
  generate: vi.fn(() => {
    return 'accessToken'
  }),

  decode: vi.fn(<T>(value: string) => {
    const [token] = value?.split(' ').reverse() ?? []

    console.log({ value, token })

    if (token === 'Invalid token') {
      throw new AuthError('Invalid token')
    }

    return {} as T
  }),
}
