import { Module } from '@nestjs/common'

import {
	FacebookOauth2Module,
	GoogleOauth2Module,
} from '@/adapters/social-auth/strategies'

import { SocialAuthService } from './social-auth.service'

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
