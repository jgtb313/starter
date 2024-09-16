import { SocialSignInEnum } from '@starter/schema'

import { ISocialAuth } from '@/ports/social-auth'
import { SocialAuthGoogle } from './strategy/SocialAuthGoogle.adapter'
import { SocialAuthFacebook } from './strategy/SocialAuthFacebook.adapter'

export const SocialAuth: ISocialAuth = {
  async getInfosByToken(value, token) {
    const strategies = {
      [SocialSignInEnum.GOOGLE]: SocialAuthGoogle,
      [SocialSignInEnum.FACEBOOK]: SocialAuthFacebook
    }

    const strategy = strategies[value]

    return strategy(token)
  }
}
