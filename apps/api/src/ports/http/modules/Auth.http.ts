import {
  z,
  SignInSchema,
  SignInSchemaOutput,
  SocialSignInSchema,
  SocialSignInSchemaOutput,
  SignUpSchema,
  SignUpSchemaOutput,
  ForgotPasswordSchema,
  ForgotPasswordSchemaOutput,
  OTPVerificationSchema,
  OTPContextEnum,
} from '@starter/schema'

import { IDependencies } from '@/support/types'
import { validateOTP } from '@/core/otp/use-cases/validate-otp.use-case'
import { signIn } from '@/core/auth/use-cases/sign-in.use-case'
import { socialSignIn } from '@/core/auth/use-cases/social-sign-in.use-case'
import { signUp } from '@/core/auth/use-cases/sign-up.use-case'
import { forgotPassword } from '@/core/auth/use-cases/forgot-password.use-case'
import { IRouter } from '@/ports/http'

const ForgotPasswordSchemaHTTP = ForgotPasswordSchema.merge(z.object({ otpVerification: OTPVerificationSchema }))

export const AuthRouter = (dependencies: IDependencies): IRouter => ({
  name: 'Auth',

  description: 'Provides functionalities for user authentication.',

  schemas: {},

  paths: {
    signIn: {
      summary: 'Sign In',
      description: 'Authenticates a user by validating their email and password.',

      method: 'POST',

      path: '/sign-in',

      parameters: {
        body: SignInSchema,
      },

      responses: {
        200: {
          schema: SignInSchemaOutput,
        },
        401: {
          description: 'Invalid access data',
        },
      },

      execute({ body }) {
        return signIn(dependencies)(body)
      },
    },

    socialSignIn: {
      summary: 'Social Sign In',
      description: 'Allows users to authenticate their accounts using third-party services for a seamless sign-in experience.',

      method: 'POST',

      path: '/social-sign-in',

      parameters: {
        body: SocialSignInSchema,
      },

      responses: {
        200: {
          schema: SocialSignInSchemaOutput,
        },
      },

      execute({ body }) {
        return socialSignIn(dependencies)(body)
      },
    },

    signUp: {
      summary: 'Sign Up',
      description: 'Creates an account on the free tier.',

      method: 'POST',

      path: '/sign-up',

      parameters: {
        body: SignUpSchema,
      },

      responseStatusCode: 201,

      responses: {
        201: {
          schema: SignUpSchemaOutput,
        },
        409: {
          description: 'E-mail {{email}} has already been taken',
        },
      },

      execute({ body }) {
        return signUp(dependencies)(body)
      },
    },

    forgotPassword: {
      summary: 'Forgot Password',
      description: `Validates the OTP sent to the user's email and allows the user to reset their password by submitting the new password.`,

      method: 'POST',

      path: '/forgot-password',

      parameters: {
        body: ForgotPasswordSchemaHTTP,
      },

      responses: {
        200: {
          schema: ForgotPasswordSchemaOutput,
        },
      },

      async execute({ body }) {
        ForgotPasswordSchemaHTTP.parse(body)

        await validateOTP(dependencies)({ ...body.otpVerification, context: OTPContextEnum.FORGOT_PASSWORD, recipient: body.email })

        return forgotPassword(dependencies)(body)
      },
    },
  },
})
