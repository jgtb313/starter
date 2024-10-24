import { RatingProps as MRatingProps } from '@mantine/core'

import { BaseComponent } from '@/support/types'
import { RatingVariants } from './Rating.styles'

export type RatingProps = BaseComponent<
  {
    value?: number
    size?: MRatingProps['size']
    count?: MRatingProps['count']
    fractions?: MRatingProps['fractions']
    readOnly?: boolean
  },
  RatingVariants
>
