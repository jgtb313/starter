import { Global, Module } from '@nestjs/common'
import { UserServiceModule } from '@starter/domain'

import { AuthGuard } from './auth.guard'

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
