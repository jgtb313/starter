import type { PickNotNullable, PickNullable } from '@starter/common'

import { Injectable } from '@nestjs/common'

export type BaseDomainInput<T> = {
	[Key in keyof PickNullable<Omit<T, 'createdAt' | 'updatedAt'>>]?: Exclude<
		T[Key],
		null
	> | null
} & {
	[Key in keyof PickNotNullable<Omit<T, 'createdAt' | 'updatedAt'>>]: T[Key]
}

@Injectable()
export class BaseDomain<State> {
	state: Readonly<State>

	constructor(state: State) {
		this.state = state
	}

	toJSON(): Readonly<State> {
		return this.state
	}
}
