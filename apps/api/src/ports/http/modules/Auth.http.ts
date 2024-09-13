import {
  SignInSchema,
  SignInSchemaOutput,
  SocialSignInSchema,
  SocialSignInSchemaOutput,
  ForgotPasswordSchema,
  RecoverPasswordSchema
} from '@starter/schema'

import { IDependencies } from '@/core/shared/types'
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

      path: '/auth::sign-in',

      parameters: {
        body: SignInSchema
      },

      responses: {
        200: {
          schema: SignInSchemaOutput,
          description: '200'
        }
      },

      execute({ body }) {
        return {}
      }
    },

    socialSignIn: {
      summary: 'Social Sign In',
      description: 'Authenticates a user by validating their email and password.',

      method: 'POST',

      path: '/auth::social-sign-in',

      parameters: {
        body: SocialSignInSchema
      },

      responses: {
        200: {
          schema: SocialSignInSchemaOutput,
          description: '200'
        }
      },

      execute({ body }) {
        return {}
      }
    },

    forgotPassword: {
      summary: 'Forgot Password',
      description: `Sends a password reset link to the user's email address.`,

      method: 'POST',

      path: '/auth::forgot-password',

      parameters: {
        body: ForgotPasswordSchema
      },

      responses: {
        204: {
          description: '204'
        }
      },

      execute({ body }) {
        return {}
      }
    },

    recoverPassword: {
      summary: 'Recover Password',
      description: 'Allows the user to set a new password.',

      method: 'POST',

      path: '/auth::recover-password',

      parameters: {
        body: RecoverPasswordSchema
      },

      responses: {
        204: {
          description: '204'
        }
      },

      execute({ body }) {
        return {}
      }
    }
  }
})
