import { ValidateOTPSchema } from '@starter/schema'

import { IDependencies } from '@/core/shared/types'
import { validateOTP } from '@/core/otp/use-cases/validate-otp.use-case'
import { IRouter } from '@/ports/http'

export const OTPRouter = (dependencies: IDependencies): IRouter => ({
  name: 'OTP',

  description: 'Module designed for validating one-time passwords (OTPs) securely.',

  schemas: {},

  paths: {
    validateOTP: {
      summary: 'Validate OTP',
      description: 'Verifies a provided OTP against the expected value for user authentication.',

      method: 'POST',

      path: '/otps/:id(.*)::validate',

      parameters: {
        params: ValidateOTPSchema.pick({ id: true }),
        body: ValidateOTPSchema.omit({ id: true })
      },

      responses: {
        204: {
          description: '204'
        }
      },

      async execute({ params, body }) {
        await validateOTP(dependencies)({ ...params, ...body })
      }
    }
  }
})
