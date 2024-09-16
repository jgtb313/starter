import {
  SubscriptionSchema,
  CreateSubscriptionSchema,
  CreateSubscriptionSchemaOutput,
  ChangeSubscriptionPlanSchema,
  ChangeSubscriptionPlanSchemaOutput,
  ChangeSubscriptionPaymentMethodSchema,
  ChangeSubscriptionPaymentMethodSchemaOutput,
  CancelSubscriptionSchema,
  CancelSubscriptionSchemaOutput
} from '@starter/schema'

import { IDependencies } from '@/core/shared/types'
import { IRouter } from '@/ports/http'

export const SubscriptionRouter = (dependencies: IDependencies): IRouter => ({
  name: 'Subscription',

  description: 'Allows users to manage their subscription to a specific plan.',

  schemas: {
    Subscription: {
      schema: SubscriptionSchema
    }
  },

  paths: {
    createSubscription: {
      summary: 'Create Subscription',
      description: 'Creates a new subscription for a user to a provided plan.',

      method: 'POST',

      path: '/subscriptions',

      parameters: {
        body: CreateSubscriptionSchema
      },

      responses: {
        201: {
          description: 'Created',
          schema: CreateSubscriptionSchemaOutput
        }
      },

      execute() {
        console.log(dependencies)
        return
      }
    },

    changeSubscriptionPlan: {
      summary: 'Change Subscription Plan',
      description: 'Updates the subscription to a new plan for the user.',

      method: 'POST',

      path: '/subscriptions/:id(.*)::change-plan',

      parameters: {
        params: ChangeSubscriptionPlanSchema.pick({ id: true }),
        body: ChangeSubscriptionPlanSchema.omit({ id: true })
      },

      responses: {
        200: {
          description: 'OK',
          schema: ChangeSubscriptionPlanSchemaOutput
        }
      },

      execute() {
        console.log(dependencies)
        return
      }
    },

    changeSubscriptionPaymentMethod: {
      summary: 'Change Subscription Payment Method',
      description: 'Updates the payment method for an existing subscription.',

      method: 'POST',

      path: '/subscriptions/:id(.*)::change-payment-method',

      parameters: {
        params: ChangeSubscriptionPaymentMethodSchema.pick({ id: true }),
        body: ChangeSubscriptionPaymentMethodSchema.omit({ id: true })
      },

      responses: {
        200: {
          description: 'OK',
          schema: ChangeSubscriptionPaymentMethodSchemaOutput
        }
      },

      execute() {
        console.log(dependencies)
        return
      }
    },

    cancelSubscription: {
      summary: 'Cancel Subscription',
      description: 'Cancels an existing subscription for the user.',

      method: 'POST',

      path: '/subscriptions/:id(.*)::cancel',

      parameters: {
        params: CancelSubscriptionSchema
      },

      responses: {
        200: {
          description: 'OK',
          schema: CancelSubscriptionSchemaOutput
        }
      },

      execute() {
        console.log(dependencies)
        return
      }
    }
  }
})
