import { Inject, Injectable } from '@nestjs/common'

import type { Profile } from '@/core/profile/profile.schema'
import { ProfileSchema } from '@/core/profile/profile.schema'
import type { IUserRepository } from '@/ports/database/user'

@Injectable()
export class ProfileService {
	constructor(
		@Inject('USER_REPOSITORY')
		private readonly userRepository: IUserRepository,
	) {}

	async getProfile(userId: string): Promise<Profile> {
		const user = await this.userRepository.findById(userId)
		const permissions = await this.userRepository.findPermissions(userId)

		const scopes: Profile['scopes'] = permissions.reduce<Profile['scopes']>(
			(result, { permissionId, organization, role }) => {
				const kind: Profile['scopes'][number]['kind'] = organization
					? 'ORGANIZATION'
					: 'WORKSPACE'

				const existing = result.find((scope) =>
					kind === 'WORKSPACE'
						? scope.kind === 'WORKSPACE'
						: scope.kind === 'ORGANIZATION' &&
							scope.organization?.organizationId ===
								organization?.organizationId,
				)

				if (existing) {
					if (!existing.permissionIds.includes(permissionId)) {
						existing.permissionIds.push(permissionId)
					}
				} else {
					result.push(
						kind === 'WORKSPACE'
							? {
									kind,
									permissionIds: [
										permissionId,
									],
								}
							: {
									kind,
									organization: {
										organizationId: organization?.organizationId!,
										name: organization?.name!,
									},
									role: {
										roleId: role?.roleId!,
										name: role?.name!,
									},
									permissionIds: [
										permissionId,
									],
								},
					)
				}

				return result
			},
			[],
		)

		return ProfileSchema.parse({
			...user.toJSON(),
			scopes,
		})
	}
}
