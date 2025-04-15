import { Controller, Route, Request } from '@starter/nestjs-server-hoisting'

import { StorageService } from '@/core/storage/storage.service'
import { GetPresignedUrlSchema, GetPresignedUrlRequest } from '@/core/storage/storage.controller.schema'

@Controller({
  name: 'Storage',

  description: 'Module to manage storage and access using cloud integration services.',

  basePath: 'storage',

  schemas: {},
})
export class StorageController {
  constructor(private readonly fileService: StorageService) {}

  @Route({
    summary: 'Get a presigned URL',
    description:
      'Generates a presigned URL that allows secure uploading of files to a specified cloud storage context. This URL can be used for direct file uploads.',

    method: 'POST',
    path: '/files',

    parameters: {
      body: GetPresignedUrlSchema.body,
    },

    responses: {
      200: {
        schema: GetPresignedUrlSchema.output,
      },
    },
  })
  async getPresignedUrl(@Request() { body }: GetPresignedUrlRequest) {
    return this.fileService.getPresignedUrl(body.context, body.fileName)
  }
}
