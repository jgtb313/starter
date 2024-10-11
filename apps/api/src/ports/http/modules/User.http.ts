import { UserSchema, GetUserSchemaOutput, UpdateUserEmailSchema, OTPContextEnum } from '@starter/schema'

import { IDependencies } from '@/core/shared/types'
import { validateOTP } from '@/core/otp/use-cases/validate-otp.use-case'
import { IRouter } from '@/ports/http'

export const UserRouter = (dependencies: IDependencies): IRouter => ({
  name: 'User',

  description: 'Handles operations related to managing and retrieving users.',

  schemas: {
    User: {
      schema: UserSchema,
    },
  },

  paths: {
    getProfile: {
      summary: 'Get User Profile',
      description: 'Returns a user profile.',

      method: 'GET',

      path: '/users::me',

      parameters: {},

      responses: {
        200: { description: 'OK' },
      },

      execute() {
        console.log(dependencies)
        return
      },
    },

    updateProfile: {
      summary: 'Update User Profile',
      description: 'Returns a user profile.',

      method: 'PATCH',

      path: '/users::me',

      parameters: {},

      responses: {
        200: { description: 'OK' },
      },

      execute() {
        console.log(dependencies)
        return
      },
    },

    updateUserProfileEmail: {
      summary: 'Update User Profile Email',
      description: 'Returns a user profile.',

      method: 'PATCH',

      path: '/users::me::email',

      parameters: {
        body: UpdateUserEmailSchema.omit({ id: true }),
      },

      responses: {
        200: { description: 'OK' },
      },

      async execute({ body }) {
        await validateOTP(dependencies)({ ...body.otpVerification, context: OTPContextEnum.UPDATE_EMAIL, recipient: body.email })

        return
      },
    },

    updateUserProfilePhone: {
      summary: 'Update User Profile Phone',
      description: 'Returns a user profile.',

      method: 'PATCH',

      path: '/users::me::phone',

      parameters: {},

      responses: {
        200: { schema: GetUserSchemaOutput, description: '200' },
      },

      execute() {
        console.log(dependencies)
        return
      },
    },

    updateUserProfilePassword: {
      summary: 'Update User Profile Password',
      description: 'Returns a user profile.',

      method: 'PATCH',

      path: '/users::me::password',

      parameters: {},

      responses: {
        200: { schema: GetUserSchemaOutput, description: '200' },
      },

      execute() {
        console.log(dependencies)
        return
      },
    },
  },
})
