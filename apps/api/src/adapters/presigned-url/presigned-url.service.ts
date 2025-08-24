import { Inject, Injectable } from '@nestjs/common'
import type { ConfigService } from '@nestjs/config'

import type { IPresignedUrl, IPresignedUrlAdapter } from '@/ports/presigned-url'

@Injectable()
export class PresignedUrlService {
  constructor(
    @Inject('PresignedUrl') private readonly presignedUrl: IPresignedUrlAdapter,
    private readonly configService: ConfigService,
  ) {}

  generateUrl: IPresignedUrl['getPresignedUrl'] = async (fileName, options) => {
    const STATIC_ASSETS_URL = this.configService.get<string>('STATIC_ASSETS_URL')!

    const fileNameSigned = await this.presignedUrl.getPresignedUrl(fileName, options)

    return {
      fileName: `https://${STATIC_ASSETS_URL}/${fileName}`,
      fileNameSigned,
    }
  }
}
