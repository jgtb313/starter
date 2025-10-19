import { OTPServiceModule, UserServiceModule } from '@starter/domain'

import { Module } from '@nestjs/common'

import { ProfileController } from '@/core/profile/profile.controller'

@Module({
	imports: [
		OTPServiceModule,
		UserServiceModule,
	],
	controllers: [
		ProfileController,
	],
})
export class ProfileModule {}
