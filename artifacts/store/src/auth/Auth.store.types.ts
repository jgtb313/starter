import client from '@starter/client'
import { RequestOptions } from '@starter/use-hooks'

export type AuthContextProps = {
  signIn: RequestOptions<typeof client.auth.signIn>
  signUp: RequestOptions<typeof client.auth.signUp>
  socialSignIn: RequestOptions<typeof client.auth.socialSignIn>
  forgotPassword: RequestOptions<typeof client.auth.forgotPassword>
  recoverPassword: RequestOptions<typeof client.auth.recoverPassword>

  loadingSignIn: boolean
  loadingSignUp: boolean
  loadingSocialSignIn: boolean
  loadingForgotPassword: boolean
  loadingRecoverPassword: boolean
}

export type AuthProviderProps = {}
