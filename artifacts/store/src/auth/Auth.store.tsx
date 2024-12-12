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
  const [callsocialSignOn, { loading: loadingSocialSignOn }] = useRequest(client.auth.socialSignOn)
  const [callForgotPassword, { loading: loadingForgotPassword }] = useRequest(client.auth.forgotPassword)

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

  const socialSignOn: AuthContextProps['socialSignOn'] = (input, options) =>
    callsocialSignOn({
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

  const value: AuthContextProps = {
    loadingSignIn,
    loadingSignUp,
    loadingSocialSignOn,
    loadingForgotPassword,

    signIn,
    signUp,
    socialSignOn,
    forgotPassword,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
