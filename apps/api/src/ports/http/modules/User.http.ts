import {
  z,
  UserSchema,
  GetUserSchemaOutput,
  UpdateUserEmailSchema,
  UpdateUserPhoneSchema,
  UpdateUserPasswordSchema,
  OTPVerificationSchema,
  OTPContextEnum,
} from '@starter/schema'

import { IDependencies } from '@/core/shared/types'
import { validateOTP } from '@/core/otp/use-cases/validate-otp.use-case'
import { updateUserPassword } from '@/core/user/use-case/update-user-password.use-case'
import { updateUserEmail } from '@/core/user/use-case/update-user-email.use-case'
import { updateUserPhone } from '@/core/user/use-case/update-user-phone.use-case'
import { userPasswordVerification } from '@/core/user/use-case/user-password-verification.use-case'
import { requiresAuthorization, IRouter } from '@/ports/http'

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
        body: UpdateUserEmailSchema.omit({ id: true }).merge(z.object({ otpVerification: OTPVerificationSchema })),
      },

      responses: {
        200: { description: 'OK' },
      },

      async execute({ body }, context) {
        requiresAuthorization(context)

        await validateOTP(dependencies)({ ...body.otpVerification, context: OTPContextEnum.UPDATE_EMAIL, recipient: body.email })

        await updateUserEmail(dependencies)({ id: context.auth.userId, email: body.email })

        return
      },
    },

    updateUserProfilePhone: {
      summary: 'Update User Profile Phone',
      description: 'Returns a user profile.',

      method: 'PATCH',

      path: '/users::me::phone',

      parameters: {
        body: UpdateUserPhoneSchema.omit({ id: true }).merge(z.object({ otpVerification: OTPVerificationSchema })),
      },

      responses: {
        200: { schema: GetUserSchemaOutput, description: '200' },
      },

      async execute({ body }, context) {
        requiresAuthorization(context)

        const recipient = `${body.phone.ddi}${body.phone.number}`

        await validateOTP(dependencies)({ ...body.otpVerification, context: OTPContextEnum.UPDATE_EMAIL, recipient })

        await updateUserPhone(dependencies)({ id: context.auth.userId, phone: body.phone })

        return
      },
    },

    updateUserProfilePassword: {
      summary: 'Update User Profile Password',
      description: 'Returns a user profile.',

      method: 'PATCH',

      path: '/users::me::password',

      parameters: {
        body: UpdateUserPasswordSchema.omit({ id: true }),
      },

      responses: {
        200: { description: 'Ok' },
      },

      async execute({ body }, context) {
        requiresAuthorization(context)

        await userPasswordVerification(dependencies)({ id: context.auth.userId, password: body.currentPassword })

        await updateUserPassword(dependencies)({ id: context.auth.userId, ...body })

        return
      },
    },
  },
})
