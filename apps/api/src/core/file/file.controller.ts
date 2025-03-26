import { Controller, Route, Request } from '@starter/nestjs-server-hoisting'

import { FileService } from './file.service'
import { GetPresignedUrlSchema, GetPresignedUrlRequest } from './file.controller.schema'

@Controller({
  name: 'File',

  description: 'Module to manage file storage and access using cloud integration services.',

  basePath: 'files',

  schemas: {},
})
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Route({
    summary: 'Get a presigned URL',
    description:
      'Generates a presigned URL that allows secure uploading of files to a specified cloud storage context. This URL can be used for direct file uploads.',

    method: 'POST',

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
    return this.fileService.getPresignedUrl(body)
  }
}
