import { Auth } from '@/support/auth'
import { Dependencies } from '@/dependencies'

export type IDependencies = typeof Dependencies

export type IUseCaseExecute<T, P> = (dependencies: IDependencies) => (input: T) => Promise<P>

export type IContext = {
  auth?: Auth
}
