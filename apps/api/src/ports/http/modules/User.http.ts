import {
  UserSchema,
  ListUserSchema,
  ListUserSchemaOutput,
  GetUserSchema,
  GetUserSchemaOutput,
  CreateUserSchema,
  CreateUserSchemaOutput,
  UpdateUserSchema,
  UpdateUserSchemaOutput,
  DeleteStoreSchema
} from '@starter/schema'

import { IDependencies } from '@/core/shared/types'
import { createUser } from '@/core/user/use-cases/create-user'
import { IRouter } from '@/ports/http'

export const UserRouter = (dependencies: IDependencies): IRouter => ({
  name: 'Users',

  description: 'Users Description',

  schemas: {
    User: {
      schema: UserSchema
    }
  },

  paths: {
    listUser: {
      summary: 'List Users',
      description: 'Return a pageable list of users.',

      method: 'GET',

      path: '/users',

      parameters: {
        query: ListUserSchema
      },

      responses: {
        200: { schema: ListUserSchemaOutput, description: '200' }
      },

      execute({ body }) {
        return {}
      }
    },

    getUser: {
      summary: 'Get User',
      description: 'Returns a user.',

      method: 'GET',

      path: '/users/:id',

      parameters: {
        params: GetUserSchema
      },

      responses: {
        200: { schema: GetUserSchemaOutput, description: '200' }
      },

      execute({ body }) {
        return {}
      }
    },

    getProfile: {
      summary: 'Get User Profile',
      description: 'Returns a user profile.',

      method: 'GET',

      path: '/users::me',

      parameters: {},

      responses: {
        200: { schema: GetUserSchemaOutput, description: '200' }
      },

      execute({ body }) {
        return {}
      }
    },

    createUser: {
      summary: 'Create User',
      description: 'Creates a user.',

      method: 'POST',

      path: '/users',

      parameters: {
        body: CreateUserSchema
      },

      responses: {
        201: {
          schema: CreateUserSchemaOutput,
          description: '201'
        }
      },

      execute({ body }) {
        return createUser(dependencies)(body)
      }
    },

    updateUser: {
      summary: 'Update User',
      description: 'Updates a user.',

      method: 'PATCH',

      path: '/users/:id',

      parameters: {
        params: UpdateUserSchema.pick({ id: true }),
        body: UpdateUserSchema.omit({ id: true })
      },

      responses: {
        200: {
          schema: UpdateUserSchemaOutput,
          description: '200'
        }
      },

      execute({ body }) {
        return {}
      }
    },

    updateUserPassword: {
      summary: 'Update User Password',
      description: 'Updates a user password.',

      method: 'PATCH',

      path: '/users/:id(.*)::password',

      parameters: {
        params: UpdateUserSchema.pick({ id: true }),
        body: UpdateUserSchema.omit({ id: true })
      },

      responses: {
        200: {
          schema: UpdateUserSchemaOutput,
          description: '200'
        }
      },

      execute({ body }) {
        return {}
      }
    },

    updateProfile: {
      summary: 'Update User Profile',
      description: 'Returns a user profile.',

      method: 'PATCH',

      path: '/users::me',

      parameters: {},

      responses: {
        200: { schema: GetUserSchemaOutput, description: '200' }
      },

      execute({ body }) {
        return {}
      }
    },

    updateProfilePassword: {
      summary: 'Update User Profile Password',
      description: 'Returns a user profile.',

      method: 'PATCH',

      path: '/users::me::password',

      parameters: {},

      responses: {
        200: { schema: GetUserSchemaOutput, description: '200' }
      },

      execute({ body }) {
        return {}
      }
    },

    deleteUser: {
      summary: 'Delete User',
      description: 'Deletes a user.',

      method: 'DELETE',

      path: '/users/:id',

      parameters: {
        params: DeleteStoreSchema
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
