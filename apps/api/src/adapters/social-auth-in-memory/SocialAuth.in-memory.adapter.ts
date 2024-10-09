import { SocialSignInEnum } from '@starter/schema'
import { vi } from 'vitest'

import { SetupTestDependencies } from '@/config/tests'
import { AuthError } from '@/support/errors'
import { ISocialAuth } from '@/ports/social-auth'

export const SocialAuthInMemory: SetupTestDependencies<ISocialAuth> = {
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
}
