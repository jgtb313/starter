import { Module } from '@nestjs/common'
import { HttpModule } from '@nestjs/axios'

import { FacebookOauth2Strategy } from './facebook-oauth2.strategy'

@Module({
  imports: [HttpModule],
  providers: [FacebookOauth2Strategy],
  exports: [FacebookOauth2Strategy],
})
export class FacebookOauth2Module {}
