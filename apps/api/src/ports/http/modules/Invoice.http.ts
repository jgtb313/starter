import { InvoiceSchema, ListInvoicesSchema, ListInvoicesSchemaOutput } from '@starter/schema'

import { IDependencies } from '@/core/shared/types'
import { IRouter } from '@/ports/http'

export const InvoiceRouter = (dependencies: IDependencies): IRouter => ({
  name: 'Invoice',

  description: '',

  schemas: {
    Invoice: {
      schema: InvoiceSchema
    }
  },

  paths: {
    listInvoice: {
      summary: 'List Invoices',
      description: 'Retrieves a pageable list of invoices.',

      method: 'GET',

      path: '/invoices',

      parameters: {
        query: ListInvoicesSchema
      },

      responses: {
        200: {
          description: 'OK',
          schema: ListInvoicesSchemaOutput
        }
      },

      async execute() {
        console.log(dependencies)
        return
      }
    }
  }
})
