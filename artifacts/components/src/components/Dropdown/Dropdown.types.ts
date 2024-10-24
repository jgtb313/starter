import { MenuProps } from '@mantine/core'

import { BaseComponent } from '@/support/types'
import { ButtonProps } from '../Button'
import { IconProps } from '../Icon'
import { DropdownVariants } from './Dropdown.styles'

type DropdownItemBaseProps = {
  label: string
  icon?: IconProps['name']
}

export type DropdownItemProps =
  | ({
      type: 'button'
      leftSection?: ButtonProps['leftSection']
      rightSection?: ButtonProps['rightSection']
      disabled?: boolean
      onClick?: () => void
    } & DropdownItemBaseProps)
  | ({
      type: 'link'
      href: string
      target?: '_blank'
      disabled?: boolean
    } & DropdownItemBaseProps)
  | {
      type: 'divider'
    }
  | {
      type: 'label'
      label: string
    }

export type DropdownProps = BaseComponent<
  {
    open?: boolean
    width?: MenuProps['width']
    position?: MenuProps['position']
    trigger?: MenuProps['trigger']
    items?: DropdownItemProps[]
    arrow?: boolean
  },
  DropdownVariants
>
