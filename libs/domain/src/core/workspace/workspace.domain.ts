import { ConflictException } from '@starter/nestjs-error-handling'

import { BaseDomain } from '@/support/base-domain'
import {
	type Workspace,
	WorkspaceSchema,
} from '@/core/workspace/workspace.schema'

export class WorkspaceDomain extends BaseDomain<Workspace> {
	constructor(workspace: Workspace) {
		super(WorkspaceSchema, workspace)
	}

	isTrial() {
		return this.state.status === 'TRIAL'
	}

	isActive() {
		return this.state.status === 'ACTIVE'
	}

	isInactive() {
		return this.state.status === 'INACTIVE'
	}

	isTrialEnded() {
		return !!(
			this.state.trialEndsAt && new Date(this.state.trialEndsAt) < new Date()
		)
	}

	checkIfCanActivate() {
		if (this.isActive()) {
			throw new ConflictException(
				this.i18nService.current.workspaceAlreadyActive(),
			)
		}
	}

	checkIfCanDeactivate() {
		if (this.isInactive()) {
			throw new ConflictException(
				this.i18nService.current.workspaceAlreadyInactive(),
			)
		}
	}
}
