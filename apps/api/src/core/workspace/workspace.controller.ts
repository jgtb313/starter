import { UseGuards } from '@nestjs/common'
import { Controller, Route, Request, RequestInput } from '@starter/nestjs-server-hoisting'
import { WorkspaceService, WorkspaceSchema, User, WorkspaceStatusEnum } from '@starter/domain'

import { AuthGuard } from '@/support/guards'
import { ACLService } from '@/support/access-control'
import { AuthenticatedUser } from '@/support/decorators'
import {
  GetWorkspaceParamsSchema,
  GetWorkspaceSchemaOutput,
  CreateWorkspaceBodySchema,
  CreateWorkspaceSchemaOutput,
  UpdateWorkspaceParamsSchema,
  UpdateWorkspaceBodySchema,
  UpdateWorkspaceSchemaOutput,
  GetWorkspaceParamsInput,
  CreateWorkspaceBodyInput,
  UpdateWorkspaceBodyInput,
  UpdateWorkspaceParamsInput,
} from './workspace.controller.schema'

@UseGuards(AuthGuard)
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
      params: GetWorkspaceParamsSchema,
    },

    responses: {
      200: {
        schema: GetWorkspaceSchemaOutput,
      },
    },
  })
  getWorkspace(@AuthenticatedUser() user: User, @Request() { params }: RequestInput<{}, GetWorkspaceParamsInput, {}>) {
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
      body: CreateWorkspaceBodySchema,
    },

    responses: {
      200: {
        schema: CreateWorkspaceSchemaOutput,
      },
    },
  })
  createWorkspace(@AuthenticatedUser() user: User, @Request() { body }: RequestInput<{}, {}, CreateWorkspaceBodyInput>) {
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
      params: UpdateWorkspaceParamsSchema,
      body: UpdateWorkspaceBodySchema,
    },

    responses: {
      200: {
        schema: UpdateWorkspaceSchemaOutput,
      },
    },
  })
  updateWorkspace(
    @AuthenticatedUser() user: User,
    @Request() { params, body }: RequestInput<{}, UpdateWorkspaceParamsInput, UpdateWorkspaceBodyInput>,
  ) {
    this.aclService.canPerformActionByPermission(user, 'workspace:read', {
      workspaceId: params.workspaceId,
    })

    return this.workspaceService.updateById(params.workspaceId, body)
  }
}
