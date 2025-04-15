import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { DatabaseModule } from '@starter/domain'

import { AuthGuardModule } from '@/support/guards'
import { ACLModule } from '@/support/access-control'

import { AuthModule } from '@/core/auth'
import { StorageModule } from '@/core/storage'
import { OrganizationModule } from '@/core/organization'
import { OTPModule } from '@/core/otp'
import { PermissionModule } from '@/core/permission'
import { PlanModule } from '@/core/plan'
import { ProfileModule } from '@/core/profile'
import { RoleModule } from '@/core/role'
import { SubscriptionModule } from '@/core/subscription'
import { UserModule } from '@/core/user'
import { WorkspaceModule } from '@/core/workspace'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '../../.env',
    }),

    AuthGuardModule,
    ACLModule,

    DatabaseModule.register({
      migrationsRun: true,
    }),

    AuthModule,
    StorageModule,
    // OrganizationModule,
    // OTPModule,
    // PermissionModule,
    // PlanModule,
    // ProfileModule,
    // RoleModule,
    // SubscriptionModule,
    // UserModule,
    // WorkspaceModule,
  ],
})
export class AppModule {}
