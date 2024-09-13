/**
 * @name Store
 * @description This module exposes functions
 *              related to the `/stores` path
 *
 * @module Store
 **/
import {
  Store,
  ListStoreInput,
  ListStoreOutput,
  CreateStoreInput,
  CreateStoreOutput,
  UpdateStoreInput,
  UpdateStoreOutput,
  DeleteStoreInput,
  DeleteStoreOutput
} from '@starter/schema'

import client from '@/request'
import { withFields } from '@/support'

/**
 * `GET /stores`
 * Makes a request to /stores
 *
 * @param {Object} body The body for the request.
 * @param {Object} [body.fields] The fields.
 *
 * @returns Resolves to the result of the request or an error
 */
export const list = withFields<ListStoreInput, ListStoreOutput, Store>((params) =>
  client.get('/stores', {
    params
  })
)

/**
 * `POST /stores`
 * Makes a request to /stores
 *
 * @param {Object} body The body for the request.
 * @param {Object} [body.fields] The fields.
 *
 * @returns Resolves to the result of the request or an error
 */
export const create = withFields<CreateStoreInput, CreateStoreOutput>(({ fields, ...input }) =>
  client.post('/stores', input, {
    params: { fields }
  })
)

/**
 * `PATCH /stores/:id`
 * Makes a request to /stores/:id
 *
 * @param {Object} body The body for the request.
 * @param {Object} [body.fields] The fields.
 *
 * @returns Resolves to the result of the request or an error
 */
export const update = withFields<UpdateStoreInput, UpdateStoreOutput>(({ id, fields, ...input }) =>
  client.patch(`/stores/${id}`, input, { params: { fields } })
)

/**
 * `DELETE /stores/:id`
 * Makes a request to /stores/:id
 *
 * @param {Object} body The body for the request.
 * @param {Object} [body.fields] The fields.
 *
 * @returns Resolves to the result of the request or an error
 */
export const destroy = withFields<DeleteStoreInput, DeleteStoreOutput>(({ id, fields }) =>
  client.delete(`stores/${id}`, {
    params: { fields }
  })
)
