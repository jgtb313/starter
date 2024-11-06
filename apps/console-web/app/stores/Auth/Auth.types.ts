import client from '@ss/client'
import { RequestOptions } from '@ss/components'

export type AuthContextProps = {
  signIn: RequestOptions<typeof client.auth.signIn>
  forgotPassword: RequestOptions<typeof client.auth.forgotPassword>
  recoverPassword: RequestOptions<typeof client.auth.recoverPassword>
  accountActivation: RequestOptions<typeof client.auth.accountActivation>

  loadingSignIn: boolean
  loadingForgotPassword: boolean
  loadingRecoverPassword: boolean
  loadingAccountActivation: boolean
}

export type AuthProviderProps = {}
