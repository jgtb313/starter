import client from '@starter/client'
import { RequestOptions } from '@starter/use-hooks'

export type AuthContextProps = {
  authenticate: RequestOptions<typeof client.auth.authenticate>
  signIn: RequestOptions<typeof client.auth.signIn>
  signUp: RequestOptions<typeof client.auth.signUp>
  socialSignIn: RequestOptions<typeof client.auth.socialSignIn>
  forgotPassword: RequestOptions<typeof client.auth.forgotPassword>
  recoverPassword: RequestOptions<typeof client.auth.recoverPassword>

  loadingAuthenticate: boolean
  loadingSignIn: boolean
  loadingSignUp: boolean
  loadingSocialSignIn: boolean
  loadingForgotPassword: boolean
  loadingRecoverPassword: boolean
}

export type AuthProviderProps = {}
