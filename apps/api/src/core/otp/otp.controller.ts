import { UseGuards } from '@nestjs/common'
import { Controller, Route, Request } from '@starter/nestjs-server-hoisting'
import { OTPSchema, OTPService, User } from '@starter/domain'

import { AuthGuard } from '@/support/guards'
import { AuthenticatedUser } from '@/support/decorators'
import {
  ValidateOTPSchema,
  SendPasswordLessSchema,
  SendForgotPasswordOTPSchema,
  SendUpdateEmailOTPSchema,
  SendUpdatePhoneOTPSchema,
  ValidateOTPRequest,
  SendForgotPasswordOTPRequest,
  SendUpdateEmailOTPRequest,
  SendUpdatePhoneOTPRequest,
} from '@/core/otp/otp.controller.schema'

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
      params: ValidateOTPSchema.params,
      body: ValidateOTPSchema.body,
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
  validateOTP(@Request() { params, body }: ValidateOTPRequest) {
    return this.otpService.validate({ ...params, ...body })
  }

  @Route({
    summary: 'Send Password Less OTP',
    description:
      'Generates and sends a one-time password (OTP) to the user’s email address for password-less authentication, allowing secure sign-in without a password.',

    method: 'POST',

    path: '/password-less',

    parameters: {
      body: SendPasswordLessSchema.body,
    },

    responses: {
      201: {
        schema: SendPasswordLessSchema.output,
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
  async sendPasswordLessOTP(@Request() { body }: SendForgotPasswordOTPRequest) {
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
      body: SendForgotPasswordOTPSchema.body,
    },

    responses: {
      201: {
        schema: SendForgotPasswordOTPSchema.output,
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
  async sendForgotPasswordOTP(@Request() { body }: SendForgotPasswordOTPRequest) {
    const recipient = body.email

    const otp = await this.otpService.sendForgotPassword({ recipient })

    return {
      otpId: otp.otpId,
    }
  }

  @Route({
    summary: 'Send Email Update OTP',
    description:
      'Generates and sends a one-time password (OTP) to the user’s email address for the purpose of validating an email address reset request.',

    method: 'POST',

    path: '/update-email',

    parameters: {
      body: SendUpdateEmailOTPSchema.body,
    },

    responses: {
      201: {
        schema: SendUpdateEmailOTPSchema.output,
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
  @UseGuards(AuthGuard)
  async sendUpdateEmailOTP(@AuthenticatedUser() user: User, @Request() { body }: SendUpdateEmailOTPRequest) {
    const otp = await this.otpService.sendUpdateEmail({
      userId: user.userId,
      email: body.email,
    })

    return {
      otpId: otp.otpId,
    }
  }

  @Route({
    summary: 'Send Update Phone OTP',
    description:
      'Generates and sends a one-time password (OTP) to the user’s phone number for the purpose of validating a phone number update request.',

    method: 'POST',

    path: '/update-phone',

    parameters: {
      body: SendUpdatePhoneOTPSchema.body,
    },

    responses: {
      201: {
        schema: SendUpdatePhoneOTPSchema.output,
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
  @UseGuards(AuthGuard)
  async sendUpdatePhoneOTP(@AuthenticatedUser() user: User, @Request() { body }: SendUpdatePhoneOTPRequest) {
    const otp = await this.otpService.sendUpdatePhone(body.channel, {
      userId: user.userId,
      phone: body.phone,
    })

    return {
      otpId: otp.otpId,
    }
  }
}
