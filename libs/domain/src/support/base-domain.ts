import type { z } from '@starter/schema'

import type { OnModuleInit } from '@nestjs/common'
import { Inject, Injectable } from '@nestjs/common'

import type { I18nDomainService } from '@/domain.i18n.module'
import { I18nDomainSymbol } from '@/domain.i18n.module'

export class DomainContext {
	private static i18nServiceInstance: I18nDomainService

	static setI18nService(i18nService: I18nDomainService) {
		DomainContext.i18nServiceInstance = i18nService
	}

	static getI18nService(): I18nDomainService {
		return DomainContext.i18nServiceInstance
	}
}

@Injectable()
export class DomainContextInitializer implements OnModuleInit {
	constructor(
		@Inject(I18nDomainSymbol)
		private readonly i18nService: I18nDomainService,
	) {}

	onModuleInit() {
		DomainContext.setI18nService(this.i18nService)
	}
}

export class BaseDomain<State> {
	readonly state: Readonly<State>

	constructor(schema: z.ZodType, data: State) {
		const state = schema.parse(data)

		Object.assign(this, {
			state,
		})
	}

	protected get i18nService(): I18nDomainService {
		return DomainContext.getI18nService()
	}

	toJSON() {
		return this.state
	}
}
