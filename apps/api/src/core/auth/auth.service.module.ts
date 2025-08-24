import { Module } from '@nestjs/common'
import { EncryptModule, LoggerModule, UserServiceModule } from '@starter/domain'

import { JWTModule } from '@/adapters/jwt'
import { SocialAuthModule } from '@/adapters/social-auth'
import { AuthService } from '@/core/auth/auth.service'

@Module({
	imports: [
		LoggerModule,
		JWTModule,
		EncryptModule,
		UserServiceModule,
		SocialAuthModule,
	],
	providers: [
		AuthService,
	],
	exports: [
		AuthService,
	],
})
export class AuthServiceModule {}
