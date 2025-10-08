import { Global, Module } from '@nestjs/common'

import { JoseModule } from '@/adapters/jwt/jose.adapter.module'
import { JWTService } from '@/adapters/jwt/jwt.service'

@Global()
@Module({
	imports: [
		JoseModule,
	],
	providers: [
		JWTService,
	],
	exports: [
		JWTService,
	],
})
export class JWTModule {}
