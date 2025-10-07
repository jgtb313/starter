import type { z } from '@starter/schema'

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
