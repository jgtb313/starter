/**
 * @name Profile
 * @description This module exposes functions
 *              related to the `/users` path
 *
 * @module Profile
 **/

import {
  GetUserByIdSchemaOutput,
  UpdateUserSchemaOutput,
  UpdateUserEmailSchemaOutput,
  UpdateUserPhoneSchemaOutput,
  GetUserByIdOutput,
  UpdateUserInput,
  UpdateUserOutput,
  UpdateUserEmailInput,
  UpdateUserEmailOutput,
  UpdateUserPhoneInput,
  UpdateUserPhoneOutput,
  UpdateUserPasswordInput,
  UpdateUserPasswordOutput,
} from '@starter/schema'

import client from '@/request'
import { withFields, WithoutId } from '@/support'

/**
 * `GET /v1/users/me`
 * Makes a request to /v1/users/me
 *
 * @param {Object} body The body for the request.
 * @param {Object} [body.fields] The fields.
 *
 * @returns Resolves to the result of the request or an error.
 */
export const retrieve = withFields<{}, GetUserByIdOutput>(() => client.get('/v1/users/me').then(GetUserByIdSchemaOutput.parse))

/**
 * `PATCH /v1/users/me`
 * Makes a request to /v1/users/me
 *
 * @param {Object} body The body for the request.
 * @param {Object} [body.fields] The fields.
 *
 * @returns Resolves to the result of the request or an error.
 */
export const update = withFields<WithoutId<UpdateUserInput>, UpdateUserOutput>(({ fields, ...body }) =>
  client.patch('/v1/users/me', body, { params: { fields } }).then(UpdateUserSchemaOutput.parse),
)

/**
 * `PATCH /v1/users/me/email`
 * Makes a request to /v1/users/me/email
 *
 * @param {Object} body The body for the request.
 * @param {Object} [body.fields] The fields.
 *
 * @returns Resolves to the result of the request or an error.
 */
export const updateEmail = withFields<WithoutId<UpdateUserEmailInput>, UpdateUserEmailOutput>(({ fields, ...body }) =>
  client.patch('/v1/users/me/email', body, { params: { fields } }).then(UpdateUserEmailSchemaOutput.parse),
)

/**
 * `PATCH /v1/users/me/phone`
 * Makes a request to /v1/users/me/phone
 *
 * @param {Object} body The body for the request.
 * @param {Object} [body.fields] The fields.
 *
 * @returns Resolves to the result of the request or an error.
 */
export const updatePhone = withFields<WithoutId<UpdateUserPhoneInput>, UpdateUserPhoneOutput>(({ fields, ...body }) =>
  client.patch('/v1/users/me/phone', body, { params: { fields } }).then(UpdateUserPhoneSchemaOutput.parse),
)

/**
 * `PATCH /v1/users/me/password`
 * Makes a request to /v1/users/me/password
 *
 * @param {Object} body The body for the request.
 * @param {Object} [body.fields] The fields.
 *
 * @returns Resolves to the result of the request or an error.
 */
export const updatePassword = withFields<WithoutId<UpdateUserPasswordInput>, UpdateUserPasswordOutput>(({ fields, ...body }) =>
  client.patch('/v1/users/me/password', body, { params: { fields } }),
)
