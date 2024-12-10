import { IDependencies } from './domain.dependencies'

let ready = false

export const bootstrap = async (dependencies: IDependencies) => {
  if (ready) {
    return
  }

  await dependencies.Logger.connect()
  await dependencies.Cache.connect()
  await dependencies.Database.connect()

  ready = true
}
