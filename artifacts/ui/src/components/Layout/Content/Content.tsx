import { PropsWithChildren } from 'react'

import { ContentStyles } from './Content.styles'
import { ContentProps } from './Content.types'

export const Content = ({ children, ...props }: PropsWithChildren<ContentProps>) => {
  return <div className={ContentStyles(props)}>{children}</div>
}
