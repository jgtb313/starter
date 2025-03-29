import { UseGuards } from '@nestjs/common'
import { Controller, Route, Request } from '@starter/nestjs-server-hoisting'
import { RoleService, RoleSchema, User } from '@starter/domain'

import { AuthGuard } from '@/support/guards'
import { ACLService } from '@/support/access-control'
import { AuthenticatedUser } from '@/support/decorators'
import {
  ListRolesSchema,
  GetRoleSchema,
  CreateRoleSchema,
  UpdateRoleSchema,
  DeleteRoleSchema,
  ListRolesRequest,
  GetRoleRequest,
  CreateRoleRequest,
  UpdateRoleRequest,
  DeleteRoleRequest,
} from './role.controller.schema'

@Controller({
  name: 'Role',

  description: 'Handles operations for managing and retrieving roles.',

  basePath: 'workspaces/:workspaceId/roles',

  schemas: {
    Role: {
      schema: RoleSchema,
    },
  },
})
@UseGuards(AuthGuard)
export class RoleController {
  constructor(
    private readonly aclService: ACLService,
    private readonly roleService: RoleService,
  ) {}

  @Route({
    summary: 'List Roles',

    description: 'Retrieves a list of roles.',

    method: 'GET',

    parameters: {
      params: ListRolesSchema.params,
      query: ListRolesSchema.query,
    },

    responses: {
      200: {
        schema: ListRolesSchema.output,
      },
    },
  })
  listRoles(@AuthenticatedUser() user: User, @Request() { params, query }: ListRolesRequest) {
    this.aclService.canPerformActionByPermission(user, 'organization:read', {
      workspaceId: params.workspaceId,
    })

    return this.roleService.findAll({
      ...query,
      workspaceId: params.workspaceId,
    })
  }

  @Route({
    summary: 'Get Role',

    description: 'Retrieves a single organization by their ID.',

    method: 'GET',

    path: '/:roleId',

    parameters: {
      params: GetRoleSchema.params,
    },

    responses: {
      200: {
        schema: GetRoleSchema.output,
      },
    },
  })
  getRole(@AuthenticatedUser() user: User, @Request() { params }: GetRoleRequest) {
    this.aclService.canPerformActionByPermission(user, 'organization:read', {
      workspaceId: params.workspaceId,
    })

    return this.roleService.findById(params)
  }

  @Route({
    summary: 'Create Role',

    description: 'Creates a new organization.',

    method: 'POST',

    parameters: {
      params: CreateRoleSchema.params,
      body: CreateRoleSchema.body,
    },

    responses: {
      201: {
        schema: CreateRoleSchema.output,
      },
    },
  })
  createRole(@AuthenticatedUser() user: User, @Request() { params, body }: CreateRoleRequest) {
    this.aclService.canPerformActionByPermission(user, 'organization:create', {
      workspaceId: params.workspaceId,
    })

    return this.roleService.create({
      ...body,
      workspaceId: params.workspaceId,
    })
  }

  @Route({
    summary: 'Update Role',

    description: 'Updates an existing organization by their ID.',

    method: 'PATCH',

    path: '/:roleId',

    parameters: {
      params: UpdateRoleSchema.params,
      body: UpdateRoleSchema.body,
    },

    responses: {
      200: {
        schema: UpdateRoleSchema.output,
      },
    },
  })
  updateRole(@AuthenticatedUser() user: User, @Request() { params, body }: UpdateRoleRequest) {
    this.aclService.canPerformActionByPermission(user, 'organization:update', {
      workspaceId: params.workspaceId,
    })

    return this.roleService.updateById(params, {
      ...body,
    })
  }

  @Route({
    summary: 'Delete Role',

    description: 'Deletes a organization by their ID.',

    method: 'DELETE',

    path: '/:roleId',

    parameters: {
      params: DeleteRoleSchema.params,
    },

    responses: {
      204: {
        description: 'Role has been successfully deleted.',
      },
    },
  })
  deleteRole(@AuthenticatedUser() user: User, @Request() { params }: DeleteRoleRequest) {
    this.aclService.canPerformActionByPermission(user, 'organization:delete', {
      workspaceId: params.workspaceId,
    })

    return this.roleService.deleteById(params)
  }
}
