import {
  StoreSchema,
  ListStoreSchema,
  ListStoreSchemaOutput,
  GetStoreSchema,
  GetStoreSchemaOutput,
  CreateStoreSchema,
  CreateStoreSchemaOutput,
  UpdateStoreSchema,
  UpdateStoreSchemaOutput,
  DeleteStoreSchema,
  PaginationSchemaTransform
} from '@starter/schema'

import { IDependencies } from '@/core/shared/types'
import { listStore } from '@/core/store/use-cases/list-store'
import { getStore } from '@/core/store/use-cases/get-store'
import { createStore } from '@/core/store/use-cases/create-store'
import { updateStore } from '@/core/store/use-cases/update-store'
import { deleteStore } from '@/core/store/use-cases/delete-store'
import { IRouter } from '@/ports/http'

export const StoreRouter = (dependencies: IDependencies): IRouter => ({
  name: 'Stores',

  description: 'Stores Description',

  schemas: {
    Store: {
      schema: StoreSchema
    }
  },

  paths: {
    listStore: {
      summary: 'List Stores',
      description: 'Return a pageable list of stores.',

      method: 'GET',

      path: '/stores',

      parameters: {
        query: ListStoreSchema
      },

      responses: {
        200: { schema: ListStoreSchemaOutput, description: '200' }
      },

      execute({ query }) {
        const paginaton = PaginationSchemaTransform.parse(query)

        return listStore(dependencies)({ ...query, ...paginaton })
      }
    },

    getStore: {
      summary: 'Get Store',
      description: 'Returns a store.',

      method: 'GET',

      path: '/stores/:id',

      parameters: {
        params: GetStoreSchema
      },

      responses: {
        200: { schema: GetStoreSchemaOutput, description: '200' }
      },

      execute({ params }) {
        return getStore(dependencies)(params)
      }
    },

    createStore: {
      summary: 'Create Store',
      description: 'Creates a store.',

      method: 'POST',

      path: '/stores',

      parameters: {
        body: CreateStoreSchema
      },

      responses: {
        201: {
          schema: CreateStoreSchemaOutput,
          description: '201'
        }
      },

      execute({ body }) {
        return createStore(dependencies)(body)
      }
    },

    updateStore: {
      summary: 'Update Store',
      description: 'Updates a store.',

      method: 'PATCH',

      path: '/stores/:id',

      parameters: {
        params: UpdateStoreSchema.pick({ id: true }),
        body: UpdateStoreSchema.omit({ id: true })
      },

      responses: {
        200: {
          schema: UpdateStoreSchemaOutput,
          description: '200'
        }
      },

      execute({ params, body }) {
        return updateStore(dependencies)({ ...params, ...body })
      }
    },

    deleteStore: {
      summary: 'Delete Store',
      description: 'Deletes a store.',

      method: 'DELETE',

      path: '/stores/:id',

      parameters: {
        params: DeleteStoreSchema
      },

      responses: {
        204: {
          description: '204'
        }
      },

      execute({ params }) {
        return deleteStore(dependencies)(params)
      }
    }
  }
})
