import { Module } from '@nestjs/common'

import { OTPRepositoryModule } from '@/adapters/database/otp'
import { NotificationModule } from '@/adapters/notification'
import { UserServiceModule } from '@/core/user'
import { OTPService } from './otp.service'

@Module({
  imports: [OTPRepositoryModule, UserServiceModule, NotificationModule],
  providers: [OTPService],
  exports: [OTPService],
})
export class OTPServiceModule {}
