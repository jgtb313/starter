import { IRepositories } from './modules'

export type IRepositoriesOpts = {}

export type IRepositoriesMethodOptions = {
  session?: ISession['value']
}

export type ISession = {
  value: unknown
  commit(): Promise<void>
  rollback(): Promise<void>
}

export type IDatabaseOptions = {
  session?: unknown
}

export type IDatabase = {
  connect(): Promise<void>
  disconnect(): Promise<void>
  createSession(): ISession
  Repositories: IRepositories
}
