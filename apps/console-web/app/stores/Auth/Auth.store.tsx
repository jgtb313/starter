import { PropsWithChildren } from 'react'
import Cookie from 'js-cookie'
import client from '@ss/client'
import { useRequest, toast } from '@ss/components'
import { addDays } from '@ss/shared'

import { useRouter } from '~/hooks'
import { AuthContext } from './Auth.context'
import { AuthContextProps, AuthProviderProps } from './Auth.types'

export const AuthProvider = ({ children }: PropsWithChildren<AuthProviderProps>) => {
  const router = useRouter()
  const [callSignIn, { loading: loadingSignIn }] = useRequest(client.auth.signIn)
  const [callForgotPassword, { loading: loadingForgotPassword }] = useRequest(client.auth.forgotPassword)
  const [callRecoverPassword, { loading: loadingRecoverPassword }] = useRequest(client.auth.recoverPassword)
  const [callAccountActivation, { loading: loadingAccountActivation }] = useRequest(client.auth.accountActivation)

  const signIn: AuthContextProps['signIn'] = async (input, options) => {
    return callSignIn({
      params: {
        ...input,
        recaptcha: ''
      },
      options,
      onSuccess({ token }) {
        Cookie.set('token', token, { expires: addDays(new Date(), 365) })
        client.authenticate(token)

        router.push('/')
      }
    })
  }

  const forgotPassword: AuthContextProps['forgotPassword'] = (input, options) => {
    return callForgotPassword({
      params: {
        ...input,
        recaptcha: ''
      },
      options,
      onSuccess() {
        toast.success({
          message:
            'Enviamos um e-mail com instruções para redefinir sua senha. Verifique sua caixa de entrada e siga o link para criar uma nova senha.'
        })
      }
    })
  }

  const recoverPassword: AuthContextProps['recoverPassword'] = (input, options) => {
    return callRecoverPassword({
      params: {
        ...input,
        recaptcha: ''
      },
      options,
      onSuccess() {
        toast.success({
          message: 'Sua senha foi redefinida com sucesso! Agora você pode fazer login com sua nova senha.'
        })
      }
    })
  }

  const accountActivation: AuthContextProps['accountActivation'] = (input, options) => {
    return callAccountActivation({
      params: {
        ...input,
        recaptcha: ''
      },
      options,
      onSuccess() {
        toast.success({
          message: 'Sua senha foi redefinida com sucesso! Agora você pode fazer login com sua nova senha.'
        })
      }
    })
  }

  const value: AuthContextProps = {
    loadingSignIn,
    loadingForgotPassword,
    loadingRecoverPassword,
    loadingAccountActivation,

    signIn,
    forgotPassword,
    recoverPassword,
    accountActivation
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
