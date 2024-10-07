export const Permissions = [
  {
    module: 'workspace',
    name: 'workspace:read'
  },
  {
    module: 'workspace',
    name: 'workspace:create'
  },
  {
    module: 'workspace',
    name: 'workspace:edit'
  },
  {
    module: 'workspace',
    name: 'workspace:activate'
  },
  {
    module: 'workspace',
    name: 'workspace:deactivate'
  },
  {
    module: 'workspace',
    name: 'workspace:delete'
  },

  {
    module: 'organization',
    name: 'organization:read'
  },
  {
    module: 'organization',
    name: 'organization:create'
  },
  {
    module: 'organization',
    name: 'organization:edit'
  },
  {
    module: 'organization',
    name: 'organization:delete'
  },

  {
    module: 'user',
    name: 'user:read'
  },
  {
    module: 'user',
    name: 'user:create'
  },
  {
    module: 'user',
    name: 'user:edit'
  },
  {
    module: 'user',
    name: 'user:activate'
  },
  {
    module: 'user',
    name: 'user:deactivate'
  },
  {
    module: 'user',
    name: 'user:delete'
  },

  {
    module: 'role',
    name: 'role:create'
  },
  {
    module: 'role',
    name: 'role:read'
  },
  {
    module: 'role',
    name: 'role:edit'
  },
  {
    module: 'role',
    name: 'role:delete'
  },
  {
    module: 'plan',
    name: 'plan:create'
  },
  {
    module: 'plan',
    name: 'plan:read'
  },
  {
    module: 'plan',
    name: 'plan:edit'
  },
  {
    module: 'plan',
    name: 'plan:delete'
  },
  {
    module: 'subscription',
    name: 'subscription:create'
  },
  {
    module: 'subscription',
    name: 'subscription:read'
  },
  {
    module: 'subscription',
    name: 'subscription:edit'
  },
  {
    module: 'subscription',
    name: 'subscription:delete'
  }
] as const

type PermissionTuple = typeof Permissions

export type Permissions = PermissionTuple[number]['name']
