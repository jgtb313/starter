import { Database } from '@/adapters/mongodb'

export const Bootstrap = async () => {
  await Database.connect()
}
