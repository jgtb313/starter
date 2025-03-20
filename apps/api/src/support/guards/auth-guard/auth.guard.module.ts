import { Global, Module } from '@nestjs/common'
import { UserServiceModule } from '@starter/domain'

import { JWTModule } from '@/adapters/jwt'
import { AuthGuard } from './auth.guard'

@Global()
@Module({
  imports: [UserServiceModule, JWTModule],
  providers: [AuthGuard],
  exports: [AuthGuard, JWTModule],
})
export class AuthGuardModule {}
