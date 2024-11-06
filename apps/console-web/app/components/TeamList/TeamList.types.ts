import { User } from '@ss/schema'
import { TableProps } from '@ss/components'

export type TeamListProps = {
  items?: User[]
  loading?: TableProps<User>['loading']
  onDelete?: () => void
}
