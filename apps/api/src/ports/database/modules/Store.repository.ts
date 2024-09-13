import { PaginationInput, SortInput, PaginationOutput } from '@starter/schema'

import { Store } from '@/core/store/domain'
import { DatabaseFilterInput } from '../Database.support'

type StoreRepository = Store['state']

type StoreFindInput = DatabaseFilterInput<StoreRepository> & SortInput & PaginationInput<{}>

export type IStoreRepository = () => {
  index(data: StoreFindInput): Promise<Store[]>
  find(data: StoreFindInput): Promise<PaginationOutput<Store>>
  findById(id: string): Promise<Store>
  findByDocument(document: StoreRepository['document']): Promise<Store | undefined>
  documentExists(document: StoreRepository['document'], opts?: { exclude?: string }): Promise<boolean>
  create(data: Store): Promise<Store>
  updateById(id: string, data: Partial<Store>): Promise<Store>
}
