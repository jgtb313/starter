import { PinInput as MPinInput, PinInputProps as MPinInputProps } from '@mantine/core'

import { useInputForm } from '../Form.hooks'
import { PinInputStyles } from './PinInput.styles'
import { PinInputProps } from './PinInput.types'

export const PinInput = ({ name, length = 4, size = 'md', onChange, onBlur, ...props }: PinInputProps) => {
  const inputProps = useInputForm(name)
  const styles = PinInputStyles(props)

  const handleChange: MPinInputProps['onChange'] = (value) => {
    inputProps.onChange(value)
    onChange?.(value ?? undefined)
  }

  const handleBlur: MPinInputProps['onBlur'] = () => {
    inputProps.onBlur()
    onBlur?.()
  }

  return (
    <MPinInput
      {...props}
      {...inputProps}
      classNames={{ root: styles.root() }}
      inputMode="numeric"
      length={length}
      size={size}
      onChange={handleChange}
      onBlur={handleBlur}
      oneTimeCode
    />
  )
}
