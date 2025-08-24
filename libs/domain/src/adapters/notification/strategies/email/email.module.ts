import { Module } from '@nestjs/common'

import { EmailStrategy } from './email.strategy'
import { GoogleEmailAdapter } from './google-email.adapter'
import { GoogleEmailModule } from './google-email.adapter.module'

@Module({
	imports: [
		GoogleEmailModule,
	],
	providers: [
		{
			provide: 'Email',
			useClass: GoogleEmailAdapter,
		},
		EmailStrategy,
	],
	exports: [
		EmailStrategy,
	],
})
export class EmailModule {}
