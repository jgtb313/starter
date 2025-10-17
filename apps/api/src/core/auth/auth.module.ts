import { OTPServiceModule, UserServiceModule } from '@starter/domain'

import { Module } from '@nestjs/common'

import { AuthController } from '@/core/auth/auth.controller'
import { AuthServiceModule } from '@/core/auth/auth.service.module'

@Module({
	imports: [
		// OTPServiceModule,
		UserServiceModule,
		// AuthServiceModule,
	],
	controllers: [
		AuthController,
	],
})
export class AuthModule {}
