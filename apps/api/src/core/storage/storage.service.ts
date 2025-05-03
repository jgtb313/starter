import { Injectable } from '@nestjs/common'

import { PresignedUrlService } from '@/adapters/presigned-url'
import { FileContextEnum } from '@/core/storage/storage.controller.schema'
import { IStorageService } from '@/core/storage/storage.service.interface'

@Injectable()
export class StorageService implements IStorageService {
  constructor(private readonly presignedUrlService: PresignedUrlService) {}

  getPresignedUrl: IStorageService['getPresignedUrl'] = async (fileContext, fileName) => {
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
