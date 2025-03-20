import { z } from '@starter/schema'

const SUBJECT_ACTIONS = {
  user: ['create', 'read', 'update', 'delete'],
  workspace: ['create', 'read', 'update', 'delete'],
  organization: ['create', 'read', 'update', 'delete'],
  role: ['create', 'read', 'update', 'delete'],
} as const

export type PermissionSubjects = keyof typeof SUBJECT_ACTIONS
export type PermissionActions<T extends PermissionSubjects> = (typeof SUBJECT_ACTIONS)[T][number]
export type Permission = {
  [S in PermissionSubjects]: `${S}:${PermissionActions<S>}`
}[PermissionSubjects]

export const PERMISSIONS = new Set(
  Object.entries(SUBJECT_ACTIONS).flatMap(([subject, actions]) => actions.map((action) => `${subject}:${action}`)) as Permission[],
)

export const PermissionsSchema = z.array(z.string()).refine(
  (value) => value.every((permission) => PERMISSIONS.has(permission as Permission)),
  (value) => ({
    message: `Invalid enum value(s). Expected ${Array.from(PERMISSIONS)
      .map((permission) => `'${permission}'`)
      .join(' | ')}, received ${value
      .filter((permission) => !PERMISSIONS.has(permission as Permission))
      .map((permission) => `'${permission}'`)
      .join(', ')}`,
  }),
) as z.ZodType<Permission[]>
