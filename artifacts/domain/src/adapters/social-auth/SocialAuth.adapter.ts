import { SocialSignInEnum } from '@starter/schema'

import { CreateDependenciesOptions } from '../../domain.dependencies'
import { AuthError } from '../../domain.errors'
import { ISocialAuth } from '../../ports/social-auth'

import { SocialAuthGoogle } from './strategy/SocialAuthGoogle.adapter'
import { SocialAuthFacebook } from './strategy/SocialAuthFacebook.adapter'

export const SocialAuth = ({}: CreateDependenciesOptions): ISocialAuth => ({
  async getInfosByToken(value, token) {
    const strategies = {
      [SocialSignInEnum.GOOGLE]: SocialAuthGoogle,
      [SocialSignInEnum.FACEBOOK]: SocialAuthFacebook,
    }

    const strategy = strategies[value]

    try {
      return await strategy(token)
    } catch (error) {
      throw new AuthError('Invalid acess data')
    }
  },
})
