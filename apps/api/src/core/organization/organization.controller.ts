import { UseGuards } from '@nestjs/common'
import { Controller, Route, Request, RequestInput } from '@starter/nestjs-server-hoisting'
import { OrganizationService, OrganizationSchema, User } from '@starter/domain'

import { AuthGuard } from '@/support/guards'
import { ACLService } from '@/support/access-control'
import { AuthenticatedUser } from '@/support/decorators'
import {
  ListOrganizationsParamsSchema,
  ListOrganizationsQuerySchema,
  ListOrganizationsSchemaOutput,
  GetOrganizationParamsSchema,
  GetOrganizationSchemaOutput,
  CreateOrganizationParamsSchema,
  CreateOrganizationBodySchema,
  CreateOrganizationSchemaOutput,
  UpdateOrganizationParamsSchema,
  UpdateOrganizationBodySchema,
  UpdateOrganizationSchemaOutput,
  DeleteOrganizationParamsSchema,
  ListOrganizationsParamsInput,
  ListOrganizationsQueryInput,
  GetOrganizationParamsInput,
  CreateOrganizationParamsInput,
  CreateOrganizationBodyInput,
  UpdateOrganizationParamsInput,
  UpdateOrganizationBodyInput,
  DeleteOrganizationParamsInput,
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
      params: ListOrganizationsParamsSchema,
      query: ListOrganizationsQuerySchema,
    },

    responses: {
      200: {
        schema: ListOrganizationsSchemaOutput,
      },
    },
  })
  listOrganizations(
    @AuthenticatedUser() user: User,
    @Request() { params, query }: RequestInput<ListOrganizationsQueryInput, ListOrganizationsParamsInput, {}>,
  ) {
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
      params: GetOrganizationParamsSchema,
    },

    responses: {
      200: {
        schema: GetOrganizationSchemaOutput,
      },
    },
  })
  getOrganization(@AuthenticatedUser() user: User, @Request() { params }: RequestInput<{}, GetOrganizationParamsInput, {}>) {
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
      params: CreateOrganizationParamsSchema,
      body: CreateOrganizationBodySchema,
    },

    responses: {
      201: {
        schema: CreateOrganizationSchemaOutput,
      },
    },
  })
  createOrganization(
    @AuthenticatedUser() user: User,
    @Request() { params, body }: RequestInput<{}, CreateOrganizationParamsInput, CreateOrganizationBodyInput>,
  ) {
    console.log({ user, params, body })

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
      params: UpdateOrganizationParamsSchema,
      body: UpdateOrganizationBodySchema,
    },

    responses: {
      200: {
        schema: UpdateOrganizationSchemaOutput,
      },
    },
  })
  updateOrganization(
    @AuthenticatedUser() user: User,
    @Request() { params, body }: RequestInput<{}, UpdateOrganizationParamsInput, UpdateOrganizationBodyInput>,
  ) {
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
      params: DeleteOrganizationParamsSchema,
    },

    responses: {
      204: {
        description: 'Organization has been successfully deleted.',
      },
    },
  })
  deleteOrganization(@AuthenticatedUser() user: User, @Request() { params }: RequestInput<{}, DeleteOrganizationParamsInput, {}>) {
    this.aclService.canPerformActionByPermission(user, 'organization:delete', {
      workspaceId: params.workspaceId,
    })

    return this.organizationService.deleteById(params)
  }
}
