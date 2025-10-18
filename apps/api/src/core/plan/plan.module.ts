import { PlanServiceModule } from '@starter/domain'

import { Module } from '@nestjs/common'

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
