import { BaseDomain } from '@/support/base-domain'
import {
	type Workspace,
	type WorkspaceInput,
	WorkspaceSchema,
} from '@/core/workspace/workspace.schema'

export class WorkspaceDomain extends BaseDomain<Workspace, WorkspaceInput> {
	constructor(workspace: WorkspaceInput) {
		super(WorkspaceSchema, workspace)
	}
}
