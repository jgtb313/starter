/**
 * @name Delivery
 * @description This module exposes functions
 *              related to the `/deliveries` path
 *
 * @module Delivery
 **/
import {
  Delivery,
  ListDeliveryInput,
  ListDeliveryOutput,
  CreateDeliveryInput,
  CreateDeliveryOutput,
  UpdateDeliveryInput,
  UpdateDeliveryOutput,
  DeleteDeliveryInput,
  DeleteDeliveryOutput
} from '@starter/schema'

import client from '@/request'
import { withFields } from '@/support'
import { parseApiDelivery, ApiDelivery, ApiListOutput } from '@/api-mapping'

/**
 * `GET /deliveries`
 * Makes a request to /deliveries
 *
 * @param {Object} body The body for the request.
 * @param {Object} [body.fields] The fields.
 *
 * @returns Resolves to the result of the request or an error
 */
export const list = withFields<ListDeliveryInput, ListDeliveryOutput, Delivery>(({ storeId, fields }) =>
  client
    .get<{}, ApiListOutput<ApiDelivery>>('/delivery/index', {
      params: {
        storeId,
        fields
      }
    })
    .then((response) => {
      const items: Delivery[] = response.items.map(parseApiDelivery)

      return {
        values: items,
        offset: 0,
        limit: 10,
        total: response.estimatedCount
      }
    })
)

/**
 * `POST /deliveries`
 * Makes a request to /deliveries
 *
 * @param {Object} body The body for the request.
 * @param {Object} [body.fields] The fields.
 *
 * @returns Resolves to the result of the request or an error
 */
export const create = withFields<CreateDeliveryInput, CreateDeliveryOutput>(({ storeId, deliveryProducts, fields }) =>
  client
    .post<{}, ApiDelivery>(
      '/delivery/create',
      {
        deliveryProducts: deliveryProducts.map((deliveryProduct) => ({
          invoiceId: deliveryProduct.invoiceId,
          invoiceProductId: deliveryProduct.invoiceProductId,
          productId: deliveryProduct.productId,
          productCode: deliveryProduct.product.code,
          productLot: deliveryProduct.lot,
          productValidity: deliveryProduct.validity,
          boxes: deliveryProduct.boxes
        }))
      },
      {
        params: { storeId, fields }
      }
    )
    .then((response) => {
      return parseApiDelivery(response)
    })
)

/**
 * `PATCH /deliveries/:id`
 * Makes a request to /deliveries/:id
 *
 * @param {Object} body The body for the request.
 * @param {Object} [body.fields] The fields.
 *
 * @returns Resolves to the result of the request or an error
 */
export const update = withFields<UpdateDeliveryInput, UpdateDeliveryOutput>(({ id, deliveryProducts, fields }) =>
  client
    .patch<{}, ApiDelivery>(
      '/delivery/update',
      {
        deliveryProducts: deliveryProducts.map((deliveryProduct) => ({
          invoiceId: deliveryProduct.invoiceId,
          invoiceProductId: deliveryProduct.invoiceId,
          productId: deliveryProduct.productId,
          productCode: deliveryProduct.product.code,
          productLot: deliveryProduct.lot,
          productValidity: deliveryProduct.validity,
          boxes: deliveryProduct.boxes
        }))
      },
      { params: { id, fields } }
    )
    .then((response) => {
      return parseApiDelivery(response)
    })
)

/**
 * `DELETE /deliveries/:id`
 * Makes a request to /deliveries/:id
 *
 * @param {Object} body The body for the request.
 * @param {Object} [body.fields] The fields.
 *
 * @returns Resolves to the result of the request or an error
 */
export const destroy = withFields<DeleteDeliveryInput, DeleteDeliveryOutput>(({ id, fields }) =>
  client.delete('/delivery/delete', {
    params: { id, fields }
  })
)
