import { Module } from '@nestjs/common'

import { OTPRepositoryModule } from '@/adapters/database/otp'
import { NotificationModule } from '@/adapters/notification'
import { UserServiceModule } from '@/core/user/user.service.module'
import { OTPService } from '@/core/otp/otp.service'

@Module({
  imports: [OTPRepositoryModule, UserServiceModule, NotificationModule],
  providers: [
    {
      provide: 'OTP_SERVICE',
      useClass: OTPService,
    },
  ],
  exports: ['OTP_SERVICE'],
})
export class OTPServiceModule {}
