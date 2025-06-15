import { uuid } from '@starter/common'

import { RoleDomain } from '@/core/role/role.domain'
import { RoleInput, RoleStatusEnum } from '@/core/role/role.schema'
import { organizationMocks } from '@/core/organization/organization.mock'

type RoleOverrides = Partial<RoleInput>

export const makeRole = (overrides: RoleOverrides): RoleDomain => {
  const base: RoleInput = {
    roleId: uuid(),
    workspaceId: uuid(),
    name: 'Manager',
    tags: [],
    organizationIds: [],
    permissions: [],
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
    organizationIds: [organizationMocks[0].state.organizationId],
    permissions: ['read_all', 'write_all'],
  }),
  makeRole({
    name: 'Editor',
    status: RoleStatusEnum.INACTIVE,
    tags: ['content', 'edit'],
    organizationIds: [uuid()],
    permissions: ['read_articles', 'edit_articles'],
  }),
  makeRole({
    name: 'Viewer',
    status: RoleStatusEnum.ACTIVE,
    tags: ['read-only'],
    organizationIds: [uuid()],
    permissions: ['read_articles'],
  }),
  makeRole({
    name: 'Analyst',
    status: RoleStatusEnum.INACTIVE,
    tags: ['data', 'reports'],
    organizationIds: [uuid(), uuid()],
    permissions: ['read_reports', 'download_data'],
  }),
  makeRole({
    name: 'Contributor',
    status: RoleStatusEnum.ACTIVE,
    tags: ['content', 'submit'],
    organizationIds: [uuid()],
    permissions: ['submit_articles'],
  }),
  makeRole({
    name: 'Moderator',
    status: RoleStatusEnum.INACTIVE,
    tags: ['community', 'moderation'],
    organizationIds: [uuid()],
    permissions: ['delete_comments', 'ban_users'],
  }),
  makeRole({
    name: 'Support',
    status: RoleStatusEnum.ACTIVE,
    tags: ['helpdesk'],
    organizationIds: [uuid()],
    permissions: ['view_tickets', 'respond_tickets'],
  }),
  makeRole({
    name: 'Operator',
    status: RoleStatusEnum.INACTIVE,
    tags: ['ops'],
    organizationIds: [uuid()],
    permissions: ['trigger_jobs', 'monitor_systems'],
  }),
  makeRole({
    name: 'HR',
    status: RoleStatusEnum.ACTIVE,
    tags: ['employees', 'hiring'],
    organizationIds: [uuid()],
    permissions: ['view_profiles', 'edit_profiles'],
  }),
  makeRole({
    name: 'Developer',
    status: RoleStatusEnum.INACTIVE,
    tags: ['tech', 'code'],
    organizationIds: [uuid()],
    permissions: ['push_code', 'review_prs'],
  }),
]
