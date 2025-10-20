import { Module } from '@nestjs/common'

import { PlanPrisma } from '@/adapters/database/plan/plan.prisma.adapter'

@Module({
	providers: [
		{
			provide: 'PLAN_REPOSITORY',
			useClass: PlanPrisma,
		},
	],
	exports: [
		'PLAN_REPOSITORY',
	],
})
export class PlanRepositoryModule {}
