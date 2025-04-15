import { Injectable } from '@nestjs/common'

import { PresignedUrlService } from '@/adapters/presigned-url'
import { FileContextEnum } from '@/core/storage/storage.controller.schema'

@Injectable()
export class StorageService {
  constructor(private readonly presignedUrlService: PresignedUrlService) {}

  getPresignedUrl(fileContext: FileContextEnum, fileName: string) {
    const fileContexts: Record<FileContextEnum, string> = {
      [FileContextEnum.USER_AVATAR]: 'users/avatar',
      [FileContextEnum.WORKSPACE_LOGO]: 'workspaces/logo',
      [FileContextEnum.ORGANIZATION_LOGO]: 'organizations/logo',
    }

    const bucket = fileContexts[fileContext]

    const key = `${bucket}/${fileName}`

    return this.presignedUrlService.generateUrl(key, { expiresInSeconds: 120 })
  }
}
