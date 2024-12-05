import {
  z,
  GetUserByIdSchemaOutput,
  UpdateUserSchema,
  UpdateUserSchemaOutput,
  UpdateUserEmailSchema,
  UpdateUserEmailSchemaOutput,
  UpdateUserPhoneSchema,
  UpdateUserPhoneSchemaOutput,
  UpdateUserPasswordSchema,
  OTPVerificationSchema,
  OTPContextEnum,
} from '@starter/schema'

import { IDependencies } from '@/support/types'
import { validateOTP } from '@/core/otp/use-cases/validate-otp.use-case'
import { getUserById } from '@/core/user/use-cases/get-user-by-id.use-case'
import { updateUser } from '@/core/user/use-cases/update-user.use-case'
import { updateUserPassword } from '@/core/user/use-cases/update-user-password.use-case'
import { updateUserEmail } from '@/core/user/use-cases/update-user-email.use-case'
import { updateUserPhone } from '@/core/user/use-cases/update-user-phone.use-case'
import { userPasswordVerification } from '@/core/user/use-cases/user-password-verification.use-case'
import { requiresAuthorization, IRouter } from '@/ports/http'

export const ProfileRouter = (dependencies: IDependencies): IRouter => ({
  name: 'Profile',

  description: 'Handles operations for managing and retrieving the authenticated user.',

  schemas: {},

  paths: {
    getProfile: {
      summary: 'Get Profile',
      description: 'Retrieves the authenticated profile.',

      method: 'GET',

      path: '/profile',

      parameters: {},

      responses: {
        200: { schema: GetUserByIdSchemaOutput },
        401: {
          description: 'Unauthorized',
        },
      },

      execute(_, context) {
        requiresAuthorization(context)

        return getUserById(dependencies)({ id: context.auth.userId })
      },
    },

    updateProfile: {
      summary: 'Update Profile',
      description: 'Updates and returns the authenticated profile.',

      method: 'PATCH',

      path: '/profile',

      parameters: {
        body: UpdateUserSchema.omit({ id: true }),
      },

      responses: {
        200: { schema: UpdateUserSchemaOutput },
        401: {
          description: 'Unauthorized',
        },
      },

      execute({ body }, context) {
        requiresAuthorization(context)

        return updateUser(dependencies)({ ...body, id: context.auth.userId })
      },
    },

    updateProfileEmail: {
      summary: 'Update Profile Email',
      description: `Validates the OTP sent to the user's email and allows the user to reset their email.`,

      method: 'PATCH',

      path: '/profile/email',

      parameters: {
        body: UpdateUserEmailSchema.omit({ id: true }).merge(z.object({ otpVerification: OTPVerificationSchema })),
      },

      responses: {
        200: { schema: UpdateUserEmailSchemaOutput },
        401: {
          description: 'Unauthorized',
        },
        403: {
          description: 'Expired',
        },
        404: {
          description: 'OTP {{otpId}} not found',
        },
        409: {
          description: 'Attempts expired',
        },
      },

      async execute({ body }, context) {
        requiresAuthorization(context)

        UpdateUserEmailSchema.parse(body)

        await validateOTP(dependencies)({ ...body.otpVerification, context: OTPContextEnum.UPDATE_EMAIL, recipient: body.email })

        return updateUserEmail(dependencies)({ id: context.auth.userId, email: body.email })
      },
    },

    updateProfilePhone: {
      summary: 'Update Profile Phone',
      description: `Validates the OTP sent to the user's phone and allows the user to reset their phone number.`,

      method: 'PATCH',

      path: '/profile/phone',

      parameters: {
        body: UpdateUserPhoneSchema.omit({ id: true }).merge(z.object({ otpVerification: OTPVerificationSchema })),
      },

      responses: {
        200: { schema: UpdateUserPhoneSchemaOutput },
        401: {
          description: 'Unauthorized',
        },
        403: {
          description: 'Expired',
        },
        404: {
          description: 'OTP {{otpId}} not found',
        },
        409: {
          description: 'Attempts expired',
        },
      },

      async execute({ body }, context) {
        requiresAuthorization(context)

        UpdateUserPhoneSchema.parse(body)

        const recipient = `${body.phone.ddi}${body.phone.number}`

        await validateOTP(dependencies)({ ...body.otpVerification, context: OTPContextEnum.UPDATE_PHONE, recipient })

        return updateUserPhone(dependencies)({ id: context.auth.userId, phone: body.phone })
      },
    },

    updateProfilePassword: {
      summary: 'Update Profile Password',
      description: 'Updates the authenticated user password.',

      method: 'PATCH',

      path: '/profile/password',

      parameters: {
        body: UpdateUserPasswordSchema.omit({ id: true }),
      },

      responses: {
        204: { description: 'The password was successfully updated.' },
        401: {
          description: 'Unauthorized',
        },
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
