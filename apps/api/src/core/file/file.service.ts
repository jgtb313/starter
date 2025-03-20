import { Injectable } from '@nestjs/common'

import { PresignedUrlService } from '@/adapters/presigned-url'

export enum FileContextEnum {
  USER_AVATAR = 'USER_AVATAR',
  WORKSPACE_LOGO = 'WORKSPACE_LOGO',
  ORGANIZATION_LOGO = 'ORGANIZATION_LOGO',
}

export type GetPresignedUrl = {
  context: FileContextEnum
  filename: string
}

@Injectable()
export class FileService {
  constructor(private readonly presignedUrlService: PresignedUrlService) {}

  getPresignedUrl({ context, filename }: GetPresignedUrl) {
    const contexts: Record<FileContextEnum, string> = {
      [FileContextEnum.USER_AVATAR]: 'users/avatar',
      [FileContextEnum.WORKSPACE_LOGO]: 'workspaces/logo',
      [FileContextEnum.ORGANIZATION_LOGO]: 'organizations/logo',
    }

    const bucket = contexts[context]

    const key = `${bucket}/${filename}`

    return this.presignedUrlService.generateUrl(key, { expiresInSeconds: 120 })
  }
}
