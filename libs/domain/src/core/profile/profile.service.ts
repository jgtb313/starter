import { Inject, Injectable } from '@nestjs/common'

import type { IUserRepository } from '@/ports/database/user'

@Injectable()
export class ProfileService {
	constructor(
		@Inject('USER_REPOSITORY')
		private readonly userRepository: IUserRepository,
	) {}

	async getProfile(userId: string) {
		const user = await this.userRepository.findById(userId)

		return user.state
	}
}
