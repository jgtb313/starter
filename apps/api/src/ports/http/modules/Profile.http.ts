import {
  z,
  GetUserSchemaOutput,
  UpdateUserSchema,
  UpdateUserSchemaOutput,
  UpdateUserEmailSchema,
  UpdateUserPhoneSchema,
  UpdateUserPasswordSchema,
  OTPVerificationSchema,
  OTPContextEnum,
} from '@starter/schema'

import { IDependencies } from '@/support/types'
import { validateOTP } from '@/core/otp/use-cases/validate-otp.use-case'
import { getUser } from '@/core/user/use-case/get-user.use-case'
import { updateUser } from '@/core/user/use-case/update-user.use-case'
import { updateUserPassword } from '@/core/user/use-case/update-user-password.use-case'
import { updateUserEmail } from '@/core/user/use-case/update-user-email.use-case'
import { updateUserPhone } from '@/core/user/use-case/update-user-phone.use-case'
import { userPasswordVerification } from '@/core/user/use-case/user-password-verification.use-case'
import { requiresAuthorization, IRouter } from '@/ports/http'

export const ProfileRouter = (dependencies: IDependencies): IRouter => ({
  name: 'Profile',

  description: 'Handles operations for managing and retrieving the authenticated user.',

  schemas: {},

  paths: {
    getProfile: {
      summary: 'Get User Profile',
      description: 'Retrieves the authenticated user profile.',

      method: 'GET',

      path: '/users::me',

      parameters: {},

      responses: {
        200: { description: 'OK', schema: GetUserSchemaOutput },
      },

      execute(_, context) {
        requiresAuthorization(context)

        return getUser(dependencies)({ id: context.auth.userId })
      },
    },

    updateProfile: {
      summary: 'Update User Profile',
      description: 'Updates and returns the user profile.',

      method: 'PATCH',

      path: '/users::me',

      parameters: {
        body: UpdateUserSchema.omit({ id: true }),
      },

      responses: {
        200: { description: 'OK', schema: UpdateUserSchemaOutput },
      },

      execute({ body }, context) {
        requiresAuthorization(context)

        return updateUser(dependencies)({ ...body, id: context.auth.userId })
      },
    },

    updateUserProfileEmail: {
      summary: 'Update User Profile Email',
      description: 'Updates the user email.',

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
      description: 'Updates the user phone number.',

      method: 'PATCH',

      path: '/users::me::phone',

      parameters: {
        body: UpdateUserPhoneSchema.omit({ id: true }).merge(z.object({ otpVerification: OTPVerificationSchema })),
      },

      responses: {
        200: { description: 'OK' },
      },

      async execute({ body }, context) {
        requiresAuthorization(context)

        const recipient = `${body.phone.ddi}${body.phone.number}`

        await validateOTP(dependencies)({ ...body.otpVerification, context: OTPContextEnum.UPDATE_PHONE, recipient })

        await updateUserPhone(dependencies)({ id: context.auth.userId, phone: body.phone })

        return
      },
    },

    updateUserProfilePassword: {
      summary: 'Update User Profile Password',
      description: 'Updates the user password.',

      method: 'PATCH',

      path: '/users::me::password',

      parameters: {
        body: UpdateUserPasswordSchema.omit({ id: true }),
      },

      responses: {
        200: { description: 'OK' },
      },

      async execute({ body }, context) {
        requiresAuthorization(context)

        await userPasswordVerification(dependencies)({ id: context.auth.userId, password: body.currentPassword })

        await updateUserPassword(dependencies)({ ...body, id: context.auth.userId })

        return
      },
    },
  },
})
