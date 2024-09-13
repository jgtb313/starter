import { PlanSchema, GetPlanByIdSchema, GetPlanByIdSchemaOutput } from '@starter/schema'

import { IDependencies } from '@/core/shared/types'
import { IRouter } from '@/ports/http'

export const PlanRouter = (dependencies: IDependencies): IRouter => ({
  name: 'Plans',

  description: 'Module to manage file storage and access using cloud integration services.',

  schemas: {
    Plan: {
      schema: PlanSchema
    }
  },

  paths: {
    getById: {
      summary: 'Get Plan',
      description: 'Returns a plan.',

      method: 'GET',

      path: '/plans/:id',

      parameters: {
        params: GetPlanByIdSchema
      },

      responses: {
        200: {
          schema: GetPlanByIdSchemaOutput,
          description: '200'
        }
      },

      execute() {
        return {}
      }
    }
  }
})
