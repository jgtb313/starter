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
import { parseApiStore, ApiStore, ApiListOutput } from '@/api-mapping'

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
  client
    .get<{}, ApiListOutput<ApiStore>>('/store/index', {
      params
    })
    .then((response) => {
      const items: Store[] = response.items.map(parseApiStore)

      return {
        values: items,
        offset: 0,
        limit: 10,
        total: response.estimatedCount
      }
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
export const create = withFields<CreateStoreInput, CreateStoreOutput>(({ fields, rcky, document, ...input }) =>
  client
    .post<{}, ApiStore>(
      '/store/create',
      {
        ...input,
        rcky: Number(rcky),
        cnpj: document.number
      },
      {
        params: { fields }
      }
    )
    .then((response) => {
      return parseApiStore(response)
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
export const update = withFields<UpdateStoreInput, UpdateStoreOutput>(({ id, rcky, document, fields, ...input }) =>
  client
    .patch<{}, ApiStore>(
      '/store/update',
      {
        ...input,
        rcky: rcky ? Number(rcky) : undefined,
        cnpj: document?.number
      },
      { params: { id, fields } }
    )
    .then((response) => {
      return parseApiStore(response)
    })
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
  client.delete('store/delete', {
    params: { id, fields }
  })
)
