import { UseGuards } from '@nestjs/common'
import { type User, WorkspaceSchema, type WorkspaceService, WorkspaceStatusEnum } from '@starter/domain'
import { Controller, Request, RequestInput, Route } from '@starter/nestjs-server-hoisting'

import type { ACLService } from '@/support/access-control'
import { AuthenticatedUser } from '@/support/decorators'
import { AuthGuard } from '@/support/guards'

import {
  type CreateWorkspaceRequest,
  CreateWorkspaceSchema,
  type GetWorkspaceRequest,
  GetWorkspaceSchema,
  type UpdateWorkspaceRequest,
  UpdateWorkspaceSchema,
} from './workspace.controller.schema'

@Controller({
  name: 'Workspace',

  description: 'Handles operations for managing and retrieving workspaces.',

  basePath: 'workspaces',

  schemas: {
    Workspace: {
      schema: WorkspaceSchema,
    },
  },
})
@UseGuards(AuthGuard)
export class WorkspaceController {
  constructor(
    private readonly aclService: ACLService,
    private readonly workspaceService: WorkspaceService,
  ) {}

  @Route({
    summary: 'Get Workspace',

    description: 'Retrieves a single workspace by their ID.',

    method: 'GET',

    path: '/:workspaceId',

    parameters: {
      params: GetWorkspaceSchema.params,
    },

    responses: {
      200: {
        schema: GetWorkspaceSchema.output,
      },
    },
  })
  getWorkspace(@AuthenticatedUser() user: User, @Request() { params }: GetWorkspaceRequest) {
    this.aclService.canPerformActionByPermission(user, 'workspace:read', {
      workspaceId: params.workspaceId,
    })

    return this.workspaceService.getWorkspace(params.workspaceId)
  }

  @Route({
    summary: 'Create Workspace',

    description: 'Creates a new workspace.',

    method: 'POST',

    parameters: {
      body: CreateWorkspaceSchema.body,
    },

    responses: {
      200: {
        schema: CreateWorkspaceSchema.output,
      },
    },
  })
  createWorkspace(@AuthenticatedUser() user: User, @Request() { body }: CreateWorkspaceRequest) {
    this.aclService.canPerformActionByPermission(user, 'workspace:create')

    return this.workspaceService.createWorkspace(user.userId, {
      ...body,
      status: WorkspaceStatusEnum.ACTIVE,
    })
  }

  @Route({
    summary: 'Update Workspace',

    description: 'Updates an existing workspace by their ID.',

    method: 'PATCH',

    path: '/:workspaceId',

    parameters: {
      params: UpdateWorkspaceSchema.params,
      body: UpdateWorkspaceSchema.body,
    },

    responses: {
      200: {
        schema: UpdateWorkspaceSchema.output,
      },
    },
  })
  updateWorkspace(@AuthenticatedUser() user: User, @Request() { params, body }: UpdateWorkspaceRequest) {
    this.aclService.canPerformActionByPermission(user, 'workspace:read', {
      workspaceId: params.workspaceId,
    })

    return this.workspaceService.updateWorkspace(params.workspaceId, body)
  }
}
