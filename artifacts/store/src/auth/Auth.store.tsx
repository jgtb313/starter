import { PropsWithChildren } from 'react'
import client from '@starter/client'
import { useRequest } from '@starter/use-hooks'

import { AuthContext } from './Auth.context'
import { AuthContextProps, AuthProviderProps } from './Auth.store.types'

export const AuthProvider = ({ children }: PropsWithChildren<AuthProviderProps>) => {
  const [callSignIn, { loading: loadingSignIn }] = useRequest(client.auth.signIn)
  const [callForgotPassword, { loading: loadingForgotPassword }] = useRequest(client.auth.forgotPassword)
  const [callRecoverPassword, { loading: loadingRecoverPassword }] = useRequest(client.auth.recoverPassword)

  const signIn: AuthContextProps['signIn'] = async (input, options) => {
    return callSignIn({
      params: {
        ...input,
      },
      options,
    })
  }

  const forgotPassword: AuthContextProps['forgotPassword'] = (input, options) => {
    return callForgotPassword({
      params: {
        ...input,
      },
      options,
    })
  }

  const recoverPassword: AuthContextProps['recoverPassword'] = (input, options) => {
    return callRecoverPassword({
      params: {
        ...input,
      },
      options,
    })
  }

  const value: AuthContextProps = {
    loadingSignIn,
    loadingForgotPassword,
    loadingRecoverPassword,

    signIn,
    forgotPassword,
    recoverPassword,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
