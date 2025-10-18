import {
	OTPServiceModule,
	ProfileServiceModule,
	UserServiceModule,
} from '@starter/domain'

import { Module } from '@nestjs/common'

import { ProfileController } from '@/core/profile/profile.controller'

@Module({
	imports: [
		OTPServiceModule,
		ProfileServiceModule,
		UserServiceModule,
	],
	controllers: [
		ProfileController,
	],
})
export class ProfileModule {}
