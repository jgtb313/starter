import {
  DeliverySchema,
  DeliveryProductSchema,
  ListDeliverySchema,
  ListDeliverySchemaOutput,
  GetDeliverySchema,
  GetDeliverySchemaOutput,
  CreateDeliverySchema,
  CreateDeliverySchemaOutput,
  UpdateDeliverySchema,
  UpdateDeliverySchemaOutput,
  DeleteDeliverySchema
} from '@starter/schema'

import { IDependencies } from '@/core/shared/types'
import { IRouter } from '@/ports/http'

export const DeliveryRouter = (dependencies: IDependencies): IRouter => ({
  name: 'Deliveries',

  description: 'Deliveries Description',

  schemas: {
    Delivery: {
      schema: DeliverySchema
    },
    DeliveryProduct: {
      schema: DeliveryProductSchema
    }
  },

  paths: {
    listDelivery: {
      summary: 'List Deliveries',
      description: 'Return a pageable list of deliveries.',

      method: 'GET',

      path: '/stores/:storeId/deliveries',

      parameters: {
        params: ListDeliverySchema.pick({ storeId: true }),
        query: ListDeliverySchema.omit({ storeId: true })
      },

      responses: {
        200: { schema: ListDeliverySchemaOutput, description: '200' }
      },

      execute({ body }) {
        return {}
      }
    },

    getDelivery: {
      summary: 'Get Delivery',
      description: 'Returns a delivery.',

      method: 'GET',

      path: '/stores/:storeId/deliveries/:id',

      parameters: {
        params: GetDeliverySchema
      },

      responses: {
        200: { schema: GetDeliverySchemaOutput, description: '200' }
      },

      execute({ body }) {
        return {}
      }
    },

    createDelivery: {
      summary: 'Create Delivery',
      description: 'Create Delivery.',

      method: 'POST',

      path: '/stores/:storeId/deliveries',

      parameters: {
        params: CreateDeliverySchema.pick({ storeId: true }),
        body: CreateDeliverySchema.omit({ storeId: true })
      },

      responses: {
        201: {
          schema: CreateDeliverySchemaOutput,
          description: '201'
        }
      },

      execute({ body }) {
        return {}
      }
    },

    updateDelivery: {
      summary: 'Update Delivery',
      description: 'Update Delivery.',

      method: 'PATCH',

      path: '/stores/:storeid/deliveries/:id',

      parameters: {
        params: UpdateDeliverySchema.pick({ storeId: true, id: true }),
        body: UpdateDeliverySchema.omit({ storeId: true, id: true })
      },

      responses: {
        200: {
          schema: UpdateDeliverySchemaOutput,
          description: '200'
        }
      },

      execute({ body }) {
        return {}
      }
    },

    deleteDelivery: {
      summary: 'Delete Delivery',
      description: 'Delete Delivery.',

      method: 'DELETE',

      path: '/stores/:storeId/deliveries/:id',

      parameters: {
        params: DeleteDeliverySchema
      },

      responses: {
        204: {
          description: '204'
        }
      },

      execute({ params }) {
        return {}
      }
    }
  }
})
