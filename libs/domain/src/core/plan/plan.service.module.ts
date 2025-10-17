import { Module } from '@nestjs/common'

import { PlanService } from '@/core/plan/plan.service'
import { PlanRepositoryModule } from '@/adapters/database/plan/plan.repository.module'
import { RecurrenceModule } from '@/adapters/recurrence'

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
