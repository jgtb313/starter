/**
 * @name Plan
 * @description This module exposes functions
 *              related to the `/plans` path
 *
 * @module Plan
 **/
import { GetPlanByIdInput, GetPlanByIdOutput } from '@starter/schema'

import client from '@/request'
import { withFields } from '@/support'
import { parseApiPlan, ApiPlan } from '@/api-mapping'

/**
 * `GET /plans/:id`
 * Makes a request to /plans/:id
 *
 * @param {Object} body The body for the request.
 * @param {Object} [body.fields] The fields.
 *
 * @returns Resolves to the result of the request or an error
 */
export const getById = withFields<GetPlanByIdInput, GetPlanByIdOutput>(({ id, ...params }) =>
  client
    .get<{}, ApiPlan>(`/checkout/plan?id=${id}`, {
      params
    })
    .then((response) => {
      return parseApiPlan(response)
    })
)
