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
  ForgotPasswordOutput,
  OTPVerification,
} from '@starter/schema'

import client from '@/request'
import { withFields } from '@/support'

/**
 * `POST /v1/sign-in`
 * Makes a request to /v1/sign-in
 *
 * @param {Object} body The body for the request.
 * @param {Object} [body.fields] The fields.
 *
 * @returns Resolves to the result of the request or an error.
 */
export const signIn = withFields<SignInInput, SignInOutput>(({ fields, ...body }) => client.post('/v1/sign-in', body, { params: { fields } }))

/**
 * `POST /v1/social-sign-in`
 * Makes a request to /v1/social-sign-in
 *
 * @param {Object} body The body for the request.
 * @param {Object} [body.fields] The fields.
 *
 * @returns Resolves to the result of the request or an error.
 */
export const socialSignIn = withFields<SocialSignInInput, SocialSignInOutput>(({ fields, ...body }) =>
  client.post('/v1/social-sign-in', body, { params: { fields } }),
)

/**
 * `POST /v1/sign-up`
 * Makes a request to /v1/sign-up
 *
 * @param {Object} body The body for the request.
 * @param {Object} [body.fields] The fields.
 *
 * @returns Resolves to the result of the request or an error.
 */
export const signUp = withFields<SignUpInput, SignUpOutput>(({ fields, ...body }) => client.post('/v1/sign-up', body, { params: { fields } }))

/**
 * `POST /v1/forgot-password`
 * Makes a request to /v1/forgot-password
 *
 * @param {Object} body The body for the request.
 * @param {Object} [body.fields] The fields.
 *
 * @returns Resolves to the result of the request or an error.
 */
export const forgotPassword = withFields<ForgotPasswordInput & OTPVerification, ForgotPasswordOutput>(({ fields, ...body }) =>
  client.post('/v1/forgot-password', body, { params: { fields } }),
)
