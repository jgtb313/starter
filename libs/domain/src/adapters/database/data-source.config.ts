import { join } from 'node:path'

import type { TypeOrmModuleOptions } from '@nestjs/typeorm'
import { config } from 'dotenv'
import type { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions'

import { NamingStrategy } from '@/adapters/database/database.naming-strategy'
import { ColumnFilterSubscriber } from '@/adapters/database/database.subscribers'

const root = join(process.cwd(), '../../', '.env')

config({
	path: root,
})

const entities: PostgresConnectionOptions['entities'] = [
	`${__dirname}/entities/*.cjs`,
]

const migrations: PostgresConnectionOptions['migrations'] = [
	`${__dirname}/migrations/*.cjs`,
]

export type CreateDataSourceConfigOptions = Partial<
	Pick<PostgresConnectionOptions, 'migrationsRun'>
>

export const createDataSourceConfig = (
	options: CreateDataSourceConfigOptions,
): TypeOrmModuleOptions => {
	return {
		type: 'postgres',
		host: process.env.DB_HOST,
		port: Number(process.env.DB_PORT),
		username: process.env.DB_USERNAME,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_DATABASE,
		entities,
		migrations,
		migrationsTableName: 'migrations',
		migrationsRun: false,
		synchronize: process.env.STAGE === 'local',
		namingStrategy: new NamingStrategy(),
		subscribers: [
			ColumnFilterSubscriber,
		],
		...options,
	}
}
