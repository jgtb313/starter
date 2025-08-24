import { Module } from '@nestjs/common'
import { OTPServiceModule, UserServiceModule } from '@starter/domain'

import { AuthController } from '@/core/auth/auth.controller'
import { AuthServiceModule } from '@/core/auth/auth.service.module'

@Module({
	imports: [
		UserServiceModule,
		AuthServiceModule,
		OTPServiceModule,
	],
	controllers: [
		AuthController,
	],
})
export class AuthModule {}
