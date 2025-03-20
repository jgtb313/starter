import { Module } from '@nestjs/common'
import { UserServiceModule, OTPServiceModule } from '@starter/domain'

import { OTPController } from './otp.controller'

@Module({
  imports: [UserServiceModule, OTPServiceModule],
  controllers: [OTPController],
})
export class OTPModule {}
