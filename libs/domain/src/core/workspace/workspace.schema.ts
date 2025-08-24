import { z } from '@starter/schema'

import { type BaseSchema, CreatedAt, ID, UpdatedAt } from '@/support/schema'

export enum WorkspaceStatusEnum {
	ACTIVE = 'ACTIVE',
	INACTIVE = 'INACTIVE',
}

const WorkspaceId = ID('workspace')

const Name = z.string().min(1)

const Integrations = z
	.object({
		recurrenceCustomerId: z.string().min(1),
	})
	.nullish()
	.transform((value) => value ?? null)

const Status = z.enum(WorkspaceStatusEnum).default(WorkspaceStatusEnum.ACTIVE)

export const WorkspaceSchema = z.object({
	workspaceId: WorkspaceId,
	name: Name,
	integrations: Integrations,
	status: Status,
	createdAt: CreatedAt,
	updatedAt: UpdatedAt,
})
export type Workspace = z.infer<typeof WorkspaceSchema>
export type WorkspaceInput = z.input<typeof WorkspaceSchema>
export type BaseWorkspace = BaseSchema<'workspaceId', Workspace>
