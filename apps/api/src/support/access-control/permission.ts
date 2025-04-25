import { z } from '@starter/schema'

export type PermissionSubjectAction = {
  key: string
  subject: (typeof PERMISSION_SUBJECT)[number]
  action: (typeof PERMISSION_ACTION)[number]
  title: string
  description: string
}

export const PERMISSION_SUBJECT = ['user', 'workspace', 'organization', 'role', 'category', 'plan'] as const

export const PERMISSION_ACTION = ['manage', 'create', 'read', 'update', 'delete'] as const

export const PERMISSION_SUBJECT_ACTIONS: Record<(typeof PERMISSION_SUBJECT)[number], PermissionSubjectAction[]> = {
  user: [
    { key: 'user:create', subject: 'user', action: 'create', title: 'Create User', description: 'Allows creating new users in the system' },
    { key: 'user:read', subject: 'user', action: 'read', title: 'Read User', description: 'Allows viewing user details' },
    { key: 'user:update', subject: 'user', action: 'update', title: 'Update User', description: 'Allows editing user information' },
    { key: 'user:delete', subject: 'user', action: 'delete', title: 'Delete User', description: 'Allows removing users from the system' },
  ],
  workspace: [
    { key: 'workspace:manage', subject: 'workspace', action: 'manage', title: 'Manage Workspace', description: 'Allows managing workspace settings' },
    { key: 'workspace:create', subject: 'workspace', action: 'create', title: 'Create Workspace', description: 'Allows creating new workspaces' },
    { key: 'workspace:read', subject: 'workspace', action: 'read', title: 'Read Workspace', description: 'Allows viewing workspace details' },
    {
      key: 'workspace:update',
      subject: 'workspace',
      action: 'update',
      title: 'Update Workspace',
      description: 'Allows modifying workspace information',
    },
    { key: 'workspace:delete', subject: 'workspace', action: 'delete', title: 'Delete Workspace', description: 'Allows removing workspaces' },
  ],
  organization: [
    {
      key: 'organization:manage',
      subject: 'organization',
      action: 'manage',
      title: 'Manage Organization',
      description: 'Allows managing organization settings',
    },
    {
      key: 'organization:create',
      subject: 'organization',
      action: 'create',
      title: 'Create Organization',
      description: 'Allows creating new organizations',
    },
    {
      key: 'organization:read',
      subject: 'organization',
      action: 'read',
      title: 'Read Organization',
      description: 'Allows viewing organization details',
    },
    {
      key: 'organization:update',
      subject: 'organization',
      action: 'update',
      title: 'Update Organization',
      description: 'Allows modifying organization information',
    },
    {
      key: 'organization:delete',
      subject: 'organization',
      action: 'delete',
      title: 'Delete Organization',
      description: 'Allows removing organizations',
    },
  ],
  role: [
    { key: 'role:create', subject: 'role', action: 'create', title: 'Create Role', description: 'Allows creating new roles' },
    { key: 'role:read', subject: 'role', action: 'read', title: 'Read Role', description: 'Allows viewing role details' },
    { key: 'role:update', subject: 'role', action: 'update', title: 'Update Role', description: 'Allows modifying role information' },
    { key: 'role:delete', subject: 'role', action: 'delete', title: 'Delete Role', description: 'Allows removing roles' },
  ],
  category: [
    { key: 'category:create', subject: 'category', action: 'create', title: 'Create Category', description: 'Allows creating new categories' },
    { key: 'category:read', subject: 'category', action: 'read', title: 'Read Category', description: 'Allows viewing category details' },
    { key: 'category:update', subject: 'category', action: 'update', title: 'Update Category', description: 'Allows modifying category information' },
    { key: 'category:delete', subject: 'category', action: 'delete', title: 'Delete Category', description: 'Allows removing categories' },
  ],
  plan: [
    { key: 'plan:create', subject: 'plan', action: 'create', title: 'Create Plan', description: 'Allows creating new plans' },
    { key: 'plan:read', subject: 'plan', action: 'read', title: 'Read Plan', description: 'Allows viewing plan details' },
    { key: 'plan:update', subject: 'plan', action: 'update', title: 'Update Plan', description: 'Allows modifying plan information' },
    { key: 'plan:delete', subject: 'plan', action: 'delete', title: 'Delete Plan', description: 'Allows removing plans' },
  ],
}

export type PermissionSubjects = keyof typeof PERMISSION_SUBJECT_ACTIONS
export type PermissionActions<T extends PermissionSubjects> = (typeof PERMISSION_SUBJECT_ACTIONS)[T][number]['key']
export type Permission = {
  [S in PermissionSubjects]: `${S}:${PermissionActions<S>}`
}[PermissionSubjects]

export const PERMISSIONS = new Set(
  Object.entries(PERMISSION_SUBJECT_ACTIONS).flatMap(([_, subjectActions]) =>
    subjectActions.map((subjectAction) => subjectAction.key),
  ) as Permission[],
)

export const PermissionSubjectActionSchema = z.object({
  key: z.string(),
  subject: z.enum(PERMISSION_SUBJECT),
  action: z.enum(PERMISSION_ACTION),
  title: z.string(),
  description: z.string(),
})

export const PermissionsSchema = z.array(z.string() as z.ZodType<Permission>).refine(
  (value) => value.every((permission) => PERMISSIONS.has(permission)),
  // (value) => ({
  //   message: `Invalid enum value(s). Expected ${Array.from(PERMISSIONS)
  //     .map((permission) => `'${permission}'`)
  //     .join(' | ')}, received ${value
  //     .filter((permission) => !PERMISSIONS.has(permission))
  //     .map((permission) => `'${permission}'`)
  //     .join(', ')}`,
  // }),
) as z.ZodType<Permission[]>
