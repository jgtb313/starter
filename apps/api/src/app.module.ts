import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { DatabaseModule } from '@starter/domain'
import { NestServerHoistingModule } from '@starter/nestjs-server-hoisting'

import { ACLModule } from '@/support/access-control/access-control.module'
import { AuthGuardModule } from '@/support/guards/auth-guard/auth.guard.module'

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

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: '../../.env',
		}),

		NestServerHoistingModule,

		AuthGuardModule,
		ACLModule,

		DatabaseModule.register({
			migrationsRun: true,
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
