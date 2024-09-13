/**
 * @name Inventory
 * @description This module exposes functions
 *              related to the `/inventories` path
 *
 * @module Inventory
 **/
import {
  Inventory,
  ListInventoryInput,
  ListInventoryOutput,
  CreateInventoryInput,
  CreateInventoryOutput,
  UpdateInventoryInput,
  UpdateInventoryOutput,
  DeleteInventoryInput,
  DeleteInventoryOutput
} from '@starter/schema'

import client from '@/request'
import { withFields } from '@/support'
import { parseApiInventory, ApiInventory, ApiListOutput } from '@/api-mapping'

/**
 * `GET /inventories`
 * Makes a request to /inventories
 *
 * @param {Object} body The body for the request.
 * @param {Object} [body.fields] The fields.
 *
 * @returns Resolves to the result of the request or an error
 */
export const list = withFields<ListInventoryInput, ListInventoryOutput, Inventory>(({ storeId, fields }) =>
  client
    .get<{}, ApiListOutput<ApiInventory>>('/inventory/index', {
      params: {
        storeId,
        fields
      }
    })
    .then((response) => {
      const items: Inventory[] = response.items.map(parseApiInventory)

      return {
        values: items,
        offset: 0,
        limit: 10,
        total: response.estimatedCount
      }
    })
)

/**
 * `POST /inventories`
 * Makes a request to /inventories
 *
 * @param {Object} body The body for the request.
 * @param {Object} [body.fields] The fields.
 *
 * @returns Resolves to the result of the request or an error
 */
export const create = withFields<CreateInventoryInput, CreateInventoryOutput>(({ storeId, fields }) =>
  client
    .post<{}, ApiInventory>(
      `/inventory/create?storeId=${storeId}`,
      {},
      {
        params: { storeId, fields }
      }
    )
    .then((response) => {
      return parseApiInventory(response)
    })
)

/**
 * `PATCH /inventories/:id`
 * Makes a request to /inventories/:id
 *
 * @param {Object} body The body for the request.
 * @param {Object} [body.fields] The fields.
 *
 * @returns Resolves to the result of the request or an error
 */
export const update = withFields<UpdateInventoryInput, UpdateInventoryOutput>(({ id, fields }) =>
  client.patch<{}, ApiInventory>(`/inventory/update?id=${id}`, {}, { params: { id, fields } }).then((response) => {
    return parseApiInventory(response)
  })
)

/**
 * `DELETE /inventories/:id`
 * Makes a request to /inventories/:id
 *
 * @param {Object} body The body for the request.
 * @param {Object} [body.fields] The fields.
 *
 * @returns Resolves to the result of the request or an error
 */
export const destroy = withFields<DeleteInventoryInput, DeleteInventoryOutput>(({ id, fields }) =>
  client.delete(`/inventory/delete?id=${id}`, {
    params: { id, fields }
  })
)
