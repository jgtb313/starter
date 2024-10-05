import {
  SignInSchema,
  SignInSchemaOutput,
  SocialSignInSchema,
  SocialSignInSchemaOutput,
  SignUpSchema,
  SignUpSchemaOutput,
  ForgotPasswordSchema,
  RecoverPasswordSchema
} from '@starter/schema'

import { IDependencies } from '@/core/shared/types'
import { signIn } from '@/core/auth/use-cases/sign-in.use-case'
import { signUp } from '@/core/auth/use-cases/sign-up.use-case'
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
          description: 'OK'
        }
      },

      execute({ body }) {
        return signIn(dependencies)(body)
      }
    },

    socialSignIn: {
      summary: 'Social Sign In',
      description: 'Allows users to authenticate their accounts using third-party services for a seamless sign-in experience.',

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

      execute() {
        console.log(dependencies)
        return {}
      }
    },

    signUp: {
      summary: 'Sign Up',
      description: 'Creates an account on the free tier.',

      method: 'POST',

      path: '/auth::sign-up',

      parameters: {
        body: SignUpSchema
      },

      responses: {
        200: {
          schema: SignUpSchemaOutput,
          description: 'OK'
        }
      },

      execute({ body }) {
        return signUp(dependencies)(body)
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
          description: 'OK'
        }
      },

      execute() {
        console.log(dependencies)
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
          description: 'OK'
        }
      },

      execute() {
        console.log(dependencies)
        return {}
      }
    }
  }
})
