import { Db, MongoClient, Document, Collection, CreateIndexesOptions } from 'mongodb'
import { OTP, Role, User } from '@starter/schema'
import { clearSpecialChars, get, set } from '@starter/shared'

import { makeMatch } from './MongoDB.match'

type Searchable<T> = T & {
  search: Record<string, string>
}

export type CollectionsTypes = {
  otp: OTP
  role: Role
  user: Searchable<User>
}

let database: Db
export let client: MongoClient

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms * 1000))

const makeSearch =
  <T>(fields: string[]) =>
  (document?: Partial<T>) => {
    const search: Record<string, string> = {}

    fields.forEach((field) => {
      const value = get(document, field)

      set(search, field, clearSpecialChars(value.toLocaleLowerCase()))
    })

    return search
  }

const createTimestamps = () => ({
  createdAt: new Date(),
  updatedAt: new Date()
})
const updateTimestamps = () => ({ updatedAt: new Date() })

const startSession = () => {
  const session = client.startSession()
  return session
}

const Collections: {
  otp: Collection<CollectionsTypes['otp']>
  role: Collection<CollectionsTypes['role']>
  user: Collection<CollectionsTypes['user']>
} = {
  otp: {} as Collection<CollectionsTypes['otp']>,
  role: {} as Collection<CollectionsTypes['role']>,
  user: {} as Collection<CollectionsTypes['user']>
}

const connect = async (uri: string) => {
  try {
    client = new MongoClient(uri, {
      serverSelectionTimeoutMS: 15000,
      connectTimeoutMS: 15000
    })

    await client.connect()

    const [databaseName] = uri.split('?')[0]?.split('/').reverse() ?? []

    database = client.db(databaseName)

    Collections.otp = await createCollectionMongoDB<CollectionsTypes['otp']>('otps')
    Collections.role = await createCollectionMongoDB<CollectionsTypes['role']>('roles')
    Collections.user = await createCollectionMongoDB<CollectionsTypes['user']>('users')

    console.log(`Connected on MongoDB: ${uri}`)
  } catch (err) {
    console.log(err)
    await sleep(1)
    connect(uri)
  }
}

const createCollectionMongoDB = async <T extends Document>(collectionName: string) => {
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

export const MongoDB = {
  Collections,

  connect,

  makeMatch,
  makeSearch,

  createTimestamps,
  updateTimestamps,

  startSession
}
