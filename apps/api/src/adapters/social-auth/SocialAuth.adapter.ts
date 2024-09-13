import { SocialAuthEnum } from '@starter/schema'

import { ISocialAuth } from '@/ports/social-auth'
import { SocialAuthGoogle } from './strategy/SocialAuthGoogle.adapter'
import { SocialAuthFacebook } from './strategy/SocialAuthFacebook.adapter'

export const SocialAuth: ISocialAuth = {
  async getInfosByToken(value, token) {
    const strategies = {
      [SocialAuthEnum.GOOGLE]: SocialAuthGoogle,
      [SocialAuthEnum.FACEBOOK]: SocialAuthFacebook
    }

    const strategy = strategies[value]

    return strategy(token)
  }
}
