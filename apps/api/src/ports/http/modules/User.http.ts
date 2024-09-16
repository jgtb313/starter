import { UserSchema, GetUserSchemaOutput } from '@starter/schema'

import { IDependencies } from '@/core/shared/types'
import { IRouter } from '@/ports/http'

export const UserRouter = (dependencies: IDependencies): IRouter => ({
  name: 'Users',

  description: '',

  schemas: {
    User: {
      schema: UserSchema
    }
  },

  paths: {
    getProfile: {
      summary: 'Get User Profile',
      description: 'Returns a user profile.',

      method: 'GET',

      path: '/users::me',

      parameters: {},

      responses: {
        200: { description: 'OK' }
      },

      execute() {
        console.log(dependencies)
        return
      }
    },

    updateProfile: {
      summary: 'Update User Profile',
      description: 'Returns a user profile.',

      method: 'PATCH',

      path: '/users::me',

      parameters: {},

      responses: {
        200: { description: 'OK' }
      },

      execute() {
        console.log(dependencies)
        return
      }
    },

    updateUserProfileEmail: {
      summary: 'Update User Profile Email',
      description: 'Returns a user profile.',

      method: 'PATCH',

      path: '/users::me::email',

      parameters: {},

      responses: {
        200: { schema: GetUserSchemaOutput, description: '200' }
      },

      execute() {
        console.log(dependencies)
        return
      }
    },

    updateUserProfilePhone: {
      summary: 'Update User Profile Phone',
      description: 'Returns a user profile.',

      method: 'PATCH',

      path: '/users::me::phone',

      parameters: {},

      responses: {
        200: { schema: GetUserSchemaOutput, description: '200' }
      },

      execute() {
        console.log(dependencies)
        return
      }
    },

    updateUserProfilePassword: {
      summary: 'Update User Profile Password',
      description: 'Returns a user profile.',

      method: 'PATCH',

      path: '/users::me::password',

      parameters: {},

      responses: {
        200: { schema: GetUserSchemaOutput, description: '200' }
      },

      execute() {
        console.log(dependencies)
        return
      }
    }
  }
})
