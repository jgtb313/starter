import { Inject, Injectable } from '@nestjs/common'
import { type Merge, uuid } from '@starter/common'
import type { Pagination } from '@starter/schema'

import type { BasePlan, Plan } from '@/core/plan/plan.schema'
import { LoggerService } from '@/adapters/logger'
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
		@Inject('PLAN_REPOSITORY')
		private readonly planRepository: IPlanRepository,
		@Inject(RecurrenceService)
		private readonly recurrenceService: RecurrenceService,
		@Inject(LoggerService)
		private readonly loggerService: LoggerService,
		@Inject(I18nDomainSymbol)
		private readonly i18nService: I18nDomainService,
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
		return this.planRepository.findPaginated(input)
	}

	getPlan = async (planId: string) => {
		return this.planRepository.findById(planId)
	}

	createPlan = async ({ status = 'INACTIVE', ...input }: BasePlan) => {
		this.loggerService.info('Attempting to create plan', {
			input,
		})

		const planId = uuid()

		const recurrencePlan = await this.recurrenceService.createPlan({
			...input,
			referenceId: planId,
		})

		this.loggerService.info('Plan created in Recurrence', {
			planId,
		})

		const plan = await this.planRepository.create({
			...input,
			planId,
			externalId: recurrencePlan.planId,
			status,
		})

		this.loggerService.info('Plan created', {
			planId,
		})

		return plan
	}

	updatePlan = async (planId: string, input: Partial<Plan>) => {
		this.loggerService.info('Attempting to update plan', {
			planId,
			input,
		})

		const plan = await this.planRepository.findById(planId)

		await this.recurrenceService.updatePlan(plan.state.externalId, {
			...plan.state,
			...input,
		})

		this.loggerService.info('Plan updated in Recurrence', {
			planId: plan.state.externalId,
		})

		const updatedPlan = await this.planRepository.updateById(
			plan.state.planId,
			input,
		)

		this.loggerService.info('Plan updated in Database', {
			planId,
		})

		this.loggerService.info('Plan updated', {
			planId,
		})

		return updatedPlan
	}

	deletePlan = async (planId: string) => {
		const plan = await this.planRepository.findById(planId)

		await this.recurrenceService.cancelPlan({
			planId,
		})

		await this.planRepository.deleteById(plan.state.planId)
	}
}
