import { SocialAuthEnum } from '@starter/schema'

import { CreateTestDependenciesOptions, SetupTestDependencies } from '../../domain.dependencies'
import { AuthError } from '../../domain.errors'
import { ISocialAuth } from './SocialAuth.port'

export const SocialAuthInMemory = ({ vi }: CreateTestDependenciesOptions): SetupTestDependencies<ISocialAuth> => ({
  getInfosByToken: vi.fn(async (_: SocialAuthEnum, token: string) => {
    if (token === 'tokenUnregisteredUser') {
      return {
        id: 'tokenUnregisteredUser',
        name: 'James Smith',
        email: 'james.smith@fakeemail.com',
      }
    }

    if (token === 'tokenUnregisteredUserWithoutEmail') {
      return {
        id: 'tokenUnregisteredUserWithoutEmail',
        name: 'Emily Johnson',
      }
    }

    if (token === 'tokenRegisteredUser') {
      return {
        id: 'tokenRegisteredUser',
        name: 'Hank Isaac',
        email: 'hank.isaac@lambda.com',
      }
    }

    if (token === 'tokenRegisteredUserWithoutEmail') {
      return {
        id: 'tokenRegisteredUserWithoutEmail',
        name: 'Hank Isaac',
      }
    }

    throw new AuthError('Invalid access data')
  }),
})
