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
  WithRecaptcha,
} from '@starter/schema'

import client from '@/request'
import { withFields } from '@/support'

/**
 * `POST /auth:sign-in`
 * Makes a request to /auth:sign-in
 *
 * @param {Object} body The body for the request.
 * @param {Object} [body.fields] The fields.
 *
 */
export const signIn = withFields<WithRecaptcha<SignInInput>, SignInOutput>(({ fields, ...input }) =>
  client.post('/auth:sign-in', input, { params: { fields } }),
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
  client.post('/auth:forgot-password', input, { params: { fields } }),
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
  client.post('/auth:recover-password', input, { params: { fields } }),
)
