import { Controller, Route, Request } from '@starter/nestjs-server-hoisting'
import { PlanService, PlanSchema, PlanStatusEnum } from '@starter/domain'

import { ListPlansSchema, GetPlanSchema, ListPlansRequest, GetPlanRequest } from '@/core/plan/plan.controller.schema'

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
  constructor(private readonly planService: PlanService) {}

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
        status: PlanStatusEnum.ACTIVE,
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
        description: 'Plan ${planId} not found',
      },
    },
  })
  getPlan(@Request() { params }: GetPlanRequest) {
    return this.planService.getPlan(params.planId)
  }
}
