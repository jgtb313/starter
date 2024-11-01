import { forwardRef, Ref } from 'react'
import { icons, Icon as Component } from '@tabler/icons-react'

import { IconProps } from './Icon.types'

const BaseIcon = ({ name, ...props }: IconProps, ref: Ref<Component>) => {
  const Icon = icons[name]

  return <Icon ref={ref} {...props} />
}

export const Icon = forwardRef(BaseIcon)
