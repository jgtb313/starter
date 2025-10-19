import { Inject, Injectable } from '@nestjs/common'

import {
	FacebookOauth2Strategy,
	GoogleOauth2Strategy,
} from '@/adapters/social-auth/strategies'
import type { ISocialAuth } from '@/ports/social-auth'

@Injectable()
export class SocialAuthService {
	constructor(
		@Inject(GoogleOauth2Strategy)
		private readonly googleOauth2: GoogleOauth2Strategy,
		@Inject(FacebookOauth2Strategy)
		private readonly facebookOauth2: FacebookOauth2Strategy,
	) {}

	getInfo: ISocialAuth['getInfo'] = async (context, providerToken) => {
		const strategies = {
			GOOGLE: this.googleOauth2.getInfo,
			FACEBOOK: this.facebookOauth2.getInfo,
		}

		const strategy = strategies[context]

		return strategy(providerToken)
	}
}
