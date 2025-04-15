import { Module } from '@nestjs/common'
import { UserServiceModule, OTPServiceModule } from '@starter/domain'

import { AuthServiceModule } from '@/core/auth/auth.service.module'
import { AuthController } from '@/core/auth/auth.controller'

@Module({
  imports: [UserServiceModule, AuthServiceModule, OTPServiceModule],
  controllers: [AuthController],
})
export class AuthModule {}
