import { Module } from '@nestjs/common'

import { EmailStrategy } from '@/adapters/notification/strategies/email/email.strategy'
import { GoogleEmailAdapter } from '@/adapters/notification/strategies/email/google-email.adapter'
import { GoogleEmailModule } from '@/adapters/notification/strategies/email/google-email.adapter.module'

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
