import { UseGuards } from '@nestjs/common'
import { Controller, Route, Request, RequestInput } from '@starter/nestjs-server-hoisting'
import { OTPSchema, OTPService, User } from '@starter/domain'

import { AuthGuard } from '@/support/guards'
import { AuthenticatedUser } from '@/support/decorators'
import {
  ValidateOTPSchema,
  SendForgotPasswordOTPSchema,
  SendForgotPasswordOTPSchemaOutput,
  SendUpdateEmailOTPSchema,
  SendUpdateEmailOTPSchemaOutput,
  SendUpdatePhoneOTPSchema,
  SendUpdatePhoneOTPSchemaOutput,
  ValidateOTPInput,
  SendForgotPasswordOTPInput,
  SendUpdateEmailOTPInput,
  SendUpdatePhoneOTPInput,
} from './otp.controller.schema'

@Controller({
  name: 'OTP',

  description: 'Module designed for validating and sending one-time passwords (OTPs) securely.',

  basePath: 'otps',

  schemas: {
    OTP: {
      schema: OTPSchema,
    },
  },
})
export class OTPController {
  constructor(private readonly otpService: OTPService) {}

  @Route({
    summary: 'Validate OTP',
    description: 'Verifies a provided OTP against the expected value for user authentication.',

    method: 'POST',

    path: '/:otpId/validate',

    parameters: {
      params: ValidateOTPSchema.pick({ otpId: true }),
      body: ValidateOTPSchema.omit({ otpId: true }),
    },

    responses: {
      204: {
        description: 'OTP has been successfully validated',
      },
      403: {
        description: 'OTP expired.',
      },
      404: {
        description: 'OTP {{otpId}} not found.',
      },
      409: [
        {
          description: 'OTP insufficient resend time, please try again later.',
        },
        {
          description: 'OTP daily attempt limit exceeded.',
        },
        {
          description: 'OTP attempts expired.',
        },
      ],
    },
  })
  validateOTP(@Request() { params, body }: RequestInput<{}, Pick<ValidateOTPInput, 'otpId'>, Omit<ValidateOTPInput, 'otpId'>>) {
    return this.otpService.validate({ ...params, ...body })
  }

  @Route({
    summary: 'Send Password Less OTP',
    description:
      'Generates and sends a one-time password (OTP) to the user’s email address for password-less authentication, allowing secure sign-in without a password.',

    method: 'POST',

    path: '/password-less',

    parameters: {
      body: SendForgotPasswordOTPSchema,
    },

    responses: {
      201: {
        schema: SendForgotPasswordOTPSchemaOutput,
      },
      404: { description: 'Email {{email}} not found.' },
      409: [
        {
          description: 'OTP insufficient resend time, please try again later.',
        },
        {
          description: 'OTP daily attempt limit exceeded.',
        },
      ],
    },
  })
  async sendPasswordLessOTP(@Request() { body }: RequestInput<{}, {}, SendForgotPasswordOTPInput>) {
    const recipient = body.email

    const otp = await this.otpService.sendPasswordLess({ recipient })

    return {
      otpId: otp.otpId,
    }
  }

  @Route({
    summary: 'Send Forgot Password OTP',
    description: 'Generates and sends a one-time password (OTP) to the user’s email address for the purpose of validating a password reset request.',

    method: 'POST',

    path: '/forgot-password',

    parameters: {
      body: SendForgotPasswordOTPSchema,
    },

    responses: {
      201: {
        schema: SendForgotPasswordOTPSchemaOutput,
      },
      404: { description: 'Email {{email}} not found.' },
      409: [
        {
          description: 'OTP insufficient resend time, please try again later.',
        },
        {
          description: 'OTP daily attempt limit exceeded.',
        },
      ],
    },
  })
  async sendForgotPasswordOTP(@Request() { body }: RequestInput<{}, {}, SendForgotPasswordOTPInput>) {
    const recipient = body.email

    const otp = await this.otpService.sendForgotPassword({ recipient })

    return {
      otpId: otp.otpId,
    }
  }

  @UseGuards(AuthGuard)
  @Route({
    summary: 'Send Email Update OTP',
    description:
      'Generates and sends a one-time password (OTP) to the user’s email address for the purpose of validating an email address reset request.',

    method: 'POST',

    path: '/update-email',

    parameters: {
      body: SendUpdateEmailOTPSchema,
    },

    responses: {
      201: {
        schema: SendUpdateEmailOTPSchemaOutput,
      },
      409: [
        {
          description: 'OTP insufficient resend time, please try again later.',
        },
        {
          description: 'OTP daily attempt limit exceeded.',
        },
        {
          description: 'E-mail {{email}} has already been taken.',
        },
      ],
    },
  })
  async sendUpdateEmailOTP(@AuthenticatedUser() user: User, @Request() { body }: RequestInput<{}, {}, SendUpdateEmailOTPInput>) {
    const otp = await this.otpService.sendUpdateEmail({
      userId: user.userId,
      email: body.email,
    })

    return {
      otpId: otp.otpId,
    }
  }

  @UseGuards(AuthGuard)
  @Route({
    summary: 'Send Update Phone OTP',
    description:
      'Generates and sends a one-time password (OTP) to the user’s phone number for the purpose of validating a phone number update request.',

    method: 'POST',

    path: '/update-phone',

    parameters: {
      body: SendUpdatePhoneOTPSchema,
    },

    responses: {
      201: {
        schema: SendUpdatePhoneOTPSchemaOutput,
      },
      409: [
        {
          description: 'OTP insufficient resend time, please try again later.',
        },
        {
          description: 'OTP daily attempt limit exceeded.',
        },
        {
          description: 'Phone {{phone}} has already been taken.',
        },
      ],
    },
  })
  async sendUpdatePhoneOTP(@AuthenticatedUser() user: User, @Request() { body }: RequestInput<{}, {}, SendUpdatePhoneOTPInput>) {
    const otp = await this.otpService.sendUpdatePhone({
      userId: user.userId,
      channel: body.channel,
      phone: body.phone,
    })

    return {
      otpId: otp.otpId,
    }
  }
}
