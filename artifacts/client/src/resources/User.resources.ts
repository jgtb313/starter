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
  DeleteUserOutput,
  Store
} from '@starter/schema'

import client from '@/request'
import { withFields, WithoutId } from '@/support'
import { parseApiUser, parseApiStore, ApiUser, ApiListOutput } from '@/api-mapping'

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
  client
    .get('/user/index', {
      params
    })
    .then((response) => {
      const data = response as unknown as ApiListOutput<ApiUser>

      const items: User[] = data.items.map(parseApiUser)

      return {
        values: items,
        offset: 0,
        limit: 10,
        total: data.estimatedCount
      }
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
export const create = withFields<CreateUserInput, CreateUserOutput>(({ relationships, ...input }) =>
  client
    .post('/user/create', {
      user: {
        ...input
      },
      roles: relationships.map((relationship) => ({
        store: +relationship.storeId,
        role: +relationship.roleId
      }))
    })
    .then((response) => {
      const data = response as unknown as ApiUser

      return parseApiUser(data)
    })
)

/**
 * `PATCH /users/:id`
 * Makes a request to /users/:id
 *
 * @param {Object} body The body for the request.
 * @param {Object} [body.fields] The fields.
 *
 * @returns Resolves to the result of the request response or an error
 */
export const update = withFields<UpdateUserInput, UpdateUserOutput>(({ fields, id, relationships, ...input }) =>
  client
    .patch<{}, ApiUser>(
      'users/update',
      {
        user: {
          ...input
        },
        roles: relationships.map((relationship) => ({
          store: +relationship.storeId,
          role: +relationship.roleId
        }))
      },
      {
        params: { id, fields }
      }
    )
    .then((response) => {
      return parseApiUser(response)
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
  client
    .get<{}, ApiUser>('user/user-me', {
      params: { fields }
    })
    .then((response) => {
      return {
        store: response.userStores[0] ? parseApiStore(response.userStores[0].store) : ({} as Store),
        user: parseApiUser(response)
      }
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
export const destroy = withFields<DeleteUserInput, DeleteUserOutput>(({ id, fields }) => client.delete('/user/delete', { params: { id, fields } }))
