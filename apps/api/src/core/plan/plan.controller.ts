import { Controller, Route, Request } from '@starter/nestjs-server-hoisting'
import { PlanService, PlanSchema, PlanStatusEnum } from '@starter/domain'

import { ListPlansSchema, ListPlansRequest } from '@/core/plan/plan.controller.schema'

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
}
