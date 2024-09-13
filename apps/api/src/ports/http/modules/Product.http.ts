import { IndexProductSchema, IndexProductSchemaOutput, ProductSchema } from '@starter/schema'

import { IDependencies } from '@/core/shared/types'
import { IRouter } from '@/ports/http'

export const ProductRouter = (dependencies: IDependencies): IRouter => ({
  name: 'Products',

  description: 'Products Description.',

  schemas: {
    Product: {
      schema: ProductSchema
    }
  },

  paths: {
    listProducts: {
      summary: 'List Products',
      description: 'List Products.',

      method: 'GET',

      path: '/products::index',

      parameters: {
        query: IndexProductSchema
      },

      responses: {
        200: {
          schema: IndexProductSchemaOutput,
          description: '200'
        }
      },

      execute() {
        return {}
      }
    }
  }
})
