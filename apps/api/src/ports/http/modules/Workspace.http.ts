import { WorkspaceSchema, UpdateWorkspaceSchema, UpdateWorkspaceSchemaOutput } from '@starter/schema'

import { IDependencies } from '@/core/shared/types'
import { IRouter } from '@/ports/http'

export const WorkspaceRouter = (dependencies: IDependencies): IRouter => ({
  name: 'Workspace',

  description: 'Handles operations related to managing and retrieving workspaces.',

  schemas: {
    Workspace: {
      schema: WorkspaceSchema,
    },
  },

  paths: {
    workspaceOnboarding: {
      summary: 'Update Workspace',
      description: 'Updates a workspace.',

      method: 'PATCH',

      path: '/workspaces/:id',

      parameters: {
        params: UpdateWorkspaceSchema.pick({ id: true }),
        body: UpdateWorkspaceSchema.pick({ name: true, domain: true }),
      },

      responses: {
        200: {
          description: 'OK',
          schema: UpdateWorkspaceSchemaOutput,
        },
      },

      async execute() {
        console.log(dependencies)
        return
      },
    },
  },
})
