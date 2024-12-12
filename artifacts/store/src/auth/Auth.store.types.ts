import client from '@starter/client'
import { RequestOptions } from '@starter/use-hooks'

export type AuthContextProps = {
  signIn: RequestOptions<typeof client.auth.signIn>
  signUp: RequestOptions<typeof client.auth.signUp>
  socialSignOn: RequestOptions<typeof client.auth.socialSignOn>
  forgotPassword: RequestOptions<typeof client.auth.forgotPassword>

  loadingSignIn: boolean
  loadingSignUp: boolean
  loadingSocialSignOn: boolean
  loadingForgotPassword: boolean
}

export type AuthProviderProps = {}
