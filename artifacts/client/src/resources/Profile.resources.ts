/**
 * @name Profile
 * @description This module exposes functions
 *              related to the `/users` path
 *
 * @module Profile
 **/

import {
  GetUserOutput,
  UpdateUserOutput,
  UpdateUserEmailOutput,
  UpdateUserPhoneOutput,
  UpdateUserPasswordOutput,
  UpdateUserInput,
  UpdateUserEmailInput,
  UpdateUserPhoneInput,
  UpdateUserPasswordInput,
} from '@starter/schema'

import client from '@/request'
import { withFields, WithoutId } from '@/support'

/**
 * `GET /users/me`
 * Makes a request to /users/me
 *
 * @param {Object} body The body for the request.
 * @param {Object} [body.fields] The fields.
 *
 * @returns Resolves to the result of the request or an error.
 */
export const retrieve = withFields<{}, GetUserOutput>(() => client.get('/users/me'))

/**
 * `PATCH /users/me`
 * Makes a request to /users/me
 *
 * @param {Object} body The body for the request.
 * @param {Object} [body.fields] The fields.
 *
 * @returns Resolves to the result of the request or an error.
 */
export const update = withFields<WithoutId<UpdateUserInput>, UpdateUserOutput>(({ fields, ...body }) =>
  client.patch('/users/me', body, { params: { fields } }),
)

/**
 * `PATCH /users/me/email`
 * Makes a request to /users/me/email
 *
 * @param {Object} body The body for the request.
 * @param {Object} [body.fields] The fields.
 *
 * @returns Resolves to the result of the request or an error.
 */
export const updateEmail = withFields<WithoutId<UpdateUserEmailInput>, UpdateUserEmailOutput>(({ fields, ...body }) =>
  client.patch('/users/me/email', body, { params: { fields } }),
)

/**
 * `PATCH /users/me/phone`
 * Makes a request to /users/me/phone
 *
 * @param {Object} body The body for the request.
 * @param {Object} [body.fields] The fields.
 *
 * @returns Resolves to the result of the request or an error.
 */
export const updatePhone = withFields<WithoutId<UpdateUserPhoneInput>, UpdateUserPhoneOutput>(({ fields, ...body }) =>
  client.patch('/users/me/phone', body, { params: { fields } }),
)

/**
 * `PATCH /users/me/password`
 * Makes a request to /users/me/password
 *
 * @param {Object} body The body for the request.
 * @param {Object} [body.fields] The fields.
 *
 * @returns Resolves to the result of the request or an error.
 */
export const updatePassword = withFields<WithoutId<UpdateUserPasswordInput>, UpdateUserPasswordOutput>(({ fields, ...body }) =>
  client.patch('/users/me/password', body, { params: { fields } }),
)
