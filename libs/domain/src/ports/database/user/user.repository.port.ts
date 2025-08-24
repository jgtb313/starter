import type { Pagination, PaginationOutput, Phone } from '@starter/schema'

import type { UserDomain } from '@/core/user/user.domain'
import type { BaseUser, User } from '@/core/user/user.schema'

export type IUserRepository = {
	findAllPaginated(
		input: Pagination<User>,
	): Promise<PaginationOutput<UserDomain>>
	findAll(input: Partial<User>): Promise<UserDomain[]>
	findById(userId: string): Promise<UserDomain>
	findByEmail(
		email: string,
		options?: {
			workspaceId?: User['workspaceId']
		},
	): Promise<UserDomain | null>
	findByPhone(
		phone: Phone,
		options?: {
			workspaceId?: User['workspaceId']
		},
	): Promise<UserDomain | null>
	findBySocial(
		provider: 'FACEBOOK' | 'GOOGLE',
		providerToken: string,
		email: string,
	): Promise<UserDomain | null>
	create(input: BaseUser): Promise<UserDomain>
	updateById(userId: string, input: Partial<User>): Promise<UserDomain>
	deleteById(userId: string): Promise<void>
}
