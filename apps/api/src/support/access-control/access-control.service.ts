import { AclForbiddenException } from '@starter/nestjs-error-handling'
import type { Profile } from '@starter/domain'
import {
	PERMISSION_SUBJECT_ACTIONS,
	type Permission,
	type PermissionSubject,
} from '@starter/domain'

import {
	Ability,
	AbilityBuilder,
	type MongoQuery,
	subject as subjectFactory,
} from '@casl/ability'
import type { AnyObject } from '@casl/ability/dist/types/types'
import { Injectable } from '@nestjs/common'

@Injectable()
export class ACLService {
	private defineAbilities(
		user: Profile,
		options: {
			organizationId?: Profile['scopes'][number]['organizationId']
		},
	) {
		const { can, build } = new AbilityBuilder(Ability)

		const permissions =
			(options.organizationId
				? user.scopes.find(
						(scope) =>
							scope.organizationId === options.organizationId ||
							scope.kind === 'WORKSPACE',
					)?.permissions
				: user.scopes.find((scope) => scope.kind === 'WORKSPACE')
						?.permissions) ?? []

		console.log(permissions)

		const condition: MongoQuery<AnyObject> = {
			workspaceId: user.workspaceId,
		}

		console.log(condition)

		permissions.forEach((permission) => {
			const [subject, action] = permission.split(':') as [
				PermissionSubject,
				string,
			]

			if (subject === 'workspace' && action === 'manage') {
				can('manage', 'all', {
					workspaceId: user.workspaceId,
				})
			} else if (action === 'manage') {
				const subjectPermissions: Permission[] = PERMISSION_SUBJECT_ACTIONS[
					subject
				]
					.filter((action) => !action.permissionId.endsWith('manage'))
					.map((action) => `${subject}:${action.permissionId}` as Permission)

				subjectPermissions.forEach((subjectPermission) => {
					const [subject, action] = subjectPermission.split(':')

					can(action, subject, condition)
				})
			} else {
				can(action, subject, condition)
			}
		})

		return build()
	}

	public canPerformActionByPermission(
		user: Profile,
		permission: Permission,
		resource?: {
			workspaceId: string
			organizationId?: string
		},
	) {
		const withOrganizationId = !!resource?.organizationId

		const ability = this.defineAbilities(user, {
			organizationId: resource?.organizationId,
		})

		const permissions: Permission[] = [
			permission,
			'workspace:manage',
		]

		if (withOrganizationId) {
			permissions.push('organization:manage')
		}

		const authorized = permissions.some((permission) => {
			const [subject, action] = permission.split(':')

			return resource
				? ability.can(
						action,
						subjectFactory(subject, {
							type: subject,
							...resource,
						}),
					)
				: ability.can(action, subject)
		})

		if (!authorized) {
			throw new AclForbiddenException()
		}
	}
}
