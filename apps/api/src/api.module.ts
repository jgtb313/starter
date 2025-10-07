import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { DomainModule } from '@starter/domain'
import { nestjsServerHoistingI18nModuleOptions } from '@starter/nestjs-server-hoisting'

import { AuthModule } from '@/core/auth'
import { InviteModule } from '@/core/invite'
import { InvoiceModule } from '@/core/invoice'
import { OrganizationModule } from '@/core/organization'
import { OTPModule } from '@/core/otp'
import { PermissionModule } from '@/core/permission'
import { PlanModule } from '@/core/plan'
import { ProfileModule } from '@/core/profile'
import { RoleModule } from '@/core/role'
import { StorageModule } from '@/core/storage'
import { SubscriptionModule } from '@/core/subscription'
import { UserModule } from '@/core/user'
import { WorkspaceModule } from '@/core/workspace'
import { ACLModule } from '@/support/access-control'
import { AuthGuardModule } from '@/support/guards/auth-guard'
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
		InviteModule,
		InvoiceModule,
		StorageModule,
		OrganizationModule,
		OTPModule,
		PermissionModule,
		PlanModule,
		ProfileModule,
		RoleModule,
		SubscriptionModule,
		UserModule,
		WorkspaceModule,
	],
})
export class APIModule {}
