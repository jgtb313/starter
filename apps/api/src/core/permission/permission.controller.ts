import { Controller, Route } from '@starter/nestjs-server-hoisting'
import { PERMISSIONS } from '@starter/domain'
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
    return [...PERMISSIONS]
  }
}
