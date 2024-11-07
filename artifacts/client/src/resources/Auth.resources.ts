/**
 * @name Auth
 * @description This module exposes functions
 *              related to auth
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
 * `POST /sign-in`
 * Makes a request to /sign-in
 *
 * @param {Object} body The body for the request.
 * @param {Object} [body.fields] The fields.
 *
 * @returns Resolves to the result of the request or an error.
 */
export const signIn = withFields<SignInInput, SignInOutput>(({ fields, ...body }) => client.post('/sign-in', body, { params: { fields } }))

/**
 * `POST /social-sign-in`
 * Makes a request to /social-sign-in
 *
 * @param {Object} body The body for the request.
 * @param {Object} [body.fields] The fields.
 *
 * @returns Resolves to the result of the request or an error.
 */
export const socialSignIn = withFields<SocialSignInInput, SocialSignInOutput>(({ fields, ...body }) =>
  client.post('/social-sign-in', body, { params: { fields } }),
)

/**
 * `POST /sign-up`
 * Makes a request to /sign-up
 *
 * @param {Object} body The body for the request.
 * @param {Object} [body.fields] The fields.
 *
 * @returns Resolves to the result of the request or an error.
 */
export const signUp = withFields<SignUpInput, SignUpOutput>(({ fields, ...body }) => client.post('/sign-up', body, { params: { fields } }))

/**
 * `POST /forgot-password`
 * Makes a request to /forgot-password
 *
 * @param {Object} body The body for the request.
 * @param {Object} [body.fields] The fields.
 *
 * @returns Resolves to the result of the request or an error.
 */
export const forgotPassword = withFields<ForgotPasswordInput, void>(({ fields, ...body }) =>
  client.post('/forgot-password', body, { params: { fields } }),
)

/**
 * `POST /recover-password`
 * Makes a request to /recover-password
 *
 * @param {Object} body The body for the request.
 * @param {Object} [body.fields] The fields.
 *
 * @returns Resolves to the result of the request or an error.
 */
export const recoverPassword = withFields<RecoverPasswordInput, void>(({ fields, ...body }) =>
  client.post('/recover-password', body, { params: { fields } }),
)
