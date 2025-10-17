import { z } from '@starter/schema'
import { PermissionSchema, UserService } from '@starter/domain'
import { Controller, Route } from '@starter/nestjs-server-hoisting'

import { Inject } from '@nestjs/common'

import {
	PERMISSION_SUBJECT_ACTIONS,
	PermissionSubjectSchema,
} from '@/support/access-control/permission'

@Controller({
	name: 'Permission',

	description: 'Handles operations for retrieving permissions.',

	basePath: 'permissions',

	schemas: {
		Permission: {
			schema: PermissionSchema,
		},
	},
})
export class PermissionController {
	constructor(
		@Inject(UserService)
		private readonly userService: UserService,
	) {}

	@Route({
		summary: 'List Permissions',
		description:
			'Retrieves a list of all available permission used for access control within the API.',

		method: 'GET',

		parameters: {},

		responses: {
			200: {
				schema: z.array(PermissionSubjectSchema),
			},
		},
	})
	async getPermissions() {
		// return Object.values(PERMISSION_SUBJECT_ACTIONS).flat()
		return this.userService.getPaginatedUsers({})
	}
}
