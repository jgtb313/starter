import { Collection, CreateIndexesOptions, Db, Document } from 'mongodb'
import { OTP, Plan, Role, Workspace, User } from '@starter/schema'

type Searchable<T> = T & {
  search: Record<string, string>
}

export type CollectionsTypes = {
  otp: OTP
  plan: Searchable<Plan>
  role: Searchable<Role>
  workspace: Searchable<Workspace>
  user: Searchable<User>
}

export const Collections: {
  otp: Collection<CollectionsTypes['otp']>
  plan: Collection<CollectionsTypes['plan']>
  role: Collection<CollectionsTypes['role']>
  workspace: Collection<CollectionsTypes['workspace']>
  user: Collection<CollectionsTypes['user']>
} = {
  otp: {} as Collection<CollectionsTypes['otp']>,
  plan: {} as Collection<CollectionsTypes['plan']>,
  role: {} as Collection<CollectionsTypes['role']>,
  workspace: {} as Collection<CollectionsTypes['workspace']>,
  user: {} as Collection<CollectionsTypes['user']>
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms * 1000))

export const setupCollections = async (database: Db) => {
  Collections.otp = await createCollectionMongoDB<CollectionsTypes['otp']>(database, 'otps')
  Collections.plan = await createCollectionMongoDB<CollectionsTypes['plan']>(database, 'plans')
  Collections.role = await createCollectionMongoDB<CollectionsTypes['role']>(database, 'roles')
  Collections.workspace = await createCollectionMongoDB<CollectionsTypes['workspace']>(database, 'workspaces')
  Collections.user = await createCollectionMongoDB<CollectionsTypes['user']>(database, 'users')
}

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
    opts: { background: true }
  })

  return collection
}

const createIndex = async <T extends Document>({
  collection,
  index,
  opts = { background: true }
}: {
  collection: Collection<T>
  index: Record<string, number>
  opts?: CreateIndexesOptions
}) => collection.createIndex(index, { ...opts }).catch()
