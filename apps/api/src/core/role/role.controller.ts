import { UseGuards } from '@nestjs/common'
import { Controller, Route, Request, RequestInput } from '@starter/nestjs-server-hoisting'
import { RoleService, RoleSchema, User } from '@starter/domain'

import { AuthGuard } from '@/support/guards'
import { ACLService } from '@/support/access-control'
import { AuthenticatedUser } from '@/support/decorators'
import {
  ListRolesParamsSchema,
  ListRolesQuerySchema,
  ListRolesSchemaOutput,
  GetRoleParamsSchema,
  GetRoleSchemaOutput,
  CreateRoleParamsSchema,
  CreateRoleBodySchema,
  CreateRoleSchemaOutput,
  UpdateRoleParamsSchema,
  UpdateRoleBodySchema,
  UpdateRoleSchemaOutput,
  DeleteRoleParamsSchema,
  ListRolesParamsInput,
  ListRolesQueryInput,
  GetRoleParamsInput,
  CreateRoleParamsInput,
  CreateRoleBodyInput,
  UpdateRoleParamsInput,
  UpdateRoleBodyInput,
  DeleteRoleParamsInput,
} from './role.controller.schema'

@UseGuards(AuthGuard)
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
      params: ListRolesParamsSchema,
      query: ListRolesQuerySchema,
    },

    responses: {
      200: {
        schema: ListRolesSchemaOutput,
      },
    },
  })
  listRoles(@AuthenticatedUser() user: User, @Request() { params, query }: RequestInput<ListRolesQueryInput, ListRolesParamsInput, {}>) {
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
      params: GetRoleParamsSchema,
    },

    responses: {
      200: {
        schema: GetRoleSchemaOutput,
      },
    },
  })
  getRole(@AuthenticatedUser() user: User, @Request() { params }: RequestInput<{}, GetRoleParamsInput, {}>) {
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
      params: CreateRoleParamsSchema,
      body: CreateRoleBodySchema,
    },

    responses: {
      201: {
        schema: CreateRoleSchemaOutput,
      },
    },
  })
  createRole(@AuthenticatedUser() user: User, @Request() { params, body }: RequestInput<{}, CreateRoleParamsInput, CreateRoleBodyInput>) {
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
      params: UpdateRoleParamsSchema,
      body: UpdateRoleBodySchema,
    },

    responses: {
      200: {
        schema: UpdateRoleSchemaOutput,
      },
    },
  })
  updateRole(@AuthenticatedUser() user: User, @Request() { params, body }: RequestInput<{}, UpdateRoleParamsInput, UpdateRoleBodyInput>) {
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
      params: DeleteRoleParamsSchema,
    },

    responses: {
      204: {
        description: 'Role has been successfully deleted.',
      },
    },
  })
  deleteRole(@AuthenticatedUser() user: User, @Request() { params }: RequestInput<{}, DeleteRoleParamsInput, {}>) {
    this.aclService.canPerformActionByPermission(user, 'organization:delete', {
      workspaceId: params.workspaceId,
    })

    return this.roleService.deleteById(params)
  }
}
