import { UseGuards } from '@nestjs/common'
import { Controller, Route, Request } from '@starter/nestjs-server-hoisting'
import { SubscriptionService, SubscriptionSchema, User } from '@starter/domain'

import { AuthGuard } from '@/support/guards'
import { ACLService } from '@/support/access-control'
import { AuthenticatedUser } from '@/support/decorators'
import {
  GetSubscriptionSchema,
  CreateSubscriptionSchema,
  ChangeSubscriptionPlanSchema,
  ChangeSubscriptionPaymentMethodSchema,
  CancelSubscriptionSchema,
  GetSubscriptionRequest,
  CreateSubscriptionRequest,
  ChangeSubscriptionPlanRequest,
  ChangeSubscriptionPaymentMethodRequest,
  CancelSubscriptionRequest,
} from '@/core/subscription/subscription.controller.schema'

@Controller({
  name: 'Subscription',

  description: 'Handles operations for managing and retrieving subscriptions.',

  basePath: 'workspaces/:workspaceId/subscriptions',

  schemas: {
    Subscription: {
      schema: SubscriptionSchema,
    },
  },
})
@UseGuards(AuthGuard)
export class SubscriptionController {
  constructor(
    private readonly aclService: ACLService,
    private readonly subscriptionService: SubscriptionService,
  ) {}

  @Route({
    summary: 'Get Subscription',

    description: 'Retrieves a current subscription.',

    method: 'GET',
    path: '/:subscriptionId',

    parameters: {
      params: GetSubscriptionSchema.params,
    },

    responses: {
      200: {
        schema: GetSubscriptionSchema.output,
      },
    },
  })
  getSubscription(@AuthenticatedUser() user: User, @Request() { params }: GetSubscriptionRequest) {
    this.aclService.canPerformActionByPermission(user, 'subscription:read', {
      workspaceId: params.workspaceId,
    })

    return this.subscriptionService.getSubscription(params)
  }

  @Route({
    summary: 'Create Subscription',

    description: 'Creates a new subscription.',

    method: 'POST',

    parameters: {
      params: CreateSubscriptionSchema.params,
      body: CreateSubscriptionSchema.body,
    },

    responses: {
      200: {
        schema: CreateSubscriptionSchema.output,
      },
    },
  })
  createSubscription(@AuthenticatedUser() user: User, @Request() { params, body }: CreateSubscriptionRequest) {
    this.aclService.canPerformActionByPermission(user, 'subscription:create', {
      workspaceId: params.workspaceId,
    })

    return this.subscriptionService.createSubscription({
      ...params,
      ...body,
      ...({} as any),
    })
  }

  @Route({
    summary: 'Change Subscription Plan',

    description: 'Updates plan of an existing subscription by its ID.',

    method: 'POST',
    path: '/:subscriptionId/plan',

    parameters: {
      params: ChangeSubscriptionPlanSchema.params,
      body: ChangeSubscriptionPlanSchema.body,
    },

    responses: {
      200: {
        schema: ChangeSubscriptionPlanSchema.output,
      },
    },
  })
  changeSubscriptionPlan(@AuthenticatedUser() user: User, @Request() { params, body }: ChangeSubscriptionPlanRequest) {
    this.aclService.canPerformActionByPermission(user, 'subscription:update:plan', {
      workspaceId: params.workspaceId,
    })

    return this.subscriptionService.changeSubscriptionPlan()
  }

  @Route({
    summary: 'Change Subscription Payment Method',

    description: 'Updates payment method of an existing subscription by its ID.',

    method: 'POST',
    path: '/:subscriptionId/payment-method',

    parameters: {
      params: ChangeSubscriptionPaymentMethodSchema.params,
      body: ChangeSubscriptionPaymentMethodSchema.body,
    },

    responses: {
      200: {
        schema: ChangeSubscriptionPaymentMethodSchema.output,
      },
    },
  })
  changeSubscriptionPaymentMethod(@AuthenticatedUser() user: User, @Request() { params }: ChangeSubscriptionPaymentMethodRequest) {
    this.aclService.canPerformActionByPermission(user, 'subscription:update:payment-method', {
      workspaceId: params.workspaceId,
    })

    return this.subscriptionService.changeSubscriptionPaymentMethod()
  }

  @Route({
    summary: 'Cancel Subscription',

    description: 'Cancels an existing subscription by its ID.',

    method: 'DELETE',
    path: '/:subscriptionId',

    parameters: {
      params: CancelSubscriptionSchema.params,
    },

    responses: {
      200: {
        schema: CancelSubscriptionSchema.output,
      },
    },
  })
  cancelSubscription(@AuthenticatedUser() user: User, @Request() { params }: CancelSubscriptionRequest) {
    this.aclService.canPerformActionByPermission(user, 'subscription:delete', {
      workspaceId: params.workspaceId,
    })

    return this.subscriptionService.cancelSubscription()
  }
}
