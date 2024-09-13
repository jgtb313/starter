/**
 * @name Product
 * @description This module exposes functions
 *              related to the `/products` path
 *
 * @module Product
 **/
import { Product, IndexProductInput, IndexProductOutput } from '@starter/schema'

import client from '@/request'
import { withFields } from '@/support'
import { parseApiProduct, ApiProduct } from '@/api-mapping'

/**
 * `GET /products/index`
 * Makes a request to /products/index
 *
 * @param {Object} body The body for the request.
 * @param {Object} [body.fields] The fields.
 *
 * @returns Resolves to the result of the request or an error
 */
export const index = withFields<IndexProductInput, IndexProductOutput, Product>((params) =>
  client
    .get<{}, ApiProduct[]>('/invoice/products', {
      params
    })
    .then((response) => {
      return response.map(parseApiProduct)
    })
)
