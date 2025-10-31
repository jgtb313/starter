import type { Merge, Required } from '@starter/common'
import {
	AclForbiddenException,
	BadRequestException,
	ConflictException,
} from '@starter/nestjs-error-handling'
import type { Pagination, Phone } from '@starter/schema'

import { forwardRef, Inject, Injectable } from '@nestjs/common'

import {
	createWorkspaceReference,
	type WithWorkspaceReference,
} from '@/support/workspace-reference'
import { OrganizationService } from '@/core/organization/organization.service'
import { PermissionService } from '@/core/permission/permission.service'
import type {
	UpdatableUserAddressInput,
	UpdatableUserInput,
	User,
	UserAddressInput,
} from '@/core/user/user.schema'
import type {
	CreateUserInput,
	DefineUserScopesInput,
} from '@/core/user/user.service.types'
import type { WorkspaceDomain } from '@/core/workspace/workspace.domain'
import { WorkspaceService } from '@/core/workspace/workspace.service'
import { Transaction } from '@/adapters/database'
import { EncryptService } from '@/adapters/encrypt'
import type { IUserRepository } from '@/ports/database/user'

export type UserWorkspaceReference = WithWorkspaceReference<'userId'>
export const getUserWorkspaceReference = createWorkspaceReference('userId')

@Injectable()
export class UserService {
	constructor(
		@Inject('USER_REPOSITORY')
		private readonly userRepository: IUserRepository,
		@Inject(forwardRef(() => WorkspaceService))
		private readonly workspaceService: WorkspaceService,
		@Inject(forwardRef(() => OrganizationService))
		private readonly organizationService: OrganizationService,
		@Inject(forwardRef(() => PermissionService))
		private readonly permissionService: PermissionService,
		@Inject(EncryptService)
		private readonly encryptService: EncryptService,
	) {}

	async getPaginatedUsers(
		input: Merge<
			[
				Pagination,
			]
		>,
	) {
		return this.userRepository.findPaginated(input)
	}

	async getUser(reference: UserWorkspaceReference) {
		const { userId, workspaceId } = getUserWorkspaceReference(reference)

		const user = await this.userRepository.findById(userId)

		if (workspaceId && user.state.workspaceId !== workspaceId) {
			throw new AclForbiddenException()
		}

		return user
	}

	async getUserByEmail(
		email: User['email'],
		options?: Pick<User, 'workspaceId'>,
	) {
		const user = await this.userRepository.findByEmail(email, options)

		if (!user) {
			return
		}

		return user
	}

	async getUserByPhone(phone: Phone, options?: Pick<User, 'workspaceId'>) {
		const user = await this.userRepository.findByPhone(phone, options)

		if (!user) {
			return
		}

		return user
	}

	async getUserBySocial(
		provider: 'FACEBOOK' | 'GOOGLE',
		providerToken: string,
		email: string,
	) {
		const user = await this.userRepository.findBySocial(
			provider,
			providerToken,
			email,
		)

		if (!user) {
			return
		}

		return user
	}

	async createUser({ workspaceId, permissionIds, ...input }: CreateUserInput) {
		let workspace: WorkspaceDomain | undefined

		if (workspaceId) {
			workspace = await this.workspaceService.getWorkspace(workspaceId)
		}

		const emailExists = await this.userRepository.findByEmail(input.email)

		if (emailExists) {
			throw new ConflictException(
				`Email ${input.email} has already been taken.`,
			)
		}

		if (permissionIds) {
			this.permissionService.validatePermissionIds(permissionIds)
		}

		const password = await this.encryptService.hash(input.password)

		const user = await this.userRepository.create({
			...input,
			workspaceId: workspace?.state.workspaceId ?? null,
			permissionIds,
			password,
		})

		return user
	}

	async updateUser(
		reference: UserWorkspaceReference,
		input: UpdatableUserInput,
	) {
		const user = await this.getUser(reference)

		await this.userRepository.updateById(user.state.userId, input)

		return this.getUser(user.state.userId)
	}

	async updateUserPassword(userId: string, password: string) {
		const user = await this.getUser(userId)

		const newPassword = await this.encryptService.hash(password)

		await this.userRepository.updateById(user.state.userId, {
			password: newPassword,
		})
	}

	@Transaction()
	async defineUserScopes(
		reference: UserWorkspaceReference,
		{ organizations, permissions }: DefineUserScopesInput,
	) {
		const user = await this.getUser(reference)

		if (!user.state.workspaceId) {
			throw new BadRequestException('User is not associated with a workspace')
		}

		if (organizations) {
			await this.organizationService.validateOrganizationIds(
				user.state.workspaceId,
				organizations.map(({ organizationId }) => organizationId),
			)

			await this.userRepository.attachManyOrganizations(
				user.state.userId,
				organizations,
			)
		}

		if (permissions) {
			const permissionIds = permissions.map(({ permissionId }) => permissionId)

			this.permissionService.validatePermissionIds(permissionIds)

			const organizationIds = permissions
				.map(({ organizationId }) => organizationId)
				.filter(Boolean) as string[]

			if (organizationIds.length) {
				await this.organizationService.validateOrganizationIds(
					user.state.workspaceId,
					organizationIds,
				)
			}

			await this.userRepository.attachManyPermissions(
				user.state.userId,
				permissions,
			)
		}

		return this.getUser(user.state.userId)
	}

	async createUserAddress(
		reference: UserWorkspaceReference,
		input: Omit<UserAddressInput, 'location'>,
	) {
		const user = await this.getUser(reference)

		// TODO: get the location from the address

		const location = {
			lat: '34.052235',
			lng: '-118.243683',
		}

		await this.userRepository.createAddress(user.state.userId, {
			...input,
			location,
		})

		return this.getUser(user.state.userId)
	}

	async updateUserAddress(
		reference: UserWorkspaceReference,
		addressId: string,
		input: Omit<UpdatableUserAddressInput, 'location'>,
	) {
		const user = await this.getUser(reference)

		// TODO: get the location from the address

		const location = {
			lat: '34.052235',
			lng: '-118.243683',
		}

		await this.userRepository.updateAddressById(user.state.userId, addressId, {
			...input,
			location,
		})

		return this.getUser(user.state.userId)
	}

	async deleteUserAddress(
		reference: UserWorkspaceReference,
		addressId: string,
	) {
		const user = await this.getUser(reference)

		await this.userRepository.deleteAddressById(user.state.userId, addressId)
	}

	async activateUser(reference: UserWorkspaceReference) {
		const user = await this.getUser(reference)

		await this.userRepository.updateById(user.state.userId, {
			status: 'ACTIVE',
		})
	}

	async deactivateUser(reference: UserWorkspaceReference) {
		const user = await this.getUser(reference)

		await this.userRepository.updateById(user.state.userId, {
			status: 'INACTIVE',
		})
	}

	async deleteUser(reference: UserWorkspaceReference) {
		const user = await this.getUser(reference)

		await this.userRepository.deleteById(user.state.userId)
	}

	async verifyUserPassword(userId: string, password: string) {
		const user = await this.getUser(userId)

		const isValidPassword = await this.encryptService.compare(
			password,
			user.state.password,
		)

		if (!isValidPassword) {
			throw new BadRequestException({
				issues: [
					{
						password: 'Incorrect password',
					},
				],
			})
		}
	}
}
