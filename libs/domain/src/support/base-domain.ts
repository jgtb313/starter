import type { z } from '@starter/schema'

export class BaseDomain<State> {
	readonly state: Readonly<State>

	constructor(schema: z.ZodType, data: State) {
		const state = schema.parse(data)

		Object.assign(this, {
			state,
		})
	}

	toJSON() {
		return this.state
	}
}
