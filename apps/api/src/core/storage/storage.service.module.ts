import { Module } from '@nestjs/common'

import { PresignedUrlModule } from '@/adapters/presigned-url'
import { StorageService } from '@/core/storage/storage.service'

@Module({
  imports: [PresignedUrlModule],
  providers: [StorageService],
  exports: [StorageService],
})
export class StorageServiceModule {}
