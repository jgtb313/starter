import { ProfileServiceModule } from '@starter/domain'

import { Module } from '@nestjs/common'

import { AuthGuard } from '@/support/guards/auth-guard/auth.guard'
import { JWTModule } from '@/adapters/jwt'

@Module({
	imports: [
		JWTModule,
		ProfileServiceModule,
	],
	providers: [
		AuthGuard,
	],
	exports: [
		AuthGuard,
	],
})
export class AuthGuardModule {}
