import { IDependencies } from '@/core/shared/types'

export type IUseCaseExecute<T, P> = (dependencies: IDependencies) => (input: T) => Promise<P>
