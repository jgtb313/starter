import { Global, Module } from '@nestjs/common'

import { ACLService } from './access-control.service'

@Global()
@Module({
	providers: [
		ACLService,
	],
	exports: [
		ACLService,
	],
})
export class ACLModule {}
