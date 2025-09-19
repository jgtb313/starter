import { BaseSchema } from '@starter/domain'
import {
	createRequestSchema,
	type RequestInput,
} from '@starter/nestjs-server-hoisting'
import { z } from '@starter/schema'

export const InviteSchema = z.object({
	inviteId: z.uuid(), // ID público do convite
	email: z.email(), // e-mail do convidado
	name: z.string().min(2).max(100).optional(), // nome do usuário convidado
	token: z.string().min(20).max(255), // token de aceite
	workspaceId: z.uuid(),
	organizations: z.array(z.uuid()).optional(),
	roles: z.array(z.uuid()).optional(),
	status: z.enum([
		'PENDING',
		'ACCEPTED',
		'CANCELLED',
	]),
	createdAt: BaseSchema.createdAt,
	updatedAt: BaseSchema.updatedAt,
})

// 1. Criar convite (POST /workspaces/:workspaceId/invites)
export const SendInviteSchema = createRequestSchema({
	params: z.object({
		workspaceId: z.uuid(),
	}),
	body: z.object({
		email: z.string().email().min(5).max(255),
		organizations: z.array(z.uuid()).min(1).optional(),
		roles: z.array(z.uuid()).min(1).optional(),
	}),
	output: InviteSchema,
})
export type SendInviteRequest = RequestInput<typeof SendInviteSchema>

// 2. Aceitar convite (POST /workspaces/:workspaceId/invites/:inviteId/accept)
export const AcceptInviteSchema = createRequestSchema({
	params: z.object({
		workspaceId: z.uuid(),
		inviteId: z.uuid(),
	}),
	body: z.object({
		name: z.string().min(2).max(100),
		password: z.string().min(6).max(100),
	}),
	output: z.object({
		accessToken: z.string(),
		userId: z.uuid(),
	}),
})
export type AcceptInviteRequest = RequestInput<typeof AcceptInviteSchema>

// 3. Reenviar convite (POST /workspaces/:workspaceId/invites/:inviteId/resend)
export const ResendInviteSchema = createRequestSchema({
	params: z.object({
		workspaceId: z.uuid(),
		inviteId: z.uuid(),
	}),
	output: InviteSchema,
})
export type ResendInviteRequest = RequestInput<typeof ResendInviteSchema>

// 4. Cancelar convite (DELETE /workspaces/:workspaceId/invites/:inviteId)
export const CancelInviteSchema = createRequestSchema({
	params: z.object({
		workspaceId: z.uuid(),
		inviteId: z.uuid(),
	}),
	output: z.object({
		success: z.boolean(),
	}),
})
export type CancelInviteRequest = RequestInput<typeof CancelInviteSchema>

// 5. Consultar convite (GET /workspaces/:workspaceId/invites/:inviteId)
export const GetInviteSchema = createRequestSchema({
	params: z.object({
		workspaceId: z.uuid(),
		inviteId: z.uuid(),
	}),
	output: InviteSchema,
})
export type GetInviteRequest = RequestInput<typeof GetInviteSchema>
