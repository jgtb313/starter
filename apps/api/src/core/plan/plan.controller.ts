import { Controller, Route, Request } from '@starter/nestjs-server-hoisting'
import { PlanService, PlanSchema } from '@starter/domain'

import { ListPlansSchema, ListPlansRequest } from './plan.controller.schema'

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
  listPlans(@Request() { query }: ListPlansRequest) {
    return this.planService.findAll(query)
  }
}
