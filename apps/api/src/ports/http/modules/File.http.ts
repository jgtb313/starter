import { RequestFilenameSchema, RequestFilenameSchemaOutput } from '@starter/schema'

import { IDependencies } from '@/core/shared/types'
import { requestFilename } from '@/core/file/use-cases/request-filename.use-case'
import { IRouter } from '@/ports/http'

export const FileRouter = (dependencies: IDependencies): IRouter => ({
  name: 'File',

  description: 'Module to manage file storage and access using cloud integration services.',

  schemas: {},

  paths: {
    requestFilename: {
      summary: 'Request Filename',
      description: 'Provides a pre-signed URL for uploading files to a specified context.',

      method: 'POST',

      path: '/files',

      parameters: {
        body: RequestFilenameSchema,
      },

      responses: {
        200: {
          description: 'OK',
          schema: RequestFilenameSchemaOutput,
        },
      },

      execute({ body }) {
        return requestFilename(dependencies)(body)
      },
    },
  },
})
