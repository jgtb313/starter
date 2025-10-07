import { Inject, Injectable } from '@nestjs/common'
import { type Merge, uuid } from '@starter/common'
import type { Pagination } from '@starter/schema'

import type { BasePlan, Plan } from '@/core/plan/plan.schema'
import { RecurrenceService } from '@/adapters/recurrence'
import type {
	FindPlanInput,
	IPlanRepository,
	PlanSort,
} from '@/ports/database/plan'
import { type I18nDomainService, I18nDomainSymbol } from '@/domain.i18n.module'

@Injectable()
export class PlanService {
	constructor(
		@Inject(I18nDomainSymbol)
		private readonly i18nService: I18nDomainService,
		@Inject('PLAN_REPOSITORY') private readonly planRepository: IPlanRepository,
		@Inject(RecurrenceService)
		private readonly recurrenceService: RecurrenceService,
	) {}

	testI18n = () => {
		return this.i18nService.current.workspaceAlreadyActive()
	}

	testCustomI18n = () => {
		return this.i18nService.current.custom('es').workspaceAlreadyInactive()
	}

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

		await this.recurrenceService.updatePlan(plan.state.externalId, {
			...plan.state,
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
