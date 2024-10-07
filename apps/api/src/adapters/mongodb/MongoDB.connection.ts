import { Db, MongoClient } from 'mongodb'

import { setupCollections } from './MongoDB.collections'

let database: Db
export let client: MongoClient

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms * 1000))

export const connect = async (uri: string) => {
  try {
    client = new MongoClient(uri, {
      serverSelectionTimeoutMS: 15000,
      connectTimeoutMS: 15000,
    })

    await client.connect()

    const [databaseName] = uri.split('?')[0]?.split('/').reverse() ?? []

    database = client.db(databaseName)

    await setupCollections(database)

    console.log(`Connected on MongoDB: ${uri}`)
  } catch (err) {
    console.log(err)
    await sleep(1)
    connect(uri)
  }
}
