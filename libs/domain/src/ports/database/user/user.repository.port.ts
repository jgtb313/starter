import type { Merge } from '@starter/common'
import type { Pagination, PaginationOutput, Phone, Sort } from '@starter/schema'

import type { UserDomain } from '@/core/user/user.domain'
import type { User, UserInput } from '@/core/user/user.schema'

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

export type IUserRepository = {
	findPaginated(
		input: Merge<
			[
				FindUserInput,
				Pagination,
				UserSort,
			]
		>,
	): Promise<PaginationOutput<UserDomain>>
	find(input: Partial<User>): Promise<UserDomain[]>
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

	create(input: UserInput): Promise<UserDomain>
	updateById(userId: string, input: Partial<UserInput>): Promise<UserDomain>
	deleteById(userId: string): Promise<void>

	findOrganizations(userId: string): Promise<User['organizations']>
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

	findPermissions(userId: string): Promise<User['attachedPermissions']>
	attachPermission(
		userId: string,
		permissionId: string,
		organizationId: string,
	): Promise<UserDomain>
	attachManyPermissions(
		userId: string,
		input: Pick<
			User['attachedPermissions'][number],
			'permissionId' | 'organizationId'
		>[],
	): Promise<UserDomain>
	detachPermission(userId: string, permissionId: string): Promise<void>
	detachManyPermissions(userId: string, permissionIds: string[]): Promise<void>

	findAddresses(userId: string): Promise<User['addresses']>
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
