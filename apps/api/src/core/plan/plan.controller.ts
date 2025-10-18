import { PlanSchema, PlanService } from '@starter/domain'
import { Controller, Request, Route } from '@starter/nestjs-server-hoisting'

import { Inject } from '@nestjs/common'

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
	constructor(@Inject(PlanService) private readonly planService: PlanService) {}

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
		return this.planService
			.getPaginatedPlans({
				...query,
				status: 'ACTIVE',
			})
			.then((response) => ({
				...response,
				values: response.values.map((plan) => plan.toJSON()),
			}))
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
				description: 'Plan {planId} not found',
			},
		},
	})
	getPlan(@Request() { params }: GetPlanRequest) {
		return this.planService.getPlan(params.planId).then((plan) => plan.toJSON())
	}
}
