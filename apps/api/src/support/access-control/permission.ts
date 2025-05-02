import { z } from '@starter/schema'

export const PERMISSION_SUBJECT_ACTIONS = {
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
} as const

export type PermissionSubject = keyof typeof PERMISSION_SUBJECT_ACTIONS
export type Permission = (typeof PERMISSION_SUBJECT_ACTIONS)[PermissionSubject][number]['key']

export const PERMISSIONS = new Set(
  Object.values(PERMISSION_SUBJECT_ACTIONS).flatMap((subjectActions) => subjectActions.map((subjectAction) => subjectAction.key)) as Permission[],
)

export const PermissionSubjectSchema = z.object({
  key: z.enum([...PERMISSIONS]),
  subject: z.enum(Object.keys(PERMISSION_SUBJECT_ACTIONS)),
  action: z.string().meta({
    description: 'Depends on the subject. Common values include: read, write, update, delete.',
    examples: ['read'],
  }),
  title: z.string().meta({
    description: 'Human-readable name of the permission.',
  }),
  description: z.string().meta({
    description: 'Detailed explanation of what the permission allows within the system.',
  }),
})

export const PermissionsSchema = z
  .array(z.string() as z.ZodType<Permission>)
  .refine((value) => value.every((permission) => PERMISSIONS.has(permission))) as z.ZodType<Permission[]>
