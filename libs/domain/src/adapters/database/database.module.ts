import { PrismaTransactional } from '@myfunc/prisma-transactional'
import { type DynamicModule, Global, Module } from '@nestjs/common'
import type { Prisma } from '@prisma/client'

export type DatabaseModuleOptions = {}

@Global()
@Module({})
export class DatabaseModule {
	static register(options?: DatabaseModuleOptions): DynamicModule {
		return {
			global: true,
			module: DatabaseModule,
		}
	}
}

export const Transaction = (
	isolationLevel?: Prisma.TransactionIsolationLevel,
) => PrismaTransactional(isolationLevel)

export const setupDatabaseTransaction = () => {}
