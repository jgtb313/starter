import { Module } from '@nestjs/common'

import { StorageController } from '@/core/storage/storage.controller'
import { StorageServiceModule } from '@/core/storage/storage.service.module'

@Module({
	imports: [
		StorageServiceModule,
	],
	controllers: [
		StorageController,
	],
})
export class StorageModule {}
