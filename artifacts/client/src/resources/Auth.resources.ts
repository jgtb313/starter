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
  SocialSignInInput,
  SocialSignInOutput,
  SignUpInput,
  SignUpOutput,
  ForgotPasswordInput,
  RecoverPasswordInput,
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
 * @returns Resolves to the result of the request or an error.
 */
export const signIn = withFields<SignInInput, SignInOutput>(({ fields, ...body }) => client.post('/auth:sign-in', body, { params: { fields } }))

/**
 * `POST /auth:social-sign-in`
 * Makes a request to /auth:social-sign-in
 *
 * @param {Object} body The body for the request.
 * @param {Object} [body.fields] The fields.
 *
 * @returns Resolves to the result of the request or an error.
 */
export const socialSignIn = withFields<SocialSignInInput, SocialSignInOutput>(({ fields, ...body }) =>
  client.post('/auth:social-sign-in', body, { params: { fields } }),
)

/**
 * `POST /auth:sign-up`
 * Makes a request to /auth:sign-up
 *
 * @param {Object} body The body for the request.
 * @param {Object} [body.fields] The fields.
 *
 * @returns Resolves to the result of the request or an error.
 */
export const signUp = withFields<SignUpInput, SignUpOutput>(({ fields, ...body }) => client.post('/auth:sign-up', body, { params: { fields } }))

/**
 * `POST /auth:forgot-password`
 * Makes a request to /auth:forgot-password
 *
 * @param {Object} body The body for the request.
 * @param {Object} [body.fields] The fields.
 *
 * @returns Resolves to the result of the request or an error.
 */
export const forgotPassword = withFields<ForgotPasswordInput, void>(({ fields, ...body }) =>
  client.post('/auth:forgot-password', body, { params: { fields } }),
)

/**
 * `POST /auth:recover-password`
 * Makes a request to /auth:recover-password
 *
 * @param {Object} body The body for the request.
 * @param {Object} [body.fields] The fields.
 *
 * @returns Resolves to the result of the request or an error.
 */
export const recoverPassword = withFields<RecoverPasswordInput, void>(({ fields, ...body }) =>
  client.post('/auth:recover-password', body, { params: { fields } }),
)
