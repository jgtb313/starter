import { IndexRoleSchema, IndexRoleSchemaOutput, RoleSchema } from '@starter/schema'

import { IDependencies } from '@/core/shared/types'
import { indexRole } from '@/core/role/use-cases/list-role.use-case'
import { IRouter } from '@/ports/http'

export const RoleRouter = (dependencies: IDependencies): IRouter => ({
  name: 'Roles',

  description: '',

  schemas: {
    Role: {
      schema: RoleSchema
    }
  },

  paths: {
    indexRole: {
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
          description: 'OK'
        }
      },

      execute({ query }) {
        return indexRole(dependencies)(query)
      }
    }
  }
})
