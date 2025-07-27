import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

import { IPresignedUrlAdapter } from '@/ports/presigned-url'

@Injectable()
export class S3PresignedUrlAdapter implements IPresignedUrlAdapter {
  private s3: S3Client
  private bucket: string

  constructor(private readonly configService: ConfigService) {
    this.bucket = this.configService.get<string>('AWS_S3_ASSETS_BUCKET')!

    this.s3 = new S3Client({
      region: this.configService.get<string>('AWS_REGION', 'us-east-1'),
    })
  }

  getPresignedUrl: IPresignedUrlAdapter['getPresignedUrl'] = (filename, options) => {
    const command = new GetObjectCommand({
      Bucket: this.bucket,
      Key: filename,
    })

    return getSignedUrl(this.s3 as any, command as any, { expiresIn: options?.expiresInSeconds })
  }
}
