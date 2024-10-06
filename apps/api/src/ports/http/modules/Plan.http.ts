import { PlanSchema, IndexPlanSchema, IndexPlanSchemaOutput } from '@starter/schema'

import { IDependencies } from '@/core/shared/types'
import { indexPlan } from '@/core/plan/use-cases/index-plan.use-case'
import { IRouter } from '@/ports/http'

export const PlanRouter = (dependencies: IDependencies): IRouter => ({
  name: 'Plans',

  description: '',

  schemas: {
    Plan: {
      schema: PlanSchema
    }
  },

  paths: {
    listAvailablePlans: {
      summary: 'List Plans',
      description: 'Retrieves a list of all available subscription plans for users.',

      method: 'GET',

      path: '/plans::available',

      parameters: {
        query: IndexPlanSchema
      },

      responses: {
        200: {
          description: 'OK',
          schema: IndexPlanSchemaOutput
        }
      },

      execute({ query }) {
        return indexPlan(dependencies)(query)
      }
    }
  }
})
