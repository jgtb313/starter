import { z } from '@starter/schema'
import { WorkspaceSchema, WorskapceAddressSchema } from '@starter/domain'
import {
	createRequestSchema,
	type RequestInput,
} from '@starter/nestjs-server-hoisting'

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

export const DefineWorkspaceAddressSchema = createRequestSchema({
	params: WorkspaceSchema.pick({
		workspaceId: true,
	}),
	body: WorskapceAddressSchema.omit({
		location: true,
	}),
	output: WorkspaceSchema,
})
export type DefineWorkspaceAddressRequest = RequestInput<
	typeof DefineWorkspaceAddressSchema
>

export const DeleteWorkspaceAddressSchema = createRequestSchema({
	params: WorkspaceSchema.pick({
		workspaceId: true,
	}),
})
export type DeleteWorkspaceAddressRequest = RequestInput<
	typeof DeleteWorkspaceAddressSchema
>
