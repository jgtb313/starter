import {
  InvoiceSchema,
  ListInvoiceSchema,
  ListInvoiceSchemaOutput,
  BatchInvoicesSchema,
  BatchInvoicesSchemaOutput,
  InvoiceProductSchema,
  DeleteInvoiceSchema
} from '@starter/schema'

import { IDependencies } from '@/core/shared/types'
import { IRouter } from '@/ports/http'

export const InvoiceRouter = (dependencies: IDependencies): IRouter => ({
  name: 'Invoices',

  description: 'Invoices Description.',

  schemas: {
    Invoice: {
      schema: InvoiceSchema
    },
    InvoiceProduct: {
      schema: InvoiceProductSchema
    }
  },

  paths: {
    listInvoices: {
      summary: 'List Invoices',
      description: 'Return a pageable list of invoices.',

      method: 'GET',

      path: '/stores/:storeId/invoices',

      parameters: {
        query: ListInvoiceSchema.omit({ storeId: true }),
        params: ListInvoiceSchema.pick({ storeId: true })
      },

      responses: {
        200: {
          schema: ListInvoiceSchemaOutput,
          description: '200'
        }
      },

      execute({ body }) {
        return {}
      }
    },

    uploadInvoices: {
      summary: 'Upload Invoices',
      description: 'Uploads multiple invoices in XML format.',

      method: 'POST',

      path: '/stores/:storeId/invoices',

      parameters: {
        params: BatchInvoicesSchema.pick({ storeId: true }),
        body: BatchInvoicesSchema.omit({ storeId: true }),

        bodyOptions: {
          contentType: 'multipart/form-data'
        }
      },

      responses: {
        200: {
          schema: BatchInvoicesSchemaOutput,
          description: '200'
        }
      },

      execute({ body }) {
        return {}
      }
    },

    deleteInvoice: {
      summary: 'Delete Invoice',
      description: 'Deletes an invoice if it has not been delivered yet.',

      method: 'DELETE',

      path: '/stores/:storeId/invoices/:id',

      parameters: {
        params: DeleteInvoiceSchema
      },

      responses: {
        204: {
          description: '204'
        }
      },

      execute({ body }) {
        return {}
      }
    }
  }
})
