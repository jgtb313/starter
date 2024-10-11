import {
  ValidateOTPSchema,
  SendUpdateEmailOTPSchema,
  SendUpdateEmailOTPSchemaOutput,
  SendUpdatePhoneOTPSchema,
  SendUpdatePhoneOTPSchemaOutput,
  OTPContextEnum,
  OTPChannelEnum,
} from '@starter/schema'

import { IDependencies } from '@/core/shared/types'
import { validateOTP } from '@/core/otp/use-cases/validate-otp.use-case'
import { sendOTP } from '@/core/otp/use-cases/send-otp.use-case'
import { IRouter } from '@/ports/http'

export const OTPRouter = (dependencies: IDependencies): IRouter => ({
  name: 'OTP',

  description: 'Module designed for validating and sending one-time passwords (OTPs) securely.',

  schemas: {},

  paths: {
    validateOTP: {
      summary: 'Validate OTP',
      description: 'Verifies a provided OTP against the expected value for user authentication.',

      method: 'POST',

      path: '/otps/:id(.*)::validate',

      parameters: {
        params: ValidateOTPSchema.pick({ id: true }),
        body: ValidateOTPSchema.omit({ id: true }),
      },

      responses: {
        204: {
          description: 'OK',
        },
      },

      async execute({ params, body }) {
        await validateOTP(dependencies)({ ...params, ...body })
      },
    },

    sendUpdateEmailOTP: {
      summary: 'Send Email Update OTP',
      description:
        'Generates and sends a one-time password (OTP) to the user’s email address for the purpose of securely updating their email information.',

      method: 'POST',

      path: '/otps::update-email',

      parameters: {
        body: SendUpdateEmailOTPSchema,
      },

      responses: {
        200: {
          description: 'OK',
          schema: SendUpdateEmailOTPSchemaOutput,
        },
      },

      async execute({ body }) {
        const recipient = body.email

        const { id } = await sendOTP(dependencies)({ channel: OTPChannelEnum.EMAIL, recipient, context: OTPContextEnum.UPDATE_EMAIL })

        return {
          otpId: id,
        }
      },
    },

    sendUpdatePhoneOTP: {
      summary: 'Send Update Phone OTP',
      description:
        'Generates and sends a one-time password (OTP) to the user’s phone number for the purpose of securely updating their phone contact details.',

      method: 'POST',

      path: '/otps::update-phone',

      parameters: {
        body: SendUpdatePhoneOTPSchema,
      },

      responses: {
        200: {
          description: 'OK',
          schema: SendUpdatePhoneOTPSchemaOutput,
        },
      },

      async execute({ body }) {
        const recipient = `${body.phone.ddi}${body.phone.number}`

        const { id } = await sendOTP(dependencies)({ ...body, recipient, context: OTPContextEnum.UPDATE_PHONE })

        return {
          otpId: id,
        }
      },
    },
  },
})
