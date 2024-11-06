import { Store, CreateStoreInput } from '@ss/schema'

import { StoreFormModalRendererProps } from '../StoreFormModal'

export type StoreSelectorProps = {}

export type StoreSelectorItemProps = {
  store: Store
}

export type StoreSelectorForm = StoreFormModalRendererProps<CreateStoreInput>
