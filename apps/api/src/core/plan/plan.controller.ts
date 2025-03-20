import { Controller, Route, Request, RequestInput } from '@starter/nestjs-server-hoisting'
import { PlanService, PlanSchema } from '@starter/domain'

import { ListPlansSchema, ListPlansSchemaOutput, ListPlansInput } from './plan.controller.schema'

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
      query: ListPlansSchema,
    },

    responses: {
      200: {
        schema: ListPlansSchemaOutput,
      },
    },
  })
  listPlans(@Request() { query }: RequestInput<ListPlansInput, {}, {}>) {
    return this.planService.findAll(query)
  }
}
