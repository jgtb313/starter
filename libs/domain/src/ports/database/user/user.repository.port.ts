import type { Merge } from '@starter/common'
import type { Pagination, PaginationOutput, Phone, Sort } from '@starter/schema'

import type { UserDomain } from '@/core/user/user.domain'
import type { BaseUser, User } from '@/core/user/user.schema'

type FindUserInput = Partial<
	Pick<User, 'workspaceId' | 'email' | 'phone' | 'status'>
>

type UserSort = Sort<'name' | 'status' | 'createdAt'>

type FindByEmailOptions = {
	workspaceId?: User['workspaceId']
}

type FindByPhoneOptions = {
	workspaceId?: User['workspaceId']
}

type UserRelationsInput = Partial<{
	organizations: Pick<
		User['organizations'][number],
		'organizationId' | 'roleId'
	>[]
	attachedPermissions: Pick<
		User['attachedPermissions'][number],
		'permissionId' | 'organizationId'
	>[]
}>
type CreateUserInput = BaseUser & UserRelationsInput
type UpdateUserInput = Partial<BaseUser> & UserRelationsInput

export type IUserRepository = {
	findAllPaginated(
		input: Merge<
			[
				FindUserInput,
				Pagination,
				UserSort,
			]
		>,
	): Promise<PaginationOutput<UserDomain>>
	findAll(input: Partial<User>): Promise<UserDomain[]>
	findById(userId: string): Promise<UserDomain>
	findByEmail(
		email: string,
		options?: FindByEmailOptions,
	): Promise<UserDomain | null>
	findByPhone(
		phone: Phone,
		options?: FindByPhoneOptions,
	): Promise<UserDomain | null>
	findBySocial(
		provider: 'FACEBOOK' | 'GOOGLE',
		providerToken: string,
		email: string,
	): Promise<UserDomain | null>

	create(input: CreateUserInput): Promise<UserDomain>
	updateById(userId: string, input: UpdateUserInput): Promise<UserDomain>
	deleteById(userId: string): Promise<void>

	attachOrganization(
		userId: string,
		organizationId: string,
		roleId: string,
	): Promise<UserDomain>
	attachManyOrganizations(
		userId: string,
		input: Pick<User['organizations'][number], 'organizationId' | 'roleId'>[],
	): Promise<UserDomain>
	detachOrganization(userId: string, organizationId: string): Promise<void>
	detachManyOrganizations(
		userId: string,
		organizationIds: string[],
	): Promise<void>

	createAddress(
		userId: string,
		input: User['addresses'][number],
	): Promise<UserDomain>
	updateAddressById(
		userId: string,
		addressId: string,
		input: User['addresses'][number],
	): Promise<UserDomain>
	deleteAddressById(userId: string, addressId: string): Promise<void>
}
