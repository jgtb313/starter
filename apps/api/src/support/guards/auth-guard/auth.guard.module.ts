import { ProfileServiceModule } from '@starter/domain'

import { Global, Module } from '@nestjs/common'

import { AuthGuard } from '@/support/guards/auth-guard/auth.guard'
import { JWTModule } from '@/adapters/jwt'

@Global()
@Module({
	imports: [
		ProfileServiceModule,
		JWTModule,
	],
	providers: [
		AuthGuard,
	],
	exports: [
		AuthGuard,
		ProfileServiceModule,
	],
})
export class AuthGuardModule {}
