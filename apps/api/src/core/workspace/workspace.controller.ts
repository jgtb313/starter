import { UseGuards } from '@nestjs/common'
import { Controller, Route, Request, RequestInput } from '@starter/nestjs-server-hoisting'
import { WorkspaceService, WorkspaceSchema, User, WorkspaceStatusEnum } from '@starter/domain'

import { AuthGuard } from '@/support/guards'
import { ACLService } from '@/support/access-control'
import { AuthenticatedUser } from '@/support/decorators'
import {
  GetWorkspaceSchema,
  CreateWorkspaceSchema,
  UpdateWorkspaceSchema,
  GetWorkspaceRequest,
  CreateWorkspaceRequest,
  UpdateWorkspaceRequest,
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

    return this.workspaceService.findById(params.workspaceId)
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

    return this.workspaceService.create(user, {
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

    return this.workspaceService.updateById(params.workspaceId, body)
  }
}
