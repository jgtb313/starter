import { LoaderProps as ComponentProps } from '@mantine/core'

import { BaseComponent } from '@/support/types'
import { LoaderVariants } from './Loader.styles'

export type LoaderProps = BaseComponent<
  {
    size?: ComponentProps['size']
  },
  LoaderVariants
>
