import { z } from '@starter/schema'

export const PERMISSION_SUBJECT_ACTIONS = {
	user: [
		{
			permissionId: 'user:create',
			subject: 'user',
			action: 'create',
			title: 'Create User',
			description: 'Allows creating new users in the system',
		},
		{
			permissionId: 'user:read',
			subject: 'user',
			action: 'read',
			title: 'Read User',
			description: 'Allows viewing user details',
		},
		{
			permissionId: 'user:update',
			subject: 'user',
			action: 'update',
			title: 'Update User',
			description: 'Allows editing user information',
		},
		{
			permissionId: 'user:delete',
			subject: 'user',
			action: 'delete',
			title: 'Delete User',
			description: 'Allows removing users from the system',
		},
	],
	workspace: [
		{
			permissionId: 'workspace:manage',
			subject: 'workspace',
			action: 'manage',
			title: 'Manage Workspace',
			description: 'Allows managing workspace settings',
		},
		{
			permissionId: 'workspace:create',
			subject: 'workspace',
			action: 'create',
			title: 'Create Workspace',
			description: 'Allows creating new workspaces',
		},
		{
			permissionId: 'workspace:read',
			subject: 'workspace',
			action: 'read',
			title: 'Read Workspace',
			description: 'Allows viewing workspace details',
		},
		{
			permissionId: 'workspace:update',
			subject: 'workspace',
			action: 'update',
			title: 'Update Workspace',
			description: 'Allows modifying workspace information',
		},
		{
			permissionId: 'workspace:delete',
			subject: 'workspace',
			action: 'delete',
			title: 'Delete Workspace',
			description: 'Allows removing workspaces',
		},
	],
	organization: [
		{
			permissionId: 'organization:manage',
			subject: 'organization',
			action: 'manage',
			title: 'Manage Organization',
			description: 'Allows managing organization settings',
		},
		{
			permissionId: 'organization:create',
			subject: 'organization',
			action: 'create',
			title: 'Create Organization',
			description: 'Allows creating new organizations',
		},
		{
			permissionId: 'organization:read',
			subject: 'organization',
			action: 'read',
			title: 'Read Organization',
			description: 'Allows viewing organization details',
		},
		{
			permissionId: 'organization:update',
			subject: 'organization',
			action: 'update',
			title: 'Update Organization',
			description: 'Allows modifying organization information',
		},
		{
			permissionId: 'organization:delete',
			subject: 'organization',
			action: 'delete',
			title: 'Delete Organization',
			description: 'Allows removing organizations',
		},
	],
	role: [
		{
			permissionId: 'role:create',
			subject: 'role',
			action: 'create',
			title: 'Create Role',
			description: 'Allows creating new roles',
		},
		{
			permissionId: 'role:read',
			subject: 'role',
			action: 'read',
			title: 'Read Role',
			description: 'Allows viewing role details',
		},
		{
			permissionId: 'role:update',
			subject: 'role',
			action: 'update',
			title: 'Update Role',
			description: 'Allows modifying role information',
		},
		{
			permissionId: 'role:delete',
			subject: 'role',
			action: 'delete',
			title: 'Delete Role',
			description: 'Allows removing roles',
		},
	],
	invoice: [
		{
			permissionId: 'invoice:read',
			subject: 'invoice',
			action: 'read',
			title: 'Read Invoice',
			description: 'Allows viewing invoice details and lists',
		},
	],

	subscription: [
		{
			permissionId: 'subscription:create',
			subject: 'subscription',
			action: 'create',
			title: 'Create Subscription',
			description: 'Allows creating new subscriptions',
		},
		{
			permissionId: 'subscription:read',
			subject: 'subscription',
			action: 'read',
			title: 'Read Subscription',
			description: 'Allows viewing subscription details',
		},
		{
			permissionId: 'subscription:update:plan',
			subject: 'subscription',
			action: 'update:plan',
			title: 'Change Subscription Plan',
			description: 'Allows changing subscription plan',
		},
		{
			permissionId: 'subscription:update:payment-method',
			subject: 'subscription',
			action: 'update:payment-method',
			title: 'Change Subscription Payment Method',
			description: 'Allows changing subscription payment method',
		},
		{
			permissionId: 'subscription:delete',
			subject: 'subscription',
			action: 'delete',
			title: 'Cancel Subscription',
			description: 'Allows canceling subscriptions',
		},
	],
} as const

export type PermissionSubject = keyof typeof PERMISSION_SUBJECT_ACTIONS
export type Permission =
	(typeof PERMISSION_SUBJECT_ACTIONS)[PermissionSubject][number]['permissionId']

export const PERMISSIONS = new Set(
	Object.values(PERMISSION_SUBJECT_ACTIONS).flatMap((subjectActions) =>
		subjectActions.map((subjectAction) => subjectAction.permissionId),
	) as Permission[],
)

export const PermissionSubjectSchema = z.object({
	key: z.enum([
		...PERMISSIONS,
	]),
	subject: z.enum(Object.keys(PERMISSION_SUBJECT_ACTIONS)),
	action: z.string().meta({
		description:
			'Depends on the subject. Common values include: read, write, update, delete.',
		examples: [
			'read',
		],
	}),
	title: z.string().meta({
		description: 'Human-readable name of the permission.',
	}),
	description: z.string().meta({
		description:
			'Detailed explanation of what the permission allows within the system.',
	}),
})

export const PermissionsSchema = z
	.array(z.string() as z.ZodType<Permission>)
	.refine((value) =>
		value.every((permission) => PERMISSIONS.has(permission)),
	) as z.ZodType<Permission[]>
