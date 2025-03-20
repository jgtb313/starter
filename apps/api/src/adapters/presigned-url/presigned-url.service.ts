import { Injectable, Inject } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

import { IPresignedUrl, IPresignedUrlAdapter } from '@/ports/presigned-url'

@Injectable()
export class PresignedUrlService {
  constructor(
    @Inject('PresignedUrl') private readonly presignedUrl: IPresignedUrlAdapter,
    private readonly configService: ConfigService,
  ) {}

  generateUrl: IPresignedUrl['getPresignedUrl'] = async (filename, options) => {
    const STATIC_ASSETS_URL = this.configService.get<string>('STATIC_ASSETS_URL')!

    const filenameSigned = await this.presignedUrl.getPresignedUrl(filename, options)

    return {
      filename: `https://${STATIC_ASSETS_URL}/${filename}`,
      filenameSigned,
    }
  }
}
