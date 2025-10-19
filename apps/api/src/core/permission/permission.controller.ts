import { z } from '@starter/schema'
import {
	PERMISSION_SUBJECT_ACTIONS,
	PermissionSubjectSchema,
	PermissionsSchema,
} from '@starter/domain'
import { Controller, Route } from '@starter/nestjs-server-hoisting'

@Controller({
	name: 'Permission',

	description: 'Handles operations for retrieving permissions.',

	basePath: 'permissions',

	schemas: {
		Permission: {
			schema: PermissionsSchema,
		},
	},
})
export class PermissionController {
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
	async listPermissions() {
		return Object.values(PERMISSION_SUBJECT_ACTIONS).flat()
	}
}
