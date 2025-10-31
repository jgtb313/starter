import type { Merge } from '@starter/common'
import type { Pagination, PaginationOutput, Phone, Sort } from '@starter/schema'

import type { Organization } from '@/core/organization/organization.schema'
import type { Permission } from '@/core/permission/permission.schema'
import type { Role } from '@/core/role/role.schema'
import type { UserDomain } from '@/core/user/user.domain'
import type {
	UpdatableUserAddressInput,
	UpdatableUserInput,
	User,
	UserAddress,
	UserAddressInput,
	UserInput,
} from '@/core/user/user.schema'

export type FindUserInput = Partial<
	Pick<User, 'workspaceId' | 'name' | 'email' | 'phone' | 'status'>
>

export type UserSort = Sort<'name' | 'status' | 'createdAt'>

type FindByEmailOptions = Pick<User, 'workspaceId'>

type FindByPhoneOptions = Pick<User, 'workspaceId'>

type CreateUserInput = UserInput & {
	permissionIds?: Permission[]
}

type ScopesOutput = {
	organization: Pick<Organization, 'organizationId' | 'name'> | null
	role: Pick<Role, 'roleId' | 'name'> | null
	permissionId: Permission
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
	create(input: CreateUserInput): Promise<UserDomain>
	updateById(userId: string, input: UpdatableUserInput): Promise<UserDomain>
	deleteById(userId: string): Promise<void>

	findOrganizations(userId: string): Promise<[]>
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

	findScopes(userId: string): Promise<ScopesOutput[]>
	attachPermission(
		userId: string,
		permissionId: Permission,
		organizationId: string,
	): Promise<void>
	attachManyPermissions(
		userId: string,
		input: {
			permissionId: Permission
			organizationId?: string
		}[],
	): Promise<void>
	detachPermission(userId: string, permissionId: Permission): Promise<void>
	detachManyPermissions(
		userId: string,
		permissionIds: Permission[],
	): Promise<void>

	findAddresses(userId: string): Promise<UserAddress[]>
	findAddressById(userId: string, addressId: string): Promise<UserAddress>
	createAddress(userId: string, input: UserAddressInput): Promise<UserAddress>
	updateAddressById(
		userId: string,
		addressId: string,
		input: UpdatableUserAddressInput,
	): Promise<UserAddress>
	deleteAddressById(userId: string, addressId: string): Promise<void>
}
