import { PropsWithChildren } from 'react'
import { Pressable, Text } from 'react-native'

import { ButtonProps } from './Button.mobile.types'

export const Button = ({ children, ...props }: PropsWithChildren<ButtonProps>) => {
  return (
    <Pressable {...props} style={{ backgroundColor: 'red' }}>
      {props.leftSection}

      <Text>{children}</Text>

      {props.rightSection}
    </Pressable>
  )
}
