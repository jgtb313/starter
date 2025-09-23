import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { DomainModule } from '@starter/domain'
import { NestjsI18nModule } from '@starter/nestjs-i18n'
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

export const en = {
	hello: 'Hello {name:string}',
} as const
export type Translations = {
	[K in keyof typeof en]: string
}

export const es: Translations = {
	hello: 'Hola {name:string}',
}

export const ptBR: Translations = {
	hello: 'Olá {name:string}',
}

export type I18nDomain = {
	en: typeof en
	es: typeof es
	'pt-BR': typeof ptBR
}

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: '../../.env',
		}),

		NestjsI18nModule.register(
			'I18N_SERVICE',
			{
				en,
				es,
				'pt-BR': ptBR,
			},
			nestjsServerHoistingI18nModuleOptions({
				en,
				es,
				'pt-BR': ptBR,
			}),
		),

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
export class AppModule {}
