import {
  SignInSchema,
  SignInSchemaOutput,
  SocialSignInSchema,
  SocialSignInSchemaOutput,
  SignUpSchema,
  SignUpSchemaOutput,
  ForgotPasswordSchema,
  RecoverPasswordSchema,
} from '@starter/schema'

import { IDependencies } from '@/support/types'
import { signIn } from '@/core/auth/use-cases/sign-in.use-case'
import { socialSignIn } from '@/core/auth/use-cases/social-sign-in.use-case'
import { signUp } from '@/core/auth/use-cases/sign-up.use-case'
import { forgotPassword } from '@/core/auth/use-cases/forgot-password.use-case'
import { recoverPassword } from '@/core/auth/use-cases/recover-password.use-case'
import { IRouter } from '@/ports/http'

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
      },

      execute({ body }) {
        return signUp(dependencies)(body)
      },
    },

    forgotPassword: {
      summary: 'Forgot Password',
      description: `Sends a password reset link to the user's email address.`,

      method: 'POST',

      path: '/forgot-password',

      parameters: {
        body: ForgotPasswordSchema,
      },

      responses: {
        204: {
          description: 'The password reset email was successfully sent to the user.',
        },
      },

      execute({ body }) {
        return forgotPassword(dependencies)(body)
      },
    },

    recoverPassword: {
      summary: 'Recover Password',
      description: 'Allows the user to set a new password.',

      method: 'POST',

      path: '/recover-password',

      parameters: {
        body: RecoverPasswordSchema,
      },

      responses: {
        204: {
          description: 'The password was successfully updated.',
        },
      },

      execute({ body }) {
        return recoverPassword(dependencies)(body)
      },
    },
  },
})
