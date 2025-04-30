import { Controller, Route } from '@starter/nestjs-server-hoisting'
import { z } from '@starter/schema'

import { PERMISSION_SUBJECT_ACTIONS } from '@/support/access-control/permission'

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
    description: 'Retrieves a list of all available permission used for access control within the API.',

    method: 'GET',

    parameters: {},

    responses: {
      200: {
        schema: z.array(z.string()),
      },
    },
  })
  async getPermissions() {
    return Object.values(PERMISSION_SUBJECT_ACTIONS).flat()
  }
}
