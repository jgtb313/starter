import { Module } from '@nestjs/common'

import { SocialAuthService } from './social-auth.service'

import {
	FacebookOauth2Module,
	GoogleOauth2Module,
} from '@/adapters/social-auth/strategies'

@Module({
	imports: [
		GoogleOauth2Module,
		FacebookOauth2Module,
	],
	providers: [
		SocialAuthService,
	],
	exports: [
		SocialAuthService,
	],
})
export class SocialAuthModule {}
