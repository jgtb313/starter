import { Module } from '@nestjs/common'

import { StorageServiceModule } from '@/core/storage/storage.service.module'
import { StorageController } from '@/core/storage/storage.controller'

@Module({
  imports: [StorageServiceModule],
  controllers: [StorageController],
})
export class StorageModule {}
