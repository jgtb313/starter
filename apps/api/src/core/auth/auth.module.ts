import { Module } from '@nestjs/common'
import { UserServiceModule, OTPServiceModule } from '@starter/domain'

import { AuthServiceModule } from './auth.service.module'
import { AuthController } from './auth.controller'

@Module({
  imports: [UserServiceModule, AuthServiceModule, OTPServiceModule],
  controllers: [AuthController],
})
export class AuthModule {}
