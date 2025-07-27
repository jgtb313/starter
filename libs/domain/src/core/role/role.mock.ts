import { uuid } from '@starter/common'

import { RoleDomain } from '@/core/role/role.domain'
import { RoleInput, RoleStatusEnum } from '@/core/role/role.schema'
import { OrganizationStatusEnum } from '@/core/organization/organization.schema'

type RoleOverrides = Partial<RoleInput>

export const makeRole = (overrides: RoleOverrides): RoleDomain => {
  const base: RoleInput = {
    roleId: uuid(),
    workspaceId: uuid(),
    organizations: [],
    permissions: [],
    name: 'Manager',
    tags: [],
    deletedAt: null,
    status: RoleStatusEnum.ACTIVE,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }

  return new RoleDomain({
    ...base,
    ...overrides,
  })
}

export const roleMocks: RoleDomain[] = [
  makeRole({
    name: 'Admin',
    status: RoleStatusEnum.ACTIVE,
    tags: ['management', 'full-access'],
    organizations: [
      {
        organizationId: uuid(),
        workspaceId: uuid(),
        name: 'Global Corp',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        status: OrganizationStatusEnum.ACTIVE,
      },
      {
        organizationId: uuid(),
        workspaceId: uuid(),
        name: 'Subsidiary A',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        status: OrganizationStatusEnum.ACTIVE,
      },
    ],
    permissions: [
      {
        permissionId: uuid(),
        action: 'workspace:create',
        name: 'Create workspace',
        description: 'Create workspace',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        permissionId: uuid(),
        action: 'user:delete',
        name: 'Delete user',
        description: 'Delete user accounts',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ],
  }),
  makeRole({
    name: 'Editor',
    status: RoleStatusEnum.INACTIVE,
    tags: ['content', 'edit'],
    organizations: [
      {
        organizationId: uuid(),
        workspaceId: uuid(),
        name: 'Content Team Org',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        status: OrganizationStatusEnum.ACTIVE,
      },
    ],
    permissions: [
      {
        permissionId: uuid(),
        action: 'content:edit',
        name: 'Edit content',
        description: 'Edit existing content',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ],
  }),
  makeRole({
    name: 'Viewer',
    status: RoleStatusEnum.ACTIVE,
    tags: ['read-only'],
    organizations: [
      {
        organizationId: uuid(),
        workspaceId: uuid(),
        name: 'Viewer Org',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        status: OrganizationStatusEnum.ACTIVE,
      },
    ],
    permissions: [
      {
        permissionId: uuid(),
        action: 'content:view',
        name: 'View content',
        description: 'View content only',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ],
  }),
  makeRole({
    name: 'Analyst',
    status: RoleStatusEnum.INACTIVE,
    tags: ['data', 'reports'],
    organizations: [
      {
        organizationId: uuid(),
        workspaceId: uuid(),
        name: 'Analytics Org',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        status: OrganizationStatusEnum.INACTIVE,
      },
    ],
    permissions: [
      {
        permissionId: uuid(),
        action: 'reports:view',
        name: 'View reports',
        description: 'Access to reports',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ],
  }),
  makeRole({
    name: 'Contributor',
    status: RoleStatusEnum.ACTIVE,
    tags: ['content', 'submit'],
    organizations: [
      {
        organizationId: uuid(),
        workspaceId: uuid(),
        name: 'Contributors Org',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        status: OrganizationStatusEnum.ACTIVE,
      },
    ],
    permissions: [
      {
        permissionId: uuid(),
        action: 'content:create',
        name: 'Create content',
        description: 'Submit new content',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ],
  }),
  makeRole({
    name: 'Moderator',
    status: RoleStatusEnum.INACTIVE,
    tags: ['community', 'moderation'],
    organizations: [
      {
        organizationId: uuid(),
        workspaceId: uuid(),
        name: 'Community Org',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        status: OrganizationStatusEnum.ACTIVE,
      },
    ],
    permissions: [
      {
        permissionId: uuid(),
        action: 'comments:moderate',
        name: 'Moderate comments',
        description: 'Manage user comments',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ],
  }),
  makeRole({
    name: 'Support',
    status: RoleStatusEnum.ACTIVE,
    tags: ['helpdesk'],
    organizations: [
      {
        organizationId: uuid(),
        workspaceId: uuid(),
        name: 'Support Org',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        status: OrganizationStatusEnum.ACTIVE,
      },
    ],
    permissions: [
      {
        permissionId: uuid(),
        action: 'tickets:manage',
        name: 'Manage tickets',
        description: 'Support ticket management',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ],
  }),
  makeRole({
    name: 'Operator',
    status: RoleStatusEnum.INACTIVE,
    tags: ['ops'],
    organizations: [
      {
        organizationId: uuid(),
        workspaceId: uuid(),
        name: 'Operations Org',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        status: OrganizationStatusEnum.ACTIVE,
      },
    ],
    permissions: [
      {
        permissionId: uuid(),
        action: 'system:operate',
        name: 'Operate system',
        description: 'Operational access',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ],
  }),
  makeRole({
    name: 'HR',
    status: RoleStatusEnum.ACTIVE,
    tags: ['employees', 'hiring'],
    organizations: [
      {
        organizationId: uuid(),
        workspaceId: uuid(),
        name: 'HR Org',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        status: OrganizationStatusEnum.ACTIVE,
      },
    ],
    permissions: [
      {
        permissionId: uuid(),
        action: 'employee:manage',
        name: 'Manage employees',
        description: 'Employee data management',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ],
  }),
  makeRole({
    name: 'Developer',
    status: RoleStatusEnum.INACTIVE,
    tags: ['tech', 'code'],
    organizations: [
      {
        organizationId: uuid(),
        workspaceId: uuid(),
        name: 'Dev Org',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        status: OrganizationStatusEnum.ACTIVE,
      },
    ],
    permissions: [
      {
        permissionId: uuid(),
        action: 'code:commit',
        name: 'Commit code',
        description: 'Code commit access',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ],
  }),
]
