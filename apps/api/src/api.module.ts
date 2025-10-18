import { DomainModule } from '@starter/domain'
import { nestjsServerHoistingI18nModuleOptions } from '@starter/nestjs-server-hoisting'

import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { ACLModule } from '@/support/access-control'
import { AuthGuardModule } from '@/support/guards/auth-guard'
import { AuthModule } from '@/core/auth'
import { OTPModule } from '@/core/otp'
import { PermissionModule } from '@/core/permission'
import { PlanModule } from '@/core/plan'
import { ProfileModule } from '@/core/profile'
import { WorkspaceModule } from '@/core/workspace'
import { I18nAPIModule } from '@/api.i18n.module'

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: '../../.env',
		}),

		I18nAPIModule.register(),

		DomainModule.register({
			database: {
				migrationsRun: true,
			},
			i18n: nestjsServerHoistingI18nModuleOptions,
		}),

		AuthGuardModule,
		ACLModule,

		AuthModule,
		OTPModule,
		PermissionModule,
		PlanModule,
		ProfileModule,
		WorkspaceModule,
	],
})
export class APIModule {}
