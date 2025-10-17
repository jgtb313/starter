import { Module } from '@nestjs/common'

import { OTPService } from '@/core/otp/otp.service'
import { UserServiceModule } from '@/core/user/user.service.module'
import { OTPRepositoryModule } from '@/adapters/database/otp/otp.repository.module'
import { NotificationModule } from '@/adapters/notification'

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
