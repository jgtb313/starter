/**
 * @name Subscription
 * @description This module exposes functions
 *              related to the `/subscriptions` path
 *
 * @module Subscription
 **/
import { CreateSubscriptionInput, CreateSubscriptionOutput, SubscriptionPaymentMethodEnum } from '@starter/schema'

import client from '@/request'
import { withFields } from '@/support'

/**
 * `POST /subscriptions`
 * Makes a request to /subscriptions
 *
 * @param {Object} body The body for the request.
 * @param {Object} [body.fields] The fields.
 *
 * @returns Resolves to the result of the request or an error
 */

export const create = withFields<CreateSubscriptionInput, CreateSubscriptionOutput>(({ planId, customer, paymentMethod, cardToken, fields }) =>
  client.post(
    '/checkout/payment',
    {
      planId,

      name: customer.name,
      email: customer.email,
      cpf_cnpj: customer.document.number.replace(/[.-]/g, ''),

      method: paymentMethod,

      token: paymentMethod === SubscriptionPaymentMethodEnum.CREDIT_CARD ? cardToken : undefined
    },
    {
      params: { fields }
    }
  )
)
