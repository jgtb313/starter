import { Inventory } from '@ss/schema'
import { TableProps } from '@ss/components'

export type InventoryListProps = {
  items?: Inventory[]
  value?: TableProps<Inventory>['value']
  total?: TableProps<Inventory>['total']
  loading?: TableProps<Inventory>['loading']
  onSortChange?: TableProps<Inventory>['onSortChange']
  onPageChange?: TableProps<Inventory>['onPageChange']
  onRowsPerPageChange?: TableProps<Inventory>['onRowsPerPageChange']
  onDelete?: () => void
}
