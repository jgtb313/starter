import { Module } from '@nestjs/common'

import { SubscriptionPrisma } from '@/adapters/database/subscription/subscription.prisma.adapter'

@Module({
	providers: [
		{
			provide: 'SUBSCRIPTION_REPOSITORY',
			useClass: SubscriptionPrisma,
		},
	],
	exports: [
		'SUBSCRIPTION_REPOSITORY',
	],
})
export class SubscriptionRepositoryModule {}
