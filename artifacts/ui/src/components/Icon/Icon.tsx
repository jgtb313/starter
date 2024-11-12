import { forwardRef, Ref } from 'react'
import { Home } from 'lucide-react'

import { IconProps } from './Icon.types'

const BaseIcon = ({ name, ...props }: IconProps, ref: Ref<SVGSVGElement>) => {
  // const Icon = icons[name]

  return <Home ref={ref} {...props} />
}

export const Icon = forwardRef(BaseIcon)
