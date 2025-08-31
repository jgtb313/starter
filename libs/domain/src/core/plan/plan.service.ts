import { Inject, Injectable } from '@nestjs/common'
import { type Merge, uuid } from '@starter/common'
import type { Pagination } from '@starter/schema'

import type { RecurrenceService } from '@/adapters/recurrence'
import type { BasePlan, Plan } from '@/core/plan/plan.schema'
import type {
	FindPlanInput,
	IPlanRepository,
	PlanSort,
} from '@/ports/database/plan'

@Injectable()
export class PlanService {
	constructor(
		@Inject('PLAN_REPOSITORY') private readonly planRepository: IPlanRepository,
		private readonly recurrenceService: RecurrenceService,
	) {}

	getPaginatedPlans = async (
		input: Merge<
			[
				FindPlanInput,
				PlanSort,
				Pagination,
			]
		>,
	) => {
		return this.planRepository.findAllPaginated(input)
	}

	getPlan = async (planId: string) => {
		return this.planRepository.findById(planId)
	}

	createPlan = async ({ status = 'INACTIVE', ...input }: BasePlan) => {
		const planId = uuid()

		const recurrencePlan = await this.recurrenceService.createPlan({
			...input,
			referenceId: planId,
		})

		return this.planRepository.create({
			...input,
			planId,
			externalId: recurrencePlan.planId,
			status,
		})
	}

	updatePlan = async (planId: string, input: Partial<Plan>) => {
		const plan = await this.planRepository.findById(planId)

		await this.recurrenceService.updatePlan({
			planId,
			...input,
		})

		return this.planRepository.updateById(plan.state.planId, input)
	}

	deletePlan = async (planId: string) => {
		const plan = await this.planRepository.findById(planId)

		await this.recurrenceService.cancelPlan({
			planId,
		})

		plan.markAsDeleted()

		await this.planRepository.updateById(plan.state.planId, plan.state)
	}
}
