import { Module } from '@nestjs/common'
import { PlanServiceModule } from '@starter/domain'

import { PlanController } from './plan.controller'

@Module({
	imports: [
		PlanServiceModule,
	],
	controllers: [
		PlanController,
	],
})
export class PlanModule {}
