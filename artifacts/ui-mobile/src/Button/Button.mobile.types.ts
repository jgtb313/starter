import { PressableProps } from 'react-native'

import { Colors, Sizes } from '../Theme'

export type ButtonProps = {
  color?: Colors
  size?: Sizes
  variant?: 'filled' | 'outline' | 'ghost'
  leftSection?: React.ReactNode
  rightSection?: React.ReactNode
  loading?: boolean
  disabled?: boolean
  block?: boolean
  onPress?: PressableProps['onPress']
}
