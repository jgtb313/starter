import {
  ValidateOTPSchema,
  SendForgotPasswordOTPSchema,
  SendForgotPasswordOTPSchemaOutput,
  SendUpdateEmailOTPSchema,
  SendUpdateEmailOTPSchemaOutput,
  SendUpdatePhoneOTPSchema,
  SendUpdatePhoneOTPSchemaOutput,
  OTPContextEnum,
  OTPChannelEnum,
} from '@starter/schema'
import { NotFoundError, IDependencies } from '@starter/domain'

import { validateOTP } from '@/core/otp/use-cases/validate-otp.use-case'
import { sendOTP } from '@/core/otp/use-cases/send-otp.use-case'
import { getUserByEmail } from '@/core/user/use-cases/get-user-by-email.use-case'
import { requiresAuthorization, IRouter } from '@/ports/http'

export const OTPRouter = (dependencies: IDependencies): IRouter => ({
  name: 'OTP',

  description: 'Module designed for validating and sending one-time passwords (OTPs) securely.',

  schemas: {},

  paths: {
    validateOTP: {
      summary: 'Validate OTP',
      description: 'Verifies a provided OTP against the expected value for user authentication.',

      method: 'POST',

      path: '/otps/:id/validate',

      parameters: {
        params: ValidateOTPSchema.pick({ id: true }),
        body: ValidateOTPSchema.omit({ id: true }),
      },

      responses: {
        204: {
          description: 'OTP has been successfully validated',
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

      async execute({ params, body }) {
        await validateOTP(dependencies)({ ...params, ...body })
      },
    },

    sendForgotPasswordOTP: {
      summary: 'Send Forgot Password OTP',
      description:
        'Generates and sends a one-time password (OTP) to the user’s email address for the purpose of validating a password reset request.',

      method: 'POST',

      path: '/otps/forgot-password',

      parameters: {
        body: SendForgotPasswordOTPSchema,
      },

      responseStatusCode: 201,

      responses: {
        201: {
          schema: SendForgotPasswordOTPSchemaOutput,
        },
        409: [
          {
            description: 'Daily attempt limit exceeded',
          },
          {
            description: 'Insufficient resend time, please try again later',
          },
        ],
      },

      async execute({ body }) {
        SendUpdateEmailOTPSchema.parse(body)

        const recipient = body.email

        const user = await getUserByEmail(dependencies)({ email: recipient })

        if (!user) {
          throw new NotFoundError(`Email ${body.email} not found`)
        }

        const { id } = await sendOTP(dependencies)({
          userId: null,
          channel: OTPChannelEnum.EMAIL,
          context: OTPContextEnum.FORGOT_PASSWORD,
          recipient,
        })

        return {
          otpId: id,
        }
      },
    },

    sendUpdateEmailOTP: {
      summary: 'Send Email Update OTP',
      description: 'Generates and sends a one-time password (OTP) to the user’s email address for the purpose of validating a email reset request.',

      method: 'POST',

      path: '/otps/update-email',

      parameters: {
        body: SendUpdateEmailOTPSchema,
      },

      responseStatusCode: 201,

      responses: {
        201: {
          schema: SendUpdateEmailOTPSchemaOutput,
        },
        409: [
          {
            description: 'Daily attempt limit exceeded',
          },
          {
            description: 'Insufficient resend time, please try again later',
          },
        ],
      },

      async execute({ body }, context) {
        requiresAuthorization(context)

        await SendUpdateEmailOTPSchema.parse(body)

        const recipient = body.email

        const { id } = await sendOTP(dependencies)({
          userId: context.auth.userId,
          channel: OTPChannelEnum.EMAIL,
          context: OTPContextEnum.UPDATE_EMAIL,
          recipient,
        })

        return {
          otpId: id,
        }
      },
    },

    sendUpdatePhoneOTP: {
      summary: 'Send Update Phone OTP',
      description: 'Generates and sends a one-time password (OTP) to the user’s phone for the purpose of validating a phone number reset request.',

      method: 'POST',

      path: '/otps/update-phone',

      parameters: {
        body: SendUpdatePhoneOTPSchema,
      },

      responseStatusCode: 201,

      responses: {
        201: {
          schema: SendUpdatePhoneOTPSchemaOutput,
        },
        409: [
          {
            description: 'Daily attempt limit exceeded',
          },
          {
            description: 'Insufficient resend time, please try again later',
          },
        ],
      },

      async execute({ body }, context) {
        requiresAuthorization(context)

        const recipient = `${body.phone.ddi}${body.phone.number}`

        const { id } = await sendOTP(dependencies)({
          ...body,
          userId: context.auth.userId,
          context: OTPContextEnum.UPDATE_PHONE,
          recipient,
        })

        return {
          otpId: id,
        }
      },
    },
  },
})
