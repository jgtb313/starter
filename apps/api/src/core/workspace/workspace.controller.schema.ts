import { WorkspaceSchema } from '@starter/domain'
import {
	createRequestSchema,
	type RequestInput,
} from '@starter/nestjs-server-hoisting'
import { z } from '@starter/schema'

export const GetWorkspaceSchema = createRequestSchema({
	params: WorkspaceSchema.pick({
		workspaceId: true,
	}),
	output: WorkspaceSchema,
})
export type GetWorkspaceRequest = RequestInput<typeof GetWorkspaceSchema>

export const CreateWorkspaceSchema = createRequestSchema({
	body: WorkspaceSchema.pick({
		name: true,
	}),
	output: WorkspaceSchema,
})
export type CreateWorkspaceRequest = RequestInput<typeof CreateWorkspaceSchema>

export const UpdateWorkspaceSchema = createRequestSchema({
	params: WorkspaceSchema.pick({
		workspaceId: true,
	}),
	body: WorkspaceSchema.pick({
		name: true,
		status: true,
	}).partial(),
	output: WorkspaceSchema,
})
export type UpdateWorkspaceRequest = RequestInput<typeof UpdateWorkspaceSchema>
