import { PlanSchema, IndexPlanSchema, IndexPlanSchemaOutput } from '@starter/schema'

import { IDependencies } from '@/core/shared/types'
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

      execute() {
        console.log(dependencies)
        return {}
      }
    }
  }
})
