import { UserServiceModule } from '@starter/domain'

import { Global, Module } from '@nestjs/common'

import { AuthGuard } from '@/support/guards/auth-guard/auth.guard'
import { JWTModule } from '@/adapters/jwt'

@Global()
@Module({
	imports: [
		UserServiceModule,
		JWTModule,
	],
	providers: [
		AuthGuard,
	],
	exports: [
		AuthGuard,
	],
})
export class AuthGuardModule {}
