import { Collection, CreateIndexesOptions, Db, Document } from 'mongodb'

import { OTP } from '../../core/otp'
import { User } from '../../core/user'
// appendCollectionImportHere

type Searchable<T> = T & {
  search: Record<string, string>
}

export type CollectionsSchema = {
  otp: Searchable<OTP['state']>
  user: Searchable<User['state']>
  // appendCollectionTypeHere
}

export const Collections: { [K in keyof CollectionsSchema]: Collection<CollectionsSchema[K]> } = {} as {
  [K in keyof CollectionsSchema]: Collection<CollectionsSchema[K]>
}
export type CollectionsType = typeof Collections

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms * 1000))

const createCollectionMongoDB = async <T extends Document>(database: Db, collectionName: string) => {
  while (!database) {
    await sleep(1)
  }

  try {
    await database.createCollection(collectionName, { autoIndexId: true })
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
  Collections.otp = await createCollectionMongoDB<CollectionsSchema['otp']>(database, 'otps')
  Collections.user = await createCollectionMongoDB<CollectionsSchema['user']>(database, 'users')
  // appendCollectionHere
}
