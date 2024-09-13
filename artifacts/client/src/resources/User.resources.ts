/**
 * @name User
 * @description This module exposes functions
 *              related to the `/users` path
 *
 * @module User
 **/

import {
  User,
  ListUserInput,
  ListUserOutput,
  GetUserMeInput,
  GetUserMeOutput,
  CreateUserInput,
  CreateUserOutput,
  UpdateUserInput,
  UpdateUserOutput,
  DeleteUserInput,
  DeleteUserOutput
} from '@starter/schema'

import client from '@/request'
import { withFields, WithoutId } from '@/support'

/**
 * `GET /users`
 * Makes a request to /users
 *
 * @param {Object} body The body for the request.
 * @param {Object} [body.fields] The fields.
 *
 * @returns Resolves to the result of the request or an error
 */
export const list = withFields<ListUserInput, ListUserOutput, User>((params) =>
  client.get('/user', {
    params
  })
)

/**
 * `GET /users:me`
 * Makes a request to /users:me
 *
 * @param {Object} body The body for the request.
 * @param {Object} [body.fields] The fields.
 *
 * @returns Resolves to the result of the request response or an error
 */
export const me = withFields<WithoutId<GetUserMeInput>, GetUserMeOutput>(({ fields }) =>
  client.get('user:me', {
    params: { fields }
  })
)

/**
 * `POST /users`
 * Makes a request to /users
 *
 * @param {Object} body The body for the request.
 * @param {Object} [body.fields] The fields.
 *
 * @returns Resolves to the result of the request response or an error
 */
export const create = withFields<CreateUserInput, CreateUserOutput>(({ fields, ...input }) => client.post('/user', input, { params: { fields } }))

/**
 * `PATCH /users/:id`
 * Makes a request to /users/:id
 *
 * @param {Object} body The body for the request.
 * @param {Object} [body.fields] The fields.
 *
 * @returns Resolves to the result of the request response or an error
 */
export const update = withFields<UpdateUserInput, UpdateUserOutput>(({ fields, id, ...input }) =>
  client.patch('users', input, {
    params: { id, fields }
  })
)

/**
 * `DELETE /users/:id`
 * Makes a request to /users/:id
 *
 * @param {Object} body The body for the request.
 * @param {Object} [body.fields] The fields.
 *
 * @returns Resolves to the result of the request response or an error
 */
export const destroy = withFields<DeleteUserInput, DeleteUserOutput>(({ id, fields }) => client.delete('/user', { params: { id, fields } }))
