import { Module } from '@nestjs/common'
import { OTPServiceModule, UserServiceModule } from '@starter/domain'

import { ProfileController } from './profile.controller'

@Module({
	imports: [
		UserServiceModule,
		OTPServiceModule,
	],
	controllers: [
		ProfileController,
	],
})
export class ProfileModule {}
