import { HttpModule } from '@nestjs/axios'
import { Module } from '@nestjs/common'

import { GoogleOauth2Strategy } from './google-oauth2.strategy'

@Module({
	imports: [
		HttpModule,
	],
	providers: [
		GoogleOauth2Strategy,
	],
	exports: [
		GoogleOauth2Strategy,
	],
})
export class GoogleOauth2Module {}
