import { Module } from '@nestjs/common'
import { UserServiceModule, OTPServiceModule } from '@starter/domain'

import { OTPController } from '@/core/otp/otp.controller'

@Module({
  imports: [UserServiceModule, OTPServiceModule],
  controllers: [OTPController],
})
export class OTPModule {}
