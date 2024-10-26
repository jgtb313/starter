import { BaseComponent } from '@/support/types'
import { DropdownItemProps } from '../Dropdown'

export type TableValue = {
  sort?: string
  page?: string | number
  rowsPerPage?: string | number
  total?: string | number
}

export type TableHeaderActions<T> = DropdownItemProps & {
  key: string
  label: string
  show?: boolean
  disabled?: boolean
  onClick?: (row: T) => void
}

export type TableHeader<T> = {
  key: string
  width?: number
  label?: string
  sorter?: boolean
  show?: boolean
  selector?: (row: T, index: number) => TableHeaderActions<T>[] | React.ReactNode
}[]

export type TableItems<T> = Array<T>

export type TableProps<T> = BaseComponent<{
  value?: TableValue
  headers: TableHeader<T>
  items?: TableItems<T>
  itemKey?: keyof T
  total?: string | number
  pagination?: boolean
  loading?: boolean
  onChange?: (input: TableValue) => void
  onSortChange?: (sort?: string) => void
  onPageChange?: (page: number) => void
  onRowsPerPageChange?: (rowsPerPage: number) => void
}>
