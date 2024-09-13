/**
 * @name Auth
 * @description This module exposes functions
 *              related to the `/auth` path
 *
 * @module Auth
 **/
import {
  SignInInput,
  SignInOutput,
  ForgotPasswordInput,
  ForgotPasswordOutput,
  RecoverPasswordInput,
  RecoverPasswordOutput,
  AccountActivationInput,
  AccountActivationOutput,
  WithRecaptcha,
  Store
} from '@starter/schema'

import client from '@/request'
import { withFields } from '@/support'
import { parseApiStore, parseApiUser, ApiLogin } from '@/api-mapping'

/**
 * `POST /auth:sign-in`
 * Makes a request to /auth:sign-in
 *
 * @param {Object} body The body for the request.
 * @param {Object} [body.fields] The fields.
 *
 */
export const signIn = withFields<WithRecaptcha<SignInInput>, SignInOutput>(({ fields, ...input }) =>
  client.post<{}, ApiLogin>('/auth/login', input, { params: { fields } }).then((response) => {
    return {
      token: response.hash,
      store: response.userStores.length ? parseApiStore(response.userStores[0].store) : ({} as Store),
      user: parseApiUser(response)
    }
  })
)

/**
 * `POST /auth:forgot-password`
 * Makes a request to /auth:forgot-password
 *
 * @param {Object} body The body for the request.
 * @param {Object} [body.fields] The fields.
 *
 */
export const forgotPassword = withFields<WithRecaptcha<ForgotPasswordInput>, ForgotPasswordOutput>(({ fields, ...input }) =>
  client.post('/auth/forgot-password', input, { params: { fields } }).catch(() => {
    return {} as any
  })
)

/**
 * `POST /auth:recover-password`
 * Makes a request to /auth:recover-password
 *
 * @param {Object} body The body for the request.
 * @param {Object} [body.fields] The fields.
 *
 */
export const recoverPassword = withFields<WithRecaptcha<RecoverPasswordInput>, RecoverPasswordOutput>(({ fields, ...input }) =>
  client.post('/auth/recover-password', input, { params: { fields } })
)

/**
 * `POST /auth:account-activation`
 * Makes a request to /auth:account-activation
 *
 * @param {Object} body The body for the request.
 * @param {Object} [body.fields] The fields.
 *
 */
export const accountActivation = withFields<WithRecaptcha<AccountActivationInput>, AccountActivationOutput>(({ fields, ...input }) =>
  client.post('/auth/recover-password', input, { params: { fields } })
)
