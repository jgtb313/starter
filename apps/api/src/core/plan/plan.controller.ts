import { Inject } from '@nestjs/common'
import { PlanSchema, PlanService } from '@starter/domain'
import { Controller, Request, Route } from '@starter/nestjs-server-hoisting'

import { type I18nAPIService, I18nAPISymbol } from '@/api.i18n.module'
import {
	type GetPlanRequest,
	GetPlanSchema,
	type ListPlansRequest,
	ListPlansSchema,
} from '@/core/plan/plan.controller.schema'

@Controller({
	name: 'Plan',

	description: 'Handles operations for managing and retrieving plans.',

	basePath: 'plans',

	schemas: {
		Plan: {
			schema: PlanSchema,
		},
	},
})
export class PlanController {
	constructor(
		@Inject(I18nAPISymbol)
		private readonly i18nService: I18nAPIService,
		@Inject(PlanService) private readonly planService: PlanService,
	) {}

	@Route({
		summary: 'List Plans',

		description: 'Retrieves a list of plans.',

		method: 'GET',

		parameters: {
			query: ListPlansSchema.query,
		},

		responses: {
			200: {
				schema: ListPlansSchema.output,
			},
		},
	})
	async listPlans(@Request() { query }: ListPlansRequest) {
		const fromController = this.i18nService.current.hello({
			name: 'John',
		})
		const customFromController = this.i18nService.current.custom('es').hello({
			name: 'John',
		})

		const fromDomain = this.planService.testI18n()
		const customFromDomain = this.planService.testCustomI18n()

		return {
			fromController,
			customFromController,
			fromDomain,
			customFromDomain,
		}

		// return this.planService
		// 	.getPaginatedPlans({
		// 		...query,
		// 		status: 'ACTIVE',
		// 	})
		// 	.then((response) => ({
		// 		...response,
		// 		values: response.values.map((plan) => plan.toJSON()),
		// 	}))
	}

	@Route({
		summary: 'Get Plan',

		description: 'Retrieves a single plan by their ID.',

		method: 'GET',

		path: '/:planId',

		parameters: {
			params: GetPlanSchema.params,
		},

		responses: {
			200: {
				schema: GetPlanSchema.output,
			},
			404: {
				description: 'Plan ${planId} not found',
			},
		},
	})
	getPlan(@Request() { params }: GetPlanRequest) {
		return this.planService.getPlan(params.planId)
	}
}
