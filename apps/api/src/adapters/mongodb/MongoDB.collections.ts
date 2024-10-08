import { Collection, CreateIndexesOptions, Db, Document } from 'mongodb'

import { OTP } from '@/core/otp/domain'
import { Plan } from '@/core/plan/domain'
import { Role } from '@/core/role/domain'
import { Workspace } from '@/core/workspace/domain'
import { User } from '@/core/user/domain'
// appendCollectionImportHere

type Searchable<T> = T & {
  search: Record<string, string>
}

export type ICollections = {
  otp: Searchable<OTP['state']>
  plan: Searchable<Plan['state']>
  role: Searchable<Role['state']>
  workspace: Searchable<Workspace['state']>
  user: Searchable<User['state']>
  // appendCollectionTypeHere
}

export const Collections: { [K in keyof ICollections]: Collection<ICollections[K]> } = {} as {
  [K in keyof ICollections]: Collection<ICollections[K]>
}
export type CollectionsType = typeof Collections

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms * 1000))

const createCollectionMongoDB = async <T extends Document>(database: Db, collectionName: string) => {
  while (!database) {
    await sleep(1)
  }

  try {
    await database.createCollection(collectionName, { autoIndexId: true })
  } catch (error) {
    /* empty */
  }

  const collection = database.collection<T>(collectionName)

  await createIndex({ collection, index: { id: 1 }, opts: { unique: true } })
  await createIndex({
    collection,
    index: { createdAt: -1 },
    opts: { background: true },
  })

  return collection
}

const createIndex = async <T extends Document>({
  collection,
  index,
  opts = { background: true },
}: {
  collection: Collection<T>
  index: Record<string, number>
  opts?: CreateIndexesOptions
}) => collection.createIndex(index, { ...opts }).catch()

export const setupCollections = async (database: Db) => {
  Collections.otp = await createCollectionMongoDB<ICollections['otp']>(database, 'otps')
  Collections.plan = await createCollectionMongoDB<ICollections['plan']>(database, 'plans')
  Collections.role = await createCollectionMongoDB<ICollections['role']>(database, 'roles')
  Collections.workspace = await createCollectionMongoDB<ICollections['workspace']>(database, 'workspaces')
  Collections.user = await createCollectionMongoDB<ICollections['user']>(database, 'users')
  // appendCollectionHere
}
