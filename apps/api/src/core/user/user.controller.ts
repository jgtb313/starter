import { UseGuards } from '@nestjs/common'
import { Controller, Route, Request } from '@starter/nestjs-server-hoisting'
import { UserService, UserSchema, User, UserStatusEnum } from '@starter/domain'

import { AuthGuard } from '@/support/guards'
import { ACLService } from '@/support/access-control'
import { AuthenticatedUser } from '@/support/decorators'
import {
  ListUsersSchema,
  GetUserSchema,
  CreateUserSchema,
  UpdateUserSchema,
  DeleteUserSchema,
  ListUsersRequest,
  GetUserRequest,
  CreateUserRequest,
  UpdateUserRequest,
  DeleteUserRequest,
} from './user.controller.schema'

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
@UseGuards(AuthGuard)
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
      params: ListUsersSchema.params,
      query: ListUsersSchema.query,
    },

    responses: {
      200: {
        schema: ListUsersSchema.output,
      },
    },
  })
  listUsers(@AuthenticatedUser() user: User, @Request() { params, query }: ListUsersRequest) {
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
      params: GetUserSchema.params,
    },

    responses: {
      200: {
        schema: GetUserSchema.output,
      },
    },
  })
  getUser(@AuthenticatedUser() user: User, @Request() { params }: GetUserRequest) {
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
      params: CreateUserSchema.params,
      body: CreateUserSchema.body,
    },

    responses: {
      201: {
        schema: CreateUserSchema.output,
      },
    },
  })
  createUser(@AuthenticatedUser() user: User, @Request() { params, body }: CreateUserRequest) {
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
      params: UpdateUserSchema.params,
      body: UpdateUserSchema.body,
    },

    responses: {
      200: {
        schema: UpdateUserSchema.output,
      },
    },
  })
  updateUser(@AuthenticatedUser() user: User, @Request() { params, body }: UpdateUserRequest) {
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
