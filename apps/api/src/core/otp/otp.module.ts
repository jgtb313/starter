import { OTPServiceModule, UserServiceModule } from '@starter/domain'

import { Module } from '@nestjs/common'

import { OTPController } from '@/core/otp/otp.controller'

@Module({
	imports: [
		UserServiceModule,
		OTPServiceModule,
	],
	controllers: [
		OTPController,
	],
})
export class OTPModule {}
