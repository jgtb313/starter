import { IndexRoleSchema, IndexRoleSchemaOutput, RoleSchema } from '@starter/schema'

import { IDependencies } from '@/core/shared/types'
import { listRole } from '@/core/role/use-cases/list-role'
import { IRouter } from '@/ports/http'

export const RoleRouter = (dependencies: IDependencies): IRouter => ({
  name: 'Roles',

  description: 'Roles Description',

  schemas: {
    Role: {
      schema: RoleSchema
    }
  },

  paths: {
    listRoles: {
      summary: 'List Roles',
      description: 'Return a list of roles.',

      method: 'GET',

      path: '/roles::index',

      parameters: {
        query: IndexRoleSchema
      },

      responses: {
        200: {
          schema: IndexRoleSchemaOutput,
          description: '200'
        }
      },

      execute({ query }) {
        return listRole(dependencies)(query)
      }
    }
  }
})
