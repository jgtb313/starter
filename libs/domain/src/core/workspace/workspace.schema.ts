import { z } from '@starter/schema'

import { BaseSchema } from '@/support/base-schema'

const WorkspaceId = BaseSchema.id('workspace')

const Name = z.string().min(1)

const Integrations = z
	.object({
		recurrenceCustomerId: z.string().min(1),
	})
	.nullish()
	.transform((value) => value ?? null)

const Status = z
	.enum([
		'ACTIVE',
		'INACTIVE',
	])
	.default('ACTIVE')
export type WorkspaceStatus = z.infer<typeof Status>

export const WorkspaceSchema = z.object({
	workspaceId: WorkspaceId,
	name: Name,
	integrations: Integrations,
	status: Status,
	createdAt: BaseSchema.createdAt,
	updatedAt: BaseSchema.updatedAt,
})
export type Workspace = z.infer<typeof WorkspaceSchema>
export type WorkspaceInput = z.input<typeof WorkspaceSchema>
export type BaseWorkspace = BaseSchema<
	Workspace,
	{
		optional: [
			'workspaceId',
		]
	}
>
