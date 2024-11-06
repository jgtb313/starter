import { Delivery } from '@ss/schema'
import { TableProps } from '@ss/components'

export type DeliveryListProps = {
  items?: Delivery[]
  value?: TableProps<Delivery>['value']
  total?: TableProps<Delivery>['total']
  loading?: TableProps<Delivery>['loading']
  onSortChange?: TableProps<Delivery>['onSortChange']
  onPageChange?: TableProps<Delivery>['onPageChange']
  onRowsPerPageChange?: TableProps<Delivery>['onRowsPerPageChange']
  onDelete?: () => void
}
