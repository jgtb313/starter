import { ConflictException } from '@starter/nestjs-error-handling'

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

	isActive() {
		return this.state.status === 'ACTIVE'
	}

	isInactive() {
		return this.state.status === 'INACTIVE'
	}

	markAsActive() {
		this.checkIfCanBeActive()
		this.state.status = 'ACTIVE'
	}

	markAsInactive() {
		this.checkIfCanBeInactive()
		this.state.status = 'INACTIVE'
	}

	private checkIfCanBeActive() {
		if (this.isActive()) {
			throw new ConflictException(`This workspace is already active.`)
		}
	}

	private checkIfCanBeInactive() {
		if (this.isInactive()) {
			throw new ConflictException(`This workspace is already inactive.`)
		}
	}
}
