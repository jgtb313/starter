import { Injectable } from '@nestjs/common'

import { ISocialAuth, SocialAuthEnum } from '@/ports/social-auth'
import { GoogleOauth2Strategy, FacebookOauth2Strategy } from '@/adapters/social-auth/strategies'

@Injectable()
export class SocialAuthService {
  constructor(
    private readonly googleOauth2: GoogleOauth2Strategy,
    private readonly facebookOauth2: FacebookOauth2Strategy,
  ) {}

  getInfo: ISocialAuth['getInfo'] = async (context, providerToken) => {
    const handlers = {
      [SocialAuthEnum.GOOGLE]: this.googleOauth2.getInfo,
      [SocialAuthEnum.FACEBOOK]: this.facebookOauth2.getInfo,
    }

    const handler = handlers[context]

    return handler(providerToken)
  }
}
