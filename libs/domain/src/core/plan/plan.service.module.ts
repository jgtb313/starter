import { Module } from '@nestjs/common'

import { PlanRepositoryModule } from '@/adapters/database/plan'
import { RecurrenceModule } from '@/adapters/recurrence'
import { PlanService } from '@/core/plan/plan.service'

@Module({
	imports: [
		PlanRepositoryModule,
		RecurrenceModule,
	],
	providers: [
		PlanService,
	],
	exports: [
		PlanService,
	],
})
export class PlanServiceModule {}
