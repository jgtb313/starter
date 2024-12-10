import { SocialSignInEnum } from '@starter/schema'

import { CreateTestDependenciesOptions, SetupTestDependencies } from '../../domain.types'
import { AuthError } from '../../domain.errors'
import { ISocialAuth } from '../../ports/social-auth'

export const SocialAuthInMemory = ({ vi }: CreateTestDependenciesOptions): SetupTestDependencies<ISocialAuth> => ({
  getInfosByToken: vi.fn(async (_: SocialSignInEnum, token: string) => {
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
