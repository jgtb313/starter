import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { S3PresignedUrlAdapter } from './aws-s3-presigned-url.adapter'
import { PresignedUrlService } from './presigned-url.service'

@Module({
	imports: [
		ConfigModule,
	],
	providers: [
		{
			provide: 'PresignedUrl',
			useClass: S3PresignedUrlAdapter,
		},
		PresignedUrlService,
	],
	exports: [
		PresignedUrlService,
	],
})
export class PresignedUrlModule {}
