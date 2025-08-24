import { Module } from '@nestjs/common'

import { OTPRepositoryModule } from '@/adapters/database/otp'
import { NotificationModule } from '@/adapters/notification'
import { OTPService } from '@/core/otp/otp.service'
import { UserServiceModule } from '@/core/user/user.service.module'

@Module({
	imports: [
		OTPRepositoryModule,
		UserServiceModule,
		NotificationModule,
	],
	providers: [
		OTPService,
	],
	exports: [
		OTPService,
	],
})
export class OTPServiceModule {}
