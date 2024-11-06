import { Invoice } from '@ss/schema'
import { TableProps } from '@ss/components'

export type InvoiceListProps = {
  items?: Invoice[]
  value?: TableProps<Invoice>['value']
  total?: TableProps<Invoice>['total']
  loading?: TableProps<Invoice>['loading']
  onSortChange?: TableProps<Invoice>['onSortChange']
  onPageChange?: TableProps<Invoice>['onPageChange']
  onRowsPerPageChange?: TableProps<Invoice>['onRowsPerPageChange']
  onDelete?: () => void
}
