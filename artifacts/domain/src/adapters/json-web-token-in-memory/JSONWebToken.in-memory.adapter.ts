import { CreateTestDependenciesOptions, SetupTestDependencies } from '../../domain.dependencies'
import { AuthError } from '../../domain.errors'
import { IJWT } from '../../ports/jwt'

export const JWTInMemory = ({ vi }: CreateTestDependenciesOptions): SetupTestDependencies<IJWT> => ({
  generate: vi.fn(() => {
    return 'accessToken'
  }),

  decode: vi.fn(<T>(value: string) => {
    const [token] = value?.split(' ').reverse() ?? []

    if (token === 'Invalid token') {
      throw new AuthError('Invalid token')
    }

    return {} as T
  }),
})
