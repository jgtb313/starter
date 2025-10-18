import { Inject, Injectable } from '@nestjs/common'

import { BaseDomain } from '@/support/base-domain'
import {
	type Workspace,
	type WorkspaceInput,
	WorkspaceSchema,
} from '@/core/workspace/workspace.schema'
import { type I18nDomainService, I18nDomainSymbol } from '@/domain.i18n.module'

@Injectable()
export class WorkspaceDomain extends BaseDomain<Workspace> {
	constructor(
		workspace: WorkspaceInput,
		@Inject(I18nDomainSymbol)
		private readonly i18nService: I18nDomainService,
	) {
		super(WorkspaceSchema.parse(workspace))
	}
}
