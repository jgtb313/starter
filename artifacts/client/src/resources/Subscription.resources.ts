/**
 * @name Subscription
 * @description This module exposes functions
 *              related to the `/subscriptions` path
 *
 * @module Subscription
 **/
import { CreateSubscriptionInput, CreateSubscriptionOutput } from '@starter/schema'

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

export const create = withFields<CreateSubscriptionInput, CreateSubscriptionOutput>(({ fields, ...input }) =>
  client.post('/subscriptions', input, {
    params: { fields }
  })
)
