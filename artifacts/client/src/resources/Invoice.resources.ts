/**
 * @name Invoice
 * @description This module exposes functions
 *              related to the `/invoices` path
 *
 * @module Invoice
 **/
import {
  Invoice,
  ListInvoiceInput,
  ListInvoiceOutput,
  BatchInvoicesInput,
  BatchInvoicesOutput,
  DeleteInvoiceInput,
  DeleteInvoiceOutput,
  BatchInvoicesFileStatusEnum,
  BatchInvoicesStatusEnum
} from '@starter/schema'
import { isNumber, isBoolean } from '@starter/shared'

import client from '@/request'
import { withFields } from '@/support'
import { parseApiInvoice, ApiInvoice, ApiInvoiceUploadXMLOutput, ApiListOutput } from '@/api-mapping'

/**
 * `GET /invoices`
 * Makes a request to /invoices
 *
 * @param {Object} body The body for the request.
 * @param {Object} [body.fields] The fields.
 *
 * @returns Resolves to the result of the request or an error
 */
export const list = withFields<ListInvoiceInput, ListInvoiceOutput, Invoice>(({ storeId, delivered, limit = 10, offset = 0, ...params }) =>
  client
    .get<{}, ApiListOutput<ApiInvoice>>('/invoice/index', {
      params: {
        storeId,
        delivered: isBoolean(delivered) ? (delivered ? 1 : 0) : undefined,
        limit,
        offset,
        ...params
      }
    })
    .then((response) => {
      const items: Invoice[] = response.items.map(parseApiInvoice)

      return {
        values: items,
        offset,
        limit,
        total: response.estimatedCount
      }
    })
)

/**
 * `POST /invoices`
 * Makes a request to /invoices
 *
 * @param {Object} body The body for the request.
 * @param {Object} [body.fields] The fields.
 *
 * @returns Resolves to the result of the request or an error
 */
export const batch = withFields<BatchInvoicesInput, BatchInvoicesOutput>(({ storeId, files, fields }) => {
  const formData = new FormData()

  for (const file of files) {
    formData.append('files[]', file)
  }

  return client
    .post<{}, ApiInvoiceUploadXMLOutput>('/invoice/upload-xml', formData, {
      params: {
        storeId,
        fields
      }
    })
    .then((response) => {
      const formattedFiles: BatchInvoicesOutput['files'] = response.map((file) => ({
        filename: isNumber(file.invoice) ? `${file.invoice}.xml` : `${Object.values(file.invoice)[0]}.xml`,
        message: file.message,
        status:
          file.message === 'Nota salva com sucesso'
            ? BatchInvoicesFileStatusEnum.SAVED
            : file.message === 'Nota salva previamente no banco'
            ? BatchInvoicesFileStatusEnum.ALREADY_SAVED
            : BatchInvoicesFileStatusEnum.ERROR
      }))

      const allSucceed = formattedFiles.every((file) => file.status === BatchInvoicesFileStatusEnum.SAVED)
      const allPreviouslySucceed = formattedFiles.every((file) => file.status === BatchInvoicesFileStatusEnum.ALREADY_SAVED)
      const partialSucceed = formattedFiles.some((file) => file.status === BatchInvoicesFileStatusEnum.SAVED)
      const status = allSucceed
        ? BatchInvoicesStatusEnum.ALL_SAVED
        : allPreviouslySucceed
        ? BatchInvoicesStatusEnum.ALL_PREVIOUSLY_SAVED
        : partialSucceed
        ? BatchInvoicesStatusEnum.PARTIAL_SAVED
        : BatchInvoicesStatusEnum.NONE

      return {
        files: formattedFiles,
        status
      }
    })
})

/**
 * `DELETE /invoices/:id`
 * Makes a request to /invoices/:id
 *
 * @param {Object} body The body for the request.
 * @param {Object} [body.fields] The fields.
 *
 * @returns Resolves to the result of the request or an error
 */
export const destroy = withFields<DeleteInvoiceInput, DeleteInvoiceOutput>(({ id, fields }) =>
  client.delete('/invoice/delete', {
    params: { id, fields }
  })
)
