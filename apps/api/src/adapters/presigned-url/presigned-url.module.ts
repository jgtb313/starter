import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { PresignedUrlService } from './presigned-url.service'
import { S3PresignedUrlAdapter } from './aws-s3-presigned-url.adapter'

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: 'PresignedUrl',
      useClass: S3PresignedUrlAdapter,
    },
    PresignedUrlService,
  ],
  exports: [PresignedUrlService],
})
export class PresignedUrlModule {}
