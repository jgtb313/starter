import client from '@starter/client'
import { RequestOptions } from '@starter/use-hooks'

export type AuthContextProps = {
  signIn: RequestOptions<typeof client.auth.signIn>
  forgotPassword: RequestOptions<typeof client.auth.forgotPassword>
  recoverPassword: RequestOptions<typeof client.auth.recoverPassword>

  loadingSignIn: boolean
  loadingForgotPassword: boolean
  loadingRecoverPassword: boolean
}

export type AuthProviderProps = {}
