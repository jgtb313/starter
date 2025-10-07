import { ConflictException } from '@starter/nestjs-error-handling'

import {
	type Workspace,
	type WorkspaceInput,
	WorkspaceSchema,
} from '@/core/workspace/workspace.schema'
import { BaseDomain } from '@/support/base-domain'
import type { I18nDomainService } from '@/domain.i18n.module'

export class WorkspaceDomain extends BaseDomain<Workspace, WorkspaceInput> {
	constructor(
		private readonly i18nService: I18nDomainService,
		workspace: WorkspaceInput,
	) {
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
			throw new ConflictException(
				this.i18nService.current.workspaceAlreadyActive(),
			)
		}
	}

	private checkIfCanBeInactive() {
		if (this.isInactive()) {
			throw new ConflictException(
				this.i18nService.current.workspaceAlreadyInactive(),
			)
		}
	}
}
