import { UseGuards } from '@nestjs/common'
import { Controller, Route, Request, RequestInput } from '@starter/nestjs-server-hoisting'
import { UserService, OTPService, User, OTPContextEnum } from '@starter/domain'

import { AuthGuard } from '@/support/guards'
import { AuthenticatedUser } from '@/support/decorators'
import {
  GetProfileSchema,
  UpdateProfileSchema,
  UpdateProfileEmailSchema,
  UpdateProfilePhoneSchema,
  UpdateProfilePasswordSchema,
  UpdateProfileRequest,
  UpdateProfileEmailRequest,
  UpdateProfilePhoneRequest,
  UpdateProfilePasswordRequest,
} from './profile.controller.schema'

@UseGuards(AuthGuard)
@Controller({
  name: 'Profile',

  description: 'Provides functionalities for managing user profiles.',

  basePath: 'profile',

  schemas: {},
})
export class ProfileController {
  constructor(
    private readonly userService: UserService,
    private readonly otpService: OTPService,
  ) {}

  @Route({
    summary: 'Get Profile',
    description: 'Retrieves the profile information of the authenticated user.',

    method: 'GET',

    parameters: {},

    responses: {
      200: {
        schema: GetProfileSchema.output,
      },
      401: {
        description: 'Unauthorized',
      },
    },
  })
  async getProfile(@AuthenticatedUser() user: User) {
    return this.userService.findById(user.userId)
  }

  @Route({
    summary: 'Update Profile',
    description: 'Updates and returns the authenticated profile.',

    method: 'PATCH',

    parameters: {
      body: UpdateProfileSchema.body,
    },

    responses: {
      200: { schema: UpdateProfileSchema.output },
      401: {
        description: 'Unauthorized',
      },
    },
  })
  updateProfile(@AuthenticatedUser() user: User, @Request() { body }: UpdateProfileRequest) {
    return this.userService.updateById(user.userId, body)
  }

  @Route({
    summary: 'Update Profile Email',
    description: `Validates the OTP sent to the user's email and allows the user to reset their email.`,

    method: 'PATCH',

    path: '/email',

    parameters: {
      body: UpdateProfileEmailSchema.output,
    },

    responses: {
      200: { schema: UpdateProfileEmailSchema.output },
      401: {
        description: 'Unauthorized',
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
        {
          description: 'E-mail {{email}} has already been taken.',
        },
      ],
    },
  })
  async updateProfileEmail(@AuthenticatedUser() user: User, @Request() { body }: UpdateProfileEmailRequest) {
    const recipient = body.email

    await this.otpService.validate({ ...body.otpVerification, context: OTPContextEnum.UPDATE_EMAIL, recipient })

    return this.userService.updateById(user.userId, { email: body.email })
  }

  @Route({
    summary: 'Update Profile Phone',
    description: `Validates the OTP sent to the user's phone and allows the user to reset their phone number.`,

    method: 'PATCH',

    path: '/phone',

    parameters: {
      body: UpdateProfilePhoneSchema.body,
    },

    responses: {
      200: { schema: UpdateProfilePhoneSchema.output },
      401: {
        description: 'Unauthorized',
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
        {
          description: 'Phone {{phone}} has already been taken.',
        },
      ],
    },
  })
  async updateProfilePhone(@AuthenticatedUser() user: User, @Request() { body }: UpdateProfilePhoneRequest) {
    const recipient = `${body.phone.ddi}${body.phone.number}`

    await this.otpService.validate({ ...body.otpVerification, context: OTPContextEnum.UPDATE_PHONE, recipient })

    return this.userService.updateById(user.userId, { phone: body.phone })
  }

  @Route({
    summary: 'Update Profile Password',
    description: 'Updates the authenticated user password.',

    method: 'PATCH',

    path: '/password',

    parameters: {
      body: UpdateProfilePasswordSchema.body,
    },

    responses: {
      204: { description: 'The password was successfully updated.' },
      401: {
        description: 'Unauthorized',
      },
    },
  })
  async updateProfilePassword(@AuthenticatedUser() user: User, @Request() { body }: UpdateProfilePasswordRequest) {
    await this.userService.verifyPassword(user.userId, body.currentPassword)

    await this.userService.updatePassword(user.userId, body.password)
  }

  @Route({
    summary: 'Deactivate Profile',
    description: 'Deactivates the authenticated account.',

    method: 'DELETE',

    parameters: {},

    responses: {
      204: { description: 'The account was successfully deactivated.' },
      401: {
        description: 'Unauthorized',
      },
    },
  })
  deactivateProfile(@AuthenticatedUser() user: User) {
    return this.userService.deleteById(user.userId)
  }
}
