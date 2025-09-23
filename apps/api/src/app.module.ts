import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { DomainModule } from '@starter/domain'
import { nestjsServerHoistingI18nModuleOptions } from '@starter/nestjs-server-hoisting'

import { ACLModule } from '@/support/access-control'
import { AuthGuardModule } from '@/support/guards/auth-guard'

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

const en = {
	hello: 'Hello',
} as const
const es = {
	hello: 'Hola',
}
const ptBR = {
	hello: 'Olá',
}

const i18nOptions = nestjsServerHoistingI18nModuleOptions({
	en,
	es,
	'pt-BR': ptBR,
})

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: '../../.env',
		}),

		DomainModule.register({
			database: {
				migrationsRun: true,
			},
			i18n: i18nOptions,
		}),

		AuthGuardModule,
		ACLModule,

		DomainModule.register({
			database: {
				migrationsRun: true,
			},
		}),

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
export class AppModule {}
