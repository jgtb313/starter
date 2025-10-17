import { z } from '@starter/schema'
import { BaseSchema, UserSchema } from '@starter/domain'
import {
	createRequestSchema,
	type RequestInput,
} from '@starter/nestjs-server-hoisting'

export const InviteSchema = z.object({
	inviteId: BaseSchema.id('invite'),
	workspaceId: BaseSchema.id('workspace'),
	name: z.string().min(1),
	email: z.email(),
	organizations: z
		.array(
			z.object({
				organizationId: BaseSchema.id('organization'),
				roleIds: z.array(BaseSchema.id('role')),
			}),
		)
		.min(1),
	token: z.string().min(1),
	status: z.enum([
		'PENDING',
		'ACCEPTED',
		'CANCELLED',
	]),
	createdAt: BaseSchema.createdAt,
	updatedAt: BaseSchema.updatedAt,
})

export const GetInviteSchema = createRequestSchema({
	params: z.object({
		workspaceId: BaseSchema.id('workspace'),
		inviteId: BaseSchema.id('invite'),
	}),
	output: InviteSchema.omit({
		token: true,
	}),
})
export type GetInviteRequest = RequestInput<typeof GetInviteSchema>

export const SendInviteSchema = createRequestSchema({
	params: z.object({
		workspaceId: BaseSchema.id('workspace'),
	}),
	body: InviteSchema.pick({
		name: true,
		email: true,
		organizations: true,
	}),
})
export type SendInviteRequest = RequestInput<typeof SendInviteSchema>

export const AcceptInviteSchema = createRequestSchema({
	params: z.object({
		workspaceId: BaseSchema.id('workspace'),
		inviteId: BaseSchema.id('invite'),
	}),
	body: UserSchema.pick({
		password: true,
	}),
})
export type AcceptInviteRequest = RequestInput<typeof AcceptInviteSchema>

export const ResendInviteSchema = createRequestSchema({
	params: z.object({
		workspaceId: BaseSchema.id('workspace'),
		inviteId: BaseSchema.id('invite'),
	}),
})
export type ResendInviteRequest = RequestInput<typeof ResendInviteSchema>

export const CancelInviteSchema = createRequestSchema({
	params: z.object({
		workspaceId: BaseSchema.id('workspace'),
		inviteId: BaseSchema.id('invite'),
	}),
})
export type CancelInviteRequest = RequestInput<typeof CancelInviteSchema>
