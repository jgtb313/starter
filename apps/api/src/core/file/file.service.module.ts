import { Module } from '@nestjs/common'

import { PresignedUrlModule } from '@/adapters/presigned-url'
import { FileService } from './file.service'

@Module({
  imports: [PresignedUrlModule],
  providers: [FileService],
  exports: [FileService],
})
export class FileServiceModule {}
