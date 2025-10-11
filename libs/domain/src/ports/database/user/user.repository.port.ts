import type { Merge } from '@starter/common'
import type { Pagination, PaginationOutput, Phone, Sort } from '@starter/schema'

import type { UserDomain } from '@/core/user/user.domain'
import type { User, UserInput } from '@/core/user/user.schema'

type FindUserInput = Partial<
	Pick<User, 'workspaceId' | 'name' | 'email' | 'phone' | 'status'>
>

type UserSort = Sort<'name' | 'status' | 'createdAt'>

type FindByEmailOptions = Pick<User, 'workspaceId'>

type FindByPhoneOptions = Pick<User, 'workspaceId'>

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
	find(
		input: Merge<
			[
				FindUserInput,
				UserSort,
			]
		>,
	): Promise<UserDomain[]>
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

	attachOrganization(
		userId: string,
		organizationId: string,
		roleId: string,
	): Promise<void>
	attachManyOrganizations(
		userId: string,
		input: {
			organizationId: string
			roleId: string
		}[],
	): Promise<void>
	detachOrganization(userId: string, organizationId: string): Promise<void>
	detachManyOrganizations(
		userId: string,
		organizationIds: string[],
	): Promise<void>

	findPermissions(userId: string): Promise<{}>
	attachPermission(
		userId: string,
		permissionId: string,
		organizationId: string,
	): Promise<void>
	attachManyPermissions(
		userId: string,
		input: {
			permissionId: string
			organizationId: string
		}[],
	): Promise<void>
	detachPermission(userId: string, permissionId: string): Promise<void>
	detachManyPermissions(userId: string, permissionIds: string[]): Promise<void>

	createAddress(userId: string, input: User['addresses'][number]): Promise<void>
	updateAddressById(
		userId: string,
		addressId: string,
		input: User['addresses'][number],
	): Promise<void>
	deleteAddressById(userId: string, addressId: string): Promise<void>
}
