import { z } from '@starter/schema'
import {
	BaseSchema,
	OrganizationSchema,
	RoleSchema,
	UserSchema,
} from '@starter/domain'
import {
	createRequestSchema,
	type RequestInput,
} from '@starter/nestjs-server-hoisting'

export const InviteSchema = z.object({
	inviteId: BaseSchema.id('invite'),
	workspaceId: BaseSchema.id('workspace'),
	name: z.string().min(1),
	email: z.email().min(1),
	organizations: z
		.array(
			z.object({
				organizationId: BaseSchema.id('organization'),
				organization: OrganizationSchema,
				roleIds: z.array(BaseSchema.id('role')),
				role: z.array(
					RoleSchema.omit({
						organizations: true,
					}),
				),
			}),
		)
		.min(1),
	token: z.string().min(1).meta({
		description: 'Token used to accept the invite',
		example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
	}),
	expiresAt: z.iso
		.datetime()
		.transform((value) => new Date(value))
		.meta({
			description: 'Date and time when the invite expires',
			example: new Date().toISOString(),
		}),
	status: z
		.enum([
			'PENDING',
			'ACCEPTED',
			'EXPIRED',
			'CANCELLED',
		])
		.default('PENDING'),
	createdAt: BaseSchema.createdAt,
	updatedAt: BaseSchema.updatedAt,
})

export const GetInviteSchema = createRequestSchema({
	params: InviteSchema.pick({
		workspaceId: true,
		inviteId: true,
	}),
	output: InviteSchema.omit({
		token: true,
	}),
})
export type GetInviteRequest = RequestInput<typeof GetInviteSchema>

export const SendInviteSchema = createRequestSchema({
	params: InviteSchema.pick({
		workspaceId: true,
	}),
	body: InviteSchema.pick({
		name: true,
		email: true,
		organizations: true,
	}),
})
export type SendInviteRequest = RequestInput<typeof SendInviteSchema>

export const AcceptInviteSchema = createRequestSchema({
	params: InviteSchema.pick({
		workspaceId: true,
		inviteId: true,
	}),
	body: UserSchema.pick({
		name: true,
		password: true,
	}),
})
export type AcceptInviteRequest = RequestInput<typeof AcceptInviteSchema>

export const ResendInviteSchema = createRequestSchema({
	params: InviteSchema.pick({
		workspaceId: true,
		inviteId: true,
	}),
})
export type ResendInviteRequest = RequestInput<typeof ResendInviteSchema>

export const CancelInviteSchema = createRequestSchema({
	params: InviteSchema.pick({
		workspaceId: true,
		inviteId: true,
	}),
})
export type CancelInviteRequest = RequestInput<typeof CancelInviteSchema>
