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

/**
 * `GET /roles`
 * Makes a request to /roles
 *
 * @param {Object} body The body for the request.
 * @param {Object} [body.fields] The fields.
 *
 * @returns Resolves to the result of the request or an error
 */
export const list = withFields<IndexRoleInput, IndexRoleOutput, Role>((params) =>
  client.get('/roles', {
    params
  })
)
