import { UseGuards } from '@nestjs/common'
import { Controller, Request, Route } from '@starter/nestjs-server-hoisting'

import { AuthGuard } from '@/support/guards'

import {
	type AcceptInviteRequest,
	AcceptInviteSchema,
	type CancelInviteRequest,
	CancelInviteSchema,
	type GetInviteRequest,
	GetInviteSchema,
	InviteSchema,
	type ResendInviteRequest,
	ResendInviteSchema,
	type SendInviteRequest,
	SendInviteSchema,
} from '@/core/invite/invite.controller.schema'

@Controller({
	name: 'Invite',
	description: 'Provides functionalities for user invitations.',
	basePath: 'workspaces/:workspaceId/invites',
	schemas: {
		Invite: {
			schema: InviteSchema,
		},
	},
})
export class InviteController {
	@Route({
		summary: 'Send Invite',
		description: 'Creates a new invite for a user in a workspace.',
		method: 'POST',
		parameters: {
			params: SendInviteSchema.params,
			body: SendInviteSchema.body,
		},
		responses: {
			201: {
				schema: SendInviteSchema.output,
			},
			409: {
				description: 'E-mail {{email}} has already been invited.',
			},
		},
	})
	@UseGuards(AuthGuard)
	sendInvite(@Request() { params, body }: SendInviteRequest) {
		return
	}

	@Route({
		summary: 'Accept Invite',
		description: 'Accepts a pending invite and creates the user account.',
		method: 'POST',
		path: '/:inviteId/accept',
		parameters: {
			params: AcceptInviteSchema.params,
			body: AcceptInviteSchema.body,
		},
		responses: {
			200: {
				schema: AcceptInviteSchema.output,
			},
			401: {
				description: 'Invite {{inviteId}} is invalid.',
			},
			404: {
				description: 'Invite {{inviteId}} not found.',
			},
		},
	})
	acceptInvite(@Request() { params, body }: AcceptInviteRequest) {
		return
	}

	@Route({
		summary: 'Resend Invite',
		description: 'Resends an existing invite email.',
		method: 'POST',
		path: '/:inviteId/resend',
		parameters: {
			params: ResendInviteSchema.params,
		},
		responses: {
			200: {
				schema: ResendInviteSchema.output,
			},
			404: {
				description: 'Invite {{inviteId}} not found.',
			},
			401: {
				description: 'Invite {{inviteId}} has expired.',
			},
		},
	})
	@UseGuards(AuthGuard)
	resendInvite(@Request() { params }: ResendInviteRequest) {
		return
	}

	@Route({
		summary: 'Cancel Invite',
		description: 'Cancels a pending invite.',
		method: 'DELETE',
		path: '/:inviteId',
		parameters: {
			params: CancelInviteSchema.params,
		},
		responses: {
			200: {
				schema: CancelInviteSchema.output,
			},
			404: {
				description: 'Invite {{inviteId}} not found.',
			},
		},
	})
	@UseGuards(AuthGuard)
	cancelInvite(@Request() { params }: CancelInviteRequest) {
		return
	}

	@Route({
		summary: 'Get Invite',
		description: 'Retrieves details of a specific invite.',
		method: 'GET',
		path: '/:inviteId',
		parameters: {
			params: GetInviteSchema.params,
		},
		responses: {
			200: {
				schema: GetInviteSchema.output,
			},
			404: {
				description: 'Invite {{inviteId}} not found.',
			},
			401: {
				description: 'Invite {{inviteId}} has expired.',
			},
		},
	})
	@UseGuards(AuthGuard)
	getInvite(@Request() { params }: GetInviteRequest) {
		return
	}
}
