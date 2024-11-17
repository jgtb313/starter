import { PropsWithChildren } from 'react'
import client from '@starter/client'
import { useRequest } from '@starter/use-hooks'

import { useStore } from '@/Store.context'
import { AuthContext } from './Auth.context'
import { AuthContextProps, AuthProviderProps } from './Auth.store.types'

export const AuthProvider = ({ children }: PropsWithChildren<AuthProviderProps>) => {
  const store = useStore()
  const [callSignIn, { loading: loadingSignIn }] = useRequest(client.auth.signIn)
  const [callSignUp, { loading: loadingSignUp }] = useRequest(client.auth.signUp)
  const [callSocialSignIn, { loading: loadingSocialSignIn }] = useRequest(client.auth.socialSignIn)
  const [callForgotPassword, { loading: loadingForgotPassword }] = useRequest(client.auth.forgotPassword)
  const [callRecoverPassword, { loading: loadingRecoverPassword }] = useRequest(client.auth.recoverPassword)

  const signIn: AuthContextProps['signIn'] = (input, options) =>
    callSignIn({
      params: {
        ...input,
      },
      options,
      onError: store.onError,
    })

  const signUp: AuthContextProps['signUp'] = (input, options) =>
    callSignUp({
      params: {
        ...input,
      },
      options,
      onError: store.onError,
    })

  const socialSignIn: AuthContextProps['socialSignIn'] = (input, options) =>
    callSocialSignIn({
      params: {
        ...input,
      },
      options,
      onError: store.onError,
    })

  const forgotPassword: AuthContextProps['forgotPassword'] = (input, options) =>
    callForgotPassword({
      params: {
        ...input,
      },
      options,
      onError: store.onError,
    })

  const recoverPassword: AuthContextProps['recoverPassword'] = (input, options) =>
    callRecoverPassword({
      params: {
        ...input,
      },
      options,
      onError: store.onError,
    })

  const value: AuthContextProps = {
    loadingSignIn,
    loadingSignUp,
    loadingSocialSignIn,
    loadingForgotPassword,
    loadingRecoverPassword,

    signIn,
    signUp,
    socialSignIn,
    forgotPassword,
    recoverPassword,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
