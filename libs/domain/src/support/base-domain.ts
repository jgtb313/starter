import { Injectable } from '@nestjs/common'

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
