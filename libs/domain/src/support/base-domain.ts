import { Global, Inject, Injectable, Module } from '@nestjs/common'
import type { z } from '@starter/schema'

import { type I18nDomainService, I18nDomainSymbol } from '@/domain.i18n.module'

export class BaseDomain<State, Input> {
	state!: State

	constructor(schema: z.ZodType, data: Input) {
		const state = schema.parse(data)

		Object.assign(this, {
			state,
		})
	}

	toJSON() {
		return this.state
	}
}

@Injectable()
export class DomainFactory {
	constructor(
		@Inject(I18nDomainSymbol)
		private readonly i18nService: I18nDomainService,
	) {}

	create<TInput, TDomain>(
		DomainClass: new (i18n: I18nDomainService, input: TInput) => TDomain,
		input: TInput,
	): TDomain {
		return new DomainClass(this.i18nService, input)
	}
}

@Global()
@Module({
	providers: [
		DomainFactory,
	],
	exports: [
		DomainFactory,
	],
})
export class DomainFactoryModule {}
