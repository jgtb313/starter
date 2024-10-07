import {
  PlanSchema,
  ListPlansSchema,
  ListPlansSchemaOutput,
  ListAvailablePlansSchema,
  ListAvailablePlansSchemaOutput,
  GetPlanSchema,
  GetPlanSchemaOutput,
  CreatePlanSchema,
  CreatePlanSchemaOutput,
  UpdatePlanSchema,
  UpdatePlanSchemaOutput,
  ActivePlanSchema,
  ActivePlanSchemaOutput,
  InactivePlanSchema,
  InactivePlanSchemaOutput,
  DeletePlanSchema
} from '@starter/schema'

import { IDependencies } from '@/core/shared/types'
import { listPlans } from '@/core/plan/use-cases/list-plans.use-case'
import { listAvailablePlans } from '@/core/plan/use-cases/list-available-plans.use-case'
import { getPlan } from '@/core/plan/use-cases/get-plan.use-case'
import { createPlan } from '@/core/plan/use-cases/create-plan.use-case'
import { updatePlan } from '@/core/plan/use-cases/update-plan.use-case'
import { activePlan } from '@/core/plan/use-cases/active-plan.use-case'
import { inactivePlan } from '@/core/plan/use-cases/inactive-plan.use-case'
import { deletePlan } from '@/core/plan/use-cases/delete-plan.use-case'
import { IRouter } from '@/ports/http'

export const PlanRouter = (dependencies: IDependencies): IRouter => ({
  name: 'Plans',

  description: 'Handles operations related to managing and retrieving plans for user subscriptions.',

  schemas: {
    Plan: {
      schema: PlanSchema
    }
  },

  paths: {
    listPlans: {
      summary: 'List Plans',
      description: 'Retrieves a paginated list of subscription plans.',

      method: 'GET',
      path: '/plans',

      parameters: {
        query: ListPlansSchema
      },

      responses: {
        200: {
          description: 'OK',
          schema: ListPlansSchemaOutput
        }
      },

      execute({ query }) {
        return listPlans(dependencies)(query)
      }
    },

    listAvailablePlans: {
      summary: 'List Available Plans',
      description: 'Retrieves a list of all available subscription plans.',

      method: 'GET',

      path: '/plans::available',

      parameters: {
        query: ListAvailablePlansSchema
      },

      responses: {
        200: {
          description: 'OK',
          schema: ListAvailablePlansSchemaOutput
        }
      },

      execute() {
        return listAvailablePlans(dependencies)({})
      }
    },

    getPlan: {
      summary: 'Get Plan',

      description: 'Retrieves details of a specific subscription plan by ID.',

      method: 'GET',

      path: '/plans/:id',

      parameters: {
        params: GetPlanSchema
      },

      responses: {
        200: {
          description: 'OK',
          schema: GetPlanSchemaOutput
        }
      },

      execute({ params }) {
        return getPlan(dependencies)(params)
      }
    },

    createPlan: {
      summary: 'Create Plan',
      description: 'Creates a new subscription plan.',

      method: 'POST',
      path: '/plans',

      parameters: {
        body: CreatePlanSchema
      },

      responses: {
        201: {
          description: 'Created',
          schema: CreatePlanSchemaOutput
        }
      },

      execute({ body }) {
        return createPlan(dependencies)(body)
      }
    },

    updatePlan: {
      summary: 'Update Plan',
      description: 'Updates an existing subscription plan.',

      method: 'PATCH',
      path: '/plans/:id',

      parameters: {
        params: UpdatePlanSchema.pick({ id: true }),
        body: UpdatePlanSchema.omit({ id: true })
      },

      responses: {
        200: {
          description: 'OK',
          schema: UpdatePlanSchemaOutput
        }
      },

      execute({ params, body }) {
        return updatePlan(dependencies)({ ...params, ...body })
      }
    },

    activatePlan: {
      summary: 'Activate Plan',
      description: 'Activates a subscription plan by ID.',

      method: 'POST',
      path: '/plans/:id(.*)::activate',

      parameters: {
        params: ActivePlanSchema
      },

      responses: {
        200: {
          description: 'OK',
          schema: ActivePlanSchemaOutput
        }
      },

      execute({ params }) {
        return activePlan(dependencies)(params)
      }
    },

    deactivatePlan: {
      summary: 'Deactivate Plan',
      description: 'Deactivates a subscription plan by ID.',

      method: 'POST',
      path: '/plans/:id(.*)::deactivate',

      parameters: {
        params: InactivePlanSchema
      },

      responses: {
        200: {
          description: 'OK',
          schema: InactivePlanSchemaOutput
        }
      },

      execute({ params }) {
        return inactivePlan(dependencies)(params)
      }
    },

    deletePlan: {
      summary: 'Delete Plan',
      description: 'Deletes a subscription plan by ID.',

      method: 'DELETE',
      path: '/plans/:id',

      parameters: {
        params: DeletePlanSchema
      },

      responses: {
        204: {
          description: 'OK'
        }
      },

      async execute({ params }) {
        await deletePlan(dependencies)(params)
      }
    }
  }
})
