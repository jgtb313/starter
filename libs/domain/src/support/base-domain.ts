import type { z } from '@starter/schema'

export class BaseDomain<T, K> {
	state!: T

	constructor(schema: z.ZodType, data: K) {
		const state = schema.parse(data)

		Object.assign(this, {
			state,
		})
	}

	toJSON() {
		return this.state
	}
}
