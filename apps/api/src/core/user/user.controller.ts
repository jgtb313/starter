import { UseGuards } from '@nestjs/common'
import { Controller, Route, Request, RequestInput } from '@starter/nestjs-server-hoisting'
import { UserService, UserSchema, User, UserStatusEnum } from '@starter/domain'

import { AuthGuard } from '@/support/guards'
import { ACLService } from '@/support/access-control'
import { AuthenticatedUser } from '@/support/decorators'
import {
  ListUsersParamsSchema,
  ListUsersQuerySchema,
  ListUsersSchemaOutput,
  GetUserParamsSchema,
  GetUserSchemaOutput,
  CreateUserParamsSchema,
  CreateUserBodySchema,
  CreateUserSchemaOutput,
  UpdateUserParamsSchema,
  UpdateUserBodySchema,
  UpdateUserSchemaOutput,
  DeleteUserParamsSchema,
  ListUsersParamsInput,
  ListUsersQueryInput,
  GetUserParamsInput,
  CreateUserParamsInput,
  CreateUserBodyInput,
  UpdateUserParamsInput,
  UpdateUserBodyInput,
  DeleteUserParamsInput,
} from './user.controller.schema'

@UseGuards(AuthGuard)
@Controller({
  name: 'User',

  description: 'Handles operations for managing and retrieving users.',

  basePath: 'workspaces/:workspaceId/users',

  schemas: {
    User: {
      schema: UserSchema,
    },
  },
})
export class UserController {
  constructor(
    private readonly aclService: ACLService,
    private readonly userService: UserService,
  ) {}

  @Route({
    summary: 'List Users',

    description: 'Retrieves a list of users.',

    method: 'GET',

    parameters: {
      params: ListUsersParamsSchema,
      query: ListUsersQuerySchema,
    },

    responses: {
      200: {
        schema: ListUsersSchemaOutput,
      },
    },
  })
  listUsers(@AuthenticatedUser() user: User, @Request() { params, query }: RequestInput<ListUsersQueryInput, ListUsersParamsInput, {}>) {
    this.aclService.canPerformActionByPermission(user, 'user:read', {
      workspaceId: params.workspaceId,
    })

    return this.userService.findAll({
      ...params,
      ...query,
    })
  }

  @Route({
    summary: 'Get User',

    description: 'Retrieves a single user by their ID.',

    method: 'GET',

    path: '/:userId',

    parameters: {
      params: GetUserParamsSchema,
    },

    responses: {
      200: {
        schema: GetUserSchemaOutput,
      },
    },
  })
  getUser(@AuthenticatedUser() user: User, @Request() { params }: RequestInput<{}, GetUserParamsInput, {}>) {
    this.aclService.canPerformActionByPermission(user, 'user:read', {
      workspaceId: params.workspaceId,
    })

    return this.userService.findById(params)
  }

  @Route({
    summary: 'Create User',

    description: 'Creates a new user.',

    method: 'POST',

    parameters: {
      params: CreateUserParamsSchema,
      body: CreateUserBodySchema,
    },

    responses: {
      201: {
        schema: CreateUserSchemaOutput,
      },
    },
  })
  createUser(@AuthenticatedUser() user: User, @Request() { params, body }: RequestInput<{}, CreateUserParamsInput, CreateUserBodyInput>) {
    this.aclService.canPerformActionByPermission(user, 'user:create', {
      workspaceId: params.workspaceId,
    })

    return this.userService.create({
      ...params,
      ...body,
      status: UserStatusEnum.ACTIVE,
    })
  }

  @Route({
    summary: 'Update User',

    description: 'Updates an existing user by their ID.',

    method: 'PATCH',

    path: '/:userId',

    parameters: {
      params: UpdateUserParamsSchema,
      body: UpdateUserBodySchema,
    },

    responses: {
      200: {
        schema: UpdateUserSchemaOutput,
      },
    },
  })
  updateUser(@AuthenticatedUser() user: User, @Request() { params, body }: RequestInput<{}, UpdateUserParamsInput, UpdateUserBodyInput>) {
    this.aclService.canPerformActionByPermission(user, 'user:update', {
      workspaceId: params.workspaceId,
    })

    return this.userService.updateById(params, {
      ...body,
    })
  }

  // @Route({
  //   summary: 'Delete User',

  //   description: 'Deletes a user by their ID.',

  //   method: 'DELETE',

  //   path: '/:userId',

  //   parameters: {
  //     params: DeleteUserParamsSchema,
  //   },

  //   responses: {
  //     204: {
  //       description: 'User has been successfully deleted.',
  //     },
  //   },
  // })
  // deleteUser(@AuthenticatedUser() user: User, @Request() { params }: RequestInput<{}, DeleteUserParamsInput, {}>) {
  //   this.aclService.canPerformActionByPermission(user, 'user:delete', {
  //     workspaceId: params.workspaceId,
  //   })

  //   return this.userService.deleteById(params.workspaceId, params.userId)
  // }
}
