import { Controller, Route } from '@starter/nestjs-server-hoisting'
import { PERMISSION_SUBJECT_ACTIONS } from '@starter/domain'
import { z } from '@starter/schema'

@Controller({
  name: 'Permission',

  description: 'Handles operations for retrieving permissions.',

  basePath: 'permissions',

  schemas: {},
})
export class PermissionController {
  constructor() {}

  @Route({
    summary: 'List Permissions',
    description: '',

    method: 'GET',
    parameters: {},

    responses: {
      200: {
        schema: z.array(z.string()),
      },
    },
  })
  async getPermissions() {
    return Object.values(PERMISSION_SUBJECT_ACTIONS).flatMap((permissionSubjectAction) => permissionSubjectAction)
  }
}
