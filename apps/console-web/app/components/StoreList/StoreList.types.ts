import { Store } from '@ss/schema'
import { TableProps } from '@ss/components'

export type StoreListProps = {
  items?: Store[]
  loading?: TableProps<Store>['loading']
}
