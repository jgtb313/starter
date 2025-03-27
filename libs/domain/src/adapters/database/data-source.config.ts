import { join } from 'node:path'
import { config } from 'dotenv'
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions'

const root = join(process.cwd(), '../../', '.env')

config({ path: root })

const entities: PostgresConnectionOptions['entities'] = [`${__dirname}/entities/*.cjs`]

const migrations: PostgresConnectionOptions['migrations'] = [`${__dirname}/migrations/*.cjs`]

export type CreateDataSourceConfigOptions = Partial<Pick<PostgresConnectionOptions, 'migrationsRun'>>

export const createDataSourceConfig = (options: CreateDataSourceConfigOptions): PostgresConnectionOptions => {
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
    synchronize: false,
    ...options,
  }
}
