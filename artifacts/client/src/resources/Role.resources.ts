/**
 * @name Role
 * @description This module exposes functions
 *              related to the `/roles` path
 *
 * @module Role
 **/
import { Role, IndexRoleInput, IndexRoleOutput } from '@starter/schema'

import client from '@/request'
import { withFields } from '@/support'
import { parseApiRole, ApiRole } from '@/api-mapping'

/**
 * `GET /roles/index`
 * Makes a request to /roles/index
 *
 * @param {Object} body The body for the request.
 * @param {Object} [body.fields] The fields.
 *
 * @returns Resolves to the result of the request or an error
 */
export const index = withFields<IndexRoleInput, IndexRoleOutput, Role>((params) =>
  client
    .get<{}, ApiRole[]>('/user/roles', {
      params
    })
    .then((response) => {
      return response.map(parseApiRole)
    })
)
