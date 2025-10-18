import { OTPServiceModule, UserServiceModule } from '@starter/domain'

import { Module } from '@nestjs/common'

import { AuthGuardModule } from '@/support/guards/auth-guard'
import { ProfileController } from '@/core/profile/profile.controller'

@Module({
	imports: [
		OTPServiceModule,
		UserServiceModule,
		AuthGuardModule,
	],
	controllers: [
		ProfileController,
	],
})
export class ProfileModule {}
