import { uuid } from '@starter/common'

import { RoleDomain } from '@/core/role/role.domain'
import { RoleInput, RoleStatusEnum } from '@/core/role/role.schema'

type RoleOverrides = Partial<RoleInput>

export const makeRole = (overrides: RoleOverrides): RoleDomain => {
  const base: RoleInput = {
    roleId: uuid(),
    workspaceId: uuid(),
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
  }),
  makeRole({
    name: 'Editor',
    status: RoleStatusEnum.INACTIVE,
    tags: ['content', 'edit'],
  }),
  makeRole({
    name: 'Viewer',
    status: RoleStatusEnum.ACTIVE,
    tags: ['read-only'],
  }),
  makeRole({
    name: 'Analyst',
    status: RoleStatusEnum.INACTIVE,
    tags: ['data', 'reports'],
  }),
  makeRole({
    name: 'Contributor',
    status: RoleStatusEnum.ACTIVE,
    tags: ['content', 'submit'],
  }),
  makeRole({
    name: 'Moderator',
    status: RoleStatusEnum.INACTIVE,
    tags: ['community', 'moderation'],
  }),
  makeRole({
    name: 'Support',
    status: RoleStatusEnum.ACTIVE,
    tags: ['helpdesk'],
  }),
  makeRole({
    name: 'Operator',
    status: RoleStatusEnum.INACTIVE,
    tags: ['ops'],
  }),
  makeRole({
    name: 'HR',
    status: RoleStatusEnum.ACTIVE,
    tags: ['employees', 'hiring'],
  }),
  makeRole({
    name: 'Developer',
    status: RoleStatusEnum.INACTIVE,
    tags: ['tech', 'code'],
  }),
]
