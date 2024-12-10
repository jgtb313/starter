import { Dependencies } from './dependencies'

export const Bootstrap = async () => {
  await Dependencies.Logger.connect()
  await Dependencies.Cache.connect()
  await Dependencies.Database.connect()
}
