import { UseGuards } from '@nestjs/common'
import { Controller, Route, Request } from '@starter/nestjs-server-hoisting'
import { OrganizationService, OrganizationSchema, User } from '@starter/domain'

import { AuthGuard } from '@/support/guards'
import { ACLService } from '@/support/access-control'
import { AuthenticatedUser } from '@/support/decorators'
import {
  ListOrganizationsSchema,
  GetOrganizationSchema,
  CreateOrganizationSchema,
  UpdateOrganizationSchema,
  DeleteOrganizationSchema,
  ListOrganizationsRequest,
  GetOrganizationRequest,
  CreateOrganizationRequest,
  UpdateOrganizationRequest,
  DeleteOrganizationRequest,
} from './organization.controller.schema'

@UseGuards(AuthGuard)
@Controller({
  name: 'Organization',

  description: 'Handles operations for managing and retrieving organizations.',

  basePath: 'workspaces/:workspaceId/organizations',

  schemas: {
    Organization: {
      schema: OrganizationSchema,
    },
  },
})
export class OrganizationController {
  constructor(
    private readonly aclService: ACLService,
    private readonly organizationService: OrganizationService,
  ) {}

  @Route({
    summary: 'List Organizations',

    description: 'Retrieves a list of organizations.',

    method: 'GET',

    parameters: {
      params: ListOrganizationsSchema.params,
      query: ListOrganizationsSchema.query,
    },

    responses: {
      200: {
        schema: ListOrganizationsSchema.output,
      },
    },
  })
  listOrganizations(@AuthenticatedUser() user: User, @Request() { params, query }: ListOrganizationsRequest) {
    this.aclService.canPerformActionByPermission(user, 'organization:read', {
      workspaceId: params.workspaceId,
    })

    return this.organizationService.findAll({
      ...query,
      workspaceId: params.workspaceId,
    })
  }

  @Route({
    summary: 'Get Organization',

    description: 'Retrieves a single organization by their ID.',

    method: 'GET',

    path: '/:organizationId',

    parameters: {
      params: GetOrganizationSchema.params,
    },

    responses: {
      200: {
        schema: GetOrganizationSchema.output,
      },
    },
  })
  getOrganization(@AuthenticatedUser() user: User, @Request() { params }: GetOrganizationRequest) {
    this.aclService.canPerformActionByPermission(user, 'organization:read', {
      workspaceId: params.workspaceId,
    })

    return this.organizationService.findById(params)
  }

  @Route({
    summary: 'Create Organization',

    description: 'Creates a new organization.',

    method: 'POST',

    parameters: {
      params: CreateOrganizationSchema.params,
      body: CreateOrganizationSchema.body,
    },

    responses: {
      201: {
        schema: CreateOrganizationSchema.output,
      },
    },
  })
  createOrganization(@AuthenticatedUser() user: User, @Request() { params, body }: CreateOrganizationRequest) {
    this.aclService.canPerformActionByPermission(user, 'organization:create', {
      workspaceId: params.workspaceId,
    })

    return this.organizationService.create({
      ...body,
      workspaceId: params.workspaceId,
    })
  }

  @Route({
    summary: 'Update Organization',

    description: 'Updates an existing organization by their ID.',

    method: 'PATCH',

    path: '/:organizationId',

    parameters: {
      params: UpdateOrganizationSchema.params,
      body: UpdateOrganizationSchema.body,
    },

    responses: {
      200: {
        schema: UpdateOrganizationSchema.output,
      },
    },
  })
  updateOrganization(@AuthenticatedUser() user: User, @Request() { params, body }: UpdateOrganizationRequest) {
    this.aclService.canPerformActionByPermission(user, 'organization:update', {
      workspaceId: params.workspaceId,
    })

    return this.organizationService.updateById(params, {
      ...body,
    })
  }

  @Route({
    summary: 'Delete Organization',

    description: 'Deletes a organization by their ID.',

    method: 'DELETE',

    path: '/:organizationId',

    parameters: {
      params: DeleteOrganizationSchema.params,
    },

    responses: {
      204: {
        description: 'Organization has been successfully deleted.',
      },
    },
  })
  deleteOrganization(@AuthenticatedUser() user: User, @Request() { params }: DeleteOrganizationRequest) {
    this.aclService.canPerformActionByPermission(user, 'organization:delete', {
      workspaceId: params.workspaceId,
    })

    return this.organizationService.deleteById(params)
  }
}
