import { forwardRef, Ref } from 'react'
import { IconHome, Icon as Component } from '@tabler/icons-react'

import { IconProps } from './Icon.types'

const BaseIcon = ({ name, ...props }: IconProps, ref: Ref<Component>) => {
  // const Icon = icons[name]

  // return <Icon ref={ref} {...props} />

  return <IconHome ref={ref} {...props} />
}

export const Icon = forwardRef(BaseIcon)
