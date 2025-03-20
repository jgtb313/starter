import { Module } from '@nestjs/common'
import { LoggerModule, EncryptModule, UserServiceModule } from '@starter/domain'

import { SocialAuthModule } from '@/adapters/social-auth'
import { JWTModule } from '@/adapters/jwt'
import { AuthService } from './auth.service'

@Module({
  imports: [LoggerModule, JWTModule, EncryptModule, UserServiceModule, SocialAuthModule],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthServiceModule {}
