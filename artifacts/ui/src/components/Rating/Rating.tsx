import { Rating as Component } from '@mantine/core'

import { RatingStyles } from './Rating.styles'
import { RatingProps } from './Rating.types'

export const Rating = ({ ...props }: RatingProps) => {
  const styles = RatingStyles(props)

  return <Component classNames={{ root: styles.root() }} {...props} />
}
