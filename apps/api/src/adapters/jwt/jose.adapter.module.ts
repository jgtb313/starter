import { Module } from '@nestjs/common'

import { JoseAdapter } from './jose.adapter'

@Module({
	providers: [
		{
			provide: 'JWT',
			useClass: JoseAdapter,
		},
	],
	exports: [
		'JWT',
	],
})
export class JoseModule {}
